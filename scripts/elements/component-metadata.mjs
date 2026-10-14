// Reads every component under src/components/* with the TypeScript compiler and
// describes its public API (selector, @Input()s, @Output()s). Used by
// build.mjs to:
//   - generate src/elements/metadata.generated.ts (how each HTML attribute is
//     converted to the input's type at runtime)
//   - check that src/elements.ts registers every component
//   - write dist/elements/ELEMENTS.md
import { existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import ts from 'typescript';

/**
 * Inputs whose name is also a native HTMLElement property that page code relies
 * on. The custom element keeps the native property and exposes the input under
 * an alias instead (see src/elements/element.ts).
 */
export const RESERVED_INPUT_ALIASES = {
  style: { property: 'styleVariant', attribute: 'style-variant' },
};

/** Same conversion Angular Elements uses for attribute names. */
export const camelToDashCase = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export function findComponentFiles(root) {
  const componentsDir = join(root, 'src/components');
  return readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) => {
      const dir = join(componentsDir, d.name);
      return readdirSync(dir)
        .filter((f) => f.endsWith('.component.ts'))
        .map((f) => join(dir, f));
    })
    .sort();
}

export function readComponentMetadata(root) {
  const files = findComponentFiles(root);
  const configPath = join(root, 'tsconfig.app.json');
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const program = ts.createProgram(files, { ...parsed.options, noEmit: true });
  const checker = program.getTypeChecker();

  const components = [];
  for (const file of files) {
    const source = program.getSourceFile(file);
    for (const statement of source.statements) {
      if (!ts.isClassDeclaration(statement)) continue;
      const decorator = findDecorator(statement, 'Component');
      if (!decorator) continue;
      components.push(describeComponent(statement, decorator, source, checker, root));
    }
  }

  const dirsWithoutComponent = readdirSync(join(root, 'src/components'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !components.some((c) => c.dir === name));
  if (dirsWithoutComponent.length) {
    throw new Error(`No @Component class found in: ${dirsWithoutComponent.join(', ')}`);
  }

  return components;
}

function describeComponent(classDecl, decorator, source, checker, root) {
  const options = decorator.expression.arguments[0];
  const selector = readStringProperty(options, 'selector');
  if (!selector) throw new Error(`${classDecl.name.text} has no string selector`);
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/.test(selector)) {
    throw new Error(`${classDecl.name.text}: selector "${selector}" is not a plain element name`);
  }

  const file = relative(root, source.fileName);
  const tag = selector.startsWith('rais-') ? selector : `rais-${selector}`;
  const inputs = [];
  const outputs = [];

  for (const member of classDecl.members) {
    const name = member.name && ts.isIdentifier(member.name) ? member.name.text : undefined;
    if (!name) continue;

    if (ts.isPropertyDeclaration(member) && member.initializer && isSignalApiCall(member.initializer)) {
      throw new Error(
        `${classDecl.name.text}.${name} uses a signal input/output/model. ` +
          'scripts/elements/component-metadata.mjs only understands @Input()/@Output(); extend it first.',
      );
    }

    const input = findDecorator(member, 'Input');
    if (input) inputs.push(describeInput(member, name, input, checker, classDecl.name.text));

    const output = findDecorator(member, 'Output');
    if (output) outputs.push(describeOutput(member, name, output, checker, classDecl.name.text));
  }

  return {
    className: classDecl.name.text,
    selector,
    tag,
    file,
    dir: file.split('/')[2],
    summary: fileSummary(source),
    hasContentProjection: hasNgContent(root, file),
    inputs,
    outputs,
  };
}

function describeInput(member, name, decorator, checker, className) {
  const arg = decorator.expression.arguments[0];
  if (arg && !ts.isStringLiteral(arg)) {
    const unsupported = ['transform', 'required'].filter((key) => readProperty(arg, key));
    if (unsupported.length) {
      throw new Error(`${className}.${name}: @Input({${unsupported.join(', ')}}) is not handled yet`);
    }
  }
  const alias = arg ? (ts.isStringLiteral(arg) ? arg.text : readStringProperty(arg, 'alias')) : undefined;
  const templateName = alias ?? name;
  const type = checker.getTypeAtLocation(member);
  const kind = classifyInputType(type, checker, `${className}.${name}`);
  const reserved = RESERVED_INPUT_ALIASES[name];

  return {
    /** Input name as used in Angular templates. */
    name: templateName,
    /** Class property; Angular Elements defines the element property under this name. */
    classProperty: name,
    /** Property to use on the custom element. */
    property: reserved ? reserved.property : name,
    attribute: camelToDashCase(templateName),
    aliasAttribute: reserved?.attribute,
    keywords: reserved ? stringLiteralValues(type) : undefined,
    kind,
    type: member.type ? member.type.getText() : checker.typeToString(type),
    typeExpanded: checker.typeToString(type, undefined, ts.TypeFormatFlags.InTypeAlias | ts.TypeFormatFlags.NoTruncation),
    shape: kind === 'json' ? describeShape(type, checker) : undefined,
    default: literalValue(member.initializer),
    description: jsDocText(member),
  };
}

function describeOutput(member, name, decorator, checker, className) {
  const arg = decorator.expression.arguments[0];
  const alias = arg && ts.isStringLiteral(arg) ? arg.text : undefined;
  const type = checker.getTypeAtLocation(member);
  if (type.getSymbol()?.getName() !== 'EventEmitter') {
    throw new Error(`${className}.${name}: @Output() must be an EventEmitter<T>`);
  }
  // Prefer the type argument as written (`new EventEmitter<FileList | null>()`):
  // tsconfig.app.json is not strict, so the checker drops `| null`.
  const written =
    member.initializer && ts.isNewExpression(member.initializer) ? member.initializer.typeArguments?.[0]?.getText() : undefined;
  const emitted = checker.getTypeArguments(type)?.[0];
  return {
    name: alias ?? name,
    detail: written ?? (emitted ? checker.typeToString(emitted) : 'unknown'),
    description: jsDocText(member),
  };
}

/** For array/object inputs: the fields of the project interface they are made of. */
function describeShape(type, checker) {
  let item = type;
  while (checker.isArrayType(item)) item = checker.getTypeArguments(item)[0];
  const symbol = item.aliasSymbol ?? item.getSymbol();
  const declaredInProject = symbol?.declarations?.some((d) => !d.getSourceFile().fileName.includes('node_modules'));
  if (!declaredInProject || !(item.flags & ts.TypeFlags.Object)) return undefined;
  const fields = checker.getPropertiesOfType(item).map((prop) => {
    const decl = prop.valueDeclaration;
    const optional = !!(prop.flags & ts.SymbolFlags.Optional);
    const propType = checker.getTypeOfSymbolAtLocation(prop, decl);
    const text = checker.typeToString(propType, undefined, ts.TypeFormatFlags.InTypeAlias | ts.TypeFormatFlags.NoTruncation);
    return `${prop.name}${optional ? '?' : ''}: ${text}`;
  });
  return `${symbol.name} = { ${fields.join('; ')} }`;
}

/**
 * How an attribute string becomes the input value:
 *   string          → as written
 *   boolean         → "" / "true" → true, "false" → false
 *   number          → Number(value)
 *   json            → JSON.parse(value) (arrays and objects)
 *   string-or-false → "false" → false, anything else stays a string
 */
function classifyInputType(type, checker, where) {
  const parts = (type.isUnion() ? type.types : [type]).filter(
    (t) => !(t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.Void)),
  );
  const has = (pred) => parts.some(pred);
  const isString = (t) => !!(t.flags & ts.TypeFlags.StringLike);
  const isNumber = (t) => !!(t.flags & ts.TypeFlags.NumberLike);
  const isBool = (t) => !!(t.flags & ts.TypeFlags.BooleanLike);
  const isFalse = (t) => isBool(t) && checker.typeToString(t) === 'false';
  const isObject = (t) => !!(t.flags & ts.TypeFlags.Object);

  if (parts.length && parts.every(isString)) return 'string';
  if (parts.length && parts.every(isNumber)) return 'number';
  if (parts.length && parts.every(isBool)) return 'boolean';
  if (parts.length && parts.every(isObject)) return 'json';
  if (has(isString) && parts.every((t) => isString(t) || isFalse(t))) return 'string-or-false';
  throw new Error(`${where}: no attribute conversion for type "${checker.typeToString(type)}"`);
}

function stringLiteralValues(type) {
  const parts = type.isUnion() ? type.types : [type];
  const values = parts.filter((t) => t.isStringLiteral()).map((t) => t.value);
  return values.length ? values : undefined;
}

/** Evaluates literal initializers (the only kind used for defaults) to JSON values. */
function literalValue(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) {
    return -Number(node.operand.text);
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(node)) {
    const items = node.elements.map(literalValue);
    return items.includes(NOT_LITERAL) ? NOT_LITERAL : items;
  }
  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) return NOT_LITERAL;
      const key = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : undefined;
      const value = literalValue(prop.initializer);
      if (key === undefined || value === NOT_LITERAL) return NOT_LITERAL;
      result[key] = value;
    }
    return result;
  }
  return NOT_LITERAL;
}
export const NOT_LITERAL = Symbol('not a literal');

function findDecorator(node, name) {
  return ts.canHaveDecorators(node)
    ? ts.getDecorators(node)?.find(
        (d) => ts.isCallExpression(d.expression) && ts.isIdentifier(d.expression.expression) && d.expression.expression.text === name,
      )
    : undefined;
}

function isSignalApiCall(node) {
  const callee = ts.isCallExpression(node) ? node.expression : undefined;
  const base = callee && ts.isPropertyAccessExpression(callee) ? callee.expression : callee;
  return !!base && ts.isIdentifier(base) && ['input', 'output', 'model'].includes(base.text);
}

function readProperty(objectLiteral, key) {
  if (!objectLiteral || !ts.isObjectLiteralExpression(objectLiteral)) return undefined;
  return objectLiteral.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText() === key)?.initializer;
}

function readStringProperty(objectLiteral, key) {
  const value = readProperty(objectLiteral, key);
  return value && ts.isStringLiteralLike(value) ? value.text : undefined;
}

function jsDocText(node) {
  const docs = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc);
  return docs
    .map((d) => (typeof d.comment === 'string' ? d.comment : ts.getTextOfJSDocComment(d.comment) ?? ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** First line of the first JSDoc block in the file, e.g. "Button — RAIS Actions component". */
function fileSummary(source) {
  const match = source.getFullText().match(/\/\*\*\s*\n?\s*\*?\s*([^\n*][^\n]*)/);
  return match ? match[1].trim() : '';
}

function hasNgContent(root, file) {
  const template = join(root, file.replace(/\.ts$/, '.html'));
  return existsSync(template) && ts.sys.readFile(template).includes('<ng-content');
}

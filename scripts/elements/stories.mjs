// Reads a component's Storybook stories (`*.stories.ts`) without running them:
// the Storybook group (second segment of the title) and each story's args,
// when they are literal values. Used to build the Claude Design previews.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';
import { NOT_LITERAL } from './component-metadata.mjs';

/** `{ title, group, stories: [{ name, title, args }] }` for one component folder, or undefined. */
export function readStories(root, componentDir) {
  const dir = join(root, 'src/components', componentDir);
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.stories.ts')) : [];
  const result = { title: undefined, group: undefined, stories: [] };
  for (const file of files.sort()) {
    const source = ts.createSourceFile(file, readFileSync(join(dir, file), 'utf8'), ts.ScriptTarget.Latest, true);
    const scope = new Map(); // top-level const name → initializer
    for (const statement of source.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const decl of statement.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && decl.initializer) scope.set(decl.name.text, decl.initializer);
      }
    }
    const meta = metaObject(source, scope);
    const title = meta && stringProp(meta, 'title');
    if (title && !result.title) {
      result.title = title;
      const segments = title.split('/');
      result.group = segments[0] === 'RAIS' ? segments[1] : segments[0];
    }
    const metaArgs = meta ? evaluate(prop(meta, 'args'), scope) : {};
    const storyArgs = new Map();
    for (const statement of source.statements) {
      if (!ts.isVariableStatement(statement) || !statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue;
      for (const decl of statement.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name) || !decl.initializer || !ts.isObjectLiteralExpression(decl.initializer)) continue;
        const story = decl.initializer;
        const render = prop(story, 'render');
        // A render function without parameters is a hand-made gallery, not args.
        if (render && ts.isArrowFunction(render) && render.parameters.length === 0) continue;
        const args = evaluate(prop(story, 'args'), scope, storyArgs);
        if (args === NOT_LITERAL) continue;
        storyArgs.set(decl.name.text, args ?? {});
        result.stories.push({
          name: stringProp(story, 'name') ?? humanize(decl.name.text),
          title,
          args: { ...(metaArgs === NOT_LITERAL ? {} : metaArgs), ...(args ?? {}) },
        });
      }
    }
  }
  return result.title ? result : undefined;
}

function metaObject(source, scope) {
  for (const statement of source.statements) {
    if (ts.isExportAssignment(statement)) {
      const expr = statement.expression;
      if (ts.isObjectLiteralExpression(expr)) return expr;
      if (ts.isIdentifier(expr) && scope.get(expr.text) && ts.isObjectLiteralExpression(scope.get(expr.text))) return scope.get(expr.text);
    }
  }
  const meta = scope.get('meta');
  return meta && ts.isObjectLiteralExpression(meta) ? meta : undefined;
}

function prop(object, name) {
  return object.properties.find((p) => p.name && p.name.getText() === name && (ts.isPropertyAssignment(p) || ts.isMethodDeclaration(p)))
    ?.initializer;
}

function stringProp(object, name) {
  const value = prop(object, name);
  return value && ts.isStringLiteralLike(value) ? value.text : undefined;
}

/** Literal values, `...OtherStory.args` spreads and references to top-level literal consts. */
function evaluate(node, scope, stories = new Map()) {
  if (!node) return undefined;
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) return -Number(node.operand.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isAsExpression(node) || ts.isParenthesizedExpression(node) || ts.isSatisfiesExpression?.(node)) return evaluate(node.expression, scope, stories);
  if (ts.isIdentifier(node)) {
    if (node.text === 'undefined') return undefined;
    return scope.has(node.text) ? evaluate(scope.get(node.text), scope, stories) : NOT_LITERAL;
  }
  if (ts.isArrayLiteralExpression(node)) {
    const items = node.elements.map((e) => evaluate(e, scope, stories));
    return items.includes(NOT_LITERAL) ? NOT_LITERAL : items;
  }
  if (ts.isObjectLiteralExpression(node)) {
    const out = {};
    for (const p of node.properties) {
      if (ts.isSpreadAssignment(p)) {
        // `...Default.args`
        const e = p.expression;
        const spread =
          ts.isPropertyAccessExpression(e) && e.name.text === 'args' && ts.isIdentifier(e.expression) && stories.has(e.expression.text)
            ? stories.get(e.expression.text)
            : evaluate(e, scope, stories);
        if (spread === NOT_LITERAL || typeof spread !== 'object') return NOT_LITERAL;
        Object.assign(out, spread);
      } else if (ts.isPropertyAssignment(p)) {
        const value = evaluate(p.initializer, scope, stories);
        if (value === NOT_LITERAL) return NOT_LITERAL;
        out[p.name.getText().replace(/^['"]|['"]$/g, '')] = value;
      } else if (ts.isShorthandPropertyAssignment(p)) {
        const value = evaluate(p.name, scope, stories);
        if (value === NOT_LITERAL) return NOT_LITERAL;
        out[p.name.text] = value;
      } else {
        return NOT_LITERAL;
      }
    }
    return out;
  }
  return NOT_LITERAL;
}

function humanize(exportName) {
  return exportName.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
}

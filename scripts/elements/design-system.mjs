// npm run build:design-system   (after npm run build:elements)
//
// Builds dist/design-system/project/components/: the components of the RAIS
// Design System in Claude Design (claude.ai), in that design system's file
// format. Its React components are this library's real Angular components:
// each renders its custom element from rais-elements.js and sets the element's
// inputs from its props.
//
//   bundle.js    one classic script: every asset as a data: URI (RAIS_ASSETS),
//                dist/elements/rais-elements.js and the React components
//                (window.RAISDesignSystem_13240a)
//   bundle.css   Figtree, the PrimeNG Aura theme, src/index.css (its tokens as
//                defaults that the design system's own tokens.css overrides)
//                and the component styles
//   index.d.ts   every component's props (the design system's API cards)
//   <Name>/      <Name>.d.ts, README.md and a live preview.html made from the
//                component's Storybook stories
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { NOT_LITERAL, readComponentMetadata } from './component-metadata.mjs';
import { COMPONENTS, ICON } from './design-system/components.mjs';
import { readStories } from './stories.mjs';
import { globalStyles, readComponentStyles, relativeUrls, stylesheetMarker } from './stylesheet.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
/** The design system's global in Claude Design (its project/design-system.json `namespace`). */
const NAMESPACE = 'RAISDesignSystem_13240a';
const elementsDir = join(root, 'dist/elements');
const outDir = join(root, 'dist/design-system');
const componentsDir = join(outDir, 'project/components');
const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const source = sourceRevision();

/** React names that differ from the tag (`rais-colorful-label-chips` renders one chip). */
const NAMES = { 'rais-colorful-label-chips': 'ColorfulLabelChip' };
/** The Angular inputs named `style` keep React's `style` free for inline CSS. */
const STYLE_INPUT_PROPS = { 'rais-accordion-link': 'iconStyle', 'rais-selection-label': 'shape' };
/** Inputs that take a Boxicons name. */
const ICON_INPUTS = new Set(['rais-button.icon', 'rais-colorful-label-chips.icon', 'rais-link.icon']);
/** Inputs whose TypeScript type is wider than the values the component knows. */
const TYPE_OVERRIDES = {
  'rais-main-navigation-external.activeSection':
    '"agency-planning" | "revenue-docs" | "placement" | "servicing" | "account-insights" | "digital-marketing" | null',
};
/** Storybook groups in the order the design system lists them. */
const GROUP_ORDER = [
  'Buttons', 'Inputs', 'Selector Controls', 'Filters', 'Labeling', 'Content', 'Tables', 'Navigation', 'Header and Footer',
  'Loading', 'File Management', 'Pages', 'Core',
];
/**
 * `.rais-data-table`: a row of TableColumns, laid out like the `.data-table` rules of
 * src/components/insured-payments/insured-payments.component.scss, which let header and
 * cells shrink to column widths under their 134px minimum.
 */
const DATA_TABLE_CSS = [
  '/* .rais-data-table: TableColumns side by side, as .data-table in src/components/insured-payments */',
  '.rais-data-table{display:flex;flex-direction:row;align-items:flex-start;overflow-x:auto}',
  '.rais-data-table rais-table-column{display:inline-flex;flex-direction:column;vertical-align:top;flex-shrink:0}',
  '.rais-data-table .rais-table-header,.rais-data-table .rais-table-cell{box-sizing:border-box;width:100%!important;min-width:unset!important}',
].join('\n');
/** Props every component passes to its custom element. */
const HOST_PROPS = ['className', 'style', 'id', 'onClick', 'ref', 'key'];
const LIMITS = { bundleJs: 6 * 1024 * 1024, bundleCss: 2 * 1024 * 1024, dts: 1.5 * 1024 * 1024, preview: 256 * 1024, readme: 64 * 1024 };

for (const file of ['rais-elements.js', 'rais-elements.css']) {
  if (!existsSync(join(elementsDir, file))) fail(`dist/elements/${file} is missing: run npm run build:elements first.`);
}

step('Reading components and stories');
const assets = readAssets();
const iconNames = Object.keys(assets)
  .filter((path) => path.startsWith('boxicons/'))
  .map((path) => path.slice('boxicons/'.length, -'.svg'.length))
  .sort();
const components = sortComponents(readComponentMetadata(root).map(describeComponent));
const missing = Object.keys(COMPONENTS).filter((tag) => !components.some((c) => c.tag === tag));
if (missing.length) fail(`design-system/components.mjs describes components that do not exist: ${missing.join(', ')}`);
for (const c of components) checkExample(c);
checkIcons(ICON.preview.icons, 'Icon preview');

step('Writing dist/design-system');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(componentsDir, { recursive: true });
const written = [];
write('bundle.js', bundleJs(), LIMITS.bundleJs);
write('bundle.css', await bundleCss(), LIMITS.bundleCss);
write('index.d.ts', indexDts(), LIMITS.dts);
for (const c of [...components, iconComponent()]) {
  write(`${c.name}/${c.name}.d.ts`, componentDts(c));
  write(`${c.name}/README.md`, readme(c), LIMITS.readme);
  write(`${c.name}/preview.html`, preview(c), LIMITS.preview);
}
checkBundle(readFileSync(join(componentsDir, 'bundle.js'), 'utf8'));
const dtsBytes = written.filter((f) => f.path.endsWith('.d.ts')).reduce((sum, f) => sum + f.bytes, 0);
if (dtsBytes > LIMITS.dts) fail(`The .d.ts files total ${kb(dtsBytes)}, over the design system's 1.5 MB limit`);

for (const f of written.filter((f) => !f.path.includes('/'))) console.log(`  ${f.path.padEnd(12)} ${kb(f.bytes)}`);
console.log(`  + ${components.length + 1} component folders (README.md, preview.html, <Name>.d.ts)`);
console.log(`\n${components.length + 1} components → ${relative(root, componentsDir)}/  (source ${source})`);

// ─── Components ──────────────────────────────────────────────────────────────

function describeComponent(meta) {
  const config = COMPONENTS[meta.tag];
  if (!config) fail(`Describe <${meta.tag}> in scripts/elements/design-system/components.mjs (summary, example, notes, preview)`);
  const name = NAMES[meta.tag] ?? pascalCase(meta.tag.replace(/^rais-/, ''));
  const inputs = meta.inputs.map((input) => {
    if (input.aliasAttribute && !STYLE_INPUT_PROPS[meta.tag]) fail(`Name a React prop for <${meta.tag}>'s "${input.name}" input in STYLE_INPUT_PROPS`);
    return {
      ...input,
      prop: input.aliasAttribute ? STYLE_INPUT_PROPS[meta.tag] : input.name,
      aliases: input.aliasAttribute ? [input.property] : [],
      attr: input.aliasAttribute ?? input.attribute,
      tsType: tsType(meta.tag, input),
    };
  });
  const events = meta.outputs.map((output) => ({ ...output, prop: `on${output.name[0].toUpperCase()}${output.name.slice(1)}` }));
  const stories = readStories(root, meta.dir);
  if (!stories) fail(`<${meta.tag}> has no Storybook stories to take its group and previews from`);
  return { ...meta, ...config, name, inputs, events, group: stories.group, stories: storyArgs(meta.tag, stories.stories) };
}

function iconComponent() {
  return {
    ...ICON,
    tag: null,
    inputs: [
      { prop: 'name', tsType: 'IconName', required: true, description: 'Boxicons file name without `.svg`, e.g. `bx-search`, `bxs-info-circle`.' },
      { prop: 'size', tsType: 'number', default: 16, description: 'Width and height in px.' },
      { prop: 'color', tsType: 'string', default: 'currentColor', description: 'Any CSS color; the glyph is a mask, so it takes the color exactly.' },
    ].map((input) => ({ ...input, aliases: [] })),
    events: [],
  };
}

function sortComponents(list) {
  const rank = (c) => (GROUP_ORDER.includes(c.group) ? GROUP_ORDER.indexOf(c.group) : GROUP_ORDER.length);
  return list.sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}

/** Story name → props. Components with several story files get "<file title> — <story>" names. */
function storyArgs(tag, stories) {
  const titles = new Set(stories.map((s) => s.title));
  const byName = new Map();
  for (const story of stories) {
    const name = titles.size > 1 ? `${story.title.split('/').pop()} — ${story.name}` : story.name;
    byName.set(name, story.args);
  }
  for (const name of COMPONENTS[tag].preview.stories ?? []) {
    if (!byName.has(name)) fail(`<${tag}> has no story "${name}" (stories: ${[...byName.keys()].join(', ')})`);
  }
  return byName;
}

function tsType(tag, input) {
  const key = `${tag}.${input.name}`;
  if (TYPE_OVERRIDES[key]) return TYPE_OVERRIDES[key];
  if (ICON_INPUTS.has(key)) return input.default === '' || /empty|no icon/i.test(input.description) ? 'IconName | ""' : 'IconName';
  if (input.kind !== 'json' && input.typeExpanded && input.typeExpanded !== input.type && input.typeExpanded.length < 400) return input.typeExpanded;
  return input.type;
}

/** Story args (Angular input names) as React props. */
function reactProps(c, args) {
  const props = {};
  for (const [key, value] of Object.entries(args)) {
    const input = c.inputs.find((i) => i.name === key || i.prop === key);
    if (input && value !== undefined) props[input.prop] = value;
  }
  return props;
}

// ─── bundle.js ───────────────────────────────────────────────────────────────

function bundleJs() {
  const header = {
    format: 4,
    namespace: NAMESPACE,
    components: [...components.map((c) => ({ name: c.name })), { name: ICON.name }],
    inlinedExternals: ['@angular/core', '@angular/elements', '@angular/common', 'primeng', 'zone.js'],
  };
  const specs = components.map((c) => ({
    name: c.name,
    tag: c.tag,
    children: c.hasContentProjection,
    inputs: c.inputs.map((i) => ({ prop: i.prop, attr: i.attr, kind: i.kind, ...(i.aliases.length ? { aliases: i.aliases } : {}) })),
    events: c.events.map((e) => ({ prop: e.prop, name: e.name })),
  }));
  const dataUris = Object.fromEntries(Object.entries(assets).map(([path, svg]) => [path, svgDataUri(svg)]));
  // Consumers inline bundle.js in a <script>: it must not contain "</script" or "<!--".
  const elements = readFileSync(join(elementsDir, 'rais-elements.js'), 'utf8')
    .replace(/<\/(script)/gi, '<\\/$1')
    .replace(/<!--/g, '\\x3C!--');
  const wrappers = readFileSync(join(root, 'scripts/elements/design-system/react-components.js'), 'utf8').trim().replace(/;$/, '');
  return [
    `/* @ds-bundle: ${JSON.stringify(header)} */`,
    `/*! RAIS Design System components: rais-component-library ${version} (${source}), generated by scripts/elements/design-system.mjs */`,
    `window.RAIS_ASSETS = Object.assign(${JSON.stringify(dataUris)}, window.RAIS_ASSETS || {});`,
    elements.trim(),
    `(${wrappers})(${JSON.stringify(NAMESPACE)}, ${JSON.stringify(specs)});`,
    '',
  ].join('\n');
}

function readAssets() {
  const dir = join(root, 'public/assets');
  const files = {};
  const walk = (sub) => {
    for (const entry of readdirSync(join(dir, sub), { withFileTypes: true })) {
      const path = sub ? `${sub}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(path);
      else if (path.endsWith('.svg')) files[path] = readFileSync(join(dir, path), 'utf8');
      else fail(`public/assets/${path}: only SVG assets can be embedded (add a MIME type in design-system.mjs)`);
    }
  };
  walk('');
  return Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b)));
}

/** A `data:` URI that leaves the SVG text as it is, percent-encoding only what a URL can't hold. */
function svgDataUri(svg) {
  const unsafe = /[\x00-\x1f\x7f%#<>"'\\^`{|}[\]]|[^\x00-\x7f]+/g;
  return `data:image/svg+xml,${svg.replace(unsafe, (text) => encodeURIComponent(text).replace(/'/g, '%27'))}`;
}

function checkBundle(js) {
  if (/<\/script/i.test(js) || js.includes('<!--')) fail('bundle.js contains "</script" or "<!--", which would break pages that inline it');
  if (!js.startsWith('/* @ds-bundle: ')) fail('bundle.js must start with its @ds-bundle header');
  try {
    new vm.Script(js, { filename: 'bundle.js' });
  } catch (error) {
    fail(`bundle.js does not parse: ${error.message}`);
  }
}

// ─── bundle.css ──────────────────────────────────────────────────────────────

async function bundleCss() {
  const { imports, indexCss, aura } = await globalStyles(root);
  const { css: componentCss, fingerprint } = readComponentStyles(readFileSync(join(elementsDir, 'rais-elements.css'), 'utf8'));
  const { tokens, primeng, rules } = splitIndexCss(indexCss);
  const css = [
    `/*! RAIS Design System components: rais-elements ${version} (${source}) | build ${fingerprint} */`,
    ...imports,
    '/* PrimeNG Aura theme */',
    aura,
    "/* RAIS tokens from src/index.css as defaults: the design system's tokens.css (its tokens.json) overrides them */",
    `:where(:root){${tokens}}`,
    '/* PRIMENG OVERRIDES from src/index.css (after the Aura theme) */',
    `:root{${primeng}}`,
    '/* Base styles from src/index.css */',
    rules,
    '/* Component styles (Angular emulated encapsulation; assets come from RAIS_ASSETS in bundle.js) */',
    componentCss,
    DATA_TABLE_CSS,
    stylesheetMarker(fingerprint),
    '',
  ].join('\n');
  if (/<\/style/i.test(css)) fail('bundle.css contains "</style"');
  const stray = relativeUrls(css);
  if (stray.length) fail(`bundle.css has url()s that would not resolve in Claude Design: ${stray.join(', ')}`);
  return css;
}

/** Minified src/index.css → its `:root` declarations (tokens, PrimeNG overrides) and its other rules. */
function splitIndexCss(css) {
  const tokens = [];
  const primeng = [];
  let rules = '';
  for (const rule of topLevelRules(css)) {
    const open = rule.indexOf('{');
    if (rule.slice(0, open).trim() !== ':root') {
      rules += rule;
      continue;
    }
    for (const declaration of splitTopLevel(rule.slice(open + 1, -1), ';')) {
      (declaration.startsWith('--p-') ? primeng : tokens).push(declaration);
    }
  }
  if (!tokens.length || !primeng.length) fail('src/index.css: expected design tokens and PRIMENG OVERRIDES under :root');
  return { tokens: tokens.join(';'), primeng: primeng.join(';'), rules };
}

function topLevelRules(css) {
  const rules = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '"' || css[i] === "'") i = css.indexOf(css[i], i + 1);
    else if (css[i] === '{') depth++;
    else if (css[i] === '}' && --depth === 0) {
      rules.push(css.slice(start, i + 1));
      start = i + 1;
    }
  }
  return rules;
}

function splitTopLevel(text, separator) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"' || c === "'") i = text.indexOf(c, i + 1);
    else if (c === '(') depth++;
    else if (c === ')') depth--;
    else if (c === separator && depth === 0) {
      parts.push(text.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(text.slice(start).trim());
  return parts.filter(Boolean);
}

// ─── Types ───────────────────────────────────────────────────────────────────

function indexDts() {
  const shapes = new Map();
  for (const c of components) {
    for (const input of c.inputs.filter((i) => i.shape)) {
      const [, name, body] = /^(\w+) = (\{[\s\S]*\})$/.exec(input.shape) ?? [];
      if (!name) fail(`<${c.tag}> ${input.name}: cannot read the item type "${input.shape}"`);
      if (shapes.has(name) && shapes.get(name) !== body) fail(`Two different item types are named ${name}`);
      shapes.set(name, body);
    }
  }
  return [
    `// ${NAMESPACE}: React components for the RAIS component library's custom elements.`,
    `// Generated by scripts/elements/design-system.mjs from rais-component-library ${version} (${source}). Do not edit.`,
    '//',
    '// Every component renders the library\'s real Angular component as a custom element (<rais-button> …)',
    '// and sets its inputs from these props. Besides its own props, each one passes `className`, `style`, `id`,',
    '// `onClick`, `aria-*` and `data-*` to that element; `ref` is the element.',
    '',
    `/** Boxicons glyph names (${iconNames.length}): for \`Icon\` and every \`icon\` prop. */`,
    `export type IconName =\n${iconNames.map((name) => `  | ${JSON.stringify(name)}`).join('\n')};`,
    '',
    ...[...shapes].flatMap(([name, body]) => [`export interface ${name} ${formatShape(body)}`, '']),
    ...[...components, iconComponent()].flatMap((c) => [declarations(c), '']),
  ].join('\n');
}

function componentDts(c) {
  const shared = ['IconName', 'DateCell', 'ContentCardListItem', 'SearchableMenuOption', 'SearchableOption'].filter((type) =>
    c.inputs.some((i) => new RegExp(`\\b${type}\\b`).test(i.tsType)),
  );
  return [
    ...(c.startingPoint ? [`/** @startingPoint ${c.startingPoint} */`] : []),
    `// ${c.name}: generated by scripts/elements/design-system.mjs. Do not edit.`,
    ...(shared.length ? [`// ${shared.join(', ')}: see ../index.d.ts.`] : []),
    '',
    declarations(c),
    '',
  ].join('\n');
}

function declarations(c) {
  const members = [
    ...c.inputs.map((input) => {
      const doc = [input.description, input.default !== undefined && input.default !== NOT_LITERAL ? `@default ${JSON.stringify(input.default)}` : '']
        .filter(Boolean)
        .join('\n');
      return member(doc, `${input.prop}${input.required ? '' : '?'}: ${input.tsType};`);
    }),
    ...c.inputs.flatMap((input) =>
      input.aliases.map((alias) => member(`Same as \`${input.prop}\` (the custom element's property name).`, `${alias}?: ${input.tsType};`)),
    ),
    ...c.events.map((event) =>
      member(
        event.description,
        event.detail === 'void' ? `${event.prop}?: () => void;` : `${event.prop}?: (detail: ${event.detail}, event: CustomEvent<${event.detail}>) => void;`,
      ),
    ),
    ...(c.hasContentProjection ? [member('Content of the body.', 'children?: React.ReactNode;')] : []),
    ...(c.tag
      ? [
          member('Classes on the custom element.', 'className?: string;'),
          member('Inline style of the custom element (margins, width, flex).', 'style?: React.CSSProperties;'),
          member('Native click anywhere in the component.', 'onClick?: (event: React.MouseEvent<HTMLElement>) => void;'),
        ]
      : [member('Inline style of the glyph.', 'style?: React.CSSProperties;')]),
  ];
  const doc = [
    c.summary,
    '',
    ...c.notes.map((note) => `- ${note}`),
    ...(c.tag ? ['', `Renders \`<${c.tag}>\`: the Angular component in \`${c.file}\`.`] : []),
    '',
    '@example',
    c.example,
  ];
  return [
    `export interface ${c.name}Props {`,
    ...members,
    '}',
    '',
    comment(doc, ''),
    `export declare function ${c.name}(props: ${c.name}Props): JSX.Element;`,
    ...(c.tag
      ? []
      : [
          '',
          '/** The URL of a Boxicons glyph: its `data:` URI from the bundle. */',
          'export declare function raisIconUrl(name: IconName): string;',
          '',
          '/** Where assets that the bundle does not embed load from (`window.RAIS_ASSET_BASE`, default `./assets/`). */',
          'export declare function raisAssetBase(): string;',
        ]),
  ].join('\n');
}

function member(doc, line) {
  return `${doc ? `${comment(doc.split('\n'), '  ')}\n` : ''}  ${line}`;
}

function comment(lines, indent) {
  const safe = lines.map((line) => line.replace(/\*\//g, '*\\/'));
  if (safe.length === 1) return `${indent}/** ${safe[0]} */`;
  return [`${indent}/**`, ...safe.map((line) => (line ? `${indent} * ${line}` : `${indent} *`)), `${indent} */`].join('\n');
}

function formatShape(body) {
  const fields = splitTopLevel(body.slice(1, -1), ';');
  return `{\n${fields.map((field) => `  ${field};`).join('\n')}\n}`;
}

// ─── README.md ───────────────────────────────────────────────────────────────

function readme(c) {
  const lines = [`# ${c.name}`, '', c.summary, '', '```jsx', c.example, '```', ''];
  lines.push('## Guidelines', '', ...c.notes.map((note) => `- ${note}`), '');
  if (c.inputs.length) {
    lines.push('## Props', '', '| Prop | Type | Default | Description |', '| --- | --- | --- | --- |');
    for (const input of c.inputs) {
      const value = input.default === undefined || input.default === NOT_LITERAL ? '—' : code(truncate(JSON.stringify(input.default), 60));
      const type = input.tsType.startsWith('IconName') ? input.tsType : truncate(input.tsType, 120);
      lines.push(`| \`${input.prop}\` | ${code(type)} | ${value} | ${cell(input.description)} |`);
    }
    lines.push('');
  }
  if (c.events.length) {
    lines.push('## Events', '', '| Prop | Called with | When |', '| --- | --- | --- |');
    for (const event of c.events) {
      const args = event.detail === 'void' ? '—' : code(`(detail: ${event.detail}, event)`);
      lines.push(`| \`${event.prop}\` | ${args} | ${cell(event.description)} |`);
    }
    lines.push('');
  }
  if (c.tag) {
    lines.push(
      '## Implementation',
      '',
      `Renders \`<${c.tag}>\`, the library's Angular component (\`${c.file}\`) compiled to a custom element, so it has the app's exact markup and styles. ` +
        (c.inputs.length ? 'Props are written to the element as attributes; ' : '') +
        '`className`, `style`, `id`, `onClick`, `aria-*` and `data-*` go on the element itself' +
        (c.hasContentProjection ? ', and children are projected into its body.' : '. It takes no children.'),
      '',
    );
  }
  return `${lines.join('\n').trimEnd()}\n`;
}

function code(text) {
  return `\`${String(text).replace(/\|/g, '\\|').replace(/`/g, "'")}\``;
}

function cell(text = '') {
  return String(text).replace(/\|/g, '\\|').replace(/\n+/g, ' ');
}

function truncate(text, max) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

// ─── preview.html ────────────────────────────────────────────────────────────

function preview(c) {
  const config = c.preview;
  const variants = [
    ...(config.stories ?? []).map((name) => ({
      caption: name,
      props: { ...reactProps(c, c.stories.get(name)), ...reactProps(c, config.args ?? {}) },
      ...(config.children ? { children: config.children } : {}),
    })),
    ...(config.items ?? []).map((item) => ({ caption: item.caption ?? '', props: reactProps(c, item.props), children: item.children })),
    ...(config.icons ?? []).map((name) => ({ caption: name, props: { name, size: 20, color: '#333333' } })),
  ];
  const subtitle = config.subtitle ?? truncate(variants.map((v) => v.caption).join(', '), 90);
  const marker = [`group="${c.group}"`, `height=${config.height}`, config.width ? `width=${config.width}` : '', `subtitle="${subtitle.replace(/"/g, "'")}"`]
    .filter(Boolean)
    .join(' ');
  const layout = {
    row: '#root{display:flex;flex-wrap:wrap;align-items:flex-start;gap:20px 28px}',
    grid: `#root{display:grid;grid-template-columns:repeat(auto-fill,minmax(${config.min ?? 320}px,1fr));align-items:start;gap:24px}`,
    stack: '#root{display:flex;flex-direction:column;gap:24px}',
    stage: `#root{${config.stage}}`,
    table: '',
    page: 'body{padding:0}#root{height:100vh}',
  }[config.layout];
  if (layout === undefined) fail(`<${c.tag ?? c.name}> preview: unknown layout "${config.layout}"`);
  const captions = !['stage', 'table', 'page'].includes(config.layout);
  const data = JSON.stringify({ name: c.name, captions, variants }).replace(/</g, '\\u003c');
  return [
    `<!-- @dsCard ${marker} -->`,
    ...(config.startingPoint ? [`<!-- @startingPoint ${config.startingPoint} -->`] : []),
    '<!DOCTYPE html>',
    `<html><head><meta charset="utf-8"><title>${c.name}</title>`,
    '<style>',
    `body{margin:0;padding:24px;background:${config.page ? '#F0F2F5' : '#FFFFFF'}}`,
    '.cell{display:flex;flex-direction:column;align-items:flex-start;gap:8px;min-width:0}',
    ".caption{font:600 11px/1.3 'Figtree',sans-serif;letter-spacing:.04em;color:#606060}",
    layout,
    '</style></head>',
    `<body><div id="root"${config.layout === 'table' ? ' class="rais-data-table"' : ''}></div>`,
    '<script>',
    `(function (data) {`,
    `  var NS = window.${NAMESPACE};`,
    '  var h = React.createElement;',
    '  var Component = NS[data.name];',
    '  function tree(node) {',
    "    return typeof node === 'string' ? node : h.apply(null, [node[0], node[1]].concat(node.slice(2).map(tree)));",
    '  }',
    '  var items = data.variants.map(function (v, i) {',
    '    var el = h(Component, Object.assign({ key: i }, v.props), v.children ? tree(v.children) : undefined);',
    "    return data.captions ? h('div', { className: 'cell', key: i }, h('div', { className: 'caption' }, v.caption), el) : el;",
    '  });',
    "  ReactDOM.createRoot(document.getElementById('root')).render(items);",
    `})(${data});`,
    '</script>',
    '</body></html>',
    '',
  ].join('\n');
}

// ─── Checks ──────────────────────────────────────────────────────────────────

/** The example must use real props, with values the props accept. */
function checkExample(c) {
  const open = `<${c.name}`;
  const { attributes, end } = c.example.startsWith(open) ? startTag(c.example, open.length) : { attributes: [], end: -1 };
  const rest = end < 0 ? '' : c.example.slice(end);
  if (rest !== '/>' && !(rest.startsWith('>') && rest.endsWith(`</${c.name}>`))) {
    fail(`<${c.tag}> example must be one <${c.name} …/> element: ${c.example}`);
  }
  const props = new Map([
    ...c.inputs.flatMap((i) => [[i.prop, i], ...i.aliases.map((a) => [a, i])]),
    ...c.events.map((e) => [e.prop, e]),
    ...HOST_PROPS.map((p) => [p, null]),
    ...(c.hasContentProjection ? [['children', null]] : []),
  ]);
  for (const [name, value] of attributes) {
    if (!props.has(name) && !/^(aria|data)-/.test(name)) fail(`<${c.tag}> example uses "${name}", which is not a prop of ${c.name}`);
    const input = props.get(name);
    const literal = value?.startsWith('"') ? value.slice(1, -1) : undefined;
    if (literal !== undefined && input?.tsType) {
      const options = [...input.tsType.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
      if (options.length && !/\bstring\b/.test(input.tsType) && !input.tsType.startsWith('IconName') && !options.includes(literal)) {
        fail(`<${c.tag}> example: ${name}="${literal}" is not one of ${options.join(', ')}`);
      }
    }
    if (input?.tsType?.startsWith('IconName') && literal) checkIcons([literal], `<${c.tag}> example`);
  }
  for (const [name, args] of c.stories) {
    for (const key of Object.keys(args)) {
      if (!c.inputs.some((i) => i.name === key)) console.warn(`  note: <${c.tag}> story "${name}" sets "${key}", which is not an input`);
    }
  }
}

/** The attributes of a JSX start tag (`name="…"`, `name={…}`, bare `name`) and where the tag's `>` or `/>` is. */
function startTag(text, from) {
  const attributes = [];
  let i = from;
  for (;;) {
    while (/\s/.test(text[i] ?? '')) i++;
    if (i >= text.length || text[i] === '>' || text.startsWith('/>', i)) return { attributes, end: i };
    const name = /^[A-Za-z][\w-]*/.exec(text.slice(i));
    if (!name) return { attributes, end: -1 };
    i += name[0].length;
    let value;
    if (text[i] === '=' && text[i + 1] === '"') {
      const close = text.indexOf('"', i + 2);
      value = text.slice(i + 1, close + 1);
      i = close + 1;
    } else if (text[i] === '=' && text[i + 1] === '{') {
      let depth = 0;
      const start = ++i;
      for (; i < text.length; i++) {
        if (text[i] === '"' || text[i] === "'") i = text.indexOf(text[i], i + 1);
        else if (text[i] === '{') depth++;
        else if (text[i] === '}' && --depth === 0) break;
      }
      value = text.slice(start, ++i);
    }
    attributes.push([name[0], value]);
  }
}

function checkIcons(names, where) {
  const unknown = names.filter((name) => !iconNames.includes(name));
  if (unknown.length) fail(`${where}: no Boxicons glyph named ${unknown.join(', ')} in public/assets/boxicons`);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function write(path, text, limit) {
  const file = join(componentsDir, path);
  const bytes = Buffer.byteLength(text);
  if (limit && bytes > limit) fail(`${path} is ${kb(bytes)}, over the design system's ${kb(limit)} limit`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
  written.push({ path, bytes });
}

function sourceRevision() {
  try {
    const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
    const dirty = execFileSync('git', ['status', '--porcelain', '--', 'src', 'scripts', 'public'], { cwd: root, encoding: 'utf8' }).trim();
    return dirty ? `${sha}+local changes` : sha;
  } catch {
    return 'unknown revision';
  }
}

function pascalCase(text) {
  return text.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
}

function step(message) {
  console.log(`\n▸ ${message}`);
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} kB`.padStart(9);
}

function fail(message) {
  console.error(`\n✖ ${message}`);
  process.exit(1);
}

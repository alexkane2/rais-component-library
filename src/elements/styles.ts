import { Type } from '@angular/core';
import { cssAssetPaths, replaceCssAssetUrls } from './assets';

/**
 * Component styles ship in rais-elements.css. The stylesheet sets this custom
 * property to the fingerprint of the component CSS it contains, so the runtime
 * can tell it is loaded (and from the same build) and skip injecting the styles.
 */
export const STYLESHEET_MARKER = '--rais-elements-css';

/** Custom property holding the `url()` of one asset, e.g. `--rais-asset-boxicons_bx-bell_svg`. */
export function assetVariable(path: string): string {
  return `--rais-asset-${path.replace(/[^a-zA-Z0-9-]/g, '_')}`;
}

/** Turns `url(/assets/x.svg)` into `var(--rais-asset-x_svg)` so the asset base can be set at runtime. */
export function withAssetVariables(css: string): string {
  return replaceCssAssetUrls(css, (path) => `var(${assetVariable(path)})`);
}

export interface ComponentStylesheet {
  /** The encapsulated component styles, as Angular would inject them, with asset URLs as variables. */
  css: string;
  /** Asset paths those variables stand for. */
  assetPaths: string[];
  fingerprint: string;
}

interface ComponentDef {
  id: string;
  styles: string[];
}

/**
 * The CSS Angular injects for these components with emulated encapsulation
 * (`%COMP%` → `<appId>-<component id>`). Page-global rules (see
 * splitGlobalRules) are left out: they are only applied while their component
 * is rendered.
 */
export function componentStylesheet(components: readonly Type<unknown>[], appId: string): ComponentStylesheet {
  const defs = components.map((component) => (component as any).ɵcmp as ComponentDef);
  const encapsulated = defs
    .flatMap((def) => def.styles.map((css) => splitGlobalRules(css).scoped.replace(/%COMP%/g, `${appId}-${def.id}`)))
    .filter(Boolean)
    .join('\n');
  const css = withAssetVariables(encapsulated);
  const assetPaths = cssAssetPaths(defs.flatMap((def) => def.styles).join('\n'));
  return { css, assetPaths, fingerprint: fingerprint(css) };
}

/**
 * Separates rules scoped to the component (their selectors carry the
 * `%COMP%` encapsulation attribute) from page-global ones, which a top-level
 * `::ng-deep` produces (e.g. `rais-table-cell { width: 100% }` in
 * rais-table-column). Angular only adds a component's styles while it is on
 * the page, so global rules must not live in the always-loaded stylesheet.
 */
export function splitGlobalRules(css: string): { scoped: string; global: string } {
  let scoped = '';
  let global = '';
  for (const rule of topLevelRules(css)) {
    const open = rule.indexOf('{');
    const prelude = rule.slice(0, open).trim();
    const block = rule.slice(open);
    if (open < 0 || prelude.startsWith('@')) {
      if (/^@(media|supports|container|layer)\b/.test(prelude)) {
        const inner = splitGlobalRules(block.slice(1, -1));
        if (inner.scoped) scoped += `${prelude}{${inner.scoped}}`;
        if (inner.global) global += `${prelude}{${inner.global}}`;
      } else {
        scoped += rule;
      }
      continue;
    }
    const selectors = splitSelectorList(prelude);
    const own = selectors.filter((s) => s.includes('%COMP%'));
    const others = selectors.filter((s) => !s.includes('%COMP%'));
    if (own.length) scoped += own.join(',') + block;
    if (others.length) global += others.join(',') + block;
  }
  return { scoped, global };
}

/** Top-level `prelude{…}` blocks of a stylesheet (strings and comments aware). */
function topLevelRules(css: string): string[] {
  const rules: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '"' || c === "'") {
      for (i++; i < css.length && css[i] !== c; i++) if (css[i] === '\\') i++;
    } else if (c === '/' && css[i + 1] === '*') {
      i = css.indexOf('*/', i + 2);
      if (i < 0) break;
      i++;
    } else if (c === '{') {
      depth++;
    } else if (c === '}' && --depth === 0) {
      rules.push(css.slice(start, i + 1).replace(/\/\*[\s\S]*?\*\//g, '').trim());
      start = i + 1;
    }
  }
  const rest = css.slice(start).trim();
  if (rest) rules.push(rest);
  return rules;
}

function splitSelectorList(prelude: string): string[] {
  const selectors: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < prelude.length; i++) {
    const c = prelude[i];
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    else if (c === ',' && depth === 0) {
      selectors.push(prelude.slice(start, i).trim());
      start = i + 1;
    }
  }
  selectors.push(prelude.slice(start).trim());
  return selectors.filter(Boolean);
}

/** FNV-1a hash, used to match rais-elements.css to the bundle it was built with. */
function fingerprint(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/** Whether rais-elements.css from the same build applies to the page. */
export function stylesheetStatus(expected: string): 'loaded' | 'missing' | 'mismatch' {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(STYLESHEET_MARKER)
    .trim()
    .replace(/^["']|["']$/g, '');
  if (!value) return 'missing';
  return value === expected ? 'loaded' : 'mismatch';
}

/** Points the `--rais-asset-*` variables at files under `base`. */
export function defineAssetVariables(paths: readonly string[], base: string): void {
  const rule = `:root{${paths.map((path) => `${assetVariable(path)}:url("${base}${path}")`).join(';')}}`;
  if ('adoptedStyleSheets' in Document.prototype && 'replaceSync' in CSSStyleSheet.prototype) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(rule);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  } else {
    const style = document.createElement('style');
    style.textContent = rule;
    document.head.appendChild(style);
  }
}

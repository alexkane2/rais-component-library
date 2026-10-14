// The parts of rais-elements.css around the component styles, shared by
// build.mjs (rais-elements.css) and design-system.mjs (the Claude Design bundle.css).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as esbuild from 'esbuild';
import { primengAuraCss } from './primeng-theme.mjs';

/** Comment that precedes the component styles in rais-elements.css. */
export const COMPONENT_STYLES_HEADING = '/* Component styles (Angular emulated encapsulation; asset URLs come from RAIS_ASSET_BASE) */';

// @import must precede every other rule. (The Google Fonts URL itself contains semicolons.)
const IMPORT_RULE = /@import\s+(?:url\([^)]*\)|"[^"]*"|'[^']*')[^;]*;/g;

/** src/index.css split into its @import rules and the rest (minified), plus the PrimeNG Aura theme. */
export async function globalStyles(root) {
  const indexCss = readFileSync(join(root, 'src/index.css'), 'utf8');
  const { code } = await esbuild.transform(indexCss.replace(IMPORT_RULE, ''), { loader: 'css', minify: true });
  return { imports: indexCss.match(IMPORT_RULE) ?? [], indexCss: code.trim(), aura: await primengAuraCss(root) };
}

/** The rule that tells the runtime which build's component styles a stylesheet holds. */
export function stylesheetMarker(fingerprint) {
  return `:root{--rais-elements-css:"${fingerprint}"}`;
}

/** The component styles and their fingerprint, read back from a rais-elements.css that build.mjs wrote. */
export function readComponentStyles(stylesheet) {
  const start = stylesheet.indexOf(COMPONENT_STYLES_HEADING);
  const marker = /:root\{--rais-elements-css:"([0-9a-f]{8})"\}\s*$/.exec(stylesheet);
  if (start < 0 || !marker) throw new Error('rais-elements.css was not written by scripts/elements/build.mjs');
  return { css: stylesheet.slice(start + COMPONENT_STYLES_HEADING.length, marker.index).trim(), fingerprint: marker[1] };
}

/** `url()`s other than https ones: they would not go through RAIS_ASSET_BASE / RAIS_ASSETS. */
export function relativeUrls(css) {
  return [...css.matchAll(/url\(([^)]*)\)/g)].map((m) => m[1]).filter((url) => !/^['"]?https:/.test(url));
}

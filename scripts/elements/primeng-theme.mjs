// The PrimeNG Aura theme as CSS, produced with the same @primeuix calls
// PrimeNG's ThemeProvider makes at startup for src/app.config.ts
// (providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: false } } })).
//
// Included: the Aura design tokens (primitive / semantic / global CSS variables)
// and the preset's own global CSS.
// Not included: PrimeNG's core base stylesheet (a global `*, ::before, ::after
// { box-sizing: border-box }` reset plus .p-* helpers for PrimeNG's own
// components). No RAIS component renders a PrimeNG component, and that reset
// would change how RAIS checkboxes draw their tick (an ::after box) compared
// with Storybook.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

export async function primengAuraCss(root) {
  const require = createRequire(`${root}/package.json`);
  // Use the @primeuix packages primeng itself depends on.
  const primeng = createRequire(require.resolve('primeng/package.json'));
  const load = async (resolver, id) => import(pathToFileURL(resolver.resolve(id)).href);
  const { Theme } = await load(primeng, '@primeuix/styled');
  const { minifyCSS } = await load(primeng, '@primeuix/utils');
  const { default: Aura } = await load(require, '@primeuix/themes/aura');

  Theme.setTheme({ preset: Aura, options: { darkModeSelector: false } });
  const { primitive, semantic, global, style } = Theme.getCommon('base');
  const presetCss = style ? minifyCSS(Theme.transformCSS('global-style', style)).trim() : '';
  return [primitive?.css, semantic?.css, global?.css, presetCss].filter(Boolean).join('\n');
}

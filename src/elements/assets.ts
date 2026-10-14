/**
 * Components reference their icons/images as `assets/...` or `/assets/...`
 * (relative to the Storybook/app root). In the custom elements bundle those
 * paths are re-pointed at a base URL the page can configure:
 *
 *   <script>window.RAIS_ASSET_BASE = 'https://cdn.example.com/rais/assets/';</script>
 *   <script src="rais-elements.js"></script>
 */
export const DEFAULT_ASSET_BASE = './assets/';

declare global {
  interface Window {
    RAIS_ASSET_BASE?: string;
  }
}

/** Absolute URL (ending in `/`) of the assets folder, resolved against the page. */
export function resolveAssetBase(): string {
  const configured = typeof window.RAIS_ASSET_BASE === 'string' ? window.RAIS_ASSET_BASE.trim() : '';
  const url = new URL(configured || DEFAULT_ASSET_BASE, document.baseURI).href;
  return url.endsWith('/') ? url : `${url}/`;
}

const ASSET_PATH = /^(?:\.?\/)?assets\/(.+)$/;
const CSS_ASSET_URL = /url\(\s*(['"]?)((?:\.?\/)?assets\/[^'")\s]+)\1\s*\)/g;

/** `assets/boxicons/bx-x.svg` → `<base>boxicons/bx-x.svg`; other values are returned as-is. */
export function rewriteAssetPath(value: string, base: string): string {
  const match = ASSET_PATH.exec(value);
  return match ? base + match[1] : value;
}

/** Replaces every `url(assets/…)` in a CSS string; `replace` receives the path inside the assets folder. */
export function replaceCssAssetUrls(css: string, replace: (path: string) => string): string {
  return css.replace(CSS_ASSET_URL, (_match, _quote, url: string) => replace(url.replace(ASSET_PATH, '$1')));
}

/** Paths (inside the assets folder) referenced by `url()` in a CSS string. */
export function cssAssetPaths(css: string): string[] {
  const paths = new Set<string>();
  replaceCssAssetUrls(css, (path) => {
    paths.add(path);
    return '';
  });
  return [...paths];
}

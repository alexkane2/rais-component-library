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
    /**
     * Optional URL for individual assets, keyed by their path inside the assets
     * folder (`boxicons/bx-save.svg`): an absolute or `data:` URL. Listed paths
     * win over RAIS_ASSET_BASE; e.g. a bundle that embeds its icons.
     */
    RAIS_ASSETS?: Record<string, string>;
  }
}

/** Gives the URL an asset loads from, by its path inside the assets folder. */
export type AssetResolver = (path: string) => string;

/** Absolute URL (ending in `/`) of the assets folder, resolved against the page. */
export function resolveAssetBase(): string {
  const configured = typeof window.RAIS_ASSET_BASE === 'string' ? window.RAIS_ASSET_BASE.trim() : '';
  const url = new URL(configured || DEFAULT_ASSET_BASE, document.baseURI).href;
  return url.endsWith('/') ? url : `${url}/`;
}

/** `window.RAIS_ASSETS[path]` when listed, otherwise `path` under `base`. */
export function createAssetResolver(base: string): AssetResolver {
  const urls = window.RAIS_ASSETS ?? {};
  return (path) => (Object.prototype.hasOwnProperty.call(urls, path) ? urls[path] : base + path);
}

/** A CSS `url()` for any URL, quoted so `data:` URIs and odd characters stay intact. */
export function cssUrl(url: string): string {
  return `url("${url.replace(/["\\\n]/g, (c) => (c === '\n' ? '\\a ' : `\\${c}`))}")`;
}

const ASSET_PATH = /^(?:\.?\/)?assets\/(.+)$/;
const CSS_ASSET_URL = /url\(\s*(['"]?)((?:\.?\/)?assets\/[^'")\s]+)\1\s*\)/g;

/** `assets/boxicons/bx-x.svg` → where that asset loads from; other values are returned as-is. */
export function rewriteAssetPath(value: string, resolve: AssetResolver): string {
  const match = ASSET_PATH.exec(value);
  return match ? resolve(match[1]) : value;
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

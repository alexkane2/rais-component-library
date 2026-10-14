import { APP_ID, Renderer2, RendererFactory2, RendererType2, Type, reflectComponentType } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { replaceCssAssetUrls, resolveAssetBase, rewriteAssetPath } from './assets';
import { createRaisElement, markAngularOwned } from './element';
import { ELEMENTS_VERSION, ELEMENT_INPUTS } from './metadata.generated';
import {
  ComponentStylesheet,
  componentStylesheet,
  defineAssetVariables,
  splitGlobalRules,
  stylesheetStatus,
  withAssetVariables,
} from './styles';

/**
 * Prefix of the encapsulation attributes (`_nghost-rais-c123…`), so they cannot
 * collide with another Angular app on the same page.
 */
const RAIS_APP_ID = 'rais';

export type ElementRegistry = ReadonlyArray<readonly [tag: string, component: Type<unknown>]>;

export interface RaisElementsGlobal {
  version: string;
  tags: string[];
  /** Resolves once every tag is defined. */
  ready: Promise<void>;
  /** Absolute asset base URL in use (`window.RAIS_ASSET_BASE`, default `./assets/`). */
  assetBase?: string;
  /** `stylesheet`: component styles come from rais-elements.css. `injected`: it was not found, so the bundle injects them. */
  styles?: 'stylesheet' | 'injected';
}

declare global {
  interface Window {
    RaisElements?: RaisElementsGlobal;
  }
}

export function defineRaisElements(registry: ElementRegistry): void {
  const stylesheet = componentStylesheet(
    registry.map(([, component]) => component),
    RAIS_APP_ID,
  );
  const api: RaisElementsGlobal = {
    version: ELEMENTS_VERSION,
    tags: registry.map(([tag]) => tag),
    ready: Promise.resolve(),
  };
  // Read by scripts/elements/build.mjs, which evaluates the bundle in Node to
  // write the component CSS into rais-elements.css and check the registry.
  Object.defineProperty(api, '__build', { value: () => buildInfo(registry, stylesheet) });
  (globalThis as { RaisElements?: RaisElementsGlobal }).RaisElements = api;

  if (typeof document === 'undefined' || typeof customElements === 'undefined') return;

  api.ready = start(registry, stylesheet, api);
  api.ready.catch((error) => console.error('[rais-elements] failed to start', error));
}

async function start(registry: ElementRegistry, stylesheet: ComponentStylesheet, api: RaisElementsGlobal): Promise<void> {
  const assetBase = resolveAssetBase();
  const app = await createApplication({ providers: [{ provide: APP_ID, useValue: RAIS_APP_ID }] });

  // Define the tags once the page is parsed: an element defined earlier is
  // connected before the parser has added its children, and Angular only
  // projects (<ng-content>) the children present at that moment.
  if (document.readyState === 'loading') {
    await new Promise((resolve) => document.addEventListener('DOMContentLoaded', resolve, { once: true }));
  }

  const status = stylesheetStatus(stylesheet.fingerprint);
  if (status === 'missing') {
    console.warn(
      '[rais-elements] rais-elements.css is not loaded (or loads after rais-elements.js); component styles are injected ' +
        'from the bundle, but design tokens, fonts and the PrimeNG theme are missing.',
    );
  } else if (status === 'mismatch') {
    console.warn('[rais-elements] rais-elements.css comes from a different build than rais-elements.js; injecting component styles.');
  }
  const injectStyles = status !== 'loaded';
  defineAssetVariables(stylesheet.assetPaths, assetBase);
  api.assetBase = assetBase;
  api.styles = injectStyles ? 'injected' : 'stylesheet';

  patchRendering(app.injector.get(RendererFactory2), assetBase, injectStyles, new Set(api.tags));

  for (const [tag, component] of registry) {
    if (customElements.get(tag)) {
      console.warn(`[rais-elements] <${tag}> is already defined on this page; skipping it.`);
      continue;
    }
    const inputs = ELEMENT_INPUTS[tag];
    if (!inputs) console.error(`[rais-elements] no input metadata for <${tag}>; rebuild with npm run build:elements.`);
    customElements.define(tag, createRaisElement(component, app.injector, inputs ?? []));
  }
}

/**
 * Hooks into every renderer Angular creates for these components:
 *   - component styles: when rais-elements.css provides them, Angular only adds
 *     a component's page-global rules (and removes them with the component, as
 *     usual); otherwise it injects all of them. Asset URLs become variables.
 *   - `src` / inline-style asset paths in templates are re-pointed at the asset base;
 *   - nested RAIS tags created from templates are marked as Angular-owned.
 */
function patchRendering(factory: RendererFactory2, assetBase: string, injectStyles: boolean, tags: ReadonlySet<string>): void {
  const createRenderer = factory.createRenderer.bind(factory);
  const preparedTypes = new Map<string, RendererType2>();
  const patched = new WeakSet<Renderer2>();

  factory.createRenderer = (host: unknown, type: RendererType2 | null): Renderer2 => {
    if (type?.styles.length) {
      let prepared = preparedTypes.get(type.id);
      if (!prepared) {
        const styles = injectStyles ? type.styles : type.styles.map((css) => splitGlobalRules(css).global).filter(Boolean);
        prepared = { ...type, styles: styles.map(withAssetVariables) };
        preparedTypes.set(type.id, prepared);
      }
      type = prepared;
    }
    const renderer = createRenderer(host, type);
    if (!patched.has(renderer)) {
      patchRenderer(renderer, assetBase, tags);
      patched.add(renderer);
    }
    return renderer;
  };
}

function patchRenderer(renderer: Renderer2, assetBase: string, tags: ReadonlySet<string>): void {
  const { createElement, setAttribute, setProperty, setStyle } = renderer;
  const assetUrl = (path: string) => `url("${assetBase}${path}")`;

  renderer.createElement = (name: string, namespace?: string | null) => {
    const element = createElement.call(renderer, name, namespace);
    if (tags.has(name)) markAngularOwned(element);
    return element;
  };
  renderer.setAttribute = (el: any, name: string, value: string, namespace?: string | null) => {
    if (name === 'src') value = rewriteAssetPath(value, assetBase);
    else if (name === 'style') value = replaceCssAssetUrls(value, assetUrl);
    return setAttribute.call(renderer, el, name, value, namespace);
  };
  renderer.setProperty = (el: any, name: string, value: any) =>
    setProperty.call(renderer, el, name, name === 'src' && typeof value === 'string' ? rewriteAssetPath(value, assetBase) : value);
  renderer.setStyle = (el: any, style: string, value: any, flags?: any) =>
    setStyle.call(renderer, el, style, typeof value === 'string' ? replaceCssAssetUrls(value, assetUrl) : value, flags);
}

function buildInfo(registry: ElementRegistry, stylesheet: ComponentStylesheet) {
  return {
    ...stylesheet,
    elements: registry.map(([tag, component]) => {
      const mirror = reflectComponentType(component)!;
      return {
        tag,
        selector: mirror.selector,
        inputs: mirror.inputs.map(({ propName, templateName }) => ({ propName, templateName })),
        outputs: mirror.outputs.map(({ propName, templateName }) => ({ propName, templateName })),
        globalRules: ((component as any).ɵcmp.styles as string[]).map((css) => splitGlobalRules(css).global).join(''),
      };
    }),
  };
}

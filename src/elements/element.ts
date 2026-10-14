import { Injector, Type, booleanAttribute } from '@angular/core';
import { NgElementStrategy, createCustomElement } from '@angular/elements';

/** The concrete class createCustomElement() returns (it is typed as the abstract NgElement). */
interface NgElementInstance extends HTMLElement {
  readonly ngElementStrategy: NgElementStrategy;
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string | null, value: string | null): void;
}
type NgElementClass = (new () => NgElementInstance) & { observedAttributes: string[] };

/** How an attribute string is converted to the input's declared type. */
export type AttributeKind = 'string' | 'boolean' | 'number' | 'json' | 'string-or-false';

export interface InputSpec {
  /** Component class property (what Angular Elements' strategy expects). */
  prop: string;
  /** Observed attribute name (kebab-case of the input name). */
  attr: string;
  kind: AttributeKind;
  /** Restored when the attribute is removed. JSON-safe literal from the component source. */
  default?: unknown;
  /**
   * Set when the input name is also a native element property (`style`): the
   * native property keeps working and the input is exposed under `property` /
   * `attribute` instead. The original attribute still works for `keywords`.
   */
  alias?: { property: string; attribute: string; keywords: readonly string[] };
}

/** Elements Angular creates itself while rendering another component's template. */
const angularOwned = new WeakSet<Element>();

/**
 * A tag like `rais-table-header` is both a custom element and a component used in
 * other components' templates (e.g. inside `rais-table-column`). Angular already
 * creates the component on those nested elements, so the custom element must not
 * create a second instance on top of it.
 */
export function markAngularOwned(element: Element): void {
  angularOwned.add(element);
}

export function createRaisElement(
  component: Type<unknown>,
  injector: Injector,
  inputs: readonly InputSpec[],
): CustomElementConstructor {
  const Base = createCustomElement(component, { injector }) as unknown as NgElementClass;
  const inputByAttribute = new Map<string, InputSpec>();
  for (const input of inputs) {
    inputByAttribute.set(input.attr, input);
    if (input.alias) inputByAttribute.set(input.alias.attribute, input);
  }

  class RaisElement extends Base {
    static override observedAttributes = [...inputByAttribute.keys()];

    override connectedCallback(): void {
      if (angularOwned.has(this)) return;
      // Alias properties set before the element was upgraded (Angular Elements
      // handles this for regular input properties).
      for (const { alias } of inputs) {
        if (alias && Object.prototype.hasOwnProperty.call(this, alias.property)) {
          const value = (this as any)[alias.property];
          delete (this as any)[alias.property];
          (this as any)[alias.property] = value;
        }
      }
      super.connectedCallback();
    }

    override disconnectedCallback(): void {
      if (!angularOwned.has(this)) super.disconnectedCallback();
    }

    override attributeChangedCallback(name: string, oldValue: string | null, value: string | null): void {
      const input = inputByAttribute.get(name);
      if (!input || angularOwned.has(this)) return;
      if (input.alias && name === input.attr) {
        // `style` is also the inline-CSS attribute: only its keywords are input values.
        const isKeyword = (v: string | null) => v !== null && input.alias!.keywords.includes(v);
        if (!isKeyword(value) && !(value === null && isKeyword(oldValue))) return;
      }
      this.ngElementStrategy.setInputValue(input.prop, attributeToValue(input, value, this.localName) as any);
    }
  }

  for (const input of inputs) {
    if (!input.alias) continue;
    Object.defineProperty(RaisElement.prototype, input.alias.property, {
      get(this: any) {
        return this.ngElementStrategy.getInputValue(input.prop);
      },
      set(this: any, value: unknown) {
        this.ngElementStrategy.setInputValue(input.prop, value);
      },
      configurable: true,
      enumerable: true,
    });
    const native = Object.getOwnPropertyDescriptor(HTMLElement.prototype, input.prop);
    if (native) Object.defineProperty(RaisElement.prototype, input.prop, native);
  }

  return RaisElement;
}

function attributeToValue(input: InputSpec, value: string | null, tag: string): unknown {
  if (value === null) return copyDefault(input.default);
  switch (input.kind) {
    case 'boolean':
      return booleanAttribute(value);
    case 'number': {
      const number = value.trim() === '' ? NaN : Number(value);
      if (!Number.isNaN(number)) return number;
      console.warn(`<${tag}> ${input.attr}="${value}" is not a number; using the default.`);
      return copyDefault(input.default);
    }
    case 'json':
      try {
        return JSON.parse(value);
      } catch {
        console.warn(`<${tag}> ${input.attr} must be JSON (or set the ${input.prop} property from JS); using the default.`);
        return copyDefault(input.default);
      }
    case 'string-or-false':
      return value === 'false' ? false : value;
    default:
      return value;
  }
}

function copyDefault(value: unknown): unknown {
  return value !== null && typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : value;
}

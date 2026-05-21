import type { Meta, StoryObj } from '@storybook/html';

/**
 * Slim Tabs — RAIS Navigation component
 *
 * Tokens (from Figma variables):
 *   --color/border-focus       #007CBD → selected/hover underline + text
 *   --color/btn-text-secondary #007CBD → selected/hover label
 *   --color/text-header        #101928 → unselected label
 *   --spacing/spacing-01       4px     → gap between label and icons
 *   --spacing/spacing-03       8px     → small bottom padding
 *   --spacing/spacing-06       16px    → large bottom padding
 *
 * Variant matrix:
 *   state:    Selected / Unselected / Hover
 *   size:     Large / Small
 *   extras:   None / AI                  (AI adds a sparkle glyph)
 *   dropdown: boolean                    (adds bx-caret-down to the right)
 *
 * Type styles (Figma):
 *   Large: Figtree SemiBold 14 / line-height 1.2 / letter-spacing 0.42px
 *   Small: Figtree Bold 12     / line-height 1.4 / letter-spacing 0.18px
 *
 * Selected/Hover both render a 3px solid #007CBD bottom border.
 *
 * Icons:
 *   bx-caret-down.svg (boxicons) — dropdown affordance
 *   Inline SVG sparkle pair      — extras="AI"
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@600;700&display=swap');

    :root {
      --color-border-focus:       #007CBD;
      --color-btn-text-secondary: #007CBD;
      --color-text-header:        #101928;
      --spacing-01: 4px;
      --spacing-03: 8px;
      --spacing-06: 16px;
      --font-family: 'Figtree', sans-serif;
    }

    .rais-slim-tab {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-01);
      padding: 0 0 var(--spacing-06) 0;
      font-family: var(--font-family);
      cursor: pointer;
      border-bottom: 3px solid transparent;
      box-sizing: border-box;
      background: none;
      user-select: none;
    }

    /* Selected & Hover share the blue underline */
    .rais-slim-tab--selected,
    .rais-slim-tab--hover {
      border-bottom-color: var(--color-border-focus);
    }

    /* Small size: smaller pb, 12px bold text */
    .rais-slim-tab--small { padding-bottom: var(--spacing-03); }

    /* Label typography */
    .rais-slim-tab__label {
      white-space: nowrap;
      color: var(--color-text-header);
    }
    .rais-slim-tab--large .rais-slim-tab__label {
      font-weight: 600;
      font-size: 14px;
      line-height: 1.2;
      letter-spacing: 0.42px;
    }
    .rais-slim-tab--small .rais-slim-tab__label {
      font-weight: 700;
      font-size: 12px;
      line-height: 1.4;
      letter-spacing: 0.18px;
    }
    /* Selected/Hover text color */
    .rais-slim-tab--selected .rais-slim-tab__label,
    .rais-slim-tab--hover    .rais-slim-tab__label {
      color: var(--color-btn-text-secondary);
    }

    /* Caret icon — tinted via mask for exact color */
    .rais-slim-tab__caret {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      background-color: var(--color-text-header);
      -webkit-mask: url('assets/boxicons/bx-caret-down.svg') no-repeat center / contain;
              mask: url('assets/boxicons/bx-caret-down.svg') no-repeat center / contain;
    }
    .rais-slim-tab--small .rais-slim-tab__caret { width: 12px; height: 12px; }
    .rais-slim-tab--selected .rais-slim-tab__caret,
    .rais-slim-tab--hover    .rais-slim-tab__caret {
      background-color: var(--color-btn-text-secondary);
    }

    /* AI sparkle pair — inline SVG, colored via currentColor */
    .rais-slim-tab__sparkle {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      color: var(--color-text-header);
    }
    .rais-slim-tab--selected .rais-slim-tab__sparkle,
    .rais-slim-tab--hover    .rais-slim-tab__sparkle {
      color: var(--color-btn-text-secondary);
    }
  </style>
`;

const SPARKLE_SVG = `
  <svg class="rais-slim-tab__sparkle" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9.5 1.5l0.8 2.2 2.2 0.8 -2.2 0.8 -0.8 2.2 -0.8 -2.2 -2.2 -0.8 2.2 -0.8z" fill="currentColor"/>
    <path d="M4 7l0.55 1.45 1.45 0.55 -1.45 0.55 -0.55 1.45 -0.55 -1.45 -1.45 -0.55 1.45 -0.55z" fill="currentColor"/>
  </svg>
`;

type SlimTabState = 'selected' | 'unselected' | 'hover';
type SlimTabSize = 'large' | 'small';
type SlimTabExtras = 'none' | 'ai';

type SlimTabArgs = {
  label: string;
  state: SlimTabState;
  size: SlimTabSize;
  extras: SlimTabExtras;
  dropdown: boolean;
};

function renderSlimTab({ label, state, size, extras, dropdown }: SlimTabArgs) {
  const cls = ['rais-slim-tab',
    `rais-slim-tab--${state}`,
    `rais-slim-tab--${size}`,
    extras === 'ai' ? 'rais-slim-tab--ai' : '',
  ].filter(Boolean).join(' ');

  const sparkle = extras === 'ai' ? SPARKLE_SVG : '';
  const caret = dropdown ? `<span class="rais-slim-tab__caret" aria-hidden="true"></span>` : '';

  return `
    ${RAIS_STYLES}
    <span class="${cls}" role="tab" aria-selected="${state === 'selected'}">
      ${sparkle}
      <span class="rais-slim-tab__label">${label}</span>
      ${caret}
    </span>
  `;
}

const meta: Meta<SlimTabArgs> = {
  title: 'RAIS/Navigation/Slim Tabs',
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text', description: 'Tab label text' },
    state:    { control: 'select', options: ['selected', 'unselected', 'hover'], description: 'Visual state' },
    size:     { control: 'select', options: ['large', 'small'], description: 'Tab size — large=14px SemiBold, small=12px Bold' },
    extras:   { control: 'select', options: ['none', 'ai'], description: 'Optional sparkle glyph for AI-related tabs' },
    dropdown: { control: 'boolean', description: 'Show bx-caret-down indicator on the right' },
  },
  render: (args) => renderSlimTab(args),
};

export default meta;
type Story = StoryObj<SlimTabArgs>;

// ── Large variants ──
export const LargeSelected: Story = {
  args: { label: 'Tab Label', state: 'selected', size: 'large', extras: 'none', dropdown: false },
};
export const LargeUnselected: Story = {
  args: { label: 'Tab Label', state: 'unselected', size: 'large', extras: 'none', dropdown: false },
};
export const LargeHover: Story = {
  args: { label: 'Tab Label', state: 'hover', size: 'large', extras: 'none', dropdown: false },
};

// ── Small variants ──
export const SmallSelected: Story = {
  args: { label: 'Tab Label', state: 'selected', size: 'small', extras: 'none', dropdown: false },
};
export const SmallUnselected: Story = {
  args: { label: 'Tab Label', state: 'unselected', size: 'small', extras: 'none', dropdown: false },
};
export const SmallHover: Story = {
  args: { label: 'Tab Label', state: 'hover', size: 'small', extras: 'none', dropdown: false },
};

// ── AI extras (large only per Figma) ──
export const LargeAISelected: Story = {
  name: 'Large + AI (Selected)',
  args: { label: 'Tab Label', state: 'selected', size: 'large', extras: 'ai', dropdown: false },
};
export const LargeAIUnselected: Story = {
  name: 'Large + AI (Unselected)',
  args: { label: 'Tab Label', state: 'unselected', size: 'large', extras: 'ai', dropdown: false },
};
export const LargeAIHover: Story = {
  name: 'Large + AI (Hover)',
  args: { label: 'Tab Label', state: 'hover', size: 'large', extras: 'ai', dropdown: false },
};

// ── With dropdown affordance ──
export const LargeWithDropdown: Story = {
  args: { label: 'Tab Label', state: 'selected', size: 'large', extras: 'none', dropdown: true },
};

// ── All variants laid out per the Figma component_set ──
export const AllVariants: Story = {
  render: () => {
    const row = (state: SlimTabState) => `
      <div style="display:flex;gap:48px;align-items:flex-end;">
        ${renderSlimTab({ label: 'Tab Label', state, size: 'large', extras: 'none', dropdown: false })}
        ${renderSlimTab({ label: 'Tab Label', state, size: 'small', extras: 'none', dropdown: false })}
        ${renderSlimTab({ label: 'Tab Label', state, size: 'large', extras: 'ai',   dropdown: false })}
      </div>
    `;
    const heading = (txt: string) => `
      <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">${txt}</div>
    `;
    return `
      ${RAIS_STYLES}
      <div style="display:flex;flex-direction:column;gap:32px;padding:32px;background:#F0F2F5;border-radius:8px;">
        <div>${heading('Selected')}${row('selected')}</div>
        <div>${heading('Unselected')}${row('unselected')}</div>
        <div>${heading('Hover')}${row('hover')}</div>
      </div>
    `;
  },
};

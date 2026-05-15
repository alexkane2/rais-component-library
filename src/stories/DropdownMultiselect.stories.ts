import type { Meta, StoryObj } from '@storybook/html';

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&display=swap');
    :root {
      --color-label: #4D586A;
      --color-optional: #8D9091;
      --color-placeholder: #CCCCCC;
      --color-text: #4D586A;
      --color-cursor: #8D9091;
      --color-icon: #333333;
      --color-icon-focus: #007CBD;
      --color-icon-clear: #454545;
      --color-error: #CA222D;
      --color-divider: #EFEFEF;
      --color-border-default: #CCCCCC;
      --color-border-focus: #007CBD;
      --color-border-error: #CA222D;
      --color-chip-bg: #EDF6FC;
      --color-chip-border: #007CBD;
      --color-chip-text: #4D586A;
      --color-bg-white: #FFFFFF;
      --font-family: 'Figtree', sans-serif;
      --border-radius-sm: 4px;
    }

    /* ── Outer wrapper ── */
    .rais-multi {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 350px;
      font-family: var(--font-family);
    }

    /* ── Labels ── */
    .rais-multi__labels {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .rais-multi__label-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .rais-multi__label {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-label);
    }

    .rais-multi__optional {
      font-size: 14px;
      color: var(--color-optional);
    }

    .rais-multi__instructions {
      font-size: 12px;
      color: var(--color-label);
    }

    /* ── Field Types ──
       padding: T8 R12 B8 L12
       gap: 8px
       justify-content: space-between
       align-items: center
    ── */
    .rais-multi__field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      padding: 8px 12px;
      background: var(--color-bg-white);
      border: 1px solid var(--color-border-default);
      border-radius: var(--border-radius-sm);
      box-sizing: border-box;
      gap: 8px;
    }

    .rais-multi__field--focus { border-color: var(--color-border-focus); }
    .rais-multi__field--error { border-color: var(--color-border-error); }

    /* ── Frame 447 — left side, takes remaining space ── */
    .rais-multi__inner {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    .rais-multi__input {
      flex: 1;
      border: none;
      outline: none;
      font-family: var(--font-family);
      font-size: 14px;
      color: var(--color-text);
      background: transparent;
      min-width: 0;
    }

    .rais-multi__input::placeholder { color: var(--color-placeholder); }

    .rais-multi__cursor {
      font-size: 14px;
      color: var(--color-cursor);
    }

    .rais-multi__count {
      font-size: 14px;
      color: var(--color-text);
    }

    /* ── Chips ──
       padding: T4 R6 B4 L8, gap: 4px
       12px #4D586A on #EDF6FC with #007CBD border, radius 4px
    ── */
    .rais-multi__chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 6px 4px 8px;
      background: var(--color-chip-bg);
      border: 1px solid var(--color-chip-border);
      border-radius: var(--border-radius-sm);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-chip-text);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .rais-multi__chip-x {
      width: 8px;
      height: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-icon-focus);
      font-size: 9px;
      cursor: pointer;
    }

    /* ── Icon and Divider (default/max/mouse-enter/error): 27x24, no layout ──
       Contains: Frame 503 (1x24 divider) + bx-caret (16x16)
       We use flex with gap:10 to match visual spacing
    ── */
    .rais-multi__icon-divider {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    /* ── Icons and Divider (selection only): 51x24, gap:10 ──
       Contains: bx-x-small (14x14) + Frame 503 (1x24) + bx-caret (16x16)
    ── */
    .rais-multi__icons-divider {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    /* ── Shared: 1x24 divider rect ── */
    .rais-multi__divider {
      width: 1px;
      height: 24px;
      background: var(--color-divider);
      flex-shrink: 0;
    }

    /* ── Caret icons ── */
    .rais-multi__caret {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* ── Clear icon (bx-x-small: 14x14) ── */
    .rais-multi__clear {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
    }

    /* ── Error message ── */
    .rais-multi__error {
      font-size: 12px;
      color: var(--color-error);
    }
  </style>
`;

// SVGs matching exact Figma vector sizes
const CARET_DOWN = `<svg width="9" height="5" viewBox="0 0 9 5" fill="none">
  <path d="M4.5 5L0 0H9L4.5 5Z" fill="#333333"/>
</svg>`;

const CARET_UP = `<svg width="9" height="5" viewBox="0 0 9 5" fill="none">
  <path d="M4.5 0L9 5H0L4.5 0Z" fill="#007CBD"/>
</svg>`;

const X_SMALL = `<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
  <path d="M7 1L1 7M1 1L7 7" stroke="#454545" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const CHIPS = ['Label', 'Label', 'Label'];

function renderMulti({ label, optional, instructions, state }: any) {
  const isMouseEnter  = state === 'mouse-enter';
  const isSelection   = state === 'selection';
  const isMaxSelected = state === 'max-selected';
  const isError       = state === 'error';

  const fieldClass = [
    'rais-multi__field',
    isMouseEnter ? 'rais-multi__field--focus' : '',
    isError      ? 'rais-multi__field--error'  : '',
  ].filter(Boolean).join(' ');

  // Left inner content (Frame 447)
  let innerContent = '';
  if (isSelection) {
    innerContent = `
      <div class="rais-multi__inner">
        ${CHIPS.map(c => `
          <span class="rais-multi__chip">
            ${c}<span class="rais-multi__chip-x">✕</span>
          </span>
        `).join('')}
      </div>
    `;
  } else if (isMaxSelected) {
    innerContent = `
      <div class="rais-multi__inner">
        <span class="rais-multi__count">3 items selected</span>
      </div>
    `;
  } else if (isMouseEnter) {
    innerContent = `
      <div class="rais-multi__inner">
        <span class="rais-multi__cursor">|</span>
      </div>
    `;
  } else {
    innerContent = `
      <div class="rais-multi__inner">
        <input class="rais-multi__input" type="text" placeholder="Search..." />
      </div>
    `;
  }

  // Right side icons
  // Selection: "Icons and Divider" — clear + divider + caret (51x24, gap:10)
  // All others: "Icon and Divider" — divider + caret (27x24)
  const caret = isMouseEnter ? CARET_UP : CARET_DOWN;

  const rightContent = isSelection
    ? `
      <div class="rais-multi__icons-divider">
        <span class="rais-multi__clear">${X_SMALL}</span>
        <div class="rais-multi__divider"></div>
        <span class="rais-multi__caret">${caret}</span>
      </div>
    `
    : `
      <div class="rais-multi__icon-divider">
        <div class="rais-multi__divider"></div>
        <span class="rais-multi__caret">${caret}</span>
      </div>
    `;

  return `
    ${RAIS_STYLES}
    <div class="rais-multi">
      <div class="rais-multi__labels">
        <div class="rais-multi__label-row">
          <span class="rais-multi__label">${label ?? 'Label'}</span>
          ${optional ? `<span class="rais-multi__optional">(Optional)</span>` : ''}
        </div>
        ${instructions !== false ? `<span class="rais-multi__instructions">More instructions here.</span>` : ''}
      </div>
      <div class="${fieldClass}">
        ${innerContent}
        ${rightContent}
      </div>
      ${isError ? `<span class="rais-multi__error">Error message.</span>` : ''}
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Inputs/Dropdown - Multiselect',
  tags: ['autodocs'],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean' },
    state: {
      control: 'select',
      options: ['default', 'mouse-enter', 'selection', 'max-selected', 'error'],
      description: 'default=empty | mouse-enter=focused open | selection=chips shown | max-selected=count shown | error=validation failed'
    },
  },
  render: (args) => renderMulti(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { label: 'Label', state: 'default', instructions: true },
};

export const MouseEnter: Story = {
  args: { label: 'Label', state: 'mouse-enter', instructions: true },
};

export const Selection: Story = {
  args: { label: 'Label', state: 'selection', instructions: true },
};

export const MaxSelected: Story = {
  args: { label: 'Label', state: 'max-selected', instructions: true },
};

export const Error: Story = {
  args: { label: 'Label', state: 'error', instructions: true },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'default', instructions: true },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:32px;padding:24px;background:#F0F2F5;border-radius:8px;">
      ${renderMulti({ label: 'Default',      state: 'default',      instructions: true })}
      ${renderMulti({ label: 'Mouse Enter',  state: 'mouse-enter',  instructions: true })}
      ${renderMulti({ label: 'Selection',    state: 'selection',    instructions: true })}
      ${renderMulti({ label: 'Max Selected', state: 'max-selected', instructions: true })}
      ${renderMulti({ label: 'Error',        state: 'error',        instructions: true })}
    </div>
  `,
};
import type { Meta, StoryObj } from '@storybook/html';
import { renderSelectionLabel, SELECTION_LABEL_STYLES } from './SelectionLabel.utils';

/**
 * Dropdown - Multiselect — RAIS Inputs component
 * Icons: public/assets/boxicons/
 *   bx-x.svg          — clear button (14x14)
 *   bx-caret-down.svg — closed state
 *   bx-caret-up.svg   — open/focus state
 * Chips: Selection Label component (SelectionLabel.utils.ts)
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&display=swap');
    :root {
      --color-label: #4D586A;
      --color-optional: #8D9091;
      --color-placeholder: #CCCCCC;
      --color-text: #4D586A;
      --color-cursor: #8D9091;
      --color-error: #CA222D;
      --color-divider: #EFEFEF;
      --color-border-default: #CCCCCC;
      --color-border-focus: #007CBD;
      --color-border-error: #CA222D;
      --color-bg-white: #FFFFFF;
      --font-family: 'Figtree', sans-serif;
      --border-radius-sm: 4px;
    }

    .rais-multi { display:flex; flex-direction:column; gap:4px; width:350px; font-family:var(--font-family); }
    .rais-multi__labels { display:flex; flex-direction:column; gap:2px; }
    .rais-multi__label-row { display:flex; align-items:center; gap:12px; }
    .rais-multi__label { font-size:14px; font-weight:600; color:var(--color-label); }
    .rais-multi__optional { font-size:14px; color:var(--color-optional); }
    .rais-multi__instructions { font-size:12px; color:var(--color-label); }

    .rais-multi__field {
      display:flex; align-items:center; justify-content:space-between;
      height:40px; padding:8px 12px;
      background:var(--color-bg-white);
      border:1px solid var(--color-border-default);
      border-radius:var(--border-radius-sm);
      box-sizing:border-box; gap:8px;
    }
    .rais-multi__field--focus { border-color:var(--color-border-focus); }
    .rais-multi__field--error { border-color:var(--color-border-error); }

    .rais-multi__inner { display:flex; align-items:center; gap:4px; flex:1; min-width:0; overflow:hidden; }
    .rais-multi__input { flex:1; border:none; outline:none; font-family:var(--font-family); font-size:14px; color:var(--color-text); background:transparent; min-width:0; }
    .rais-multi__input::placeholder { color:var(--color-placeholder); }
    .rais-multi__cursor { font-size:14px; color:var(--color-cursor); }
    .rais-multi__count  { font-size:14px; color:var(--color-text); }

    .rais-multi__icon-divider  { display:flex; align-items:center; gap:10px; flex-shrink:0; }
    .rais-multi__icons-divider { display:flex; align-items:center; gap:10px; flex-shrink:0; }
    .rais-multi__divider { width:1px; height:24px; background:var(--color-divider); flex-shrink:0; }

    .rais-multi__clear { width:14px; height:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0; cursor:pointer; }
    .rais-multi__caret { width:16px; height:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

    /* Tint caret blue when focused/open */
    .rais-multi__caret--up img {
      filter: invert(35%) sepia(87%) saturate(500%) hue-rotate(170deg);
    }

    .rais-multi__error { font-size:12px; color:var(--color-error); }
  </style>
`;

const CHIP_LABELS = ['Label', 'Label', 'Label'];

function renderMulti({ label, optional, instructions, state }: any) {
  const isMouseEnter  = state === 'mouse-enter';
  const isSelection   = state === 'selection';
  const isMaxSelected = state === 'max-selected';
  const isError       = state === 'error';

  const fieldClass = ['rais-multi__field',
    isMouseEnter ? 'rais-multi__field--focus' : '',
    isError      ? 'rais-multi__field--error'  : '',
  ].filter(Boolean).join(' ');

  let innerContent = '';
  if (isSelection) {
    innerContent = `<div class="rais-multi__inner">${CHIP_LABELS.map(l => renderSelectionLabel({ label: l, style: 'squared' })).join('')}</div>`;
  } else if (isMaxSelected) {
    innerContent = `<div class="rais-multi__inner"><span class="rais-multi__count">3 items selected</span></div>`;
  } else if (isMouseEnter) {
    innerContent = `<div class="rais-multi__inner"><span class="rais-multi__cursor">|</span></div>`;
  } else {
    innerContent = `<div class="rais-multi__inner"><input class="rais-multi__input" type="text" placeholder="Search..." /></div>`;
  }

  const caretFile = isMouseEnter ? 'bx-caret-up' : 'bx-caret-down';
  const caretClass = isMouseEnter ? 'rais-multi__caret rais-multi__caret--up' : 'rais-multi__caret';

  const rightContent = isSelection
    ? `<div class="rais-multi__icons-divider">
        <span class="rais-multi__clear"><img src="assets/boxicons/bx-x.svg" width="14" height="14" alt="clear" /></span>
        <div class="rais-multi__divider"></div>
        <span class="${caretClass}"><img src="assets/boxicons/${caretFile}.svg" width="16" height="16" alt="caret" /></span>
      </div>`
    : `<div class="rais-multi__icon-divider">
        <div class="rais-multi__divider"></div>
        <span class="${caretClass}"><img src="assets/boxicons/${caretFile}.svg" width="16" height="16" alt="caret" /></span>
      </div>`;

  return `
    ${RAIS_STYLES}
    ${SELECTION_LABEL_STYLES}
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
  title: 'RAIS/Inputs/Dropdowns/Dropdown - Multiselect',
  tags: ['autodocs'],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean' },
    state: { control: 'select', options: ['default','mouse-enter','selection','max-selected','error'] },
  },
  render: (args) => renderMulti(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story     = { args: { label: 'Label', state: 'default',      instructions: true } };
export const MouseEnter: Story  = { args: { label: 'Label', state: 'mouse-enter',  instructions: true } };
export const Selection: Story   = { args: { label: 'Label', state: 'selection',    instructions: true } };
export const MaxSelected: Story = { args: { label: 'Label', state: 'max-selected', instructions: true } };
export const Error: Story       = { args: { label: 'Label', state: 'error',        instructions: true } };
export const Optional: Story    = { args: { label: 'Label', optional: true, state: 'default', instructions: true } };

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}${SELECTION_LABEL_STYLES}
    <div style="display:flex;flex-direction:column;gap:32px;padding:24px;background:#F0F2F5;border-radius:8px;">
      ${renderMulti({ label: 'Default',      state: 'default',      instructions: true })}
      ${renderMulti({ label: 'Mouse Enter',  state: 'mouse-enter',  instructions: true })}
      ${renderMulti({ label: 'Selection',    state: 'selection',    instructions: true })}
      ${renderMulti({ label: 'Max Selected', state: 'max-selected', instructions: true })}
      ${renderMulti({ label: 'Error',        state: 'error',        instructions: true })}
    </div>
  `,
};

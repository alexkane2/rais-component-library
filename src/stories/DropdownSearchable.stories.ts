import type { Meta, StoryObj } from '@storybook/html';

/**
 * Dropdown - Searchable — RAIS Inputs component
 * Icons: public/assets/boxicons/
 *   bx-x.svg          — clear/dismiss
 *   bx-caret-down.svg — closed caret
 * Angular: <img src="assets/boxicons/bx-x.svg" width="16" height="16" />
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap');
    :root {
      --color-label: #4D586A;
      --color-optional: #8D9091;
      --color-placeholder: #CCCCCC;
      --color-text: #4D586A;
      --color-option-name: #333333;
      --color-option-detail: #606060;
      --color-error: #CA222D;
      --color-divider: #EFEFEF;
      --color-border-default: #CCCCCC;
      --color-border-focus: #007CBD;
      --color-border-error: #CA222D;
      --color-bg-white: #FFFFFF;
      --color-bg-hover: #EDF6FC;
      --font-family: 'Figtree', sans-serif;
      --border-radius-sm: 4px;
    }

    .rais-search { display:flex; flex-direction:column; gap:4px; width:350px; font-family:var(--font-family); position:relative; }
    .rais-search__labels { display:flex; flex-direction:column; gap:2px; }
    .rais-search__label-row { display:flex; align-items:center; gap:4px; }
    .rais-search__label { font-size:14px; font-weight:600; color:var(--color-label); }
    .rais-search__optional { font-size:14px; color:var(--color-optional); }
    .rais-search__instructions { font-size:12px; color:var(--color-label); }

    .rais-search__box {
      display:flex; align-items:center; justify-content:space-between;
      height:40px; padding:8px 12px;
      background:var(--color-bg-white);
      border:1px solid var(--color-border-default);
      border-radius:var(--border-radius-sm);
      box-sizing:border-box; gap:8px;
    }
    .rais-search__box--active { border-color:var(--color-border-focus); }
    .rais-search__box--error  { border-color:var(--color-border-error); }

    .rais-search__input-container { flex:1; min-width:0; display:flex; align-items:center; }
    .rais-search__input {
      width:100%; border:none; outline:none;
      font-family:var(--font-family); font-size:14px;
      color:var(--color-text); background:transparent;
    }
    .rais-search__input::placeholder { color:var(--color-placeholder); }

    /* Icon and Divider: 1x24 divider + icon, gap 10 */
    .rais-search__icon-divider { display:flex; align-items:center; gap:10px; flex-shrink:0; }
    .rais-search__divider { width:1px; height:24px; background:var(--color-divider); flex-shrink:0; }
    .rais-search__icon { width:20px; height:20px; display:flex; align-items:center; justify-content:center; flex-shrink:0; cursor:pointer; }

    .rais-search__menu {
      position:absolute; top:calc(100% + 2px); left:0; right:0;
      background:var(--color-bg-white);
      border:1px solid var(--color-border-default);
      border-radius:var(--border-radius-sm);
      box-shadow:0 4px 10px rgba(0,0,0,0.08);
      z-index:10; max-height:260px; overflow-y:auto;
    }
    .rais-search__option { padding:10px 12px; cursor:pointer; }
    .rais-search__option:hover { background:var(--color-bg-hover); }
    .rais-search__option-name { font-size:14px; font-weight:600; color:var(--color-option-name); }
    .rais-search__option-detail { font-size:14px; color:var(--color-option-detail); margin-top:2px; }
    .rais-search__error { font-size:12px; color:var(--color-error); }
  </style>
`;

const OPTIONS = [
  { name: '128 Plumbing Heating Inc', detail: '78 Foundry Street, Wakefield, MA 01880' },
  { name: '3D Plumbing Heating Inc',  detail: '140 Grove St Apt 1, Clinton, MA 01510' },
  { name: '4 H Plumbing Inc',         detail: '' },
  { name: 'A Advantage Plumbing',     detail: '34625 Cedar Avenue, Yucaipa, CA 92399' },
  { name: 'A Plus Plumbing LLC',      detail: '25 Sycamore Avenue, Gustine, CA 92794' },
];

function renderSearchable({ label, optional, instructions, state }: any) {
  const isError     = state === 'error';
  const isActive    = state === 'active';
  const isSelection = state === 'selection';

  const boxClass = ['rais-search__box',
    isError  ? 'rais-search__box--error'  : '',
    isActive ? 'rais-search__box--active' : '',
  ].filter(Boolean).join(' ');

  const inputValue = isActive ? 'plum' : isSelection ? '3D Plumbing Heating Inc' : '';
  const iconFile   = (isSelection || isActive) ? 'bx-x' : 'bx-caret-down';

  return `
    ${RAIS_STYLES}
    <div class="rais-search">
      <div class="rais-search__labels">
        <div class="rais-search__label-row">
          <span class="rais-search__label">${label ?? 'Label'}</span>
          ${optional ? `<span class="rais-search__optional">(Optional)</span>` : ''}
        </div>
        ${instructions !== false ? `<span class="rais-search__instructions">More instructions here.</span>` : ''}
      </div>
      <div class="${boxClass}">
        <div class="rais-search__input-container">
          <input class="rais-search__input" type="text" placeholder="Type name..." value="${inputValue}" />
        </div>
        <div class="rais-search__icon-divider">
          <div class="rais-search__divider"></div>
          <div class="rais-search__icon">
            <img src="assets/boxicons/${iconFile}.svg" width="16" height="16" alt="${iconFile}" />
          </div>
        </div>
      </div>
      ${isActive ? `
        <div class="rais-search__menu">
          ${OPTIONS.map(o => `
            <div class="rais-search__option">
              <div class="rais-search__option-name">${o.name}</div>
              ${o.detail ? `<div class="rais-search__option-detail">${o.detail}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${isError ? `<span class="rais-search__error">Error message.</span>` : ''}
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Inputs/Dropdown - Searchable',
  tags: ['autodocs'],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean' },
    state: { control: 'select', options: ['default','selection','active','error'] },
  },
  render: (args) => renderSearchable(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story   = { args: { label: 'Label', state: 'default',   instructions: true } };
export const Selection: Story = { args: { label: 'Label', state: 'selection', instructions: true } };
export const Active: Story    = { args: { label: 'Label', state: 'active',    instructions: true } };
export const Error: Story     = { args: { label: 'Label', state: 'error',     instructions: true } };
export const Optional: Story  = { args: { label: 'Label', optional: true, state: 'default', instructions: true } };

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:80px;padding:24px;background:#F0F2F5;border-radius:8px;">
      ${renderSearchable({ label: 'Default',            state: 'default',   instructions: true })}
      ${renderSearchable({ label: 'Selection',          state: 'selection', instructions: true })}
      ${renderSearchable({ label: 'Active / Searching', state: 'active',    instructions: true })}
      ${renderSearchable({ label: 'Error',              state: 'error',     instructions: true })}
    </div>
  `,
};

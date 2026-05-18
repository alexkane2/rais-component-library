import type { Meta, StoryObj } from '@storybook/html';

/**
 * Search Bar — RAIS Inputs component
 * Icons: public/assets/boxicons/bx-search.svg
 * Angular: <img src="assets/boxicons/bx-search.svg" width="16" height="16" />
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap');
    :root {
      --color-label: #4D586A;
      --color-placeholder: #8D9091;
      --color-text: #4D586A;
      --color-border-default: #CCCCCC;
      --color-border-focus: #007CBD;
      --font-family: 'Figtree', sans-serif;
      --border-radius-sm: 4px;
    }

    .rais-searchbar { display:flex; flex-direction:column; gap:4px; width:350px; font-family:var(--font-family); }
    .rais-searchbar__labels { display:flex; flex-direction:column; gap:2px; }
    .rais-searchbar__label { font-size:14px; font-weight:600; color:var(--color-label); }
    .rais-searchbar__instructions { font-size:12px; color:var(--color-label); }

    .rais-searchbar__box {
      display:flex; align-items:center; justify-content:space-between;
      height:40px; padding:8px 12px;
      background:#FFFFFF;
      border:1px solid var(--color-border-default);
      border-radius:var(--border-radius-sm);
      box-sizing:border-box; gap:8px;
    }
    .rais-searchbar__box--focus { border-color:var(--color-border-focus); }

    .rais-searchbar__input-container { display:flex; align-items:center; gap:4px; flex:1; min-width:0; }
    .rais-searchbar__input { flex:1; border:none; outline:none; font-family:var(--font-family); font-size:14px; color:var(--color-text); background:transparent; min-width:0; }
    .rais-searchbar__input::placeholder { color:var(--color-placeholder); }
    .rais-searchbar__cursor { font-size:14px; color:var(--color-placeholder); }

    /* Icon: 16x16, bx-search.svg */
    .rais-searchbar__icon { width:16px; height:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  </style>
`;

function renderSearchBar({ label, instructions, state }: any) {
  const isFocus   = state === 'mouse-enter';
  const isEntered = state === 'entered';

  const boxClass = ['rais-searchbar__box', isFocus ? 'rais-searchbar__box--focus' : ''].filter(Boolean).join(' ');

  let inputContent = '';
  if (isFocus)        inputContent = `<span class="rais-searchbar__cursor">|</span>`;
  else if (isEntered) inputContent = `<input class="rais-searchbar__input" type="text" value="Text" />`;
  else                inputContent = `<input class="rais-searchbar__input" type="text" placeholder="Search..." />`;

  return `
    ${RAIS_STYLES}
    <div class="rais-searchbar">
      <div class="rais-searchbar__labels">
        ${label !== false ? `<span class="rais-searchbar__label">${label ?? 'Label'}</span>` : ''}
        ${instructions !== false ? `<span class="rais-searchbar__instructions">More instructions here.</span>` : ''}
      </div>
      <div class="${boxClass}">
        <div class="rais-searchbar__input-container">${inputContent}</div>
        <div class="rais-searchbar__icon">
          <img src="assets/boxicons/bx-search.svg" width="16" height="16" alt="search" />
        </div>
      </div>
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Inputs/Fields/Search Bar',
  tags: ['autodocs'],
  argTypes: {
    label:        { control: 'text' },
    instructions: { control: 'boolean' },
    state:        { control: 'select', options: ['empty','entered','mouse-enter'] },
  },
  render: (args) => renderSearchBar(args),
};

export default meta;
type Story = StoryObj;

export const Empty: Story      = { args: { label: 'Label', state: 'empty',       instructions: true } };
export const Entered: Story    = { args: { label: 'Label', state: 'entered',     instructions: true } };
export const MouseEnter: Story = { args: { label: 'Label', state: 'mouse-enter', instructions: true } };
export const NoLabel: Story    = { args: { label: false,   state: 'empty',       instructions: false } };

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;">
      ${renderSearchBar({ label: 'Label', state: 'empty',       instructions: true })}
      ${renderSearchBar({ label: 'Label', state: 'entered',     instructions: true })}
      ${renderSearchBar({ label: 'Label', state: 'mouse-enter', instructions: true })}
    </div>
  `,
};

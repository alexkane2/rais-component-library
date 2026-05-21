import type { Meta, StoryObj } from '@storybook/html';

/**
 * Date Picker — RAIS Inputs component
 * Icons: public/assets/boxicons/bxs-calendar.svg
 * Angular: <img src="assets/boxicons/bxs-calendar.svg" width="16" height="16" />
 *
 * Icon color changes per state — use CSS filter to tint:
 *   Default: #454545 (no filter)
 *   Focus:   #007CBD (filter: invert(35%) sepia(87%) saturate(500%) hue-rotate(170deg))
 *   Error:   #4D586A (filter: invert(30%) sepia(10%) saturate(800%) hue-rotate(180deg))
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap');
    :root {
      --color-label: #4D586A;
      --color-optional: #8D9091;
      --color-placeholder: #8D9091;
      --color-text: #4D586A;
      --color-error: #CA222D;
      --color-border-default: #CCCCCC;
      --color-border-focus: #007CBD;
      --color-border-error: #CA222D;
      --color-bg-white: #FFFFFF;
      --font-family: 'Figtree', sans-serif;
      --border-radius-sm: 4px;
    }

    .rais-datepicker { display:flex; flex-direction:column; gap:4px; width:350px; font-family:var(--font-family); }
    .rais-datepicker__labels { display:flex; flex-direction:column; gap:2px; }
    .rais-datepicker__label-row { display:flex; flex-direction:row; align-items:flex-start; gap:12px; }
    .rais-datepicker__label { font-size:14px; font-weight:600; color:var(--color-label); line-height:1.2; }
    .rais-datepicker__optional { font-size:14px; color:var(--color-optional); line-height:1.2; }
    .rais-datepicker__instructions { font-size:12px; color:var(--color-label); line-height:1.2; }

    /* Input box: 350x40, padding T8 R16 B8 L16, gap 16 */
    .rais-datepicker__box {
      display:flex; flex-direction:row; align-items:center;
      height:40px; padding:8px 16px;
      background:var(--color-bg-white);
      border:1px solid var(--color-border-default);
      border-radius:var(--border-radius-sm);
      box-sizing:border-box; gap:16px;
    }
    .rais-datepicker__box--focus { border-color:var(--color-border-focus); }
    .rais-datepicker__box--error { border-color:var(--color-border-error); }

    .rais-datepicker__date-container { display:flex; flex-direction:row; align-items:center; gap:4px; flex:1; min-width:0; }
    .rais-datepicker__date { font-size:14px; color:var(--color-text); line-height:1; }
    .rais-datepicker__placeholder { font-size:14px; color:var(--color-placeholder); line-height:1; }

    /* Calendar icon: 16x16, bxs-calendar.svg */
    .rais-datepicker__icon { width:16px; height:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

    /* Icon tints */
    .rais-datepicker__icon--default img { filter: brightness(0) saturate(100%) invert(29%) sepia(5%) saturate(580%) hue-rotate(169deg); }
    .rais-datepicker__icon--focus   img { filter: invert(35%) sepia(87%) saturate(500%) hue-rotate(170deg); }
    .rais-datepicker__icon--error   img { filter: invert(30%) sepia(10%) saturate(800%) hue-rotate(180deg); }

    .rais-datepicker__error { font-size:12px; color:var(--color-error); line-height:1.2; }
  </style>
`;

function renderDatePicker({ label, optional, instructions, state, value, errorMessage }: any) {
  const isEmpty  = !state || state === 'empty';
  const isError  = state === 'error';
  const isFocus  = state === 'focus';

  const boxClass = ['rais-datepicker__box',
    isFocus ? 'rais-datepicker__box--focus' : '',
    isError ? 'rais-datepicker__box--error'  : '',
  ].filter(Boolean).join(' ');

  const iconColorClass = isError ? 'rais-datepicker__icon--error'
    : isFocus ? 'rais-datepicker__icon--focus'
    : 'rais-datepicker__icon--default';

  const dateContent = isEmpty
    ? `<span class="rais-datepicker__placeholder">MM/DD/YYYY</span>`
    : `<span class="rais-datepicker__date">${value ?? '12/21/2024'}</span>`;

  return `
    ${RAIS_STYLES}
    <div class="rais-datepicker">
      <div class="rais-datepicker__labels">
        <div class="rais-datepicker__label-row">
          <span class="rais-datepicker__label">${label ?? 'Label'}</span>
          ${optional ? `<span class="rais-datepicker__optional">(Optional)</span>` : ''}
        </div>
        ${instructions !== false ? `<span class="rais-datepicker__instructions">More instructions here.</span>` : ''}
      </div>
      <div class="${boxClass}">
        <div class="rais-datepicker__date-container">${dateContent}</div>
        <div class="rais-datepicker__icon ${iconColorClass}">
          <img src="assets/boxicons/bxs-calendar.svg" width="16" height="16" alt="calendar" />
        </div>
      </div>
      ${isError ? `<span class="rais-datepicker__error">${errorMessage ?? 'Error message.'}</span>` : ''}
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Inputs/Date Picker',
  tags: ['autodocs'],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean' },
    value:        { control: 'text', description: 'MM/DD/YYYY format' },
    state:        { control: 'select', options: ['empty','filled','focus','error'] },
    errorMessage: { control: 'text' },
  },
  render: (args) => renderDatePicker(args),
};

export default meta;
type Story = StoryObj;

export const Empty: Story    = { args: { label: 'Label', state: 'empty',  instructions: true } };
export const Filled: Story   = { args: { label: 'Label', state: 'filled', value: '12/21/2024', instructions: true } };
export const OnFocus: Story  = { args: { label: 'Label', state: 'focus',  value: '12/21/2024', instructions: true } };
export const Error: Story    = { args: { label: 'Label', state: 'error',  value: '12/21/2024', instructions: true, errorMessage: 'Error message.' } };
export const Optional: Story = { args: { label: 'Label', optional: true,  state: 'empty', instructions: true } };

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;">
      ${renderDatePicker({ label: 'Empty',    state: 'empty',  instructions: true })}
      ${renderDatePicker({ label: 'Filled',   state: 'filled', value: '12/21/2024', instructions: true })}
      ${renderDatePicker({ label: 'On Focus', state: 'focus',  value: '12/21/2024', instructions: true })}
      ${renderDatePicker({ label: 'Error',    state: 'error',  value: '12/21/2024', instructions: true, errorMessage: 'Error message.' })}
    </div>
  `,
};

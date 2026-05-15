import type { Meta, StoryObj } from '@storybook/html';

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap');
    :root {
      --color-label: #4D586A;
      --color-optional: #8D9091;
      --color-placeholder: #CCCCCC;
      --color-text: #4D586A;
      --color-icon: #333333;
      --color-icon-focus: #007CBD;
      --color-error: #CA222D;
      --color-border-default: #CCCCCC;
      --color-border-focus: #007CBD;
      --color-border-error: #CA222D;
      --color-bg-white: #FFFFFF;
      --color-bg-page: #F0F2F5;
      --font-family: 'Figtree', sans-serif;
      --border-radius-sm: 4px;
    }

    .rais-dropdown {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 350px;
      font-family: var(--font-family);
      position: relative;
    }

    .rais-dropdown__label-row {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .rais-dropdown__label {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-label);
    }

    .rais-dropdown__optional {
      font-size: 14px;
      color: var(--color-optional);
    }

    .rais-dropdown__instructions {
      font-size: 12px;
      color: var(--color-label);
    }

    .rais-dropdown__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      height: 40px;
      background: var(--color-bg-white);
      border: 1px solid var(--color-border-default);
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      box-sizing: border-box;
    }

    .rais-dropdown__trigger--focus {
      border-color: var(--color-border-focus);
    }

    .rais-dropdown__trigger--error {
      border-color: var(--color-border-error);
    }

    .rais-dropdown__trigger--open {
      border-color: var(--color-border-focus);
    }

    .rais-dropdown__value {
      font-size: 14px;
      color: var(--color-placeholder);
    }

    .rais-dropdown__value--filled {
      color: var(--color-text);
    }

    .rais-dropdown__caret {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .rais-dropdown__caret svg {
      fill: var(--color-icon);
    }

    .rais-dropdown__caret--open svg {
      fill: var(--color-icon-focus);
    }

    .rais-dropdown__menu {
      position: absolute;
      top: calc(100% + 2px);
      left: 0;
      right: 0;
      background: var(--color-bg-white);
      border: 1px solid var(--color-border-focus);
      border-radius: var(--border-radius-sm);
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      z-index: 10;
      max-height: 240px;
      overflow-y: auto;
    }

    .rais-dropdown__option {
      padding: 10px 12px;
      font-size: 14px;
      color: var(--color-text);
      cursor: pointer;
    }

    .rais-dropdown__option:hover {
      background: #EDF6FC;
    }

    .rais-dropdown__error {
      font-size: 12px;
      color: var(--color-error);
    }
  </style>
`;

const CARET_DOWN = `<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 15.5L6 9.5h12l-6 6z"/></svg>`;
const CARET_UP = `<svg width="16" height="16" viewBox="0 0 24 24" style="fill:#007CBD"><path d="M12 8.5l6 6H6l6-6z"/></svg>`;

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9'];

function renderDropdown({ label, optional, instructions, value, state, errorMessage }: any) {
  const isError = state === 'error';
  const isFocus = state === 'focus';
  const isOpen = state === 'open';
  const isFilled = state === 'filled' || !!value;

  const triggerClass = [
    'rais-dropdown__trigger',
    isError ? 'rais-dropdown__trigger--error' : '',
    isFocus ? 'rais-dropdown__trigger--focus' : '',
    isOpen ? 'rais-dropdown__trigger--open' : '',
  ].filter(Boolean).join(' ');

  const valueClass = [
    'rais-dropdown__value',
    isFilled ? 'rais-dropdown__value--filled' : '',
  ].filter(Boolean).join(' ');

  return `
    ${RAIS_STYLES}
    <div class="rais-dropdown">
      <div class="rais-dropdown__label-row">
        <span class="rais-dropdown__label">${label ?? 'Label'}</span>
        ${optional ? `<span class="rais-dropdown__optional">(Optional)</span>` : ''}
      </div>
      ${instructions ? `<span class="rais-dropdown__instructions">${instructions}</span>` : ''}
      <div class="${triggerClass}">
        <span class="${valueClass}">${value ?? '-- Select --'}</span>
        <span class="rais-dropdown__caret ${isOpen ? 'rais-dropdown__caret--open' : ''}">
          ${isOpen ? CARET_UP : CARET_DOWN}
        </span>
      </div>
      ${isOpen ? `
        <div class="rais-dropdown__menu">
          ${OPTIONS.map(o => `<div class="rais-dropdown__option">${o}</div>`).join('')}
        </div>
      ` : ''}
      ${isError ? `<span class="rais-dropdown__error">${errorMessage ?? 'Error message.'}</span>` : ''}
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Inputs/Dropdown',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    optional: { control: 'boolean' },
    instructions: { control: 'text' },
    value: { control: 'text', description: 'Selected value — leave blank for placeholder' },
    state: {
      control: 'select',
      options: ['default', 'filled', 'focus', 'error', 'open'],
    },
    errorMessage: { control: 'text' },
  },
  render: (args) => renderDropdown(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { label: 'Label', state: 'default' },
};

export const Filled: Story = {
  args: { label: 'Label', value: 'All', state: 'filled' },
};

export const OnFocus: Story = {
  args: { label: 'Label', state: 'focus' },
};

export const Error: Story = {
  args: { label: 'Label', state: 'error', errorMessage: 'Error message.' },
};

export const Open: Story = {
  args: { label: 'Label', state: 'open' },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'default' },
};

export const WithInstructions: Story = {
  args: { label: 'Label', instructions: 'More instructions here.', state: 'default' },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex; flex-direction:column; gap:24px; padding:24px; background:#F0F2F5; border-radius:8px;">
      ${renderDropdown({ label: 'Default', state: 'default' })}
      ${renderDropdown({ label: 'Filled', value: 'All', state: 'filled' })}
      ${renderDropdown({ label: 'On Focus', state: 'focus' })}
      ${renderDropdown({ label: 'Error', state: 'error', errorMessage: 'Error message.' })}
      ${renderDropdown({ label: 'Open', state: 'open' })}
    </div>
  `,
};
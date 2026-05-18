import type { Meta, StoryObj } from '@storybook/html';

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap');
    :root {
      --color-label: #4D586A;
      --color-optional: #8D9091;
      --color-placeholder: #CCCCCC;
      --color-text: #4D586A;
      --color-error: #CA222D;
      --color-border-default: #CCCCCC;
      --color-border-focus: #007CBD;
      --color-border-error: #CA222D;
      --color-border-disabled: #EFEFEF;
      --color-bg-white: #FFFFFF;
      --color-bg-disabled: #EFEFEF;
      --color-text-disabled: #8D9091;
      --font-family: 'Figtree', sans-serif;
      --border-radius-sm: 4px;
    }

    /* ── Outer wrapper ── */
    .rais-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 350px;
      font-family: var(--font-family);
    }

    /* ── Label row ──
       gap: 4px, horizontal, align crossAxis MIN
    ── */
    .rais-field__label-row {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 4px;
    }

    .rais-field__label {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-label);
      line-height: 1.2;
    }

    /* Optional is now 12px Regular */
    .rais-field__optional {
      font-size: 12px;
      font-weight: 400;
      color: var(--color-optional);
      line-height: 1.2;
    }

    .rais-field__instructions {
      font-size: 12px;
      font-weight: 400;
      color: var(--color-label);
      line-height: 1.2;
    }

    /* ── Input box — single line ──
       padding: T0 R12 B0 L12, height 40px
       align-items: center
    ── */
    .rais-field__input {
      width: 100%;
      height: 40px;
      padding: 0 12px;
      background: var(--color-bg-white);
      border: 1px solid var(--color-border-default);
      border-radius: var(--border-radius-sm);
      font-family: var(--font-family);
      font-size: 14px;
      font-weight: 400;
      color: var(--color-text);
      box-sizing: border-box;
      outline: none;
    }

    .rais-field__input::placeholder { color: var(--color-placeholder); }
    .rais-field__input:focus         { border-color: var(--color-border-focus); }
    .rais-field__input--error        { border-color: var(--color-border-error); }
    .rais-field__input--disabled {
      background: var(--color-bg-disabled);
      border-color: var(--color-border-disabled);
      color: var(--color-text-disabled);
      cursor: not-allowed;
    }

    /* ── Textarea — multi line ──
       padding: T10 R12 B10 L12, height 80px
       align-items: flex-start (crossAxis MIN)
    ── */
    .rais-field__textarea {
      width: 100%;
      height: 80px;
      padding: 10px 12px;
      background: var(--color-bg-white);
      border: 1px solid var(--color-border-default);
      border-radius: var(--border-radius-sm);
      font-family: var(--font-family);
      font-size: 14px;
      font-weight: 400;
      color: var(--color-text);
      box-sizing: border-box;
      outline: none;
      resize: vertical;
    }

    .rais-field__textarea::placeholder { color: var(--color-placeholder); }
    .rais-field__textarea:focus         { border-color: var(--color-border-focus); }
    .rais-field__textarea--error        { border-color: var(--color-border-error); }
    .rais-field__textarea--disabled {
      background: var(--color-bg-disabled);
      border-color: var(--color-border-disabled);
      color: var(--color-text-disabled);
      cursor: not-allowed;
    }

    /* ── Error message ── */
    .rais-field__error {
      font-size: 12px;
      font-weight: 400;
      color: var(--color-error);
    }
  </style>
`;

function renderField({ label, optional, instructions, value, state, size, errorMessage }: any) {
  const isMultiLine = size === 'multi-line';
  const isError     = state === 'error';
  const isDisabled  = state === 'disabled';
  const isFocus     = state === 'focus';

  const inputClass = [
    isMultiLine ? 'rais-field__textarea' : 'rais-field__input',
    isError    ? (isMultiLine ? 'rais-field__textarea--error'    : 'rais-field__input--error')    : '',
    isDisabled ? (isMultiLine ? 'rais-field__textarea--disabled' : 'rais-field__input--disabled') : '',
  ].filter(Boolean).join(' ');

  const focusStyle = isFocus ? `style="border-color: var(--color-border-focus);"` : '';

  const inputEl = isMultiLine
    ? `<textarea
        class="${inputClass}"
        placeholder="Text"
        ${focusStyle}
        ${isDisabled ? 'disabled' : ''}
      >${value ?? ''}</textarea>`
    : `<input
        type="text"
        class="${inputClass}"
        placeholder="Text"
        value="${value ?? ''}"
        ${focusStyle}
        ${isDisabled ? 'disabled' : ''}
      />`;

  return `
    ${RAIS_STYLES}
    <div class="rais-field">
      <div class="rais-field__label-row">
        <span class="rais-field__label">${label ?? 'Label'}</span>
        ${optional ? `<span class="rais-field__optional">(Optional)</span>` : ''}
      </div>
      ${instructions !== false ? `<span class="rais-field__instructions">More instructions here.</span>` : ''}
      ${inputEl}
      ${isError ? `<span class="rais-field__error">${errorMessage ?? 'Error message.'}</span>` : ''}
    </div>
  `;
}

const meta: Meta = {
title: 'RAIS/Inputs/Fields/Text Field',  tags: ['autodocs'],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean', description: 'Show instructions text' },
    value:        { control: 'text', description: 'Input value' },
    state: {
      control: 'select',
      options: ['default', 'filled', 'focus', 'error', 'disabled'],
      description: 'default=preview | filled=has value | focus=active | error=validation failed | disabled'
    },
    size: {
      control: 'select',
      options: ['single-line', 'multi-line'],
      description: 'Single line (40px) or multi-line textarea (80px)'
    },
    errorMessage: { control: 'text' },
  },
  render: (args) => renderField(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { label: 'Label', state: 'default', size: 'single-line', instructions: true },
};

export const Filled: Story = {
  args: { label: 'Label', value: 'Text', state: 'filled', size: 'single-line', instructions: true },
};

export const OnFocus: Story = {
  args: { label: 'Label', value: 'Text', state: 'focus', size: 'single-line', instructions: true },
};

export const Error: Story = {
  args: { label: 'Label', value: 'Text', state: 'error', size: 'single-line', instructions: true, errorMessage: 'Error message.' },
};

export const Disabled: Story = {
  args: { label: 'Label', state: 'disabled', size: 'single-line', instructions: true },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'default', size: 'single-line', instructions: true },
};

export const WithInstructions: Story = {
  args: { label: 'Label', instructions: true, state: 'default', size: 'single-line' },
};

export const MultiLine: Story = {
  args: { label: 'Label', state: 'default', size: 'multi-line', instructions: true },
};

export const MultiLineFilled: Story = {
  args: { label: 'Label', value: 'Text', state: 'filled', size: 'multi-line', instructions: true },
};

export const MultiLineError: Story = {
  args: { label: 'Label', value: 'Text', state: 'error', size: 'multi-line', instructions: true, errorMessage: 'Error message.' },
};

export const MultiLineDisabled: Story = {
  args: { label: 'Label', state: 'disabled', size: 'multi-line', instructions: true },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;">
      ${renderField({ label: 'Default',          state: 'default',  size: 'single-line', instructions: true })}
      ${renderField({ label: 'Filled',           value: 'Text', state: 'filled',   size: 'single-line', instructions: true })}
      ${renderField({ label: 'On Focus',         value: 'Text', state: 'focus',    size: 'single-line', instructions: true })}
      ${renderField({ label: 'Error',            value: 'Text', state: 'error',    size: 'single-line', instructions: true, errorMessage: 'Error message.' })}
      ${renderField({ label: 'Disabled',         state: 'disabled', size: 'single-line', instructions: true })}
      ${renderField({ label: 'Multi Line',       state: 'default',  size: 'multi-line',  instructions: true })}
      ${renderField({ label: 'Multi Line Error', value: 'Text', state: 'error',    size: 'multi-line',  instructions: true, errorMessage: 'Error message.' })}
    </div>
  `,
};
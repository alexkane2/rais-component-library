import type { Meta, StoryObj } from '@storybook/html';

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap');
    :root {
      --color-btn-bg-primary: #007CBD;
      --color-btn-bg-primary-hover: #178FCF;
      --color-btn-bg-primary-disabled: #B3D8EB;
      --color-btn-text-primary: #FFFFFF;
      --color-btn-bg-secondary: #FFFFFF;
      --color-btn-bg-secondary-hover: #EDF6FC;
      --color-btn-border-secondary: #007CBD;
      --color-btn-text-secondary: #007CBD;
      --color-btn-text-secondary-disabled: #B3D8EB;
      --color-btn-bg-error: #CA222D;
      --color-btn-text-error: #CA222D;
      --color-bg-page: #F0F2F5;
      --font-family-text: 'Figtree', sans-serif;
      --font-weight-semibold: 600;
      --border-radius-md: 4px;
      --spacing-06: 16px;
    }

    .rais-btn {
      font-family: var(--font-family-text);
      font-weight: var(--font-weight-semibold);
      border-radius: var(--border-radius-md);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid transparent;
      transition: background 0.15s ease, color 0.15s ease;
      line-height: 1;
    }
    .rais-btn--normal  { padding: 8px 16px;  font-size: 14px; }
    .rais-btn--small   { padding: 4px 10px;  font-size: 12px; }
    .rais-btn--large   { padding: 12px 24px; font-size: 16px; }

    .rais-btn--primary {
      background: var(--color-btn-bg-primary);
      color: var(--color-btn-text-primary);
      border-color: var(--color-btn-bg-primary);
    }
    .rais-btn--primary:hover {
      background: var(--color-btn-bg-primary-hover);
      border-color: var(--color-btn-bg-primary-hover);
    }
    .rais-btn--secondary {
      background: var(--color-btn-bg-secondary);
      color: var(--color-btn-text-secondary);
      border-color: var(--color-btn-border-secondary);
    }
    .rais-btn--secondary:hover {
      background: var(--color-btn-bg-secondary-hover);
    }
    .rais-btn--danger {
      background: var(--color-btn-bg-secondary);
      color: var(--color-btn-text-error);
      border-color: var(--color-btn-bg-error);
    }
    .rais-btn--disabled {
      background: var(--color-btn-bg-primary-disabled);
      color: var(--color-btn-text-primary);
      border-color: var(--color-btn-bg-primary-disabled);
      cursor: not-allowed;
      opacity: 0.7;
    }
  </style>
`;

const meta: Meta = {
  title: 'RAIS/Actions/Button',
  tags: ['autodocs'],
  argTypes: {
    label:   { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'disabled'],
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large'],
    },
  },
  render: ({ label, variant, size }) => `
    ${RAIS_STYLES}
    <button
      class="rais-btn rais-btn--${variant ?? 'primary'} rais-btn--${size ?? 'normal'}"
      ${variant === 'disabled' ? 'disabled' : ''}
    >
      ${label ?? 'Button'}
    </button>
  `,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: { label: 'Submit', variant: 'primary', size: 'normal' },
};

export const Secondary: Story = {
  args: { label: 'Cancel', variant: 'secondary', size: 'normal' },
};

export const Danger: Story = {
  args: { label: 'Delete', variant: 'danger', size: 'normal' },
};

export const Disabled: Story = {
  args: { label: 'Unavailable', variant: 'disabled', size: 'normal' },
};

export const Small: Story = {
  args: { label: 'Small Button', variant: 'primary', size: 'small' },
};

export const Large: Story = {
  args: { label: 'Large Button', variant: 'primary', size: 'large' },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center; padding:24px; background:#F0F2F5; border-radius:8px;">
      <button class="rais-btn rais-btn--primary rais-btn--normal">Primary</button>
      <button class="rais-btn rais-btn--secondary rais-btn--normal">Secondary</button>
      <button class="rais-btn rais-btn--danger rais-btn--normal">Danger</button>
      <button class="rais-btn rais-btn--disabled rais-btn--normal" disabled>Disabled</button>
      <button class="rais-btn rais-btn--primary rais-btn--small">Small</button>
      <button class="rais-btn rais-btn--primary rais-btn--large">Large</button>
    </div>
  `,
};
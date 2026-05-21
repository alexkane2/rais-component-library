import type { Meta, StoryObj } from '@storybook/html';

/**
 * Badge — RAIS Labeling component
 *
 * A small 8×8px status dot used to indicate state.
 *
 * Tokens (from Figma variables):
 *   --color/surface-success   #117C1A → Success variant
 *   --color/surface-focus     #007CBD → Focus variant
 *   --color/surface-error     #CA222D → Error variant
 *   --border/radius-lg        12px    → fully rounded circle
 *   --spacing/spacing-03      8px     → width/height
 *
 * Variants (Figma property "property1"):
 *   Success / Focus / Error
 */

const RAIS_STYLES = `
  <style>
    :root {
      --color-surface-success: #117C1A;
      --color-surface-focus:   #007CBD;
      --color-surface-error:   #CA222D;
      --border-radius-lg:      12px;
      --spacing-03:            8px;
    }

    .rais-badge {
      display: inline-block;
      width: var(--spacing-03);
      height: var(--spacing-03);
      border-radius: var(--border-radius-lg);
      flex-shrink: 0;
    }

    .rais-badge--success { background: var(--color-surface-success); }
    .rais-badge--focus   { background: var(--color-surface-focus); }
    .rais-badge--error   { background: var(--color-surface-error); }
  </style>
`;

type BadgeVariant = 'success' | 'focus' | 'error';

type BadgeArgs = {
  variant: BadgeVariant;
};

function renderBadge({ variant }: BadgeArgs) {
  return `
    ${RAIS_STYLES}
    <span class="rais-badge rais-badge--${variant}" role="status" aria-label="${variant}"></span>
  `;
}

const meta: Meta<BadgeArgs> = {
  title: 'RAIS/Labeling/Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'focus', 'error'],
      description: 'Badge status variant — drives the fill color',
    },
  },
  render: (args) => renderBadge(args),
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Success: Story = {
  args: { variant: 'success' },
};

export const Focus: Story = {
  args: { variant: 'focus' },
};

export const Error: Story = {
  args: { variant: 'error' },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:24px;padding:32px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
      <div style="display:flex;gap:32px;align-items:center;">
        <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Success</span>
          ${renderBadge({ variant: 'success' })}
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Focus</span>
          ${renderBadge({ variant: 'focus' })}
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Error</span>
          ${renderBadge({ variant: 'error' })}
        </div>
      </div>
    </div>
  `,
};

import type { Meta, StoryObj } from '@storybook/html';

const SELECTION_LABEL_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500&display=swap');
    :root {
      --color-chip-bg: #EDF6FC;
      --color-chip-border: #007CBD;
      --color-chip-text: #4D586A;
      --color-chip-icon: #007CBD;
      --font-family: 'Figtree', sans-serif;
    }

    /* ── Squared: padding T4 R6 B4 L8, gap 4px, radius 4px ── */
    .rais-sel-label--squared {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 6px 4px 8px;
      background: var(--color-chip-bg);
      border: 1px solid var(--color-chip-border);
      border-radius: 4px;
      font-family: var(--font-family);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-chip-text);
      white-space: nowrap;
    }

    /* ── Rounded: padding T4 R8 B4 L10, gap 4px, radius 16px ── */
    .rais-sel-label--rounded {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px 4px 10px;
      background: var(--color-chip-bg);
      border: 1px solid var(--color-chip-border);
      border-radius: 16px;
      font-family: var(--font-family);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-chip-text);
      white-space: nowrap;
    }

    /* ── Icon Right: 14x14 frame, 8x8 vector ── */
    .rais-sel-label__icon {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
    }
  </style>
`;

const X_ICON = `<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
  <path d="M7 1L1 7M1 1L7 7" stroke="#007CBD" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

/**
 * Exported render function — imported by DropdownMultiselect.stories.ts
 * so chips in the multiselect always reference this single source of truth.
 */
function renderSelectionLabel({ label, style }: { label?: string; style?: 'squared' | 'rounded' }) {
  const cls = style === 'rounded'
    ? 'rais-sel-label--rounded'
    : 'rais-sel-label--squared';

  return `
    ${SELECTION_LABEL_STYLES}
    <span class="${cls}">
      ${label ?? 'Label'}
      <span class="rais-sel-label__icon">${X_ICON}</span>
    </span>
  `;
}

const meta: Meta = {
  title: 'RAIS/Inputs/Selection Label',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Chip label text' },
    style: {
      control: 'select',
      options: ['squared', 'rounded'],
      description: 'squared=4px radius (used in multiselect dropdowns) | rounded=16px radius (used in filter bars)'
    },
  },
  render: (args) => renderSelectionLabel(args),
};

export default meta;
type Story = StoryObj;

export const Squared: Story = {
  args: { label: 'Label', style: 'squared' },
};

export const Rounded: Story = {
  args: { label: 'Label', style: 'rounded' },
};

export const AllVariants: Story = {
  render: () => `
    ${SELECTION_LABEL_STYLES}
    <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-family:'Figtree',sans-serif;font-size:12px;color:#8D9091;">Squared — used in dropdowns</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${renderSelectionLabel({ label: 'Label', style: 'squared' })}
          ${renderSelectionLabel({ label: 'Longer Label', style: 'squared' })}
          ${renderSelectionLabel({ label: 'Label', style: 'squared' })}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-family:'Figtree',sans-serif;font-size:12px;color:#8D9091;">Rounded — used in filter bars</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${renderSelectionLabel({ label: 'Label', style: 'rounded' })}
          ${renderSelectionLabel({ label: 'Longer Label', style: 'rounded' })}
          ${renderSelectionLabel({ label: 'Label', style: 'rounded' })}
        </div>
      </div>
    </div>
  `,
};


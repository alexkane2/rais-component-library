import type { Meta, StoryObj } from '@storybook/html';

/**
 * Applied Filter Chip — RAIS Filters component
 *
 * Tokens (from Figma variables):
 *   --surface-hover     #EDF6FC  → background
 *   --brand-blue-200    #007CBD  → border, icon color
 *   --border-focus      #007CBD  → border
 *   --spacing-01        4        → corner radius
 *   --color-text-header  #101928 → category text (SemiBold)
 *   --color-text-primary #4D586A → value text (Medium)
 *
 * Type styles (Figma):
 *   Label/S SemiBold — Figtree 600 / 12px / line-height 1.2 / letter-spacing 0.36px
 *   Label/S Medium   — Figtree 500 / 12px / line-height 1.2 / letter-spacing 0.36px
 *
 * Icons (from public/assets/boxicons/):
 *   bxs-filter-alt.svg — filter icon, 14×14 frame
 *   bx-x.svg           — dismiss icon, rendered at 12×12 to match Figma vector size
 *                        (Figma instance is named "bx-x-large-spacing" — a renamed bx-x
 *                        with a 12×12 vector inside an 8×8 frame so the X visually pops)
 *
 * Angular usage:
 *   <img src="assets/boxicons/bxs-filter-alt.svg" width="14" height="14" />
 *   <img src="assets/boxicons/bx-x.svg" width="12" height="12" />
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&display=swap');

    /* Tokens — names match Figma variables */
    :root {
      --surface-hover: #EDF6FC;
      --brand-blue-200: #007CBD;
      --border-focus: #007CBD;
      --spacing-01: 4px;
      --color-text-header: #101928;
      --color-text-primary: #4D586A;
      --font-family: 'Figtree', sans-serif;
    }

    /* ── Applied Filter Chip ──
       padding: T4 R10 B4 L6, gap 8
       bg --surface-hover, border --brand-blue-200 1px, radius --spacing-01
       HORIZONTAL, crossAxis CENTER
    ── */
    .rais-filter-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 10px 4px 6px;
      background: var(--surface-hover);
      border: 1px solid var(--brand-blue-200);
      border-radius: var(--spacing-01);
      font-family: var(--font-family);
      max-width: 250px;
      box-sizing: border-box;
      height: 22px;
    }

    /* Must have chips have no dismiss — tighten right padding */
    .rais-filter-chip--must-have {
      padding-right: 8px;
    }

    /* ── Filter icon: 14×14 frame, bxs-filter-alt ── */
    .rais-filter-chip__filter-icon {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Tint filter icon to --brand-blue-200 */
    .rais-filter-chip__filter-icon img {
      filter: invert(35%) sepia(87%) saturate(500%) hue-rotate(170deg);
    }

    /* ── Text area: category (bold) + value (regular) ── */
    .rais-filter-chip__text {
      display: flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      overflow: hidden;
    }

    .rais-filter-chip__category {
      font-size: 12px;
      font-weight: 600;
      line-height: 1.2;
      letter-spacing: 0.36px;
      color: var(--color-text-header);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .rais-filter-chip__value {
      font-size: 12px;
      font-weight: 500;
      line-height: 1.2;
      letter-spacing: 0.36px;
      color: var(--color-text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ── Dismiss icon: 12×12 to match Figma vector size (NOT 8×8 frame) ── */
    .rais-filter-chip__dismiss {
      width: 12px;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
    }

    /* Tint dismiss icon to --brand-blue-200 */
    .rais-filter-chip__dismiss img {
      width: 12px;
      height: 12px;
      filter: invert(35%) sepia(87%) saturate(500%) hue-rotate(170deg);
    }
  </style>
`;

function renderAppliedFilterChip({ category, value, showIcon, dismissible }: any) {
  const cat        = category ?? 'Category:';
  const val        = value ?? 'Filter';
  const icon       = showIcon ?? false;
  const canDismiss = dismissible !== false;

  const chipClass = ['rais-filter-chip',
    !canDismiss ? 'rais-filter-chip--must-have' : '',
  ].filter(Boolean).join(' ');

  return `
    ${RAIS_STYLES}
    <span class="${chipClass}">
      ${icon ? `
        <span class="rais-filter-chip__filter-icon">
          <img src="assets/boxicons/bxs-filter-alt.svg" width="14" height="14" alt="filter" />
        </span>
      ` : ''}
      <span class="rais-filter-chip__text">
        <span class="rais-filter-chip__category">${cat}</span>
        <span class="rais-filter-chip__value">${val}</span>
      </span>
      ${canDismiss ? `
        <span class="rais-filter-chip__dismiss">
          <img src="assets/boxicons/bx-x.svg" width="12" height="12" alt="dismiss" />
        </span>
      ` : ''}
    </span>
  `;
}

const meta: Meta = {
  title: 'RAIS/Filters/Applied Filter Chip',
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'text',
      description: 'Category label (bold text before the value)'
    },
    value: {
      control: 'text',
      description: 'Filter value text'
    },
    showIcon: {
      control: 'boolean',
      description: 'Show filter icon (bxs-filter-alt.svg) on the left'
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss X (bx-x.svg) on the right — false for "must have" filters'
    },
  },
  render: (args) => renderAppliedFilterChip(args),
};

export default meta;
type Story = StoryObj;

export const SingleSelection: Story = {
  args: { category: 'Policy Producer:', value: 'Spencer, Dana', showIcon: false, dismissible: true },
};

export const MultipleSelections: Story = {
  args: { category: 'Policy Producer:', value: 'Multiple', showIcon: false, dismissible: true },
};

export const Truncated: Story = {
  args: { category: 'Policy Producer:', value: 'Very Long Filter Lab...', showIcon: false, dismissible: true },
};

export const MustHave: Story = {
  name: 'Must Have (no dismiss)',
  args: { category: 'Region:', value: 'West', showIcon: false, dismissible: false },
};

export const WithIcon: Story = {
  args: { category: 'Category:', value: 'Filter', showIcon: true, dismissible: true },
};

export const MustHaveWithIcon: Story = {
  name: 'Must Have + Icon',
  args: { category: 'Category:', value: 'Filter', showIcon: true, dismissible: false },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;">
      <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">DISMISSIBLE</span>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        ${renderAppliedFilterChip({ category: 'Policy Producer:', value: 'Spencer, Dana',          showIcon: false, dismissible: true })}
        ${renderAppliedFilterChip({ category: 'Policy Producer:', value: 'Multiple',                showIcon: false, dismissible: true })}
        ${renderAppliedFilterChip({ category: 'Policy Producer:', value: 'Very Long Filter Lab...', showIcon: false, dismissible: true })}
      </div>

      <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">MUST HAVE (no dismiss)</span>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        ${renderAppliedFilterChip({ category: 'Region:', value: 'West',   showIcon: false, dismissible: false })}
        ${renderAppliedFilterChip({ category: 'Status:', value: 'Active', showIcon: false, dismissible: false })}
      </div>

      <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">WITH FILTER ICON</span>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        ${renderAppliedFilterChip({ category: 'Category:', value: 'Filter', showIcon: true, dismissible: true })}
        ${renderAppliedFilterChip({ category: 'Category:', value: 'Filter', showIcon: true, dismissible: false })}
      </div>
    </div>
  `,
};

import type { Meta, StoryObj } from '@storybook/html';

/**
 * PageFilter Dropdown Filter — RAIS Filters component
 *
 * A compact, pill-shaped dropdown used in page-level filter bars.
 * Two label placements: Horizontal (label left of input) and Vertical (label above input).
 *
 * Icons: public/assets/boxicons/bx-caret-down.svg
 * Angular: <img src="assets/boxicons/bx-caret-down.svg" width="9" height="5" />
 *
 * Specs:
 *   Input: 28px height, radius 16 (pill), padding T2 R12 B2 L12, gap 10
 *   bg: #FFFFFF, border: #CCCCCC 1px
 *   Label: 12px SemiBold #4D586A
 *   Placeholder: 12px Regular #8D9091
 *   Value: 12px Regular #4D586A
 *   Caret: bx-caret-down 9x5 #454545
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap');
    :root {
      --color-label: #4D586A;
      --color-placeholder: #8D9091;
      --color-text: #4D586A;
      --color-icon: #454545;
      --color-border: #CCCCCC;
      --color-bg-white: #FFFFFF;
      --font-family: 'Figtree', sans-serif;
    }

    /* ── Horizontal: label + input side by side, gap 8 ── */
    .rais-pf-dropdown--horizontal {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-family);
    }

    /* ── Vertical: label above input, gap 4 ── */
    .rais-pf-dropdown--vertical {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      font-family: var(--font-family);
    }

    /* ── Label: 12px SemiBold #4D586A ── */
    .rais-pf-dropdown__label {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-label);
      white-space: nowrap;
    }

    /* ── Input pill: 28px height, radius 16, padding T2 R12 B2 L12, gap 10 ── */
    .rais-pf-dropdown__input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 28px;
      padding: 2px 12px;
      background: var(--color-bg-white);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      box-sizing: border-box;
      gap: 10px;
      cursor: pointer;
    }

    /* ── Value text: 12px Regular #4D586A ── */
    .rais-pf-dropdown__value {
      font-size: 12px;
      font-weight: 400;
      color: var(--color-text);
      white-space: nowrap;
    }

    /* ── Placeholder text: 12px Regular #8D9091 ── */
    .rais-pf-dropdown__placeholder {
      font-size: 12px;
      font-weight: 400;
      color: var(--color-placeholder);
      white-space: nowrap;
    }

    /* ── Caret: 9x5, bx-caret-down.svg ── */
    .rais-pf-dropdown__caret {
      width: 9px;
      height: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  </style>
`;

function renderPageFilterDropdown({ label, value, placeholder, labelPlacement, width }: any) {
  const placement = labelPlacement ?? 'horizontal';
  const lbl       = label ?? 'Sort By';
  const val       = value ?? '';
  const ph        = placeholder ?? 'Nocerino Family';
  const w         = width ?? (placement === 'vertical' ? 203 : 152);

  const wrapperClass = placement === 'vertical'
    ? 'rais-pf-dropdown--vertical'
    : 'rais-pf-dropdown--horizontal';

  const textContent = val
    ? `<span class="rais-pf-dropdown__value">${val}</span>`
    : `<span class="rais-pf-dropdown__placeholder">${ph}</span>`;

  return `
    ${RAIS_STYLES}
    <div class="${wrapperClass}">
      <span class="rais-pf-dropdown__label">${lbl}</span>
      <div class="rais-pf-dropdown__input" style="width:${w}px;">
        ${textContent}
        <span class="rais-pf-dropdown__caret">
          <img src="assets/boxicons/bx-caret-down.svg" width="9" height="5" alt="caret" />
        </span>
      </div>
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Filters/PageFilter Dropdown',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Filter label e.g. "Sort By", "Region", "Status"'
    },
    value: {
      control: 'text',
      description: 'Selected value — leave empty to show placeholder'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value selected'
    },
    labelPlacement: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'horizontal=label left of input | vertical=label above input'
    },
    width: {
      control: 'number',
      description: 'Input width in pixels'
    },
  },
  render: (args) => renderPageFilterDropdown(args),
};

export default meta;
type Story = StoryObj;

export const HorizontalWithValue: Story = {
  name: 'Horizontal — With Value',
  args: { label: 'Sort By', value: 'Policy Holder (A-Z)', labelPlacement: 'horizontal', width: 152 },
};

export const HorizontalPlaceholder: Story = {
  name: 'Horizontal — Placeholder',
  args: { label: 'Sort By', value: '', placeholder: 'Nocerino Family', labelPlacement: 'horizontal', width: 152 },
};

export const VerticalWithValue: Story = {
  name: 'Vertical — With Value',
  args: { label: 'Sort By', value: 'Policy Holder (A-Z)', labelPlacement: 'vertical', width: 203 },
};

export const VerticalPlaceholder: Story = {
  name: 'Vertical — Placeholder',
  args: { label: 'Sort By', value: '', placeholder: 'Nocerino Family', labelPlacement: 'vertical', width: 203 },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">HORIZONTAL LABEL</span>
        <div style="display:flex;gap:24px;align-items:center;">
          ${renderPageFilterDropdown({ label: 'Sort By', value: 'Policy Holder (A-Z)', labelPlacement: 'horizontal', width: 152 })}
          ${renderPageFilterDropdown({ label: 'Sort By', placeholder: 'Select...', labelPlacement: 'horizontal', width: 152 })}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">VERTICAL LABEL</span>
        <div style="display:flex;gap:24px;align-items:flex-start;">
          ${renderPageFilterDropdown({ label: 'Sort By', value: 'Policy Holder (A-Z)', labelPlacement: 'vertical', width: 203 })}
          ${renderPageFilterDropdown({ label: 'Sort By', placeholder: 'Select...', labelPlacement: 'vertical', width: 203 })}
        </div>
      </div>
    </div>
  `,
};

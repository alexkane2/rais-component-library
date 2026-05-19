import type { Meta, StoryObj } from '@storybook/html';

/**
 * PageFilter Searchbar — RAIS Filters component
 *
 * A compact, pill-shaped search input used in page-level filter bars.
 * Different from the standard Search Bar (which uses radius 4px).
 *
 * Icons: public/assets/boxicons/bx-search-alt-2.svg
 * Angular: <img src="assets/boxicons/bx-search-alt-2.svg" width="16" height="16" />
 *
 * Specs:
 *   343x28, radius 16 (pill), padding T4 R12 B4 L12, gap 10
 *   bg: #FFFFFF, border: #CCCCCC 1px
 *   Text: 12px Regular #4D586A, placeholder "Search..."
 *   Icon: bx-search-alt-2, 16x16, #454545
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400&display=swap');
    :root {
      --color-text: #4D586A;
      --color-placeholder: #4D586A;
      --color-icon: #454545;
      --color-border: #CCCCCC;
      --color-bg-white: #FFFFFF;
      --font-family: 'Figtree', sans-serif;
    }

    /* ── PageFilter Searchbar ──
       343x28, radius 16 (pill shape)
       padding: T4 R12 B4 L12
       gap: 10px
       HORIZONTAL, SPACE_BETWEEN, CENTER
    ── */
    .rais-pf-searchbar {
      width: 343px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 12px;
      background: var(--color-bg-white);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      box-sizing: border-box;
      gap: 10px;
      font-family: var(--font-family);
    }

    .rais-pf-searchbar__input {
      flex: 1;
      border: none;
      outline: none;
      font-family: var(--font-family);
      font-size: 12px;
      font-weight: 400;
      color: var(--color-text);
      background: transparent;
      min-width: 0;
    }

    .rais-pf-searchbar__input::placeholder {
      color: var(--color-placeholder);
    }

    /* Icon: 16x16, bx-search-alt-2.svg */
    .rais-pf-searchbar__icon {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  </style>
`;

function renderPageFilterSearchbar({ placeholder, value, width }: any) {
  const w = width ?? 343;
  return `
    ${RAIS_STYLES}
    <div class="rais-pf-searchbar" style="width:${w}px;">
      <input
        class="rais-pf-searchbar__input"
        type="text"
        placeholder="${placeholder ?? 'Search...'}"
        value="${value ?? ''}"
      />
      <div class="rais-pf-searchbar__icon">
        <img src="assets/boxicons/bx-search-alt-2.svg" width="16" height="16" alt="search" />
      </div>
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Filters/PageFilter Searchbar',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty'
    },
    value: {
      control: 'text',
      description: 'Current search value'
    },
    width: {
      control: 'number',
      description: 'Width in pixels (default 343px)'
    },
  },
  render: (args) => renderPageFilterSearchbar(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { placeholder: 'Search...', value: '', width: 343 },
};

export const WithValue: Story = {
  args: { placeholder: 'Search...', value: 'Plumbing', width: 343 },
};

export const Narrow: Story = {
  args: { placeholder: 'Search...', value: '', width: 200 },
};

export const Wide: Story = {
  args: { placeholder: 'Search...', value: '', width: 500 },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;">
      <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">DEFAULT (343px)</span>
      ${renderPageFilterSearchbar({ placeholder: 'Search...', width: 343 })}

      <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">WITH VALUE</span>
      ${renderPageFilterSearchbar({ placeholder: 'Search...', value: 'Plumbing', width: 343 })}

      <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">NARROW (200px)</span>
      ${renderPageFilterSearchbar({ placeholder: 'Search...', width: 200 })}

      <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">WIDE (500px)</span>
      ${renderPageFilterSearchbar({ placeholder: 'Search...', width: 500 })}
    </div>
  `,
};

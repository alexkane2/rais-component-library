import type { Meta, StoryObj } from '@storybook/html';

/**
 * Toggle Button — RAIS Filters component
 *
 * Icons sourced from Boxicons (https://boxicons.com)
 * Installed via: npm install boxicons
 * Imported globally in .storybook/preview.ts
 *
 * Icon classes used:
 *   Show state → bx bxs-show
 *   Hide state → bx bxs-hide
 *
 * Angular usage:
 *   <i class="bx bxs-show"></i>
 *   <i class="bx bxs-hide"></i>
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@600&display=swap');
    :root {
      --color-text: #333333;
      --color-border: #CCCCCC;
      --color-bg-default: #FFFFFF;
      --color-bg-hover: #EDF6FC;
      --color-icon: #333333;
      --font-family: 'Figtree', sans-serif;
    }

    /* ── Toggle Button ──
       height: 26px, padding T6 R12 B6 L12
       gap: 6px, HORIZONTAL, crossAxis CENTER
       radius: 12px (pill shape)
       bg: white default, #EDF6FC hover
       border: #CCCCCC 1px
    ── */
    .rais-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      height: 26px;
      background: var(--color-bg-default);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      box-sizing: border-box;
      cursor: pointer;
      font-family: var(--font-family);
    }

    .rais-toggle-btn--hover {
      background: var(--color-bg-hover);
    }

    /* ── Icon: 14x14 using Boxicons ── */
    .rais-toggle-btn__icon {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 14px;
      color: var(--color-icon);
      line-height: 1;
    }

    /* ── Label: 12px SemiBold #333333 ── */
    .rais-toggle-btn__label {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text);
      line-height: 1;
      white-space: nowrap;
    }
  </style>
`;

function renderToggleButton({ label, toggleState, interaction }: any) {
  const isHover   = interaction === 'hover';
  const isHide    = toggleState === 'hide';
  const iconClass = isHide ? 'bx bxs-hide' : 'bx bxs-show';

  return `
    ${RAIS_STYLES}
    <button class="rais-toggle-btn ${isHover ? 'rais-toggle-btn--hover' : ''}">
      <span class="rais-toggle-btn__icon">
        <i class="${iconClass}"></i>
      </span>
      <span class="rais-toggle-btn__label">${label ?? 'Label'}</span>
    </button>
  `;
}

const meta: Meta = {
  title: 'RAIS/Filters/Toggle Button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text'
    },
    toggleState: {
      control: 'select',
      options: ['show', 'hide'],
      description: 'show → bx bxs-show icon | hide → bx bxs-hide icon'
    },
    interaction: {
      control: 'select',
      options: ['default', 'hover'],
      description: 'default=white bg | hover=#EDF6FC bg'
    },
  },
  render: (args) => renderToggleButton(args),
};

export default meta;
type Story = StoryObj;

export const ShowDefault: Story = {
  name: 'Show — Default',
  args: { label: 'Label', toggleState: 'show', interaction: 'default' },
};

export const ShowHover: Story = {
  name: 'Show — Hover',
  args: { label: 'Label', toggleState: 'show', interaction: 'hover' },
};

export const HideDefault: Story = {
  name: 'Hide — Default',
  args: { label: 'Label', toggleState: 'hide', interaction: 'default' },
};

export const HideHover: Story = {
  name: 'Hide — Hover',
  args: { label: 'Label', toggleState: 'hide', interaction: 'hover' },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">SHOW STATE</span>
        <div style="display:flex;gap:12px;align-items:center;">
          ${renderToggleButton({ label: 'Label', toggleState: 'show', interaction: 'default' })}
          ${renderToggleButton({ label: 'Label', toggleState: 'show', interaction: 'hover' })}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">HIDE STATE</span>
        <div style="display:flex;gap:12px;align-items:center;">
          ${renderToggleButton({ label: 'Label', toggleState: 'hide', interaction: 'default' })}
          ${renderToggleButton({ label: 'Label', toggleState: 'hide', interaction: 'hover' })}
        </div>
      </div>
    </div>
  `,
};

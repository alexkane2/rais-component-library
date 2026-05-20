import type { Meta, StoryObj } from '@storybook/html';

/**
 * Visibility Toggle — RAIS Filters component
 *
 * (Previously named "Toggle Button" — renamed to Visibility Toggle for clarity,
 * since this is specifically a show/hide control with an eye icon. Distinguishes
 * it from the regular Toggle (on/off switch) and from generic toggle buttons.)
 *
 * Icons (from public/assets/boxicons/):
 *   bxs-show.svg — eye open  (shown when state = "show")
 *   bxs-hide.svg — eye closed (shown when state = "hide")
 *
 * Angular usage:
 *   <img src="assets/boxicons/bxs-show.svg" width="14" height="14" />
 *   <img src="assets/boxicons/bxs-hide.svg" width="14" height="14" />
 *
 * Specs (from Figma):
 *   height: 26px, padding: T6 R12 B6 L12, gap: 6
 *   radius: 12px (pill shape)
 *   bg: #FFFFFF default, #EDF6FC on hover
 *   border: #CCCCCC 1px
 *   Label: 12px SemiBold #333333
 *   Icon: 14×14 #333333
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

    /* ── Visibility Toggle ──
       Pill shape, 26px height
    ── */
    .rais-vis-toggle {
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

    .rais-vis-toggle--hover {
      background: var(--color-bg-hover);
    }

    /* Icon: 14×14 */
    .rais-vis-toggle__icon {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Label: 12px SemiBold #333333 */
    .rais-vis-toggle__label {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text);
      line-height: 1;
      white-space: nowrap;
    }
  </style>
`;

function renderVisibilityToggle({ label, toggleState, interaction }: any) {
  const isHover  = interaction === 'hover';
  const isHide   = toggleState === 'hide';
  const iconFile = isHide ? 'bxs-hide' : 'bxs-show';

  return `
    ${RAIS_STYLES}
    <button class="rais-vis-toggle ${isHover ? 'rais-vis-toggle--hover' : ''}">
      <span class="rais-vis-toggle__icon">
        <img src="assets/boxicons/${iconFile}.svg" width="14" height="14" alt="${iconFile}" />
      </span>
      <span class="rais-vis-toggle__label">${label ?? 'Label'}</span>
    </button>
  `;
}

const meta: Meta = {
  title: 'RAIS/Filters/Visibility Toggle',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text'
    },
    toggleState: {
      control: 'select',
      options: ['show', 'hide'],
      description: 'show → bxs-show.svg (eye open) | hide → bxs-hide.svg (eye closed)'
    },
    interaction: {
      control: 'select',
      options: ['default', 'hover'],
      description: 'default=white bg | hover=#EDF6FC bg'
    },
  },
  render: (args) => renderVisibilityToggle(args),
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
          ${renderVisibilityToggle({ label: 'Label', toggleState: 'show', interaction: 'default' })}
          ${renderVisibilityToggle({ label: 'Label', toggleState: 'show', interaction: 'hover' })}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">HIDE STATE</span>
        <div style="display:flex;gap:12px;align-items:center;">
          ${renderVisibilityToggle({ label: 'Label', toggleState: 'hide', interaction: 'default' })}
          ${renderVisibilityToggle({ label: 'Label', toggleState: 'hide', interaction: 'hover' })}
        </div>
      </div>
    </div>
  `,
};

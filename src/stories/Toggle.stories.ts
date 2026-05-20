import type { Meta, StoryObj } from '@storybook/html';

/**
 * Toggle — RAIS Selectors component
 *
 * Tokens (from Figma variables):
 *   --border-default    #CCCCCC  → unselected switch background
 *   --border-focus      #007CBD  → selected switch background
 *   --surface-primary   #FFFFFF  → knob fill
 *   --text-primary      #4D586A  → label text
 *   --spacing-02        6        → small size gap
 *   --spacing-03        8        → large/x-large size gap
 *   --spacing-09        28       → switch pill radius
 *
 * Typography (from Figma variables):
 *   Small:   Label/S Medium      → Figtree 12px Medium
 *   Large:   Paragraph/Default Reg → Figtree 14px Regular
 *   X-Large: Paragraph/Large Reg → Figtree 16px Regular
 *
 * Properties (matching Figma variants — 12 total):
 *   state:     'selected' | 'unselected'
 *   size:      'small' | 'large' | 'x-large'
 *   labelSide: 'left' | 'right'
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500&display=swap');

    /* Tokens — names match Figma variables */
    :root {
      --border-default: #CCCCCC;
      --border-focus: #007CBD;
      --surface-primary: #FFFFFF;
      --text-primary: #4D586A;
      --spacing-02: 6px;
      --spacing-03: 8px;
      --spacing-09: 28px;
      --font-family: 'Figtree', sans-serif;
    }

    /* ── Wrapper: HORIZONTAL row with label + switch ── */
    .rais-toggle {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      font-family: var(--font-family);
    }

    /* Gap per size */
    .rais-toggle--small   { gap: var(--spacing-02); }    /* 6px */
    .rais-toggle--large   { gap: var(--spacing-03); }    /* 8px */
    .rais-toggle--x-large { gap: var(--spacing-03); }    /* 8px */

    /* ── Switch track ──
       Small:   20×12
       Large:   23×14
       X-Large: 26×16
       Radius:  spacing-09 (28) — pill shape
       Unselected bg: --border-default
       Selected bg:   --border-focus
    ── */
    .rais-toggle__switch {
      position: relative;
      flex-shrink: 0;
      border-radius: var(--spacing-09);
      transition: background 0.2s ease;
      cursor: pointer;
    }
    .rais-toggle--small   .rais-toggle__switch { width: 20px; height: 12px; }
    .rais-toggle--large   .rais-toggle__switch { width: 23px; height: 14px; }
    .rais-toggle--x-large .rais-toggle__switch { width: 26px; height: 16px; }

    /* State colors */
    .rais-toggle--unselected .rais-toggle__switch { background: var(--border-default); }
    .rais-toggle--selected   .rais-toggle__switch { background: var(--border-focus); }

    /* ── Knob: white circle, sized per switch ──
       Small:   11×11
       Large:   12×12
       X-Large: 14×14
    ── */
    .rais-toggle__knob {
      position: absolute;
      top: 50%;
      background: var(--surface-primary);
      border-radius: 50%;
      transform: translateY(-50%);
      transition: left 0.2s ease;
    }
    .rais-toggle--small   .rais-toggle__knob { width: 11px; height: 11px; }
    .rais-toggle--large   .rais-toggle__knob { width: 12px; height: 12px; }
    .rais-toggle--x-large .rais-toggle__knob { width: 14px; height: 14px; }

    /* Knob position — left when unselected, right when selected */
    /* Small:   track 20, knob 11 → left 0 / 8 */
    /* Large:   track 23, knob 12 → left 1 / 10 */
    /* X-Large: track 26, knob 14 → left 1 / 11 */
    .rais-toggle--small.rais-toggle--unselected   .rais-toggle__knob { left: 0; }
    .rais-toggle--small.rais-toggle--selected     .rais-toggle__knob { left: 8px; }
    .rais-toggle--large.rais-toggle--unselected   .rais-toggle__knob { left: 1px; }
    .rais-toggle--large.rais-toggle--selected     .rais-toggle__knob { left: 10px; }
    .rais-toggle--x-large.rais-toggle--unselected .rais-toggle__knob { left: 1px; }
    .rais-toggle--x-large.rais-toggle--selected   .rais-toggle__knob { left: 11px; }

    /* ── Label text ──
       Small:   12px Medium (Label/S Medium)
       Large:   14px Regular (Paragraph/Default Reg)
       X-Large: 16px Regular (Paragraph/Large Reg)
    ── */
    .rais-toggle__label {
      color: var(--text-primary);
      line-height: 1.4;
      user-select: none;
    }
    .rais-toggle--small   .rais-toggle__label { font-size: 12px; font-weight: 500; }
    .rais-toggle--large   .rais-toggle__label { font-size: 14px; font-weight: 400; }
    .rais-toggle--x-large .rais-toggle__label { font-size: 16px; font-weight: 400; }
  </style>
`;

function renderToggle({ label, state, size, labelSide }: any) {
  const lbl  = label ?? 'Label';
  const st   = state ?? 'unselected';
  const sz   = size ?? 'large';
  const side = labelSide ?? 'right';

  const cls = [
    'rais-toggle',
    `rais-toggle--${sz}`,
    `rais-toggle--${st}`,
  ].join(' ');

  const labelEl  = `<span class="rais-toggle__label">${lbl}</span>`;
  const switchEl = `
    <div class="rais-toggle__switch">
      <div class="rais-toggle__knob"></div>
    </div>
  `;

  return `
    ${RAIS_STYLES}
    <div class="${cls}">
      ${side === 'left' ? labelEl + switchEl : switchEl + labelEl}
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Selectors/Toggle',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text shown next to the toggle'
    },
    state: {
      control: 'select',
      options: ['unselected', 'selected'],
      description: 'unselected=#CCCCCC track | selected=#007CBD track'
    },
    size: {
      control: 'select',
      options: ['small', 'large', 'x-large'],
      description: 'small=20×12 (12px Medium) | large=23×14 (14px Regular) | x-large=26×16 (16px Regular)'
    },
    labelSide: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of label relative to switch'
    },
  },
  render: (args) => renderToggle(args),
};

export default meta;
type Story = StoryObj;

// ── Large (default) ──
export const LargeUnselected: Story = {
  name: 'Large — Unselected',
  args: { label: 'Label', state: 'unselected', size: 'large', labelSide: 'right' },
};

export const LargeSelected: Story = {
  name: 'Large — Selected',
  args: { label: 'Label', state: 'selected', size: 'large', labelSide: 'right' },
};

// ── Small ──
export const SmallUnselected: Story = {
  name: 'Small — Unselected',
  args: { label: 'Label', state: 'unselected', size: 'small', labelSide: 'right' },
};

export const SmallSelected: Story = {
  name: 'Small — Selected',
  args: { label: 'Label', state: 'selected', size: 'small', labelSide: 'right' },
};

// ── X-Large ──
export const XLargeUnselected: Story = {
  name: 'X-Large — Unselected',
  args: { label: 'Label', state: 'unselected', size: 'x-large', labelSide: 'right' },
};

export const XLargeSelected: Story = {
  name: 'X-Large — Selected',
  args: { label: 'Label', state: 'selected', size: 'x-large', labelSide: 'right' },
};

// ── Label on left ──
export const LabelLeftUnselected: Story = {
  name: 'Label Left — Unselected',
  args: { label: 'Label', state: 'unselected', size: 'large', labelSide: 'left' },
};

export const LabelLeftSelected: Story = {
  name: 'Label Left — Selected',
  args: { label: 'Label', state: 'selected', size: 'large', labelSide: 'left' },
};

// ── All variants grid ──
export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">

      <div style="display:flex;flex-direction:column;gap:12px;">
        <span style="font-size:11px;color:#8D9091;">SMALL (12px Medium)</span>
        <div style="display:flex;gap:32px;align-items:center;">
          ${renderToggle({ label: 'Unselected', state: 'unselected', size: 'small', labelSide: 'right' })}
          ${renderToggle({ label: 'Selected',   state: 'selected',   size: 'small', labelSide: 'right' })}
          ${renderToggle({ label: 'Label left', state: 'selected',   size: 'small', labelSide: 'left'  })}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <span style="font-size:11px;color:#8D9091;">LARGE (14px Regular)</span>
        <div style="display:flex;gap:32px;align-items:center;">
          ${renderToggle({ label: 'Unselected', state: 'unselected', size: 'large', labelSide: 'right' })}
          ${renderToggle({ label: 'Selected',   state: 'selected',   size: 'large', labelSide: 'right' })}
          ${renderToggle({ label: 'Label left', state: 'selected',   size: 'large', labelSide: 'left'  })}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <span style="font-size:11px;color:#8D9091;">X-LARGE (16px Regular)</span>
        <div style="display:flex;gap:32px;align-items:center;">
          ${renderToggle({ label: 'Unselected', state: 'unselected', size: 'x-large', labelSide: 'right' })}
          ${renderToggle({ label: 'Selected',   state: 'selected',   size: 'x-large', labelSide: 'right' })}
          ${renderToggle({ label: 'Label left', state: 'selected',   size: 'x-large', labelSide: 'left'  })}
        </div>
      </div>

    </div>
  `,
};

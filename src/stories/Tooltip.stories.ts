import type { Meta, StoryObj } from '@storybook/html';

/**
 * Tooltip — RAIS overlay component
 *
 * A dark tooltip with a triangle caret pointing toward its anchor. Three sizes
 * and four caret positions make 12 visual permutations. The caret is rendered
 * via pure CSS borders (no SVG asset needed).
 *
 * Tokens (from Figma variables):
 *   --gray-900            #333333 → tooltip background
 *   --text-inverse        #FFFFFF → tooltip text
 *   --radius-sm           4px     → corner radius
 *   --spacing-01..05      4/6/10/12 → paddings vary by size
 *
 * Type styles (from Figma):
 *   Small label          — Figtree Medium 12 / line-height 1.2 / letter-spacing 0.36px
 *   Medium label / desc  — Figtree Bold 13 + Medium 13 / line-height 1.2 / letter-spacing 0.39px
 *   Large label          — Figtree Bold 13 / line-height 1.2 / letter-spacing 0.39px
 *   Large description    — Figtree Regular 12 / line-height 1.4 / letter-spacing 0.18px / 250px wide / min-height 30px
 *
 * Caret geometry (CSS border triangles):
 *   Small  — 8×4px
 *   Medium — 10×5px
 *   Large  — 10×5px
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;700&display=swap');

    :root {
      --tooltip-bg:    #333333;
      --tooltip-text:  #FFFFFF;
      --radius-sm:     4px;
      --font-family:   'Figtree', sans-serif;
    }

    /* ── Container — flex direction switches with caret position ── */
    .rais-tooltip {
      display: inline-flex;
      align-items: center;
      filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.2));
      font-family: var(--font-family);
    }
    .rais-tooltip--caret-top,
    .rais-tooltip--caret-bottom {
      flex-direction: column;
    }
    .rais-tooltip--caret-left,
    .rais-tooltip--caret-right {
      flex-direction: row;
    }

    /* ── Text container (dark pill) ── */
    .rais-tooltip__box {
      background: var(--tooltip-bg);
      color: var(--tooltip-text);
      border-radius: var(--radius-sm);
      overflow: hidden;
      display: flex;
      flex-shrink: 0;
    }

    /* Size: Small — single line, compact padding */
    .rais-tooltip--small .rais-tooltip__box {
      padding: 4px 10px;
      align-items: center;
      justify-content: center;
    }
    .rais-tooltip--small .rais-tooltip__label {
      font-weight: 500;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: 0.36px;
      text-align: center;
      white-space: nowrap;
    }

    /* Size: Medium — inline Label: + Description, single line */
    .rais-tooltip--medium .rais-tooltip__box {
      padding: 6px 12px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 13px;
      line-height: 1.2;
      letter-spacing: 0.39px;
      white-space: nowrap;
    }
    .rais-tooltip--medium .rais-tooltip__label       { font-weight: 700; }
    .rais-tooltip--medium .rais-tooltip__description { font-weight: 500; }

    /* Size: Large — stacked Label + multi-line description, fixed 250px width */
    .rais-tooltip--large .rais-tooltip__box {
      padding: 10px;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
    .rais-tooltip--large .rais-tooltip__label {
      font-weight: 700;
      font-size: 13px;
      line-height: 1.2;
      letter-spacing: 0.39px;
      white-space: nowrap;
    }
    .rais-tooltip--large .rais-tooltip__description {
      font-weight: 400;
      font-size: 12px;
      line-height: 1.4;
      letter-spacing: 0.18px;
      width: 250px;
      min-height: 30px;
    }

    /* ── Caret (CSS border triangle, no SVG) ──
       Sizes from Figma: Small caret 8×4, Medium/Large caret 10×5 */
    .rais-tooltip__caret {
      width: 0;
      height: 0;
      flex-shrink: 0;
    }
    /* Medium + Large carets share dimensions */
    .rais-tooltip--medium .rais-tooltip__caret,
    .rais-tooltip--large  .rais-tooltip__caret { --caret-base: 10px; --caret-height: 5px; }
    .rais-tooltip--small  .rais-tooltip__caret { --caret-base: 8px;  --caret-height: 4px; }

    /* Top: caret renders above box, points up */
    .rais-tooltip--caret-top .rais-tooltip__caret {
      border-left:   calc(var(--caret-base) / 2) solid transparent;
      border-right:  calc(var(--caret-base) / 2) solid transparent;
      border-bottom: var(--caret-height) solid var(--tooltip-bg);
    }
    /* Bottom: caret renders below box, points down */
    .rais-tooltip--caret-bottom .rais-tooltip__caret {
      border-left:  calc(var(--caret-base) / 2) solid transparent;
      border-right: calc(var(--caret-base) / 2) solid transparent;
      border-top:   var(--caret-height) solid var(--tooltip-bg);
    }
    /* Left: caret on left of box, points left */
    .rais-tooltip--caret-left .rais-tooltip__caret {
      border-top:    calc(var(--caret-base) / 2) solid transparent;
      border-bottom: calc(var(--caret-base) / 2) solid transparent;
      border-right:  var(--caret-height) solid var(--tooltip-bg);
    }
    /* Right: caret on right of box, points right */
    .rais-tooltip--caret-right .rais-tooltip__caret {
      border-top:    calc(var(--caret-base) / 2) solid transparent;
      border-bottom: calc(var(--caret-base) / 2) solid transparent;
      border-left:   var(--caret-height) solid var(--tooltip-bg);
    }
  </style>
`;

type Size = 'small' | 'medium' | 'large';
type CaretPosition = 'top' | 'right' | 'bottom' | 'left';

type TooltipArgs = {
  size: Size;
  caretPosition: CaretPosition;
  showLabel: boolean;
  label: string;
  description: string;
};

function renderTooltip({ size, caretPosition, showLabel, label, description }: TooltipArgs) {
  // Compose the inner text content based on size + showLabel
  let inner = '';
  if (size === 'small') {
    inner = `<span class="rais-tooltip__label">${label}</span>`;
  } else if (size === 'medium') {
    const labelSpan = showLabel ? `<span class="rais-tooltip__label">${label}:</span>` : '';
    inner = `${labelSpan}<span class="rais-tooltip__description">${description}</span>`;
  } else {
    // large
    const labelSpan = showLabel ? `<span class="rais-tooltip__label">${label}:</span>` : '';
    inner = `${labelSpan}<span class="rais-tooltip__description">${description}</span>`;
  }

  const box = `<div class="rais-tooltip__box">${inner}</div>`;
  const caret = `<span class="rais-tooltip__caret"></span>`;

  // Caret position determines child order
  const children =
    caretPosition === 'top'    ? `${caret}${box}` :
    caretPosition === 'left'   ? `${caret}${box}` :
    caretPosition === 'bottom' ? `${box}${caret}` :
    /* right */                  `${box}${caret}`;

  return `
    ${RAIS_STYLES}
    <div class="rais-tooltip rais-tooltip--${size} rais-tooltip--caret-${caretPosition}">
      ${children}
    </div>
  `;
}

const meta: Meta<TooltipArgs> = {
  title: 'RAIS/Overlays/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tooltip size — controls padding, typography, and content layout',
    },
    caretPosition: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Which edge the caret protrudes from (points toward the anchor)',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show the "Label:" prefix (Medium/Large only — Small is label-only)',
    },
    label: { control: 'text', description: 'Bold label text' },
    description: { control: 'text', description: 'Body/description text' },
  },
  render: (args) => renderTooltip(args),
};

export default meta;
type Story = StoryObj<TooltipArgs>;

const longCopy = 'Long form tooltip copy goes here...';

// ── Large (top / right / bottom / left) ──
export const LargeTop: Story = {
  args: { size: 'large', caretPosition: 'top', showLabel: true, label: 'Label', description: longCopy },
};
export const LargeRight: Story = {
  args: { size: 'large', caretPosition: 'right', showLabel: true, label: 'Label', description: longCopy },
};
export const LargeBottom: Story = {
  args: { size: 'large', caretPosition: 'bottom', showLabel: true, label: 'Label', description: longCopy },
};
export const LargeLeft: Story = {
  args: { size: 'large', caretPosition: 'left', showLabel: true, label: 'Label', description: longCopy },
};

// ── Medium (top / right / bottom / left) ──
export const MediumTop: Story = {
  args: { size: 'medium', caretPosition: 'top', showLabel: true, label: 'Label', description: 'Description' },
};
export const MediumRight: Story = {
  args: { size: 'medium', caretPosition: 'right', showLabel: true, label: 'Label', description: 'Description' },
};
export const MediumBottom: Story = {
  args: { size: 'medium', caretPosition: 'bottom', showLabel: true, label: 'Label', description: 'Description' },
};
export const MediumLeft: Story = {
  args: { size: 'medium', caretPosition: 'left', showLabel: true, label: 'Label', description: 'Description' },
};
export const MediumNoLabel: Story = {
  name: 'Medium (no label)',
  args: { size: 'medium', caretPosition: 'top', showLabel: false, label: 'Label', description: 'Description only' },
};

// ── Small (top / right / bottom / left) ──
export const SmallTop: Story = {
  args: { size: 'small', caretPosition: 'top', showLabel: true, label: 'Label', description: '' },
};
export const SmallRight: Story = {
  args: { size: 'small', caretPosition: 'right', showLabel: true, label: 'Label', description: '' },
};
export const SmallBottom: Story = {
  args: { size: 'small', caretPosition: 'bottom', showLabel: true, label: 'Label', description: '' },
};
export const SmallLeft: Story = {
  args: { size: 'small', caretPosition: 'left', showLabel: true, label: 'Label', description: '' },
};

// ── All variants ──
export const AllVariants: Story = {
  render: () => {
    const sizes: Size[] = ['large', 'medium', 'small'];
    const positions: CaretPosition[] = ['top', 'right', 'bottom', 'left'];
    const rows = sizes.map(size => {
      const heading = `${size[0].toUpperCase()}${size.slice(1)}`;
      const tooltips = positions.map(caretPosition => {
        const args: TooltipArgs = size === 'small'
          ? { size, caretPosition, showLabel: true, label: 'Label', description: '' }
          : size === 'medium'
            ? { size, caretPosition, showLabel: true, label: 'Label', description: 'Description' }
            : { size, caretPosition, showLabel: true, label: 'Label', description: longCopy };
        return `
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
            <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret ${caretPosition}</span>
            ${renderTooltip(args)}
          </div>
        `;
      }).join('');
      return `
        <div>
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;margin-bottom:12px;text-transform:uppercase;letter-spacing:1px;">${heading}</div>
          <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start;">${tooltips}</div>
        </div>
      `;
    }).join('');
    return `
      ${RAIS_STYLES}
      <div style="display:flex;flex-direction:column;gap:32px;padding:32px;background:#F0F2F5;border-radius:8px;">${rows}</div>
    `;
  },
};

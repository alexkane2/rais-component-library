import type { Meta, StoryObj } from '@storybook/html';

/**
 * Accordion Link — RAIS Actions component
 *
 * Two styles:
 *   Caret — chevron icon on the RIGHT (bxs-chevron-down / bxs-chevron-up)
 *   Plus  — plus/minus icon on the LEFT (bxs-plus-circle / bx-minus)
 *
 * Icons: public/assets/boxicons/
 *   bxs-chevron-down.svg  — caret closed
 *   bxs-chevron-up.svg    — caret open
 *   bxs-plus-circle.svg   — plus closed
 *   bx-minus.svg           — plus open
 *
 * Angular usage:
 *   <img src="assets/boxicons/bxs-chevron-down.svg" width="20" height="20" />
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&display=swap');
    :root {
      --accordion-default: #007CBD;
      --accordion-hover:   #178FCF;
      --font-family: 'Figtree', sans-serif;
    }

    .rais-accordion-link {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      font-family: var(--font-family);
    }

    /* Sizes */
    .rais-accordion-link--large  { gap: 8px; font-size: 16px; font-weight: 700; }
    .rais-accordion-link--medium { gap: 8px; font-size: 14px; font-weight: 700; }
    .rais-accordion-link--small  { gap: 6px; font-size: 13px; font-weight: 600; }

    /* States */
    .rais-accordion-link--default { color: var(--accordion-default); }
    .rais-accordion-link--hover   { color: var(--accordion-hover); }

    /* Icon container */
    .rais-accordion-link__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Icon sizes per component size — Caret style */
    .rais-accordion-link--large  .rais-accordion-link__icon--caret { width: 20px; height: 20px; }
    .rais-accordion-link--medium .rais-accordion-link__icon--caret { width: 18px; height: 18px; }
    .rais-accordion-link--small  .rais-accordion-link__icon--caret { width: 16px; height: 16px; }

    /* Icon sizes per component size — Plus style */
    .rais-accordion-link--large  .rais-accordion-link__icon--plus { width: 18px; height: 18px; }
    .rais-accordion-link--medium .rais-accordion-link__icon--plus { width: 16px; height: 16px; }
    .rais-accordion-link--small  .rais-accordion-link__icon--plus { width: 14px; height: 14px; }

    /* Tint icon to match text color */
    .rais-accordion-link--default .rais-accordion-link__icon img {
      filter: invert(35%) sepia(87%) saturate(500%) hue-rotate(170deg);
    }
    .rais-accordion-link--hover .rais-accordion-link__icon img {
      filter: invert(52%) sepia(60%) saturate(400%) hue-rotate(170deg);
    }
  </style>
`;

// Icon file mapping
const ICON_MAP: Record<string, Record<string, string>> = {
  caret: { closed: 'bxs-chevron-down', open: 'bxs-chevron-up' },
  plus:  { closed: 'bxs-plus-circle',  open: 'bx-minus' },
};

// Icon size mapping
const ICON_SIZES: Record<string, Record<string, number>> = {
  caret: { large: 20, medium: 18, small: 16 },
  plus:  { large: 18, medium: 16, small: 14 },
};

function renderAccordionLink({ label, style, size, state, open }: any) {
  const s     = size   ?? 'medium';
  const st    = state  ?? 'default';
  const sty   = style  ?? 'caret';
  const isOpen = open  ?? false;
  const lbl   = label  ?? 'Label';

  const iconFile = ICON_MAP[sty][isOpen ? 'open' : 'closed'];
  const iconSize = ICON_SIZES[sty][s];
  const iconClass = `rais-accordion-link__icon rais-accordion-link__icon--${sty}`;

  const cls = [
    'rais-accordion-link',
    `rais-accordion-link--${s}`,
    `rais-accordion-link--${st}`,
  ].join(' ');

  const iconEl = `<span class="${iconClass}"><img src="assets/boxicons/${iconFile}.svg" width="${iconSize}" height="${iconSize}" alt="${iconFile}" /></span>`;

  // Caret: label first, then icon (right)
  // Plus: icon first, then label (left)
  const content = sty === 'caret'
    ? `<span>${lbl}</span>${iconEl}`
    : `${iconEl}<span>${lbl}</span>`;

  return `
    ${RAIS_STYLES}
    <a class="${cls}">
      ${content}
    </a>
  `;
}

const meta: Meta = {
  title: 'RAIS/Buttons/Accordion Link',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Link label text'
    },
    style: {
      control: 'select',
      options: ['caret', 'plus'],
      description: 'caret=chevron icon on the right | plus=plus/minus icon on the left'
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: 'large=16px Bold | medium=14px Bold | small=13px SemiBold'
    },
    state: {
      control: 'select',
      options: ['default', 'hover'],
      description: 'default=#007CBD | hover=#178FCF'
    },
    open: {
      control: 'boolean',
      description: 'false=collapsed (chevron-down / plus-circle) | true=expanded (chevron-up / minus)'
    },
  },
  render: (args) => renderAccordionLink(args),
};

export default meta;
type Story = StoryObj;

// ── Caret Style ──
export const CaretClosedDefault: Story = {
  name: 'Caret — Closed',
  args: { label: 'Label', style: 'caret', size: 'medium', state: 'default', open: false },
};

export const CaretOpenDefault: Story = {
  name: 'Caret — Open',
  args: { label: 'Label', style: 'caret', size: 'medium', state: 'default', open: true },
};

export const CaretClosedHover: Story = {
  name: 'Caret — Closed Hover',
  args: { label: 'Label', style: 'caret', size: 'medium', state: 'hover', open: false },
};

export const CaretOpenHover: Story = {
  name: 'Caret — Open Hover',
  args: { label: 'Label', style: 'caret', size: 'medium', state: 'hover', open: true },
};

// ── Plus Style ──
export const PlusClosedDefault: Story = {
  name: 'Plus — Closed',
  args: { label: 'Label', style: 'plus', size: 'medium', state: 'default', open: false },
};

export const PlusOpenDefault: Story = {
  name: 'Plus — Open',
  args: { label: 'Label', style: 'plus', size: 'medium', state: 'default', open: true },
};

export const PlusClosedHover: Story = {
  name: 'Plus — Closed Hover',
  args: { label: 'Label', style: 'plus', size: 'medium', state: 'hover', open: false },
};

export const PlusOpenHover: Story = {
  name: 'Plus — Open Hover',
  args: { label: 'Label', style: 'plus', size: 'medium', state: 'hover', open: true },
};

// ── Sizes ──
export const Large: Story = {
  args: { label: 'Label', style: 'caret', size: 'large', state: 'default', open: false },
};

export const Small: Story = {
  args: { label: 'Label', style: 'caret', size: 'small', state: 'default', open: false },
};

// ── All Variants ──
export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:32px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">

      <div style="display:flex;flex-direction:column;gap:12px;">
        <span style="font-size:11px;color:#8D9091;">CARET STYLE — Closed</span>
        <div style="display:flex;gap:24px;align-items:center;">
          ${renderAccordionLink({ label: 'Large',  style: 'caret', size: 'large',  state: 'default', open: false })}
          ${renderAccordionLink({ label: 'Medium', style: 'caret', size: 'medium', state: 'default', open: false })}
          ${renderAccordionLink({ label: 'Small',  style: 'caret', size: 'small',  state: 'default', open: false })}
        </div>
        <span style="font-size:11px;color:#8D9091;">CARET STYLE — Open</span>
        <div style="display:flex;gap:24px;align-items:center;">
          ${renderAccordionLink({ label: 'Large',  style: 'caret', size: 'large',  state: 'default', open: true })}
          ${renderAccordionLink({ label: 'Medium', style: 'caret', size: 'medium', state: 'default', open: true })}
          ${renderAccordionLink({ label: 'Small',  style: 'caret', size: 'small',  state: 'default', open: true })}
        </div>
        <span style="font-size:11px;color:#8D9091;">CARET STYLE — Hover</span>
        <div style="display:flex;gap:24px;align-items:center;">
          ${renderAccordionLink({ label: 'Closed', style: 'caret', size: 'medium', state: 'hover', open: false })}
          ${renderAccordionLink({ label: 'Open',   style: 'caret', size: 'medium', state: 'hover', open: true })}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <span style="font-size:11px;color:#8D9091;">PLUS STYLE — Closed</span>
        <div style="display:flex;gap:24px;align-items:center;">
          ${renderAccordionLink({ label: 'Large',  style: 'plus', size: 'large',  state: 'default', open: false })}
          ${renderAccordionLink({ label: 'Medium', style: 'plus', size: 'medium', state: 'default', open: false })}
          ${renderAccordionLink({ label: 'Small',  style: 'plus', size: 'small',  state: 'default', open: false })}
        </div>
        <span style="font-size:11px;color:#8D9091;">PLUS STYLE — Open</span>
        <div style="display:flex;gap:24px;align-items:center;">
          ${renderAccordionLink({ label: 'Large',  style: 'plus', size: 'large',  state: 'default', open: true })}
          ${renderAccordionLink({ label: 'Medium', style: 'plus', size: 'medium', state: 'default', open: true })}
          ${renderAccordionLink({ label: 'Small',  style: 'plus', size: 'small',  state: 'default', open: true })}
        </div>
        <span style="font-size:11px;color:#8D9091;">PLUS STYLE — Hover</span>
        <div style="display:flex;gap:24px;align-items:center;">
          ${renderAccordionLink({ label: 'Closed', style: 'plus', size: 'medium', state: 'hover', open: false })}
          ${renderAccordionLink({ label: 'Open',   style: 'plus', size: 'medium', state: 'hover', open: true })}
        </div>
      </div>

    </div>
  `,
};

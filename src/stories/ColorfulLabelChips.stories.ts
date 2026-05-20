import type { Meta, StoryObj } from '@storybook/html';

/**
 * Colorful Label Chips — RAIS Labeling component
 *
 * 12 colors × 3 sizes = 36 Figma variants.
 *
 * Tokens (from Figma variables):
 *   12 Color pairs (text/bg):
 *     Gray Blue:      gray-blue-600 #293B52       / gray-blue-100 #E1EAF4
 *     Periwinkle:     periwinkle-600 #1E4D66      / periwinkle-100 #E3F5FF
 *     Teal:           teal-600 #15545A            / teal-100 #D8F6F8
 *     Forest Green:   forest-green-600 #084F47    / forest-green-100 #DEFAEB
 *     Pea Green:      pea-green-600 #254909       / pea-green-100 #E7F5E1
 *     Yellow:         yellow-600 #6F590D          / yellow-100 #FFF8DC
 *     Orange:         orange-600 #893C08          / orange-100 #FFEFE4
 *     Pink:           pink-600 #751336            / pink-100 #FBE8E9
 *     Magenta:        magenta-600 #54143F         / magenta-100 #EFE3EB
 *     Warm Gray:      warm-gray-600 #3B3434       / warm-gray-100 #F4EFEF
 *     Standard Blue:  brand-blue-300 #004288      / brand-blue-50 #EDF6FC
 *     Standard Gray:  gray-800 #454545            / gray-200 #F3F3F3
 *
 *   --border-radius-xl   16  → pill radius
 *   --spacing-01         4   → small/medium gap
 *   --spacing-03         8   → large gap
 *
 * Typography:
 *   Small:  10px SemiBold (Label/XS SemiBold)
 *   Medium: 12px SemiBold (Label/S SemiBold)
 *   Large:  13px SemiBold (Label/M SemiBold)
 *
 * Icon (default bxs-inbox.svg, configurable):
 *   Small:  10×10
 *   Medium: 12×12
 *   Large:  14×14
 */

const COLOR_MAP: Record<string, { text: string; bg: string }> = {
  'gray-blue':     { text: '#293B52', bg: '#E1EAF4' },
  'periwinkle':    { text: '#1E4D66', bg: '#E3F5FF' },
  'teal':          { text: '#15545A', bg: '#D8F6F8' },
  'forest-green':  { text: '#084F47', bg: '#DEFAEB' },
  'pea-green':     { text: '#254909', bg: '#E7F5E1' },
  'yellow':        { text: '#6F590D', bg: '#FFF8DC' },
  'orange':        { text: '#893C08', bg: '#FFEFE4' },
  'pink':          { text: '#751336', bg: '#FBE8E9' },
  'magenta':       { text: '#54143F', bg: '#EFE3EB' },
  'warm-gray':     { text: '#3B3434', bg: '#F4EFEF' },
  'standard-blue': { text: '#004288', bg: '#EDF6FC' },
  'standard-gray': { text: '#454545', bg: '#F3F3F3' },
};

const COLOR_LABELS: Record<string, string> = {
  'gray-blue': 'Gray Blue',
  'periwinkle': 'Periwinkle',
  'teal': 'Teal',
  'forest-green': 'Forest Green',
  'pea-green': 'Pea Green',
  'yellow': 'Yellow',
  'orange': 'Orange',
  'pink': 'Pink',
  'magenta': 'Magenta',
  'warm-gray': 'Warm Gray',
  'standard-blue': 'Standard Blue',
  'standard-gray': 'Standard Gray',
};

const SIZE_SPECS: Record<string, {
  padding: string;
  gap: string;
  fontSize: string;
  iconSize: number;
}> = {
  small:  { padding: '4px 8px',   gap: '4px', fontSize: '10px', iconSize: 10 },
  medium: { padding: '4px 12px',  gap: '4px', fontSize: '12px', iconSize: 12 },
  large:  { padding: '6px 16px',  gap: '8px', fontSize: '13px', iconSize: 14 },
};

const ICON_OPTIONS = [
  '',
  'bxs-inbox',
  'bxs-tag',
  'bxs-bookmark',
  'bxs-star',
  'bxs-flag',
  'bxs-check-circle',
  'bxs-error-circle',
  'bxs-info-circle',
  'bxs-time',
  'bxs-bell',
  'bxs-folder',
  'bxs-category',
  'bx-check',
  'bx-x',
];

const STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@600&display=swap');

    /* Tokens — names match Figma variables */
    :root {
      --border-radius-xl: 16px;
      --spacing-01: 4px;
      --spacing-03: 8px;
      --font-family: 'Figtree', sans-serif;
    }

    .rais-chip {
      display: inline-flex;
      align-items: center;
      border-radius: var(--border-radius-xl);
      font-family: var(--font-family);
      font-weight: 600;
      line-height: 1.2;
      white-space: nowrap;
      box-sizing: border-box;
    }

    .rais-chip__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Icon tinting — applied per-color via CSS filter computed from text color */
    .rais-chip__icon img {
      width: 100%;
      height: 100%;
    }
  </style>
`;

// CSS filter approximations that tint a black SVG to each color
// (icons in boxicons are dark; filter recolors them to match text color)
const COLOR_FILTERS: Record<string, string> = {
  'gray-blue':     'invert(21%) sepia(15%) saturate(1200%) hue-rotate(180deg)',
  'periwinkle':    'invert(28%) sepia(20%) saturate(1000%) hue-rotate(170deg)',
  'teal':          'invert(28%) sepia(60%) saturate(800%) hue-rotate(140deg)',
  'forest-green':  'invert(25%) sepia(80%) saturate(700%) hue-rotate(130deg)',
  'pea-green':     'invert(20%) sepia(60%) saturate(900%) hue-rotate(60deg)',
  'yellow':        'invert(35%) sepia(60%) saturate(900%) hue-rotate(15deg)',
  'orange':        'invert(25%) sepia(80%) saturate(2000%) hue-rotate(0deg)',
  'pink':          'invert(15%) sepia(50%) saturate(2500%) hue-rotate(310deg)',
  'magenta':       'invert(13%) sepia(60%) saturate(2000%) hue-rotate(280deg)',
  'warm-gray':     'invert(20%) sepia(5%) saturate(300%) hue-rotate(0deg)',
  'standard-blue': 'invert(20%) sepia(80%) saturate(1500%) hue-rotate(195deg)',
  'standard-gray': 'invert(25%) sepia(0%) saturate(0%) hue-rotate(0deg)',
};

function renderChip({ label, color, size, icon }: any) {
  const c    = color ?? 'gray-blue';
  const s    = size  ?? 'medium';
  const lbl  = label ?? 'Label';
  const ico  = icon  ?? 'bxs-inbox';

  const { text, bg }                       = COLOR_MAP[c];
  const { padding, gap, fontSize, iconSize } = SIZE_SPECS[s];
  const filter                             = COLOR_FILTERS[c];

  const iconEl = ico ? `
    <span class="rais-chip__icon" style="width:${iconSize}px;height:${iconSize}px;filter:${filter};">
      <img src="assets/boxicons/${ico}.svg" alt="${ico}" />
    </span>
  ` : '';

  return `
    ${STYLES}
    <span class="rais-chip" style="
      background: ${bg};
      color: ${text};
      padding: ${padding};
      gap: ${gap};
      font-size: ${fontSize};
    ">
      ${iconEl}
      <span>${lbl}</span>
    </span>
  `;
}

const meta: Meta = {
  title: 'RAIS/Labeling/Colorful Label Chips',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip label text'
    },
    color: {
      control: 'select',
      options: Object.keys(COLOR_MAP),
      description: '12 color options — each uses the -600 token for text/icon and the -100 token for background'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'small=10px SemiBold | medium=12px SemiBold | large=13px SemiBold'
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Boxicons SVG name from assets/boxicons/ — defaults to bxs-inbox, empty for no icon'
    },
  },
  render: (args) => renderChip(args),
};

export default meta;
type Story = StoryObj;

// ── Default examples per size ──
export const Small: Story = {
  args: { label: 'Label', color: 'gray-blue', size: 'small', icon: 'bxs-inbox' },
};

export const Medium: Story = {
  args: { label: 'Label', color: 'gray-blue', size: 'medium', icon: 'bxs-inbox' },
};

export const Large: Story = {
  args: { label: 'Label', color: 'gray-blue', size: 'large', icon: 'bxs-inbox' },
};

// ── Color examples ──
export const Periwinkle: Story    = { args: { label: 'Label', color: 'periwinkle',    size: 'medium', icon: 'bxs-inbox' } };
export const Teal: Story          = { args: { label: 'Label', color: 'teal',          size: 'medium', icon: 'bxs-inbox' } };
export const ForestGreen: Story   = { args: { label: 'Label', color: 'forest-green',  size: 'medium', icon: 'bxs-inbox' } };
export const PeaGreen: Story      = { args: { label: 'Label', color: 'pea-green',     size: 'medium', icon: 'bxs-inbox' } };
export const Yellow: Story        = { args: { label: 'Label', color: 'yellow',        size: 'medium', icon: 'bxs-inbox' } };
export const Orange: Story        = { args: { label: 'Label', color: 'orange',        size: 'medium', icon: 'bxs-inbox' } };
export const Pink: Story          = { args: { label: 'Label', color: 'pink',          size: 'medium', icon: 'bxs-inbox' } };
export const Magenta: Story       = { args: { label: 'Label', color: 'magenta',       size: 'medium', icon: 'bxs-inbox' } };
export const WarmGray: Story      = { args: { label: 'Label', color: 'warm-gray',     size: 'medium', icon: 'bxs-inbox' } };
export const StandardBlue: Story  = { args: { label: 'Label', color: 'standard-blue', size: 'medium', icon: 'bxs-inbox' } };
export const StandardGray: Story  = { args: { label: 'Label', color: 'standard-gray', size: 'medium', icon: 'bxs-inbox' } };

// ── Without icon ──
export const NoIcon: Story = {
  args: { label: 'Label', color: 'gray-blue', size: 'medium', icon: '' },
};

// ── All variants grid (12 colors × 3 sizes) ──
export const AllVariants: Story = {
  render: () => `
    ${STYLES}
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
      ${Object.keys(COLOR_MAP).map(colorKey => `
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">${COLOR_LABELS[colorKey].toUpperCase()}</span>
          <div style="display:flex;gap:16px;align-items:center;">
            ${renderChip({ label: 'Label', color: colorKey, size: 'small',  icon: 'bxs-inbox' })}
            ${renderChip({ label: 'Label', color: colorKey, size: 'medium', icon: 'bxs-inbox' })}
            ${renderChip({ label: 'Label', color: colorKey, size: 'large',  icon: 'bxs-inbox' })}
          </div>
        </div>
      `).join('')}
    </div>
  `,
};

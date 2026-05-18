import type { Meta, StoryObj } from '@storybook/html';

/**
 * Button — RAIS Actions component
 *
 * Icons: Boxicons SVG files served from public/assets/boxicons/
 * Copied from node_modules/boxicons/svg/ via:
 *   cp -r node_modules/boxicons/svg/regular/. public/assets/boxicons/
 *   cp -r node_modules/boxicons/svg/solid/. public/assets/boxicons/
 *
 * Angular usage:
 *   <img src="assets/boxicons/bx-download.svg" width="16" height="16" />
 *   <img src="assets/boxicons/bxs-save.svg" width="16" height="16" />
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap');
    :root {
      --color-btn-bg-primary:          #007CBD;
      --color-btn-bg-primary-hover:    #178FCF;
      --color-btn-bg-primary-disabled: #B3D8EB;
      --color-btn-text-primary:        #FFFFFF;
      --color-btn-bg-secondary:        #FFFFFF;
      --color-btn-bg-secondary-hover:  #EDF6FC;
      --color-btn-border-secondary:    #007CBD;
      --color-btn-text-secondary:      #007CBD;
      --color-btn-bg-error:            #CA222D;
      --color-btn-text-error:          #CA222D;
      --font-family: 'Figtree', sans-serif;
      --font-weight-semibold: 600;
      --border-radius-sm: 4px;
    }

    .rais-btn {
      font-family: var(--font-family);
      font-weight: var(--font-weight-semibold);
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid transparent;
      transition: background 0.15s ease, color 0.15s ease;
      line-height: 1;
    }
    .rais-btn--normal { padding: 8px 16px;  font-size: 14px; }
    .rais-btn--small  { padding: 4px 10px;  font-size: 12px; }
    .rais-btn--large  { padding: 12px 24px; font-size: 16px; }

    .rais-btn--primary {
      background: var(--color-btn-bg-primary);
      color: var(--color-btn-text-primary);
      border-color: var(--color-btn-bg-primary);
    }
    .rais-btn--primary:hover {
      background: var(--color-btn-bg-primary-hover);
      border-color: var(--color-btn-bg-primary-hover);
    }
    .rais-btn--secondary {
      background: var(--color-btn-bg-secondary);
      color: var(--color-btn-text-secondary);
      border-color: var(--color-btn-border-secondary);
    }
    .rais-btn--secondary:hover { background: var(--color-btn-bg-secondary-hover); }
    .rais-btn--danger {
      background: var(--color-btn-bg-secondary);
      color: var(--color-btn-text-error);
      border-color: var(--color-btn-bg-error);
    }
    .rais-btn--disabled {
      background: var(--color-btn-bg-primary-disabled);
      color: var(--color-btn-text-primary);
      border-color: var(--color-btn-bg-primary-disabled);
      cursor: not-allowed;
      opacity: 0.7;
    }

    .rais-btn img { display: block; flex-shrink: 0; }
    /* Icon sizes per button size */
    .rais-btn--normal img { width: 16px; height: 16px; }
    .rais-btn--small  img { width: 14px; height: 14px; }
    .rais-btn--large  img { width: 18px; height: 18px; }

    /* Invert icon color for primary/disabled buttons (white bg needed) */
    .rais-btn--primary img,
    .rais-btn--disabled img { filter: brightness(0) invert(1); }
  </style>
`;

// Icons available for selection — file names from public/assets/boxicons/
const ICON_OPTIONS = [
  '',
  'bx-download',
  'bx-upload',
  'bx-plus',
  'bx-minus',
  'bx-trash',
  'bx-edit',
  'bx-save',
  'bx-search',
  'bx-filter',
  'bx-refresh',
  'bx-check',
  'bx-x',
  'bx-right-arrow-alt',
  'bx-left-arrow-alt',
  'bx-export',
  'bx-import',
  'bx-copy',
  'bx-print',
  'bx-share-alt',
  'bx-link-external',
  'bxs-save',
  'bxs-download',
  'bxs-edit',
  'bxs-trash',
  'bxs-plus-circle',
  'bxs-check-circle',
];

function iconImg(name: string, size: string = 'normal') {
  if (!name) return '';
  const px = size === 'small' ? 14 : size === 'large' ? 18 : 16;
  return `<img src="assets/boxicons/${name}.svg" width="${px}" height="${px}" alt="${name}" />`;
}

function renderBtn({ label, variant, size, icon, iconPos }: any) {
  const s   = size    ?? 'normal';
  const v   = variant ?? 'primary';
  const cls = `rais-btn rais-btn--${v} rais-btn--${s}`;
  const isDisabled = v === 'disabled';
  const iconEl = icon ? iconImg(icon, s) : '';

  let content = '';
  if (icon && iconPos === 'right') content = `${label ?? 'Button'}${iconEl}`;
  else if (icon)                   content = `${iconEl}${label ?? 'Button'}`;
  else                             content = label ?? 'Button';

  return `
    ${RAIS_STYLES}
    <button class="${cls}" ${isDisabled ? 'disabled' : ''}>
      ${content}
    </button>
  `;
}

const meta: Meta = {
  title: 'RAIS/Actions/Button',
  tags: ['autodocs'],
  argTypes: {
    label:   { control: 'text', description: 'Button label text' },
    variant: { control: 'select', options: ['primary','secondary','danger','disabled'], description: 'Visual style variant' },
    size:    { control: 'select', options: ['small','normal','large'], description: 'Button size' },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Boxicons SVG from public/assets/boxicons/ — Angular: <img src="assets/boxicons/[name].svg" />'
    },
    iconPos: { control: 'select', options: ['left','right'], description: 'Icon position' },
  },
  render: (args) => renderBtn(args),
};

export default meta;
type Story = StoryObj;

export const Primary: Story    = { args: { label: 'Submit',      variant: 'primary',   size: 'normal', icon: '',            iconPos: 'left' } };
export const Secondary: Story  = { args: { label: 'Cancel',      variant: 'secondary', size: 'normal', icon: '',            iconPos: 'left' } };
export const Danger: Story     = { args: { label: 'Delete',      variant: 'danger',    size: 'normal', icon: '',            iconPos: 'left' } };
export const Disabled: Story   = { args: { label: 'Unavailable', variant: 'disabled',  size: 'normal', icon: '',            iconPos: 'left' } };
export const Small: Story      = { args: { label: 'Small',       variant: 'primary',   size: 'small',  icon: '',            iconPos: 'left' } };
export const Large: Story      = { args: { label: 'Large',       variant: 'primary',   size: 'large',  icon: '',            iconPos: 'left' } };
export const WithIconLeft: Story  = { args: { label: 'Download', variant: 'primary',   size: 'normal', icon: 'bx-download', iconPos: 'left'  } };
export const WithIconRight: Story = { args: { label: 'Next',     variant: 'primary',   size: 'normal', icon: 'bx-right-arrow-alt', iconPos: 'right' } };

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;padding:24px;background:#F0F2F5;border-radius:8px;">
      ${renderBtn({ label: 'Primary',   variant: 'primary',   size: 'normal' })}
      ${renderBtn({ label: 'Secondary', variant: 'secondary', size: 'normal' })}
      ${renderBtn({ label: 'Danger',    variant: 'danger',    size: 'normal' })}
      ${renderBtn({ label: 'Disabled',  variant: 'disabled',  size: 'normal' })}
      ${renderBtn({ label: 'Small',     variant: 'primary',   size: 'small'  })}
      ${renderBtn({ label: 'Large',     variant: 'primary',   size: 'large'  })}
      ${renderBtn({ label: 'Download',  variant: 'primary',   size: 'normal', icon: 'bx-download',       iconPos: 'left'  })}
      ${renderBtn({ label: 'Next',      variant: 'primary',   size: 'normal', icon: 'bx-right-arrow-alt', iconPos: 'right' })}
    </div>
  `,
};

import type { Meta, StoryObj } from '@storybook/html';

/**
 * Link — RAIS Actions component
 * Icons: public/assets/boxicons/
 *   Default: bxs-plus-circle.svg (matches Figma)
 *   Common alternatives: bx-external-link.svg, bx-right-arrow-alt.svg, bx-link-external.svg
 * Angular: <img src="assets/boxicons/bxs-plus-circle.svg" width="16" height="16" />
 *
 * Icon color is inherited via CSS filter — color shifts per variant/state.
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&display=swap');
    :root {
      --link-blue-default:  #007CBD;
      --link-blue-hover:    #178FCF;
      --link-black-default: #101928;
      --link-black-hover:   #8D9091;
      --link-gray-default:  #8D9091;
      --link-gray-hover:    #4D586A;
      --font-family: 'Figtree', sans-serif;
    }

    .rais-link { display:inline-flex; align-items:center; text-decoration:none; cursor:pointer; font-family:var(--font-family); }

    .rais-link--large  { gap:6px; font-size:16px; font-weight:700; }
    .rais-link--medium { gap:4px; font-size:14px; font-weight:700; }
    .rais-link--small  { gap:4px; font-size:13px; font-weight:600; }

    .rais-link--blue  { color:var(--link-blue-default); }
    .rais-link--black { color:var(--link-black-default); }
    .rais-link--gray  { color:var(--link-gray-default); }

    .rais-link--blue.rais-link--hover  { color:var(--link-blue-hover); }
    .rais-link--black.rais-link--hover { color:var(--link-black-hover); }
    .rais-link--gray.rais-link--hover  { color:var(--link-gray-hover); }

    .rais-link__icon { display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .rais-link--large  .rais-link__icon img { width:16px; height:16px; }
    .rais-link--medium .rais-link__icon img { width:14px; height:14px; }
    .rais-link--small  .rais-link__icon img { width:13px; height:13px; }

    /* Icon color filters per color+state */
    .rais-link--blue  .rais-link__icon img { filter: invert(35%) sepia(87%) saturate(500%) hue-rotate(170deg); }
    .rais-link--blue.rais-link--hover .rais-link__icon img { filter: invert(52%) sepia(60%) saturate(400%) hue-rotate(170deg); }
    .rais-link--black .rais-link__icon img { filter: brightness(0) saturate(100%) invert(8%) sepia(18%) saturate(1200%) hue-rotate(180deg); }
    .rais-link--black.rais-link--hover .rais-link__icon img { filter: invert(60%) sepia(5%) saturate(200%) hue-rotate(169deg); }
    .rais-link--gray  .rais-link__icon img { filter: invert(60%) sepia(5%) saturate(200%) hue-rotate(169deg); }
    .rais-link--gray.rais-link--hover .rais-link__icon img { filter: invert(30%) sepia(10%) saturate(800%) hue-rotate(180deg); }
  </style>
`;

const ICON_OPTIONS = [
  'bxs-plus-circle',
  'bx-external-link',
  'bx-right-arrow-alt',
  'bx-left-arrow-alt',
  'bx-link-external',
  'bx-download',
  'bx-upload',
  'bx-edit',
  'bx-check',
  'bx-info-circle',
  'bxs-check-circle',
  'bxs-info-circle',
];

function renderLink({ label, size, color, state, iconLeft, iconRight, href, icon }: any) {
  const s        = size  ?? 'medium';
  const c        = color ?? 'blue';
  const st       = state ?? 'default';
  const lbl      = label ?? 'Label';
  const iconFile = icon  ?? 'bxs-plus-circle';

  const cls = ['rais-link', `rais-link--${s}`, `rais-link--${c}`,
    st === 'hover' ? 'rais-link--hover' : '',
  ].filter(Boolean).join(' ');

  const iconEl = `<span class="rais-link__icon"><img src="assets/boxicons/${iconFile}.svg" alt="${iconFile}" /></span>`;

  return `
    ${RAIS_STYLES}
    <a class="${cls}" href="${href ?? '#'}" ${st === 'hover' ? 'style="pointer-events:none;"' : ''}>
      ${iconLeft  !== false ? iconEl : ''}
      <span>${lbl}</span>
      ${iconRight !== false ? iconEl : ''}
    </a>
  `;
}

const meta: Meta = {
  title: 'RAIS/Buttons/Link',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    href:  { control: 'text' },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Boxicons SVG from public/assets/boxicons/ — Angular: <img src="assets/boxicons/[name].svg" />'
    },
    size:  { control: 'select', options: ['large','medium','small'] },
    color: { control: 'select', options: ['blue','black','gray'] },
    state: { control: 'select', options: ['default','hover'] },
    iconLeft:  { control: 'boolean' },
    iconRight: { control: 'boolean' },
  },
  render: (args) => renderLink(args),
};

export default meta;
type Story = StoryObj;

export const BlueDefault: Story  = { args: { label: 'Label', size: 'medium', color: 'blue',  state: 'default', iconLeft: true, iconRight: true } };
export const BlueHover: Story    = { args: { label: 'Label', size: 'medium', color: 'blue',  state: 'hover',   iconLeft: true, iconRight: true } };
export const BlackDefault: Story = { args: { label: 'Label', size: 'medium', color: 'black', state: 'default', iconLeft: true, iconRight: true } };
export const BlackHover: Story   = { args: { label: 'Label', size: 'medium', color: 'black', state: 'hover',   iconLeft: true, iconRight: true } };
export const GrayDefault: Story  = { args: { label: 'Label', size: 'medium', color: 'gray',  state: 'default', iconLeft: true, iconRight: true } };
export const GrayHover: Story    = { args: { label: 'Label', size: 'medium', color: 'gray',  state: 'hover',   iconLeft: true, iconRight: true } };
export const Large: Story        = { args: { label: 'Label', size: 'large',  color: 'blue',  state: 'default', iconLeft: true, iconRight: true } };
export const Small: Story        = { args: { label: 'Label', size: 'small',  color: 'blue',  state: 'default', iconLeft: true, iconRight: true } };
export const TextOnly: Story     = { args: { label: 'Label', size: 'medium', color: 'blue',  state: 'default', iconLeft: false, iconRight: false } };
export const ExternalLink: Story = { args: { label: 'Open in new tab', size: 'medium', color: 'blue', state: 'default', icon: 'bx-external-link', iconLeft: false, iconRight: true } };

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-size:11px;color:#8D9091;">BLUE</span>
        <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
          ${renderLink({ label: 'Default', size: 'medium', color: 'blue', state: 'default', iconLeft: true, iconRight: true })}
          ${renderLink({ label: 'Hover',   size: 'medium', color: 'blue', state: 'hover',   iconLeft: true, iconRight: true })}
          ${renderLink({ label: 'Large',   size: 'large',  color: 'blue', state: 'default', iconLeft: true, iconRight: true })}
          ${renderLink({ label: 'Small',   size: 'small',  color: 'blue', state: 'default', iconLeft: true, iconRight: true })}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-size:11px;color:#8D9091;">BLACK</span>
        <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
          ${renderLink({ label: 'Default', size: 'medium', color: 'black', state: 'default', iconLeft: true, iconRight: true })}
          ${renderLink({ label: 'Hover',   size: 'medium', color: 'black', state: 'hover',   iconLeft: true, iconRight: true })}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-size:11px;color:#8D9091;">GRAY</span>
        <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
          ${renderLink({ label: 'Default', size: 'medium', color: 'gray', state: 'default', iconLeft: true, iconRight: true })}
          ${renderLink({ label: 'Hover',   size: 'medium', color: 'gray', state: 'hover',   iconLeft: true, iconRight: true })}
        </div>
      </div>
    </div>
  `,
};

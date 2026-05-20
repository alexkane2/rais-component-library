import type { Meta, StoryObj } from '@storybook/html';

/**
 * Main Navigation - External — RAIS Navigation component
 *
 * Two-column navigation:
 *   - Collapsed sidebar (90px wide, dark gray-blue) — always visible, shows logo + 6 section icons
 *   - Expanded panel (224px wide) — only visible when a section is active; lists that section's sub-items
 *
 * Tokens (from Figma variables):
 *   --gray-blue-600     #293B52 → sidebar background, expanded panel left border
 *   --gray-blue-500     #38506D → active item background, expanded panel background
 *   --divider           rgba(99,117,140,0.4) → between sub-items
 *   --neutrals-white    #FFFFFF → all text and icon tints
 *
 * Type styles (from Figma):
 *   Section header (collapsed): Figtree SemiBold 10px / line-height 1.3 / letter-spacing 1px / UPPERCASE
 *   Menu item label (collapsed): Figtree SemiBold 13px / line-height 1.2 / letter-spacing 0.39px / center
 *   Expanded section title: Figtree Bold 12px / line-height 1.4 / letter-spacing 2px / UPPERCASE
 *   Sub-item label: Figtree Medium 14px / line-height 1.2 / letter-spacing 0.28px
 *
 * Icons: Boxicons SVGs from public/assets/boxicons/ — tinted white via CSS filter.
 *   Section icons (20px): bx-bulb, bx-copy, bxs-check-circle, bxs-wrench, bxs-pie-chart-alt-2, bxs-megaphone
 *   Sub-item icons (16px): see ITEMS map below
 *   External-link indicator (14px): bx-link-external
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@500;600;700&display=swap');

    :root {
      --gray-blue-600: #293B52;
      --gray-blue-500: #38506D;
      --divider:       rgba(99, 117, 140, 0.4);
      --white:         #FFFFFF;
      --font-family:   'Figtree', sans-serif;
    }

    /* ── Layout container ── */
    .rais-nav {
      display: flex;
      align-items: flex-start;
      height: 1024px;
      font-family: var(--font-family);
      overflow: hidden;
    }

    /* ── Collapsed sidebar (90px) ── */
    .rais-nav__bar {
      width: 90px;
      height: 1024px;
      flex-shrink: 0;
      background: var(--gray-blue-600);
      box-shadow: 0 4px 1.5px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 28px 0 48px;
    }

    .rais-nav__bar-top {
      display: flex;
      flex-direction: column;
      gap: 36px;
      align-items: center;
      width: 100%;
    }

    /* Logo + brand */
    .rais-nav__brand {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .rais-nav__logo {
      width: 44px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-family: var(--font-family);
      font-weight: 700;
      font-size: 28px;
      line-height: 1;
      letter-spacing: -1px;
    }
    .rais-nav__brand-text {
      font-family: var(--font-family);
      font-weight: 600;
      font-size: 10px;
      line-height: 1.3;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--white);
      text-align: center;
      white-space: pre;
    }

    /* Menu items list */
    .rais-nav__items {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      width: 100%;
    }

    .rais-nav__item {
      width: 90px;
      padding: 12px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      background: transparent;
      border: 0;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .rais-nav__item:hover { background: rgba(255, 255, 255, 0.04); }
    .rais-nav__item--active { background: var(--gray-blue-500); }

    .rais-nav__icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .rais-nav__icon img {
      width: 20px;
      height: 20px;
      filter: brightness(0) invert(1);
    }

    .rais-nav__label {
      font-family: var(--font-family);
      font-weight: 600;
      font-size: 13px;
      line-height: 1.2;
      letter-spacing: 0.39px;
      color: var(--white);
      text-align: center;
      white-space: pre-line;
    }

    /* ── Expanded panel (224px) ── */
    .rais-nav__panel {
      width: 224px;
      flex-shrink: 0;
      height: 1024px;
      background: var(--gray-blue-500);
      border-left: 1px solid var(--gray-blue-600);
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 80px;
      box-sizing: border-box;
    }

    .rais-nav__panel-title {
      padding: 0 24px;
      font-family: var(--font-family);
      font-weight: 700;
      font-size: 12px;
      line-height: 1.4;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--white);
    }

    .rais-nav__subitems {
      display: flex;
      flex-direction: column;
      padding: 0 12px;
    }

    .rais-nav__subitem {
      height: 49px;
      padding: 16px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      box-sizing: border-box;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .rais-nav__subitem:hover { background: rgba(255, 255, 255, 0.06); }

    .rais-nav__subicon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .rais-nav__subicon img {
      width: 16px;
      height: 16px;
      filter: brightness(0) invert(1);
    }

    .rais-nav__subitem-text {
      flex: 1;
      font-family: var(--font-family);
      font-weight: 500;
      font-size: 14px;
      line-height: 1.2;
      letter-spacing: 0.28px;
      color: var(--white);
      white-space: nowrap;
    }

    .rais-nav__subitem-ext {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .rais-nav__subitem-ext img {
      width: 14px;
      height: 14px;
      filter: brightness(0) invert(1);
      opacity: 0.85;
    }

    .rais-nav__divider {
      height: 1px;
      background: var(--divider);
    }
  </style>
`;

// ── Section icons for the collapsed sidebar ──
const SECTION_ICONS: Record<string, string> = {
  'Agency Planning':   'bxs-bulb',
  'Revenue Docs':      'bx-copy',
  'Placement':         'bxs-check-circle',
  'Servicing':         'bxs-wrench',
  'Account Insights':  'bxs-pie-chart-alt-2',
  'Digital Marketing': 'bxs-megaphone',
};

const SECTION_ORDER = [
  'Agency Planning',
  'Revenue Docs',
  'Placement',
  'Servicing',
  'Account Insights',
  'Digital Marketing',
];

// ── Sub-items per section, with icon + optional external-link flag ──
type SubItem = { label: string; icon: string; external?: boolean };

const SUB_ITEMS: Record<string, SubItem[]> = {
  'Agency Planning': [
    { label: 'Growth Trends',     icon: 'bxs-pie-chart-alt-2' },
    { label: 'Agency Trends',     icon: 'bx-line-chart' },
    { label: 'Benchmarks',        icon: 'bxs-flag' },
    { label: 'Carrier Insights',  icon: 'bxs-bar-chart-alt-2' },
    { label: 'Carrier Contracts', icon: 'bxs-check-shield' },
    { label: 'Hiring Services',   icon: 'bx-street-view' },
  ],
  'Revenue Docs': [
    { label: 'RevenueTrak', icon: 'bx-dollar', external: true },
  ],
  'Placement': [
    { label: 'Marketplace',      icon: 'bx-search-alt-2' },
    { label: 'Submissions',      icon: 'bxs-folder-open' },
    { label: 'Coverage Compare', icon: 'bxs-bulb' }, // proxy for AI spark
    { label: 'Proposal Builder', icon: 'bxs-bulb' }, // proxy for AI clean text
    { label: 'Supplementals',    icon: 'bxs-file' },
    { label: 'Premium Finance',  icon: 'bx-money' },
  ],
  'Servicing': [
    { label: 'Master Code Policies', icon: 'bxs-group' },
    { label: 'Unbilled Premium',     icon: 'bx-dollar-circle',  external: true },
    { label: 'Insured Payments',     icon: 'bxs-dollar-circle' },
    { label: 'Make Payments',        icon: 'bxs-paper-plane',   external: true },
  ],
  'Account Insights': [
    { label: 'Renewals',          icon: 'bx-refresh' },
    { label: 'Renewal Optimizer', icon: 'bx-refresh' },
    { label: 'Production',        icon: 'bxs-bar-chart-square' },
    { label: 'Cross-Sell',        icon: 'bx-target-lock' },
    { label: 'Industry Insights', icon: 'bxs-business' },
  ],
  'Digital Marketing': [
    { label: 'Email Marketing', icon: 'bxs-envelope',         external: true },
    { label: 'Email Analytics', icon: 'bxs-bar-chart-alt-2' },
  ],
};

function iconImg(name: string, size: number) {
  return `<img src="assets/boxicons/${name}.svg" width="${size}" height="${size}" alt="${name}" />`;
}

function renderSidebar(activeSection?: string) {
  const items = SECTION_ORDER.map(section => {
    const isActive = section === activeSection;
    const iconName = SECTION_ICONS[section];
    // Two-line label for "Revenue Docs" matches Figma's stacked break
    const label = section === 'Revenue Docs' ? 'Revenue\nDocs' : section;
    return `
      <button class="rais-nav__item${isActive ? ' rais-nav__item--active' : ''}">
        <span class="rais-nav__icon">${iconImg(iconName, 20)}</span>
        <span class="rais-nav__label">${label}</span>
      </button>
    `;
  }).join('');

  return `
    <div class="rais-nav__bar">
      <div class="rais-nav__bar-top">
        <div class="rais-nav__brand">
          <div class="rais-nav__logo">R</div>
          <div class="rais-nav__brand-text">Member\nCentral</div>
        </div>
        <div class="rais-nav__items">${items}</div>
      </div>
      <div></div>
    </div>
  `;
}

function renderPanel(section: string) {
  const items = SUB_ITEMS[section] || [];
  const rows = items.map((item, i) => {
    const externalIcon = item.external
      ? `<span class="rais-nav__subitem-ext">${iconImg('bx-link-external', 14)}</span>`
      : '';
    const divider = i < items.length - 1 ? `<div class="rais-nav__divider"></div>` : '';
    return `
      <div class="rais-nav__subitem">
        <span class="rais-nav__subicon">${iconImg(item.icon, 16)}</span>
        <span class="rais-nav__subitem-text">${item.label}</span>
        ${externalIcon}
      </div>
      ${divider}
    `;
  }).join('');

  return `
    <div class="rais-nav__panel">
      <div class="rais-nav__panel-title">${section}</div>
      <div class="rais-nav__subitems">${rows}</div>
    </div>
  `;
}

function renderMainNav({ activeSection }: { activeSection?: string }) {
  const sidebar = renderSidebar(activeSection);
  const panel = activeSection ? renderPanel(activeSection) : '';
  return `${RAIS_STYLES}<div class="rais-nav">${sidebar}${panel}</div>`;
}

const meta: Meta = {
  title: 'RAIS/Navigation/Main Navigation - External',
  tags: ['autodocs'],
  argTypes: {
    activeSection: {
      control: 'select',
      options: ['', ...SECTION_ORDER],
      description: 'Which section is currently active (expanded). Leave blank for the default collapsed nav.',
    },
  },
  render: (args) => renderMainNav(args),
};

export default meta;
type Story = StoryObj;

export const SideNavDefault: Story = {
  name: 'Side Nav Default - External',
  args: { activeSection: '' },
};

export const AgencyPlanning: Story = {
  args: { activeSection: 'Agency Planning' },
};

export const RevenueDocs: Story = {
  args: { activeSection: 'Revenue Docs' },
};

export const Placement: Story = {
  args: { activeSection: 'Placement' },
};

export const Servicing: Story = {
  args: { activeSection: 'Servicing' },
};

export const AccountInsights: Story = {
  args: { activeSection: 'Account Insights' },
};

export const DigitalMarketing: Story = {
  args: { activeSection: 'Digital Marketing' },
};

export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;">
      ${['', ...SECTION_ORDER].map(section => `
        <div>
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">
            ${section || 'Default (collapsed)'}
          </div>
          <div style="border:1px solid #DDE1E6;border-radius:8px;overflow:hidden;width:fit-content;">
            ${renderMainNav({ activeSection: section || undefined })}
          </div>
        </div>
      `).join('')}
    </div>
  `,
};

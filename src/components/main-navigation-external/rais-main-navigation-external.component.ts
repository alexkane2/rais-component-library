import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
 *   --system-blue-300   #98D4F9 → section icon tint
 *   --divider           rgba(99,117,140,0.4) → between sub-items
 *   --neutrals-white    #FFFFFF → text and sub-item icon tints
 *
 * Type styles (from Figma):
 *   Menu item label (collapsed): Figtree SemiBold 13px / line-height 1.2 / letter-spacing 0.39px / center
 *   Expanded section title: Figtree Bold 12px / line-height 1.4 / letter-spacing 2px / UPPERCASE
 *   Sub-item label: Figtree Medium 14px / line-height 1.2 / letter-spacing 0.28px
 *
 * Logo: public/assets/r-member-central-logo.svg (90×74, includes "R" + "MEMBER CENTRAL")
 *
 * Icons: Boxicons SVGs from public/assets/boxicons/ — tinted via CSS mask-image for exact color.
 *   Section icons (20px, blue): bx-bulb, bx-copy, bx-check-circle, bx-wrench, bx-pie-chart-alt-2, bxs-megaphone
 *   Sub-item icons (16px, white): see SECTIONS map
 *   External-link indicator (14px, white): bx-link-external
 *
 * Usage in an Angular template:
 *   <rais-main-navigation-external></rais-main-navigation-external>
 *   <rais-main-navigation-external activeSection="agency-planning"></rais-main-navigation-external>
 */

export interface SubItem {
  label: string;
  icon: string;
  external?: boolean;
}

export interface NavSection {
  key: string;
  label: string;
  /** Multi-line label for the collapsed bar (uses \n for line breaks). Falls back to label. */
  barLabel?: string;
  icon: string;
  subItems: SubItem[];
}

@Component({
  selector: 'rais-main-navigation-external',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-main-navigation-external.component.html',
  styleUrls: ['./rais-main-navigation-external.component.scss'],
})
export class RaisMainNavigationExternalComponent {
  /**
   * Which section is currently active (expanded). `null` = no panel expanded.
   * Use the section `key` (e.g. 'agency-planning', 'revenue-docs').
   */
  @Input() activeSection: string | null = null;

  readonly SECTIONS: NavSection[] = [
    {
      key: 'agency-planning',
      label: 'Agency Planning',
      icon: 'bx-bulb',
      subItems: [
        { label: 'Growth Trends',     icon: 'bxs-pie-chart-alt-2' },
        { label: 'Agency Trends',     icon: 'bx-line-chart' },
        { label: 'Benchmarks',        icon: 'bxs-flag' },
        { label: 'Carrier Insights',  icon: 'bxs-bar-chart-alt-2' },
        { label: 'Carrier Contracts', icon: 'bxs-check-shield' },
        { label: 'Hiring Services',   icon: 'bx-street-view' },
      ],
    },
    {
      key: 'revenue-docs',
      label: 'Revenue Docs',
      barLabel: 'Revenue\nDocs',
      icon: 'bx-copy',
      subItems: [
        { label: 'RevenueTrak', icon: 'bx-dollar', external: true },
      ],
    },
    {
      key: 'placement',
      label: 'Placement',
      icon: 'bx-check-circle',
      subItems: [
        { label: 'Marketplace',      icon: 'bx-search-alt-2' },
        { label: 'Submissions',      icon: 'bxs-folder-open' },
        { label: 'Coverage Compare', icon: 'bxs-bulb' },
        { label: 'Proposal Builder', icon: 'bxs-bulb' },
        { label: 'Supplementals',    icon: 'bxs-file' },
        { label: 'Premium Finance',  icon: 'bx-money' },
      ],
    },
    {
      key: 'servicing',
      label: 'Servicing',
      icon: 'bx-wrench',
      subItems: [
        { label: 'Master Code Policies', icon: 'bxs-group' },
        { label: 'Unbilled Premium',     icon: 'bx-dollar-circle',  external: true },
        { label: 'Insured Payments',     icon: 'bxs-dollar-circle' },
        { label: 'Make Payments',        icon: 'bxs-paper-plane',   external: true },
      ],
    },
    {
      key: 'account-insights',
      label: 'Account Insights',
      icon: 'bx-pie-chart-alt-2',
      subItems: [
        { label: 'Renewals',          icon: 'bx-refresh' },
        { label: 'Renewal Optimizer', icon: 'bx-refresh' },
        { label: 'Production',        icon: 'bxs-bar-chart-square' },
        { label: 'Cross-Sell',        icon: 'bx-target-lock' },
        { label: 'Industry Insights', icon: 'bxs-business' },
      ],
    },
    {
      key: 'digital-marketing',
      label: 'Digital Marketing',
      icon: 'bxs-megaphone',
      subItems: [
        { label: 'Email Marketing', icon: 'bxs-envelope',         external: true },
        { label: 'Email Analytics', icon: 'bxs-bar-chart-alt-2' },
      ],
    },
  ];

  /** Build the CSS custom property string used by the mask-image rule. */
  iconMaskStyle(iconName: string): string {
    return `--icon: url('assets/boxicons/${iconName}.svg')`;
  }

  /** The currently-active section object, or null when no section is expanded. */
  get activeSectionObj(): NavSection | null {
    if (!this.activeSection) return null;
    return this.SECTIONS.find(s => s.key === this.activeSection) ?? null;
  }

  /** trackBy for *ngFor over sections. */
  trackByKey(_index: number, section: NavSection): string {
    return section.key;
  }

  /** trackBy for *ngFor over sub-items. */
  trackBySubLabel(_index: number, item: SubItem): string {
    return item.label;
  }
}

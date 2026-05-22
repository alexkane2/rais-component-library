import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Member Central Header — RAIS Header and Footer component
 *
 * Top-of-page header bar with three rows:
 *  1. Header Bar      — Agency display + notifications + user
 *  2. Subheader       — Page title + optional description
 *  3. Tabs            — Optional tab strip
 *
 * Mirrors the Figma component at file cCX0CnHdQeFNhZBkP12aWS, node 3452:7563.
 *
 * Three properties drive the visual variants:
 *  - agencyDisplay      → 'read-only' (static agency name) | 'searchable' (typeahead field)
 *  - showPageDescription → toggles the description line (height adjusts)
 *  - showTabs           → toggles the tab row (height adjusts)
 *
 * Usage:
 *   <rais-member-central-header
 *     agencyDisplay="searchable"
 *     [showPageDescription]="false"
 *     [showTabs]="false"
 *   ></rais-member-central-header>
 */
export type AgencyDisplayMode = 'read-only' | 'searchable';

@Component({
  selector: 'rais-member-central-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-member-central-header.component.html',
  styleUrls: ['./rais-member-central-header.component.scss'],
})
export class RaisMemberCentralHeaderComponent {
  /** Agency display variant. */
  @Input() agencyDisplay: AgencyDisplayMode = 'read-only';

  /** Static agency name (read-only variant). */
  @Input() agencyName: string = 'My Insurance Agency';
  /** Placeholder for the searchable agency typeahead. */
  @Input() searchPlaceholder: string = 'Type name...';

  /** User name shown on the right of the header bar. */
  @Input() userName: string = 'User Name';

  /** Page title in the subheader. */
  @Input() pageTitle: string = 'Page Title';
  /** Page description in the subheader. */
  @Input() pageDescription: string = 'Enter page description here.';

  /** Toggle the description visibility. */
  @Input() showPageDescription: boolean = true;
  /** Toggle the tab row visibility. */
  @Input() showTabs: boolean = true;

  /** Tab labels (max 5 visible in the default layout). */
  @Input() tabs: string[] = ['Tab Label', 'Tab Label', 'Tab Label', 'Tab Label'];
  /** Index of the currently selected tab. */
  @Input() selectedTabIndex: number = 0;
}

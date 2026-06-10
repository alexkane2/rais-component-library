import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PageFilter Dropdown — RAIS Filters component
 *
 * Compact pill-shaped dropdown for page-level filter bars. Supports
 * horizontal (label left) and vertical (label above) placements.
 *
 * Icons: assets/boxicons/bx-caret-down-tight.svg (9x5 — tight bounding box,
 * the triangle fills the canvas; matches the Figma vector at 8.5x4.857)
 */
export type LabelPlacement = 'horizontal' | 'vertical';

@Component({
  selector: 'rais-page-filter-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-page-filter-dropdown.component.html',
  styleUrls: ['./rais-page-filter-dropdown.component.scss'],
})
export class RaisPageFilterDropdownComponent {
  /** Filter label (e.g. "Sort By", "Region", "Status") */
  @Input() label: string = 'Sort By';
  /** Selected value — leave empty to show placeholder */
  @Input() value: string = '';
  /** Placeholder text when no value selected */
  @Input() placeholder: string = 'Nocerino Family';
  /** horizontal = label left of input | vertical = label above input */
  @Input() labelPlacement: LabelPlacement = 'horizontal';
  /** Input width in pixels */
  @Input() width: number = 152;

  get hasValue(): boolean { return !!this.value; }
}

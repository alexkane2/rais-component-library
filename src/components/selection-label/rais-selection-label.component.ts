import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Selection Label — RAIS Inputs component
 *
 * Two shapes:
 *   Squared — 4px radius (used in multiselect dropdowns)
 *   Rounded — 16px radius (used in filter bars)
 *
 * Usage in an Angular template:
 *   <rais-selection-label label="Label" style="squared"></rais-selection-label>
 *   <rais-selection-label label="Label" style="rounded"></rais-selection-label>
 */
export type SelectionLabelStyle = 'squared' | 'rounded';

@Component({
  selector: 'rais-selection-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-selection-label.component.html',
  styleUrls: ['./rais-selection-label.component.scss'],
})
export class RaisSelectionLabelComponent {
  /** Chip label text. */
  @Input() label: string = 'Label';
  /** Shape — squared=4px radius (dropdowns), rounded=16px radius (filter bars). */
  @Input() style: SelectionLabelStyle = 'squared';
}

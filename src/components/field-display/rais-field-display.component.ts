import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Field Display — RAIS Content component
 *
 * Read-only label + value pair (description-list pattern). Used to present
 * stored data in detail panels and summary/review screens.
 *
 * Two orientations:
 *   Stacked — label above value (for dense forms / summary grids)
 *   Inline  — label left / value right (for detail panels)
 *
 * The value wraps for long content (addresses, names). For an empty state,
 * pass an em dash: value="—".
 *
 * Usage in an Angular template:
 *   <rais-field-display label="Expected by" value="11/15/2024"></rais-field-display>
 *   <rais-field-display label="Expected by" value="11/15/2024" orientation="inline"></rais-field-display>
 */
export type FieldDisplayOrientation = 'stacked' | 'inline';

@Component({
  selector: 'rais-field-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-field-display.component.html',
  styleUrls: ['./rais-field-display.component.scss'],
})
export class RaisFieldDisplayComponent {
  /** Field label (the descriptor). */
  @Input() label: string = 'Expected by';
  /** Field value (the data). Pass an em dash "—" for empty states. */
  @Input() value: string = '11/15/2024';
  /** Layout — stacked=label above value (forms) | inline=label left / value right (detail panels). */
  @Input() orientation: FieldDisplayOrientation = 'stacked';
}

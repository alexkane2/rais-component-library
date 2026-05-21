import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Applied Filter Chip — RAIS Filters component
 *
 * Compact pill that surfaces an applied filter with category + value,
 * an optional filter icon, and an optional dismiss X.
 *
 * Usage in an Angular template:
 *   <rais-applied-filter-chip
 *     category="Policy Producer:"
 *     value="Spencer, Dana"
 *     [showIcon]="false"
 *     [dismissible]="true">
 *   </rais-applied-filter-chip>
 */
@Component({
  selector: 'rais-applied-filter-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-applied-filter-chip.component.html',
  styleUrls: ['./rais-applied-filter-chip.component.scss'],
})
export class RaisAppliedFilterChipComponent {
  /** Category label — bold text before the value. */
  @Input() category: string = 'Category:';
  /** Filter value text. */
  @Input() value: string = 'Filter';
  /** Show the bxs-filter-alt icon on the left. */
  @Input() showIcon: boolean = false;
  /** Show the bx-x dismiss icon on the right. False = "must have" filter. */
  @Input() dismissible: boolean = true;
}

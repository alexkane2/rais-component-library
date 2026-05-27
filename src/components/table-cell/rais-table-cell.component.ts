import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Table Cell — RAIS Tables component
 *
 * The atomic unit of a RAIS data table. A single rectangular cell that
 * renders one of four content modes:
 *
 *   default               — plain text content
 *   input-field-selector  — inline dropdown selector
 *   skeleton-loader       — animated gray loading bar
 *   checkbox              — centered 14×14 checkbox
 *
 * Usage:
 *   <rais-table-cell variant="default" content="Jane Doe"></rais-table-cell>
 *   <rais-table-cell variant="checkbox" [checked]="true"></rais-table-cell>
 *   <rais-table-cell variant="skeleton-loader"></rais-table-cell>
 *   <rais-table-cell variant="input-field-selector"></rais-table-cell>
 */
export type TableCellVariant =
  | 'default'
  | 'input-field-selector'
  | 'skeleton-loader'
  | 'checkbox';

@Component({
  selector: 'rais-table-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-table-cell.component.html',
  styleUrls: ['./rais-table-cell.component.scss'],
})
export class RaisTableCellComponent {
  /** Content/layout variant of the cell. */
  @Input() variant: TableCellVariant = 'default';
  /** Text rendered in the `default` variant. */
  @Input() content: string = 'Content';
  /** Checked state for the `checkbox` variant. */
  @Input() checked: boolean = false;
}

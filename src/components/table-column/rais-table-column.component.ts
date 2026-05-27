import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaisTableHeaderComponent, TableHeaderVariant } from '../table-header/rais-table-header.component';
import { RaisTableCellComponent, TableCellVariant } from '../table-cell/rais-table-cell.component';

/**
 * Table Column — RAIS Tables component
 *
 * A vertical stack of a single header on top of N table cells, used as the
 * building block for the full Table component. Renders one of three modes:
 *
 *   default               — text header (sortable) + default text cells
 *   checkboxes            — checkbox header + checkbox cells
 *   input-field-selectors — text header + inline-dropdown cells
 *
 * Usage:
 *   <rais-table-column variant="default" columnName="Date" [cellCount]="20"></rais-table-column>
 *   <rais-table-column variant="checkboxes" [cellCount]="10"></rais-table-column>
 *   <rais-table-column variant="default" columnName="Name" [cellValues]="names"></rais-table-column>
 */
export type TableColumnVariant = 'default' | 'checkboxes' | 'input-field-selectors';

@Component({
  selector: 'rais-table-column',
  standalone: true,
  imports: [CommonModule, RaisTableHeaderComponent, RaisTableCellComponent],
  templateUrl: './rais-table-column.component.html',
  styleUrls: ['./rais-table-column.component.scss'],
})
export class RaisTableColumnComponent implements OnChanges {
  /** Column variant — drives the header + cell variants. */
  @Input() variant: TableColumnVariant = 'default';
  /** Label for the header (default + input-field-selectors variants). */
  @Input() columnName: string = 'Column Name';
  /** How many cells to render when `cellValues` is not provided. */
  @Input() cellCount: number = 20;
  /** Optional explicit cell values — when provided, drives count too. */
  @Input() cellValues: string[] = [];
  /** Column width (CSS value). */
  @Input() width: string = 'auto';

  /** Resolved list of cell text values used by the template. */
  cells: string[] = [];

  ngOnChanges(_: SimpleChanges): void {
    this.cells =
      this.cellValues && this.cellValues.length > 0
        ? this.cellValues
        : Array.from({ length: Math.max(0, this.cellCount) }, () => 'Content');
  }

  // ─── Derived child variants ─────────────────────────────────────
  get headerVariant(): TableHeaderVariant {
    if (this.variant === 'checkboxes') return 'checkbox';
    return 'default';
  }

  get cellVariant(): TableCellVariant {
    if (this.variant === 'checkboxes') return 'checkbox';
    if (this.variant === 'input-field-selectors') return 'input-field-selector';
    return 'default';
  }
}

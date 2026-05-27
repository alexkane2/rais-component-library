import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaisTableColumnComponent } from '../table-column/rais-table-column.component';
import { RaisTableHeaderComponent } from '../table-header/rais-table-header.component';
import { RaisTableCellComponent } from '../table-cell/rais-table-cell.component';
import { RaisDatatableFooterComponent } from '../datatable-footer/rais-datatable-footer.component';

/**
 * Table — RAIS Tables component
 *
 * The top-level data table surface. Renders a header row + N data rows by
 * stacking RaisTableColumn instances side-by-side. Variants:
 *
 *   default            — N standard columns
 *   loading            — N skeleton-loader columns (renders headers + cells
 *                        directly because the Column variants don't include
 *                        a skeleton mode)
 *   pagination-footer  — N standard columns + a footer row with
 *                        "Page X of Y" and prev/next arrow controls
 *
 * Usage:
 *   <rais-table variant="default" [columnCount]="10" [rowCount]="20"></rais-table>
 *   <rais-table variant="loading" [columnCount]="5" [rowCount]="8"></rais-table>
 *   <rais-table variant="pagination-footer" [currentPage]="2" [totalPages]="10"></rais-table>
 */
export type TableVariant = 'default' | 'loading' | 'pagination-footer';

@Component({
  selector: 'rais-table',
  standalone: true,
  imports: [
    CommonModule,
    RaisTableColumnComponent,
    RaisTableHeaderComponent,
    RaisTableCellComponent,
    RaisDatatableFooterComponent,
  ],
  templateUrl: './rais-table.component.html',
  styleUrls: ['./rais-table.component.scss'],
})
export class RaisTableComponent implements OnChanges {
  @Input() variant: TableVariant = 'default';
  @Input() columnCount: number = 10;
  @Input() rowCount: number = 20;
  /** Optional explicit column header labels. */
  @Input() columnNames: string[] = [];
  /** Current page index, used by `pagination-footer` variant. */
  @Input() currentPage: number = 1;
  /** Total page count, used by `pagination-footer` variant. */
  @Input() totalPages: number = 10;
  /** Page size (rows-per-page) shown in the footer dropdown. */
  @Input() pageSize: number = 10;

  /** Resolved column header labels used by the template. */
  columns: string[] = [];
  /** Resolved row range used by the template (loading variant). */
  rows: number[] = [];

  ngOnChanges(_: SimpleChanges): void {
    const count =
      this.columnNames && this.columnNames.length > 0
        ? this.columnNames.length
        : Math.max(0, this.columnCount);

    this.columns = Array.from({ length: count }, (_, i) =>
      this.columnNames && this.columnNames[i] !== undefined
        ? this.columnNames[i]
        : 'Column Name',
    );

    this.rows = Array.from({ length: Math.max(0, this.rowCount) }, (_, i) => i);
  }
}

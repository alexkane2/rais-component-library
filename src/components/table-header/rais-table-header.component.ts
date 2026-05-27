import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Table Header — RAIS Tables component
 *
 * The column-header cell of a RAIS data table. Renders one of three modes:
 *
 *   default          — column-name text + optional sort icon (white on slate)
 *   skeleton-loader  — gray gradient bar
 *   checkbox         — centered 14×14 checkbox (master/select-all)
 *
 * Usage:
 *   <rais-table-header variant="default" columnName="Date"></rais-table-header>
 *   <rais-table-header variant="skeleton-loader"></rais-table-header>
 *   <rais-table-header variant="checkbox"></rais-table-header>
 */
export type TableHeaderVariant = 'default' | 'skeleton-loader' | 'checkbox';

@Component({
  selector: 'rais-table-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-table-header.component.html',
  styleUrls: ['./rais-table-header.component.scss'],
})
export class RaisTableHeaderComponent {
  /** Header content variant. */
  @Input() variant: TableHeaderVariant = 'default';
  /** Label displayed in the `default` variant. */
  @Input() columnName: string = 'Column Name';
  /** Whether the `default` variant shows a sort icon. */
  @Input() sortable: boolean = true;
  /** Checked state for the `checkbox` variant. */
  @Input() checked: boolean = false;
}

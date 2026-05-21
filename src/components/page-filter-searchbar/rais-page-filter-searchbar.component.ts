import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * PageFilter Searchbar — RAIS Filters component
 *
 * Compact pill-shaped (radius 16) search input used in page-level filter bars.
 * 343x28 default, padding T4 R12 B4 L12.
 * Uses boxicon: assets/boxicons/bx-search-alt-2.svg
 */
@Component({
  selector: 'rais-page-filter-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rais-page-filter-searchbar.component.html',
  styleUrls: ['./rais-page-filter-searchbar.component.scss'],
})
export class RaisPageFilterSearchbarComponent {
  /** Placeholder shown when empty */
  @Input() placeholder: string = 'Search...';
  /** Current value */
  @Input() value: string = '';
  /** Width in pixels (default 343) */
  @Input() width: number = 343;
}

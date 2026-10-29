import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Datatable Footer — RAIS Tables component
 *
 * Pagination footer for data tables. Mirrors the Figma component at file
 * cCX0CnHdQeFNhZBkP12aWS, node 3488:3500.
 *
 * Layout (top → bottom):
 *  1. Scrollbar indicator (8px tall, gray rounded bar — visual only)
 *  2. Paginator row:
 *       « ‹ [1] 2 3 4 5 › »   [25 ▾]
 *     - Double-arrow nav: jump to first/last page
 *     - Single-arrow nav: prev/next page
 *     - 5 page-number buttons (current page has gray fill)
 *     - Right-side page-size dropdown (10 / 25 / 50 / 100). Clicking it
 *       opens a menu; picking a size emits `pageSizeChange`.
 *
 * Usage:
 *   <rais-datatable-footer
 *     [currentPage]="1"
 *     [totalPages]="10"
 *     [(pageSize)]="rowsPerPage"
 *   ></rais-datatable-footer>
 */
@Component({
  selector: 'rais-datatable-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-datatable-footer.component.html',
  styleUrls: ['./rais-datatable-footer.component.scss'],
})
export class RaisDatatableFooterComponent implements OnChanges {
  /** Index (1-based) of the currently selected page. */
  @Input() currentPage: number = 1;
  /** Total number of pages available. */
  @Input() totalPages: number = 10;
  /** Number of rows-per-page shown in the dropdown selector. */
  @Input() pageSize: number = 25;
  /** Rows-per-page choices listed in the dropdown menu. */
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  /** Show the slim scrollbar-indicator bar at the top. */
  @Input() showScrollbar: boolean = true;
  /** Number of page-number buttons to render (typically 5). */
  @Input() visiblePageCount: number = 5;

  /** Emits the new rows-per-page value when one is picked from the dropdown. */
  @Output() pageSizeChange = new EventEmitter<number>();

  /** Calculated page numbers (1-based) visible in the row. */
  visiblePages: number[] = [];
  /** Whether the page-size menu is open. */
  pageSizeMenuOpen = false;

  @ViewChild('pageSizeTrigger') private pageSizeTrigger?: ElementRef<HTMLButtonElement>;

  constructor(private host: ElementRef<HTMLElement>) {}

  togglePageSizeMenu(): void {
    this.pageSizeMenuOpen = !this.pageSizeMenuOpen;
  }

  selectPageSize(size: number): void {
    this.closePageSizeMenu();
    if (size === this.pageSize) return;
    this.pageSize = size;
    this.pageSizeChange.emit(size);
  }

  /** Close the menu when clicking anywhere outside the component. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.pageSizeMenuOpen && !this.host.nativeElement.contains(event.target as Node)) {
      this.pageSizeMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.pageSizeMenuOpen) this.closePageSizeMenu();
  }

  /** Close the menu and return focus to the trigger, so keyboard users keep their place. */
  private closePageSizeMenu(): void {
    this.pageSizeMenuOpen = false;
    this.pageSizeTrigger?.nativeElement.focus();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.recomputePages();
  }

  ngOnInit(): void {
    this.recomputePages();
  }

  private recomputePages(): void {
    const count = Math.min(this.visiblePageCount, Math.max(1, this.totalPages));
    // Center the window around currentPage when possible
    let start = Math.max(1, this.currentPage - Math.floor(count / 2));
    const end = Math.min(this.totalPages, start + count - 1);
    start = Math.max(1, end - count + 1);
    this.visiblePages = [];
    for (let i = start; i <= end; i++) this.visiblePages.push(i);
  }
}

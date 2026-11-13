import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaisRadioOrCheckboxComponent, RcState } from '../radio-or-checkbox/rais-radio-or-checkbox.component';

/**
 * Dropdown Menu - Multiselect — RAIS Inputs component
 *
 * The checkbox panel under `rais-dropdown-multiselect` (and on its own for
 * filter popovers). Mirrors the Figma `Dropdown Menu - Multiselect` component
 * (file cCX0CnHdQeFNhZBkP12aWS, Inputs page, node 3357:941):
 *
 *   Select All · Clear  /  Search  /  checkbox list (scrolls)  /  Cancel · Apply
 *
 * - Checking rows only changes the pending selection; nothing is committed
 *   until Apply, which emits the checked options (in `options` order). Cancel
 *   (or Escape) drops the pending changes and emits `cancel`.
 * - The applied selection (`value`) is pinned to the top of the list above a
 *   divider (Figma "Dropdown Menu - Multiselect 2"). Rows don't move while you
 *   check and uncheck them; the pinned group is taken from `value` when the
 *   menu is created or `value` changes.
 * - Search filters both groups (case-insensitive, matches anywhere).
 *   Select All checks every row that matches the search; Clear unchecks all.
 * - The list stops at 213px (Figma) and scrolls inside the panel.
 * - Keyboard: Down from the search moves into the list; in the list Up/Down/
 *   Home/End move the active row (focus ring), Space or Enter toggle it.
 *   Escape anywhere in the panel cancels.
 *
 * Styling uses the RAIS design tokens in `src/index.css`; the row checkbox is
 * the real `rais-radio-or-checkbox` (checkbox, x-large = 16px box).
 */
@Component({
  selector: 'rais-dropdown-menu-multiselect',
  standalone: true,
  imports: [CommonModule, RaisRadioOrCheckboxComponent],
  templateUrl: './rais-dropdown-menu-multiselect.component.html',
  styleUrls: ['./rais-dropdown-menu-multiselect.component.scss'],
})
export class RaisDropdownMenuMultiselectComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  private static seq = 0;

  /** Options to choose from, in order */
  @Input() options: string[] = [
    'Agency House Account', 'Johnson, Olivia', 'Nicola, Sarah', 'Wentz, Douglas',
    'Thornberg, Jeffery', 'Tersa, Pamela', 'Slater, Mary', 'Stanley, Kathleen',
  ];
  /** The applied selection: checked when the menu opens, and pinned to the top */
  @Input() value: string[] = [];
  /** Pin the applied selection above a divider at the top of the list */
  @Input() pinSelected: boolean = true;
  /** Search text that filters the list (set it to show a filtered mockup) */
  @Input() query: string = '';
  /** Placeholder of the search field */
  @Input() searchPlaceholder: string = 'Search';
  /** Accessible name of the list */
  @Input() ariaLabel: string = 'Options';
  /** Move focus to the search field when the menu appears (a field opening it sets this) */
  @Input() focusSearch: boolean = false;
  /** `id` of the listbox element, so a combobox can reference it */
  @Input() listboxId?: string;

  /** Emits the checked options (in `options` order) when Apply is pressed */
  @Output() apply = new EventEmitter<string[]>();
  /** Emits when Cancel or Escape drops the pending changes */
  @Output() cancel = new EventEmitter<void>();
  /** Emits the pending (not yet applied) selection whenever a row, Select All or Clear changes it */
  @Output() selectionChange = new EventEmitter<string[]>();
  /** Emits the search text as it is typed */
  @Output() queryChange = new EventEmitter<string>();

  @ViewChild('search') private searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('viewport') private viewport?: ElementRef<HTMLElement>;
  @ViewChild('list') private list?: ElementRef<HTMLElement>;

  readonly uid = ++RaisDropdownMenuMultiselectComponent.seq;

  /** Pending selection — what the checkboxes show. */
  private checked = new Set<string>();
  /** Applied selection snapshot that forms the pinned group. */
  private pinned: string[] = [];

  /** Rows shown above the divider (pinned) and below it, after the search filter. */
  pinnedRows: string[] = [];
  otherRows: string[] = [];
  /** Both groups in display order — keyboard indices refer to this. */
  rows: string[] = [];

  /** Keyboard-active row (index into `rows`), -1 for none. */
  activeIndex = -1;
  /** Row under the pointer, for the checkbox hover look. */
  hovered: string | null = null;

  private pendingScroll = false;
  private initialized = false;

  get resolvedListboxId(): string {
    return this.listboxId || `rais-msmenu-${this.uid}-listbox`;
  }

  get showDivider(): boolean {
    return this.pinnedRows.length > 0 && this.otherRows.length > 0;
  }

  get activeOptionId(): string | null {
    return this.activeIndex >= 0 && this.activeIndex < this.rows.length ? this.optionId(this.activeIndex) : null;
  }

  get checkedCount(): number {
    return this.checked.size;
  }

  ngOnInit(): void {
    this.initialized = true;
    this.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) return; // ngOnInit builds the first state
    if (changes['value'] || changes['options'] || changes['pinSelected']) this.reset();
    else if (changes['query']) this.refresh();
  }

  ngAfterViewInit(): void {
    if (this.focusSearch) this.searchInput?.nativeElement.focus();
  }

  ngAfterViewChecked(): void {
    if (!this.pendingScroll) return;
    this.pendingScroll = false;
    this.scrollActiveIntoView();
  }

  optionId(index: number): string {
    return `${this.resolvedListboxId}-opt-${index}`;
  }

  isChecked(option: string): boolean {
    return this.checked.has(option);
  }

  checkState(option: string, index: number): RcState {
    if (this.checked.has(option)) return 'selected';
    return this.hovered === option || index === this.activeIndex ? 'hover' : 'unselected';
  }

  toggle(option: string): void {
    if (this.checked.has(option)) this.checked.delete(option);
    else this.checked.add(option);
    this.emitSelection();
  }

  toggleAt(index: number): void {
    if (index < 0 || index >= this.rows.length) return;
    this.activeIndex = index;
    this.toggle(this.rows[index]);
  }

  /** Checks every row that matches the search. */
  selectAll(): void {
    for (const row of this.rows) this.checked.add(row);
    this.emitSelection();
  }

  /** Unchecks everything, matching the search or not. */
  clear(): void {
    this.checked.clear();
    this.emitSelection();
  }

  onApply(): void {
    this.apply.emit(this.options.filter((o) => this.checked.has(o)));
  }

  onCancel(): void {
    this.reset();
    this.cancel.emit();
  }

  onQueryInput(text: string): void {
    this.query = text;
    this.queryChange.emit(text);
    this.refresh();
  }

  onPanelKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    this.onCancel();
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowDown' || !this.rows.length) return;
    event.preventDefault();
    this.list?.nativeElement.focus();
    this.setActive(0);
  }

  onListFocus(): void {
    if (this.activeIndex < 0 && this.rows.length) this.setActive(0);
  }

  onListKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown': this.setActive(this.activeIndex + 1); break;
      case 'ArrowUp':
        if (this.activeIndex <= 0) {
          this.searchInput?.nativeElement.focus();
          this.activeIndex = -1;
        } else {
          this.setActive(this.activeIndex - 1);
        }
        break;
      case 'Home': this.setActive(0); break;
      case 'End': this.setActive(this.rows.length - 1); break;
      case ' ':
      case 'Enter':
        this.toggleAt(this.activeIndex);
        break;
      default: return;
    }
    event.preventDefault();
  }

  trackRow(_: number, row: string): string {
    return row;
  }

  /** Back to the applied selection: re-check `value`, re-pin it, re-filter. */
  private reset(): void {
    const options = new Set(this.options);
    const applied = (this.value ?? []).filter((v) => options.has(v));
    this.checked = new Set(applied);
    this.pinned = this.pinSelected ? this.options.filter((o) => this.checked.has(o)) : [];
    this.refresh();
  }

  private refresh(): void {
    const q = this.query.trim().toLowerCase();
    const matches = (o: string) => !q || o.toLowerCase().includes(q);
    const pinned = new Set(this.pinned);
    this.pinnedRows = this.pinned.filter(matches);
    this.otherRows = this.options.filter((o) => !pinned.has(o) && matches(o));
    this.rows = [...this.pinnedRows, ...this.otherRows];
    if (this.activeIndex >= this.rows.length) this.activeIndex = this.rows.length - 1;
  }

  private setActive(index: number): void {
    if (!this.rows.length) return;
    this.activeIndex = Math.min(Math.max(index, 0), this.rows.length - 1);
    this.pendingScroll = true;
  }

  private emitSelection(): void {
    this.selectionChange.emit(this.options.filter((o) => this.checked.has(o)));
  }

  private scrollActiveIntoView(): void {
    const vp = this.viewport?.nativeElement;
    if (!vp || this.activeIndex < 0) return;
    const el = vp.querySelector<HTMLElement>(`[data-rais-option="${this.activeIndex}"]`);
    if (!el) return;
    // Rows have no padding of their own, so keep a little room for the focus ring.
    const margin = 4;
    const top = el.offsetTop - margin;
    const bottom = el.offsetTop + el.offsetHeight + margin;
    if (top < vp.scrollTop) vp.scrollTop = top;
    else if (bottom > vp.scrollTop + vp.clientHeight) vp.scrollTop = bottom - vp.clientHeight;
  }
}

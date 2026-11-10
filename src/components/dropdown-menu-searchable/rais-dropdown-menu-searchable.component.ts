import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Dropdown Menu - Searchable — RAIS Inputs component
 *
 * The results panel under `rais-dropdown-searchable`: two-line options (bold
 * name over a lighter detail line). Mirrors the Figma `Dropdown Menu -
 * Searchable` set (file cCX0CnHdQeFNhZBkP12aWS, Inputs page):
 *
 *   default     the full list on open; long lists stop at `maxVisibleRows`
 *               rows and scroll inside the panel with a real scrollbar
 *   filtered    only the rows matching the typed text; the first match is
 *               keyboard-active so Enter commits it
 *   no-results  empty-state copy ("No matches for …"), the panel stays open
 *   loading     shown while a remote search runs
 *
 * `selectedIndex` is the committed value; `activeIndex` the row reached with
 * the arrow keys (focus ring). Keyboard, when the list itself has focus:
 * Up/Down, Home/End, Enter or Space commit, Escape emits `closed`.
 *
 * Styling uses the RAIS design tokens in `src/index.css` only.
 */
export interface SearchableMenuOption {
  name: string;
  detail?: string;
}

export type SearchableResultsState = 'default' | 'filtered' | 'no-results' | 'loading';

export interface SearchableMenuSelection {
  index: number;
  option: SearchableMenuOption;
}

@Component({
  selector: 'rais-dropdown-menu-searchable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-dropdown-menu-searchable.component.html',
  styleUrls: ['./rais-dropdown-menu-searchable.component.scss'],
})
export class RaisDropdownMenuSearchableComponent implements OnChanges, AfterViewChecked {
  private static seq = 0;

  /** Menu options to render */
  @Input() options: SearchableMenuOption[] = [
    { name: '128 Plumbing Heating Inc', detail: '78 Foundry Street, Wakefield, MA 01880' },
    { name: '3D Plumbing Heating Inc',  detail: '140 Grove St Apt 1, Clinton, MA 01510' },
    { name: '4 H Plumbing Inc',         detail: '' },
    { name: 'A Advantage Plumbing',     detail: '34625 Cedar Avenue, Yucaipa, CA 92399' },
    { name: 'A Plus Plumbing LLC',      detail: '25 Sycamore Avenue, Gustine, CA 92794' },
  ];
  /** Index of the committed (selected) option, -1 for none */
  @Input() selectedIndex: number = -1;
  /** Index of the keyboard-active option (arrow-key focus), -1 for none */
  @Input() activeIndex: number = -1;
  /** Which panel to show */
  @Input() resultsState: SearchableResultsState = 'default';
  /** The typed text, quoted in the no-results copy */
  @Input() query: string = '';
  /** No-results title; `{query}` is replaced with the typed text */
  @Input() noResultsTitle: string = 'No matches for “{query}”';
  /** No-results hint line */
  @Input() noResultsHint: string = 'Check the spelling or try a shorter search.';
  /** Loading title */
  @Input() loadingTitle: string = 'Searching…';
  /** Loading hint line */
  @Input() loadingHint: string = 'Results update as you type.';
  /** Two-line rows visible before the list scrolls */
  @Input() maxVisibleRows: number = 5;
  /** Accessible name of the listbox */
  @Input() ariaLabel: string = 'Results';
  /** Whether the list can take focus itself (false when a combobox drives it) */
  @Input() focusable: boolean = true;
  /** `id` of the listbox element, so a combobox can reference it */
  @Input() listboxId?: string;
  /** Prefix for the option ids (`<prefix>-opt-<index>`), for aria-activedescendant */
  @Input() idPrefix?: string;

  /** Emits the committed index when an option is chosen */
  @Output() selectedIndexChange = new EventEmitter<number>();
  /** Emits the keyboard-active index as the arrow keys move it */
  @Output() activeIndexChange = new EventEmitter<number>();
  /** Emits the chosen option (click, Enter or Space) */
  @Output() optionSelected = new EventEmitter<SearchableMenuSelection>();
  /** Emits when Escape is pressed on the list */
  @Output() closed = new EventEmitter<void>();

  @ViewChild('viewport') private viewport?: ElementRef<HTMLElement>;

  readonly uid = ++RaisDropdownMenuSearchableComponent.seq;

  /** Two-line row height and gap — keep in sync with the SCSS. */
  private static readonly ROW_HEIGHT = 56;
  private static readonly ROW_GAP = 2;

  get maxHeight(): string {
    const rows = Math.max(1, this.maxVisibleRows);
    return `${rows * RaisDropdownMenuSearchableComponent.ROW_HEIGHT + (rows - 1) * RaisDropdownMenuSearchableComponent.ROW_GAP}px`;
  }

  get showList(): boolean {
    return this.resultsState === 'default' || this.resultsState === 'filtered';
  }

  get messageTitle(): string {
    return this.resultsState === 'loading'
      ? this.loadingTitle
      : this.noResultsTitle.replace('{query}', this.query);
  }

  get messageHint(): string {
    return this.resultsState === 'loading' ? this.loadingHint : this.noResultsHint;
  }

  get activeOptionId(): string | null {
    return this.activeIndex >= 0 && this.activeIndex < this.options.length ? this.optionId(this.activeIndex) : null;
  }

  optionId(index: number): string {
    return `${this.idPrefix ?? `rais-menu-search-${this.uid}`}-opt-${index}`;
  }

  private pendingScroll = false;

  ngOnChanges(changes: SimpleChanges): void {
    const active = changes['activeIndex'];
    if ((active && active.currentValue !== active.previousValue) || changes['options']) this.pendingScroll = true;
  }

  ngAfterViewChecked(): void {
    if (!this.pendingScroll) return;
    this.pendingScroll = false;
    this.scrollActiveIntoView();
  }

  select(index: number): void {
    if (index < 0 || index >= this.options.length) return;
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
    this.optionSelected.emit({ index, option: this.options[index] });
  }

  setActive(index: number): void {
    if (!this.options.length) return;
    const next = Math.min(Math.max(index, 0), this.options.length - 1);
    if (next === this.activeIndex) return;
    this.activeIndex = next;
    this.activeIndexChange.emit(next);
    this.scrollActiveIntoView();
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown': this.setActive(this.activeIndex + 1); break;
      case 'ArrowUp': this.setActive(this.activeIndex - 1); break;
      case 'Home': this.setActive(0); break;
      case 'End': this.setActive(this.options.length - 1); break;
      case 'Enter':
      case ' ':
        if (this.activeIndex >= 0) this.select(this.activeIndex);
        break;
      case 'Escape': this.closed.emit(); break;
      default: return;
    }
    event.preventDefault();
  }

  trackOption(index: number): number { return index; }

  private scrollActiveIntoView(): void {
    const vp = this.viewport?.nativeElement;
    if (!vp || this.activeIndex < 0) return;
    const el = vp.querySelector<HTMLElement>(`[data-rais-option="${this.activeIndex}"]`);
    if (!el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top < vp.scrollTop) vp.scrollTop = top;
    else if (bottom > vp.scrollTop + vp.clientHeight) vp.scrollTop = bottom - vp.clientHeight;
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RaisDropdownMenuSearchableComponent,
  SearchableMenuOption,
  SearchableMenuSelection,
  SearchableResultsState,
} from '../dropdown-menu-searchable/rais-dropdown-menu-searchable.component';

/**
 * Dropdown - Searchable — RAIS Inputs component
 *
 * Type-ahead single-select. Mirrors the Figma `Dropdown - Searchable` set
 * (file cCX0CnHdQeFNhZBkP12aWS, Inputs page) and its results panel
 * `Dropdown Menu - Searchable`.
 *
 * Sequence
 *   default    closed, placeholder, caret
 *   open       focus border, caret up, the full results list below
 *              (click, Tab + Down, or the caret)
 *   active     typing filters the list as you type; the X appears
 *   selection  a value is committed; the X clears it back to default
 *   error      error border and message
 *
 * The caret and the X are both buttons: the caret toggles the list, the X
 * clears the typed text or the committed value (`cleared`).
 *
 * Keyboard: Up / Down move the keyboard-active result (focus ring, not
 * committed), Enter commits it, Escape closes the list and keeps the typed
 * text, Tab closes and moves on.
 *
 * Filtering is done here against `options` (name and detail, case-insensitive).
 * Set `loading` while a remote search runs and feed its results into
 * `options`; the panel shows the loading copy until then.
 *
 * `state` only forces the look for static mockups; real interaction drives
 * the field itself. Width is fluid: wrap it to size it (the stories use 491px).
 *
 * Icons (public/assets/boxicons/): bx-caret-down.svg / bx-caret-up.svg and
 * bx-x-large-spacing.svg (the design-system close glyph), as token-colored masks.
 */
export type SearchableState = 'default' | 'open' | 'active' | 'selection' | 'error';

export type SearchableOption = SearchableMenuOption;

@Component({
  selector: 'rais-dropdown-searchable',
  standalone: true,
  imports: [CommonModule, FormsModule, RaisDropdownMenuSearchableComponent],
  templateUrl: './rais-dropdown-searchable.component.html',
  styleUrls: ['./rais-dropdown-searchable.component.scss'],
})
export class RaisDropdownSearchableComponent {
  private static seq = 0;

  /** Field label */
  @Input() label: string = 'Label';
  /** Show "(Optional)" hint */
  @Input() optional: boolean = false;
  /** Show the instructions line */
  @Input() instructions: boolean = true;
  /** The instructions text; long text wraps above the field */
  @Input() instructionsText: string = 'More instructions here.';
  /** Placeholder shown when nothing is typed or selected */
  @Input() placeholder: string = 'Type name...';
  /** Visual state for static mockups */
  @Input() state: SearchableState = 'default';
  /** Error message shown in 'error' state */
  @Input() errorMessage: string = 'Error message.';
  /** The committed selection (its name) */
  @Input() value: string = '';
  /** The typed search text */
  @Input() query: string = '';
  /** Show the loading panel while results are being fetched */
  @Input() loading: boolean = false;
  /** All options; the field filters them against `query` */
  @Input() options: SearchableOption[] = [
    { name: '128 Plumbing Heating Inc', detail: '78 Foundry Street, Wakefield, MA 01880' },
    { name: '3D Plumbing Heating Inc',  detail: '140 Grove St Apt 1, Clinton, MA 01510' },
    { name: '4 H Plumbing Inc',         detail: '' },
    { name: 'A Advantage Plumbing',     detail: '34625 Cedar Avenue, Yucaipa, CA 92399' },
    { name: 'A Plus Plumbing LLC',      detail: '25 Sycamore Avenue, Gustine, CA 92794' },
  ];
  /** Two-line result rows visible before the panel scrolls */
  @Input() maxVisibleRows: number = 5;

  /** Emits the committed selection's name ('' when cleared) */
  @Output() valueChange = new EventEmitter<string>();
  /** Emits the typed text as it changes */
  @Output() queryChange = new EventEmitter<string>();
  /** Emits the committed option */
  @Output() optionSelected = new EventEmitter<SearchableOption>();
  /** Emits when the X clears the field */
  @Output() cleared = new EventEmitter<void>();
  /** Emits when the results panel opens (true) or closes (false) */
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('input') private inputEl?: ElementRef<HTMLInputElement>;

  readonly uid = ++RaisDropdownSearchableComponent.seq;
  /** The panel was opened by the user (as opposed to `state`). */
  menuOpen = false;
  /** Keyboard-active row in the results, -1 for none. */
  activeIndex = -1;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  get isError(): boolean     { return this.state === 'error'; }
  get isSelection(): boolean { return this.state === 'selection' || (!!this.value && !this.query); }
  get isOpen(): boolean      { return this.state === 'open' || this.state === 'active' || this.menuOpen; }
  get isFocused(): boolean   { return this.isOpen; }
  get inputValue(): string   { return this.query || this.value; }
  get showClear(): boolean   { return !!(this.query || this.value) || this.state === 'active' || this.state === 'selection'; }
  get labelId(): string { return `rais-search-${this.uid}-label`; }
  get instructionsId(): string { return `rais-search-${this.uid}-instructions`; }
  get listboxId(): string { return `rais-search-${this.uid}-listbox`; }
  /** The keyboard-active row: while mocking `state="active"` with a query, the first match. */
  get effectiveActiveIndex(): number {
    if (this.activeIndex >= 0) return this.activeIndex;
    return this.state === 'active' && this.query.trim() && this.results.length ? 0 : -1;
  }
  get activeOptionId(): string | null {
    const i = this.effectiveActiveIndex;
    return this.isOpen && i >= 0 ? `${this.listboxId}-opt-${i}` : null;
  }

  private cachedQuery = '';
  private cachedOptions?: SearchableOption[];
  private cachedResults: SearchableOption[] = [];

  /** The options matching `query` (all of them when nothing is typed). Memoized so the panel's inputs stay stable. */
  get results(): SearchableOption[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.options;
    if (q !== this.cachedQuery || this.options !== this.cachedOptions) {
      this.cachedQuery = q;
      this.cachedOptions = this.options;
      this.cachedResults = this.options.filter(
        (o) => o.name.toLowerCase().includes(q) || (o.detail ?? '').toLowerCase().includes(q),
      );
    }
    return this.cachedResults;
  }

  get resultsState(): SearchableResultsState {
    if (this.loading) return 'loading';
    if (!this.query.trim()) return 'default';
    return this.results.length ? 'filtered' : 'no-results';
  }

  get selectedIndex(): number {
    return this.value ? this.results.findIndex((o) => o.name === this.value) : -1;
  }

  onInput(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
    this.queryChange.emit(this.query);
    if (!this.menuOpen) this.open();
    this.activeIndex = this.results.length ? 0 : -1;
  }

  onFocus(): void {
    if (!this.menuOpen) this.open();
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        if (!this.menuOpen) this.open();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        if (!this.menuOpen) this.open();
        this.moveActive(-1);
        break;
      case 'Home': if (this.menuOpen && this.activeIndex >= 0) this.activeIndex = 0; else return; break;
      case 'End': if (this.menuOpen && this.activeIndex >= 0) this.activeIndex = this.results.length - 1; else return; break;
      case 'Enter':
        if (this.isOpen && this.effectiveActiveIndex >= 0) this.commit(this.effectiveActiveIndex);
        else return;
        break;
      case 'Escape': this.close(); break;
      case 'Tab': this.close(); return;
      default: return;
    }
    event.preventDefault();
  }

  onMenuSelected(selection: SearchableMenuSelection): void {
    this.commit(selection.index);
  }

  toggle(): void {
    if (this.menuOpen) this.close();
    else {
      this.open();
      this.inputEl?.nativeElement.focus();
    }
  }

  open(): void {
    if (this.menuOpen) return;
    this.menuOpen = true;
    this.activeIndex = this.selectedIndex;
    this.openChange.emit(true);
  }

  close(): void {
    if (!this.menuOpen) return;
    this.menuOpen = false;
    this.activeIndex = -1;
    this.openChange.emit(false);
  }

  commit(index: number): void {
    const option = this.results[index];
    if (!option) return;
    this.value = option.name;
    this.query = '';
    this.queryChange.emit('');
    this.valueChange.emit(this.value);
    this.optionSelected.emit(option);
    this.close();
  }

  clear(): void {
    this.query = '';
    this.value = '';
    this.queryChange.emit('');
    this.valueChange.emit('');
    this.cleared.emit();
    this.activeIndex = -1;
    this.inputEl?.nativeElement.focus();
  }

  /** Close when a click or focus lands outside the field. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.menuOpen && !this.host.nativeElement.contains(event.target as Node)) this.close();
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (this.menuOpen && next && !this.host.nativeElement.contains(next)) this.close();
  }

  private moveActive(delta: number): void {
    const n = this.results.length;
    if (!n) return;
    this.activeIndex = Math.min(Math.max(this.activeIndex + delta, 0), n - 1);
  }
}

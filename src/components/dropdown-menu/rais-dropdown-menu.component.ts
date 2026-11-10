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
 * Dropdown Menu — RAIS Inputs component
 *
 * The option list used under `rais-dropdown` (and on its own for popover
 * menus). Mirrors the Figma `Dropdown Menu` set and its `Dropdown Menu /
 * Option` row states (file cCX0CnHdQeFNhZBkP12aWS, Inputs page):
 *
 *   default · hover · keyboard active · selected · keyboard active + selected
 *
 * - The panel never grows past `maxVisibleRows` (8 by default): longer lists
 *   scroll inside the panel with a real, token-colored scrollbar.
 * - `selectedIndex` is the committed value (blue row); `activeIndex` is the
 *   row reached with the arrow keys (focus ring) — distinct from hover and
 *   not committed until Enter.
 * - Keyboard (when the list itself has focus): Up/Down move the active row,
 *   Home/End jump, Enter or Space commit, Escape emits `closed`.
 *
 * Styling uses the RAIS design tokens in `src/index.css` only.
 */
export interface DropdownMenuSelection {
  index: number;
  option: string;
}

@Component({
  selector: 'rais-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-dropdown-menu.component.html',
  styleUrls: ['./rais-dropdown-menu.component.scss'],
})
export class RaisDropdownMenuComponent implements OnChanges, AfterViewChecked {
  private static seq = 0;

  /** Menu options to render */
  @Input() options: string[] = [
    'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5',
    'Option 6', 'Option 7', 'Option 8', 'Option 9',
  ];
  /** Index of the committed (selected) option, -1 for none */
  @Input() selectedIndex: number = -1;
  /** Index of the keyboard-active option (arrow-key focus), -1 for none */
  @Input() activeIndex: number = -1;
  /** Rows visible before the list scrolls (the panel's max height) */
  @Input() maxVisibleRows: number = 8;
  /** Accessible name of the listbox */
  @Input() ariaLabel: string = 'Options';
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
  @Output() optionSelected = new EventEmitter<DropdownMenuSelection>();
  /** Emits when Escape is pressed on the list */
  @Output() closed = new EventEmitter<void>();

  @ViewChild('viewport') private viewport?: ElementRef<HTMLElement>;

  readonly uid = ++RaisDropdownMenuComponent.seq;

  /** Option row height and gap — keep in sync with the SCSS. */
  private static readonly ROW_HEIGHT = 36;
  private static readonly ROW_GAP = 2;

  get maxHeight(): string {
    const rows = Math.max(1, this.maxVisibleRows);
    return `${rows * RaisDropdownMenuComponent.ROW_HEIGHT + (rows - 1) * RaisDropdownMenuComponent.ROW_GAP}px`;
  }

  get activeOptionId(): string | null {
    return this.activeIndex >= 0 && this.activeIndex < this.options.length ? this.optionId(this.activeIndex) : null;
  }

  optionId(index: number): string {
    return `${this.idPrefix ?? `rais-menu-${this.uid}`}-opt-${index}`;
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

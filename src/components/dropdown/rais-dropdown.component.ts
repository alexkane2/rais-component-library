import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaisDropdownMenuComponent } from '../dropdown-menu/rais-dropdown-menu.component';

/**
 * Dropdown — RAIS Inputs component
 *
 * Single-select field: label, optional "(Optional)" hint, wrapping
 * instructions, the trigger, and a `rais-dropdown-menu` under it. Mirrors the
 * Figma `Dropdown` set (file cCX0CnHdQeFNhZBkP12aWS, Inputs page).
 *
 * Width: the field is fluid — it fills its container (label, instructions,
 * trigger and error all stretch), so it lines up with the text fields next to
 * it in a drawer. Wrap it to size it (the stories use 350px).
 *
 * Keyboard (custom list, not the native <select> — arrows never change the
 * value on their own):
 *   - Tab focuses the closed trigger.
 *   - Space, Enter, Up, Down or Alt+Down open the menu with the current value
 *     as the keyboard-active row.
 *   - Up / Down / Home / End move the keyboard-active row (focus ring) without
 *     committing; typing a letter jumps to the first matching option.
 *   - Enter commits the active row and closes; Escape closes without changes;
 *     Tab closes and moves on.
 *
 * `state` only forces the look for static mockups (`open` draws the menu).
 * Real interaction opens and closes the menu itself and emits `valueChange`.
 *
 * Icons (public/assets/boxicons/): bx-caret-down.svg (closed), bx-caret-up.svg
 * (open), drawn as token-colored masks.
 */
export type DropdownState = 'default' | 'filled' | 'focus' | 'error' | 'open';

@Component({
  selector: 'rais-dropdown',
  standalone: true,
  imports: [CommonModule, RaisDropdownMenuComponent],
  templateUrl: './rais-dropdown.component.html',
  styleUrls: ['./rais-dropdown.component.scss'],
})
export class RaisDropdownComponent {
  private static seq = 0;

  /** Field label */
  @Input() label: string = 'Label';
  /** Whether to show the "(Optional)" hint next to the label */
  @Input() optional: boolean = false;
  /** Whether to show the instructions line under the label */
  @Input() instructions: boolean = false;
  /** The instructions text; long text wraps above the trigger */
  @Input() instructionsText: string = 'More instructions here.';
  /** Placeholder shown when there is no value */
  @Input() placeholder: string = '-- Select --';
  /** Currently selected value (empty shows the placeholder) */
  @Input() value: string = '';
  /** Visual state for static mockups (`open` draws the menu) */
  @Input() state: DropdownState = 'default';
  /** Error message shown when state === 'error' */
  @Input() errorMessage: string = 'Error message.';
  /** Options shown in the menu */
  @Input() options: string[] = [
    'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5',
    'Option 6', 'Option 7', 'Option 8', 'Option 9',
  ];
  /** Menu rows visible before the menu scrolls */
  @Input() maxVisibleRows: number = 8;

  /** Emits the new value when an option is committed */
  @Output() valueChange = new EventEmitter<string>();
  /** Emits when the menu opens (true) or closes (false) */
  @Output() openChange = new EventEmitter<boolean>();

  readonly uid = ++RaisDropdownComponent.seq;
  /** The menu was opened by the user (as opposed to `state="open"`). */
  menuOpen = false;
  /** Keyboard-active row in the menu, -1 for none. */
  activeIndex = -1;

  private typeahead = '';
  private typeaheadTimer?: ReturnType<typeof setTimeout>;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  get isError(): boolean { return this.state === 'error'; }
  get isFocus(): boolean { return this.state === 'focus'; }
  get isOpen(): boolean { return this.state === 'open' || this.menuOpen; }
  get isFilled(): boolean { return this.state === 'filled' || !!this.value; }
  get selectedIndex(): number { return this.options.indexOf(this.value); }
  get displayValue(): string { return this.value || this.placeholder; }
  get labelId(): string { return `rais-dropdown-${this.uid}-label`; }
  get instructionsId(): string { return `rais-dropdown-${this.uid}-instructions`; }
  get listboxId(): string { return `rais-dropdown-${this.uid}-listbox`; }
  get activeOptionId(): string | null {
    return this.isOpen && this.activeIndex >= 0 ? `${this.listboxId}-opt-${this.activeIndex}` : null;
  }

  toggle(): void {
    if (this.menuOpen) this.close();
    else this.open();
  }

  open(): void {
    if (this.menuOpen) return;
    this.menuOpen = true;
    this.activeIndex = this.selectedIndex >= 0 ? this.selectedIndex : (this.options.length ? 0 : -1);
    this.openChange.emit(true);
  }

  close(): void {
    if (!this.menuOpen) return;
    this.menuOpen = false;
    this.activeIndex = -1;
    this.openChange.emit(false);
  }

  commit(index: number): void {
    if (index < 0 || index >= this.options.length) return;
    this.value = this.options[index];
    this.valueChange.emit(this.value);
    this.close();
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    const key = event.key;
    if (!this.menuOpen) {
      if (key === 'Enter' || key === ' ' || key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault();
        this.open();
        return;
      }
      if (this.isTypeahead(event)) {
        event.preventDefault();
        this.open();
        this.jumpTo(key);
      }
      return;
    }
    switch (key) {
      case 'ArrowDown': this.moveActive(1); break;
      case 'ArrowUp': this.moveActive(-1); break;
      case 'Home': this.activeIndex = 0; break;
      case 'End': this.activeIndex = this.options.length - 1; break;
      case 'Enter':
      case ' ':
        this.commit(this.activeIndex);
        break;
      case 'Escape': this.close(); break;
      case 'Tab': this.close(); return;
      default:
        if (this.isTypeahead(event)) this.jumpTo(key);
        else return;
    }
    event.preventDefault();
  }

  /** Close when focus or a click lands outside the field. */
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
    if (!this.options.length) return;
    this.activeIndex = Math.min(Math.max(this.activeIndex + delta, 0), this.options.length - 1);
  }

  private isTypeahead(event: KeyboardEvent): boolean {
    return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== ' ';
  }

  private jumpTo(char: string): void {
    clearTimeout(this.typeaheadTimer);
    this.typeahead += char.toLowerCase();
    this.typeaheadTimer = setTimeout(() => (this.typeahead = ''), 500);
    const start = this.activeIndex + 1;
    const n = this.options.length;
    for (let i = 0; i < n; i++) {
      const idx = (start + i) % n;
      if (this.options[idx].toLowerCase().startsWith(this.typeahead)) {
        this.activeIndex = idx;
        return;
      }
    }
  }
}

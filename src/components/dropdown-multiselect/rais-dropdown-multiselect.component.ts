import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaisSelectionLabelComponent } from '../selection-label/rais-selection-label.component';
import { RaisDropdownMenuMultiselectComponent } from '../dropdown-menu-multiselect/rais-dropdown-menu-multiselect.component';

/**
 * Dropdown - Multiselect — RAIS Inputs component
 *
 * Multi-select field with chip selections, focus/error states and a
 * "max-selected" summary mode. Chips render using the real
 * RaisSelectionLabelComponent (squared variant).
 *
 * Interaction: give it `options` and it opens `rais-dropdown-menu-multiselect`
 * under the field (click, or Enter / Space / Down when focused). Checking rows
 * is pending until Apply, which sets `value`, emits `valueChange` and closes;
 * Cancel, Escape or a click outside closes without changes. Up to `maxChips`
 * values show as chips (each chip's X removes it, the field's X clears them
 * all, Backspace removes the last); more show as "N items selected".
 *
 * `state` still forces the look for static mockups: `selection` (chips from
 * `chipLabels`), `max-selected` (`maxSelectedText`), `mouse-enter`, `error`,
 * and `open` (draws the menu).
 *
 * Icons:
 *   bx-x-large-spacing.svg — clear / chip dismiss (the design-system close glyph)
 *   bx-caret-down.svg — closed
 *   bx-caret-up.svg   — open/focus
 */
export type MultiselectState =
  | 'default'
  | 'mouse-enter'
  | 'selection'
  | 'max-selected'
  | 'error'
  | 'open';

type MultiselectDisplay = 'placeholder' | 'cursor' | 'chips' | 'summary';

@Component({
  selector: 'rais-dropdown-multiselect',
  standalone: true,
  imports: [CommonModule, RaisSelectionLabelComponent, RaisDropdownMenuMultiselectComponent],
  templateUrl: './rais-dropdown-multiselect.component.html',
  styleUrls: ['./rais-dropdown-multiselect.component.scss'],
})
export class RaisDropdownMultiselectComponent {
  private static seq = 0;

  /** Field label */
  @Input() label: string = 'Label';
  /** Show "(Optional)" hint */
  @Input() optional: boolean = false;
  /** Show the instructions line */
  @Input() instructions: boolean = true;
  /** Visual state (`open` draws the menu for static mockups) */
  @Input() state: MultiselectState = 'default';
  /** Chip labels shown in 'selection' state */
  @Input() chipLabels: string[] = ['Label', 'Label', 'Label'];
  /** Summary text used in 'max-selected' state */
  @Input() maxSelectedText: string = '3 items selected';
  /** Error message shown in 'error' state */
  @Input() errorMessage: string = 'Error message.';
  /** Options listed in the menu; with none, the field doesn't open */
  @Input() options: string[] = [];
  /** Applied selection, shown as chips (or the "N items selected" summary) */
  @Input() value: string[] = [];
  /** Most values shown as chips; more show "N items selected" */
  @Input() maxChips: number = 3;
  /** Placeholder shown when nothing is selected */
  @Input() placeholder: string = 'Search...';

  /** Emits the new selection when Apply is pressed, a chip is removed or the field is cleared */
  @Output() valueChange = new EventEmitter<string[]>();
  /** Emits when the menu opens (true) or closes (false) */
  @Output() openChange = new EventEmitter<boolean>();

  readonly uid = ++RaisDropdownMultiselectComponent.seq;
  /** The menu was opened by the user (as opposed to `state="open"`). */
  menuOpen = false;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  get isMouseEnter(): boolean { return this.state === 'mouse-enter'; }
  get isSelection(): boolean  { return this.state === 'selection'; }
  get isMaxSelected(): boolean { return this.state === 'max-selected'; }
  get isError(): boolean       { return this.state === 'error'; }
  get isOpen(): boolean        { return this.state === 'open' || this.menuOpen; }
  /** Focus border + caret up: the Figma MouseEnter look, also used while open. */
  get isActive(): boolean      { return this.isMouseEnter || this.isOpen; }
  get caretIcon(): string      { return this.isActive ? 'bx-caret-up' : 'bx-caret-down'; }
  get canOpen(): boolean       { return this.options.length > 0; }

  get labelId(): string    { return `rais-multi-${this.uid}-label`; }
  get listboxId(): string  { return `rais-multi-${this.uid}-listbox`; }

  get display(): MultiselectDisplay {
    if (this.isSelection) return 'chips';
    if (this.isMaxSelected) return 'summary';
    const count = this.value?.length ?? 0;
    if (count > this.maxChips) return 'summary';
    if (count > 0) return 'chips';
    return this.isMouseEnter && !this.menuOpen ? 'cursor' : 'placeholder';
  }

  get chips(): string[] {
    return this.isSelection ? this.chipLabels : this.value;
  }

  get summaryText(): string {
    return this.isMaxSelected ? this.maxSelectedText : `${this.value.length} items selected`;
  }

  /** The clear-all X shows next to chips (Figma Selection state), not with the summary. */
  get showClear(): boolean {
    return this.display === 'chips';
  }

  toggle(): void {
    if (this.menuOpen) this.close();
    else this.open();
  }

  open(): void {
    if (this.menuOpen || !this.canOpen) return;
    this.menuOpen = true;
    this.openChange.emit(true);
  }

  close(refocus = false): void {
    if (!this.menuOpen) return;
    this.menuOpen = false;
    this.openChange.emit(false);
    if (refocus) this.fieldElement()?.focus();
  }

  onApply(values: string[]): void {
    this.setValue(values);
    this.close(true);
  }

  onCancel(): void {
    this.close(true);
  }

  clearAll(event: Event): void {
    event.stopPropagation();
    if (this.isSelection) return; // static mockup
    this.setValue([]);
  }

  /** A click on a chip's X removes that value; a click elsewhere on the chip opens the menu. */
  onChipClick(event: MouseEvent, chip: string): void {
    const target = event.target as HTMLElement | null;
    if (this.isSelection || !target?.classList.contains('rais-sel-label__icon')) return;
    event.stopPropagation();
    this.setValue(this.value.filter((v) => v !== chip));
  }

  onFieldKeydown(event: KeyboardEvent): void {
    const key = event.key;
    if (!this.menuOpen && (key === 'Enter' || key === ' ' || key === 'ArrowDown')) {
      event.preventDefault();
      this.open();
    } else if (this.menuOpen && key === 'Escape') {
      event.preventDefault();
      this.close();
    } else if (!this.menuOpen && key === 'Backspace' && this.value.length && !this.isSelection) {
      event.preventDefault();
      this.setValue(this.value.slice(0, -1));
    }
  }

  /** Close (dropping pending changes) when a click lands outside the field and menu. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.menuOpen && !this.host.nativeElement.contains(event.target as Node)) this.close();
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (this.menuOpen && next && !this.host.nativeElement.contains(next)) this.close();
  }

  private setValue(values: string[]): void {
    this.value = values;
    this.valueChange.emit(values);
  }

  private fieldElement(): HTMLElement | null {
    return this.host.nativeElement.querySelector<HTMLElement>('.rais-multi__field');
  }
}

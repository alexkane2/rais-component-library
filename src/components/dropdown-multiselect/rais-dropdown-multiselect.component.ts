import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaisSelectionLabelComponent } from '../selection-label/rais-selection-label.component';

/**
 * Dropdown - Multiselect — RAIS Inputs component
 *
 * Multi-select field with chip selections, focus/error states and a
 * "max-selected" summary mode. Chips in the `selection` state render
 * using the real RaisSelectionLabelComponent (squared variant).
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
  | 'error';

@Component({
  selector: 'rais-dropdown-multiselect',
  standalone: true,
  imports: [CommonModule, RaisSelectionLabelComponent],
  templateUrl: './rais-dropdown-multiselect.component.html',
  styleUrls: ['./rais-dropdown-multiselect.component.scss'],
})
export class RaisDropdownMultiselectComponent {
  /** Field label */
  @Input() label: string = 'Label';
  /** Show "(Optional)" hint */
  @Input() optional: boolean = false;
  /** Show the instructions line */
  @Input() instructions: boolean = true;
  /** Visual state */
  @Input() state: MultiselectState = 'default';
  /** Chip labels shown in 'selection' state */
  @Input() chipLabels: string[] = ['Label', 'Label', 'Label'];
  /** Summary text used in 'max-selected' state */
  @Input() maxSelectedText: string = '3 items selected';
  /** Error message shown in 'error' state */
  @Input() errorMessage: string = 'Error message.';

  get isMouseEnter(): boolean { return this.state === 'mouse-enter'; }
  get isSelection(): boolean  { return this.state === 'selection'; }
  get isMaxSelected(): boolean { return this.state === 'max-selected'; }
  get isError(): boolean       { return this.state === 'error'; }
  get caretIcon(): string      { return this.isMouseEnter ? 'bx-caret-up' : 'bx-caret-down'; }
}

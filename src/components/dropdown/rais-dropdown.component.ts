import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Dropdown — RAIS Inputs component
 *
 * Standard select-style dropdown with label, optional helper text,
 * focus / error / open states, and an options menu.
 *
 * Icons (public/assets/boxicons/):
 *   bx-caret-down.svg — closed state
 *   bx-caret-up.svg   — open state
 */
export type DropdownState = 'default' | 'filled' | 'focus' | 'error' | 'open';

@Component({
  selector: 'rais-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-dropdown.component.html',
  styleUrls: ['./rais-dropdown.component.scss'],
})
export class RaisDropdownComponent {
  /** Field label */
  @Input() label: string = 'Label';
  /** Whether to show the "(Optional)" hint next to the label */
  @Input() optional: boolean = false;
  /** Whether to show the instructions line under the label */
  @Input() instructions: boolean = false;
  /** Currently selected value (empty shows placeholder) */
  @Input() value: string = '';
  /** Visual state */
  @Input() state: DropdownState = 'default';
  /** Error message shown when state === 'error' */
  @Input() errorMessage: string = 'Error message.';
  /** Options shown in the open menu */
  @Input() options: string[] = [
    'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5',
    'Option 6', 'Option 7', 'Option 8', 'Option 9',
  ];

  get isError(): boolean { return this.state === 'error'; }
  get isFocus(): boolean { return this.state === 'focus'; }
  get isOpen(): boolean { return this.state === 'open'; }
  get isFilled(): boolean { return this.state === 'filled' || !!this.value; }
  get caretIcon(): string { return this.isOpen ? 'bx-caret-up' : 'bx-caret-down'; }
  get displayValue(): string { return this.value || '-- Select --'; }
}

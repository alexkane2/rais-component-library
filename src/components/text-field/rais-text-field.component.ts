import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Text Field — RAIS Inputs component
 *
 * Single-line input (40px) or multi-line textarea (80px) with optional
 * label, optional indicator, instructions, and error message.
 */
export type TextFieldState = 'default' | 'filled' | 'focus' | 'error' | 'disabled';
export type TextFieldSize = 'single-line' | 'multi-line';

@Component({
  selector: 'rais-text-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rais-text-field.component.html',
  styleUrls: ['./rais-text-field.component.scss'],
})
export class RaisTextFieldComponent {
  /** Field label */
  @Input() label: string = 'Label';
  /** Show "(Optional)" next to label */
  @Input() optional: boolean = false;
  /** Show instructions text */
  @Input() instructions: boolean = true;
  /** Current value */
  @Input() value: string = '';
  /** Visual state */
  @Input() state: TextFieldState = 'default';
  /** Single line input or multi-line textarea */
  @Input() size: TextFieldSize = 'single-line';
  /** Error message (only shown in error state) */
  @Input() errorMessage: string = 'Error message.';

  get isMultiLine(): boolean {
    return this.size === 'multi-line';
  }
  get isError(): boolean {
    return this.state === 'error';
  }
  get isDisabled(): boolean {
    return this.state === 'disabled';
  }
  get isFocus(): boolean {
    return this.state === 'focus';
  }
}

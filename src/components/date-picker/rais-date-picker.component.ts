import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Date Picker — RAIS Inputs component
 *
 * A 350px-wide input row that displays a date value (MM/DD/YYYY) or a
 * placeholder, with a trailing calendar icon. Mirrors the four Figma
 * states: empty, filled, focus, error.
 *
 * Icons live at /assets/boxicons/bxs-calendar.svg — the icon color is
 * tinted via CSS filter to match the active state.
 */
export type DatePickerState = 'empty' | 'filled' | 'focus' | 'error';

@Component({
  selector: 'rais-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-date-picker.component.html',
  styleUrls: ['./rais-date-picker.component.scss'],
})
export class RaisDatePickerComponent {
  /** Field label shown above the input. */
  @Input() label: string = 'Label';
  /** Show "(Optional)" next to the label. */
  @Input() optional: boolean = false;
  /** Show the secondary "More instructions here." line. */
  @Input() instructions: boolean = true;
  /** Current value in MM/DD/YYYY format. */
  @Input() value: string = '12/21/2024';
  /** Visual state — drives border color and icon tint. */
  @Input() state: DatePickerState = 'empty';
  /** Error message (only rendered when state === 'error'). */
  @Input() errorMessage: string = 'Error message.';

  get isEmpty(): boolean {
    return this.state === 'empty';
  }
  get isFocus(): boolean {
    return this.state === 'focus';
  }
  get isError(): boolean {
    return this.state === 'error';
  }
}

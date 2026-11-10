import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Date Picker — RAIS Inputs component
 *
 * The date field: label, optional hint, instructions, a MM/DD/YYYY value or
 * placeholder, a clear X and a trailing calendar icon. Mirrors the Figma
 * `Date Picker` set (file cCX0CnHdQeFNhZBkP12aWS, Inputs page): empty,
 * filled, focus, error.
 *
 * Clearing: when a date is present the X (`showClear`) removes it and emits
 * `cleared` and `valueChange('')`.
 *   - optional field → back to the empty state (placeholder, no error)
 *   - `required` field → the error state with `requiredMessage` until a new
 *     date is chosen
 * The open `rais-calendar` offers the same Clear action in its footer.
 *
 * Width is fluid: wrap it to size it (the stories use 350px). Icons are
 * Boxicons SVGs (public/assets/boxicons/) drawn as token-colored masks.
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
  /** Show the instructions line under the label. */
  @Input() instructions: boolean = true;
  /** The instructions text; long text wraps above the field. */
  @Input() instructionsText: string = 'More instructions here.';
  /** Placeholder shown while empty. */
  @Input() placeholder: string = 'MM/DD/YYYY';
  /** Current value in MM/DD/YYYY format. */
  @Input() value: string = '12/21/2024';
  /** Visual state — drives border color and icon tint. */
  @Input() state: DatePickerState = 'empty';
  /** Error message (only rendered when state === 'error'). */
  @Input() errorMessage: string = 'Error message.';
  /** Show the X that clears the date while one is present. */
  @Input() showClear: boolean = true;
  /** A required field shows `requiredMessage` as an error once cleared. */
  @Input() required: boolean = false;
  /** Error shown when a required field is cleared. */
  @Input() requiredMessage: string = 'Date is required.';

  /** Emits the value after a change ('' when cleared). */
  @Output() valueChange = new EventEmitter<string>();
  /** Emits when the X clears the date. */
  @Output() cleared = new EventEmitter<void>();
  /** Emits when the calendar icon is clicked (open your calendar popover). */
  @Output() calendarClicked = new EventEmitter<void>();

  get isEmpty(): boolean {
    return this.state === 'empty' || !this.value;
  }
  get isFocus(): boolean {
    return this.state === 'focus';
  }
  get isError(): boolean {
    return this.state === 'error';
  }
  get canClear(): boolean {
    return this.showClear && !this.isEmpty;
  }

  clear(): void {
    this.value = '';
    if (this.required) {
      this.state = 'error';
      this.errorMessage = this.requiredMessage;
    } else {
      this.state = 'empty';
    }
    this.valueChange.emit('');
    this.cleared.emit();
  }
}

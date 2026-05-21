import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Radio or Checkbox — RAIS Selectors component
 *
 * Single radio/checkbox/circle-checkbox with label. State and size are
 * visual variants matching the Figma component set.
 */
export type RcType = 'radio' | 'checkbox' | 'circle-checkbox';
export type RcState = 'unselected' | 'selected' | 'hover' | 'indeterminate' | 'disabled';
export type RcSize = 'small' | 'medium' | 'large' | 'x-large';

const CHECK_SIZES: Record<RcSize, number> = {
  small: 9,
  medium: 10,
  large: 11,
  'x-large': 12,
};

@Component({
  selector: 'rais-radio-or-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rais-radio-or-checkbox.component.html',
  styleUrls: ['./rais-radio-or-checkbox.component.scss'],
})
export class RaisRadioOrCheckboxComponent {
  /** Label text shown next to the input */
  @Input() label: string = 'Label';
  /** radio | checkbox | circle-checkbox */
  @Input() type: RcType = 'checkbox';
  /** Visual state */
  @Input() state: RcState = 'unselected';
  /** Size variant */
  @Input() size: RcSize = 'large';

  get checkSize(): number {
    return CHECK_SIZES[this.size] ?? 11;
  }

  get showCheck(): boolean {
    return (
      (this.type === 'checkbox' || this.type === 'circle-checkbox') &&
      this.state === 'selected'
    );
  }

  get showDot(): boolean {
    return this.type === 'radio' && this.state === 'selected';
  }

  get showDash(): boolean {
    return this.type === 'checkbox' && this.state === 'indeterminate';
  }
}

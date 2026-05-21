import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button — RAIS Actions component
 *
 * Icons: Boxicons SVG files served from public/assets/boxicons/
 *
 * Usage in an Angular template:
 *   <rais-button label="Submit" variant="primary" size="normal"></rais-button>
 *   <rais-button label="Download" variant="primary" icon="bx-download"></rais-button>
 *   <rais-button label="Next" variant="primary" icon="bx-right-arrow-alt" iconPos="right"></rais-button>
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'disabled';
export type ButtonSize = 'small' | 'normal' | 'large';
export type ButtonIconPos = 'left' | 'right';

@Component({
  selector: 'rais-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-button.component.html',
  styleUrls: ['./rais-button.component.scss'],
})
export class RaisButtonComponent {
  /** Button label text. */
  @Input() label: string = 'Button';
  /** Visual style variant. */
  @Input() variant: ButtonVariant = 'primary';
  /** Button size. */
  @Input() size: ButtonSize = 'normal';
  /** Boxicons file name (without .svg) from assets/boxicons/. Leave empty for no icon. */
  @Input() icon: string = '';
  /** Icon position relative to the label. */
  @Input() iconPos: ButtonIconPos = 'left';

  get isDisabled(): boolean {
    return this.variant === 'disabled';
  }
}

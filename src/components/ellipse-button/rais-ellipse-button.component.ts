import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Ellipse Button — RAIS Buttons component
 *
 * Square (rounded) icon-only button showing a horizontal ellipsis. Used
 * for row-level "more actions" affordances in tables and lists. Mirrors
 * the Figma component at file cCX0CnHdQeFNhZBkP12aWS, node 3558:674.
 *
 * 3 types × 3 sizes = 9 variants:
 *   primary   — filled blue,   white dots
 *   secondary — white fill,    blue border,    blue dots
 *   tertiary  — white fill,    gray border,    gray dots
 *
 *   large  — 39×39 (24×24 icon)
 *   medium — 33×33 (24×24 icon)
 *   small  — 28×28 (20×20 icon)
 *
 * Usage:
 *   <rais-ellipse-button type="primary" size="medium" (clicked)="openMenu($event)"></rais-ellipse-button>
 */
export type EllipseButtonType = 'primary' | 'secondary' | 'tertiary';
export type EllipseButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'rais-ellipse-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-ellipse-button.component.html',
  styleUrls: ['./rais-ellipse-button.component.scss'],
})
export class RaisEllipseButtonComponent {
  /** Visual type. */
  @Input() type: EllipseButtonType = 'primary';
  /** Size — drives outer dimensions and icon size. */
  @Input() size: EllipseButtonSize = 'large';
  /** Accessible label (for screen readers). */
  @Input() ariaLabel: string = 'More actions';
  /** Disabled state. */
  @Input() disabled: boolean = false;

  /** Emitted when the button is clicked. */
  @Output() clicked = new EventEmitter<MouseEvent>();
}

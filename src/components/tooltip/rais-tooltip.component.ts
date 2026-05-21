import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Tooltip — RAIS overlay component
 *
 * A dark tooltip with a CSS triangle caret pointing toward its anchor.
 * Three sizes × four caret positions = 12 visual permutations.
 *
 * Tokens (from Figma variables):
 *   --gray-900       #333333 → tooltip background
 *   --text-inverse   #FFFFFF → tooltip text
 *   --radius-sm      4px     → corner radius
 */
export type TooltipSize = 'small' | 'medium' | 'large';
export type TooltipCaretPosition = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'rais-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-tooltip.component.html',
  styleUrls: ['./rais-tooltip.component.scss'],
})
export class RaisTooltipComponent {
  /** Tooltip size — controls padding, typography, and content layout. */
  @Input() size: TooltipSize = 'large';
  /** Which edge the caret protrudes from (points toward the anchor). */
  @Input() caretPosition: TooltipCaretPosition = 'top';
  /** Show the "Label:" prefix (Medium/Large only — Small is label-only). */
  @Input() showLabel: boolean = true;
  /** Bold label text. */
  @Input() label: string = 'Label';
  /** Body/description text. */
  @Input() description: string = '';

  /** Caret renders before the box for top/left positions. */
  get caretBefore(): boolean {
    return this.caretPosition === 'top' || this.caretPosition === 'left';
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Slim Tabs — RAIS Navigation component
 *
 * Tokens (from Figma variables):
 *   --color/border-focus       #007CBD → selected/hover underline + text
 *   --color/btn-text-secondary #007CBD → selected/hover label
 *   --color/text-header        #101928 → unselected label
 *
 * Type styles (Figma):
 *   Large: Figtree SemiBold 14 / line-height 1.2 / letter-spacing 0.42px
 *   Small: Figtree Bold 12     / line-height 1.4 / letter-spacing 0.18px
 *
 * Icons:
 *   bx-caret-down.svg (boxicons) — dropdown affordance (via CSS mask)
 *   Inline SVG sparkle pair      — extras="ai"
 */
export type SlimTabState = 'selected' | 'unselected' | 'hover';
export type SlimTabSize = 'large' | 'small';
export type SlimTabExtras = 'none' | 'ai';

@Component({
  selector: 'rais-slim-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-slim-tabs.component.html',
  styleUrls: ['./rais-slim-tabs.component.scss'],
})
export class RaisSlimTabsComponent {
  /** Tab label text. */
  @Input() label: string = 'Tab Label';
  /** Visual state. */
  @Input() state: SlimTabState = 'unselected';
  /** Tab size — large=14px SemiBold, small=12px Bold. */
  @Input() size: SlimTabSize = 'large';
  /** Optional sparkle glyph for AI-related tabs. */
  @Input() extras: SlimTabExtras = 'none';
  /** Show bx-caret-down indicator on the right. */
  @Input() dropdown: boolean = false;
}

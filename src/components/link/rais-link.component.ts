import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Link — RAIS Actions component
 *
 * A hyperlink with optional left/right icons. Icons are boxicons SVGs
 * served from public/assets/boxicons/. Icon color is shifted via CSS filter
 * to match the active color/state combination.
 *
 * Default icon: bxs-plus-circle (matches Figma).
 * Common alternatives: bx-external-link, bx-right-arrow-alt, bx-link-external.
 */
export type LinkSize = 'large' | 'medium' | 'small';
export type LinkColor = 'blue' | 'black' | 'gray';
export type LinkState = 'default' | 'hover';

@Component({
  selector: 'rais-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-link.component.html',
  styleUrls: ['./rais-link.component.scss'],
})
export class RaisLinkComponent {
  /** Link label text. */
  @Input() label: string = 'Label';
  /** Anchor href. */
  @Input() href: string = '#';
  /** Boxicons SVG name (without extension). */
  @Input() icon: string = 'bxs-plus-circle';
  /** Visual size — large=16px, medium=14px, small=13px. */
  @Input() size: LinkSize = 'medium';
  /** Color theme. */
  @Input() color: LinkColor = 'blue';
  /** Interactive state. */
  @Input() state: LinkState = 'default';
  /** Show icon to the left of the label. */
  @Input() iconLeft: boolean = true;
  /** Show icon to the right of the label. */
  @Input() iconRight: boolean = true;
}

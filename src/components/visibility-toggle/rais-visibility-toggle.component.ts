import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Visibility Toggle — RAIS Filters component
 *
 * A pill-shaped show/hide button with an eye icon. Distinct from the regular
 * Toggle (on/off switch). Uses boxicons SVGs:
 *   bxs-show.svg — eye open  (toggleState = "show")
 *   bxs-hide.svg — eye closed (toggleState = "hide")
 *
 * Specs (Figma):
 *   height: 26px, padding: 6px 12px, gap: 6px
 *   radius: 12px (pill shape)
 *   bg: #FFFFFF default, #EDF6FC on hover
 *   border: #CCCCCC 1px
 *   Label: 12px SemiBold #333333
 *   Icon: 14×14
 */
export type VisibilityToggleState = 'show' | 'hide';
export type VisibilityToggleInteraction = 'default' | 'hover';

@Component({
  selector: 'rais-visibility-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-visibility-toggle.component.html',
  styleUrls: ['./rais-visibility-toggle.component.scss'],
})
export class RaisVisibilityToggleComponent {
  /** Button label text. */
  @Input() label: string = 'Label';
  /** show → bxs-show.svg (eye open) | hide → bxs-hide.svg (eye closed) */
  @Input() toggleState: VisibilityToggleState = 'show';
  /** default=white bg | hover=#EDF6FC bg */
  @Input() interaction: VisibilityToggleInteraction = 'default';

  get iconFile(): string {
    return this.toggleState === 'hide' ? 'bxs-hide' : 'bxs-show';
  }
}

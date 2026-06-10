import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Drawer — RAIS Content component
 *
 * Right-side slide-over panel. Mirrors the Figma component at file
 * cCX0CnHdQeFNhZBkP12aWS, node 3557:597.
 *
 * Layout: header (heading + subheading + close X), divider, scrollable body
 * (projected content via <ng-content>), and a full-width primary CTA pinned
 * to the bottom.
 *
 * Emits `ctaClicked` and `closed` events.
 *
 * Usage:
 *   <rais-drawer
 *     heading="Start from a template"
 *     subheading="Pick a ready-made dashboard to get going fast."
 *     ctaLabel="Label"
 *     (ctaClicked)="onCta()"
 *     (closed)="onClose()"
 *   >
 *     ...body content...
 *   </rais-drawer>
 */
@Component({
  selector: 'rais-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-drawer.component.html',
  styleUrls: ['./rais-drawer.component.scss'],
})
export class RaisDrawerComponent {
  /** Drawer title. */
  @Input() heading: string = 'Start from a template';
  /** Supporting copy under the title. Empty string hides it. */
  @Input() subheading: string = 'Pick a ready-made dashboard to get going fast.';
  /** Bottom primary CTA label. */
  @Input() ctaLabel: string = 'Label';
  /** Show the bottom CTA button. */
  @Input() showCta: boolean = true;
  /** Show the X close button in the header. */
  @Input() showCloseButton: boolean = true;

  /** Emits when the bottom CTA is clicked. */
  @Output() ctaClicked = new EventEmitter<void>();
  /** Emits when the close (X) button is clicked. */
  @Output() closed = new EventEmitter<void>();
}

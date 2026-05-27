import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Modal — RAIS Content component
 *
 * Confirmation / dialog modal panel. Mirrors the Figma component at file
 * cCX0CnHdQeFNhZBkP12aWS, node 202:4104. Six properties drive the layout:
 *
 *   size         — 'default' (500px wide) | 'small' (300px wide)
 *   alignment    — 'centered' | 'left-aligned' (text + buttons)
 *   buttonLayout — 'side-by-side' | 'stacked' (small only)
 *   showParagraph - toggle body copy
 *   showSecondary - toggle the Cancel/secondary button
 *   showIcon      - show the 60×60 info icon above the headline
 *
 * Plus content overrides for headline, body text, and button labels.
 * Emits `confirmed`, `cancelled`, `closed` events.
 *
 * Usage:
 *   <rais-modal
 *     size="default"
 *     alignment="centered"
 *     headline="Are you sure?"
 *     body="This action cannot be undone."
 *     (confirmed)="onConfirm()"
 *     (cancelled)="onCancel()"
 *     (closed)="onClose()"
 *   ></rais-modal>
 */
export type ModalSize = 'default' | 'small';
export type ModalAlignment = 'centered' | 'left-aligned';
export type ModalButtonLayout = 'side-by-side' | 'stacked';

@Component({
  selector: 'rais-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-modal.component.html',
  styleUrls: ['./rais-modal.component.scss'],
})
export class RaisModalComponent {
  /** Modal width: 500px (default) or 300px (small). */
  @Input() size: ModalSize = 'default';
  /** Text/button alignment. */
  @Input() alignment: ModalAlignment = 'centered';
  /** Layout for primary + secondary buttons. */
  @Input() buttonLayout: ModalButtonLayout = 'side-by-side';

  /** Headline / title text. */
  @Input() headline: string = 'Headline';
  /** Body / paragraph copy. */
  @Input() body: string =
    'Lorem ipsum dolor sit amet consectetur. Dignissim enim integer elit massa a quam consectetur quis. Id eu nisl et fermentum arcu rutrum at lorem.';
  /** Primary CTA label. */
  @Input() primaryCtaLabel: string = 'Confirm';
  /** Secondary CTA label. */
  @Input() secondaryCtaLabel: string = 'Cancel';

  /** Show body paragraph. */
  @Input() showParagraph: boolean = true;
  /** Show secondary (Cancel) button. */
  @Input() showSecondary: boolean = true;
  /** Show large info icon above the headline. */
  @Input() showIcon: boolean = false;
  /** Show the X close button in the top-right. */
  @Input() showCloseButton: boolean = true;

  /** Backdrop overlay (typically wrapping the modal at the page level). */
  @Input() showBackdrop: boolean = false;

  /** Emits when the primary CTA is clicked. */
  @Output() confirmed = new EventEmitter<void>();
  /** Emits when the secondary CTA is clicked. */
  @Output() cancelled = new EventEmitter<void>();
  /** Emits when the close (X) button is clicked. */
  @Output() closed = new EventEmitter<void>();
}

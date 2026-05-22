import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * System Card — RAIS Empty States component
 *
 * A unified inline notification surface used for banners, toasts, and long
 * page-spanning info bars. Mirrors the Figma component at file
 * cCX0CnHdQeFNhZBkP12aWS, node 199:456 — which collapses 19 layout
 * permutations into 4 properties + a few content toggles:
 *
 *   format      — banner | toast | long-banner
 *   messageType — info | error | warning | success     (long-banner is info only)
 *   background  — white | color | gray                  (gray is long-banner only)
 *   showHeader / showButton / show2ndButton / showCloseIcon
 *
 * Usage:
 *   <rais-system-card format="banner" messageType="error" background="color"></rais-system-card>
 *   <rais-system-card format="toast" messageType="success"></rais-system-card>
 *   <rais-system-card format="long-banner" background="gray"></rais-system-card>
 */
export type SystemCardFormat = 'banner' | 'toast' | 'long-banner';
export type SystemCardMessageType = 'info' | 'error' | 'warning' | 'success';
export type SystemCardBackground = 'white' | 'color' | 'gray';

@Component({
  selector: 'rais-system-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-system-card.component.html',
  styleUrls: ['./rais-system-card.component.scss'],
})
export class RaisSystemCardComponent {
  @Input() format: SystemCardFormat = 'banner';
  @Input() messageType: SystemCardMessageType = 'info';
  @Input() background: SystemCardBackground = 'white';

  @Input() header: string = 'Header';
  @Input() message: string =
    'Lorem ipsum dolor sit amet consectetur. Amet lectus nulla sed erat dictum non. Leo orci elit mattis tempus egestas.';

  @Input() showHeader: boolean = true;
  @Input() showCloseIcon: boolean = true;

  /** Banner only: show the primary CTA button. */
  @Input() showButton: boolean = true;
  /** Banner only: show the secondary CTA button. */
  @Input() show2ndButton: boolean = true;

  @Input() primaryCtaLabel: string = 'Primary CTA';
  @Input() secondaryCtaLabel: string = 'Secondary CTA';
  /** Long-banner only: label of the right-side CTA. */
  @Input() ctaLabel: string = 'Call to Action';

  // ─── derived flags ──────────────────────────────────────────────
  get isBanner(): boolean { return this.format === 'banner'; }
  get isToast(): boolean { return this.format === 'toast'; }
  get isLongBanner(): boolean { return this.format === 'long-banner'; }

  /** Use the OUTLINE info icon (only on long-banner with white/gray bg). */
  get useOutlineIcon(): boolean {
    return this.isLongBanner && (this.background === 'white' || this.background === 'gray');
  }

  /** Banner buttons section renders. */
  get hasButtons(): boolean {
    return this.isBanner && (this.showButton || this.show2ndButton);
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Member Central Footer — RAIS Header and Footer component
 *
 * Slim 40px footer bar with copyright text and legal links. Mirrors the
 * Figma component at file cCX0CnHdQeFNhZBkP12aWS, node 3452:7248.
 *
 * Usage:
 *   <rais-member-central-footer></rais-member-central-footer>
 *
 *   <rais-member-central-footer
 *     copyright="©2026 Renaissance"
 *     legalNoticeUrl="/legal"
 *     privacyPolicyUrl="/privacy"
 *   ></rais-member-central-footer>
 */
@Component({
  selector: 'rais-member-central-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-member-central-footer.component.html',
  styleUrls: ['./rais-member-central-footer.component.scss'],
})
export class RaisMemberCentralFooterComponent {
  /** Copyright notice. */
  @Input() copyright: string = '©2026 Renaissance';
  /** All Rights Reserved label (right of copyright). */
  @Input() rightsLabel: string = 'All Rights Reserved';
  /** Legal Notice link label. */
  @Input() legalNoticeLabel: string = 'Legal Notice';
  /** Privacy Policy link label. */
  @Input() privacyPolicyLabel: string = 'Privacy Policy';
  /** Legal Notice link href. */
  @Input() legalNoticeUrl: string = '#';
  /** Privacy Policy link href. */
  @Input() privacyPolicyUrl: string = '#';
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Badge — RAIS Labeling component
 *
 * An 8×8px status dot used to indicate state. Mirrors the Figma component
 * at file cCX0CnHdQeFNhZBkP12aWS, node 3443:7138.
 *
 * Usage in an Angular template:
 *   <rais-badge variant="success"></rais-badge>
 *   <rais-badge variant="focus"></rais-badge>
 *   <rais-badge variant="error"></rais-badge>
 */
export type BadgeVariant = 'success' | 'focus' | 'error';

@Component({
  selector: 'rais-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-badge.component.html',
  styleUrls: ['./rais-badge.component.scss'],
})
export class RaisBadgeComponent {
  /** Status variant — drives the fill color. */
  @Input() variant: BadgeVariant = 'success';
}

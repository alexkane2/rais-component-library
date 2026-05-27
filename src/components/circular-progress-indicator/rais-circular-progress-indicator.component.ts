import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Circular Progress Indicator — RAIS Loading component
 *
 * Animated or determinate circular progress ring. Mirrors the Figma
 * component at file cCX0CnHdQeFNhZBkP12aWS, node 596:502 (variants:
 * 25 / 50 / 75 / 100 / Custom).
 *
 * Two modes:
 *  - **Determinate** (default): fills the ring up to `progress`%
 *  - **Indeterminate**: rotating partial arc spinner (set `indeterminate=true`)
 *
 * Usage:
 *   <rais-circular-progress-indicator [progress]="75"></rais-circular-progress-indicator>
 *   <rais-circular-progress-indicator [indeterminate]="true"></rais-circular-progress-indicator>
 *   <rais-circular-progress-indicator [progress]="40" [size]="64" color="#117C1A"></rais-circular-progress-indicator>
 */
@Component({
  selector: 'rais-circular-progress-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-circular-progress-indicator.component.html',
  styleUrls: ['./rais-circular-progress-indicator.component.scss'],
})
export class RaisCircularProgressIndicatorComponent {
  /** Progress 0–100 (determinate mode only). */
  @Input() progress: number = 50;
  /** Outer size in pixels. */
  @Input() size: number = 48;
  /** Ring stroke width in pixels. */
  @Input() strokeWidth: number = 4;
  /** Active arc color. */
  @Input() color: string = '#007CBD';
  /** Background ring color (use 'transparent' or 'none' to hide). */
  @Input() trackColor: string = 'transparent';
  /** Rotate a partial arc continuously (spinner mode). */
  @Input() indeterminate: boolean = false;
  /** Fraction (0–1) of the ring shown as the spinning arc when indeterminate. */
  @Input() spinnerFraction: number = 0.25;
  /** Whether to render the progress % label inside the circle. */
  @Input() showLabel: boolean = false;

  // ─── Derived SVG geometry ───────────────────────────────────────
  get center(): number { return this.size / 2; }
  get radius(): number { return (this.size - this.strokeWidth) / 2; }
  get circumference(): number { return 2 * Math.PI * this.radius; }
  /** Dashoffset for determinate mode based on progress. */
  get dashoffset(): number {
    const pct = Math.max(0, Math.min(100, this.progress));
    return this.circumference * (1 - pct / 100);
  }
  /** Dasharray for indeterminate mode = partial arc + gap. */
  get spinnerDasharray(): string {
    const arc = this.circumference * this.spinnerFraction;
    const gap = this.circumference - arc;
    return `${arc} ${gap}`;
  }
}

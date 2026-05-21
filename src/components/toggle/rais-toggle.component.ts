import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Toggle — RAIS Selectors component
 *
 * Horizontal row of a label + a pill-shaped switch with a sliding knob.
 * Mirrors the Figma component variants (12 total: state × size × labelSide).
 *
 * Tokens (from Figma variables):
 *   --border-default    #CCCCCC  → unselected switch background
 *   --border-focus      #007CBD  → selected switch background
 *   --surface-primary   #FFFFFF  → knob fill
 *   --text-primary      #4D586A  → label text
 */
export type ToggleState = 'selected' | 'unselected';
export type ToggleSize = 'small' | 'large' | 'x-large';
export type ToggleLabelSide = 'left' | 'right';

@Component({
  selector: 'rais-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-toggle.component.html',
  styleUrls: ['./rais-toggle.component.scss'],
})
export class RaisToggleComponent {
  /** Label text shown next to the toggle. */
  @Input() label: string = 'Label';
  /** unselected=#CCCCCC track | selected=#007CBD track */
  @Input() state: ToggleState = 'unselected';
  /** small=20×12 (12px Medium) | large=23×14 (14px Regular) | x-large=26×16 (16px Regular) */
  @Input() size: ToggleSize = 'large';
  /** Position of label relative to switch. */
  @Input() labelSide: ToggleLabelSide = 'right';
}

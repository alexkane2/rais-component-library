import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button Tab Sets — RAIS Selector Controls component
 *
 * SelectButton: a segmented button group to choose a value from a list of
 * options. Mirrors the Figma component at file cCX0CnHdQeFNhZBkP12aWS,
 * node 3614:851 (2 / 3 / 4 options, single or multiple selection).
 *
 * Single mode: exactly one option is selected (white pill).
 * Multiple mode: each option toggles independently.
 *
 * Usage:
 *   <rais-button-tab-set
 *     [options]="['Day', 'Week', 'Month']"
 *     [selectedIndex]="0"
 *     (selectionChange)="onSelection($event)"
 *   ></rais-button-tab-set>
 *
 *   <rais-button-tab-set [options]="['A', 'B']" [multiple]="true"></rais-button-tab-set>
 */
@Component({
  selector: 'rais-button-tab-set',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-button-tab-set.component.html',
  styleUrls: ['./rais-button-tab-set.component.scss'],
})
export class RaisButtonTabSetComponent {
  /** Option labels (Figma supports 2–4; any count renders). */
  @Input() options: string[] = ['Primary', 'Primary'];
  /** Multiple mode: options toggle independently. */
  @Input() multiple: boolean = false;
  /** Single mode: index of the selected option. -1 for none. */
  @Input() selectedIndex: number = 0;
  /** Multiple mode: indices of the selected options. */
  @Input() selectedIndices: number[] = [];

  /** Emits the selected index (single) or indices array (multiple). */
  @Output() selectionChange = new EventEmitter<number | number[]>();

  isSelected(i: number): boolean {
    return this.multiple ? this.selectedIndices.includes(i) : this.selectedIndex === i;
  }

  select(i: number): void {
    if (this.multiple) {
      this.selectedIndices = this.isSelected(i)
        ? this.selectedIndices.filter(x => x !== i)
        : [...this.selectedIndices, i];
      this.selectionChange.emit(this.selectedIndices);
    } else {
      this.selectedIndex = i;
      this.selectionChange.emit(i);
    }
  }
}

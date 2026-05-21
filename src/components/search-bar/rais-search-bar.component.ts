import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Search Bar — RAIS Inputs component
 *
 * 40px tall search input with optional label + instructions.
 * Uses boxicon: assets/boxicons/bx-search.svg
 */
export type SearchBarState = 'empty' | 'entered' | 'mouse-enter';

@Component({
  selector: 'rais-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rais-search-bar.component.html',
  styleUrls: ['./rais-search-bar.component.scss'],
})
export class RaisSearchBarComponent {
  /** Label text — pass false (or empty string) to hide */
  @Input() label: string | false = 'Label';
  /** Show instructions text */
  @Input() instructions: boolean = true;
  /** Visual state */
  @Input() state: SearchBarState = 'empty';
  /** Current input value */
  @Input() value: string = '';

  get showLabel(): boolean {
    return this.label !== false && this.label !== '';
  }
  get isFocus(): boolean {
    return this.state === 'mouse-enter';
  }
  get isEntered(): boolean {
    return this.state === 'entered';
  }
}

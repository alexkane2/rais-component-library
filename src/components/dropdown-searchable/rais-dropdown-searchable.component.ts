import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Dropdown - Searchable — RAIS Inputs component
 *
 * Type-ahead search field with optional results panel.
 *
 * Icons:
 *   bx-x-large-spacing.svg — clear/dismiss (the design-system close glyph)
 *   bx-caret-down.svg — closed caret
 */
export type SearchableState = 'default' | 'selection' | 'active' | 'error';

export interface SearchableOption {
  name: string;
  detail?: string;
}

@Component({
  selector: 'rais-dropdown-searchable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rais-dropdown-searchable.component.html',
  styleUrls: ['./rais-dropdown-searchable.component.scss'],
})
export class RaisDropdownSearchableComponent {
  /** Field label */
  @Input() label: string = 'Label';
  /** Show "(Optional)" hint */
  @Input() optional: boolean = false;
  /** Show the instructions line */
  @Input() instructions: boolean = true;
  /** Visual state */
  @Input() state: SearchableState = 'default';
  /** Error message shown in 'error' state */
  @Input() errorMessage: string = 'Error message.';
  /** Options shown when active (searching) */
  @Input() options: SearchableOption[] = [
    { name: '128 Plumbing Heating Inc', detail: '78 Foundry Street, Wakefield, MA 01880' },
    { name: '3D Plumbing Heating Inc',  detail: '140 Grove St Apt 1, Clinton, MA 01510' },
    { name: '4 H Plumbing Inc',         detail: '' },
    { name: 'A Advantage Plumbing',     detail: '34625 Cedar Avenue, Yucaipa, CA 92399' },
    { name: 'A Plus Plumbing LLC',      detail: '25 Sycamore Avenue, Gustine, CA 92794' },
  ];

  get isError(): boolean     { return this.state === 'error'; }
  get isActive(): boolean    { return this.state === 'active'; }
  get isSelection(): boolean { return this.state === 'selection'; }

  get inputValue(): string {
    if (this.isActive) return 'plum';
    if (this.isSelection) return '3D Plumbing Heating Inc';
    return '';
  }

  get iconFile(): string {
    return (this.isSelection || this.isActive) ? 'bx-x-large-spacing' : 'bx-caret-down';
  }
}

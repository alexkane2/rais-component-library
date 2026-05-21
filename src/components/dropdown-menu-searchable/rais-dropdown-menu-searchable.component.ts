import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Dropdown Menu - Searchable — RAIS Inputs component
 *
 * Two-line option list with bold name and lighter detail line. Used as the
 * results panel for the searchable dropdown.
 */
export interface SearchableMenuOption {
  name: string;
  detail?: string;
}

@Component({
  selector: 'rais-dropdown-menu-searchable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-dropdown-menu-searchable.component.html',
  styleUrls: ['./rais-dropdown-menu-searchable.component.scss'],
})
export class RaisDropdownMenuSearchableComponent {
  /** Menu options to render */
  @Input() options: SearchableMenuOption[] = [
    { name: '128 Plumbing Heating Inc', detail: '78 Foundry Street, Wakefield, MA 01880' },
    { name: '3D Plumbing Heating Inc',  detail: '140 Grove St Apt 1, Clinton, MA 01510' },
    { name: '4 H Plumbing Inc',         detail: '' },
    { name: 'A Advantage Plumbing',     detail: '34625 Cedar Avenue, Yucaipa, CA 92399' },
    { name: 'A Plus Plumbing LLC',      detail: '25 Sycamore Avenue, Gustine, CA 92794' },
  ];
  /** Index of selected option (-1 for none) */
  @Input() selectedIndex: number = -1;
  /** Whether to show the decorative scrollbar */
  @Input() showScrollbar: boolean = true;
}

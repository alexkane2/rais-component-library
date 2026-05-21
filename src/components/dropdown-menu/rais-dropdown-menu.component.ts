import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Dropdown Menu — RAIS Inputs component
 *
 * Standalone menu container: list of options with optional selection
 * highlight and an optional decorative scrollbar.
 */
@Component({
  selector: 'rais-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-dropdown-menu.component.html',
  styleUrls: ['./rais-dropdown-menu.component.scss'],
})
export class RaisDropdownMenuComponent {
  /** Menu options to render */
  @Input() options: string[] = [
    'Option', 'Option', 'Option', 'Option', 'Option',
    'Option', 'Option', 'Option', 'Option',
  ];
  /** Index of selected option (-1 for none) */
  @Input() selectedIndex: number = -1;
  /** Whether to show the decorative scrollbar */
  @Input() showScrollbar: boolean = true;
}

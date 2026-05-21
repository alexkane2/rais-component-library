import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Accordion Link — RAIS Actions component
 *
 * Two styles:
 *   Caret — chevron icon on the RIGHT (bxs-chevron-down / bxs-chevron-up)
 *   Plus  — plus/minus icon on the LEFT (bxs-plus-circle / bx-minus)
 *
 * Usage in an Angular template:
 *   <rais-accordion-link label="Label" style="caret" size="medium" state="default" [open]="false"></rais-accordion-link>
 */
export type AccordionLinkStyle = 'caret' | 'plus';
export type AccordionLinkSize = 'large' | 'medium' | 'small';
export type AccordionLinkState = 'default' | 'hover';

@Component({
  selector: 'rais-accordion-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-accordion-link.component.html',
  styleUrls: ['./rais-accordion-link.component.scss'],
})
export class RaisAccordionLinkComponent {
  /** Link label text. */
  @Input() label: string = 'Label';
  /** Style — caret (chevron right) or plus (plus/minus left). */
  @Input() style: AccordionLinkStyle = 'caret';
  /** Size — drives both font size/weight and icon size. */
  @Input() size: AccordionLinkSize = 'medium';
  /** State — default or hover. */
  @Input() state: AccordionLinkState = 'default';
  /** Expanded vs collapsed — swaps the icon. */
  @Input() open: boolean = false;

  get iconFile(): string {
    if (this.style === 'caret') {
      return this.open ? 'bxs-chevron-up' : 'bxs-chevron-down';
    }
    return this.open ? 'bx-minus' : 'bxs-plus-circle';
  }
}

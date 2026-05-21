import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Content Card — RAIS Content component
 *
 * A 358px-wide info card used to surface a heading, supporting copy, and an
 * optional CTA. Mirrors the Figma component at file cCX0CnHdQeFNhZBkP12aWS,
 * node 195:3580 — which collapses 13 layout permutations into 3 properties:
 *
 *   type       — Standard | With Link | List | Standard Link | Small Link |
 *                Standard No CTA | Small No Link
 *   alignment  — Left | Centered     (drives header/paragraph text-align +
 *                                     button width behavior)
 *   color      — White | Blue        (Blue only meaningful for `list`)
 *
 * Usage:
 *   <rais-content-card type="standard" alignment="centered"></rais-content-card>
 *   <rais-content-card type="list" color="blue" [listItems]="rows"></rais-content-card>
 */
export type ContentCardType =
  | 'standard'
  | 'with-link'
  | 'list'
  | 'standard-link'
  | 'small-link'
  | 'standard-no-cta'
  | 'small-no-link';

export type ContentCardAlignment = 'left' | 'centered';
export type ContentCardColor = 'white' | 'blue';

export interface ContentCardListItem {
  label: string;
  value: string;
}

@Component({
  selector: 'rais-content-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-content-card.component.html',
  styleUrls: ['./rais-content-card.component.scss'],
})
export class RaisContentCardComponent {
  /** Layout variant. */
  @Input() type: ContentCardType = 'standard';
  /** Text alignment of header/paragraph and button width behavior. */
  @Input() alignment: ContentCardAlignment = 'left';
  /** Background/accent color (only meaningful for `type='list'`). */
  @Input() color: ContentCardColor = 'white';

  /** Heading text. */
  @Input() header: string = 'Header';
  /** Body copy. */
  @Input() paragraph: string =
    'Lorem ipsum dolor sit amet consectetur. Amet lectus nulla sed erat dictum non. Leo orci elit mattis tempus egestas.';
  /** CTA label. */
  @Input() ctaLabel: string = 'Call to Action';
  /** Show the CTA button on `type='standard'` + `alignment='left'`. */
  @Input() showCta: boolean = true;

  /** Label/value rows shown when `type='list'`. */
  @Input() listItems: ContentCardListItem[] = [
    { label: 'Label 1', value: 'Content' },
    { label: 'Label 2', value: 'Content' },
    { label: 'Label 3', value: 'Content' },
  ];

  // ─── derived flags used by the template ──────────────────────────
  get isList(): boolean { return this.type === 'list'; }
  get isStandard(): boolean { return this.type === 'standard'; }
  get isStandardNoCta(): boolean { return this.type === 'standard-no-cta'; }
  get isSmallLink(): boolean { return this.type === 'small-link'; }
  get isSmallNoLink(): boolean { return this.type === 'small-no-link'; }

  /** Card has a filled CTA button (List always, Standard when showCta). */
  get hasInlineButton(): boolean {
    return this.isList || (this.isStandard && this.showCta);
  }
  /** Button should fill the card width (List + any Centered Standard). */
  get isFullWidthButton(): boolean {
    return this.isList || (this.isStandard && this.alignment === 'centered');
  }
  /** Smaller "inline" button styling (Standard + Left only). */
  get isSmallButton(): boolean {
    return this.isStandard && this.alignment === 'left';
  }
  /** Renders a bordered-top section with a link CTA underneath the content. */
  get hasBorderedCta(): boolean {
    return this.type === 'standard-link' || this.type === 'with-link';
  }
}

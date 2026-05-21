import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Colorful Label Chips — RAIS Labeling component
 *
 * 12 colors × 3 sizes = 36 Figma variants.
 *
 * Usage in an Angular template:
 *   <rais-colorful-label-chips label="Label" color="gray-blue" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
 */
export type ColorfulLabelChipColor =
  | 'gray-blue'
  | 'periwinkle'
  | 'teal'
  | 'forest-green'
  | 'pea-green'
  | 'yellow'
  | 'orange'
  | 'pink'
  | 'magenta'
  | 'warm-gray'
  | 'standard-blue'
  | 'standard-gray';

export type ColorfulLabelChipSize = 'small' | 'medium' | 'large';

const COLOR_MAP: Record<ColorfulLabelChipColor, { text: string; bg: string; filter: string }> = {
  'gray-blue':     { text: '#293B52', bg: '#E1EAF4', filter: 'invert(21%) sepia(15%) saturate(1200%) hue-rotate(180deg)' },
  'periwinkle':    { text: '#1E4D66', bg: '#E3F5FF', filter: 'invert(28%) sepia(20%) saturate(1000%) hue-rotate(170deg)' },
  'teal':          { text: '#15545A', bg: '#D8F6F8', filter: 'invert(28%) sepia(60%) saturate(800%) hue-rotate(140deg)' },
  'forest-green':  { text: '#084F47', bg: '#DEFAEB', filter: 'invert(25%) sepia(80%) saturate(700%) hue-rotate(130deg)' },
  'pea-green':     { text: '#254909', bg: '#E7F5E1', filter: 'invert(20%) sepia(60%) saturate(900%) hue-rotate(60deg)' },
  'yellow':        { text: '#6F590D', bg: '#FFF8DC', filter: 'invert(35%) sepia(60%) saturate(900%) hue-rotate(15deg)' },
  'orange':        { text: '#893C08', bg: '#FFEFE4', filter: 'invert(25%) sepia(80%) saturate(2000%) hue-rotate(0deg)' },
  'pink':          { text: '#751336', bg: '#FBE8E9', filter: 'invert(15%) sepia(50%) saturate(2500%) hue-rotate(310deg)' },
  'magenta':       { text: '#54143F', bg: '#EFE3EB', filter: 'invert(13%) sepia(60%) saturate(2000%) hue-rotate(280deg)' },
  'warm-gray':     { text: '#3B3434', bg: '#F4EFEF', filter: 'invert(20%) sepia(5%) saturate(300%) hue-rotate(0deg)' },
  'standard-blue': { text: '#004288', bg: '#EDF6FC', filter: 'invert(20%) sepia(80%) saturate(1500%) hue-rotate(195deg)' },
  'standard-gray': { text: '#454545', bg: '#F3F3F3', filter: 'invert(25%) sepia(0%) saturate(0%) hue-rotate(0deg)' },
};

const SIZE_SPECS: Record<ColorfulLabelChipSize, {
  padding: string;
  gap: string;
  fontSize: string;
  iconSize: number;
}> = {
  small:  { padding: '4px 8px',   gap: '4px', fontSize: '10px', iconSize: 10 },
  medium: { padding: '4px 12px',  gap: '4px', fontSize: '12px', iconSize: 12 },
  large:  { padding: '6px 16px',  gap: '8px', fontSize: '13px', iconSize: 14 },
};

@Component({
  selector: 'rais-colorful-label-chips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-colorful-label-chips.component.html',
  styleUrls: ['./rais-colorful-label-chips.component.scss'],
})
export class RaisColorfulLabelChipsComponent {
  /** Chip label text. */
  @Input() label: string = 'Label';
  /** Color theme — each uses the -600 token for text/icon and -100 token for bg. */
  @Input() color: ColorfulLabelChipColor = 'gray-blue';
  /** Size — drives font size, padding, gap, and icon size. */
  @Input() size: ColorfulLabelChipSize = 'medium';
  /** Boxicons file name (without .svg). Empty string for no icon. */
  @Input() icon: string = 'bxs-inbox';

  get bg(): string { return COLOR_MAP[this.color].bg; }
  get text(): string { return COLOR_MAP[this.color].text; }
  get filter(): string { return COLOR_MAP[this.color].filter; }

  get padding(): string { return SIZE_SPECS[this.size].padding; }
  get gap(): string { return SIZE_SPECS[this.size].gap; }
  get fontSize(): string { return SIZE_SPECS[this.size].fontSize; }
  get iconSize(): number { return SIZE_SPECS[this.size].iconSize; }
}

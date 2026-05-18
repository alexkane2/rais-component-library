/**
 * SelectionLabel.utils.ts
 * Shared chip render utility — imported by DropdownMultiselect.stories.ts
 *
 * Icons: public/assets/boxicons/bx-x.svg
 * Angular usage: <img src="assets/boxicons/bx-x.svg" width="8" height="8" />
 */

export const SELECTION_LABEL_STYLES = `
  <style>
    :root {
      --color-chip-bg: #EDF6FC;
      --color-chip-border: #007CBD;
      --color-chip-text: #4D586A;
      --font-family: 'Figtree', sans-serif;
    }

    /* Squared: padding T4 R6 B4 L8, gap 4px, radius 4px */
    .rais-sel-label--squared {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 4px 6px 4px 8px;
      background: var(--color-chip-bg);
      border: 1px solid var(--color-chip-border);
      border-radius: 4px;
      font-family: var(--font-family);
      font-size: 12px; font-weight: 500;
      color: var(--color-chip-text);
      white-space: nowrap;
    }

    /* Rounded: padding T4 R8 B4 L10, gap 4px, radius 16px */
    .rais-sel-label--rounded {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 4px 8px 4px 10px;
      background: var(--color-chip-bg);
      border: 1px solid var(--color-chip-border);
      border-radius: 16px;
      font-family: var(--font-family);
      font-size: 12px; font-weight: 500;
      color: var(--color-chip-text);
      white-space: nowrap;
    }

    /* Dismiss icon: 14x14 frame, 8x8 SVG */
    .rais-sel-label__icon {
      width: 14px; height: 14px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; cursor: pointer;
    }

    /* Tint the dismiss icon to match chip border color */
    .rais-sel-label__icon img {
      filter: invert(35%) sepia(87%) saturate(500%) hue-rotate(170deg);
    }
  </style>
`;

export function renderSelectionLabel({ label, style }: { label?: string; style?: 'squared' | 'rounded' }) {
  const cls = style === 'rounded' ? 'rais-sel-label--rounded' : 'rais-sel-label--squared';
  return `
    ${SELECTION_LABEL_STYLES}
    <span class="${cls}">
      ${label ?? 'Label'}
      <span class="rais-sel-label__icon">
        <img src="assets/boxicons/bx-x.svg" width="8" height="8" alt="dismiss" />
      </span>
    </span>
  `;
}

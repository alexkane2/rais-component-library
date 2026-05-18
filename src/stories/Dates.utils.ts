/**
 * Dates.utils.ts
 * Shared date cell render utility — imported by Calendar.stories.ts
 * Source of truth for .Dates component from Figma
 *
 * .Dates variants (37x41, padding T8 R8 B8 L8, radius 4):
 *   Other Month  — #8D9091 text, no bg, no border
 *   Unselected   — #333333 text, no bg, no border
 *   Selected     — #007CBD text, #EDF6FC bg, no border
 *   Hover        — #007CBD text, no bg, #DCDCDC border
 */

export const DATES_STYLES = `
  <style>
    /* ── Date cell: 37x41, padding T8 R8 B8 L8, radius 4 ── */
    .rais-date {
      width: 37px;
      height: 41px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 8px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .rais-date__num {
      font-family: 'Figtree', sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 1;
    }

    /* Other Month: #8D9091, no bg */
    .rais-date--other-month .rais-date__num { color: #8D9091; }

    /* Unselected: #333333, no bg */
    .rais-date--unselected .rais-date__num { color: #333333; }

    /* Selected: #007CBD text, #EDF6FC bg */
    .rais-date--selected {
      background: #EDF6FC;
    }
    .rais-date--selected .rais-date__num { color: #007CBD; }

    /* Hover: #007CBD text, #DCDCDC border */
    .rais-date--hover {
      border: 1px solid #DCDCDC;
    }
    .rais-date--hover .rais-date__num { color: #007CBD; }
  </style>
`;

export type DateState = 'other-month' | 'unselected' | 'selected' | 'hover';

export function renderDateCell(num: number | string, state: DateState = 'unselected') {
  return `
    <div class="rais-date rais-date--${state}">
      <span class="rais-date__num">${num}</span>
    </div>
  `;
}

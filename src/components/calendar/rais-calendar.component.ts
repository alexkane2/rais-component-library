import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Calendar — RAIS Inputs component
 *
 * A 299px-wide month view with previous/next chevrons, month + year
 * dropdowns, a weekday header (Mo–Su), and a 7-column day grid.
 *
 * Each day cell uses the .Dates sub-component, which has four states:
 *   - other-month (greyed out, days bleeding in from adjacent months)
 *   - unselected
 *   - selected   (#EDF6FC background, #007CBD text)
 *   - hover      (#DCDCDC border, #007CBD text)
 *
 * Icons are loaded from /assets/boxicons/ — make sure the Storybook
 * static-dir or Angular app serves that path.
 */
export type DateCellState = 'other-month' | 'unselected' | 'selected' | 'hover';

export interface DateCell {
  num: number | string;
  state: DateCellState;
}

@Component({
  selector: 'rais-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-calendar.component.html',
  styleUrls: ['./rais-calendar.component.scss'],
})
export class RaisCalendarComponent {
  /** Month label shown in the month dropdown (e.g. "Feb"). */
  @Input() month: string = 'Feb';
  /** Year label shown in the year dropdown (e.g. "2024"). */
  @Input() year: string = '2024';
  /** Optional week grid override — 6 rows of 7 cells if provided. */
  @Input() weeks?: DateCell[][];

  /** Weekday header labels. */
  readonly dayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  /** Default Feb 2024 grid — matches the original story exactly. */
  private readonly FEB_2024: DateCell[][] = [
    [
      { num: 28, state: 'other-month' }, { num: 29, state: 'other-month' },
      { num: 30, state: 'other-month' }, { num: 31, state: 'other-month' },
      { num: 1,  state: 'unselected'  }, { num: 2,  state: 'unselected'  },
      { num: 3,  state: 'unselected'  },
    ],
    [
      { num: 4,  state: 'unselected' }, { num: 5,  state: 'unselected' },
      { num: 6,  state: 'unselected' }, { num: 7,  state: 'unselected' },
      { num: 8,  state: 'unselected' }, { num: 9,  state: 'unselected' },
      { num: 10, state: 'unselected' },
    ],
    [
      { num: 11, state: 'unselected' }, { num: 12, state: 'unselected' },
      { num: 13, state: 'unselected' }, { num: 14, state: 'unselected' },
      { num: 15, state: 'selected'   }, { num: 16, state: 'unselected' },
      { num: 17, state: 'unselected' },
    ],
    [
      { num: 18, state: 'unselected' }, { num: 19, state: 'unselected' },
      { num: 20, state: 'unselected' }, { num: 21, state: 'unselected' },
      { num: 22, state: 'unselected' }, { num: 23, state: 'unselected' },
      { num: 24, state: 'unselected' },
    ],
    [
      { num: 25, state: 'unselected'  }, { num: 26, state: 'unselected'  },
      { num: 27, state: 'unselected'  }, { num: 28, state: 'unselected'  },
      { num: 1,  state: 'other-month' }, { num: 2,  state: 'other-month' },
      { num: 3,  state: 'other-month' },
    ],
  ];

  get weekRows(): DateCell[][] {
    return this.weeks ?? this.FEB_2024;
  }
}

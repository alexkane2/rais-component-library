import type { Meta, StoryObj } from '@storybook/html';
import { DATES_STYLES, renderDateCell } from './Dates.utils';

/**
 * Calendar — RAIS Inputs component
 * Uses .Dates sub-component (Dates.utils.ts)
 * Icons: public/assets/boxicons/
 *   bx-chevron-left.svg  — prev month
 *   bx-chevron-right.svg — next month
 *   bx-caret-down.svg    — month/year dropdowns
 * Angular: <img src="assets/boxicons/bx-chevron-left.svg" width="20" height="20" />
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&display=swap');
    :root {
      --color-text-default: #454545;
      --color-border: #DCDCDC;
      --color-bg-calendar: #F3F3F3;
      --color-bg-white: #FFFFFF;
      --color-action: #007CBD;
      --font-family: 'Figtree', sans-serif;
    }

    .rais-calendar {
      width:299px; background:var(--color-bg-calendar);
      border:1px solid var(--color-border); border-radius:4px;
      padding:12px 0 0 0; display:flex; flex-direction:column;
      align-items:center; font-family:var(--font-family); box-sizing:border-box;
    }

    .rais-calendar__nav { display:flex; flex-direction:row; align-items:center; gap:12px; padding-bottom:12px; }

    /* Chevron: 24x24, tinted blue */
    .rais-calendar__chevron {
      width:24px; height:24px; display:flex; align-items:center;
      justify-content:center; cursor:pointer; flex-shrink:0;
    }
    .rais-calendar__chevron img {
      filter: invert(35%) sepia(87%) saturate(500%) hue-rotate(170deg);
    }

    /* Month/Year dropdowns: 90x40 */
    .rais-calendar__dropdown {
      width:90px; height:40px; padding:8px 16px;
      background:var(--color-bg-white); border:1px solid #CCCCCC;
      border-radius:4px; display:flex; flex-direction:row;
      align-items:center; justify-content:space-between;
      gap:8px; box-sizing:border-box;
    }
    .rais-calendar__dropdown-label { font-size:14px; color:var(--color-text-default); flex:1; }
    .rais-calendar__dropdown-caret { display:flex; align-items:center; }

    /* Days header: 299x36 */
    .rais-calendar__days-header {
      width:299px; display:flex; flex-direction:row; align-items:center;
      gap:4px; padding:4px 8px; background:var(--color-bg-calendar); box-sizing:border-box;
    }
    .rais-calendar__day-label {
      width:37px; height:28px; display:flex; align-items:center;
      justify-content:center; font-size:16px; color:var(--color-text-default); flex-shrink:0;
    }

    /* Dates grid */
    .rais-calendar__dates {
      width:299px; background:var(--color-bg-white);
      padding:12px 8px; display:flex; flex-direction:column;
      gap:4px; box-sizing:border-box;
    }
    .rais-calendar__week { display:flex; flex-direction:row; gap:4px; }
  </style>
`;

const DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su'];

type DateEntry = [number | string, 'other-month' | 'unselected' | 'selected' | 'hover'];

const FEB_2024: DateEntry[][] = [
  [[28,'other-month'],[29,'other-month'],[30,'other-month'],[31,'other-month'],[1,'unselected'],[2,'unselected'],[3,'unselected']],
  [[4,'unselected'],[5,'unselected'],[6,'unselected'],[7,'unselected'],[8,'unselected'],[9,'unselected'],[10,'unselected']],
  [[11,'unselected'],[12,'unselected'],[13,'unselected'],[14,'unselected'],[15,'selected'],[16,'unselected'],[17,'unselected']],
  [[18,'unselected'],[19,'unselected'],[20,'unselected'],[21,'unselected'],[22,'unselected'],[23,'unselected'],[24,'unselected']],
  [[25,'unselected'],[26,'unselected'],[27,'unselected'],[28,'unselected'],[1,'other-month'],[2,'other-month'],[3,'other-month']],
];

function renderCalendar({ month, year, weeks }: any) {
  const m = month ?? 'Feb';
  const y = year  ?? '2024';
  const calendarWeeks: DateEntry[][] = weeks ?? FEB_2024;

  return `
    ${RAIS_STYLES}
    ${DATES_STYLES}
    <div class="rais-calendar">
      <div class="rais-calendar__nav">
        <span class="rais-calendar__chevron">
          <img src="assets/boxicons/bx-chevron-left.svg" width="20" height="20" alt="previous month" />
        </span>
        <div style="display:flex;gap:8px;">
          <div class="rais-calendar__dropdown">
            <span class="rais-calendar__dropdown-label">${m}</span>
            <span class="rais-calendar__dropdown-caret">
              <img src="assets/boxicons/bx-caret-down.svg" width="14" height="14" alt="caret" />
            </span>
          </div>
          <div class="rais-calendar__dropdown">
            <span class="rais-calendar__dropdown-label">${y}</span>
            <span class="rais-calendar__dropdown-caret">
              <img src="assets/boxicons/bx-caret-down.svg" width="14" height="14" alt="caret" />
            </span>
          </div>
        </div>
        <span class="rais-calendar__chevron">
          <img src="assets/boxicons/bx-chevron-right.svg" width="20" height="20" alt="next month" />
        </span>
      </div>
      <div class="rais-calendar__days-header">
        ${DAYS.map(d => `<span class="rais-calendar__day-label">${d}</span>`).join('')}
      </div>
      <div class="rais-calendar__dates">
        ${calendarWeeks.map(week => `
          <div class="rais-calendar__week">
            ${week.map(([num, state]) => renderDateCell(num, state)).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Inputs/Calendar',
  tags: ['autodocs'],
  argTypes: {
    month: { control: 'text' },
    year:  { control: 'text' },
  },
  render: (args) => renderCalendar(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story = { args: { month: 'Feb', year: '2024' } };

export const DateCellStates: Story = {
  render: () => `
    ${RAIS_STYLES}${DATES_STYLES}
    <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;">
      <span style="font-family:'Figtree',sans-serif;font-size:12px;color:#8D9091;">Date cell states — .Dates component</span>
      <div style="display:flex;gap:8px;align-items:center;">
        ${renderDateCell('28','other-month')}
        ${renderDateCell('28','unselected')}
        ${renderDateCell('28','selected')}
        ${renderDateCell('28','hover')}
      </div>
      <div style="display:flex;gap:8px;font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">
        <span style="width:37px;text-align:center;">Other month</span>
        <span style="width:37px;text-align:center;">Unselected</span>
        <span style="width:37px;text-align:center;">Selected</span>
        <span style="width:37px;text-align:center;">Hover</span>
      </div>
    </div>
  `,
};

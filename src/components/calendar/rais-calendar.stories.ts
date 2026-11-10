import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { RaisCalendarComponent } from './rais-calendar.component';

const meta: Meta<RaisCalendarComponent> = {
  title: 'RAIS/Inputs/Calendar',
  component: RaisCalendarComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A working month-view date picker. Mirrors the Figma `Calendar` set: previous / next chevrons, Month and ' +
          'Year selects, a Mo–Su weekday row, a 6 × 7 grid of `Calendar/Day` cells and a footer **Clear** link.\n\n' +
          '- Click a day to select it; `value` is a `Date` and `valueChange` emits it. The chevrons and selects move the view and emit `viewChange`.\n' +
          '- `minDate` / `maxDate` disable days outside the range; `minYear` / `maxYear` bound the Year select.\n' +
          '- Keyboard: arrows move between days, Home / End jump to week edges, PageUp / PageDown change the month, Enter / Space selects.\n' +
          '- **Clear** (`showClear`, on by default) removes the selection and emits `valueChange(null)` and `cleared`: an optional Date Picker returns to its empty state, a required one shows its error until a date is chosen. Hide the footer where clearing is not allowed.\n' +
          '- Works with Angular forms (`[(ngModel)]`, `formControlName`).\n\n' +
          'Day states follow the Figma `Calendar/Day` set: default, hover, selected, today, other-month, disabled. ' +
          'Styling uses the RAIS tokens only; the Clear link is the Text Button/Link (Large, Blue) treatment.',
      },
    },
  },
  decorators: [
    moduleMetadata({ imports: [RaisCalendarComponent, FormsModule] }),
  ],
  argTypes: {
    value: { control: 'date', description: 'Selected date (Date, ISO string, or null)' },
    minDate: { control: 'date', description: 'Earliest selectable date' },
    maxDate: { control: 'date', description: 'Latest selectable date' },
    month: { control: { type: 'number', min: 0, max: 11 }, description: 'Month shown when there is no value (0–11)' },
    year: { control: 'number', description: 'Year shown when there is no value' },
    minYear: { control: 'number', description: 'First year in the Year select' },
    maxYear: { control: 'number', description: 'Last year in the Year select' },
    firstDayOfWeek: { control: 'radio', options: [1, 0], description: '1 = Monday, 0 = Sunday' },
    showOtherMonths: { control: 'boolean', description: 'Show the gray fill-in days from adjacent months' },
    showToday: { control: 'boolean', description: "Ring today's date" },
    disabled: { control: 'boolean', description: 'Disable the whole calendar' },
    showClear: { control: 'boolean', description: 'Show the footer Clear link' },
    clearLabel: { control: 'text', description: 'Label of the footer Clear link' },
    valueChange: { action: 'valueChange', description: 'Emits the selected date, or null when cleared' },
    viewChange: { action: 'viewChange', description: 'Emits `{ month, year }` when the view moves' },
    cleared: { action: 'cleared', description: 'Emits when the footer Clear link removes the selection' },
  },
};

export default meta;
type Story = StoryObj<RaisCalendarComponent>;

/** Today's month, nothing selected. Click any day to select it. */
export const Default: Story = {
  args: {},
};

/** Matches the design prototype: February 2013 with the 15th selected. */
export const WithSelectedDate: Story = {
  args: { value: new Date(2013, 1, 15), showToday: false },
};

/** Days before `minDate` or after `maxDate` are disabled; chevrons stop at the range. */
export const WithMinAndMax: Story = {
  name: 'With Min / Max Dates',
  args: {
    value: new Date(2026, 10, 10),
    minDate: new Date(2026, 10, 3),
    maxDate: new Date(2026, 11, 20),
    minYear: 2026,
    maxYear: 2026,
  },
};

/** Week starts on Sunday. */
export const SundayStart: Story = {
  args: { firstDayOfWeek: 0, value: new Date(2026, 6, 4) },
};

/** Adjacent-month days hidden. */
export const CurrentMonthOnly: Story = {
  args: { showOtherMonths: false, value: new Date(2026, 2, 18) },
};

/** The footer Clear link removes the selection and emits `valueChange(null)`. */
export const WithClear: Story = {
  args: { value: new Date(2026, 1, 15), showToday: false, showClear: true },
};

/** No footer: for pickers where clearing is not allowed. */
export const WithoutClear: Story = {
  args: { value: new Date(2026, 1, 15), showToday: false, showClear: false },
};

export const Disabled: Story = {
  args: { disabled: true, value: new Date(2026, 4, 12) },
};

/** Two-way binding with ngModel; the picked date prints below. */
export const WithNgModel: Story = {
  name: 'With ngModel',
  render: (args) => ({
    props: { ...args, picked: new Date(2026, 10, 2) },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;font-family:var(--font-family-text);">
        <rais-calendar [(ngModel)]="picked" [showToday]="showToday"></rais-calendar>
        <span style="font-size:14px;color:var(--color-text-secondary);">Picked: {{ picked | date: 'MM/dd/yyyy' }}</span>
      </div>
    `,
  }),
  args: { showToday: true },
};

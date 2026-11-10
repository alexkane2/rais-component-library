import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { RaisCalendarComponent } from './rais-calendar.component';

const meta: Meta<RaisCalendarComponent> = {
  title: 'RAIS/Inputs/Calendar',
  component: RaisCalendarComponent,
  tags: ['autodocs'],
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
    showOtherMonths: { control: 'boolean' },
    showToday: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showClear: { control: 'boolean' },
    clearLabel: { control: 'text' },
    valueChange: { action: 'valueChange' },
    cleared: { action: 'cleared' },
    viewChange: { action: 'viewChange' },
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

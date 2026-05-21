import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisCalendarComponent } from './rais-calendar.component';

const meta: Meta<RaisCalendarComponent> = {
  title: 'RAIS/Inputs/Calendar',
  component: RaisCalendarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RaisCalendarComponent],
    }),
  ],
  argTypes: {
    month: { control: 'text', description: 'Month label (e.g. "Feb")' },
    year:  { control: 'text', description: 'Year label (e.g. "2024")' },
  },
};

export default meta;
type Story = StoryObj<RaisCalendarComponent>;

export const Default: Story = {
  args: { month: 'Feb', year: '2024' },
};

export const DateCellStates: Story = {
  name: 'DateCellStates',
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
        <span style="font-size:12px;color:#8D9091;">Date cell states — .Dates component</span>
        <div style="display:flex;gap:8px;align-items:center;">
          <div class="rais-date rais-date--other-month" style="width:37px;height:41px;display:flex;align-items:center;justify-content:center;border-radius:4px;padding:8px;box-sizing:border-box;">
            <span style="font-family:'Figtree',sans-serif;font-size:16px;font-weight:500;color:#8D9091;line-height:1;">28</span>
          </div>
          <div class="rais-date rais-date--unselected" style="width:37px;height:41px;display:flex;align-items:center;justify-content:center;border-radius:4px;padding:8px;box-sizing:border-box;">
            <span style="font-family:'Figtree',sans-serif;font-size:16px;font-weight:500;color:#333333;line-height:1;">28</span>
          </div>
          <div class="rais-date rais-date--selected" style="width:37px;height:41px;display:flex;align-items:center;justify-content:center;border-radius:4px;padding:8px;box-sizing:border-box;background:#EDF6FC;">
            <span style="font-family:'Figtree',sans-serif;font-size:16px;font-weight:500;color:#007CBD;line-height:1;">28</span>
          </div>
          <div class="rais-date rais-date--hover" style="width:37px;height:41px;display:flex;align-items:center;justify-content:center;border-radius:4px;padding:8px;box-sizing:border-box;border:1px solid #DCDCDC;">
            <span style="font-family:'Figtree',sans-serif;font-size:16px;font-weight:500;color:#007CBD;line-height:1;">28</span>
          </div>
        </div>
        <div style="display:flex;gap:8px;font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">
          <span style="width:37px;text-align:center;">Other month</span>
          <span style="width:37px;text-align:center;">Unselected</span>
          <span style="width:37px;text-align:center;">Selected</span>
          <span style="width:37px;text-align:center;">Hover</span>
        </div>
      </div>
    `,
  }),
};

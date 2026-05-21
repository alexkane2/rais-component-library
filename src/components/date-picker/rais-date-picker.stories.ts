import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisDatePickerComponent } from './rais-date-picker.component';

const meta: Meta<RaisDatePickerComponent> = {
  title: 'RAIS/Inputs/Date Picker',
  component: RaisDatePickerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RaisDatePickerComponent],
    }),
  ],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean' },
    value:        { control: 'text', description: 'MM/DD/YYYY format' },
    state:        { control: 'select', options: ['empty', 'filled', 'focus', 'error'] },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<RaisDatePickerComponent>;

export const Empty: Story = {
  args: { label: 'Label', state: 'empty', instructions: true },
};

export const Filled: Story = {
  args: { label: 'Label', state: 'filled', value: '12/21/2024', instructions: true },
};

export const OnFocus: Story = {
  args: { label: 'Label', state: 'focus', value: '12/21/2024', instructions: true },
};

export const Error: Story = {
  args: { label: 'Label', state: 'error', value: '12/21/2024', instructions: true, errorMessage: 'Error message.' },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'empty', instructions: true },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;">
        <rais-date-picker label="Empty"    state="empty"                          [instructions]="true"></rais-date-picker>
        <rais-date-picker label="Filled"   state="filled" value="12/21/2024"      [instructions]="true"></rais-date-picker>
        <rais-date-picker label="On Focus" state="focus"  value="12/21/2024"      [instructions]="true"></rais-date-picker>
        <rais-date-picker label="Error"    state="error"  value="12/21/2024"      [instructions]="true" errorMessage="Error message."></rais-date-picker>
      </div>
    `,
  }),
};

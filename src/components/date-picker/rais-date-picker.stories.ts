import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { RaisDatePickerComponent } from './rais-date-picker.component';

const meta: Meta<RaisDatePickerComponent> = {
  title: 'RAIS/Inputs/Date Picker',
  component: RaisDatePickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The date field: label, optional hint, instructions, a MM/DD/YYYY value or placeholder, a clear X and the ' +
          'calendar icon. Mirrors the Figma `Date Picker` set (empty, filled, focus, error).\n\n' +
          '**Clearing.** While a date is present the X (`showClear`) removes it and emits `cleared` and `valueChange("")`:\n\n' +
          '- optional field → back to the empty state (placeholder, no error);\n' +
          '- `required` field → the error state with `requiredMessage` until a new date is chosen.\n\n' +
          'The open **Calendar** offers the same Clear action in its footer. The field does not open a calendar itself: ' +
          '`calendarClicked` fires from the icon so the page can show one.\n\n' +
          'Width is fluid: wrap it to size it (these stories use 350px). Icons are Boxicons masks colored with ' +
          '`--color-icon-secondary` / `--color-icon-focused`; borders use `--color-border-default/-focus/-error`.',
      },
    },
  },
  decorators: [
    moduleMetadata({ imports: [RaisDatePickerComponent] }),
    componentWrapperDecorator((story) => `<div style="width:350px">${story}</div>`),
  ],
  argTypes: {
    label:            { control: 'text', description: 'Field label' },
    optional:         { control: 'boolean', description: 'Show "(Optional)" after the label' },
    instructions:     { control: 'boolean', description: 'Show the instructions line' },
    instructionsText: { control: 'text', description: 'Instructions copy; long text wraps above the field' },
    placeholder:      { control: 'text', description: 'Shown while empty' },
    value:            { control: 'text', description: 'Date in MM/DD/YYYY format' },
    state:            { control: 'select', options: ['empty', 'filled', 'focus', 'error'], description: 'Visual state — border and icon tint' },
    errorMessage:     { control: 'text', description: 'Shown under the field in the error state' },
    showClear:        { control: 'boolean', description: 'Show the X that clears the date while one is present' },
    required:         { control: 'boolean', description: 'Clearing a required field shows `requiredMessage` as an error' },
    requiredMessage:  { control: 'text', description: 'Error shown when a required field is cleared' },
    valueChange:      { action: 'valueChange', description: 'Emits the value after a change ("" when cleared)' },
    cleared:          { action: 'cleared', description: 'Emits when the X clears the date' },
    calendarClicked:  { action: 'calendarClicked', description: 'Emits when the calendar icon is clicked' },
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

/** Optional field: clicking the X returns it to the empty state. */
export const ClearOptional: Story = {
  args: { label: 'Expiration Date', optional: true, state: 'filled', value: '12/21/2024', instructions: false },
};

/** Required field: clicking the X shows the "Date is required." error until a date is chosen. */
export const ClearRequired: Story = {
  args: { label: 'Effective Date', required: true, state: 'filled', value: '12/21/2024', instructions: false },
};

export const WithoutClear: Story = {
  args: { label: 'Label', state: 'filled', value: '12/21/2024', showClear: false, instructions: true },
};

export const AllVariants: Story = {
  decorators: [componentWrapperDecorator((story) => `<div style="width:auto">${story}</div>`)],
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;width:350px;">
        <rais-date-picker label="Empty"    state="empty"                          [instructions]="true"></rais-date-picker>
        <rais-date-picker label="Filled"   state="filled" value="12/21/2024"      [instructions]="true"></rais-date-picker>
        <rais-date-picker label="On Focus" state="focus"  value="12/21/2024"      [instructions]="true"></rais-date-picker>
        <rais-date-picker label="Error"    state="error"  value="12/21/2024"      [instructions]="true" errorMessage="Error message."></rais-date-picker>
      </div>
    `,
  }),
};

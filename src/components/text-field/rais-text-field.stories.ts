import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisTextFieldComponent } from './rais-text-field.component';

const meta: Meta<RaisTextFieldComponent> = {
  title: 'RAIS/Inputs/Text Field',
  component: RaisTextFieldComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RaisTextFieldComponent],
    }),
  ],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean', description: 'Show instructions text' },
    value:        { control: 'text', description: 'Input value' },
    state: {
      control: 'select',
      options: ['default', 'filled', 'focus', 'error', 'disabled'],
      description: 'default=preview | filled=has value | focus=active | error=validation failed | disabled',
    },
    size: {
      control: 'select',
      options: ['single-line', 'multi-line'],
      description: 'Single line (40px) or multi-line textarea (80px)',
    },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<RaisTextFieldComponent>;

export const Default: Story = {
  args: { label: 'Label', state: 'default', size: 'single-line', instructions: true },
};

export const Filled: Story = {
  args: { label: 'Label', value: 'Text', state: 'filled', size: 'single-line', instructions: true },
};

export const OnFocus: Story = {
  args: { label: 'Label', value: 'Text', state: 'focus', size: 'single-line', instructions: true },
};

export const Error: Story = {
  args: { label: 'Label', value: 'Text', state: 'error', size: 'single-line', instructions: true, errorMessage: 'Error message.' },
};

export const Disabled: Story = {
  args: { label: 'Label', state: 'disabled', size: 'single-line', instructions: true },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'default', size: 'single-line', instructions: true },
};

export const WithInstructions: Story = {
  args: { label: 'Label', instructions: true, state: 'default', size: 'single-line' },
};

export const MultiLine: Story = {
  args: { label: 'Label', state: 'default', size: 'multi-line', instructions: true },
};

export const MultiLineFilled: Story = {
  args: { label: 'Label', value: 'Text', state: 'filled', size: 'multi-line', instructions: true },
};

export const MultiLineError: Story = {
  args: { label: 'Label', value: 'Text', state: 'error', size: 'multi-line', instructions: true, errorMessage: 'Error message.' },
};

export const MultiLineDisabled: Story = {
  args: { label: 'Label', state: 'disabled', size: 'multi-line', instructions: true },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;">
        <rais-text-field label="Default"          state="default"  size="single-line" [instructions]="true"></rais-text-field>
        <rais-text-field label="Filled"           value="Text"     state="filled"     size="single-line" [instructions]="true"></rais-text-field>
        <rais-text-field label="On Focus"         value="Text"     state="focus"      size="single-line" [instructions]="true"></rais-text-field>
        <rais-text-field label="Error"            value="Text"     state="error"      size="single-line" [instructions]="true" errorMessage="Error message."></rais-text-field>
        <rais-text-field label="Disabled"         state="disabled" size="single-line" [instructions]="true"></rais-text-field>
        <rais-text-field label="Multi Line"       state="default"  size="multi-line"  [instructions]="true"></rais-text-field>
        <rais-text-field label="Multi Line Error" value="Text"     state="error"      size="multi-line"  [instructions]="true" errorMessage="Error message."></rais-text-field>
      </div>
    `,
  }),
};

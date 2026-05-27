import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisDropdownMultiselectComponent } from './rais-dropdown-multiselect.component';
import { RaisSelectionLabelComponent } from '../selection-label/rais-selection-label.component';

const meta: Meta<RaisDropdownMultiselectComponent> = {
  title: 'RAIS/Inputs/Dropdown - Multiselect',
  component: RaisDropdownMultiselectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisDropdownMultiselectComponent, RaisSelectionLabelComponent] }),
  ],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean' },
    state: {
      control: 'select',
      options: ['default', 'mouse-enter', 'selection', 'max-selected', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownMultiselectComponent>;

export const Default: Story = {
  args: { label: 'Label', state: 'default', instructions: true },
};

export const MouseEnter: Story = {
  args: { label: 'Label', state: 'mouse-enter', instructions: true },
};

export const Selection: Story = {
  args: { label: 'Label', state: 'selection', instructions: true },
};

export const MaxSelected: Story = {
  args: { label: 'Label', state: 'max-selected', instructions: true },
};

export const Error: Story = {
  args: { label: 'Label', state: 'error', instructions: true },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'default', instructions: true },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
        <rais-dropdown-multiselect label="Default" state="default" [instructions]="true"></rais-dropdown-multiselect>
        <rais-dropdown-multiselect label="Mouse Enter" state="mouse-enter" [instructions]="true"></rais-dropdown-multiselect>
        <rais-dropdown-multiselect label="Selection" state="selection" [instructions]="true"></rais-dropdown-multiselect>
        <rais-dropdown-multiselect label="Max Selected" state="max-selected" [instructions]="true"></rais-dropdown-multiselect>
        <rais-dropdown-multiselect label="Error" state="error" [instructions]="true"></rais-dropdown-multiselect>
      </div>
    `,
  }),
};

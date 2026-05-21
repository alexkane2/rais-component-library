import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisDropdownComponent } from './rais-dropdown.component';

const meta: Meta<RaisDropdownComponent> = {
  title: 'RAIS/Inputs/Dropdown',
  component: RaisDropdownComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisDropdownComponent] }),
  ],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean' },
    value:        { control: 'text' },
    state:        { control: 'select', options: ['default', 'filled', 'focus', 'error', 'open'] },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownComponent>;

export const Default: Story = {
  args: { label: 'Label', state: 'default' },
};

export const Filled: Story = {
  args: { label: 'Label', value: 'All', state: 'filled' },
};

export const OnFocus: Story = {
  args: { label: 'Label', state: 'focus' },
};

export const Error: Story = {
  args: { label: 'Label', state: 'error', errorMessage: 'Error message.' },
};

export const Open: Story = {
  args: { label: 'Label', state: 'open' },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'default' },
};

export const WithInstructions: Story = {
  args: { label: 'Label', instructions: true, state: 'default' },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:80px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
        <rais-dropdown label="Default" state="default"></rais-dropdown>
        <rais-dropdown label="Filled" value="All" state="filled"></rais-dropdown>
        <rais-dropdown label="On Focus" state="focus"></rais-dropdown>
        <rais-dropdown label="Error" state="error" errorMessage="Error message."></rais-dropdown>
        <rais-dropdown label="Open" state="open"></rais-dropdown>
      </div>
    `,
  }),
};

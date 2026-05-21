import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisDropdownSearchableComponent } from './rais-dropdown-searchable.component';

const meta: Meta<RaisDropdownSearchableComponent> = {
  title: 'RAIS/Inputs/Dropdown - Searchable',
  component: RaisDropdownSearchableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisDropdownSearchableComponent] }),
  ],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean' },
    state: { control: 'select', options: ['default', 'selection', 'active', 'error'] },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownSearchableComponent>;

export const Default: Story = {
  args: { label: 'Label', state: 'default', instructions: true },
};

export const Selection: Story = {
  args: { label: 'Label', state: 'selection', instructions: true },
};

export const Active: Story = {
  args: { label: 'Label', state: 'active', instructions: true },
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
      <div style="display:flex;flex-direction:column;gap:80px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
        <rais-dropdown-searchable label="Default" state="default" [instructions]="true"></rais-dropdown-searchable>
        <rais-dropdown-searchable label="Selection" state="selection" [instructions]="true"></rais-dropdown-searchable>
        <rais-dropdown-searchable label="Active / Searching" state="active" [instructions]="true"></rais-dropdown-searchable>
        <rais-dropdown-searchable label="Error" state="error" [instructions]="true"></rais-dropdown-searchable>
      </div>
    `,
  }),
};

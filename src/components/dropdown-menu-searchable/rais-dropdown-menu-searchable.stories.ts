import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisDropdownMenuSearchableComponent } from './rais-dropdown-menu-searchable.component';

const meta: Meta<RaisDropdownMenuSearchableComponent> = {
  title: 'RAIS/Inputs/Dropdown Menu - Searchable',
  component: RaisDropdownMenuSearchableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisDropdownMenuSearchableComponent] }),
  ],
  argTypes: {
    selectedIndex: { control: 'number' },
    showScrollbar: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownMenuSearchableComponent>;

export const Default: Story = {
  args: { selectedIndex: -1, showScrollbar: true },
};

export const WithSelection: Story = {
  args: { selectedIndex: 1, showScrollbar: true },
};

export const FilteredResults: Story = {
  args: {
    selectedIndex: -1,
    showScrollbar: false,
    options: [
      { name: '3D Plumbing Heating Inc', detail: '140 Grove St Apt 1, Clinton, MA 01510' },
      { name: '3D Mechanical Services',  detail: '88 Millbrook Ave, Randolph, NJ 07869' },
    ],
  },
};

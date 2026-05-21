import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisDropdownMenuComponent } from './rais-dropdown-menu.component';

const meta: Meta<RaisDropdownMenuComponent> = {
  title: 'RAIS/Inputs/Dropdown Menu',
  component: RaisDropdownMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisDropdownMenuComponent] }),
  ],
  argTypes: {
    selectedIndex: {
      control: 'number',
      description: 'Index of selected option (-1 for none)',
    },
    showScrollbar: {
      control: 'boolean',
      description: 'Show scrollbar indicator',
    },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownMenuComponent>;

export const Default: Story = {
  args: { selectedIndex: -1, showScrollbar: true },
};

export const WithSelection: Story = {
  args: { selectedIndex: 2, showScrollbar: true },
};

export const NoScrollbar: Story = {
  args: {
    selectedIndex: -1,
    showScrollbar: false,
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  },
};

export const WithRealOptions: Story = {
  args: {
    options: [
      'Agency House Account',
      'Johnson, Olivia',
      'Nicola, Sarah',
      'Wentz, Douglas',
      'Thornberg, Jeffery',
      'Tersa, Pamela',
      'Slater, Mary',
      'Anderson, Mike',
      'Roberts, James',
    ],
    selectedIndex: -1,
    showScrollbar: true,
  },
};

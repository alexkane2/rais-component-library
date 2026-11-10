import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { RaisDropdownMenuSearchableComponent } from './rais-dropdown-menu-searchable.component';

const AGENCIES = [
  { name: '128 Plumbing Heating Inc', detail: '78 Foundry Street, Wakefield, MA 01880' },
  { name: '3D Plumbing Heating Inc',  detail: '140 Grove St Apt 1, Clinton, MA 01510' },
  { name: '4 H Plumbing Inc',         detail: '' },
  { name: 'A Advantage Plumbing',     detail: '34625 Cedar Avenue, Yucaipa, CA 92399' },
  { name: 'A Plus Plumbing LLC',      detail: '25 Sycamore Avenue, Gustine, CA 92794' },
  { name: 'Plumb Perfect LLC',        detail: '14 Harbor Way, Quincy, MA 02169' },
  { name: 'Plumbers Supply Co',       detail: '221 Main Street, Lowell, MA 01852' },
  { name: 'Rapid Rooter Services',    detail: '9 Elm Street, Nashua, NH 03060' },
];

const meta: Meta<RaisDropdownMenuSearchableComponent> = {
  title: 'RAIS/Inputs/Dropdown Menu - Searchable',
  component: RaisDropdownMenuSearchableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisDropdownMenuSearchableComponent] }),
    componentWrapperDecorator((story) => `<div style="width:491px">${story}</div>`),
  ],
  argTypes: {
    selectedIndex:  { control: 'number' },
    activeIndex:    { control: 'number' },
    resultsState:   { control: 'select', options: ['default', 'filtered', 'no-results', 'loading'] },
    query:          { control: 'text' },
    maxVisibleRows: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownMenuSearchableComponent>;

/** The full list on open; eight agencies stop at five rows and scroll. */
export const Default: Story = {
  args: { options: AGENCIES, selectedIndex: -1, activeIndex: -1, resultsState: 'default' },
};

export const WithSelection: Story = {
  args: { options: AGENCIES, selectedIndex: 1, activeIndex: -1, resultsState: 'default' },
};

/** Only the matches for "plum"; the first one is keyboard-active so Enter commits it. */
export const Filtered: Story = {
  args: {
    options: AGENCIES.filter((a) => /plum/i.test(a.name)).slice(0, 3),
    selectedIndex: -1,
    activeIndex: 0,
    resultsState: 'filtered',
    query: 'plum',
  },
};

export const NoResults: Story = {
  args: { options: [], resultsState: 'no-results', query: 'plumx' },
};

export const Loading: Story = {
  args: { options: [], resultsState: 'loading', query: 'plum' },
};

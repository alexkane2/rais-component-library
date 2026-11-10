import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { RaisDropdownMenuComponent } from './rais-dropdown-menu.component';

const CARRIERS = [
  'Allied Insurance', 'Amerisure', 'Chubb', 'CNA', 'The Hartford', 'Liberty Mutual',
  'Nationwide', 'Progressive', 'Safeco', 'Selective', 'Travelers', 'Zurich',
];

const meta: Meta<RaisDropdownMenuComponent> = {
  title: 'RAIS/Inputs/Dropdown Menu',
  component: RaisDropdownMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisDropdownMenuComponent] }),
    componentWrapperDecorator((story) => `<div style="width:350px">${story}</div>`),
  ],
  argTypes: {
    selectedIndex: { control: 'number', description: 'Committed option (-1 for none)' },
    activeIndex: { control: 'number', description: 'Keyboard-active option (-1 for none)' },
    maxVisibleRows: { control: 'number', description: 'Rows shown before the list scrolls' },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownMenuComponent>;

/** Five options: the panel hugs its content, no scrollbar. */
export const Default: Story = {
  args: { options: CARRIERS.slice(0, 5), selectedIndex: -1, activeIndex: -1 },
};

export const WithSelection: Story = {
  args: { options: CARRIERS.slice(0, 5), selectedIndex: 1, activeIndex: -1 },
};

/** Keyboard focus on a row other than the committed value. */
export const KeyboardActive: Story = {
  args: { options: CARRIERS.slice(0, 5), selectedIndex: 1, activeIndex: 3 },
};

/** Twelve options: the panel stops at 8 rows and scrolls, with a real scrollbar. */
export const LongListScrolls: Story = {
  args: { options: CARRIERS, selectedIndex: 4, activeIndex: 2 },
};

/** The keyboard-active row is kept in view as it moves down a long list. */
export const LongListScrolledToBottom: Story = {
  args: { options: CARRIERS, selectedIndex: 4, activeIndex: 10 },
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:40px;align-items:flex-start;padding:24px;background:#F0F2F5;border-radius:8px;">
        <div style="width:350px">
          <div style="font-size:12px;color:#606060;margin-bottom:8px;">Short list (no scrollbar) — Allied selected</div>
          <rais-dropdown-menu [options]="short" [selectedIndex]="0"></rais-dropdown-menu>
        </div>
        <div style="width:350px">
          <div style="font-size:12px;color:#606060;margin-bottom:8px;">Long list — Hartford selected, Chubb keyboard-active</div>
          <rais-dropdown-menu [options]="long" [selectedIndex]="4" [activeIndex]="2"></rais-dropdown-menu>
        </div>
        <div style="width:350px">
          <div style="font-size:12px;color:#606060;margin-bottom:8px;">Keyboard-active on the selected row</div>
          <rais-dropdown-menu [options]="long" [selectedIndex]="4" [activeIndex]="4"></rais-dropdown-menu>
        </div>
      </div>
    `,
    props: { short: CARRIERS.slice(0, 5), long: CARRIERS },
  }),
};

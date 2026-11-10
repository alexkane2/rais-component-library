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
  parameters: {
    docs: {
      description: {
        component:
          'The option list used under **Dropdown** and on its own for popover menus. Mirrors the Figma ' +
          '`Dropdown Menu` set and its `Dropdown Menu / Option` row states.\n\n' +
          '**Height.** The panel never grows past `maxVisibleRows` (8). Longer lists scroll inside the panel ' +
          'with a real, token-colored scrollbar, so a long carrier list no longer pushes the page down.\n\n' +
          '**Row states.** `selectedIndex` is the committed value (blue text on `bg-selected`, same weight as every other state so wrapping never changes on selection). `activeIndex` is the row ' +
          'reached with the arrow keys: a focus ring on a hover background, distinct from both hover and the ' +
          'selection, and not committed until Enter. A row can be both (`Keyboard Active + Selected`).\n\n' +
          '**Keyboard** (when the list itself has focus): Up / Down move the active row, Home / End jump, ' +
          'Enter or Space commit (`optionSelected`), Escape emits `closed`. When a combobox drives the list ' +
          '(`focusable=false`), the field forwards these keys and the list only renders.\n\n' +
          'Tokens: `--color-surface-primary`, `--color-border-default`, `--color-bg-hover`, `--color-bg-selected`, ' +
          '`--color-border-focus`, `--color-link-primary`, `--color-divider`, `--spacing-03/05`, `--border-radius-sm`.',
      },
    },
  },
  decorators: [
    moduleMetadata({ imports: [RaisDropdownMenuComponent] }),
    componentWrapperDecorator((story) => `<div style="width:350px">${story}</div>`),
  ],
  argTypes: {
    options:        { control: 'object', description: 'Option labels, in order' },
    selectedIndex:  { control: 'number', description: 'Committed option (-1 for none) — the blue row' },
    activeIndex:    { control: 'number', description: 'Keyboard-active option (-1 for none) — the focus ring; kept in view as it moves' },
    maxVisibleRows: { control: 'number', description: 'Rows shown before the list scrolls (8 = Figma max height)' },
    ariaLabel:      { control: 'text', description: 'Accessible name of the listbox' },
    focusable:      { control: 'boolean', description: 'false when a combobox (Dropdown) owns focus and drives the list' },
    listboxId:      { control: 'text', description: 'id for the listbox element (aria-controls target)' },
    idPrefix:       { control: 'text', description: 'Prefix for option ids (`<prefix>-opt-<i>`), for aria-activedescendant' },
    selectedIndexChange: { control: false, description: 'Emits the committed index' },
    activeIndexChange:   { control: false, description: 'Emits the keyboard-active index as it moves' },
    optionSelected:      { control: false, description: 'Emits `{ index, option }` on click, Enter or Space' },
    closed:              { control: false, description: 'Emits on Escape' },
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

/** Long carrier names wrap inside the row instead of overflowing the panel (CRE-3438). */
export const LongOptionNames: Story = {
  args: {
    options: [
      'Allied Insurance',
      "Builders & Tradesmen's Insurance Services, Inc.",
      'Chubb',
      'Nationwide Mutual Insurance Company of America, Commercial Lines',
      'Zurich',
    ],
    selectedIndex: 1,
    activeIndex: 3,
  },
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

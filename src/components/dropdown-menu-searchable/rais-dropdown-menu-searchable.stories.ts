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
  parameters: {
    docs: {
      description: {
        component:
          'The results panel under **Dropdown – Searchable**: two-line options (bold name over a lighter detail ' +
          'line). Mirrors the Figma `Dropdown Menu - Searchable` set.\n\n' +
          '**Panels** (`resultsState`):\n\n' +
          '- `default` — the full list on open; stops at `maxVisibleRows` (5) two-line rows and scrolls inside the panel with a real scrollbar.\n' +
          '- `filtered` — only the rows matching the typed text; the first match is keyboard-active so Enter commits it.\n' +
          '- `no-results` — empty-state copy quoting `query`; the panel stays open.\n' +
          '- `loading` — shown while a remote search runs.\n\n' +
          '`selectedIndex` is the committed value (blue name); `activeIndex` the row reached with the arrow keys ' +
          '(focus ring). Keyboard, when the list itself has focus: Up / Down, Home / End, Enter or Space commit, Escape emits `closed`.\n\n' +
          'Tokens: `--color-surface-primary`, `--color-border-default`, `--color-bg-hover`, `--color-bg-selected`, ' +
          '`--color-border-focus`, `--color-display-primary`, `--color-text-primary/-secondary`, `--spacing-03/05/06`.',
      },
    },
  },
  decorators: [
    moduleMetadata({ imports: [RaisDropdownMenuSearchableComponent] }),
    componentWrapperDecorator((story) => `<div style="width:491px">${story}</div>`),
  ],
  argTypes: {
    options:        { control: 'object', description: 'Options to list (`name`, optional `detail`)' },
    selectedIndex:  { control: 'number', description: 'Committed option (-1 for none)' },
    activeIndex:    { control: 'number', description: 'Keyboard-active option (-1 for none)' },
    resultsState:   { control: 'select', options: ['default', 'filtered', 'no-results', 'loading'], description: 'Which panel to show' },
    query:          { control: 'text', description: 'Typed text, quoted in the no-results copy' },
    noResultsTitle: { control: 'text', description: 'No-results title; `{query}` is replaced' },
    noResultsHint:  { control: 'text', description: 'No-results hint line' },
    loadingTitle:   { control: 'text', description: 'Loading title' },
    loadingHint:    { control: 'text', description: 'Loading hint line' },
    maxVisibleRows: { control: 'number', description: 'Two-line rows shown before the list scrolls (5)' },
    focusable:      { control: 'boolean', description: 'false when the searchable field owns focus and drives the list' },
    optionSelected: { control: false, description: 'Emits `{ index, option }` on click, Enter or Space' },
    closed:         { control: false, description: 'Emits on Escape' },
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

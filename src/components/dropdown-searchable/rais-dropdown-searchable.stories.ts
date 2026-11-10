import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { RaisDropdownSearchableComponent } from './rais-dropdown-searchable.component';

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

const meta: Meta<RaisDropdownSearchableComponent> = {
  title: 'RAIS/Inputs/Dropdown - Searchable',
  component: RaisDropdownSearchableComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Type-ahead single-select. Mirrors the Figma `Dropdown - Searchable` set; the panel is ' +
          '**Dropdown Menu – Searchable**.\n\n' +
          '**Sequence:** `default` (closed, placeholder, caret) → `open` (click, Tab + Down or the caret: focus border, ' +
          'caret up, full list) → `active` (typing filters the list as you type; the X appears) → `selection` ' +
          '(a value is committed; the X clears it back to default). `error` adds the error border and message.\n\n' +
          '**Caret and X are both buttons.** The caret toggles the list; the X clears the typed text or the committed ' +
          'value (`cleared`).\n\n' +
          '**Keyboard:** Up / Down move the keyboard-active result (focus ring, not committed), Enter commits ' +
          '(`valueChange`, `optionSelected`), Escape closes and keeps the typed text, Tab closes and moves on.\n\n' +
          'Filtering runs here against `options` (name and detail, case-insensitive). Set `loading` while a remote ' +
          'search runs and feed its results into `options`. `state`, `query` and `value` only force the look for ' +
          'static mockups; left alone, the field drives itself. Width is fluid: wrap it to size it (these stories use 491px).',
      },
    },
  },
  decorators: [
    moduleMetadata({ imports: [RaisDropdownSearchableComponent] }),
    componentWrapperDecorator((story) => `<div style="width:491px">${story}</div>`),
  ],
  argTypes: {
    label:            { control: 'text', description: 'Field label' },
    optional:         { control: 'boolean', description: 'Show "(Optional)" after the label' },
    instructions:     { control: 'boolean', description: 'Show the instructions line' },
    instructionsText: { control: 'text', description: 'Instructions copy; long text wraps above the field' },
    placeholder:      { control: 'text', description: 'Shown when nothing is typed or selected' },
    options:          { control: 'object', description: 'All options; the field filters them against `query`' },
    state:            { control: 'select', options: ['default', 'open', 'active', 'selection', 'error'], description: 'Forces the look for mockups; `open` and `active` draw the panel' },
    value:            { control: 'text', description: 'Committed selection (its name)' },
    query:            { control: 'text', description: 'Typed search text' },
    loading:          { control: 'boolean', description: 'Show the loading panel while results are fetched' },
    errorMessage:     { control: 'text', description: 'Shown under the field in the error state' },
    maxVisibleRows:   { control: 'number', description: 'Two-line result rows shown before the panel scrolls (5)' },
    valueChange:      { action: 'valueChange', description: 'Emits the committed name, or "" when cleared' },
    queryChange:      { action: 'queryChange', description: 'Emits the typed text as it changes' },
    optionSelected:   { action: 'optionSelected', description: 'Emits the committed option' },
    cleared:          { action: 'cleared', description: 'Emits when the X clears the field' },
    openChange:       { action: 'openChange', description: 'Emits true / false as the panel opens and closes' },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownSearchableComponent>;

export const Default: Story = {
  args: { label: 'Label', state: 'default', instructions: true, options: AGENCIES },
};

/** Focused with nothing typed: the full list opens under the field. */
export const Open: Story = {
  args: { label: 'Label', state: 'open', instructions: true, options: AGENCIES },
};

/** Typing "plum" filters the list; the first match is keyboard-active. */
export const Active: Story = {
  args: { label: 'Label', state: 'active', query: 'plum', instructions: true, options: AGENCIES },
};

export const NoResults: Story = {
  args: { label: 'Label', state: 'active', query: 'plumx', instructions: true, options: AGENCIES },
};

export const Loading: Story = {
  args: { label: 'Label', state: 'active', query: 'plum', loading: true, instructions: true, options: AGENCIES },
};

export const Selection: Story = {
  args: { label: 'Label', state: 'selection', value: '3D Plumbing Heating Inc', instructions: true, options: AGENCIES },
};

export const Error: Story = {
  args: { label: 'Label', state: 'error', instructions: true, options: AGENCIES },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'default', instructions: true, options: AGENCIES },
};

/** Click into the field and type; arrows move the focus ring, Enter commits, the X clears. */
export const Interactive: Story = {
  args: { label: 'Agency', instructions: true, instructionsText: 'Start typing an agency name.', options: AGENCIES },
};

export const AllVariants: Story = {
  decorators: [componentWrapperDecorator((story) => `<div style="width:auto">${story}</div>`)],
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:80px;padding:24px;background:#F0F2F5;border-radius:8px;width:491px;">
        <rais-dropdown-searchable label="Default" state="default" [instructions]="true" [options]="agencies"></rais-dropdown-searchable>
        <rais-dropdown-searchable label="Selection" state="selection" value="3D Plumbing Heating Inc" [instructions]="true" [options]="agencies"></rais-dropdown-searchable>
        <rais-dropdown-searchable label="Error" state="error" [instructions]="true" [options]="agencies"></rais-dropdown-searchable>
        <rais-dropdown-searchable label="Active / Searching" state="active" query="plum" [instructions]="true" [options]="agencies"></rais-dropdown-searchable>
        <div style="height:220px"></div>
      </div>
    `,
    props: { agencies: AGENCIES },
  }),
};

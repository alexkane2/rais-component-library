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
  decorators: [
    moduleMetadata({ imports: [RaisDropdownSearchableComponent] }),
    componentWrapperDecorator((story) => `<div style="width:491px">${story}</div>`),
  ],
  argTypes: {
    label:            { control: 'text' },
    optional:         { control: 'boolean' },
    instructions:     { control: 'boolean' },
    instructionsText: { control: 'text' },
    placeholder:      { control: 'text' },
    state:            { control: 'select', options: ['default', 'open', 'active', 'selection', 'error'] },
    value:            { control: 'text' },
    query:            { control: 'text' },
    loading:          { control: 'boolean' },
    errorMessage:     { control: 'text' },
    valueChange:      { action: 'valueChange' },
    queryChange:      { action: 'queryChange' },
    optionSelected:   { action: 'optionSelected' },
    cleared:          { action: 'cleared' },
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

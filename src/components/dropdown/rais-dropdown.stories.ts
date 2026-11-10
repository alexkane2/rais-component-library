import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { RaisDropdownComponent } from './rais-dropdown.component';
import { RaisTextFieldComponent } from '../text-field/rais-text-field.component';

const REGIONS = ['Northeast', 'Mid-Atlantic', 'Southeast', 'Midwest', 'West'];
const CARRIERS = [
  'Allied Insurance', 'Amerisure', 'Chubb', 'CNA', 'The Hartford', 'Liberty Mutual',
  'Nationwide', 'Progressive', 'Safeco', 'Selective', 'Travelers', 'Zurich',
];

const meta: Meta<RaisDropdownComponent> = {
  title: 'RAIS/Inputs/Dropdown',
  component: RaisDropdownComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisDropdownComponent, RaisTextFieldComponent] }),
    componentWrapperDecorator((story) => `<div style="width:350px">${story}</div>`),
  ],
  argTypes: {
    label:            { control: 'text' },
    optional:         { control: 'boolean' },
    instructions:     { control: 'boolean' },
    instructionsText: { control: 'text' },
    placeholder:      { control: 'text' },
    value:            { control: 'text' },
    state:            { control: 'select', options: ['default', 'filled', 'focus', 'error', 'open'] },
    errorMessage:     { control: 'text' },
    maxVisibleRows:   { control: 'number' },
    valueChange:      { action: 'valueChange' },
    openChange:       { action: 'openChange' },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownComponent>;

export const Default: Story = {
  args: { label: 'Label', state: 'default', options: REGIONS },
};

export const Filled: Story = {
  args: { label: 'Label', value: 'All', state: 'filled', options: ['All', ...REGIONS] },
};

export const OnFocus: Story = {
  args: { label: 'Label', state: 'focus', options: REGIONS },
};

export const Error: Story = {
  args: { label: 'Label', state: 'error', errorMessage: 'Error message.', options: REGIONS },
};

export const Open: Story = {
  args: { label: 'Label', state: 'open', options: REGIONS },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'default', options: REGIONS },
};

export const WithInstructions: Story = {
  args: { label: 'Label', instructions: true, state: 'default', options: REGIONS },
};

/** Click or press Space / Enter / Down to open; arrows move the focus ring, Enter commits, Escape closes. */
export const Interactive: Story = {
  args: { label: 'Carrier', instructions: true, instructionsText: 'Use the arrow keys to move, Enter to choose.', options: CARRIERS, value: 'The Hartford' },
};

/** Twelve carriers: the menu stops at 8 rows and scrolls. */
export const LongListScrolls: Story = {
  args: { label: 'Carrier', state: 'open', options: CARRIERS, value: 'The Hartford' },
};

export const AllVariants: Story = {
  decorators: [componentWrapperDecorator((story) => `<div style="width:auto">${story}</div>`)],
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:80px;padding:24px;background:#F0F2F5;border-radius:8px;width:350px;">
        <rais-dropdown label="Default" state="default" [options]="regions"></rais-dropdown>
        <rais-dropdown label="Filled" value="All" state="filled" [options]="regions"></rais-dropdown>
        <rais-dropdown label="On Focus" state="focus" [options]="regions"></rais-dropdown>
        <rais-dropdown label="Error" state="error" errorMessage="Error message." [options]="regions"></rais-dropdown>
        <rais-dropdown label="Open" state="open" [options]="regions"></rais-dropdown>
      </div>
    `,
    props: { regions: REGIONS },
  }),
};

/**
 * In a drawer form the dropdown fills the same width as the text fields above it,
 * long instructions wrap, and the open menu shows a committed (blue) row and a
 * separate keyboard-active (focus ring) row.
 */
export const InDrawer: Story = {
  decorators: [componentWrapperDecorator((story) => `<div style="width:auto">${story}</div>`)],
  render: () => ({
    template: `
      <div style="width:560px;padding:24px;background:#FFFFFF;border:1px solid #CCCCCC;border-radius:8px;display:flex;flex-direction:column;gap:24px;">
        <div style="font-size:20px;font-weight:700;color:#454545;">Add New Agency</div>
        <rais-text-field label="Agency Name" style="display:block;width:100%"></rais-text-field>
        <rais-text-field label="Agency Code" style="display:block;width:100%"></rais-text-field>
        <rais-dropdown
          label="Region"
          [instructions]="true"
          instructionsText="The sub-network is assigned to the region and cannot be edited here. Choose the region that this agency reports into; the sub-network updates automatically."
          [options]="regions"
        ></rais-dropdown>
        <rais-dropdown label="Sub-Network" [instructions]="true" instructionsText="Select the sub-network for this agency." state="open" value="Mid-Atlantic" [options]="regions"></rais-dropdown>
        <div style="height:220px"></div>
      </div>
    `,
    props: { regions: REGIONS },
  }),
};

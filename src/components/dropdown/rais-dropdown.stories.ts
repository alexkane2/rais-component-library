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
  parameters: {
    docs: {
      description: {
        component:
          'Single-select field: label, optional "(Optional)" hint, wrapping instructions, the trigger and a ' +
          '**Dropdown Menu** under it. Mirrors the Figma `Dropdown` set.\n\n' +
          '**Width.** The field is fluid: label, instructions, trigger and error all fill the container, so it ' +
          'lines up with the text fields beside it in a drawer. Wrap it to size it (these stories use 350px). ' +
          'Long `instructionsText` wraps with 4px before the trigger.\n\n' +
          '**Keyboard** (custom list, not the native `<select>` — the arrow keys never change the value by themselves):\n\n' +
          '- Tab focuses the closed trigger.\n' +
          '- Space, Enter, Up or Down open the menu with the current value as the keyboard-active row.\n' +
          '- Up / Down / Home / End move the keyboard-active row (focus ring) without committing; typing a letter jumps to the first matching option.\n' +
          '- Enter commits (`valueChange`) and closes; Escape closes without changes; Tab closes and moves on.\n\n' +
          '`state` only forces the look for static mockups (`open` draws the menu). Real interaction opens and ' +
          'closes the menu itself. The menu stops at `maxVisibleRows` (8) and scrolls.\n\n' +
          'Tokens: `--color-input-bg`, `--color-border-default/-focus/-error`, `--color-text-primary/-placeholder/-disabled`, ' +
          '`--color-icon-primary/-focused`, `--spacing-01/03/05`, `--border-radius-sm`, `--shadow-sm`.',
      },
    },
  },
  decorators: [
    moduleMetadata({ imports: [RaisDropdownComponent, RaisTextFieldComponent] }),
    componentWrapperDecorator((story) => `<div style="width:350px">${story}</div>`),
  ],
  argTypes: {
    label:            { control: 'text', description: 'Field label' },
    optional:         { control: 'boolean', description: 'Show "(Optional)" after the label' },
    instructions:     { control: 'boolean', description: 'Show the instructions line' },
    instructionsText: { control: 'text', description: 'Instructions copy; long text wraps above the trigger' },
    placeholder:      { control: 'text', description: 'Shown when there is no value' },
    value:            { control: 'text', description: 'Committed value (one of `options`)' },
    options:          { control: 'object', description: 'Menu options' },
    state:            { control: 'select', options: ['default', 'filled', 'focus', 'error', 'open'], description: 'Forces the look for mockups; `open` draws the menu' },
    errorMessage:     { control: 'text', description: 'Shown under the trigger in the error state' },
    maxVisibleRows:   { control: 'number', description: 'Menu rows shown before it scrolls (8)' },
    valueChange:      { action: 'valueChange', description: 'Emits the new value when an option is committed' },
    openChange:       { action: 'openChange', description: 'Emits true / false as the menu opens and closes' },
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

/** A long committed value is cut with an ellipsis in the field (hover for the full name) and wraps in the open menu (CRE-3438). */
export const LongOptionNames: Story = {
  args: {
    label: 'Carrier',
    state: 'open',
    value: "Builders & Tradesmen's Insurance Services, Inc.",
    options: ['Allied Insurance', "Builders & Tradesmen's Insurance Services, Inc.", 'Chubb', 'Nationwide Mutual Insurance Company of America, Commercial Lines', 'Zurich'],
  },
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

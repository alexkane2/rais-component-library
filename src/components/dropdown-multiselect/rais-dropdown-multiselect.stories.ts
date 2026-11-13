import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisDropdownMultiselectComponent } from './rais-dropdown-multiselect.component';
import { RaisSelectionLabelComponent } from '../selection-label/rais-selection-label.component';

const PRODUCERS = [
  'Agency House Account', 'Johnson, Olivia', 'Nicola, Sarah', 'Wentz, Douglas',
  'Thornberg, Jeffery', 'Tersa, Pamela', 'Slater, Mary', 'Stanley, Kathleen',
  'Safra, Steven', 'Zeller, Cory', 'Zeller, James', 'Spencer, Dana', 'Haggerty, James',
];

const meta: Meta<RaisDropdownMultiselectComponent> = {
  title: 'RAIS/Inputs/Dropdown - Multiselect',
  component: RaisDropdownMultiselectComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-select field: selections show as squared **Selection Label** chips, and more than `maxChips` (3) ' +
          'show as "N items selected".\n\n' +
          '**Opening the menu.** Give it `options` and the field opens the **Dropdown Menu - Multiselect** under it ' +
          '(click, or Enter / Space / Down when focused). Checking rows is pending until **Apply**, which sets `value`, ' +
          'emits `valueChange` and closes; **Cancel**, Escape or a click outside closes without changes. A chip\'s X ' +
          'removes it, the field\'s X clears them all, and Backspace on the closed field removes the last one.\n\n' +
          '**Static looks.** `state` still forces the Figma states for mockups: `selection` (chips from `chipLabels`), ' +
          '`max-selected` (`maxSelectedText`), `mouse-enter`, `error`, and `open` (draws the menu).',
      },
    },
  },
  decorators: [
    moduleMetadata({ imports: [RaisDropdownMultiselectComponent, RaisSelectionLabelComponent] }),
  ],
  argTypes: {
    label:        { control: 'text' },
    optional:     { control: 'boolean' },
    instructions: { control: 'boolean' },
    state: {
      control: 'select',
      options: ['default', 'mouse-enter', 'selection', 'max-selected', 'error', 'open'],
    },
    options:     { control: 'object', description: 'Options listed in the menu; with none, the field does not open' },
    value:       { control: 'object', description: 'Applied selection, shown as chips (or "N items selected")' },
    maxChips:    { control: 'number', description: 'Most values shown as chips before the summary takes over' },
    placeholder: { control: 'text', description: 'Shown when nothing is selected' },
    valueChange: { control: false, description: 'Emits the new selection on Apply, chip removal or clear' },
    openChange:  { control: false, description: 'Emits true / false as the menu opens and closes' },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownMultiselectComponent>;

export const Default: Story = {
  args: { label: 'Label', state: 'default', instructions: true },
};

export const MouseEnter: Story = {
  args: { label: 'Label', state: 'mouse-enter', instructions: true },
};

export const Selection: Story = {
  args: { label: 'Label', state: 'selection', instructions: true },
};

export const MaxSelected: Story = {
  args: { label: 'Label', state: 'max-selected', instructions: true },
};

export const Error: Story = {
  args: { label: 'Label', state: 'error', instructions: true },
};

export const Optional: Story = {
  args: { label: 'Label', optional: true, state: 'default', instructions: true },
};

/** The field with its menu open: the applied selection is pinned above the divider. */
export const Open: Story = {
  args: {
    label: 'Producers',
    state: 'open',
    instructions: true,
    options: PRODUCERS,
    value: ['Spencer, Dana', 'Haggerty, James'],
  },
  parameters: { layout: 'padded', docs: { story: { height: '500px' } } },
};

/** Click the field: check producers, then Apply. Chips update; a fourth selection switches to the summary. */
export const Interactive: Story = {
  args: {
    label: 'Producers',
    state: 'default',
    instructions: true,
    options: PRODUCERS,
    value: ['Johnson, Olivia'],
  },
  parameters: { docs: { story: { height: '500px' } } },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
        <rais-dropdown-multiselect label="Default" state="default" [instructions]="true"></rais-dropdown-multiselect>
        <rais-dropdown-multiselect label="Mouse Enter" state="mouse-enter" [instructions]="true"></rais-dropdown-multiselect>
        <rais-dropdown-multiselect label="Selection" state="selection" [instructions]="true"></rais-dropdown-multiselect>
        <rais-dropdown-multiselect label="Max Selected" state="max-selected" [instructions]="true"></rais-dropdown-multiselect>
        <rais-dropdown-multiselect label="Error" state="error" [instructions]="true"></rais-dropdown-multiselect>
      </div>
    `,
  }),
};

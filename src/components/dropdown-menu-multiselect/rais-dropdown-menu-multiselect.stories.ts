import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { RaisDropdownMenuMultiselectComponent } from './rais-dropdown-menu-multiselect.component';

// The Figma `Dropdown Menu - Multiselect` list. Kept as literals (no .slice()) so the
// Claude Design build (scripts/elements/stories.mjs) can read the story args.
const FIGMA_LIST = [
  'Agency House Account', 'Johnson, Olivia', 'Nicola, Sarah', 'Wentz, Douglas',
  'Thornberg, Jeffery', 'Tersa, Pamela', 'Slater, Mary', 'Stanley, Kathleen',
  'Safra, Steven', 'Zeller, Cory', 'Zeller, James',
];

// Plus the two names the Figma "Multiselect 2" frame shows as selected.
const PRODUCERS = [
  'Agency House Account', 'Johnson, Olivia', 'Nicola, Sarah', 'Wentz, Douglas',
  'Thornberg, Jeffery', 'Tersa, Pamela', 'Slater, Mary', 'Stanley, Kathleen',
  'Safra, Steven', 'Zeller, Cory', 'Zeller, James', 'Spencer, Dana', 'Haggerty, James',
];

const meta: Meta<RaisDropdownMenuMultiselectComponent> = {
  title: 'RAIS/Inputs/Dropdown Menu - Multiselect',
  component: RaisDropdownMenuMultiselectComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The checkbox panel under **Dropdown - Multiselect**, and on its own for filter popovers. Mirrors the Figma ' +
          '`Dropdown Menu - Multiselect` component: **Select All** / **Clear**, a **Search** field, the checkbox list ' +
          'and **Cancel** / **Apply**.\n\n' +
          '**Pending vs applied.** Checking rows only changes the pending selection (`selectionChange`). Nothing is ' +
          'committed until **Apply**, which emits the checked options in `options` order (`apply`). **Cancel** or ' +
          'Escape drops the pending changes (`cancel`).\n\n' +
          '**Pinned selection.** The applied selection (`value`) sits at the top of the list above a divider ' +
          '(Figma "Dropdown Menu - Multiselect 2"). Rows never jump while you check them: the pinned group is taken ' +
          'from `value` when the menu opens. Turn it off with `pinSelected=false`.\n\n' +
          '**Search** filters both groups (case-insensitive, anywhere in the name). **Select All** checks every row ' +
          'that matches the search; **Clear** unchecks everything.\n\n' +
          '**Height.** The list stops at 213px (the Figma list height) and scrolls inside the panel with a 5px thumb.\n\n' +
          '**Keyboard.** Down from the search moves into the list; Up / Down / Home / End move the focus ring, Space or ' +
          'Enter toggle the row, Up from the first row returns to the search. Escape anywhere in the panel cancels.\n\n' +
          'Tokens: `--color-surface-primary`, `--color-border-default`, `--color-border-dark`, `--color-divider`, ' +
          '`--color-btn-*`, `--color-text-primary/secondary`, `--color-display-primary`, `--spacing-01/03/05/06/08`, ' +
          '`--border-radius-sm/md`. The row checkbox is the real **Radio or Checkbox** (checkbox, x-large).',
      },
    },
  },
  decorators: [
    moduleMetadata({ imports: [RaisDropdownMenuMultiselectComponent] }),
    componentWrapperDecorator((story) => `<div style="width:350px">${story}</div>`),
  ],
  argTypes: {
    options:           { control: 'object', description: 'Option labels, in order' },
    value:             { control: 'object', description: 'Applied selection — checked on open and pinned above the divider' },
    pinSelected:       { control: 'boolean', description: 'Pin the applied selection to the top of the list' },
    query:             { control: 'text', description: 'Search text that filters the list' },
    searchPlaceholder: { control: 'text', description: 'Placeholder of the search field' },
    ariaLabel:         { control: 'text', description: 'Accessible name of the listbox' },
    focusSearch:       { control: 'boolean', description: 'Focus the search field when the menu appears' },
    listboxId:         { control: 'text', description: 'id for the listbox element (aria-controls target)' },
    apply:             { control: false, description: 'Emits the checked options when Apply is pressed' },
    cancel:            { control: false, description: 'Emits when Cancel or Escape drops the pending changes' },
    selectionChange:   { control: false, description: 'Emits the pending selection as rows are checked' },
    queryChange:       { control: false, description: 'Emits the search text as it is typed' },
  },
};

export default meta;
type Story = StoryObj<RaisDropdownMenuMultiselectComponent>;

/** Figma `Dropdown Menu - Multiselect`: nothing applied yet, the list scrolls. */
export const Default: Story = {
  args: { options: FIGMA_LIST, value: [] },
};

/** Figma "Multiselect 2": the applied selection is pinned above a divider. */
export const WithSelection: Story = {
  args: {
    options: PRODUCERS,
    value: ['Spencer, Dana', 'Haggerty, James'],
  },
};

/** Search filters both groups; Select All would check only these rows. */
export const Filtered: Story = {
  args: { options: PRODUCERS, value: ['Zeller, Cory'], query: 'zel' },
};

export const NoResults: Story = {
  args: { options: PRODUCERS, value: [], query: 'Brennan' },
};

/** Three options: the list hugs its content, no scrollbar. */
export const ShortList: Story = {
  args: { options: ['Property', 'Auto', 'Umbrella'], value: ['Auto'] },
};

/** Long names wrap inside the row instead of overflowing the panel. */
export const LongOptionNames: Story = {
  args: {
    options: [
      'Agency House Account',
      "Builders & Tradesmen's Insurance Services, Inc.",
      'Johnson, Olivia',
      'Nationwide Mutual Insurance Company of America, Commercial Lines',
      'Nicola, Sarah',
    ],
    value: ["Builders & Tradesmen's Insurance Services, Inc."],
  },
};

/** The three looks side by side (wider than the 350px story frame on purpose). */
export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:40px;align-items:flex-start;width:max-content;padding:24px;background:#F0F2F5;border-radius:8px;">
        <div style="width:350px">
          <div style="font-size:12px;color:#606060;margin-bottom:8px;">Nothing applied</div>
          <rais-dropdown-menu-multiselect [options]="producers" [value]="[]"></rais-dropdown-menu-multiselect>
        </div>
        <div style="width:350px">
          <div style="font-size:12px;color:#606060;margin-bottom:8px;">Applied selection pinned to the top</div>
          <rais-dropdown-menu-multiselect [options]="producers" [value]="applied"></rais-dropdown-menu-multiselect>
        </div>
        <div style="width:350px">
          <div style="font-size:12px;color:#606060;margin-bottom:8px;">Filtered by “zel”</div>
          <rais-dropdown-menu-multiselect [options]="producers" [value]="['Zeller, Cory']" query="zel"></rais-dropdown-menu-multiselect>
        </div>
      </div>
    `,
    props: { producers: PRODUCERS, applied: ['Spencer, Dana', 'Haggerty, James'] },
  }),
};

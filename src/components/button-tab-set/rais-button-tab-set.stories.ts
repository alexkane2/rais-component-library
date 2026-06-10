import type { Meta, StoryObj } from '@storybook/angular';
import { RaisButtonTabSetComponent } from './rais-button-tab-set.component';

const meta: Meta<RaisButtonTabSetComponent> = {
  title: 'RAIS/Selector Controls/Button Tab Sets',
  component: RaisButtonTabSetComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'SelectButton (Figma node 3614:851) — a segmented button group to choose a value ' +
          'from a list of options. Gray track with a white pill on the selected option. '
          + 'Supports 2–4 options, single selection (`selectedIndex`) or multiple ' +
          'selection (`multiple` + `selectedIndices`). Emits `selectionChange`.',
      },
    },
  },
  argTypes: {
    options: { control: 'object', description: 'Option labels (Figma supports 2–4)' },
    multiple: { control: 'boolean', description: 'Options toggle independently' },
    selectedIndex: { control: 'number', description: 'Single mode: selected option index (-1 = none)' },
    selectedIndices: { control: 'object', description: 'Multiple mode: selected option indices' },
    selectionChange: { control: false, description: 'Emits selected index (single) or indices (multiple)' },
  },
};

export default meta;
type Story = StoryObj<RaisButtonTabSetComponent>;

export const TwoOptions: Story = {
  args: { options: ['Primary', 'Primary'], selectedIndex: 0 },
};

export const ThreeOptions: Story = {
  args: { options: ['Primary', 'Primary', 'Primary'], selectedIndex: 0 },
};

export const FourOptions: Story = {
  args: { options: ['Primary', 'Primary', 'Primary', 'Primary'], selectedIndex: 0 },
};

export const SecondSelected: Story = {
  args: { options: ['Primary', 'Primary', 'Primary'], selectedIndex: 1 },
};

export const Multiple: Story = {
  args: { options: ['Primary', 'Primary', 'Primary'], multiple: true, selectedIndices: [] },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#FFFFFF;align-items:flex-start;">
        <rais-button-tab-set [options]="['Primary','Primary']"                               [selectedIndex]="0"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary']"                               [selectedIndex]="1"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary','Primary']"                     [selectedIndex]="0"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary','Primary']"                     [selectedIndex]="1"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary','Primary']"                     [selectedIndex]="2"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary','Primary','Primary']"           [selectedIndex]="0"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary','Primary','Primary']"           [selectedIndex]="1"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary','Primary','Primary']"           [selectedIndex]="2"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary','Primary','Primary']"           [selectedIndex]="3"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary']"                     [multiple]="true"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary','Primary']"           [multiple]="true"></rais-button-tab-set>
        <rais-button-tab-set [options]="['Primary','Primary','Primary','Primary']" [multiple]="true"></rais-button-tab-set>
      </div>
    `,
  }),
};

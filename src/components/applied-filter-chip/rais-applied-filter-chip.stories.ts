import type { Meta, StoryObj } from '@storybook/angular';
import { RaisAppliedFilterChipComponent } from './rais-applied-filter-chip.component';

const meta: Meta<RaisAppliedFilterChipComponent> = {
  title: 'RAIS/Filters/Applied Filter Chip',
  component: RaisAppliedFilterChipComponent,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'text',
      description: 'Category label (bold text before the value)',
    },
    value: {
      control: 'text',
      description: 'Filter value text',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show filter icon (bxs-filter-alt.svg) on the left',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss X (bx-x-large-spacing.svg) on the right — false for "must have" filters',
    },
  },
};

export default meta;
type Story = StoryObj<RaisAppliedFilterChipComponent>;

export const SingleSelection: Story = {
  args: { category: 'Policy Producer:', value: 'Spencer, Dana', showIcon: false, dismissible: true },
};

export const MultipleSelections: Story = {
  args: { category: 'Policy Producer:', value: 'Multiple', showIcon: false, dismissible: true },
};

export const Truncated: Story = {
  args: { category: 'Policy Producer:', value: 'Very Long Filter Lab...', showIcon: false, dismissible: true },
};

export const MustHave: Story = {
  name: 'Must Have (no dismiss)',
  args: { category: 'Region:', value: 'West', showIcon: false, dismissible: false },
};

export const WithIcon: Story = {
  args: { category: 'Category:', value: 'Filter', showIcon: true, dismissible: true },
};

export const MustHaveWithIcon: Story = {
  name: 'Must Have + Icon',
  args: { category: 'Category:', value: 'Filter', showIcon: true, dismissible: false },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;">
        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">DISMISSIBLE</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
          <rais-applied-filter-chip category="Policy Producer:" value="Spencer, Dana"          [showIcon]="false" [dismissible]="true"></rais-applied-filter-chip>
          <rais-applied-filter-chip category="Policy Producer:" value="Multiple"                [showIcon]="false" [dismissible]="true"></rais-applied-filter-chip>
          <rais-applied-filter-chip category="Policy Producer:" value="Very Long Filter Lab..." [showIcon]="false" [dismissible]="true"></rais-applied-filter-chip>
        </div>

        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">MUST HAVE (no dismiss)</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
          <rais-applied-filter-chip category="Region:" value="West"   [showIcon]="false" [dismissible]="false"></rais-applied-filter-chip>
          <rais-applied-filter-chip category="Status:" value="Active" [showIcon]="false" [dismissible]="false"></rais-applied-filter-chip>
        </div>

        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">WITH FILTER ICON</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
          <rais-applied-filter-chip category="Category:" value="Filter" [showIcon]="true" [dismissible]="true"></rais-applied-filter-chip>
          <rais-applied-filter-chip category="Category:" value="Filter" [showIcon]="true" [dismissible]="false"></rais-applied-filter-chip>
        </div>
      </div>
    `,
  }),
};

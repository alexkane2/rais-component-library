import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisTableHeaderComponent } from './rais-table-header.component';

const meta: Meta<RaisTableHeaderComponent> = {
  title: 'RAIS/Tables/Table Header',
  component: RaisTableHeaderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisTableHeaderComponent] }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'skeleton-loader', 'checkbox'],
      description: 'Header content variant',
    },
    columnName: { control: 'text', description: 'Label displayed in the default variant' },
    sortable: { control: 'boolean', description: 'Show sort icon in default variant' },
    checked: { control: 'boolean', description: 'Checked state for checkbox variant' },
  },
};

export default meta;
type Story = StoryObj<RaisTableHeaderComponent>;

export const Default: Story = {
  args: { variant: 'default', columnName: 'Column Name', sortable: true },
};

export const SkeletonLoader: Story = {
  name: 'Skeleton Loader',
  args: { variant: 'skeleton-loader' },
};

export const Checkbox: Story = {
  args: { variant: 'checkbox', checked: false },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Default</span>
          <rais-table-header variant="default" columnName="Column Name"></rais-table-header>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Skeleton Loader</span>
          <rais-table-header variant="skeleton-loader"></rais-table-header>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Checkbox</span>
          <rais-table-header variant="checkbox"></rais-table-header>
        </div>
      </div>
    `,
  }),
};

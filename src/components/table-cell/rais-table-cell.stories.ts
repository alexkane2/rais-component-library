import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisTableCellComponent } from './rais-table-cell.component';

const meta: Meta<RaisTableCellComponent> = {
  title: 'RAIS/Tables/Table Cell',
  component: RaisTableCellComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisTableCellComponent] }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'input-field-selector', 'skeleton-loader', 'checkbox'],
      description: 'Cell content variant',
    },
    content: { control: 'text', description: 'Text rendered in the default variant' },
    checked: { control: 'boolean', description: 'Checked state for the checkbox variant' },
  },
};

export default meta;
type Story = StoryObj<RaisTableCellComponent>;

export const Default: Story = {
  args: { variant: 'default', content: 'Content' },
};

export const InputFieldSelector: Story = {
  name: 'Input Field Selector',
  args: { variant: 'input-field-selector' },
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
          <rais-table-cell variant="default" content="Content"></rais-table-cell>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Input Field Selector</span>
          <rais-table-cell variant="input-field-selector"></rais-table-cell>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Skeleton Loader</span>
          <rais-table-cell variant="skeleton-loader"></rais-table-cell>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Checkbox</span>
          <rais-table-cell variant="checkbox"></rais-table-cell>
        </div>
      </div>
    `,
  }),
};

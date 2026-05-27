import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisTableColumnComponent } from './rais-table-column.component';
import { RaisTableHeaderComponent } from '../table-header/rais-table-header.component';
import { RaisTableCellComponent } from '../table-cell/rais-table-cell.component';

const meta: Meta<RaisTableColumnComponent> = {
  title: 'RAIS/Tables/Table Column',
  component: RaisTableColumnComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RaisTableColumnComponent, RaisTableHeaderComponent, RaisTableCellComponent],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'checkboxes', 'input-field-selectors'],
      description: 'Column variant — drives the header + cell variants',
    },
    columnName: { control: 'text', description: 'Header label' },
    cellCount: { control: 'number', description: 'Number of cells (ignored when cellValues provided)' },
    cellValues: { control: 'object', description: 'Optional explicit cell text values' },
    width: { control: 'text', description: 'Column width (CSS value)' },
  },
};

export default meta;
type Story = StoryObj<RaisTableColumnComponent>;

export const DefaultColumn: Story = {
  name: 'Default Column',
  args: { variant: 'default', columnName: 'Column Name', cellCount: 20 },
};

export const CheckboxColumn: Story = {
  name: 'Checkbox Column',
  args: { variant: 'checkboxes', columnName: 'Column Name', cellCount: 20 },
};

export const InputFieldColumn: Story = {
  name: 'Input Field Column',
  args: { variant: 'input-field-selectors', columnName: 'Column Name', cellCount: 20 },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;align-items:flex-start;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Default</span>
          <rais-table-column variant="default" columnName="Column Name" [cellCount]="10"></rais-table-column>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Checkboxes</span>
          <rais-table-column variant="checkboxes" columnName="Column Name" [cellCount]="10"></rais-table-column>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Input Field Selectors</span>
          <rais-table-column variant="input-field-selectors" columnName="Column Name" [cellCount]="10"></rais-table-column>
        </div>
      </div>
    `,
  }),
};

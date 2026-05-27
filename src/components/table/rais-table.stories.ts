import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisTableComponent } from './rais-table.component';
import { RaisTableColumnComponent } from '../table-column/rais-table-column.component';
import { RaisTableHeaderComponent } from '../table-header/rais-table-header.component';
import { RaisTableCellComponent } from '../table-cell/rais-table-cell.component';

const meta: Meta<RaisTableComponent> = {
  title: 'RAIS/Tables/Table',
  component: RaisTableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RaisTableComponent,
        RaisTableColumnComponent,
        RaisTableHeaderComponent,
        RaisTableCellComponent,
      ],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'loading', 'pagination-footer'],
      description: 'Table variant',
    },
    columnCount: { control: 'number', description: 'Number of columns to render' },
    rowCount: { control: 'number', description: 'Number of data rows to render' },
    columnNames: { control: 'object', description: 'Optional explicit column header labels' },
    currentPage: { control: 'number', description: 'Current page (pagination-footer variant)' },
    totalPages: { control: 'number', description: 'Total pages (pagination-footer variant)' },
  },
};

export default meta;
type Story = StoryObj<RaisTableComponent>;

export const Default: Story = {
  args: { variant: 'default', columnCount: 10, rowCount: 20 },
};

export const Loading: Story = {
  args: { variant: 'loading', columnCount: 10, rowCount: 20 },
};

export const WithPaginationFooter: Story = {
  name: 'With Pagination Footer',
  args: {
    variant: 'pagination-footer',
    columnCount: 10,
    rowCount: 20,
    currentPage: 1,
    totalPages: 10,
  },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">
        <section>
          <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8D9091;margin:0 0 12px;">Default</h3>
          <rais-table variant="default" [columnCount]="6" [rowCount]="8"></rais-table>
        </section>
        <section>
          <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8D9091;margin:0 0 12px;">Loading</h3>
          <rais-table variant="loading" [columnCount]="6" [rowCount]="8"></rais-table>
        </section>
        <section>
          <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8D9091;margin:0 0 12px;">With Pagination Footer</h3>
          <rais-table variant="pagination-footer" [columnCount]="6" [rowCount]="8" [currentPage]="1" [totalPages]="10"></rais-table>
        </section>
      </div>
    `,
  }),
};

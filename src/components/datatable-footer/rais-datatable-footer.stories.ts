import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisDatatableFooterComponent } from './rais-datatable-footer.component';

const meta: Meta<RaisDatatableFooterComponent> = {
  title: 'RAIS/Tables/Datatable Footer',
  component: RaisDatatableFooterComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisDatatableFooterComponent] }),
  ],
  argTypes: {
    currentPage:      { control: 'number', description: 'Currently selected page (1-based)' },
    totalPages:       { control: 'number', description: 'Total number of pages' },
    pageSize:         { control: 'select', options: [10, 25, 50, 100], description: 'Rows per page value' },
    pageSizeOptions:  { control: 'object', description: 'Rows-per-page choices in the dropdown menu' },
    showScrollbar:    { control: 'boolean', description: 'Show the slim scrollbar indicator on top' },
    visiblePageCount: { control: 'number', description: 'Number of page buttons to render' },
    pageSizeChange:   { action: 'pageSizeChange', description: 'Emits the rows-per-page value picked from the dropdown' },
  },
};

export default meta;
type Story = StoryObj<RaisDatatableFooterComponent>;

export const Default: Story = {
  args: { currentPage: 1, totalPages: 10, pageSize: 25, showScrollbar: true, visiblePageCount: 5 },
};

export const MiddlePage: Story = {
  args: { currentPage: 3, totalPages: 10, pageSize: 25, showScrollbar: true, visiblePageCount: 5 },
};

export const LargerPageSize: Story = {
  args: { currentPage: 1, totalPages: 25, pageSize: 50, showScrollbar: true, visiblePageCount: 5 },
};

export const NoScrollbar: Story = {
  args: { currentPage: 1, totalPages: 10, pageSize: 25, showScrollbar: false, visiblePageCount: 5 },
};

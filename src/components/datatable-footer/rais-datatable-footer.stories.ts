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
    pageSize:         { control: 'number', description: 'Rows per page value' },
    showScrollbar:    { control: 'boolean', description: 'Show the slim scrollbar indicator on top' },
    visiblePageCount: { control: 'number', description: 'Number of page buttons to render' },
  },
};

export default meta;
type Story = StoryObj<RaisDatatableFooterComponent>;

export const Default: Story = {
  args: { currentPage: 1, totalPages: 10, pageSize: 10, showScrollbar: true, visiblePageCount: 5 },
};

export const MiddlePage: Story = {
  args: { currentPage: 3, totalPages: 10, pageSize: 10, showScrollbar: true, visiblePageCount: 5 },
};

export const LargerPageSize: Story = {
  args: { currentPage: 1, totalPages: 25, pageSize: 50, showScrollbar: true, visiblePageCount: 5 },
};

export const NoScrollbar: Story = {
  args: { currentPage: 1, totalPages: 10, pageSize: 10, showScrollbar: false, visiblePageCount: 5 },
};

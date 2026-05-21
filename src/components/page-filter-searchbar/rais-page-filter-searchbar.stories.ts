import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisPageFilterSearchbarComponent } from './rais-page-filter-searchbar.component';

const meta: Meta<RaisPageFilterSearchbarComponent> = {
  title: 'RAIS/Filters/PageFilter Searchbar',
  component: RaisPageFilterSearchbarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RaisPageFilterSearchbarComponent],
    }),
  ],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty',
    },
    value: {
      control: 'text',
      description: 'Current search value',
    },
    width: {
      control: 'number',
      description: 'Width in pixels (default 343px)',
    },
  },
};

export default meta;
type Story = StoryObj<RaisPageFilterSearchbarComponent>;

export const Default: Story = {
  args: { placeholder: 'Search...', value: '', width: 343 },
};

export const WithValue: Story = {
  args: { placeholder: 'Search...', value: 'Plumbing', width: 343 },
};

export const Narrow: Story = {
  args: { placeholder: 'Search...', value: '', width: 200 },
};

export const Wide: Story = {
  args: { placeholder: 'Search...', value: '', width: 500 },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;">
        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">DEFAULT (343px)</span>
        <rais-page-filter-searchbar placeholder="Search..." [width]="343"></rais-page-filter-searchbar>

        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">WITH VALUE</span>
        <rais-page-filter-searchbar placeholder="Search..." value="Plumbing" [width]="343"></rais-page-filter-searchbar>

        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">NARROW (200px)</span>
        <rais-page-filter-searchbar placeholder="Search..." [width]="200"></rais-page-filter-searchbar>

        <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">WIDE (500px)</span>
        <rais-page-filter-searchbar placeholder="Search..." [width]="500"></rais-page-filter-searchbar>
      </div>
    `,
  }),
};

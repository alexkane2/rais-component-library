import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisPageFilterDropdownComponent } from './rais-page-filter-dropdown.component';

const meta: Meta<RaisPageFilterDropdownComponent> = {
  title: 'RAIS/Filters/PageFilter Dropdown',
  component: RaisPageFilterDropdownComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisPageFilterDropdownComponent] }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Filter label e.g. "Sort By", "Region", "Status"',
    },
    value: {
      control: 'text',
      description: 'Selected value — leave empty to show placeholder',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value selected',
    },
    labelPlacement: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'horizontal=label left of input | vertical=label above input',
    },
    width: {
      control: 'number',
      description: 'Input width in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<RaisPageFilterDropdownComponent>;

export const HorizontalWithValue: Story = {
  name: 'Horizontal — With Value',
  args: { label: 'Sort By', value: 'Policy Holder (A-Z)', labelPlacement: 'horizontal', width: 152 },
};

export const HorizontalPlaceholder: Story = {
  name: 'Horizontal — Placeholder',
  args: { label: 'Sort By', value: '', placeholder: 'Nocerino Family', labelPlacement: 'horizontal', width: 152 },
};

export const VerticalWithValue: Story = {
  name: 'Vertical — With Value',
  args: { label: 'Sort By', value: 'Policy Holder (A-Z)', labelPlacement: 'vertical', width: 203 },
};

export const VerticalPlaceholder: Story = {
  name: 'Vertical — Placeholder',
  args: { label: 'Sort By', value: '', placeholder: 'Nocerino Family', labelPlacement: 'vertical', width: 203 },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">HORIZONTAL LABEL</span>
          <div style="display:flex;gap:24px;align-items:center;">
            <rais-page-filter-dropdown label="Sort By" value="Policy Holder (A-Z)" labelPlacement="horizontal" [width]="152"></rais-page-filter-dropdown>
            <rais-page-filter-dropdown label="Sort By" placeholder="Select..." labelPlacement="horizontal" [width]="152"></rais-page-filter-dropdown>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">VERTICAL LABEL</span>
          <div style="display:flex;gap:24px;align-items:flex-start;">
            <rais-page-filter-dropdown label="Sort By" value="Policy Holder (A-Z)" labelPlacement="vertical" [width]="203"></rais-page-filter-dropdown>
            <rais-page-filter-dropdown label="Sort By" placeholder="Select..." labelPlacement="vertical" [width]="203"></rais-page-filter-dropdown>
          </div>
        </div>
      </div>
    `,
  }),
};

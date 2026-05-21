import type { Meta, StoryObj } from '@storybook/angular';
import { RaisSelectionLabelComponent } from './rais-selection-label.component';

const meta: Meta<RaisSelectionLabelComponent> = {
  title: 'RAIS/Inputs/Selection Label',
  component: RaisSelectionLabelComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Chip label text' },
    style: {
      control: 'select',
      options: ['squared', 'rounded'],
      description: 'squared=4px radius (used in multiselect dropdowns) | rounded=16px radius (used in filter bars)',
    },
  },
};

export default meta;
type Story = StoryObj<RaisSelectionLabelComponent>;

export const Squared: Story = {
  args: { label: 'Label', style: 'squared' },
};

export const Rounded: Story = {
  args: { label: 'Label', style: 'rounded' },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-family:'Figtree',sans-serif;font-size:12px;color:#8D9091;">Squared — used in dropdowns</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <rais-selection-label label="Label"        style="squared"></rais-selection-label>
            <rais-selection-label label="Longer Label" style="squared"></rais-selection-label>
            <rais-selection-label label="Label"        style="squared"></rais-selection-label>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-family:'Figtree',sans-serif;font-size:12px;color:#8D9091;">Rounded — used in filter bars</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <rais-selection-label label="Label"        style="rounded"></rais-selection-label>
            <rais-selection-label label="Longer Label" style="rounded"></rais-selection-label>
            <rais-selection-label label="Label"        style="rounded"></rais-selection-label>
          </div>
        </div>
      </div>
    `,
  }),
};

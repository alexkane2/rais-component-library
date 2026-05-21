import type { Meta, StoryObj } from '@storybook/angular';
import { RaisBadgeComponent } from './rais-badge.component';

const meta: Meta<RaisBadgeComponent> = {
  title: 'RAIS/Labeling/Badge',
  component: RaisBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'focus', 'error'],
      description: 'Badge status variant — drives the fill color',
    },
  },
};

export default meta;
type Story = StoryObj<RaisBadgeComponent>;

export const Success: Story = {
  args: { variant: 'success' },
};

export const Focus: Story = {
  args: { variant: 'focus' },
};

export const Error: Story = {
  args: { variant: 'error' },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:32px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
        <div style="display:flex;gap:32px;align-items:center;">
          <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
            <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Success</span>
            <rais-badge variant="success"></rais-badge>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
            <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Focus</span>
            <rais-badge variant="focus"></rais-badge>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
            <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Error</span>
            <rais-badge variant="error"></rais-badge>
          </div>
        </div>
      </div>
    `,
  }),
};

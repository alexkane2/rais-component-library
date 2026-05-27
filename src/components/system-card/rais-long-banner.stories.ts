import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisSystemCardComponent } from './rais-system-card.component';

/**
 * Long Banner — 1500px-wide horizontal info bar with icon, headline,
 * message, CTA button, and dismiss X. Same underlying component as Banner
 * and Toast (RaisSystemCardComponent) with `format` locked to `'long-banner'`.
 * Only `info` message type is defined in Figma for this format.
 */
const meta: Meta<RaisSystemCardComponent> = {
  title: 'RAIS/Long Banners/Long Banner',
  component: RaisSystemCardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisSystemCardComponent] }),
  ],
  args: { format: 'long-banner', messageType: 'info' },
  argTypes: {
    background: {
      control: 'select',
      options: ['white', 'gray', 'color'],
      description: 'Background treatment',
    },
    header:        { control: 'text' },
    message:       { control: 'text' },
    ctaLabel:      { control: 'text', description: 'Long-banner CTA label' },
    showHeader:    { control: 'boolean' },
    showCloseIcon: { control: 'boolean' },
    // Lock format + messageType — long banners are info-only per Figma
    format:        { table: { disable: true } },
    messageType:   { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<RaisSystemCardComponent>;

export const InfoWhite: Story = { name: 'Info / White', args: { background: 'white' } };
export const InfoGray: Story  = { name: 'Info / Gray',  args: { background: 'gray' } };
export const InfoColor: Story = { name: 'Info / Color', args: { background: 'color' } };

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">
        <rais-system-card format="long-banner" messageType="info" background="white"></rais-system-card>
        <rais-system-card format="long-banner" messageType="info" background="gray"></rais-system-card>
        <rais-system-card format="long-banner" messageType="info" background="color"></rais-system-card>
      </div>
    `,
  }),
};

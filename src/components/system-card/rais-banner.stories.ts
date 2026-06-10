import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisSystemCardComponent } from './rais-system-card.component';

/**
 * Banner — 742px-wide info panel with status icon, headline, body, optional
 * action buttons, and a dismiss X. Same underlying component as Long Banner
 * and Toast (RaisSystemCardComponent) with `format` locked to `'banner'`.
 */
const meta: Meta<RaisSystemCardComponent> = {
  title: 'RAIS/Content/System Cards/Banner',
  component: RaisSystemCardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisSystemCardComponent] }),
  ],
  args: { format: 'banner' },
  argTypes: {
    messageType: {
      control: 'select',
      options: ['info', 'error', 'warning', 'success'],
      description: 'Severity — drives icon and accent color',
    },
    background: {
      control: 'select',
      options: ['white', 'color'],
      description: 'Background treatment',
    },
    header:            { control: 'text' },
    message:           { control: 'text' },
    primaryCtaLabel:   { control: 'text' },
    secondaryCtaLabel: { control: 'text' },
    showHeader:        { control: 'boolean' },
    showCloseIcon:     { control: 'boolean' },
    showButton:        { control: 'boolean', description: 'Show primary CTA' },
    show2ndButton:     { control: 'boolean', description: 'Show secondary CTA' },
    // Hide format from controls — banners always use 'banner'
    format:            { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<RaisSystemCardComponent>;

// ─── White background × type ──
export const InfoWhite: Story    = { name: 'Info / White',    args: { messageType: 'info',    background: 'white' } };
export const ErrorWhite: Story   = { name: 'Error / White',   args: { messageType: 'error',   background: 'white' } };
export const WarningWhite: Story = { name: 'Warning / White', args: { messageType: 'warning', background: 'white' } };
export const SuccessWhite: Story = { name: 'Success / White', args: { messageType: 'success', background: 'white' } };

// ─── Color background × type ──
export const InfoColor: Story    = { name: 'Info / Color',    args: { messageType: 'info',    background: 'color' } };
export const ErrorColor: Story   = { name: 'Error / Color',   args: { messageType: 'error',   background: 'color' } };
export const WarningColor: Story = { name: 'Warning / Color', args: { messageType: 'warning', background: 'color' } };
export const SuccessColor: Story = { name: 'Success / Color', args: { messageType: 'success', background: 'color' } };

// ─── All banner variants laid out together ──
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,742px);gap:16px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">
        <rais-system-card format="banner" messageType="info"    background="white"></rais-system-card>
        <rais-system-card format="banner" messageType="info"    background="color"></rais-system-card>
        <rais-system-card format="banner" messageType="error"   background="white"></rais-system-card>
        <rais-system-card format="banner" messageType="error"   background="color"></rais-system-card>
        <rais-system-card format="banner" messageType="warning" background="white"></rais-system-card>
        <rais-system-card format="banner" messageType="warning" background="color"></rais-system-card>
        <rais-system-card format="banner" messageType="success" background="white"></rais-system-card>
        <rais-system-card format="banner" messageType="success" background="color"></rais-system-card>
      </div>
    `,
  }),
};

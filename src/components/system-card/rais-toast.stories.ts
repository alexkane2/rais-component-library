import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisSystemCardComponent } from './rais-system-card.component';

/**
 * Toast — 390px-wide compact notification with status icon, headline,
 * short message, and a dismiss X (with vertical divider). Same underlying
 * component as Banner and Long Banner (RaisSystemCardComponent) with
 * `format` locked to `'toast'`.
 */
const meta: Meta<RaisSystemCardComponent> = {
  title: 'RAIS/Content/System Cards/Toast',
  component: RaisSystemCardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisSystemCardComponent] }),
  ],
  // Figma toast copy (node 221:7677) — short single-line message
  args: { format: 'toast', message: 'Lorem ipsum dolor sit amet consectetur.' },
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
    header:        { control: 'text' },
    message:       { control: 'text' },
    showHeader:    { control: 'boolean' },
    showCloseIcon: { control: 'boolean' },
    // Hide format — toasts always use 'toast'
    format:        { table: { disable: true } },
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

export const AllVariants: Story = {
  render: () => ({
    props: { msg: 'Lorem ipsum dolor sit amet consectetur.' },
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,390px);gap:16px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">
        <rais-system-card format="toast" messageType="info"    background="white" [message]="msg"></rais-system-card>
        <rais-system-card format="toast" messageType="info"    background="color" [message]="msg"></rais-system-card>
        <rais-system-card format="toast" messageType="error"   background="white" [message]="msg"></rais-system-card>
        <rais-system-card format="toast" messageType="error"   background="color" [message]="msg"></rais-system-card>
        <rais-system-card format="toast" messageType="warning" background="white" [message]="msg"></rais-system-card>
        <rais-system-card format="toast" messageType="warning" background="color" [message]="msg"></rais-system-card>
        <rais-system-card format="toast" messageType="success" background="white" [message]="msg"></rais-system-card>
        <rais-system-card format="toast" messageType="success" background="color" [message]="msg"></rais-system-card>
      </div>
    `,
  }),
};

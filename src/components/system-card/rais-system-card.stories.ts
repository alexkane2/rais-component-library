import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisSystemCardComponent } from './rais-system-card.component';

const meta: Meta<RaisSystemCardComponent> = {
  title: 'RAIS/Empty States/System Card',
  component: RaisSystemCardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisSystemCardComponent] }),
  ],
  argTypes: {
    format: {
      control: 'select',
      options: ['banner', 'toast', 'long-banner'],
      description: 'Layout family — drives the overall shape',
    },
    messageType: {
      control: 'select',
      options: ['info', 'error', 'warning', 'success'],
      description: 'Severity — drives icon and accent color (long-banner is info only)',
    },
    background: {
      control: 'select',
      options: ['white', 'color', 'gray'],
      description: 'Background treatment (gray only meaningful for long-banner)',
    },
    header: { control: 'text', description: 'Bold title text' },
    message: { control: 'text', description: 'Body copy' },
    primaryCtaLabel: { control: 'text', description: 'Primary CTA label (banner)' },
    secondaryCtaLabel: { control: 'text', description: 'Secondary CTA label (banner)' },
    ctaLabel: { control: 'text', description: 'Long-banner CTA label' },
    showHeader: { control: 'boolean' },
    showCloseIcon: { control: 'boolean' },
    showButton: { control: 'boolean', description: 'Banner only: show primary CTA' },
    show2ndButton: { control: 'boolean', description: 'Banner only: show secondary CTA' },
  },
};

export default meta;
type Story = StoryObj<RaisSystemCardComponent>;

// ─── Banner × Type × Background (8 variants) ──
export const BannerInfoWhite: Story = {
  name: 'Banner — Info / White',
  args: { format: 'banner', messageType: 'info', background: 'white' },
};
export const BannerErrorWhite: Story = {
  name: 'Banner — Error / White',
  args: { format: 'banner', messageType: 'error', background: 'white' },
};
export const BannerWarningWhite: Story = {
  name: 'Banner — Warning / White',
  args: { format: 'banner', messageType: 'warning', background: 'white' },
};
export const BannerSuccessWhite: Story = {
  name: 'Banner — Success / White',
  args: { format: 'banner', messageType: 'success', background: 'white' },
};
export const BannerInfoColor: Story = {
  name: 'Banner — Info / Color',
  args: { format: 'banner', messageType: 'info', background: 'color' },
};
export const BannerErrorColor: Story = {
  name: 'Banner — Error / Color',
  args: { format: 'banner', messageType: 'error', background: 'color' },
};
export const BannerWarningColor: Story = {
  name: 'Banner — Warning / Color',
  args: { format: 'banner', messageType: 'warning', background: 'color' },
};
export const BannerSuccessColor: Story = {
  name: 'Banner — Success / Color',
  args: { format: 'banner', messageType: 'success', background: 'color' },
};

// ─── Long Banner × Background (3 variants — info only) ──
export const LongBannerInfoWhite: Story = {
  name: 'Long Banner — Info / White',
  args: { format: 'long-banner', messageType: 'info', background: 'white' },
};
export const LongBannerInfoGray: Story = {
  name: 'Long Banner — Info / Gray',
  args: { format: 'long-banner', messageType: 'info', background: 'gray' },
};
export const LongBannerInfoColor: Story = {
  name: 'Long Banner — Info / Color',
  args: { format: 'long-banner', messageType: 'info', background: 'color' },
};

// ─── Toast × Type × Background (8 variants) ──
export const ToastInfoWhite: Story = {
  name: 'Toast — Info / White',
  args: { format: 'toast', messageType: 'info', background: 'white' },
};
export const ToastErrorWhite: Story = {
  name: 'Toast — Error / White',
  args: { format: 'toast', messageType: 'error', background: 'white' },
};
export const ToastWarningWhite: Story = {
  name: 'Toast — Warning / White',
  args: { format: 'toast', messageType: 'warning', background: 'white' },
};
export const ToastSuccessWhite: Story = {
  name: 'Toast — Success / White',
  args: { format: 'toast', messageType: 'success', background: 'white' },
};
export const ToastInfoColor: Story = {
  name: 'Toast — Info / Color',
  args: { format: 'toast', messageType: 'info', background: 'color' },
};
export const ToastErrorColor: Story = {
  name: 'Toast — Error / Color',
  args: { format: 'toast', messageType: 'error', background: 'color' },
};
export const ToastWarningColor: Story = {
  name: 'Toast — Warning / Color',
  args: { format: 'toast', messageType: 'warning', background: 'color' },
};
export const ToastSuccessColor: Story = {
  name: 'Toast — Success / Color',
  args: { format: 'toast', messageType: 'success', background: 'color' },
};

// ─── All variants laid out as in the Figma spec sheet ──
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">

        <!-- Banners — 4 types × 2 backgrounds -->
        <section>
          <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8D9091;margin:0 0 12px;">Banners</h3>
          <div style="display:grid;grid-template-columns:repeat(2,742px);gap:16px;">
            <rais-system-card format="banner" messageType="info"    background="white"></rais-system-card>
            <rais-system-card format="banner" messageType="info"    background="color"></rais-system-card>
            <rais-system-card format="banner" messageType="error"   background="white"></rais-system-card>
            <rais-system-card format="banner" messageType="error"   background="color"></rais-system-card>
            <rais-system-card format="banner" messageType="warning" background="white"></rais-system-card>
            <rais-system-card format="banner" messageType="warning" background="color"></rais-system-card>
            <rais-system-card format="banner" messageType="success" background="white"></rais-system-card>
            <rais-system-card format="banner" messageType="success" background="color"></rais-system-card>
          </div>
        </section>

        <!-- Long Banners — 3 backgrounds -->
        <section>
          <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8D9091;margin:0 0 12px;">Long Banners</h3>
          <div style="display:flex;flex-direction:column;gap:16px;">
            <rais-system-card format="long-banner" messageType="info" background="white"></rais-system-card>
            <rais-system-card format="long-banner" messageType="info" background="gray"></rais-system-card>
            <rais-system-card format="long-banner" messageType="info" background="color"></rais-system-card>
          </div>
        </section>

        <!-- Toasts — 4 types × 2 backgrounds -->
        <section>
          <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8D9091;margin:0 0 12px;">Toasts</h3>
          <div style="display:grid;grid-template-columns:repeat(2,390px);gap:16px;">
            <rais-system-card format="toast" messageType="info"    background="white"></rais-system-card>
            <rais-system-card format="toast" messageType="info"    background="color"></rais-system-card>
            <rais-system-card format="toast" messageType="error"   background="white"></rais-system-card>
            <rais-system-card format="toast" messageType="error"   background="color"></rais-system-card>
            <rais-system-card format="toast" messageType="warning" background="white"></rais-system-card>
            <rais-system-card format="toast" messageType="warning" background="color"></rais-system-card>
            <rais-system-card format="toast" messageType="success" background="white"></rais-system-card>
            <rais-system-card format="toast" messageType="success" background="color"></rais-system-card>
          </div>
        </section>

      </div>
    `,
  }),
};

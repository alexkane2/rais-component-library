import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisModalComponent } from './rais-modal.component';

const meta: Meta<RaisModalComponent> = {
  title: 'RAIS/Content/Modal',
  component: RaisModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisModalComponent] }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: 'Modal width: default=500px, small=300px',
    },
    alignment: {
      control: 'select',
      options: ['centered', 'left-aligned'],
      description: 'Text and content alignment inside the modal',
    },
    buttonLayout: {
      control: 'select',
      options: ['side-by-side', 'stacked'],
      description: 'Button layout (small variants only)',
    },
    headline:          { control: 'text', description: 'Headline / title text' },
    body:              { control: 'text', description: 'Body paragraph copy' },
    primaryCtaLabel:   { control: 'text', description: 'Primary CTA label' },
    secondaryCtaLabel: { control: 'text', description: 'Secondary CTA label' },
    showParagraph:     { control: 'boolean', description: 'Show body paragraph' },
    showSecondary:     { control: 'boolean', description: 'Show secondary (Cancel) button' },
    showIcon:          { control: 'boolean', description: 'Show large info icon above headline' },
    showCloseButton:   { control: 'boolean', description: 'Show the X close button (top-right)' },
    showBackdrop:      { control: 'boolean', description: 'Render backdrop overlay (production usage)' },
  },
};

export default meta;
type Story = StoryObj<RaisModalComponent>;

// ─── Default size variants (500px) ──
export const DefaultCentered: Story = {
  name: 'Default — Centered + Side by Side',
  args: { size: 'default', alignment: 'centered', buttonLayout: 'side-by-side' },
};
export const DefaultLeftAligned: Story = {
  name: 'Default — Left Aligned + Side by Side',
  args: { size: 'default', alignment: 'left-aligned', buttonLayout: 'side-by-side' },
};

// ─── Small size variants (300px) ──
export const SmallStackedCentered: Story = {
  name: 'Small — Stacked + Centered',
  args: { size: 'small', alignment: 'centered', buttonLayout: 'stacked' },
};
export const SmallSideBySideLeftAligned: Story = {
  name: 'Small — Side by Side + Left Aligned',
  args: { size: 'small', alignment: 'left-aligned', buttonLayout: 'side-by-side' },
};

// ─── With info icon ──
export const WithIcon: Story = {
  args: {
    size: 'default',
    alignment: 'centered',
    buttonLayout: 'side-by-side',
    showIcon: true,
  },
};

// ─── No secondary button (just Confirm) ──
export const ConfirmOnly: Story = {
  args: {
    size: 'default',
    alignment: 'centered',
    buttonLayout: 'side-by-side',
    showSecondary: false,
  },
};

// ─── No paragraph (just headline + buttons) ──
export const NoParagraph: Story = {
  args: {
    size: 'default',
    alignment: 'centered',
    buttonLayout: 'side-by-side',
    showParagraph: false,
  },
};

// ─── With backdrop (production view) ──
export const WithBackdrop: Story = {
  args: {
    size: 'default',
    alignment: 'centered',
    buttonLayout: 'side-by-side',
    showBackdrop: true,
  },
};

// ─── All four canonical variants laid out together ──
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,500px);gap:48px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;align-items:start;">

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Default — Centered</div>
          <rais-modal size="default" alignment="centered" buttonLayout="side-by-side"></rais-modal>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Default — Left Aligned</div>
          <rais-modal size="default" alignment="left-aligned" buttonLayout="side-by-side"></rais-modal>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Small — Stacked Centered</div>
          <rais-modal size="small" alignment="centered" buttonLayout="stacked"></rais-modal>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Small — Side by Side Left</div>
          <rais-modal size="small" alignment="left-aligned" buttonLayout="side-by-side"></rais-modal>
        </div>

      </div>
    `,
  }),
};

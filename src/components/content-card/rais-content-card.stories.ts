import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisContentCardComponent } from './rais-content-card.component';

const meta: Meta<RaisContentCardComponent> = {
  title: 'RAIS/Content/Content Card',
  component: RaisContentCardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisContentCardComponent] }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['standard', 'with-link', 'list', 'standard-link', 'small-link', 'standard-no-cta', 'small-no-link'],
      description: 'Layout variant — drives the entire card structure',
    },
    alignment: {
      control: 'select',
      options: ['left', 'centered'],
      description: 'Text alignment of header/paragraph and button width behavior',
    },
    color: {
      control: 'select',
      options: ['white', 'blue'],
      description: 'Background/accent color (only meaningful for type=list)',
    },
    header: { control: 'text', description: 'Heading text' },
    paragraph: { control: 'text', description: 'Body copy' },
    ctaLabel: { control: 'text', description: 'Call-to-action label' },
    showCta: { control: 'boolean', description: 'Show CTA button on type=standard + alignment=left' },
    listItems: { control: 'object', description: 'Label/value rows for type=list' },
  },
};

export default meta;
type Story = StoryObj<RaisContentCardComponent>;

// ─── List (the only variants that use color=blue) ──
export const ListWhite: Story = {
  args: { type: 'list', alignment: 'left', color: 'white' },
};
export const ListBlue: Story = {
  args: { type: 'list', alignment: 'left', color: 'blue' },
};

// ─── Standard (filled button CTA) ──
export const StandardLeft: Story = {
  args: { type: 'standard', alignment: 'left', color: 'white', showCta: true },
};
export const StandardCentered: Story = {
  args: { type: 'standard', alignment: 'centered', color: 'white', showCta: true },
};

// ─── Bordered CTA section types ──
export const StandardLinkCentered: Story = {
  name: 'Standard Link (Centered)',
  args: { type: 'standard-link', alignment: 'centered', color: 'white' },
};
export const WithLinkCentered: Story = {
  name: 'With Link (Centered)',
  args: { type: 'with-link', alignment: 'centered', color: 'white' },
};

// ─── Small Link (inline) ──
export const SmallLinkLeft: Story = {
  name: 'Small Link (Left)',
  args: { type: 'small-link', alignment: 'left', color: 'white' },
};
export const SmallLinkCentered: Story = {
  name: 'Small Link (Centered)',
  args: { type: 'small-link', alignment: 'centered', color: 'white' },
};

// ─── No CTA / No Link ──
export const StandardNoCtaLeft: Story = {
  name: 'Standard No CTA (Left)',
  args: { type: 'standard-no-cta', alignment: 'left', color: 'white' },
};
export const StandardNoCtaCentered: Story = {
  name: 'Standard No CTA (Centered)',
  args: { type: 'standard-no-cta', alignment: 'centered', color: 'white' },
};
export const SmallNoLinkLeft: Story = {
  name: 'Small No Link (Left)',
  args: { type: 'small-no-link', alignment: 'left', color: 'white' },
};
export const SmallNoLinkCentered: Story = {
  name: 'Small No Link (Centered)',
  args: { type: 'small-no-link', alignment: 'centered', color: 'white' },
};

// ─── All variants laid out as a 3-column grid (mirrors the Figma spec sheet) ──
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;align-items:flex-start;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">

        <!-- Column 1: List variants -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">List</span>
          <rais-content-card type="list" alignment="left" color="white"></rais-content-card>
          <rais-content-card type="list" alignment="left" color="blue"></rais-content-card>
        </div>

        <!-- Column 2: Centered variants -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Centered</span>
          <rais-content-card type="standard" alignment="centered"></rais-content-card>
          <rais-content-card type="standard-link" alignment="centered"></rais-content-card>
          <rais-content-card type="small-link" alignment="centered"></rais-content-card>
          <rais-content-card type="standard-no-cta" alignment="centered"></rais-content-card>
          <rais-content-card type="small-no-link" alignment="centered"></rais-content-card>
        </div>

        <!-- Column 3: Left variants -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <span style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Left</span>
          <rais-content-card type="standard" alignment="left"></rais-content-card>
          <rais-content-card type="with-link" alignment="centered"></rais-content-card>
          <rais-content-card type="small-link" alignment="left"></rais-content-card>
          <rais-content-card type="standard-no-cta" alignment="left"></rais-content-card>
          <rais-content-card type="small-no-link" alignment="left"></rais-content-card>
        </div>

      </div>
    `,
  }),
};

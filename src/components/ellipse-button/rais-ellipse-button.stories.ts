import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisEllipseButtonComponent } from './rais-ellipse-button.component';

const meta: Meta<RaisEllipseButtonComponent> = {
  title: 'RAIS/Buttons/Ellipse Button',
  component: RaisEllipseButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisEllipseButtonComponent] }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Visual type — drives fill, border, and icon color',
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: 'Outer dimension preset',
    },
    ariaLabel: { control: 'text', description: 'Accessible label' },
    disabled:  { control: 'boolean', description: 'Disabled state' },
  },
};

export default meta;
type Story = StoryObj<RaisEllipseButtonComponent>;

// ─── Primary × sizes ──
export const PrimaryLarge:  Story = { name: 'Primary — Large',  args: { type: 'primary',  size: 'large' } };
export const PrimaryMedium: Story = { name: 'Primary — Medium', args: { type: 'primary',  size: 'medium' } };
export const PrimarySmall:  Story = { name: 'Primary — Small',  args: { type: 'primary',  size: 'small' } };

// ─── Secondary × sizes ──
export const SecondaryLarge:  Story = { name: 'Secondary — Large',  args: { type: 'secondary', size: 'large' } };
export const SecondaryMedium: Story = { name: 'Secondary — Medium', args: { type: 'secondary', size: 'medium' } };
export const SecondarySmall:  Story = { name: 'Secondary — Small',  args: { type: 'secondary', size: 'small' } };

// ─── Tertiary × sizes ──
export const TertiaryLarge:  Story = { name: 'Tertiary — Large',  args: { type: 'tertiary',  size: 'large' } };
export const TertiaryMedium: Story = { name: 'Tertiary — Medium', args: { type: 'tertiary',  size: 'medium' } };
export const TertiarySmall:  Story = { name: 'Tertiary — Small',  args: { type: 'tertiary',  size: 'small' } };

// ─── Disabled state ──
export const Disabled: Story = {
  args: { type: 'primary', size: 'large', disabled: true },
};

// ─── All 9 variants in a 3×3 grid ──
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:inline-grid;grid-template-columns:repeat(3,auto);gap:16px;padding:32px;background:#FFFFFF;border:1px solid #CCC;border-radius:8px;font-family:'Figtree',sans-serif;align-items:center;justify-items:center;">
        <rais-ellipse-button type="primary"   size="large"></rais-ellipse-button>
        <rais-ellipse-button type="primary"   size="medium"></rais-ellipse-button>
        <rais-ellipse-button type="primary"   size="small"></rais-ellipse-button>

        <rais-ellipse-button type="secondary" size="large"></rais-ellipse-button>
        <rais-ellipse-button type="secondary" size="medium"></rais-ellipse-button>
        <rais-ellipse-button type="secondary" size="small"></rais-ellipse-button>

        <rais-ellipse-button type="tertiary"  size="large"></rais-ellipse-button>
        <rais-ellipse-button type="tertiary"  size="medium"></rais-ellipse-button>
        <rais-ellipse-button type="tertiary"  size="small"></rais-ellipse-button>
      </div>
    `,
  }),
};

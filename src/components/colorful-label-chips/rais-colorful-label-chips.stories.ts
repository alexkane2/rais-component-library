import type { Meta, StoryObj } from '@storybook/angular';
import { RaisColorfulLabelChipsComponent } from './rais-colorful-label-chips.component';

const COLOR_KEYS = [
  'gray-blue',
  'periwinkle',
  'teal',
  'forest-green',
  'pea-green',
  'yellow',
  'orange',
  'pink',
  'magenta',
  'warm-gray',
  'standard-blue',
  'standard-gray',
];

const ICON_OPTIONS = [
  '',
  'bxs-inbox',
  'bxs-tag',
  'bxs-bookmark',
  'bxs-star',
  'bxs-flag',
  'bxs-check-circle',
  'bxs-error-circle',
  'bxs-info-circle',
  'bxs-time',
  'bxs-bell',
  'bxs-folder',
  'bxs-category',
  'bx-check',
  'bx-x',
];

const meta: Meta<RaisColorfulLabelChipsComponent> = {
  title: 'RAIS/Labeling/Colorful Label Chips',
  component: RaisColorfulLabelChipsComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip label text',
    },
    color: {
      control: 'select',
      options: COLOR_KEYS,
      description: '12 color options — each uses the -600 token for text/icon and the -100 token for background',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'small=10px SemiBold | medium=12px SemiBold | large=13px SemiBold',
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Boxicons SVG name from assets/boxicons/ — defaults to bxs-inbox, empty for no icon',
    },
  },
};

export default meta;
type Story = StoryObj<RaisColorfulLabelChipsComponent>;

// ── Default examples per size ──
export const Small: Story = {
  args: { label: 'Label', color: 'gray-blue', size: 'small', icon: 'bxs-inbox' },
};

export const Medium: Story = {
  args: { label: 'Label', color: 'gray-blue', size: 'medium', icon: 'bxs-inbox' },
};

export const Large: Story = {
  args: { label: 'Label', color: 'gray-blue', size: 'large', icon: 'bxs-inbox' },
};

// ── Color examples ──
export const Periwinkle: Story    = { args: { label: 'Label', color: 'periwinkle',    size: 'medium', icon: 'bxs-inbox' } };
export const Teal: Story          = { args: { label: 'Label', color: 'teal',          size: 'medium', icon: 'bxs-inbox' } };
export const ForestGreen: Story   = { args: { label: 'Label', color: 'forest-green',  size: 'medium', icon: 'bxs-inbox' } };
export const PeaGreen: Story      = { args: { label: 'Label', color: 'pea-green',     size: 'medium', icon: 'bxs-inbox' } };
export const Yellow: Story        = { args: { label: 'Label', color: 'yellow',        size: 'medium', icon: 'bxs-inbox' } };
export const Orange: Story        = { args: { label: 'Label', color: 'orange',        size: 'medium', icon: 'bxs-inbox' } };
export const Pink: Story          = { args: { label: 'Label', color: 'pink',          size: 'medium', icon: 'bxs-inbox' } };
export const Magenta: Story       = { args: { label: 'Label', color: 'magenta',       size: 'medium', icon: 'bxs-inbox' } };
export const WarmGray: Story      = { args: { label: 'Label', color: 'warm-gray',     size: 'medium', icon: 'bxs-inbox' } };
export const StandardBlue: Story  = { args: { label: 'Label', color: 'standard-blue', size: 'medium', icon: 'bxs-inbox' } };
export const StandardGray: Story  = { args: { label: 'Label', color: 'standard-gray', size: 'medium', icon: 'bxs-inbox' } };

// ── Without icon ──
export const NoIcon: Story = {
  args: { label: 'Label', color: 'gray-blue', size: 'medium', icon: '' },
};

// ── All variants grid (12 colors × 3 sizes) ──
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">GRAY BLUE</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="gray-blue" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="gray-blue" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="gray-blue" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">PERIWINKLE</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="periwinkle" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="periwinkle" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="periwinkle" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">TEAL</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="teal" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="teal" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="teal" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">FOREST GREEN</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="forest-green" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="forest-green" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="forest-green" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">PEA GREEN</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="pea-green" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="pea-green" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="pea-green" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">YELLOW</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="yellow" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="yellow" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="yellow" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">ORANGE</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="orange" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="orange" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="orange" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">PINK</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="pink" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="pink" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="pink" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">MAGENTA</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="magenta" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="magenta" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="magenta" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">WARM GRAY</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="warm-gray" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="warm-gray" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="warm-gray" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">STANDARD BLUE</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="standard-blue" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="standard-blue" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="standard-blue" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">STANDARD GRAY</span>
          <div style="display:flex;gap:16px;align-items:center;">
            <rais-colorful-label-chips label="Label" color="standard-gray" size="small"  icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="standard-gray" size="medium" icon="bxs-inbox"></rais-colorful-label-chips>
            <rais-colorful-label-chips label="Label" color="standard-gray" size="large"  icon="bxs-inbox"></rais-colorful-label-chips>
          </div>
        </div>

      </div>
    `,
  }),
};

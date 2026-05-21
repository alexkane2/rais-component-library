import type { Meta, StoryObj } from '@storybook/angular';
import { RaisButtonComponent } from './rais-button.component';

// Icons available for selection — file names from public/assets/boxicons/
const ICON_OPTIONS = [
  '',
  'bx-download',
  'bx-upload',
  'bx-plus',
  'bx-minus',
  'bx-trash',
  'bx-edit',
  'bx-save',
  'bx-search',
  'bx-filter',
  'bx-refresh',
  'bx-check',
  'bx-x',
  'bx-right-arrow-alt',
  'bx-left-arrow-alt',
  'bx-export',
  'bx-import',
  'bx-copy',
  'bx-print',
  'bx-share-alt',
  'bx-link-external',
  'bxs-save',
  'bxs-download',
  'bxs-edit',
  'bxs-trash',
  'bxs-plus-circle',
  'bxs-check-circle',
];

const meta: Meta<RaisButtonComponent> = {
  title: 'RAIS/Buttons/Button',
  component: RaisButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Button label text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'disabled'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large'],
      description: 'Button size',
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Boxicons SVG from public/assets/boxicons/ — Angular: <img src="assets/boxicons/[name].svg" />',
    },
    iconPos: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
  },
};

export default meta;
type Story = StoryObj<RaisButtonComponent>;

export const Primary: Story    = { args: { label: 'Submit',      variant: 'primary',   size: 'normal', icon: '',                   iconPos: 'left' } };
export const Secondary: Story  = { args: { label: 'Cancel',      variant: 'secondary', size: 'normal', icon: '',                   iconPos: 'left' } };
export const Danger: Story     = { args: { label: 'Delete',      variant: 'danger',    size: 'normal', icon: '',                   iconPos: 'left' } };
export const Disabled: Story   = { args: { label: 'Unavailable', variant: 'disabled',  size: 'normal', icon: '',                   iconPos: 'left' } };
export const Small: Story      = { args: { label: 'Small',       variant: 'primary',   size: 'small',  icon: '',                   iconPos: 'left' } };
export const Large: Story      = { args: { label: 'Large',       variant: 'primary',   size: 'large',  icon: '',                   iconPos: 'left' } };
export const WithIconLeft: Story  = { args: { label: 'Download', variant: 'primary',   size: 'normal', icon: 'bx-download',        iconPos: 'left'  } };
export const WithIconRight: Story = { args: { label: 'Next',     variant: 'primary',   size: 'normal', icon: 'bx-right-arrow-alt', iconPos: 'right' } };

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;padding:24px;background:#F0F2F5;border-radius:8px;">
        <rais-button label="Primary"   variant="primary"   size="normal"></rais-button>
        <rais-button label="Secondary" variant="secondary" size="normal"></rais-button>
        <rais-button label="Danger"    variant="danger"    size="normal"></rais-button>
        <rais-button label="Disabled"  variant="disabled"  size="normal"></rais-button>
        <rais-button label="Small"     variant="primary"   size="small"></rais-button>
        <rais-button label="Large"     variant="primary"   size="large"></rais-button>
        <rais-button label="Download"  variant="primary"   size="normal" icon="bx-download"        iconPos="left"></rais-button>
        <rais-button label="Next"      variant="primary"   size="normal" icon="bx-right-arrow-alt" iconPos="right"></rais-button>
      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { RaisLinkComponent } from './rais-link.component';

const ICON_OPTIONS = [
  'bxs-plus-circle',
  'bx-external-link',
  'bx-right-arrow-alt',
  'bx-left-arrow-alt',
  'bx-link-external',
  'bx-download',
  'bx-upload',
  'bx-edit',
  'bx-check',
  'bx-info-circle',
  'bxs-check-circle',
  'bxs-info-circle',
];

const meta: Meta<RaisLinkComponent> = {
  title: 'RAIS/Buttons/Link',
  component: RaisLinkComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    href:  { control: 'text' },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Boxicons SVG from public/assets/boxicons/ — Angular: <img src="assets/boxicons/[name].svg" />',
    },
    size:  { control: 'select', options: ['large', 'medium', 'small'] },
    color: { control: 'select', options: ['blue', 'black', 'gray'] },
    state: { control: 'select', options: ['default', 'hover'] },
    iconLeft:  { control: 'boolean' },
    iconRight: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<RaisLinkComponent>;

export const BlueDefault: Story  = { args: { label: 'Label', size: 'medium', color: 'blue',  state: 'default', iconLeft: true,  iconRight: true } };
export const BlueHover: Story    = { args: { label: 'Label', size: 'medium', color: 'blue',  state: 'hover',   iconLeft: true,  iconRight: true } };
export const BlackDefault: Story = { args: { label: 'Label', size: 'medium', color: 'black', state: 'default', iconLeft: true,  iconRight: true } };
export const BlackHover: Story   = { args: { label: 'Label', size: 'medium', color: 'black', state: 'hover',   iconLeft: true,  iconRight: true } };
export const GrayDefault: Story  = { args: { label: 'Label', size: 'medium', color: 'gray',  state: 'default', iconLeft: true,  iconRight: true } };
export const GrayHover: Story    = { args: { label: 'Label', size: 'medium', color: 'gray',  state: 'hover',   iconLeft: true,  iconRight: true } };
export const Large: Story        = { args: { label: 'Label', size: 'large',  color: 'blue',  state: 'default', iconLeft: true,  iconRight: true } };
export const Small: Story        = { args: { label: 'Label', size: 'small',  color: 'blue',  state: 'default', iconLeft: true,  iconRight: true } };
export const TextOnly: Story     = { args: { label: 'Label', size: 'medium', color: 'blue',  state: 'default', iconLeft: false, iconRight: false } };
export const ExternalLink: Story = { args: { label: 'Open in new tab', size: 'medium', color: 'blue', state: 'default', icon: 'bx-external-link', iconLeft: false, iconRight: true } };

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">BLUE</span>
          <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
            <rais-link label="Default" size="medium" color="blue" state="default" [iconLeft]="true" [iconRight]="true"></rais-link>
            <rais-link label="Hover"   size="medium" color="blue" state="hover"   [iconLeft]="true" [iconRight]="true"></rais-link>
            <rais-link label="Large"   size="large"  color="blue" state="default" [iconLeft]="true" [iconRight]="true"></rais-link>
            <rais-link label="Small"   size="small"  color="blue" state="default" [iconLeft]="true" [iconRight]="true"></rais-link>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">BLACK</span>
          <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
            <rais-link label="Default" size="medium" color="black" state="default" [iconLeft]="true" [iconRight]="true"></rais-link>
            <rais-link label="Hover"   size="medium" color="black" state="hover"   [iconLeft]="true" [iconRight]="true"></rais-link>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#8D9091;">GRAY</span>
          <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
            <rais-link label="Default" size="medium" color="gray" state="default" [iconLeft]="true" [iconRight]="true"></rais-link>
            <rais-link label="Hover"   size="medium" color="gray" state="hover"   [iconLeft]="true" [iconRight]="true"></rais-link>
          </div>
        </div>
      </div>
    `,
  }),
};

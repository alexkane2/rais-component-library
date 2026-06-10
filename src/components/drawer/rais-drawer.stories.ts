import type { Meta, StoryObj } from '@storybook/angular';
import { RaisDrawerComponent } from './rais-drawer.component';

const meta: Meta<RaisDrawerComponent> = {
  title: 'RAIS/Content/Drawer',
  component: RaisDrawerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Right-side slide-over panel (Figma node 3557:597). Header with heading, ' +
          'optional subheading, and a close X; a divider; a scrollable body that ' +
          'projects any content placed inside `<rais-drawer>`; and a full-width ' +
          'primary CTA pinned to the bottom. Emits `ctaClicked` and `closed`.',
      },
    },
  },
  argTypes: {
    heading: { control: 'text', description: 'Drawer title' },
    subheading: { control: 'text', description: 'Supporting copy under the title. Empty hides it.' },
    ctaLabel: { control: 'text', description: 'Bottom primary CTA label' },
    showCta: { control: 'boolean', description: 'Show the bottom CTA button' },
    showCloseButton: { control: 'boolean', description: 'Show the X close button' },
    ctaClicked: { control: false, description: 'Emits when the bottom CTA is clicked' },
    closed: { control: false, description: 'Emits when the close (X) button is clicked' },
  },
};

export default meta;
type Story = StoryObj<RaisDrawerComponent>;

// Drawer fills its container height — give stories a fixed-height stage
const stage = (inner: string) => `
  <div style="height:600px;display:flex;justify-content:flex-end;background:#F0F2F5;">
    ${inner}
  </div>
`;

export const Default: Story = {
  args: {
    heading: 'Start from a template',
    subheading: 'Pick a ready-made dashboard to get going fast.',
    ctaLabel: 'Label',
    showCta: true,
    showCloseButton: true,
  },
  render: (args) => ({
    props: args,
    template: stage(`
      <rais-drawer
        [heading]="heading" [subheading]="subheading" [ctaLabel]="ctaLabel"
        [showCta]="showCta" [showCloseButton]="showCloseButton"
        (ctaClicked)="ctaClicked($event)" (closed)="closed($event)"
      ></rais-drawer>
    `),
  }),
};

export const WithBodyContent: Story = {
  args: { ...Default.args, ctaLabel: 'Use this template' },
  render: (args) => ({
    props: args,
    template: stage(`
      <rais-drawer
        [heading]="heading" [subheading]="subheading" [ctaLabel]="ctaLabel"
        [showCta]="showCta" [showCloseButton]="showCloseButton"
        (ctaClicked)="ctaClicked($event)" (closed)="closed($event)"
      >
        <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Figtree',sans-serif;">
          <div style="border:1px solid #CCCCCC;border-radius:8px;padding:16px;">Template A</div>
          <div style="border:1px solid #CCCCCC;border-radius:8px;padding:16px;">Template B</div>
          <div style="border:1px solid #CCCCCC;border-radius:8px;padding:16px;">Template C</div>
        </div>
      </rais-drawer>
    `),
  }),
};

export const NoCta: Story = {
  args: { ...Default.args, showCta: false },
  render: Default.render,
};

export const HeadingOnly: Story = {
  args: { ...Default.args, subheading: '' },
  render: Default.render,
};

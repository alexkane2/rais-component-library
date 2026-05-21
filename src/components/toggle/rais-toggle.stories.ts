import type { Meta, StoryObj } from '@storybook/angular';
import { RaisToggleComponent } from './rais-toggle.component';

const meta: Meta<RaisToggleComponent> = {
  title: 'RAIS/Selector Controls/Toggle',
  component: RaisToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text shown next to the toggle',
    },
    state: {
      control: 'select',
      options: ['unselected', 'selected'],
      description: 'unselected=#CCCCCC track | selected=#007CBD track',
    },
    size: {
      control: 'select',
      options: ['small', 'large', 'x-large'],
      description: 'small=20×12 (12px Medium) | large=23×14 (14px Regular) | x-large=26×16 (16px Regular)',
    },
    labelSide: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of label relative to switch',
    },
  },
};

export default meta;
type Story = StoryObj<RaisToggleComponent>;

// ── Large (default) ──
export const LargeUnselected: Story = {
  name: 'Large — Unselected',
  args: { label: 'Label', state: 'unselected', size: 'large', labelSide: 'right' },
};

export const LargeSelected: Story = {
  name: 'Large — Selected',
  args: { label: 'Label', state: 'selected', size: 'large', labelSide: 'right' },
};

// ── Small ──
export const SmallUnselected: Story = {
  name: 'Small — Unselected',
  args: { label: 'Label', state: 'unselected', size: 'small', labelSide: 'right' },
};

export const SmallSelected: Story = {
  name: 'Small — Selected',
  args: { label: 'Label', state: 'selected', size: 'small', labelSide: 'right' },
};

// ── X-Large ──
export const XLargeUnselected: Story = {
  name: 'X-Large — Unselected',
  args: { label: 'Label', state: 'unselected', size: 'x-large', labelSide: 'right' },
};

export const XLargeSelected: Story = {
  name: 'X-Large — Selected',
  args: { label: 'Label', state: 'selected', size: 'x-large', labelSide: 'right' },
};

// ── Label on left ──
export const LabelLeftUnselected: Story = {
  name: 'Label Left — Unselected',
  args: { label: 'Label', state: 'unselected', size: 'large', labelSide: 'left' },
};

export const LabelLeftSelected: Story = {
  name: 'Label Left — Selected',
  args: { label: 'Label', state: 'selected', size: 'large', labelSide: 'left' },
};

// ── All variants grid ──
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">

        <div style="display:flex;flex-direction:column;gap:12px;">
          <span style="font-size:11px;color:#8D9091;">SMALL (12px Medium)</span>
          <div style="display:flex;gap:32px;align-items:center;">
            <rais-toggle label="Unselected" state="unselected" size="small" labelSide="right"></rais-toggle>
            <rais-toggle label="Selected"   state="selected"   size="small" labelSide="right"></rais-toggle>
            <rais-toggle label="Label left" state="selected"   size="small" labelSide="left"></rais-toggle>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          <span style="font-size:11px;color:#8D9091;">LARGE (14px Regular)</span>
          <div style="display:flex;gap:32px;align-items:center;">
            <rais-toggle label="Unselected" state="unselected" size="large" labelSide="right"></rais-toggle>
            <rais-toggle label="Selected"   state="selected"   size="large" labelSide="right"></rais-toggle>
            <rais-toggle label="Label left" state="selected"   size="large" labelSide="left"></rais-toggle>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          <span style="font-size:11px;color:#8D9091;">X-LARGE (16px Regular)</span>
          <div style="display:flex;gap:32px;align-items:center;">
            <rais-toggle label="Unselected" state="unselected" size="x-large" labelSide="right"></rais-toggle>
            <rais-toggle label="Selected"   state="selected"   size="x-large" labelSide="right"></rais-toggle>
            <rais-toggle label="Label left" state="selected"   size="x-large" labelSide="left"></rais-toggle>
          </div>
        </div>

      </div>
    `,
  }),
};

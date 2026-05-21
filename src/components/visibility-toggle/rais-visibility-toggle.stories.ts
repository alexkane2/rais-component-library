import type { Meta, StoryObj } from '@storybook/angular';
import { RaisVisibilityToggleComponent } from './rais-visibility-toggle.component';

const meta: Meta<RaisVisibilityToggleComponent> = {
  title: 'RAIS/Filters/Visibility Toggle',
  component: RaisVisibilityToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
    },
    toggleState: {
      control: 'select',
      options: ['show', 'hide'],
      description: 'show → bxs-show.svg (eye open) | hide → bxs-hide.svg (eye closed)',
    },
    interaction: {
      control: 'select',
      options: ['default', 'hover'],
      description: 'default=white bg | hover=#EDF6FC bg',
    },
  },
};

export default meta;
type Story = StoryObj<RaisVisibilityToggleComponent>;

export const ShowDefault: Story = {
  name: 'Show — Default',
  args: { label: 'Label', toggleState: 'show', interaction: 'default' },
};

export const ShowHover: Story = {
  name: 'Show — Hover',
  args: { label: 'Label', toggleState: 'show', interaction: 'hover' },
};

export const HideDefault: Story = {
  name: 'Hide — Default',
  args: { label: 'Label', toggleState: 'hide', interaction: 'default' },
};

export const HideHover: Story = {
  name: 'Hide — Hover',
  args: { label: 'Label', toggleState: 'hide', interaction: 'hover' },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F0F2F5;border-radius:8px;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">SHOW STATE</span>
          <div style="display:flex;gap:12px;align-items:center;">
            <rais-visibility-toggle label="Label" toggleState="show" interaction="default"></rais-visibility-toggle>
            <rais-visibility-toggle label="Label" toggleState="show" interaction="hover"></rais-visibility-toggle>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;">HIDE STATE</span>
          <div style="display:flex;gap:12px;align-items:center;">
            <rais-visibility-toggle label="Label" toggleState="hide" interaction="default"></rais-visibility-toggle>
            <rais-visibility-toggle label="Label" toggleState="hide" interaction="hover"></rais-visibility-toggle>
          </div>
        </div>
      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { RaisSlimTabsComponent } from './rais-slim-tabs.component';

const meta: Meta<RaisSlimTabsComponent> = {
  title: 'RAIS/Navigation/Slim Tabs',
  component: RaisSlimTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text', description: 'Tab label text' },
    state:    { control: 'select', options: ['selected', 'unselected', 'hover'], description: 'Visual state' },
    size:     { control: 'select', options: ['large', 'small'], description: 'Tab size — large=14px SemiBold, small=12px Bold' },
    extras:   { control: 'select', options: ['none', 'ai'], description: 'Optional sparkle glyph for AI-related tabs' },
    dropdown: { control: 'boolean', description: 'Show bx-caret-down indicator on the right' },
  },
};

export default meta;
type Story = StoryObj<RaisSlimTabsComponent>;

// ── Large variants ──
export const LargeSelected: Story = {
  args: { label: 'Tab Label', state: 'selected', size: 'large', extras: 'none', dropdown: false },
};
export const LargeUnselected: Story = {
  args: { label: 'Tab Label', state: 'unselected', size: 'large', extras: 'none', dropdown: false },
};
export const LargeHover: Story = {
  args: { label: 'Tab Label', state: 'hover', size: 'large', extras: 'none', dropdown: false },
};

// ── Small variants ──
export const SmallSelected: Story = {
  args: { label: 'Tab Label', state: 'selected', size: 'small', extras: 'none', dropdown: false },
};
export const SmallUnselected: Story = {
  args: { label: 'Tab Label', state: 'unselected', size: 'small', extras: 'none', dropdown: false },
};
export const SmallHover: Story = {
  args: { label: 'Tab Label', state: 'hover', size: 'small', extras: 'none', dropdown: false },
};

// ── AI extras (large only per Figma) ──
export const LargeAISelected: Story = {
  name: 'Large + AI (Selected)',
  args: { label: 'Tab Label', state: 'selected', size: 'large', extras: 'ai', dropdown: false },
};
export const LargeAIUnselected: Story = {
  name: 'Large + AI (Unselected)',
  args: { label: 'Tab Label', state: 'unselected', size: 'large', extras: 'ai', dropdown: false },
};
export const LargeAIHover: Story = {
  name: 'Large + AI (Hover)',
  args: { label: 'Tab Label', state: 'hover', size: 'large', extras: 'ai', dropdown: false },
};

// ── With dropdown affordance ──
export const LargeWithDropdown: Story = {
  args: { label: 'Tab Label', state: 'selected', size: 'large', extras: 'none', dropdown: true },
};

// ── All variants laid out per the Figma component_set ──
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:32px;background:#F0F2F5;border-radius:8px;">

        <div>
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Selected</div>
          <div style="display:flex;gap:48px;align-items:flex-end;">
            <rais-slim-tabs label="Tab Label" state="selected" size="large" extras="none" [dropdown]="false"></rais-slim-tabs>
            <rais-slim-tabs label="Tab Label" state="selected" size="small" extras="none" [dropdown]="false"></rais-slim-tabs>
            <rais-slim-tabs label="Tab Label" state="selected" size="large" extras="ai"   [dropdown]="false"></rais-slim-tabs>
          </div>
        </div>

        <div>
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Unselected</div>
          <div style="display:flex;gap:48px;align-items:flex-end;">
            <rais-slim-tabs label="Tab Label" state="unselected" size="large" extras="none" [dropdown]="false"></rais-slim-tabs>
            <rais-slim-tabs label="Tab Label" state="unselected" size="small" extras="none" [dropdown]="false"></rais-slim-tabs>
            <rais-slim-tabs label="Tab Label" state="unselected" size="large" extras="ai"   [dropdown]="false"></rais-slim-tabs>
          </div>
        </div>

        <div>
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Hover</div>
          <div style="display:flex;gap:48px;align-items:flex-end;">
            <rais-slim-tabs label="Tab Label" state="hover" size="large" extras="none" [dropdown]="false"></rais-slim-tabs>
            <rais-slim-tabs label="Tab Label" state="hover" size="small" extras="none" [dropdown]="false"></rais-slim-tabs>
            <rais-slim-tabs label="Tab Label" state="hover" size="large" extras="ai"   [dropdown]="false"></rais-slim-tabs>
          </div>
        </div>

      </div>
    `,
  }),
};

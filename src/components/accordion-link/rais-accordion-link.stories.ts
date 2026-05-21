import type { Meta, StoryObj } from '@storybook/angular';
import { RaisAccordionLinkComponent } from './rais-accordion-link.component';

const meta: Meta<RaisAccordionLinkComponent> = {
  title: 'RAIS/Buttons/Accordion Link',
  component: RaisAccordionLinkComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Link label text',
    },
    style: {
      control: 'select',
      options: ['caret', 'plus'],
      description: 'caret=chevron icon on the right | plus=plus/minus icon on the left',
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: 'large=16px Bold | medium=14px Bold | small=13px SemiBold',
    },
    state: {
      control: 'select',
      options: ['default', 'hover'],
      description: 'default=#007CBD | hover=#178FCF',
    },
    open: {
      control: 'boolean',
      description: 'false=collapsed (chevron-down / plus-circle) | true=expanded (chevron-up / minus)',
    },
  },
};

export default meta;
type Story = StoryObj<RaisAccordionLinkComponent>;

// ── Caret Style ──
export const CaretClosedDefault: Story = {
  name: 'Caret — Closed',
  args: { label: 'Label', style: 'caret', size: 'medium', state: 'default', open: false },
};

export const CaretOpenDefault: Story = {
  name: 'Caret — Open',
  args: { label: 'Label', style: 'caret', size: 'medium', state: 'default', open: true },
};

export const CaretClosedHover: Story = {
  name: 'Caret — Closed Hover',
  args: { label: 'Label', style: 'caret', size: 'medium', state: 'hover', open: false },
};

export const CaretOpenHover: Story = {
  name: 'Caret — Open Hover',
  args: { label: 'Label', style: 'caret', size: 'medium', state: 'hover', open: true },
};

// ── Plus Style ──
export const PlusClosedDefault: Story = {
  name: 'Plus — Closed',
  args: { label: 'Label', style: 'plus', size: 'medium', state: 'default', open: false },
};

export const PlusOpenDefault: Story = {
  name: 'Plus — Open',
  args: { label: 'Label', style: 'plus', size: 'medium', state: 'default', open: true },
};

export const PlusClosedHover: Story = {
  name: 'Plus — Closed Hover',
  args: { label: 'Label', style: 'plus', size: 'medium', state: 'hover', open: false },
};

export const PlusOpenHover: Story = {
  name: 'Plus — Open Hover',
  args: { label: 'Label', style: 'plus', size: 'medium', state: 'hover', open: true },
};

// ── Sizes ──
export const Large: Story = {
  args: { label: 'Label', style: 'caret', size: 'large', state: 'default', open: false },
};

export const Small: Story = {
  args: { label: 'Label', style: 'caret', size: 'small', state: 'default', open: false },
};

// ── All Variants ──
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">

        <div style="display:flex;flex-direction:column;gap:12px;">
          <span style="font-size:11px;color:#8D9091;">CARET STYLE — Closed</span>
          <div style="display:flex;gap:24px;align-items:center;">
            <rais-accordion-link label="Large"  style="caret" size="large"  state="default" [open]="false"></rais-accordion-link>
            <rais-accordion-link label="Medium" style="caret" size="medium" state="default" [open]="false"></rais-accordion-link>
            <rais-accordion-link label="Small"  style="caret" size="small"  state="default" [open]="false"></rais-accordion-link>
          </div>
          <span style="font-size:11px;color:#8D9091;">CARET STYLE — Open</span>
          <div style="display:flex;gap:24px;align-items:center;">
            <rais-accordion-link label="Large"  style="caret" size="large"  state="default" [open]="true"></rais-accordion-link>
            <rais-accordion-link label="Medium" style="caret" size="medium" state="default" [open]="true"></rais-accordion-link>
            <rais-accordion-link label="Small"  style="caret" size="small"  state="default" [open]="true"></rais-accordion-link>
          </div>
          <span style="font-size:11px;color:#8D9091;">CARET STYLE — Hover</span>
          <div style="display:flex;gap:24px;align-items:center;">
            <rais-accordion-link label="Closed" style="caret" size="medium" state="hover" [open]="false"></rais-accordion-link>
            <rais-accordion-link label="Open"   style="caret" size="medium" state="hover" [open]="true"></rais-accordion-link>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          <span style="font-size:11px;color:#8D9091;">PLUS STYLE — Closed</span>
          <div style="display:flex;gap:24px;align-items:center;">
            <rais-accordion-link label="Large"  style="plus" size="large"  state="default" [open]="false"></rais-accordion-link>
            <rais-accordion-link label="Medium" style="plus" size="medium" state="default" [open]="false"></rais-accordion-link>
            <rais-accordion-link label="Small"  style="plus" size="small"  state="default" [open]="false"></rais-accordion-link>
          </div>
          <span style="font-size:11px;color:#8D9091;">PLUS STYLE — Open</span>
          <div style="display:flex;gap:24px;align-items:center;">
            <rais-accordion-link label="Large"  style="plus" size="large"  state="default" [open]="true"></rais-accordion-link>
            <rais-accordion-link label="Medium" style="plus" size="medium" state="default" [open]="true"></rais-accordion-link>
            <rais-accordion-link label="Small"  style="plus" size="small"  state="default" [open]="true"></rais-accordion-link>
          </div>
          <span style="font-size:11px;color:#8D9091;">PLUS STYLE — Hover</span>
          <div style="display:flex;gap:24px;align-items:center;">
            <rais-accordion-link label="Closed" style="plus" size="medium" state="hover" [open]="false"></rais-accordion-link>
            <rais-accordion-link label="Open"   style="plus" size="medium" state="hover" [open]="true"></rais-accordion-link>
          </div>
        </div>

      </div>
    `,
  }),
};

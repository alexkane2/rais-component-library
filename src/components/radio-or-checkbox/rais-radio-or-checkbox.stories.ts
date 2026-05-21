import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisRadioOrCheckboxComponent } from './rais-radio-or-checkbox.component';

const meta: Meta<RaisRadioOrCheckboxComponent> = {
  title: 'RAIS/Selector Controls/Radio or Checkbox',
  component: RaisRadioOrCheckboxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RaisRadioOrCheckboxComponent],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text shown next to the input',
    },
    type: {
      control: 'select',
      options: ['radio', 'checkbox', 'circle-checkbox'],
      description: 'radio=fully round | checkbox=2px radius square | circle-checkbox=filled blue circle (x-large only)',
    },
    state: {
      control: 'select',
      options: ['unselected', 'selected', 'hover', 'indeterminate', 'disabled'],
      description: 'Selected/Indeterminate render as FILLED BLUE box with white indicator. Indeterminate + disabled apply to checkbox only.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'x-large'],
      description: 'small=12px box, 12px Medium label | x-large=16-18px box, 16px Regular label',
    },
  },
};

export default meta;
type Story = StoryObj<RaisRadioOrCheckboxComponent>;

// ── Checkbox ──
export const CheckboxUnselected: Story = {
  name: 'Checkbox — Unselected',
  args: { label: 'Label', type: 'checkbox', state: 'unselected', size: 'large' },
};
export const CheckboxSelected: Story = {
  name: 'Checkbox — Selected',
  args: { label: 'Label', type: 'checkbox', state: 'selected', size: 'large' },
};
export const CheckboxHover: Story = {
  name: 'Checkbox — Hover',
  args: { label: 'Label', type: 'checkbox', state: 'hover', size: 'large' },
};
export const CheckboxIndeterminate: Story = {
  name: 'Checkbox — Indeterminate',
  args: { label: 'Label', type: 'checkbox', state: 'indeterminate', size: 'large' },
};
export const CheckboxDisabled: Story = {
  name: 'Checkbox — Disabled',
  args: { label: 'Label', type: 'checkbox', state: 'disabled', size: 'large' },
};

// ── Radio ──
export const RadioUnselected: Story = {
  name: 'Radio — Unselected',
  args: { label: 'Label', type: 'radio', state: 'unselected', size: 'large' },
};
export const RadioSelected: Story = {
  name: 'Radio — Selected',
  args: { label: 'Label', type: 'radio', state: 'selected', size: 'large' },
};
export const RadioHover: Story = {
  name: 'Radio — Hover',
  args: { label: 'Label', type: 'radio', state: 'hover', size: 'large' },
};

// ── Circle Checkbox (X-Large only) ──
export const CircleCheckboxUnselected: Story = {
  name: 'Circle Checkbox — Unselected',
  args: { label: 'Label', type: 'circle-checkbox', state: 'unselected', size: 'x-large' },
};
export const CircleCheckboxSelected: Story = {
  name: 'Circle Checkbox — Selected',
  args: { label: 'Label', type: 'circle-checkbox', state: 'selected', size: 'x-large' },
};
export const CircleCheckboxHover: Story = {
  name: 'Circle Checkbox — Hover',
  args: { label: 'Label', type: 'circle-checkbox', state: 'hover', size: 'x-large' },
};

// ── All variants grid (matches Figma layout) ──
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">

        <div style="display:flex;flex-direction:column;gap:12px;">
          <span style="font-size:11px;color:#8D9091;">CHECKBOX — All states × All sizes</span>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;align-items:center;">
            <rais-radio-or-checkbox label="Label" type="checkbox" state="unselected"    size="small"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="unselected"    size="medium"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="unselected"    size="large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="unselected"    size="x-large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="selected"      size="small"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="selected"      size="medium"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="selected"      size="large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="selected"      size="x-large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="hover"         size="small"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="hover"         size="medium"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="hover"         size="large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="hover"         size="x-large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="indeterminate" size="small"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="indeterminate" size="medium"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="indeterminate" size="large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="indeterminate" size="x-large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="disabled"      size="small"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="disabled"      size="medium"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="disabled"      size="large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="checkbox" state="disabled"      size="x-large"></rais-radio-or-checkbox>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          <span style="font-size:11px;color:#8D9091;">RADIO — All states × All sizes</span>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;align-items:center;">
            <rais-radio-or-checkbox label="Label" type="radio" state="unselected" size="small"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="unselected" size="medium"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="unselected" size="large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="unselected" size="x-large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="selected"   size="small"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="selected"   size="medium"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="selected"   size="large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="selected"   size="x-large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="hover"      size="small"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="hover"      size="medium"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="hover"      size="large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Label" type="radio" state="hover"      size="x-large"></rais-radio-or-checkbox>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          <span style="font-size:11px;color:#8D9091;">CIRCLE CHECKBOX — X-Large only</span>
          <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
            <rais-radio-or-checkbox label="Unselected" type="circle-checkbox" state="unselected" size="x-large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Selected"   type="circle-checkbox" state="selected"   size="x-large"></rais-radio-or-checkbox>
            <rais-radio-or-checkbox label="Hover"      type="circle-checkbox" state="hover"      size="x-large"></rais-radio-or-checkbox>
          </div>
        </div>

      </div>
    `,
  }),
};

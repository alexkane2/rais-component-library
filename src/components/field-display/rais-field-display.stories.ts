import type { Meta, StoryObj } from '@storybook/angular';
import { RaisFieldDisplayComponent } from './rais-field-display.component';

const meta: Meta<RaisFieldDisplayComponent> = {
  title: 'RAIS/Content/Field Display',
  component: RaisFieldDisplayComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Read-only label + value pair (description-list pattern). ' +
          'Use **Stacked** (label above value) for dense forms and summary grids, ' +
          'and **Inline** (label left / value right) for detail panels. ' +
          'The value wraps for long content (addresses, names). ' +
          'For empty states, set the value to an em dash (—).',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Field label (the descriptor)' },
    value: { control: 'text', description: 'Field value (the data). Use "—" for empty states.' },
    orientation: {
      control: 'inline-radio',
      options: ['stacked', 'inline'],
      description: 'stacked=label above value (forms) | inline=label left / value right (detail panels)',
    },
  },
};

export default meta;
type Story = StoryObj<RaisFieldDisplayComponent>;

export const Stacked: Story = {
  args: { label: 'Expected by', value: '11/15/2024', orientation: 'stacked' },
};

export const Inline: Story = {
  args: { label: 'Expected by', value: '11/15/2024', orientation: 'inline' },
  render: (args) => ({
    props: args,
    // Inline value right-aligns within its container — constrain width to show it
    template: `
      <div style="width:240px;">
        <rais-field-display
          [label]="label" [value]="value" [orientation]="orientation"
        ></rais-field-display>
      </div>
    `,
  }),
};

export const LongValueWraps: Story = {
  args: {
    label: 'Mailing address',
    value: '1234 Renaissance Parkway, Suite 500, Springfield, IL 62704',
    orientation: 'stacked',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:240px;">
        <rais-field-display
          [label]="label" [value]="value" [orientation]="orientation"
        ></rais-field-display>
      </div>
    `,
  }),
};

export const EmptyState: Story = {
  args: { label: 'Expected by', value: '—', orientation: 'stacked' },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;max-width:320px;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-family:'Figtree',sans-serif;font-size:12px;color:#8D9091;">Stacked — dense forms / summary grids</span>
          <div style="background:#fff;padding:16px;border-radius:8px;display:flex;flex-direction:column;gap:16px;">
            <rais-field-display label="Expected by"     value="11/15/2024"></rais-field-display>
            <rais-field-display label="Policy number"   value="RA-0098-2241"></rais-field-display>
            <rais-field-display label="Mailing address" value="1234 Renaissance Parkway, Suite 500, Springfield, IL 62704"></rais-field-display>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-family:'Figtree',sans-serif;font-size:12px;color:#8D9091;">Inline — detail panels (label left / value right)</span>
          <div style="background:#fff;padding:16px;border-radius:8px;display:flex;flex-direction:column;gap:12px;">
            <rais-field-display label="Expected by"   value="11/15/2024"  orientation="inline"></rais-field-display>
            <rais-field-display label="Policy number" value="RA-0098-2241" orientation="inline"></rais-field-display>
            <rais-field-display label="Status"        value="—"           orientation="inline"></rais-field-display>
          </div>
        </div>
      </div>
    `,
  }),
};

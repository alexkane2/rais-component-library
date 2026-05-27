import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisCircularProgressIndicatorComponent } from './rais-circular-progress-indicator.component';

const meta: Meta<RaisCircularProgressIndicatorComponent> = {
  title: 'RAIS/Loading/Circular Progress Indicator',
  component: RaisCircularProgressIndicatorComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisCircularProgressIndicatorComponent] }),
  ],
  argTypes: {
    progress:        { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Progress 0–100 (determinate mode)' },
    size:            { control: { type: 'number', min: 12, max: 256 },        description: 'Outer size in pixels' },
    strokeWidth:     { control: { type: 'number', min: 1, max: 16 },          description: 'Ring stroke width in pixels' },
    color:           { control: 'color',                                       description: 'Active arc color' },
    trackColor:      { control: 'color',                                       description: 'Background ring color (set transparent to hide)' },
    indeterminate:   { control: 'boolean',                                     description: 'Spinner mode — rotates a partial arc continuously' },
    spinnerFraction: { control: { type: 'number', min: 0.05, max: 0.95, step: 0.05 }, description: 'Fraction of ring shown as the arc in spinner mode' },
    showLabel:       { control: 'boolean',                                     description: 'Show "%" label inside the circle' },
  },
};

export default meta;
type Story = StoryObj<RaisCircularProgressIndicatorComponent>;

// ─── Determinate progress steps (match Figma) ──
export const Progress25: Story = {
  name: '25%',
  args: { progress: 25 },
};
export const Progress50: Story = {
  name: '50%',
  args: { progress: 50 },
};
export const Progress75: Story = {
  name: '75%',
  args: { progress: 75 },
};
export const Progress100: Story = {
  name: '100%',
  args: { progress: 100 },
};

// ─── Custom (advanced) — indeterminate spinner ──
export const Indeterminate: Story = {
  name: 'Custom (Spinner)',
  args: { indeterminate: true, spinnerFraction: 0.25 },
};

// ─── With center label ──
export const WithLabel: Story = {
  args: { progress: 65, showLabel: true, size: 72, strokeWidth: 6 },
};

// ─── Larger size example ──
export const LargeSize: Story = {
  args: { progress: 80, size: 96, strokeWidth: 8 },
};

// ─── All variants laid out as in Figma ──
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;align-items:center;padding:32px;background:#FFFFFF;border:1px solid #CCC;border-radius:8px;font-family:'Figtree',sans-serif;width:fit-content;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <rais-circular-progress-indicator [progress]="25"></rais-circular-progress-indicator>
          <span style="font-size:10px;color:#8D9091;letter-spacing:1px;text-transform:uppercase;">25%</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <rais-circular-progress-indicator [progress]="50"></rais-circular-progress-indicator>
          <span style="font-size:10px;color:#8D9091;letter-spacing:1px;text-transform:uppercase;">50%</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <rais-circular-progress-indicator [progress]="75"></rais-circular-progress-indicator>
          <span style="font-size:10px;color:#8D9091;letter-spacing:1px;text-transform:uppercase;">75%</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <rais-circular-progress-indicator [progress]="100"></rais-circular-progress-indicator>
          <span style="font-size:10px;color:#8D9091;letter-spacing:1px;text-transform:uppercase;">100%</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <rais-circular-progress-indicator [indeterminate]="true"></rais-circular-progress-indicator>
          <span style="font-size:10px;color:#8D9091;letter-spacing:1px;text-transform:uppercase;">Spinner</span>
        </div>
      </div>
    `,
  }),
};

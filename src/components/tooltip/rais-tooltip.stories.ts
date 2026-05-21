import type { Meta, StoryObj } from '@storybook/angular';
import { RaisTooltipComponent } from './rais-tooltip.component';

const longCopy = 'Long form tooltip copy goes here...';

const meta: Meta<RaisTooltipComponent> = {
  title: 'RAIS/Content/Tooltip',
  component: RaisTooltipComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tooltip size — controls padding, typography, and content layout',
    },
    caretPosition: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Which edge the caret protrudes from (points toward the anchor)',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show the "Label:" prefix (Medium/Large only — Small is label-only)',
    },
    label: { control: 'text', description: 'Bold label text' },
    description: { control: 'text', description: 'Body/description text' },
  },
};

export default meta;
type Story = StoryObj<RaisTooltipComponent>;

// ── Large (top / right / bottom / left) ──
export const LargeTop: Story = {
  args: { size: 'large', caretPosition: 'top', showLabel: true, label: 'Label', description: longCopy },
};
export const LargeRight: Story = {
  args: { size: 'large', caretPosition: 'right', showLabel: true, label: 'Label', description: longCopy },
};
export const LargeBottom: Story = {
  args: { size: 'large', caretPosition: 'bottom', showLabel: true, label: 'Label', description: longCopy },
};
export const LargeLeft: Story = {
  args: { size: 'large', caretPosition: 'left', showLabel: true, label: 'Label', description: longCopy },
};

// ── Medium (top / right / bottom / left) ──
export const MediumTop: Story = {
  args: { size: 'medium', caretPosition: 'top', showLabel: true, label: 'Label', description: 'Description' },
};
export const MediumRight: Story = {
  args: { size: 'medium', caretPosition: 'right', showLabel: true, label: 'Label', description: 'Description' },
};
export const MediumBottom: Story = {
  args: { size: 'medium', caretPosition: 'bottom', showLabel: true, label: 'Label', description: 'Description' },
};
export const MediumLeft: Story = {
  args: { size: 'medium', caretPosition: 'left', showLabel: true, label: 'Label', description: 'Description' },
};
export const MediumNoLabel: Story = {
  name: 'Medium (no label)',
  args: { size: 'medium', caretPosition: 'top', showLabel: false, label: 'Label', description: 'Description only' },
};

// ── Small (top / right / bottom / left) ──
export const SmallTop: Story = {
  args: { size: 'small', caretPosition: 'top', showLabel: true, label: 'Label', description: '' },
};
export const SmallRight: Story = {
  args: { size: 'small', caretPosition: 'right', showLabel: true, label: 'Label', description: '' },
};
export const SmallBottom: Story = {
  args: { size: 'small', caretPosition: 'bottom', showLabel: true, label: 'Label', description: '' },
};
export const SmallLeft: Story = {
  args: { size: 'small', caretPosition: 'left', showLabel: true, label: 'Label', description: '' },
};

// ── All variants ──
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:32px;background:#F0F2F5;border-radius:8px;">

        <div>
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;margin-bottom:12px;text-transform:uppercase;letter-spacing:1px;">Large</div>
          <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start;">
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret top</span>
              <rais-tooltip size="large" caretPosition="top" [showLabel]="true" label="Label" description="${longCopy}"></rais-tooltip>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret right</span>
              <rais-tooltip size="large" caretPosition="right" [showLabel]="true" label="Label" description="${longCopy}"></rais-tooltip>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret bottom</span>
              <rais-tooltip size="large" caretPosition="bottom" [showLabel]="true" label="Label" description="${longCopy}"></rais-tooltip>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret left</span>
              <rais-tooltip size="large" caretPosition="left" [showLabel]="true" label="Label" description="${longCopy}"></rais-tooltip>
            </div>
          </div>
        </div>

        <div>
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;margin-bottom:12px;text-transform:uppercase;letter-spacing:1px;">Medium</div>
          <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start;">
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret top</span>
              <rais-tooltip size="medium" caretPosition="top" [showLabel]="true" label="Label" description="Description"></rais-tooltip>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret right</span>
              <rais-tooltip size="medium" caretPosition="right" [showLabel]="true" label="Label" description="Description"></rais-tooltip>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret bottom</span>
              <rais-tooltip size="medium" caretPosition="bottom" [showLabel]="true" label="Label" description="Description"></rais-tooltip>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret left</span>
              <rais-tooltip size="medium" caretPosition="left" [showLabel]="true" label="Label" description="Description"></rais-tooltip>
            </div>
          </div>
        </div>

        <div>
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;margin-bottom:12px;text-transform:uppercase;letter-spacing:1px;">Small</div>
          <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start;">
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret top</span>
              <rais-tooltip size="small" caretPosition="top" [showLabel]="true" label="Label" description=""></rais-tooltip>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret right</span>
              <rais-tooltip size="small" caretPosition="right" [showLabel]="true" label="Label" description=""></rais-tooltip>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret bottom</span>
              <rais-tooltip size="small" caretPosition="bottom" [showLabel]="true" label="Label" description=""></rais-tooltip>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
              <span style="font-family:'Figtree',sans-serif;font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">caret left</span>
              <rais-tooltip size="small" caretPosition="left" [showLabel]="true" label="Label" description=""></rais-tooltip>
            </div>
          </div>
        </div>

      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisFileUploadStatesComponent } from './rais-file-upload-states.component';

const meta: Meta<RaisFileUploadStatesComponent> = {
  title: 'RAIS/File Management/File Upload States',
  component: RaisFileUploadStatesComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisFileUploadStatesComponent] }),
  ],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'uploading', 'success', 'error'],
      description: 'Upload state — drives the layout, copy, and border color',
    },
    progress:       { control: { type: 'number', min: 0, max: 100 }, description: 'Upload progress 0–100 (uploading state)' },
    helperText:     { control: 'text', description: 'Helper text under title (default state)' },
    browseCtaLabel: { control: 'text', description: 'Primary CTA label (default state)' },
    accept:         { control: 'text', description: 'File picker MIME filter' },
    uploadingTitle: { control: 'text', description: 'Title text (uploading state)' },
    successTitle:   { control: 'text', description: 'Title text (success state)' },
    errorTitle:     { control: 'text', description: 'Title text (error state)' },
    documentName:   { control: 'text', description: 'Document name subtitle' },
    errorMessage:   { control: 'text', description: 'Error message (error state)' },
    clearLabel:     { control: 'text', description: '"Clear Upload" link label' },
    tryAgainLabel:  { control: 'text', description: '"Try Again" link label' },
  },
};

export default meta;
type Story = StoryObj<RaisFileUploadStatesComponent>;

export const Default: Story = {
  args: { state: 'default' },
};

export const Uploading: Story = {
  args: { state: 'uploading', progress: 65, documentName: 'invoice-Q4-2026.pdf' },
};

export const Success: Story = {
  args: { state: 'success', documentName: 'invoice-Q4-2026.pdf' },
};

export const Error: Story = {
  args: { state: 'error', errorMessage: 'File exceeds 800×400px limit.' },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,400px);gap:24px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Default</div>
          <rais-file-upload-states state="default"></rais-file-upload-states>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Uploading (65%)</div>
          <rais-file-upload-states state="uploading" [progress]="65"></rais-file-upload-states>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Success</div>
          <rais-file-upload-states state="success"></rais-file-upload-states>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Error</div>
          <rais-file-upload-states state="error"></rais-file-upload-states>
        </div>

      </div>
    `,
  }),
};

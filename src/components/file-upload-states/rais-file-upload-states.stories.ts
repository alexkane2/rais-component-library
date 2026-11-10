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
      description: 'Upload state — drives the layout, copy, and border',
    },
    progress:       { control: { type: 'number', min: 0, max: 100 }, description: 'Upload progress 0–100 (uploading state)' },
    title:          { control: 'text', description: 'Drop-area title (default state)' },
    helperText:     { control: 'text', description: 'Accepted formats line (default state)' },
    browseCtaLabel: { control: 'text', description: 'Primary CTA label (default state)' },
    accept:         { control: 'text', description: 'File picker filter' },
    multiple:       { control: 'boolean', description: 'Allow more than one file' },
    uploadingTitle: { control: 'text', description: 'Title text (uploading state)' },
    successTitle:   { control: 'text', description: 'Title text (success state)' },
    errorTitle:     { control: 'text', description: 'Title text (error state)' },
    documentName:   { control: 'text', description: 'File name subtitle' },
    errorMessage:   { control: 'text', description: 'Error message (error state)' },
    clearLabel:     { control: 'text', description: '"Clear Upload" link label' },
    tryAgainLabel:  { control: 'text', description: '"Try Again" link label' },
    filesSelected:  { action: 'filesSelected' },
    clearClicked:   { action: 'clearClicked' },
    tryAgain:       { action: 'tryAgain' },
  },
};

export default meta;
type Story = StoryObj<RaisFileUploadStatesComponent>;

/** Drop a file on the dashed area or use Browse Files; XLSX and CSV by default. */
export const Default: Story = {
  args: { state: 'default' },
};

export const Uploading: Story = {
  args: { state: 'uploading', progress: 65, documentName: 'production-report-2026.xlsx' },
};

export const Success: Story = {
  args: { state: 'success', documentName: 'production-report-2026.xlsx' },
};

/** Pages give the success state their own title. */
export const SuccessPageTitle: Story = {
  args: { state: 'success', successTitle: 'Report Uploaded', documentName: 'production-report-2026.csv' },
};

export const Error: Story = {
  args: { state: 'error', errorMessage: 'Only XLSX and CSV files are accepted.' },
};

/** Other consumers set their own accepted formats and picker filter. */
export const OtherFormats: Story = {
  args: { state: 'default', helperText: 'PDF, DOC, PNG or JPG (max. 10MB)', accept: '.pdf,.doc,.docx,.png,.jpg' },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,400px);gap:24px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">

        <div>
          <div style="font-size:10px;color:#606060;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Default</div>
          <rais-file-upload-states state="default"></rais-file-upload-states>
        </div>

        <div>
          <div style="font-size:10px;color:#606060;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Uploading (65%)</div>
          <rais-file-upload-states state="uploading" [progress]="65" documentName="production-report-2026.xlsx"></rais-file-upload-states>
        </div>

        <div>
          <div style="font-size:10px;color:#606060;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Success</div>
          <rais-file-upload-states state="success" documentName="production-report-2026.xlsx"></rais-file-upload-states>
        </div>

        <div>
          <div style="font-size:10px;color:#606060;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Error</div>
          <rais-file-upload-states state="error" errorMessage="Only XLSX and CSV files are accepted."></rais-file-upload-states>
        </div>

      </div>
    `,
  }),
};

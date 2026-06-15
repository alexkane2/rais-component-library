import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InsuredPaymentsComponent } from './insured-payments.component';

const meta: Meta<InsuredPaymentsComponent> = {
  title: 'Pages/Insured Payments',
  component: InsuredPaymentsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [InsuredPaymentsComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<InsuredPaymentsComponent>;

export const DefaultView: Story = {
  name: 'Default (Filters Hidden)',
};

export const FiltersVisible: Story = {
  name: 'Filters Visible',
  play: async ({ canvasElement }) => {
    const btn = canvasElement.querySelector('rais-button button') as HTMLButtonElement;
    if (btn) btn.click();
  },
};

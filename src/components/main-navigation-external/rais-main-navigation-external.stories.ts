import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisMainNavigationExternalComponent } from './rais-main-navigation-external.component';

const meta: Meta<RaisMainNavigationExternalComponent> = {
  title: 'RAIS/Navigation/Main Navigation - External',
  component: RaisMainNavigationExternalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RaisMainNavigationExternalComponent],
    }),
  ],
  argTypes: {
    activeSection: {
      control: 'select',
      options: [
        null,
        'agency-planning',
        'revenue-docs',
        'placement',
        'servicing',
        'account-insights',
        'digital-marketing',
      ],
      description:
        'Which section is currently active (expanded). Leave null for the default collapsed nav.',
    },
  },
};

export default meta;
type Story = StoryObj<RaisMainNavigationExternalComponent>;

export const SideNavDefault: Story = {
  name: 'Side Nav Default - External',
  args: { activeSection: null },
};

export const AgencyPlanning: Story = {
  args: { activeSection: 'agency-planning' },
};

export const RevenueDocs: Story = {
  args: { activeSection: 'revenue-docs' },
};

export const Placement: Story = {
  args: { activeSection: 'placement' },
};

export const Servicing: Story = {
  args: { activeSection: 'servicing' },
};

export const AccountInsights: Story = {
  args: { activeSection: 'account-insights' },
};

export const DigitalMarketing: Story = {
  args: { activeSection: 'digital-marketing' },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:row;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;overflow:auto;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Default (collapsed)</div>
          <div style="border:1px solid #DDE1E6;border-radius:8px;overflow:hidden;width:fit-content;">
            <rais-main-navigation-external [activeSection]="null"></rais-main-navigation-external>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Agency Planning</div>
          <div style="border:1px solid #DDE1E6;border-radius:8px;overflow:hidden;width:fit-content;">
            <rais-main-navigation-external activeSection="agency-planning"></rais-main-navigation-external>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Revenue Docs</div>
          <div style="border:1px solid #DDE1E6;border-radius:8px;overflow:hidden;width:fit-content;">
            <rais-main-navigation-external activeSection="revenue-docs"></rais-main-navigation-external>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Placement</div>
          <div style="border:1px solid #DDE1E6;border-radius:8px;overflow:hidden;width:fit-content;">
            <rais-main-navigation-external activeSection="placement"></rais-main-navigation-external>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Servicing</div>
          <div style="border:1px solid #DDE1E6;border-radius:8px;overflow:hidden;width:fit-content;">
            <rais-main-navigation-external activeSection="servicing"></rais-main-navigation-external>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Account Insights</div>
          <div style="border:1px solid #DDE1E6;border-radius:8px;overflow:hidden;width:fit-content;">
            <rais-main-navigation-external activeSection="account-insights"></rais-main-navigation-external>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="font-family:'Figtree',sans-serif;font-size:11px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;">Digital Marketing</div>
          <div style="border:1px solid #DDE1E6;border-radius:8px;overflow:hidden;width:fit-content;">
            <rais-main-navigation-external activeSection="digital-marketing"></rais-main-navigation-external>
          </div>
        </div>
      </div>
    `,
  }),
};

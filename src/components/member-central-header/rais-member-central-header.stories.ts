import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisMemberCentralHeaderComponent } from './rais-member-central-header.component';

const meta: Meta<RaisMemberCentralHeaderComponent> = {
  title: 'RAIS/Header and Footer/Member Central Header',
  component: RaisMemberCentralHeaderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisMemberCentralHeaderComponent] }),
  ],
  argTypes: {
    agencyDisplay: {
      control: 'select',
      options: ['read-only', 'searchable'],
      description: 'Agency display variant — static name vs typeahead field',
    },
    showPageDescription: {
      control: 'boolean',
      description: 'Toggle the description line under the page title (height adjusts)',
    },
    showTabs: {
      control: 'boolean',
      description: 'Toggle the tab row at the bottom (height adjusts)',
    },
    agencyName:       { control: 'text', description: 'Static agency name (read-only variant)' },
    searchPlaceholder:{ control: 'text', description: 'Placeholder for the searchable typeahead' },
    userName:         { control: 'text', description: 'User name shown on the right' },
    pageTitle:        { control: 'text', description: 'Page title in the subheader' },
    pageDescription:  { control: 'text', description: 'Page description copy' },
    tabs:             { control: 'object', description: 'Tab labels (array of strings)' },
    selectedTabIndex: { control: 'number', description: 'Index of the active tab' },
  },
};

export default meta;
type Story = StoryObj<RaisMemberCentralHeaderComponent>;

// ─── Default: agency read-only, description on, tabs on ──
export const Default: Story = {
  args: {
    agencyDisplay: 'read-only',
    showPageDescription: true,
    showTabs: true,
  },
};

// ─── Searchable agency: dropdown field instead of static name ──
export const SearchableAgency: Story = {
  name: 'Agency Searchable',
  args: {
    agencyDisplay: 'searchable',
    showPageDescription: true,
    showTabs: true,
  },
};

// ─── Without page description (height reduces) ──
export const NoPageDescription: Story = {
  name: 'No Page Description',
  args: {
    agencyDisplay: 'read-only',
    showPageDescription: false,
    showTabs: true,
  },
};

// ─── Without tabs (height reduces) ──
export const NoTabs: Story = {
  args: {
    agencyDisplay: 'read-only',
    showPageDescription: true,
    showTabs: false,
  },
};

// ─── Minimal: no description, no tabs ──
export const Minimal: Story = {
  args: {
    agencyDisplay: 'read-only',
    showPageDescription: false,
    showTabs: false,
  },
};

// ─── All variants stacked vertically with labels ──
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:48px;padding:32px;background:#F0F2F5;font-family:'Figtree',sans-serif;">

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Default — read-only agency, description on, tabs on</div>
          <rais-member-central-header></rais-member-central-header>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Searchable agency</div>
          <rais-member-central-header agencyDisplay="searchable"></rais-member-central-header>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">No description</div>
          <rais-member-central-header [showPageDescription]="false"></rais-member-central-header>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">No tabs</div>
          <rais-member-central-header [showTabs]="false"></rais-member-central-header>
        </div>

        <div>
          <div style="font-size:10px;color:#8D9091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Minimal — no description, no tabs</div>
          <rais-member-central-header [showPageDescription]="false" [showTabs]="false"></rais-member-central-header>
        </div>

      </div>
    `,
  }),
};

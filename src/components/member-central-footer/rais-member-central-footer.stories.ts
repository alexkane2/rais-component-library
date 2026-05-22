import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisMemberCentralFooterComponent } from './rais-member-central-footer.component';

const meta: Meta<RaisMemberCentralFooterComponent> = {
  title: 'RAIS/Header and Footer/Member Central Footer',
  component: RaisMemberCentralFooterComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [RaisMemberCentralFooterComponent] }),
  ],
  argTypes: {
    copyright:           { control: 'text', description: 'Copyright notice' },
    rightsLabel:         { control: 'text', description: '"All Rights Reserved" label' },
    legalNoticeLabel:    { control: 'text', description: 'Legal Notice link label' },
    privacyPolicyLabel:  { control: 'text', description: 'Privacy Policy link label' },
    legalNoticeUrl:      { control: 'text', description: 'Legal Notice link href' },
    privacyPolicyUrl:    { control: 'text', description: 'Privacy Policy link href' },
  },
};

export default meta;
type Story = StoryObj<RaisMemberCentralFooterComponent>;

export const Default: Story = {
  args: {
    copyright: '©2026 Renaissance',
    rightsLabel: 'All Rights Reserved',
    legalNoticeLabel: 'Legal Notice',
    privacyPolicyLabel: 'Privacy Policy',
    legalNoticeUrl: '#',
    privacyPolicyUrl: '#',
  },
};

export const CustomCopyright: Story = {
  args: {
    copyright: '©2026 My Insurance Agency',
    rightsLabel: 'All Rights Reserved',
    legalNoticeLabel: 'Terms',
    privacyPolicyLabel: 'Privacy',
  },
};

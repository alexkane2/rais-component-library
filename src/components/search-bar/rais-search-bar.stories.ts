import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RaisSearchBarComponent } from './rais-search-bar.component';

const meta: Meta<RaisSearchBarComponent> = {
  title: 'RAIS/Inputs/Search Bar',
  component: RaisSearchBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RaisSearchBarComponent],
    }),
  ],
  argTypes: {
    label:        { control: 'text' },
    instructions: { control: 'boolean' },
    state:        { control: 'select', options: ['empty', 'entered', 'mouse-enter'] },
    value:        { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<RaisSearchBarComponent>;

export const Empty: Story = {
  args: { label: 'Label', state: 'empty', instructions: true },
};

export const Entered: Story = {
  args: { label: 'Label', state: 'entered', instructions: true, value: 'Text' },
};

export const MouseEnter: Story = {
  args: { label: 'Label', state: 'mouse-enter', instructions: true },
};

export const NoLabel: Story = {
  args: { label: false, state: 'empty', instructions: false },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#F0F2F5;border-radius:8px;">
        <rais-search-bar label="Label" state="empty"       [instructions]="true"></rais-search-bar>
        <rais-search-bar label="Label" state="entered"     [instructions]="true" value="Text"></rais-search-bar>
        <rais-search-bar label="Label" state="mouse-enter" [instructions]="true"></rais-search-bar>
      </div>
    `,
  }),
};

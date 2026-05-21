import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  // PILOT: only Badge while we validate the Angular setup.
  // After pilot succeeds we will switch back to the broad glob.
  stories: [
    '../src/components/**/*.stories.ts',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/angular',
    options: {}
  },
};

export default config;

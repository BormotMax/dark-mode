module.exports = {
  addons: [
    `@storybook/addon-viewport`,
    '@storybook/addon-links',
    '@storybook/preset-scss',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
  ],
  stories: [`../src/components/**/story.tsx`],
};

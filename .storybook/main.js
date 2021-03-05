const { resolve } = require("path");

module.exports = {
  addons: [
    `@storybook/addon-viewport`,
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
  ],
  stories: [`../src/components/**/story.tsx`],
  presets: [resolve(__dirname, "./next-preset.js")],
};

const { resolve } = require("path");

module.exports = {
  addons: [`@storybook/addon-viewport`],
  stories: [`../src/components/**/story.tsx`],
  presets: [resolve(__dirname, "./next-preset.js")],
};

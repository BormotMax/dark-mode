import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

/**
 * @see https://storybook.js.org/docs/react/essentials/viewport#configuration
 */
export const parameters = {
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      defaultViewport: `responsive`,
      kindleFire2: {
        name: `Kindle Fire 2`,
        styles: {
          width: `600px`,
          height: `963px`,
        },
      },
      kindleFireHD: {
        name: `Kindle Fire HD`,
        styles: {
          width: `533px`,
          height: `801px`,
        },
      },
    },
  },
};

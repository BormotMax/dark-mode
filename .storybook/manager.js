import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";

const config = {
  theme: {
    brandTitle: `Continuum`,
    ...themes.dark,
  },
};

addons.setConfig(config);

import type { Preview } from "@storybook/react";
import "../.storybook/tailwind.css";
import { colors, semanticColors } from "../tokens/colors";
import { fontSize, fontFamily } from "../tokens/typography";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  a11y: {
    config: {},
  },
};

export const globals = {
  designTokens: { colors, semanticColors, fontSize, fontFamily },
};

const preview: Preview = {
  parameters,
};

export default preview;

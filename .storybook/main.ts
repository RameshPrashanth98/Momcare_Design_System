import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // Only load web stories — RN stories (React Native imports) live in .rnstorybook/
  // Convention: web stories use *.web.stories.tsx; RN stories use *.stories.tsx
  stories: ["../src/stories/**/*.web.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => config,
};

export default config;

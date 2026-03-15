// Storybook route for Expo Router.
// Activated by setting EXPO_PUBLIC_STORYBOOK=true in .env.local
// The withStorybook Metro wrapper (in metro.config.js) also strips Storybook from production
// bundle when EXPO_PUBLIC_STORYBOOK !== "true"
import StorybookUI from "../.rnstorybook";

export default StorybookUI;

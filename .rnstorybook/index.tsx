// Storybook v10 entry point.
// The withStorybook Metro plugin (metro.config.js) auto-generates storybook.requires.ts
// at build time with the correct story context. This file is the default export
// consumed by app/storybook.tsx when EXPO_PUBLIC_STORYBOOK=true.
//
// If storybook.requires.ts does not yet exist (first build), Metro will generate it.
// The StorybookUI component renders the on-device Storybook UI.

import { start } from "@storybook/react-native";

const annotations = [
  require("./preview"),
  require("@storybook/react-native/dist/preview"),
];

declare global {
  var view: ReturnType<typeof start>;
  var STORIES: {
    titlePrefix: string;
    directory: string;
    files: string;
    importPathMatcher: RegExp;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: any;
  }[];
}

const normalizedStories = [
  {
    titlePrefix: "",
    directory: "../src",
    files: "**/*.stories.?(ts|tsx)",
    importPathMatcher:
      /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.(?:ts|tsx)?)$/,
    // require.context is resolved by the withStorybook Metro plugin at build time
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req: require.context("../src", true, /\.stories\.tsx?$/),
  },
];

global.STORIES = normalizedStories;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
module?.hot?.accept?.();

if (!global.view) {
  global.view = start({
    annotations,
    storyEntries: normalizedStories,
  });
} else {
  const { updateView } = require("@storybook/react-native");
  updateView(global.view, annotations, normalizedStories);
}

const StorybookUIRoot = global.view.getStorybookUI({});

export default StorybookUIRoot;

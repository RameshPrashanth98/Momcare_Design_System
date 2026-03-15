const path = require("path");

module.exports = {
  preset: "jest-expo",
  testMatch: ["<rootDir>/tests/**/*.test.{ts,tsx}"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind|tailwind-merge|clsx|class-variance-authority)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: [],
  // Patch jest-expo@54 + react-native@0.76 NativeModules compatibility.
  // jest-expo setup.js line 10 does require(NativeModules).default, but RN 0.76 uses CJS module.exports.
  // moduleNameMapper intercepts the path and adds __esModule + default to the mock result.
  moduleNameMapper: {
    "^react-native/Libraries/BatchedBridge/NativeModules$": path.resolve(
      __dirname,
      "__mocks__/nativeModulesPolyfill.js"
    ),
  },
};

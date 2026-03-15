module.exports = {
  preset: "jest-expo",
  testMatch: ["<rootDir>/tests/**/*.test.{ts,tsx}"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind|tailwind-merge|clsx|class-variance-authority)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterFramework: [],
};

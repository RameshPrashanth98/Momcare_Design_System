import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";
import { DMMono_400Regular } from "@expo-google-fonts/dm-mono";
import type { Preview } from "@storybook/react-native";
import "../global.css"; // NativeWind requires this import in Storybook context — separate from app

// Cormorant Garamond: loaded from local .ttf files
// Files must be placed in assets/fonts/ before brand typography works
// See assets/fonts/INSTRUCTIONS.md for download instructions
const cormorantFonts: Record<string, number> = {};
try {
  cormorantFonts["CormorantGaramond-Regular"] = require("../assets/fonts/CormorantGaramond-Regular.ttf");
  cormorantFonts["CormorantGaramond-Italic"] = require("../assets/fonts/CormorantGaramond-Italic.ttf");
  cormorantFonts["CormorantGaramond-SemiBold"] = require("../assets/fonts/CormorantGaramond-SemiBold.ttf");
  cormorantFonts["CormorantGaramond-Bold"] = require("../assets/fonts/CormorantGaramond-Bold.ttf");
} catch {
  // .ttf files not yet placed in assets/fonts/ — see assets/fonts/INSTRUCTIONS.md
}

const preview: Preview = {
  decorators: [
    (Story) => {
      // Font loading guard: stories render in system font until fonts load
      // This decorator ensures all stories render with Morph Maternity brand fonts
      const [fontsLoaded, fontError] = useFonts({
        ...cormorantFonts,
        // DM Sans: via @expo-google-fonts/dm-sans
        "DMSans-Regular": DMSans_400Regular,
        "DMSans-Medium": DMSans_500Medium,
        // DM Mono: via @expo-google-fonts/dm-mono
        "DMMono-Regular": DMMono_400Regular,
      });

      if (!fontsLoaded && !fontError) {
        // Show loading indicator until fonts are ready — prevents false sign-off on system font
        return (
          <View className="flex-1 items-center justify-center bg-cream-50">
            <ActivityIndicator />
          </View>
        );
      }

      return (
        <View className="flex-1 bg-cream-50 p-4">
          <Story />
        </View>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

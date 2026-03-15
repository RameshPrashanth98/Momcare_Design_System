import "../global.css";
import { useEffect } from "react";
import { Stack, Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";
import { DMMono_400Regular } from "@expo-google-fonts/dm-mono";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Cormorant Garamond: loaded from local .ttf files
  // Files must be placed in assets/fonts/ before app will show brand typography
  // See assets/fonts/INSTRUCTIONS.md
  const cormorantFonts: Record<string, number> = {};
  try {
    cormorantFonts["CormorantGaramond-Regular"] = require("../assets/fonts/CormorantGaramond-Regular.ttf");
    cormorantFonts["CormorantGaramond-Italic"] = require("../assets/fonts/CormorantGaramond-Italic.ttf");
    cormorantFonts["CormorantGaramond-SemiBold"] = require("../assets/fonts/CormorantGaramond-SemiBold.ttf");
    cormorantFonts["CormorantGaramond-Bold"] = require("../assets/fonts/CormorantGaramond-Bold.ttf");
  } catch {
    // .ttf files not yet placed in assets/fonts/ — see assets/fonts/INSTRUCTIONS.md
  }

  const [fontsLoaded, fontError] = useFonts({
    ...cormorantFonts,
    // DM Sans: via @expo-google-fonts/dm-sans
    "DMSans-Regular": DMSans_400Regular,
    "DMSans-Medium": DMSans_500Medium,
    // DM Mono: via @expo-google-fonts/dm-mono
    "DMMono-Regular": DMMono_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  // Redirect to Storybook when EXPO_PUBLIC_STORYBOOK env var is set to "true"
  const isStorybook = process.env.EXPO_PUBLIC_STORYBOOK === "true";
  if (isStorybook) {
    return <Redirect href="/storybook" />;
  }

  return <Stack />;
}

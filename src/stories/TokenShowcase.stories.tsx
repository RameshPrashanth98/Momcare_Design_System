import React from "react";
import { View, Text, ScrollView } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";

// Color swatch component — no StyleSheet, className only
// The color prop receives a complete static class string (e.g. "bg-rose-500 w-12 h-12 rounded-md")
// All className strings at call sites are complete static strings (no template literals)
const Swatch = ({ color, label }: { color: string; label: string }) => (
  <View className="mr-2 mb-2 items-center">
    <View className={color} />
    <Text className="text-xs text-neutral-600 mt-1 font-body">{label}</Text>
  </View>
);

const TokenShowcaseComponent = () => (
  <ScrollView className="flex-1 bg-cream-50 p-4">
    {/* Typography showcase */}
    <Text className="font-display text-2xl text-neutral-900 mb-1">
      Cormorant Garamond Display
    </Text>
    <Text className="font-body text-base text-neutral-700 mb-1">
      DM Sans Body Text — Regular
    </Text>
    <Text className="font-mono text-sm text-neutral-600 mb-4">
      DM Mono — 0x1F4A9 monospace
    </Text>

    {/* Rose palette */}
    <Text className="font-body-medium text-sm text-neutral-800 mb-2">Rose Palette</Text>
    <View className="flex-row flex-wrap mb-4">
      <Swatch color="bg-rose-50 w-12 h-12 rounded-md"  label="50" />
      <Swatch color="bg-rose-100 w-12 h-12 rounded-md" label="100" />
      <Swatch color="bg-rose-200 w-12 h-12 rounded-md" label="200" />
      <Swatch color="bg-rose-300 w-12 h-12 rounded-md" label="300" />
      <Swatch color="bg-rose-400 w-12 h-12 rounded-md" label="400" />
      <Swatch color="bg-rose-500 w-12 h-12 rounded-md" label="500" />
      <Swatch color="bg-rose-600 w-12 h-12 rounded-md" label="600" />
      <Swatch color="bg-rose-700 w-12 h-12 rounded-md" label="700" />
      <Swatch color="bg-rose-800 w-12 h-12 rounded-md" label="800" />
      <Swatch color="bg-rose-900 w-12 h-12 rounded-md" label="900" />
    </View>

    {/* Cream palette */}
    <Text className="font-body-medium text-sm text-neutral-800 mb-2">Cream Palette</Text>
    <View className="flex-row flex-wrap mb-4">
      <Swatch color="bg-cream-50 w-12 h-12 rounded-md"  label="50" />
      <Swatch color="bg-cream-100 w-12 h-12 rounded-md" label="100" />
      <Swatch color="bg-cream-200 w-12 h-12 rounded-md" label="200" />
      <Swatch color="bg-cream-300 w-12 h-12 rounded-md" label="300" />
      <Swatch color="bg-cream-400 w-12 h-12 rounded-md" label="400" />
      <Swatch color="bg-cream-500 w-12 h-12 rounded-md" label="500" />
    </View>

    {/* Sage palette */}
    <Text className="font-body-medium text-sm text-neutral-800 mb-2">Sage Palette</Text>
    <View className="flex-row flex-wrap mb-4">
      <Swatch color="bg-sage-50 w-12 h-12 rounded-md"  label="50" />
      <Swatch color="bg-sage-100 w-12 h-12 rounded-md" label="100" />
      <Swatch color="bg-sage-300 w-12 h-12 rounded-md" label="300" />
      <Swatch color="bg-sage-500 w-12 h-12 rounded-md" label="500" />
      <Swatch color="bg-sage-700 w-12 h-12 rounded-md" label="700" />
      <Swatch color="bg-sage-900 w-12 h-12 rounded-md" label="900" />
    </View>

    {/* Status colors */}
    <Text className="font-body-medium text-sm text-neutral-800 mb-2">Status Colors</Text>
    <View className="flex-row flex-wrap mb-4">
      <Swatch color="bg-success w-12 h-12 rounded-md"       label="success" />
      <Swatch color="bg-success-light w-12 h-12 rounded-md" label="s-light" />
      <Swatch color="bg-warning w-12 h-12 rounded-md"       label="warning" />
      <Swatch color="bg-warning-light w-12 h-12 rounded-md" label="w-light" />
      <Swatch color="bg-error w-12 h-12 rounded-md"         label="error" />
      <Swatch color="bg-error-light w-12 h-12 rounded-md"   label="e-light" />
      <Swatch color="bg-info w-12 h-12 rounded-md"          label="info" />
      <Swatch color="bg-info-light w-12 h-12 rounded-md"    label="i-light" />
    </View>
  </ScrollView>
);

const meta: Meta<typeof TokenShowcaseComponent> = {
  title: "Foundation/Token Showcase",
  component: TokenShowcaseComponent,
};

export default meta;
type Story = StoryObj<typeof TokenShowcaseComponent>;

export const AllTokens: Story = {};

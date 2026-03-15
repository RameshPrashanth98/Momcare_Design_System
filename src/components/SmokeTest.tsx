import { View, Text } from "react-native";

export function SmokeTest() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-8">
      <View className="bg-rose-500 rounded-lg p-4 mb-4">
        <Text className="text-white font-bold text-lg">
          NativeWind v4 is working
        </Text>
      </View>
      <Text className="text-neutral-600 text-sm">
        If this background is rose-colored, the pipeline is correct.
      </Text>
    </View>
  );
}

import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export const triggerHaptic = async (
  style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
) => {
  if (Platform.OS !== "web") {
    await Haptics.impactAsync(style);
  }
};

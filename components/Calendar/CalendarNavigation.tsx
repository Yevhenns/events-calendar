import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

interface CalendarNavigationProps {
  currentMonthName: string;
  year: number;
  incrementMonth: () => void;
  decrementMonth: () => void;
}

export function CalendarNavigation({
  currentMonthName,
  year,
  incrementMonth,
  decrementMonth,
}: CalendarNavigationProps) {
  return (
    <View style={styles.navigation}>
      <TouchableOpacity onPress={decrementMonth}>
        <Entypo name="chevron-with-circle-left" size={24} color="black" />
      </TouchableOpacity>
      <Text>
        {currentMonthName} {year}
      </Text>
      <TouchableOpacity onPress={incrementMonth}>
        <Entypo name="chevron-with-circle-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

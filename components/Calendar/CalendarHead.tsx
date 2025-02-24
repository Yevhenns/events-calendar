import { StyleSheet, Text, View } from "react-native";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarHead() {
  return (
    <View style={styles.headWrapper}>
      {dayNames.map((item, index) => {
        return (
          <Text style={styles.text} key={index}>
            {item}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  headWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  text: {
    width: 36,
    textAlign: "center",
  },
});

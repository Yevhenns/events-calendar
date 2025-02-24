import { CalendarHead } from "./CalendarHead";
import { CalendarNavigation } from "./CalendarNavigation";
import { useCalendar } from "@/hooks/useCalendar";
import { CalendarBody } from "./CalendarBody";

import { StyleSheet, View } from "react-native";

interface CalendarProps {
  clearCurrentEvent: () => void;
  hideForm: () => void;
}

export function Calendar({ clearCurrentEvent, hideForm }: CalendarProps) {
  const {
    finalDaysArray,
    currentMonthName,
    year,
    incrementMonth,
    decrementMonth,
  } = useCalendar();

  return (
    <View style={styles.calendar}>
      <CalendarNavigation
        currentMonthName={currentMonthName}
        year={year}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
      />
      <CalendarHead />
      <CalendarBody
        finalDaysArray={finalDaysArray}
        clearCurrentEvent={clearCurrentEvent}
        hideForm={hideForm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 24,
  },
});

/* eslint-disable no-undef */
import { CalendarHead } from "./CalendarHead";
import { CalendarNavigation } from "./CalendarNavigation";
import { CalendarBody } from "./CalendarBody";

import { StyleSheet, View } from "react-native";

interface CalendarProps {
  clearCurrentEvent: () => void;
  hideForm: () => void;
  currentMonthName: string;
  year: number;
  incrementMonth: () => void;
  decrementMonth: () => void;
  finalDaysArray: CalendarMonth | undefined;
}

export function Calendar({
  clearCurrentEvent,
  hideForm,
  currentMonthName,
  year,
  incrementMonth,
  decrementMonth,
  finalDaysArray,
}: CalendarProps) {
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

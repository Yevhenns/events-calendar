/* eslint-disable no-undef */
import { StyleSheet, View } from "react-native";
import { CalendarDay } from "./CalendarDay";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllEvents, setSelectedDay } from "@/store/events/eventsSlice";

interface CalendarBodyBody {
  finalDaysArray: CalendarMonth | undefined;
  clearCurrentEvent: () => void;
  hideForm: () => void;
}

export function CalendarBody({
  finalDaysArray,
  clearCurrentEvent,
  hideForm,
}: CalendarBodyBody) {
  const allEvents = useAppSelector(getAllEvents);

  const dispatch = useAppDispatch();

  const setUpSelectedDay = (dayItem: CalendarDay) => {
    dispatch(setSelectedDay(dayItem));
    clearCurrentEvent();
    hideForm();
  };

  return (
    <View style={styles.monthWrapper}>
      {finalDaysArray &&
        finalDaysArray.map((item, index) => {
          return (
            <View key={index} style={styles.weekWrapper}>
              {item.map((dayItem, index) => {
                return (
                  <CalendarDay
                    setUpSelectedDay={setUpSelectedDay}
                    key={index}
                    dayItem={dayItem}
                    index={index}
                    allEvents={allEvents}
                  />
                );
              })}
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  monthWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  weekWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

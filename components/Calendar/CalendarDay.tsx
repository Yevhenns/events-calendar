/* eslint-disable no-undef */
import { getSelectedDay } from "@/store/events/eventsSlice";
import { useAppSelector } from "@/store/hooks";
import dayjs from "dayjs";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { isBeWeekly } from "@/helpers/isBiWeekly";

dayjs.extend(weekOfYear);

interface DayWrapperProps {
  index: number;
  dayItem: CalendarDay;
  setUpSelectedDay: (dayItem: CalendarDay) => void;
  allEvents: Event[];
  hideForm: () => void;
}

type StylesProps = {
  type: CalendarDay["type"];
  isDayToday: boolean;
  isWeekend: boolean;
  isSelctedDay: boolean;
};

export function CalendarDay({
  index,
  dayItem,
  setUpSelectedDay,
  allEvents,
  hideForm,
}: DayWrapperProps) {
  const { type, id } = dayItem;
  const selectedDay = useAppSelector(getSelectedDay);

  const SATURDAY = 6;
  const SUNDAY = 0;
  const isWeekend = index === SATURDAY || index === SUNDAY;
  const isDayToday = dayjs().format("YYYY-MM-DD") === id;
  const isSelctedDay = selectedDay?.id === id;

  const hasEvent = allEvents.some(({ startDate }) => startDate === id);

  const hasRepeatedEventMonthly = allEvents.some(
    ({ startDate, repeat }) =>
      new Date(startDate).getDate() === new Date(id).getDate() &&
      repeat === "Monthly" &&
      new Date(id) >= new Date(startDate)
  );

  const hasRepeatedEventWeekly = allEvents.some(
    ({ startDate, repeat }) =>
      new Date(startDate).getDay() === new Date(id).getDay() &&
      repeat === "Weekly" &&
      new Date(id) >= new Date(startDate)
  );

  const hasRepeatedEventBiWeekly = allEvents.some(
    ({ startDate, repeat }) =>
      new Date(startDate).getDay() === new Date(id).getDay() &&
      repeat === "Bi-weekly" &&
      new Date(id) >= new Date(startDate) &&
      isBeWeekly({ id, startDate })
  );

  const styles = dayWrapper({ type, isDayToday, isWeekend, isSelctedDay });

  const onPress = () => {
    setUpSelectedDay(dayItem);
    hideForm();
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{dayItem.day}</Text>
      {(hasEvent ||
        hasRepeatedEventMonthly ||
        hasRepeatedEventWeekly ||
        hasRepeatedEventBiWeekly) && <View style={styles.dot} />}
    </TouchableOpacity>
  );
}

const dayWrapper = ({
  type,
  isDayToday,
  isWeekend,
  isSelctedDay,
}: StylesProps) => {
  return StyleSheet.create({
    container: {
      position: "relative",
      padding: 4,
      textAlign: "left",
      width: 36,
      height: 36,
      backgroundColor: isDayToday
        ? "#DCDCDC"
        : isWeekend && type === "current"
        ? "#90EE90"
        : type === "current"
        ? "#FFEBCD"
        : "#F0F8FF",
      borderRadius: 18,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ...(isDayToday && { borderWidth: 1, borderColor: "#000" }),
      ...(isSelctedDay && { backgroundColor: "yellow" }),
    },

    dot: {
      position: "absolute",
      width: 5,
      height: 5,
      right: 0,
      top: 0,
      backgroundColor: "red",
      borderRadius: "50%",
    },
  });
};

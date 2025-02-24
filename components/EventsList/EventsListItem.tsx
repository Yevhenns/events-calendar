/* eslint-disable no-undef */
import { getDateDifference } from "@/helpers/dateValidation";
import { deleteEvent } from "@/store/events/eventsSlice";
import { useAppDispatch } from "@/store/hooks";
import dayjs from "dayjs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface EventsListItemProps {
  event: Event;
  setCurrentEvent: (editingId: string) => void;
  showForm: () => void;
}

export function EventsListItem({
  event,
  setCurrentEvent,
  showForm,
}: EventsListItemProps) {
  const { eventName, startDate, startTime, endDate, endTime, repeat, id } =
    event;

  const dispatch = useAppDispatch();

  const isEventInPast = (startDay: string) => {
    const currentDateDifference = getDateDifference({
      startDate: dayjs(new Date()).format("YYYY-MM-DD"),
      endDate: startDay,
    });

    return currentDateDifference < 0 ? true : false;
  };

  const editEvent = () => {
    showForm();
    setCurrentEvent(id);
  };

  return (
    <View style={styles.item} key={id}>
      <View>
        <Text>Event name: {eventName}</Text>
        <Text>
          Starts: {startDate}, {startTime}
        </Text>
        <Text>
          Ends: {endDate}, {endTime}
        </Text>
        <Text>Repeats: {repeat}</Text>
      </View>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          disabled={isEventInPast(startDate)}
          onPress={editEvent}
        >
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(deleteEvent(id))}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonsWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
});

/* eslint-disable no-undef */
import { View, Text, StyleSheet } from "react-native";
import { EventsListItem } from "./EventsListItem";

interface EventsListProps {
  todayEvents: Event[];
  todayRepeatedEventsMonthly: Event[] | null;
  setCurrentEvent: (editingId: string) => void;
  showForm: () => void;
}

export function EventsList({
  todayEvents,
  todayRepeatedEventsMonthly,
  setCurrentEvent,
  showForm,
}: EventsListProps) {
  return (
    <>
      {todayEvents.length > 0 && (
        <View style={styles.list}>
          <Text style={styles.title}>Events list</Text>
          {todayEvents.map((event) => (
            <EventsListItem
              event={event}
              key={event.id}
              setCurrentEvent={setCurrentEvent}
              showForm={showForm}
            />
          ))}
        </View>
      )}
      {todayRepeatedEventsMonthly && todayRepeatedEventsMonthly.length > 0 && (
        <View style={styles.list}>
          <Text style={styles.title}>Repeated events list</Text>
          {todayRepeatedEventsMonthly.map((event) => (
            <EventsListItem
              event={event}
              key={event.id}
              setCurrentEvent={setCurrentEvent}
              showForm={showForm}
            />
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    display: "flex",
    gap: 8,
  },

  title: {
    textAlign: "center",
  },
});

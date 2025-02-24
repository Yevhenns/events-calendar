/* eslint-disable no-undef */
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";

import { Calendar } from "@/components/Calendar/Calendar";
import { EventForm } from "@/components/EventFrom/EventForm";
import { EventsList } from "@/components/EventsList/EventsList";
import { useAppSelector } from "@/store/hooks";
import { getAllEvents, getSelectedDay } from "@/store/events/eventsSlice";
import { useState } from "react";

export default function HomeScreen() {
  const [editingEvent, setEditingEvent] = useState<null | Event>(null);
  const [isFormShown, setIsFormShown] = useState(false);

  const selectedDay = useAppSelector(getSelectedDay);
  const allEvents = useAppSelector(getAllEvents);

  const todayEvents = allEvents.filter(
    ({ startDate }) => startDate === selectedDay?.id
  );

  const todayRepeatedEventsMonthly =
    selectedDay &&
    allEvents.filter(
      ({ startDate, repeat }) =>
        new Date(startDate).getDate() === new Date(selectedDay.id).getDate() &&
        repeat === "Monthly" &&
        new Date(selectedDay.id) > new Date(startDate)
    );

  const setCurrentEvent = (editingId: string) => {
    const currentEvent = allEvents.find(({ id }) => id === editingId);
    currentEvent && setEditingEvent(currentEvent);
  };

  const clearCurrentEvent = () => {
    setEditingEvent(null);
  };

  const showForm = () => {
    setIsFormShown(true);
  };

  const hideForm = () => {
    setIsFormShown(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Calendar clearCurrentEvent={clearCurrentEvent} hideForm={hideForm} />
      {(todayEvents.length > 0 ||
        (todayRepeatedEventsMonthly &&
          todayRepeatedEventsMonthly?.length > 0)) && (
        <EventsList
          todayEvents={todayEvents}
          todayRepeatedEventsMonthly={todayRepeatedEventsMonthly}
          setCurrentEvent={setCurrentEvent}
          showForm={showForm}
        />
      )}

      {isFormShown ? (
        <EventForm
          editingEvent={editingEvent}
          clearCurrentEvent={clearCurrentEvent}
          hideForm={hideForm}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={showForm}>
          <Text>Add new event</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: "flex",
    gap: 8,
  },

  button: {
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "yellow",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
});

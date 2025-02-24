import { StyleSheet, ScrollView, Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Functionality:</Text>
      <Text>
        ● Users can manage events on specific dates by clicking on the calendar.
      </Text>
      <Text>● Available actions:</Text>
      <Text>
        ○ Create a new event – Enter an event name, set a time, and choose a
        repeat option.
      </Text>
      <Text>
        ○ Edit an existing event – Modify the name, repeat option, or time of an
        existing event.
      </Text>
      <Text>
        ○ Delete an event – Remove an event by clicking the delete button.
      </Text>
      <Text>● Repeat options:</Text>
      <Text>○ Weekly – The event recurs every week.</Text>
      <Text>○ Bi-weekly – The event recurs every other week.</Text>
      <Text>○ Monthly – The event recurs every month.</Text>
      <Text>
        ● Users must click the “Save” button to confirm event creation.
      </Text>
      <Text>
        ● Events should be stored locally so that past data is retained when the
        app is restarted.
      </Text>
      <Text>
        ● Dates with scheduled events should be highlighted accordingly.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

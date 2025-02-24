/* eslint-disable no-undef */
import { repeat } from "@/assets/staticData";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DateTimeInputs } from "./DateTimeInputs";
import { useAppDispatch } from "@/store/hooks";
import { addEvent, editEvent } from "@/store/events/eventsSlice";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";

interface CartFormProps {
  editingEvent: Event | null;
  clearCurrentEvent: () => void;
  hideForm: () => void;
}

export function EventForm({
  editingEvent,
  clearCurrentEvent,
  hideForm,
}: CartFormProps) {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<EventDto>({ mode: "onChange" });

  const onSubmit: SubmitHandler<EventDto> = (data) => {
    if (editingEvent) {
      dispatch(editEvent({ event: data, id: editingEvent.id }));
      clearCurrentEvent();
      Toast.show({
        type: "success",
        text1: "Edited",
      });
    } else {
      const newEvent: Event = {
        id: uuid.v4(),
        ...data,
      };
      dispatch(addEvent(newEvent));
      Toast.show({
        type: "success",
        text1: "Created",
      });
    }
    reset();
    hideForm();
  };

  const selectedRepeat = watch("repeat");

  useEffect(() => {
    if (editingEvent) {
      setValue("eventName", editingEvent.eventName);
      setValue("startDate", editingEvent.startDate);
      setValue("startTime", editingEvent.startTime);
      setValue("endDate", editingEvent.endDate);
      setValue("endTime", editingEvent.endTime);
      setValue("repeat", editingEvent.repeat);
    } else {
      reset();
    }
  }, [clearErrors, editingEvent, reset, setValue]);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Event Form</Text>
      <Controller
        name="eventName"
        defaultValue=""
        control={control}
        rules={{
          required: "Required field",
          validate: (value) => value.trim().length > 1 || "At least 2 letters",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldset}>
            <Text style={styles.label}>Event name</Text>
            <TextInput
              id={"eventName"}
              maxLength={50}
              style={styles.input}
              placeholder="Event name"
              placeholderTextColor={"grey"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />
      <View style={styles.errorContainer}>
        {errors.eventName && (
          <Text style={styles.errorMessage}>{errors.eventName.message}</Text>
        )}
      </View>

      <DateTimeInputs
        control={control}
        errors={errors}
        watch={watch}
        setError={setError}
        clearErrors={clearErrors}
      />

      <Controller
        name="repeat"
        defaultValue="Weekly"
        control={control}
        rules={{
          required: true,
        }}
        render={() => (
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Repeat</Text>
            <Picker
              id="repeat"
              style={styles.picker}
              selectedValue={selectedRepeat}
              onValueChange={(itemValue: Repeat) =>
                setValue("repeat", itemValue)
              }
            >
              {repeat.map(({ label, value }) => (
                <Picker.Item key={value} label={label} value={value} />
              ))}
            </Picker>
          </View>
        )}
      />

      <TouchableOpacity
        disabled={!isValid}
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },

  title: {
    textAlign: "center",
  },

  pickerContainer: {
    display: "flex",
    gap: 5,
  },

  picker: {
    padding: 12,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
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

  buttonDisabled: {
    backgroundColor: "gray",
    opacity: 0.5,
  },

  buttonText: {
    color: "white",
  },

  fieldset: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
  },

  label: {
    color: "black",
  },

  errorContainer: {
    height: 20,
  },

  errorMessage: {
    color: "red",
  },
});

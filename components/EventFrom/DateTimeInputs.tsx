/* eslint-disable no-undef */
import { getDateDifference, isValidDate } from "@/helpers/dateValidation";
import {
  isEndTimeAfterStart,
  isStartTimeNotInPast,
  isValidTime,
} from "@/helpers/timeValidation";
import dayjs from "dayjs";
import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
  UseFormWatch,
} from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";

import { MaskedTextInput } from "react-native-mask-text";

type DateTimeInputsProps = {
  control: Control<EventDto, any>;
  errors: FieldErrors<EventDto>;
  watch: UseFormWatch<EventDto>;
  setError: UseFormSetError<EventDto>;
  clearErrors: UseFormClearErrors<EventDto>;
};

export function DateTimeInputs({
  control,
  errors,
  watch,
  setError,
  clearErrors,
}: DateTimeInputsProps) {
  const startDateValue = watch("startDate");
  const endDateValue = watch("endDate");
  const startTimeValue = watch("startTime");
  const endTimeValue = watch("endTime");

  const dateDifference = getDateDifference({
    startDate: startDateValue,
    endDate: endDateValue,
  });

  useEffect(() => {
    const currentDateDifference = getDateDifference({
      startDate: dayjs(new Date()).format("YYYY-MM-DD"),
      endDate: startDateValue,
    });
    if (currentDateDifference < 0 && startDateValue.length === 10) {
      setError("startDate", {
        type: "manual",
        message: "Cannot be in past",
      });
    }
  }, [setError, startDateValue]);

  useEffect(() => {
    const currentDateDifference = getDateDifference({
      startDate: dayjs(new Date()).format("YYYY-MM-DD"),
      endDate: startDateValue,
    });

    if (
      currentDateDifference === 0 &&
      startTimeValue &&
      startTimeValue.length === 5
    ) {
      if (!isStartTimeNotInPast({ startTime: startTimeValue })) {
        setError("startTime", {
          type: "manual",
          message: "Cannot be in past",
        });
      }
    }
  }, [setError, startDateValue, startTimeValue]);

  useEffect(() => {
    if (
      dateDifference === 0 &&
      startTimeValue &&
      endTimeValue &&
      endTimeValue.length === 5
    ) {
      const timeDifference = isEndTimeAfterStart({
        endTime: endTimeValue,
        startTime: startTimeValue,
      });
      if (!timeDifference) {
        setError("endTime", {
          type: "manual",
          message: "Cannot be before start",
        });
      } else {
        clearErrors("endTime");
      }
    }
  }, [clearErrors, dateDifference, endTimeValue, setError, startTimeValue]);

  useEffect(() => {
    if (startDateValue && endDateValue) {
      if (dateDifference > 0) {
        clearErrors("endTime");
      }
      if (dateDifference < 0 && endDateValue.length === 10) {
        setError("endDate", {
          type: "manual",
          message: "Cannot be before start",
        });
      }
    }
  }, [clearErrors, dateDifference, endDateValue, setError, startDateValue]);

  return (
    <View style={styles.layout}>
      <View style={styles.wrapper}>
        <Controller
          control={control}
          name="startDate"
          defaultValue=""
          rules={{
            required: "Required field",
            validate: (value) => {
              if (!isValidDate(value)) {
                return "Wrong date format";
              }
            },
          }}
          render={({ field: { value, onChange } }) => (
            <View style={styles.fieldset}>
              <Text style={styles.label}>Start date</Text>
              <MaskedTextInput
                id={"startDate"}
                mask="9999-99-99"
                value={value}
                type="date"
                placeholder="YYYY-MM-DD"
                placeholderTextColor={"grey"}
                options={{
                  dateFormat: "YYYY-MM-DD",
                }}
                onChangeText={(text) => onChange(text)}
                style={styles.input}
                keyboardType="numeric"
              />
              <View style={styles.errorContainer}>
                {errors.startDate && (
                  <Text style={styles.errorMessage}>
                    {errors.startDate.message}
                  </Text>
                )}
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          name="startTime"
          defaultValue=""
          rules={{
            required: "Required field",
            validate: (value) => {
              if (!isValidTime(value)) {
                return "Wrong date format";
              }
            },
          }}
          render={({ field: { value, onChange } }) => (
            <View style={styles.fieldset}>
              <Text style={styles.label}>Start time</Text>
              <MaskedTextInput
                id={"startTime"}
                mask="99:99"
                value={value}
                placeholder="HH:MM"
                placeholderTextColor={"grey"}
                onChangeText={(text) => onChange(text)}
                style={styles.input}
                keyboardType="numeric"
              />
              <View style={styles.errorContainer}>
                {errors.startTime && (
                  <Text style={styles.errorMessage}>
                    {errors.startTime.message}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.wrapper}>
        <Controller
          control={control}
          name="endDate"
          defaultValue=""
          rules={{
            required: "Required field",
            validate: (value) => {
              if (!isValidDate(value)) {
                return "Wrong date format";
              }
            },
          }}
          render={({ field: { value, onChange } }) => (
            <View style={styles.fieldset}>
              <Text style={styles.label}>End date</Text>
              <MaskedTextInput
                id={"endDate"}
                mask="9999-99-99"
                value={value}
                type="date"
                placeholder="YYYY-MM-DD"
                placeholderTextColor={"grey"}
                options={{
                  dateFormat: "YYYY-MM-DD",
                }}
                onChangeText={(text) => onChange(text)}
                style={styles.input}
                keyboardType="numeric"
              />
              <View style={styles.errorContainer}>
                {errors.endDate && (
                  <Text style={styles.errorMessage}>
                    {errors.endDate.message}
                  </Text>
                )}
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          name="endTime"
          defaultValue=""
          rules={{
            required: "Required field",
            validate: (value) => {
              if (!isValidTime(value)) {
                return "Wrong date format";
              }
            },
          }}
          render={({ field: { value, onChange } }) => (
            <View style={styles.fieldset}>
              <Text style={styles.label}>End time</Text>
              <MaskedTextInput
                id={"endTime"}
                mask="99:99"
                value={value}
                placeholder="HH:MM"
                placeholderTextColor={"grey"}
                onChangeText={(text) => onChange(text)}
                style={styles.input}
                keyboardType="numeric"
              />
              <View style={styles.errorContainer}>
                {errors.endTime && (
                  <Text style={styles.errorMessage}>
                    {errors.endTime.message}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  layout: {
    display: "flex",
    gap: 8,
  },

  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  fieldset: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: "48%",
  },

  input: {
    padding: 12,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
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

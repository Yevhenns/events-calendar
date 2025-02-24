/* eslint-disable no-undef */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

const initialState = {
  events: [] as Event[],
  selectedDay: null as null | CalendarDay,
};

const eventsSlice = createSlice({
  name: "allEvents",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<Event>) {
      state.events = [...state.events, action.payload];
    },
    setSelectedDay(state, action: PayloadAction<CalendarDay>) {
      state.selectedDay = action.payload;
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(({ id }) => id !== action.payload);
    },
    editEvent(state, action: PayloadAction<{ id: string; event: EventDto }>) {
      const newArray = state.events.filter(
        ({ id }) => id !== action.payload.id
      );
      const event = { id: action.payload.id, ...action.payload.event } as Event;
      state.events = [event, ...newArray];
    },
  },
});

export const eventsReducer = eventsSlice.reducer;

export const getAllEvents = (state: RootState) => state.events;
export const getSelectedDay = (state: RootState) => state.selectedDay;

export const { addEvent, setSelectedDay, deleteEvent, editEvent } =
  eventsSlice.actions;

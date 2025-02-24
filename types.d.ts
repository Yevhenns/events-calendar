interface CalendarDay {
  id: string;
  day: number;
  type: "prev" | "current" | "next";
  // month: string;
}

type CalendarWeek = CalendarDay[];

type CalendarMonth = CalendarWeek[];

type Repeat = "Weekly" | "Bi-weekly" | "Monthly";

interface Event {
  id: string;
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  repeat: Repeat;
}

type EventDto = Omit<Event, "id">;

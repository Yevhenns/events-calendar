/* eslint-disable no-undef */
import { useEffect, useState } from "react";

import dayjs from "dayjs";

export function useCalendar() {
  const [finalDaysArray, setFinalDaysArray] = useState<CalendarMonth>();
  const [dateToday, setDateToday] = useState(new Date());

  const year = dateToday.getFullYear();

  const currentMonthNumber = (dateToday.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const currentMonthName = dayjs()
    .month(Number(currentMonthNumber) - 1)
    .format("MMMM");
  const currentMonthDaysCount = dayjs(
    `${year}-${currentMonthNumber}`
  ).daysInMonth();
  const currentMonthFirstDayIndex = dayjs(
    `${year}-${currentMonthNumber}-01`
  ).day();

  const prevMonthNumber = dayjs()
    .month(Number(currentMonthNumber) - 2)
    .format("MM");
  const prevMonthFirstDay = new Date(year, Number(currentMonthNumber) - 2);
  const prevMonthDaysCount = dayjs(prevMonthFirstDay).daysInMonth();

  const nextMonthNumber = (dateToday.getMonth() + 2)
    .toString()
    .padStart(2, "0");

  const incrementMonth = () => {
    const firstDayOfMonth = new Date(`${year}-${currentMonthNumber}-01`);
    const date = new Date(
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + currentMonthDaysCount)
    );

    setDateToday(date);
  };

  const decrementMonth = () => {
    const firstDayOfMonth = new Date(`${year}-${currentMonthNumber}-01`);
    const date = new Date(
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - prevMonthDaysCount)
    );

    setDateToday(date);
  };

  useEffect(() => {
    const prevMonthDayArray = [];
    for (
      let i = prevMonthDaysCount;
      i > prevMonthDaysCount - currentMonthFirstDayIndex;
      i--
    ) {
      prevMonthDayArray.push({
        id: dayjs(`${year}-${prevMonthNumber}-${i}`).format("YYYY-MM-DD"),
        day: i,
        type: "prev",
      });
    }

    const currentMonthDaysArray = [];
    for (let i = 1; i <= currentMonthDaysCount; i++) {
      currentMonthDaysArray.push({
        id: dayjs(`${year}-${currentMonthNumber}-${i}`).format("YYYY-MM-DD"),
        day: i,
        type: "current",
      });
    }

    const PrevAndCurrentMonthDays = [
      ...prevMonthDayArray.reverse(),
      ...currentMonthDaysArray,
    ];

    const finalDaysArray = [];
    for (let i = 0; i <= PrevAndCurrentMonthDays.length; i += 7) {
      finalDaysArray.push(PrevAndCurrentMonthDays.slice(i, i + 7));
    }

    const nextMonthDays =
      finalDaysArray.length * 7 - finalDaysArray.flat().length;

    if (nextMonthDays !== 7) {
      for (let i = 1; i <= nextMonthDays; i++) {
        finalDaysArray[finalDaysArray.length - 1].push({
          id: dayjs(`${year}-${nextMonthNumber}-${i}`).format("YYYY-MM-DD"),
          day: i,
          type: "next",
        });
      }
    }

    setFinalDaysArray(finalDaysArray as CalendarMonth);
  }, [
    currentMonthDaysCount,
    currentMonthFirstDayIndex,
    currentMonthNumber,
    nextMonthNumber,
    prevMonthDaysCount,
    prevMonthNumber,
    year,
  ]);

  return {
    finalDaysArray,
    currentMonthName,
    year,
    incrementMonth,
    decrementMonth,
  };
}

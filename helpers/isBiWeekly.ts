/* eslint-disable no-undef */
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

export const isBeWeekly = ({
  startDate,
  finalDaysArray,
  id,
}: {
  startDate: string;
  finalDaysArray?: CalendarMonth;
  id: string;
}) => {
  const getLastWeek = () => {
    if (finalDaysArray) {
      const finalArray = finalDaysArray[finalDaysArray.length - 1];

      return finalArray.length === 0
        ? finalDaysArray[finalDaysArray.length - 2]
        : finalArray;
    }
  };

  const lastWeek = getLastWeek();

  if (lastWeek) {
    const start = dayjs(startDate).week();

    const end = dayjs(lastWeek[0].id).week();

    const weeksFromStart = [];
    for (let i = start; i <= end; i += 2) {
      weeksFromStart.push(i);
    }

    return weeksFromStart.some((item) => item === dayjs(id).week());
  }
};

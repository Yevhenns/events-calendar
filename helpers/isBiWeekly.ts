/* eslint-disable no-undef */
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
import isLeapYear from "dayjs/plugin/isLeapYear";

dayjs.extend(weekOfYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

export const isBeWeekly = ({
  startDate,
  id,
}: {
  startDate: string;
  id: string;
}) => {
  const start = dayjs(startDate).week();
  const originalStart = start;
  const end1 = dayjs(id).isoWeeksInYear();

  const weeksFromStart = [];

  for (let i = originalStart; i >= 1; i -= 2) {
    weeksFromStart.unshift(i);
  }

  for (let i = start + 2; i <= end1; i += 2) {
    weeksFromStart.push(i);
  }

  return weeksFromStart.some((item) => item === dayjs(id).week());
};

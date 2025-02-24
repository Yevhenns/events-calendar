import dayjs from "dayjs";

export const isValidDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (value.length !== 10) return false;

  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date < today) {
    return false;
  }

  return true;
};

export function getDateDifference({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}) {
  return dayjs(endDate).diff(dayjs(startDate), "day");
}

export const isValidTime = (value: string) => {
  if (value.length !== 5) return false;

  const [hour, minute] = value.split(":").map(Number);

  if (hour < 0 || hour > 23) return false;
  if (minute < 0 || minute > 59) return false;

  return true;
};

export function isEndTimeAfterStart({
  endTime,
  startTime,
}: {
  endTime: string;
  startTime: string;
}) {
  const end = endTime.replace(":", "");
  const start = startTime.replace(":", "");

  return end > start ? true : false;
}

export function isStartTimeNotInPast({ startTime }: { startTime: string }) {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString();
  const minutes = currentDate.getMinutes().toString();

  const formattedHours = hours.length === 1 ? "0" + hours : hours;
  const formattedMinutes = minutes.length === 1 ? "0" + minutes : minutes;

  const currentTime = Number(formattedHours + formattedMinutes);

  const start = startTime && startTime.replace(":", "");

  if (start && currentTime < +start) {
    return true;
  } else {
    return false;
  }
}

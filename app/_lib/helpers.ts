import { formatDistance, isWithinInterval, parseISO } from "date-fns";

export function isAlreadyBooked(
  range: { from: number | null; to: number | null },
  datesArr: Date[]
): boolean {
  if (range.from === null || range.to === null) return false;

  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! })
  );
}

export function formatDistanceFromNow(dateStr: string): string {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");
}

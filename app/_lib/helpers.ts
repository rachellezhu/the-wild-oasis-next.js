import { formatDistance, isWithinInterval, parseISO } from "date-fns";

export function isAlreadyBooked(
  range: {
    from: number | Date | null | undefined;
    to: number | Date | null | undefined;
  },
  datesArr: Date[]
): boolean {
  if (!range.from || !range.to) return false;

  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! })
  );
}

export function formatDistanceFromNow(dateStr: string): string {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");
}

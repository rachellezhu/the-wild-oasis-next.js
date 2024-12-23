import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";

function isAlreadyBooked(
  range: { from: number | null; to: number | null },
  datesArr: Date[]
): boolean {
  if (range.from === null || range.to === null) return false;

  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! })
  );
}

export default function DateSelector() {
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;
  const range = { from: null, to: null };
  const minBookingLength = 1;
  const maxBookingLength = 23;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span>/night</span>
          </p>

          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button className="border border-primary-800 py-2 px-4 text-sm font-semibold">
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

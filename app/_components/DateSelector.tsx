"use client";

import { TCabin } from "@/app/_types/cabin-type";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Tables } from "@/app/_types/database.types";
import { useReservation } from "@/app/_hooks/useReservation";
import { differenceInDays } from "date-fns";
import { isAlreadyBooked } from "@/app/_lib/helpers";

type TDateSelectorProps = {
  settings: Tables<"settings">;
  cabin: TCabin;
  bookedDates: Date[];
};

export default function DateSelector({
  settings,
  bookedDates,
  cabin,
}: TDateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();
  const { regular_price, discount } = cabin;
  const { min_booking_length, max_booking_length } = settings;
  const displayRange = isAlreadyBooked(
    { from: range?.from, to: range?.to },
    bookedDates
  )
    ? undefined
    : range;
  const numNights =
    !displayRange || !displayRange.from
      ? 0
      : differenceInDays(
          displayRange.to || displayRange.from,
          displayRange.from
        );
  const cabinPrice = numNights * (regular_price! - discount!);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="p-8 place-self-center"
        mode="range"
        selected={displayRange}
        onSelect={(range) => setRange(range)}
        min={min_booking_length!}
        max={max_booking_length!}
        startMonth={new Date()}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={[...bookedDates, { before: new Date() }]}
        excludeDisabled
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount !== null && discount > 0 ? (
              <>
                <span className="text-2xl">${regular_price! - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regular_price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regular_price}</span>
            )}
            <span>/night</span>
          </p>

          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-3 text-2xl">
                <span>&times;</span>&nbsp;<span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>
                &nbsp;
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {numNights ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

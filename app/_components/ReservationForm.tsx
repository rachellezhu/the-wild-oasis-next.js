"use client";

import SubmitButton from "@/app/_components/SubmitButton";
import { useReservation } from "@/app/_hooks/useReservation";
import { createReservation } from "@/app/_lib/actions";
import { isAlreadyBooked } from "@/app/_lib/helpers";
import { TCabin } from "@/app/_types/cabin-type";
import { differenceInDays } from "date-fns";
import { Session } from "next-auth";
import Image from "next/image";

export default function ReservationForm({
  cabin,
  user,
  bookedDates,
}: {
  cabin: TCabin;
  user: Session["user"];
  bookedDates: Date[];
}) {
  const { range, resetRange } = useReservation();
  const { max_capacity, regular_price, discount, id } = cabin;
  const startDate = range?.from;
  const endDate = range?.to;
  const isBooked = isAlreadyBooked(
    { from: startDate, to: endDate },
    bookedDates
  );
  const numNights = differenceInDays(endDate!, startDate!);
  const cabinPrice = numNights * (regular_price! - discount!);
  const bookingData = {
    start_date: startDate?.toISOString(),
    end_date: endDate?.toISOString(),
    num_nights: numNights!,
    cabin_price: cabinPrice,
    cabin_id: id,
  };

  const createBookingWithData = createReservation.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            width={32}
            height={32}
            src={user!.image!}
            alt={`${user!.name!}`}
          />
          <p>{user!.name!}</p>
        </div>
      </div>

      <form
        action={async (formData: FormData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="num-guests">How many guests?</label>
          <select
            name="num-guests"
            id="num-guests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: max_capacity! }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {isBooked || !numNights ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

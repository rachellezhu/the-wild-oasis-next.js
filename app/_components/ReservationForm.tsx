"use client";

import { useReservation } from "@/app/_hooks/useReservation";
import { TCabin } from "@/app/_types/cabin-type";
import { Session } from "next-auth";
import Image from "next/image";

export default function ReservationForm({
  cabin,
  user,
}: {
  cabin: TCabin;
  user: Session["user"];
}) {
  const { range } = useReservation();
  const { max_capacity } = cabin;

  console.log(range);

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

      <form className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col">
        <div className="space-y-2">
          <label htmlFor="num-guests">How many guests?</label>
          <select
            name="num-guests"
            id="num-guests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
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
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

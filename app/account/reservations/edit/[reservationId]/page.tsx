import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions/reservation-actions";
import { getBooking } from "@/app/_lib/booking-services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reservationId: string }>;
}) {
  const reservationId = (await params).reservationId;

  return {
    title: `Edit Reservation #${reservationId}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ reservationId: string }>;
}) {
  const reservationId = (await params).reservationId;
  const booking = await getBooking(Number(reservationId));
  const maxCapacity = booking.cabins.max_capacity || 0;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input
          type="hidden"
          name="reservation-id"
          id="reservation-id"
          defaultValue={reservationId}
        />
        <div className="space-y-2">
          <label htmlFor="num-guests">How many guests?</label>
          <select
            name="num-guests"
            id="num-guests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={booking.num_guests || ""}
            required
          >
            <option value="" key="">
              Select number of guests
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
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
            id="observations"
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={booking.observations || ""}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

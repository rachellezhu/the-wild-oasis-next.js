import ReservationCard from "@/app/_components/ReservationCard";
import { getBookingsByGuestId } from "@/app/_lib/booking-services";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const bookings = await getBookingsByGuestId(23);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.data === null || !bookings.data.length ? (
        <p className="text-lg">
          You have no reservations yet. Check out our&nbsp;
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabin &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.data.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

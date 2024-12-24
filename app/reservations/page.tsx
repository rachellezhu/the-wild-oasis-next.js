import ReservationCard from "@/app/_components/ReservationCard";
import { getBookingsByGuestId } from "@/app/_lib/booking-services";

export default async function Page() {
  const bookings = await getBookingsByGuestId(23);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.data.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our&nbsp;
          <a className="underline textacc500" href="/cabins">
            luxury cabin &rarr;
          </a>
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

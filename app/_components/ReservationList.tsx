"use client";

import ReservationCard from "@/app/_components/ReservationCard";
import { deleteReservation } from "@/app/_lib/actions/reservation-actions";
import { TBookingsByGuest } from "@/app/_types/booking-type";
import { useOptimistic } from "react";

export default function ReservationList({
  bookings,
}: {
  bookings: TBookingsByGuest[];
}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currBookings: TBookingsByGuest[], bookingId: number) => {
      return currBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

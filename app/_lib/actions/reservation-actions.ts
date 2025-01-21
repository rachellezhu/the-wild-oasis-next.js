"use server";

import { TUpdateBookingFields } from "@/app/_types/booking-type";
import { checkAuth } from "../auth/auth";
import {
  createBooking,
  deleteBooking,
  getBookedDatesByCabinId,
  getBooking,
  updateBooking,
} from "../booking-services";
import { isAlreadyBooked } from "../helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReservation(
  bookingData: Pick<
    TUpdateBookingFields,
    | "start_date"
    | "end_date"
    | "cabin_id"
    | "num_nights"
    | "num_guests"
    | "cabin_price"
  >,
  formData: FormData
) {
  const session = await checkAuth();

  const numGuests = formData.get("num-guests");
  const observations = formData.get("observations")?.toString() || "";

  if (!numGuests) throw new Error("Please select the number of guests");

  const bookedDates = await getBookedDatesByCabinId(bookingData.cabin_id!);
  const alreadyBooked = isAlreadyBooked(
    {
      from: new Date(bookingData.start_date!),
      to: new Date(bookingData.end_date!),
    },
    bookedDates
  );

  if (alreadyBooked)
    throw new Error("You cannot book this cabin within the date range");

  const newBooking = await createBooking({
    start_date: bookingData.start_date!,
    end_date: bookingData.end_date!,
    num_nights: bookingData.num_nights!,
    num_guests: Number(numGuests),
    cabin_price: bookingData.cabin_price!,
    total_price: bookingData.cabin_price!,
    cabin_id: bookingData.cabin_id!,
    observations: observations.slice(0, 1000),
    guest_id: session.user!.guestId!,
    has_breakfast: false,
    extras_price: 0,
    is_paid: false,
    status: "unconfirmed",
  });

  if (newBooking) {
    revalidatePath("/cabins");
    revalidatePath(`/cabins/${newBooking.cabin_id}`);
    redirect("/cabins/thank-you");
  }
}

export async function updateReservation(formData: FormData) {
  const session = await checkAuth();

  const bookingId = Number(formData.get("reservation-id"));
  const numGuests = Number(formData.get("num-guests"));
  const observations = formData.get("observations")?.toString() || "";

  const checkedBooking = await getBooking(bookingId);

  if (checkedBooking.guest_id !== session?.user?.guestId)
    throw new Error("You are not allowed to update this reservation");

  if (!bookingId) throw new Error("The reservation could not be found");

  if (!numGuests) throw new Error("Please let us know how many guests");

  const updatedBooking = await updateBooking(bookingId, {
    num_guests: numGuests,
    observations: observations.slice(0, 1000),
  });

  if (updatedBooking) {
    revalidatePath(`/account/reservations/${bookingId}`);
    revalidatePath("/account/reservations");
    redirect("/account/reservations");
  }
}

export async function deleteReservation(bookingId: number) {
  // await new Promise((res) => setTimeout(res, 5000));

  const session = await checkAuth();

  const checkedBooking = await getBooking(bookingId);

  if (checkedBooking.guest_id !== session.user!.guestId)
    throw new Error("You are not allowed to delete this reservation!");

  const deletedBooking = await deleteBooking(bookingId);

  if (deletedBooking) revalidatePath("/account/reservations");
}

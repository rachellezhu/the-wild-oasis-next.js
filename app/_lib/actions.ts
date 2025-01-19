"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { updateGuest } from "./guest-services";
import { revalidatePath } from "next/cache";
import {
  deleteBooking,
  getBooking,
  updateBooking,
} from "@/app/_lib/booking-services";
import { redirect } from "next/navigation";

const regexNationalId = /^[a-zA-Z0-9]{6,16}$/;

async function checkAuth() {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  return session;
}

export async function updateGuestProfile(formData: FormData) {
  const session = await checkAuth();

  const nationalProp = formData.get("nationality")?.toString().split("%");
  const nationality =
    nationalProp && nationalProp.length == 2 ? nationalProp.at(0) : "";
  const countryFlag =
    nationalProp && nationalProp.length == 2 ? nationalProp.at(1) : "";
  const nationalId = formData.get("national-id")?.toString() ?? "";

  if (!regexNationalId.test(nationalId))
    throw new Error("Please provide a valid national ID");

  const updatedGuest = await updateGuest(session.user!.guestId!, {
    nationality: nationality,
    country_flag: countryFlag,
    national_id: nationalId,
  });

  if (updatedGuest) revalidatePath("/account/profile");
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
    observations: observations,
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

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function singOutAction() {
  await signOut({ redirectTo: "/" });
}

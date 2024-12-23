import { eachDayOfInterval } from "date-fns";
import { TBooking } from "../_types/booking-type";
import { TCabin, TGetCabinPrice, TGetCabins } from "../_types/cabin-type";
import { TGuest } from "../_types/guest-type";
import { supabase } from "./supabase";

// Cabins

export async function getCabin(id: number): Promise<TCabin> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin not found");
  }

  return data;
}

export async function getCabins(): Promise<TGetCabins> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, max_capacity, regular_price, discount, image_url")
    .order("name");

  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not get loaded");
  }

  return data;
}

export async function getCabinPrice(id: number): Promise<TGetCabinPrice> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regular_price, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

// Guests

export async function getGuest(email: string): Promise<TGuest> {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

// Bookings

export async function getBooking(id: number): Promise<TBooking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(
  cabinId: number
): Promise<Date[]> {
  let today: Date | string = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabin_id", cabinId)
    .or(`start_date.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error.message);
    throw new Error("Bookings could not get loaded");
  }

  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.start_date!),
        end: new Date(booking.end_date!),
      });
    })
    .flat();

  return bookedDates;
}

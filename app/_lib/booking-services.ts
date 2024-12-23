import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { TBooking, TNewBooking } from "../_types/booking-type";

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

export async function createBooking(
  newBooking: TNewBooking
): Promise<TBooking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Booking could not be created");
  }

  return data;
}

export async function deleteBooking(id: number): Promise<null> {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Booking could not be deleted");
  }

  return data;
}

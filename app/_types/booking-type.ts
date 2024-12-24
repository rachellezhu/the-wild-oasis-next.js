import { Tables } from "./database.types";

export type TBooking = Tables<"bookings">;

export enum Status {
  "unconfirmed" = "unconfirmed",
  "checked-in" = "checked-in",
  "checked-out" = "checked-out",
}

export type TBookingWithCabin = Omit<Tables<"bookings">, "status"> & {
  cabins: Pick<Tables<"cabins">, "name" | "image_url">;
  status: Status;
};

export type TNewBooking = Omit<TBooking, "id" | "created_at">;

export type TBookingsByGuest = Pick<
  Tables<"bookings">,
  | "id"
  | "created_at"
  | "start_date"
  | "end_date"
  | "num_nights"
  | "num_guests"
  | "total_price"
  | "guest_id"
  | "cabin_id"
> & {
  cabins: Pick<Tables<"cabins">, "name" | "image_url">;
};

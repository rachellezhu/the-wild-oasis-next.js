import { Tables } from "@/app/_types/database.types";

export type TBooking = Tables<"bookings">;

export enum Status {
  "unconfirmed" = "unconfirmed",
  "checked-in" = "checked-in",
  "checked-out" = "checked-out",
}

export type TBookingWithCabin = Omit<Tables<"bookings">, "status"> & {
  cabins: Pick<Tables<"cabins">, "name" | "image_url" | "max_capacity">;
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

export type TUpdateBookingFields = {
  [Property in keyof Tables<"bookings"> as Exclude<
    Property,
    "id" | "created_at"
  >]?: Tables<"bookings">[Property];
};

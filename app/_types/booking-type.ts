import { Tables } from "./database.types";

export type TBooking = Tables<"bookings">;

export type TNewBooking = Omit<TBooking, "id" | "created_at">;

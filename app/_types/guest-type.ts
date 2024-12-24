import { Tables } from "@/app/_types/database.types";

export type TGuest = Tables<"guests">;

export type TGuests = Tables<"guests">[];

export type TNewGuest = {
  [Property in keyof Tables<"guests"> as Exclude<
    Property,
    "id" | "created_at"
  >]?: Tables<"guests">[Property];
};

import { Tables } from "@/app/_types/database.types";

export type TCabin = Tables<"cabins">;

export type TCabins = Tables<"cabins">[];

export type TGetCabins = Omit<Tables<"cabins">, "created_at" | "description">;

export type TGetCabinPrice = Pick<
  Tables<"cabins">,
  "regular_price" | "discount"
>;

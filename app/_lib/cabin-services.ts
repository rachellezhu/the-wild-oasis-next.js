import { TCabin, TGetCabinPrice, TGetCabins } from "@/app/_types/cabin-type";
import { supabase } from "@/app/_lib/supabase";
import { notFound } from "next/navigation";

export async function getCabin(id: number): Promise<TCabin> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error.message);
    notFound();
  }

  return data;
}

export async function getCabins(): Promise<TGetCabins[]> {
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

export async function countCabins(): Promise<number> {
  const { count, error } = await supabase
    .from("cabins")
    .select("*", { count: "exact" });
  const data = count || 0;

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

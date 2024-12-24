import { TGuest, TNewGuest } from "@/app/_types/guest-type";
import { supabase } from "@/app/_lib/supabase";

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

export async function createGuest(newGuest: TNewGuest): Promise<TGuest> {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function updateGuest(
  id: number,
  updatedFields: TNewGuest
): Promise<TGuest> {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Guest could not be updated");
  }

  return data;
}

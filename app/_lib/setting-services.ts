import { TSetting } from "@/app/_types/setting-type";
import { supabase } from "@/app/_lib/supabase";

export async function getSettings(): Promise<TSetting> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error.message);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/app/_types/database.types";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseProjectKey = process.env.SUPABASE_PROJECT_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseProjectKey);

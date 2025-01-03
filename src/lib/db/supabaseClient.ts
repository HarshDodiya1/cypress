// utils/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import { config } from "../../../config"; // Adjust path to your config

console.log("Connected to Supabase database");
export const supabase = createClient(
  config.NEXT_PUBLIC_SUPABASE_URL!,
  config.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

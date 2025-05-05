// src/lib/getUserFormData.js

import { auth } from "@clerk/nextjs/server"; // Only in server-side
import { createClient } from '@supabase/supabase-js';

export async function getUserFormData() {
  const { userId } = await auth(); // ✅ Await this

  console.log("User ID:", userId); // Will now log correctly on the server

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("user_id", userId)
    .single();

  return { data, error };
}

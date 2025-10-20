import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = async () => {
  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
  }

  try {
    const { getToken } = await auth();
    // Try to get Clerk JWT for Supabase. This will fail gracefully if template doesn't exist.
    const jwt = await getToken({ template: "supabase" }).catch((err) => {
      console.log("No Supabase JWT template configured in Clerk, using anon key:", err.message);
      return null;
    });

    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
        },
      }
    );
  } catch (error) {
    // If auth() fails (e.g., no session), just use anon key
    console.log("Creating Supabase client without auth");
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
};

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = async () => {
  const { getToken } = await auth();
  // If you configured a Supabase JWT template in Clerk, pass it here. Otherwise this returns null.
  const jwt = await getToken({ template: "supabase" }).catch(() => null);

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
      },
    }
  );
};

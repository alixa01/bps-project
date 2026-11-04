import "server-only";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireStaff(nextPath = "/dashboard") {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/masuk?next=${encodeURIComponent(nextPath)}`);

  const profile = await prisma.profile.findUnique({ where: { id: user.id } });
  if (!profile) redirect("/masuk");

  return { user, profile };
}

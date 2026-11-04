"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LoginState = { error: string | null; ok?: boolean; next?: string };

export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  if (!email || !password) {
    return { error: "err.loginRequired" };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "err.loginFailed" };
  }

  return {
    error: null,
    ok: true,
    next: next.startsWith("/") ? next : "/dashboard",
  };
}

import { createBrowserClient } from "@supabase/ssr";

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/dashboard";
  const origin = url.origin;

  if (!code) {
    return Response.redirect(`${origin}/login?error=no_code`, 302);
  }

  const supabase = createBrowserClient(
    env.PUBLIC_SUPABASE_URL,
    env.PUBLIC_SUPABASE_ANON_KEY
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return Response.redirect(`${origin}/login?error=auth`, 302);
  }

  return Response.redirect(`${origin}${next}`, 302);
};

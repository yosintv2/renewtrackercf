import { createServerClient } from "@supabase/ssr";

interface Cookie {
  name: string;
  value: string;
  options: Record<string, unknown>;
}

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return Response.redirect(new URL("/login?error=no_code", url.origin), 302);
  }

  const cookiesToSet: Cookie[] = [];

  const supabase = createServerClient(
    context.env.PUBLIC_SUPABASE_URL,
    context.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => {
          const header = context.request.headers.get("Cookie") || "";
          if (!header) return [];
          return header.split(";").reduce<{ name: string; value: string }[]>(
            (cookies, pair) => {
              const idx = pair.indexOf("=");
              if (idx < 0) return cookies;
              const name = pair.substring(0, idx).trim();
              const value = decodeURIComponent(
                pair.substring(idx + 1).trim(),
              );
              if (name) cookies.push({ name, value });
              return cookies;
            },
            [],
          );
        },
        setAll: (cookies) => {
          cookiesToSet.push(...cookies);
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const errorPath = next === "/reset-password"
      ? `/forgot-password?error=link_expired`
      : `/login?error=${encodeURIComponent(error.message)}`;
    return Response.redirect(new URL(errorPath, url.origin), 302);
  }

  const headers = new Headers();
  headers.set("Location", new URL(next, url.origin).toString());

  for (const cookie of cookiesToSet) {
    const parts: string[] = [];
    const val = typeof cookie.value === "string" ? cookie.value : String(cookie.value ?? "");
    parts.push(`${cookie.name}=${encodeURIComponent(val)}`);
    const opts = cookie.options ?? {};
    if (opts.path) parts.push(`Path=${opts.path}`);
    if (opts.domain) parts.push(`Domain=${opts.domain}`);
    if (opts.maxAge != null) parts.push(`Max-Age=${Math.floor(Number(opts.maxAge))}`);
    if (opts.sameSite) parts.push(`SameSite=${String(opts.sameSite)}`);
    if (opts.httpOnly) parts.push("HttpOnly");
    if (opts.secure) parts.push("Secure");
    if (opts.expires) {
      const expires =
        typeof opts.expires === "string"
          ? opts.expires
          : new Date(opts.expires as number | Date).toUTCString();
      parts.push(`Expires=${expires}`);
    }
    headers.append("Set-Cookie", parts.join("; "));
  }

  return new Response(null, {
    status: 302,
    headers,
  });
}

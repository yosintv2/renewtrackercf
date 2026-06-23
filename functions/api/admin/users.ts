import { createServerClient } from "@supabase/ssr";

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  if (!context.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: "SUPABASE_SERVICE_ROLE_KEY is not set" }), { status: 500, headers });
  }

  const supabase = createServerClient(
    context.env.PUBLIC_SUPABASE_URL,
    context.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    },
  );

  const authHeader = context.request.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401, headers });
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401, headers });
  }

  if (user.email !== "mail.yosintv@gmail.com") {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers });
  }

  const [{ data: authData, error: authError }, { data: subscriptions }] = await Promise.all([
    supabase.auth.admin.listUsers({ perPage: 1000 }),
    supabase.from("subscriptions").select("user_id"),
  ]);

  if (authError) {
    return new Response(JSON.stringify({ error: authError.message }), { status: 500, headers });
  }

  const subCounts: Record<string, number> = {};
  subscriptions?.forEach((s: any) => {
    subCounts[s.user_id] = (subCounts[s.user_id] ?? 0) + 1;
  });

  const users = (authData?.users ?? []).map((u: any) => ({
    id: u.id,
    email: u.email ?? "unknown@—",
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at ?? null,
    provider: (u.app_metadata?.provider as string | undefined) ?? "email",
    subscriptions: subCounts[u.id] ?? 0,
  }));

  return new Response(JSON.stringify({ users }), { status: 200, headers });
}

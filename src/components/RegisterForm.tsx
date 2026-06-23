import { useState } from "react";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
        <div class="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 class="w-6 h-6 text-green-600" />
        </div>
        <h2 class="text-lg font-bold text-gray-900 mb-1">Check your email</h2>
        <p class="text-gray-500 text-sm mb-4">
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
        <a href="/login" class="text-blue-600 text-sm font-medium hover:underline">Back to sign in</a>
      </div>
    );
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
      },
    });
  }

  return (
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {error && (
        <div class="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 mb-4 text-sm">
          <AlertCircle class="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={handleGoogleLogin}
        class="w-full h-10 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 mb-4 inline-flex items-center justify-center gap-2 transition-colors text-sm"
        type="button"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <div class="relative mb-4">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200" />
        </div>
        <div class="relative flex justify-center text-xs text-gray-400 bg-white px-3">
          or sign up with email
        </div>
      </div>

      <form onSubmit={handleRegister} class="space-y-3">
        <div>
          <label for="name" class="text-sm font-medium text-gray-700">Full name</label>
          <input
            id="name"
            type="text"
            placeholder="Alex Johnson"
            class="mt-1 w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="email" class="text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            class="mt-1 w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="password" class="text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            class="mt-1 w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-90 text-sm"
        >
          {loading && <Loader2 class="w-4 h-4 animate-spin" />}
          {loading ? "Creating account..." : "Create free account"}
        </button>

        <p class="text-xs text-gray-400 text-center">
          By signing up you agree to our{" "}
          <a href="/terms" class="text-blue-600 hover:underline">Terms</a> and{" "}
          <a href="/privacy" class="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
}

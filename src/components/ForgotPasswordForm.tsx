import { useState, useEffect } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [banner, setBanner] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "link_expired") {
      setBanner("This reset link has expired or was opened in a different browser. Request a new one below.");
    }
  }, []);

  if (sent) {
    return (
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
        <div class="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 class="w-6 h-6 text-green-600" />
        </div>
        <h2 class="text-lg font-bold text-gray-900 mb-1">Check your inbox</h2>
        <p class="text-gray-500 text-sm mb-4">
          We sent a password reset link to <strong>{email}</strong>.
        </p>
        <p class="text-xs text-gray-400 mb-4">
          Didn&apos;t get it? Check your spam folder, or{" "}
          <button onClick={() => setSent(false)} class="text-blue-600 hover:underline font-medium">try again</button>.
        </p>
        <a href="/login" class="text-blue-600 text-sm font-medium hover:underline">Back to sign in</a>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/reset-password`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {banner && (
        <div class="flex items-start gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4 text-sm">
          <AlertTriangle class="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{banner}</span>
        </div>
      )}
      {error && (
        <div class="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 mb-4 text-sm">
          <AlertCircle class="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} class="space-y-3">
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
        <button
          type="submit"
          disabled={loading}
          class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl inline-flex items-center justify-center gap-2 transition-colors text-sm"
        >
          {loading ? (
            <><Loader2 class="w-4 h-4 animate-spin" />Sending...</>
          ) : (
            <><Mail class="w-4 h-4" />Send reset link</>
          )}
        </button>
      </form>
    </div>
  );
}

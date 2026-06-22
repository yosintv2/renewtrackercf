import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (done) {
    return (
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
        <div class="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 class="w-7 h-7 text-green-600" />
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Password updated</h2>
        <p class="text-gray-500 text-sm">Redirecting to your dashboard&hellip;</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setDone(true);
      setTimeout(() => window.location.href = "/dashboard", 2000);
    }
  }

  return (
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      {error && (
        <div class="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm">
          <AlertCircle class="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label for="password" class="text-sm font-medium text-gray-700">New password</label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            class="mt-1.5 w-full h-11 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div>
          <label for="confirm" class="text-sm font-medium text-gray-700">Confirm password</label>
          <input
            id="confirm"
            type="password"
            placeholder="Repeat your password"
            class="mt-1.5 w-full h-11 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          class="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl inline-flex items-center justify-center gap-2 transition-colors mt-2"
        >
          {loading ? (
            <><Loader2 class="w-4 h-4 animate-spin" />Updating&hellip;</>
          ) : (
            <><KeyRound class="w-4 h-4" />Update password</>
          )}
        </button>
      </form>
    </div>
  );
}

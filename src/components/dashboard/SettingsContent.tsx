import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AlertCircle, Loader2, CheckCircle2, Shield } from "lucide-react";

export default function SettingsContent() {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleted, setDeleted] = useState(false);

  async function handleDeleteAccount() {
    if (!window.confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) return;
    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete account");
      }
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
      setDeleted(true);
      setTimeout(() => { window.location.href = "/"; }, 2000);
    } catch (err: any) {
      setDeleteError(err.message);
      setDeleting(false);
    }
  }

  if (deleted) {
    return (
      <div class="space-y-5">
        <h1 class="text-xl font-bold text-gray-900">Settings</h1>
        <div class="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <div class="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 class="w-7 h-7 text-green-600" />
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Account deleted</h2>
          <p class="text-gray-500 text-sm">Redirecting to homepage&hellip;</p>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-6">
      <h1 class="text-xl font-bold text-gray-900">Settings</h1>

      {/* Currency info */}
      <div class="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-900 mb-2">Currency</h3>
        <p class="text-sm text-gray-500">Change your preferred currency from the dropdown in the top-right header.</p>
      </div>

      {/* Profile info */}
      <div class="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-900 mb-2">Profile</h3>
        <p class="text-sm text-gray-500">Your profile information is managed by your Supabase account.</p>
      </div>

      {/* Danger zone */}
      <div class="bg-white rounded-2xl border border-red-200 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
            <Shield class="w-4.5 h-4.5 text-red-600" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Danger Zone</h3>
            <p class="text-xs text-gray-500">Irreversible actions</p>
          </div>
        </div>
        {deleteError && (
          <div class="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm">
            <AlertCircle class="w-4 h-4 flex-shrink-0" />{deleteError}
          </div>
        )}
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors disabled:opacity-90"
        >
          {deleting ? <><Loader2 class="w-4 h-4 animate-spin" />Deleting&hellip;</> : "Delete Account"}
        </button>
        <p class="text-xs text-gray-400 mt-3">This permanently removes all your data including all subscriptions and bills.</p>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrency, CURRENCIES } from "@/lib/currency";
import { cn } from "@/lib/utils";
import {
  User, Shield, Trash2, CheckCircle2, Globe,
  Loader2, AlertCircle, KeyRound, Bell, Check,
} from "lucide-react";

const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-rose-500", "bg-orange-500"];

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase() || "--";
}

function getAvatarColor(inits: string): string {
  const idx = (inits.charCodeAt(0) + (inits.charCodeAt(1) || 0)) % colors.length;
  return colors[idx];
}

export default function SettingsContent() {
  const { code, setCurrency } = useCurrency();

  const [profileLoading, setProfileLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleted, setDeleted] = useState(false);

  const initials = getInitials(name);
  const avatarColor = getAvatarColor(initials);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [{ data: auth }, { data: profile }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("profiles").select("name, phone").single(),
      ]);
      const displayName = profile?.name || auth?.user?.user_metadata?.full_name || "";
      setName(displayName);
      setEmail(auth?.user?.email || "");
      setPhone(profile?.phone || "");
      setProfileLoading(false);
    }
    load();
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({ name: name.trim(), phone: phone.trim() || null }).eq("id", user.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    if (newPw.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    setPwLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: currentPw });
    if (signInError) {
      setPwError("Current password is incorrect.");
      setPwLoading(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (error) {
      setPwError(error.message);
    } else {
      setPwSaved(true);
      setCurrentPw("");
      setNewPw("");
      setTimeout(() => setPwSaved(false), 3000);
    }
    setPwLoading(false);
  }

  async function handleDeleteAccount() {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Not authenticated");
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete account");
      }
      await supabase.auth.signOut();
      setDeleted(true);
      setTimeout(() => { window.location.href = "/"; }, 2000);
    } catch (err: any) {
      setDeleteError(err.message || "Something went wrong.");
      setDeleteLoading(false);
    }
  }

  if (deleted) {
    return (
      <div className="space-y-5">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Account deleted</h2>
          <p className="text-gray-500 text-sm">Redirecting to homepage&hellip;</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Profile</span>
        </div>
        <div className="p-5">
          {profileLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0", avatarColor)}>
                  {initials || "--"}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{name || "—"}</p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                  <input id="name" value={name} onChange={(e) => setName(e.target.value)}
                    className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                  <input id="email" type="email" value={email} disabled
                    className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed here</p>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input id="phone" type="tel" placeholder="+1 555 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                </div>
                <button type="submit" disabled={saving}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors disabled:opacity-90 shadow-md shadow-blue-200">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving&hellip;</> : saved ? <><CheckCircle2 className="w-4 h-4" />Saved!</> : "Save changes"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Currency */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
            <Globe className="w-3.5 h-3.5 text-green-600" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Currency</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-4">Choose the currency used to display all your subscription amounts.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CURRENCIES.map((c) => (
              <button key={c.code} onClick={() => setCurrency(c.code)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-colors",
                  code === c.code
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                )}>
                <span className="text-sm font-mono font-bold w-6 text-center flex-shrink-0">{c.symbol}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{c.code}</p>
                  <p className="text-[10px] text-gray-400 truncate">{c.label}</p>
                </div>
                {code === c.code && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 ml-auto" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reminder schedule */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-yellow-50 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5 text-yellow-600" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Reminder schedule</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-4">
            Email reminders are sent automatically at these intervals before each payment:
          </p>
          <div className="space-y-2.5">
            {["30 days before", "15 days before", "7 days before", "3 days before", "1 day before"].map((d) => (
              <div key={d} className="flex items-center gap-3 px-3 py-2.5 bg-green-50 border border-green-100 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{d}</span>
                <span className="ml-auto text-[11px] font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Active</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 my-4" />
          <p className="text-xs text-gray-400">
            Push and Telegram notifications are coming soon.
          </p>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Change password</span>
        </div>
        <div className="p-5">
          {pwSaved ? (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              Password updated successfully.
            </div>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {pwError && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {pwError}
                </div>
              )}
              <div>
                <label htmlFor="current-pw" className="block text-sm font-medium text-gray-700 mb-1.5">Current password</label>
                <input id="current-pw" type="password" placeholder="••••••••" value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)} required
                  className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
              </div>
              <div>
                <label htmlFor="new-pw" className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
                <input id="new-pw" type="password" placeholder="At least 8 characters" value={newPw}
                  onChange={(e) => setNewPw(e.target.value)} minLength={8} required
                  className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
              </div>
              <button type="submit" disabled={pwLoading}
                className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors disabled:opacity-90">
                {pwLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Updating&hellip;</> : <><KeyRound className="w-4 h-4" />Update password</>}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-200 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-red-100">
          <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
          </div>
          <span className="font-semibold text-red-600 text-sm">Danger zone</span>
        </div>
        <div className="p-5">
          {!showDeleteConfirm ? (
            <>
              <p className="text-sm text-gray-500 mb-4">
                Permanently delete your account and all subscription data. This cannot be undone.
              </p>
              <button onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors">
                <Trash2 className="w-4 h-4" />Delete account
              </button>
            </>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-red-800">Are you absolutely sure?</p>
              <p className="text-xs text-red-600 leading-relaxed">
                This will permanently delete your account, all subscriptions, and all data
                associated with <strong>{email}</strong>. There is no way to recover this.
              </p>
              {deleteError && (
                <p className="text-xs text-red-700 bg-red-100 px-3 py-2 rounded-lg">{deleteError}</p>
              )}
              <div className="flex gap-2 pt-1">
                <button onClick={handleDeleteAccount} disabled={deleteLoading}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors disabled:opacity-90">
                  {deleteLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Deleting&hellip;</> : "Yes, delete everything"}
                </button>
                <button onClick={() => { setShowDeleteConfirm(false); setDeleteError(""); }} disabled={deleteLoading}
                  className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 font-semibold text-sm px-4 py-2 rounded-xl transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

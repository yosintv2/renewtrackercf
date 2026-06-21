"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Trash2, CheckCircle2, Globe, Loader2 } from "lucide-react";
import { useCurrency, CURRENCIES } from "@/lib/currency";
import { cn } from "@/lib/utils";

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div className={cn("relative w-9 h-5 rounded-full flex items-center transition-colors cursor-pointer flex-shrink-0", enabled ? "bg-blue-600" : "bg-gray-300")}>
      <div className={cn("absolute w-4 h-4 rounded-full bg-white shadow-sm transition-all", enabled ? "translate-x-4" : "translate-x-0.5")} />
    </div>
  );
}

const NOTIFICATION_TOGGLES = [
  { label: "30 days before renewal", enabled: true },
  { label: "15 days before renewal", enabled: true },
  { label: "7 days before renewal", enabled: true },
  { label: "3 days before renewal", enabled: true },
  { label: "1 day before renewal", enabled: true },
];

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [initials, setInitials] = useState("--");
  const [avatarColor, setAvatarColor] = useState("bg-blue-500");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const { code, setCurrency } = useCurrency();

  const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-rose-500", "bg-orange-500"];

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [{ data: auth }, { data: profile }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("profiles").select("name, phone").single(),
      ]);
      const displayName = profile?.name || auth?.user?.user_metadata?.full_name || "";
      const userEmail = auth?.user?.email || "";
      setName(displayName);
      setEmail(userEmail);
      setPhone(profile?.phone || "");

      const parts = displayName.split(" ").filter(Boolean);
      const inits = parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : displayName.slice(0, 2).toUpperCase() || "--";
      setInitials(inits);
      const idx = (inits.charCodeAt(0) + (inits.charCodeAt(1) || 0)) % colors.length;
      setAvatarColor(colors[idx]);

      setProfileLoading(false);
    }
    load();
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    await supabase.from("profiles").update({ name: name.trim(), phone: phone.trim() || null }).eq("id", (await supabase.auth.getUser()).data.user!.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
                  {initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{name || "—"}</p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 border-gray-200 h-11" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
                  <Input id="email" type="email" value={email} disabled className="mt-1.5 border-gray-200 h-11 bg-gray-50 text-gray-400 cursor-not-allowed" />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed here</p>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone <span className="text-gray-400 font-normal">(optional)</span>
                  </Label>
                  <Input id="phone" type="tel" placeholder="+1 555 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 border-gray-200 h-11" />
                </div>
                <Button type="submit" disabled={saving} className="h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200 px-6">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</> : saved ? <><CheckCircle2 className="w-4 h-4 mr-2" />Saved!</> : "Save changes"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Currency */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
            <Globe className="w-3.5 h-3.5 text-green-600" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Currency</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-4">Choose the currency used to display all your subscription amounts.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CURRENCIES.slice(0, 12).map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-colors",
                  code === c.code
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <span className="text-sm font-mono font-bold w-6 text-center flex-shrink-0">{c.symbol}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{c.code}</p>
                  <p className="text-[10px] text-gray-400 truncate">{c.label}</p>
                </div>
                {code === c.code && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 ml-auto" />}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">More currencies available in the header currency picker.</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-yellow-50 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5 text-yellow-600" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Notification preferences</span>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            {NOTIFICATION_TOGGLES.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <Toggle enabled={item.enabled} />
              </div>
            ))}
          </div>
          <Separator className="my-5" />
          <p className="text-sm text-gray-500">
            Email reminders are active. Push and Telegram notifications coming soon.
          </p>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-green-600" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Security</span>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <Label htmlFor="current-password" className="text-sm font-medium text-gray-700">Current password</Label>
            <Input id="current-password" type="password" placeholder="••••••••" className="mt-1.5 border-gray-200 h-11" />
          </div>
          <div>
            <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">New password</Label>
            <Input id="new-password" type="password" placeholder="At least 8 characters" className="mt-1.5 border-gray-200 h-11" />
          </div>
          <Button variant="outline" className="h-11 border-gray-200 rounded-xl px-6">
            Update password
          </Button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-red-100">
          <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
          </div>
          <span className="font-semibold text-red-600 text-sm">Danger zone</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-4">
            Permanently delete your account and all subscription data. This cannot be undone.
          </p>
          <Button variant="outline" className="h-11 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl px-6">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { AlertTriangle, CheckCircle2, Clock, ArrowRight, Bell, Loader2, Plus, Calendar, TrendingDown } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

type Subscription = {
  id: string; name: string; category: string; price: number;
  billing_cycle: string; next_billing_date: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  entertainment: "Entertainment", living: "Living Essentials", tech: "Tech & Tools",
  lifestyle: "Lifestyle", financial: "Financial", other: "Other",
};

const CATEGORY_BAR: Record<string, string> = {
  entertainment: "bg-purple-400", living: "bg-green-400", tech: "bg-blue-400",
  lifestyle: "bg-orange-400", financial: "bg-red-400", other: "bg-gray-300",
};

const CATEGORY_COLORS: Record<string, string> = {
  entertainment: "bg-purple-100 text-purple-700", living: "bg-green-100 text-green-700",
  tech: "bg-blue-100 text-blue-700", lifestyle: "bg-orange-100 text-orange-700",
  financial: "bg-red-100 text-red-700", other: "bg-gray-100 text-gray-600",
};

function daysUntil(dateStr: string): number {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr); target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function monthlyEquiv(price: number, cycle: string) {
  if (cycle === "once") return 0;
  if (cycle === "yearly") return price / 12;
  if (cycle === "weekly") return price * 4.33;
  if (cycle === "quarterly") return price / 3;
  return price;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function DaysTag({ days }: { days: number }) {
  const base = "text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap";
  if (days < 0) return <span className={cn(base, "bg-red-100 text-red-700")}>Overdue</span>;
  if (days === 0) return <span className={cn(base, "bg-red-100 text-red-700")}>Today</span>;
  if (days === 1) return <span className={cn(base, "bg-red-100 text-red-700")}>Tomorrow</span>;
  if (days <= 3) return <span className={cn(base, "bg-red-100 text-red-700")}>{days}d left</span>;
  if (days <= 7) return <span className={cn(base, "bg-orange-100 text-orange-700")}>{days}d left</span>;
  if (days <= 30) return <span className={cn(base, "bg-yellow-100 text-yellow-700")}>{days}d</span>;
  return <span className={cn(base, "bg-green-100 text-green-700")}>{days}d</span>;
}

export default function DashboardOverviewContent() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [userName, setUserName] = useState("there");
  const [loading, setLoading] = useState(true);
  const { fmt } = useCurrency();

  useEffect(() => {
    let cancelled = false;
    const forceStop = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 8000);
    async function load() {
      try {
        console.log("[DASH] load started");
        const supabase = createClient();
        console.log("[DASH] createClient done, calling getUser…");
        const res = await Promise.all([
          supabase.auth.getUser(),
          supabase.from("profiles").select("name").single(),
          supabase.from("subscriptions").select("*").order("next_billing_date", { ascending: true }),
        ]);
        console.log("[DASH] Promise.all resolved", res[0]);
        if (cancelled) return;
        const [authData, profileData, subData] = res.map(r => r.data);
        if (!authData?.user) {
          console.log("[DASH] no user, redirecting to /login");
          window.location.href = "/login";
          return;
        }
        const name = profileData?.name || authData.user.user_metadata?.full_name || authData.user.email || "there";
        setUserName(name.split(" ")[0]);
        if (subData) setSubs(subData);
      } catch (e) {
        console.error("[DASH] load error:", e);
      } finally {
        if (!cancelled) setLoading(false);
        clearTimeout(forceStop);
      }
    }
    load();
    return () => { cancelled = true; clearTimeout(forceStop); };
  }, []);

  const totalMonthly = subs.reduce((sum, s) => sum + monthlyEquiv(s.price, s.billing_cycle), 0);
  const totalYearly = totalMonthly * 12;
  const upcoming = subs.filter(s => { const d = daysUntil(s.next_billing_date); return d >= 0 && d <= 30; });
  const overdue = subs.filter(s => daysUntil(s.next_billing_date) < 0);
  const dueSoon = subs.filter(s => { const d = daysUntil(s.next_billing_date); return d >= 0 && d <= 7; });

  const byCategory = Object.entries(
    subs.reduce<Record<string, number>>((acc, s) => {
      const m = monthlyEquiv(s.price, s.billing_cycle);
      acc[s.category] = (acc[s.category] ?? 0) + m;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]).map(([cat, amount]) => ({ cat, amount }));

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-7 h-7 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto lg:max-w-none">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{greeting}, {userName}</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {subs.length === 0 ? "Start tracking your subscriptions"
            : overdue.length > 0 ? `${overdue.length} overdue · ${upcoming.length} due this month`
            : upcoming.length > 0 ? `${upcoming.length} payment${upcoming.length !== 1 ? "s" : ""} due this month`
            : "All payments are on track"}
        </p>
      </div>

      {subs.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-5 shadow-sm">
            <Calendar className="w-7 h-7 text-blue-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nothing tracked yet</h3>
          <p className="text-sm text-gray-500 mb-7 max-w-xs leading-relaxed">Add Netflix, rent, loan payments and more. See everything you pay — in one place.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/dashboard/subscriptions?add=true"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-6 min-h-[48px] rounded-xl shadow-lg shadow-blue-200 transition-all"
            >
              <Plus className="w-4 h-4" /> Add first subscription
            </a>
            <a href="/dashboard/bills?add=true"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-700 text-sm font-semibold px-6 min-h-[48px] rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Add first bill
            </a>
          </div>
        </div>
      )}

      {subs.length > 0 && (
        <>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 shadow-lg shadow-gray-200">
              <p className="text-xs text-gray-400 mb-1 font-medium tracking-wide uppercase">Monthly spend</p>
              <p className="text-4xl font-bold text-white mb-1">{fmt(Math.round(totalMonthly))}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-gray-400">{fmt(Math.round(totalYearly))}/year</span>
                {dueSoon.length > 0 && (
                  <span className="text-xs font-semibold bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">{dueSoon.length} due in 7 days</span>
                )}
              </div>
            </div>

            {(() => {
              const allDue = [...overdue, ...upcoming].sort((a, b) => daysUntil(a.next_billing_date) - daysUntil(b.next_billing_date));
              const next = allDue[0];
              if (!next) return null;
              const nd = daysUntil(next.next_billing_date);
              return (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between">
                  <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Next payment</p>
                  <div className="mt-2">
                    <p className="text-lg font-bold text-gray-900 truncate">{next.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl font-bold text-gray-900">{fmt(next.price)}</span>
                      <span className="text-[11px] text-gray-400">/{next.billing_cycle === "monthly" ? "mo" : next.billing_cycle === "yearly" ? "yr" : next.billing_cycle === "weekly" ? "wk" : "qtr"}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <p className="text-xs text-gray-500">{formatDate(next.next_billing_date)}</p>
                    <DaysTag days={nd} />
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total", value: subs.length, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              { label: "Overdue", value: overdue.length, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
              { label: "Due soon", value: dueSoon.length, icon: Clock, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
            ].map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className={cn("bg-white rounded-2xl border p-4 text-center shadow-sm", stat.border)}>
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2", stat.bg)}>
                    <Icon className={cn("w-4 h-4", stat.color)} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 text-red-500" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Upcoming Payments</span>
                {(overdue.length + upcoming.length) > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{overdue.length + upcoming.length}</span>
                )}
              </div>
              <a href="/dashboard/reminders" className="text-xs text-blue-600 font-medium hover:underline py-1.5">View all</a>
            </div>
            <div className="divide-y divide-gray-50">
              {[...overdue, ...upcoming].length === 0 ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-9 h-9 mx-auto mb-2 text-green-400" />
                  <p className="text-sm font-medium text-gray-700">Nothing due this month</p>
                </div>
              ) : (
                [...overdue, ...upcoming].slice(0, 6).map(s => {
                  const days = daysUntil(s.next_billing_date);
                  return (
                    <div key={s.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{fmt(s.price)} · {formatDate(s.next_billing_date)}</p>
                      </div>
                      <DaysTag days={days} />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {byCategory.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <TrendingDown className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Spend by Category</span>
              </div>
              <div className="p-5 space-y-4">
                {byCategory.map(({ cat, amount }) => {
                  const pct = Math.round((amount / totalMonthly) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-600")}>
                          {CATEGORY_LABELS[cat] ?? cat}
                        </span>
                        <span className="text-sm font-bold text-gray-900">{fmt(Math.round(amount))}<span className="text-xs font-normal text-gray-400">/mo</span></span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all", CATEGORY_BAR[cat] ?? "bg-gray-400")} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-2">
            <p className="text-sm font-semibold text-gray-900 mb-3">Quick actions</p>
            {[
              { href: "/dashboard/subscriptions", label: "Manage subscriptions" },
              { href: "/dashboard/reminders", label: "View reminders" },
              { href: "/dashboard/settings", label: "Account settings" },
            ].map(item => (
              <a key={item.href} href={item.href}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 active:bg-blue-50 transition-colors group min-h-[48px]"
              >
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

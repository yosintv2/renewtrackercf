import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Bell, AlertTriangle, Clock, CheckCircle2, Loader2, Plus, ArrowRight } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

type Subscription = {
  id: string; name: string; category: string; price: number;
  billing_cycle: string; next_billing_date: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  entertainment: "Entertainment", living: "Living Essentials", tech: "Tech & Tools",
  lifestyle: "Lifestyle", financial: "Financial Liabilities", other: "Other",
};

function daysUntil(dateStr: string): number {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr); target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function monthlyEquiv(price: number, cycle: string) {
  if (cycle === "once") return 0;
  if (cycle === "yearly") return price / 12;
  if (cycle === "weekly") return price * 4.33;
  if (cycle === "quarterly") return price / 3;
  return price;
}

function ReminderRow({ s, fmt }: { s: Subscription; fmt: (n: number) => string }) {
  const days = daysUntil(s.next_billing_date);
  const isOverdue = days < 0;
  const isCritical = days >= 0 && days <= 3;
  const isWarning = days > 3 && days <= 15;
  const isUpcoming = days > 15 && days <= 30;

  const rowBg = isOverdue || isCritical ? "bg-red-50 border-red-100"
    : isWarning ? "bg-yellow-50 border-yellow-100"
    : isUpcoming ? "bg-orange-50 border-orange-100"
    : "bg-gray-50 border-gray-100";

  const icon = isOverdue || isCritical
    ? <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
    : isWarning || isUpcoming
    ? <Clock className="w-4 h-4 text-yellow-500 flex-shrink-0" />
    : <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />;

  const daysLabel = isOverdue ? `Overdue ${Math.abs(days)}d`
    : days === 0 ? "Due today"
    : days === 1 ? "Tomorrow"
    : `${days} days`;

  const daysColor = isOverdue || isCritical ? "text-red-600"
    : isWarning ? "text-yellow-600"
    : isUpcoming ? "text-orange-500"
    : "text-gray-500";

  return (
    <div className={cn("flex items-center justify-between p-4 rounded-xl border gap-3", rowBg)}>
      <div className="flex items-center gap-3 min-w-0">
        {icon}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {CATEGORY_LABELS[s.category] ?? s.category} · {fmt(s.price)}/{s.billing_cycle === "monthly" ? "mo" : s.billing_cycle === "yearly" ? "yr" : s.billing_cycle}
          </p>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className={cn("font-bold text-sm", daysColor)}>{daysLabel}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(s.next_billing_date)}</p>
      </div>
    </div>
  );
}

export default function RemindersContent() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"active" | "upcoming" | "all">("active");
  const { fmt } = useCurrency();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("subscriptions").select("*").order("next_billing_date", { ascending: true });
        if (!cancelled && data) setSubs(data);
      } catch (e) {
        console.error("RemindersContent load error:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const sorted = [...subs].sort((a, b) => daysUntil(a.next_billing_date) - daysUntil(b.next_billing_date));
  const active = sorted.filter(s => daysUntil(s.next_billing_date) <= 30);
  const upcoming = sorted.filter(s => { const d = daysUntil(s.next_billing_date); return d > 30; });
  const displayed = tab === "active" ? active : tab === "upcoming" ? upcoming : sorted;
  const totalDue = active.reduce((sum, s) => sum + s.price, 0);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-7 h-7 animate-spin text-blue-400" /></div>;
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto lg:max-w-none">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Reminders</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {subs.length === 0 ? "Add subscriptions to see reminders"
            : active.length === 0 ? "Nothing due in the next 30 days"
            : `${active.length} due in 30 days · ${fmt(Math.round(totalDue))} total`}
        </p>
      </div>

      {subs.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-5 shadow-sm">
            <Bell className="w-7 h-7 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No reminders yet</h3>
          <p className="text-sm text-gray-500 mb-7 max-w-xs leading-relaxed">Add subscriptions and bills to get reminded before they charge.</p>
          <a href="/dashboard/subscriptions"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-6 min-h-[48px] rounded-xl shadow-lg shadow-blue-200 transition-all"
          >
            <Plus className="w-4 h-4" /> Add subscription
          </a>
        </div>
      )}

      {subs.length > 0 && (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5">
          <div className="order-1 lg:col-span-2 space-y-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {([{ key: "active" as const, label: `Due soon (${active.length})` },
                { key: "upcoming" as const, label: `Upcoming (${upcoming.length})` },
                { key: "all" as const, label: `All (${sorted.length})` },
              ]).map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={cn("flex-shrink-0 px-4 min-h-[40px] rounded-full text-sm font-semibold transition-colors flex items-center",
                    tab === t.key ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >{t.label}</button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4">
                {displayed.length === 0 ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-9 h-9 mx-auto mb-2 text-green-400" />
                    <p className="text-sm font-medium text-gray-700">{tab === "active" ? "Nothing due in the next 30 days!" : "Nothing here"}</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">{displayed.map(s => <ReminderRow key={s.id} s={s} fmt={fmt} />)}</div>
                )}
              </div>
            </div>
          </div>

          <div className="order-2 space-y-4">
            {active.length > 0 && (
              <div className="bg-gray-900 rounded-2xl p-5">
                <p className="text-xs text-gray-400 mb-1">Due this month</p>
                <p className="text-2xl font-bold text-white">{fmt(Math.round(totalDue))}</p>
                <p className="text-xs text-gray-400 mt-1">{active.length} payments</p>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm font-semibold text-gray-900 mb-4">Reminder schedule</p>
              <div className="space-y-3">
                {["30 days before", "15 days before", "7 days before", "3 days before", "1 day before"].map(d => (
                  <div key={d} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{d}</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            <a href="/dashboard/subscriptions"
              className="flex items-center justify-between w-full p-4 min-h-[52px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-blue-50 active:bg-blue-50 transition-colors group"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Manage subscriptions</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

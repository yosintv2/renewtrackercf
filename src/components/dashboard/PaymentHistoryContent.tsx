import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import {
  Clock, CheckCircle2, Loader2, SearchX, RefreshCw, Tv, Home, Cpu,
  Dumbbell, CreditCard, MoreHorizontal, ArrowLeft, ArrowRight, TrendingUp,
  BarChart3, Calendar, DollarSign, Wallet,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type PaymentRecord = {
  id: string; name: string; category: string;
  amount_paid: number; paid_date: string;
  billing_cycle: string; next_billing_date_after: string;
};

const ITEMS_PER_PAGE = 20;

const CATEGORY_LABELS: Record<string, string> = {
  entertainment: "Entertainment", living: "Living Essentials", tech: "Tech & Tools",
  lifestyle: "Lifestyle", financial: "Financial", other: "Other",
};

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  entertainment: { icon: Tv, color: "text-purple-600", bg: "bg-purple-100" },
  living: { icon: Home, color: "text-green-600", bg: "bg-green-100" },
  tech: { icon: Cpu, color: "text-blue-600", bg: "bg-blue-100" },
  lifestyle: { icon: Dumbbell, color: "text-orange-600", bg: "bg-orange-100" },
  financial: { icon: CreditCard, color: "text-red-600", bg: "bg-red-100" },
  other: { icon: MoreHorizontal, color: "text-gray-500", bg: "bg-gray-100" },
};

const CATEGORY_COLORS: Record<string, string> = {
  entertainment: "#9333ea",
  living: "#16a34a",
  tech: "#2563eb",
  lifestyle: "#ea580c",
  financial: "#dc2626",
  other: "#6b7280",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function formatMonth(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", year: "2-digit" });
}

function toISODate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function inPeriod(paidDate: string, period: string): boolean {
  const d = new Date(paidDate);
  const now = new Date();
  switch (period) {
    case "month": return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    case "lastmonth": {
      const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return d.getMonth() === last.getMonth() && d.getFullYear() === last.getFullYear();
    }
    case "3months": return d >= new Date(now.getFullYear(), now.getMonth() - 3, 1);
    case "year": return d.getFullYear() === now.getFullYear();
    default: return true;
  }
}

const PERIODS = [
  { value: "all", label: "All" },
  { value: "month", label: "This month" },
  { value: "lastmonth", label: "Last month" },
  { value: "3months", label: "3 months" },
  { value: "year", label: "This year" },
];

const TYPE_FILTERS = [
  { value: "all" as const, label: "All" },
  { value: "recurring" as const, label: "Recurring" },
  { value: "once" as const, label: "One-time" },
];

const CHART_TABS = [
  { value: "trend" as const, label: "Trend", icon: TrendingUp },
  { value: "category" as const, label: "By Category", icon: BarChart3 },
];

function CustomTooltip({ active, payload, label, fmt }: { active?: boolean; payload?: { value: number }[]; label?: string; fmt: (n: number) => string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg px-4 py-3 text-sm">
      <p className="text-gray-500 font-medium mb-1">{label}</p>
      <p className="font-bold text-gray-900">{fmt(Math.round(payload[0].value))}</p>
    </div>
  );
}

function CategoryTooltip({ active, payload, label, fmt }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string; fmt: (n: number) => string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg px-4 py-3 text-sm">
      <p className="text-gray-500 font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="font-bold text-gray-900">{fmt(Math.round(entry.value))}</p>
      ))}
    </div>
  );
}

export default function PaymentHistoryContent() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [catFilter, setCatFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "once" | "recurring">("all");
  const [chartTab, setChartTab] = useState<"trend" | "category">("trend");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const { fmt } = useCurrency();

  async function fetchHistory() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase.from("payment_history")
        .select("id, name, category, amount_paid, paid_date, billing_cycle, next_billing_date_after")
        .order("paid_date", { ascending: false });
      if (data) setPayments(data);
    } catch (e) {
      console.error("PaymentHistory fetch error:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchHistory(); }, []);

  const activeCategories = useMemo(() => {
    const cats = new Set(payments.map(p => p.category));
    return [
      { value: "all", label: `All (${payments.length})` },
      ...Array.from(cats).sort().map(c => ({ value: c, label: CATEGORY_LABELS[c] ?? c })),
    ];
  }, [payments]);

  const filtered = useMemo(() => {
    let result = payments;
    if (catFilter !== "all") result = result.filter(p => p.category === catFilter);
    if (periodFilter !== "all") result = result.filter(p => inPeriod(p.paid_date, periodFilter));
    if (customStart && customEnd) {
      result = result.filter(p => p.paid_date >= customStart && p.paid_date <= customEnd);
    }
    if (typeFilter === "once") result = result.filter(p => p.billing_cycle === "once");
    if (typeFilter === "recurring") result = result.filter(p => p.billing_cycle !== "once");
    return result;
  }, [payments, catFilter, periodFilter, customStart, customEnd, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPaid = filtered.reduce((s, p) => s + p.amount_paid, 0);
  const thisMonthTotal = payments.filter(p => inPeriod(p.paid_date, "month")).reduce((s, p) => s + p.amount_paid, 0);

  useEffect(() => { setPage(0); }, [catFilter, periodFilter, typeFilter, customStart, customEnd]);

  function clearFilters() {
    setCatFilter("all"); setPeriodFilter("all"); setTypeFilter("all");
    setCustomStart(""); setCustomEnd(""); setShowCustom(false);
  }

  const hasFilters = catFilter !== "all" || periodFilter !== "all" || typeFilter !== "all" || !!customStart || !!customEnd;

  function handlePeriodClick(value: string) {
    setPeriodFilter(value);
    if (value !== "custom") setShowCustom(false);
    if (value === "all") { setCustomStart(""); setCustomEnd(""); }
  }

  const trendData = useMemo(() => {
    const map = new Map<string, number>();
    const list = customStart && customEnd ? filtered : payments;
    for (const p of list) {
      const monthKey = p.paid_date.slice(0, 7);
      map.set(monthKey, (map.get(monthKey) ?? 0) + p.amount_paid);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total: Math.round(total) }));
  }, [payments, filtered, customStart, customEnd]);

  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of filtered) {
      map.set(p.category, (map.get(p.category) ?? 0) + p.amount_paid);
    }
    const order = ["entertainment", "living", "tech", "lifestyle", "financial", "other"];
    return order
      .filter(c => map.has(c))
      .map(c => ({
        category: CATEGORY_LABELS[c] ?? c,
        total: Math.round(map.get(c) ?? 0),
        fill: CATEGORY_COLORS[c] ?? "#6b7280",
      }));
  }, [filtered]);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Payment History</h1>
          {!loading && (
            <p className="text-gray-500 text-sm mt-0.5">
              {filtered.length} of {payments.length} payment{payments.length !== 1 ? "s" : ""} · {fmt(Math.round(totalPaid))}
            </p>
          )}
        </div>
        <button onClick={() => { setPage(0); fetchHistory(); }}
          className="min-h-[44px] px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 active:bg-gray-100 flex items-center gap-1.5 transition-colors flex-shrink-0"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} /> Refresh
        </button>
      </div>

      {loading && payments.length === 0 && (
        <div className="flex items-center justify-center py-24"><Loader2 className="w-7 h-7 animate-spin text-blue-400" /></div>
      )}

      {!loading && payments.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-5 shadow-sm">
            <Clock className="w-7 h-7 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No payment history yet</h3>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Payments recorded when you mark a subscription or bill as paid. Start tracking by marking an item as paid.
          </p>
        </div>
      )}

      {!loading && payments.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium">Total paid</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{fmt(Math.round(totalPaid))}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium">This month</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{fmt(Math.round(thisMonthTotal))}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium">Payments</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{filtered.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium">Avg per payment</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{filtered.length > 0 ? fmt(Math.round(totalPaid / filtered.length)) : fmt(0)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Spending Trend</h3>
                <div className="flex gap-1">
                  {CHART_TABS.map(t => (
                    <button key={t.value} onClick={() => setChartTab(t.value)}
                      className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1",
                        chartTab === t.value ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >
                      <t.icon className="w-3.5 h-3.5" /> {t.label}
                    </button>
                  ))}
                </div>
              </div>
              {chartTab === "trend" ? (
                trendData.length === 0 ? (
                  <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data for this period</div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={formatMonth} interval="preserveStartEnd" />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => fmt(v)} />
                      <Tooltip content={<CustomTooltip fmt={fmt} />} />
                      <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} fill="url(#trendGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )
              ) : (
                categoryData.length === 0 ? (
                  <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data for this period</div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={categoryData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="category" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => fmt(v)} />
                      <Tooltip content={<CategoryTooltip fmt={fmt} />} />
                      <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={40}>
                        {categoryData.map((entry, i) => (
                          <rect key={i} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Category Breakdown</h3>
              {categoryData.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data for this period</div>
              ) : (
                <div className="space-y-3">
                  {categoryData.map(c => {
                    const pct = totalPaid > 0 ? (c.total / totalPaid) * 100 : 0;
                    return (
                      <div key={c.category}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{c.category}</span>
                          <span className="font-bold text-gray-900">{fmt(c.total)}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: c.fill }} />
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{pct.toFixed(1)}% of total</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-50 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 min-w-max">
                <span className={cn("px-3 py-1.5 rounded-lg transition-colors cursor-pointer", catFilter === "all" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900")} onClick={() => setCatFilter("all")}>
                  All ({payments.length})
                </span>
                {activeCategories.filter(c => c.value !== "all").map(cat => (
                  <span key={cat.value} className={cn("px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap", catFilter === cat.value ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900")} onClick={() => setCatFilter(cat.value)}>
                    {cat.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-5 py-3 border-b border-gray-50">
              <div className="flex flex-wrap items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <div className="flex gap-1 flex-wrap">
                  {PERIODS.map(p => (
                    <button key={p.value} onClick={() => handlePeriodClick(p.value)}
                      className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                        periodFilter === p.value && !showCustom ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >{p.label}</button>
                  ))}
                  <button onClick={() => { setShowCustom(!showCustom); setPeriodFilter("all"); }}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      showCustom ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Calendar className="w-3 h-3 inline mr-1" />Custom
                  </button>
                </div>
              </div>
              {showCustom && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                  <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)}
                    className="h-9 px-3 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)}
                    className="h-9 px-3 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                  {(customStart || customEnd) && (
                    <button onClick={() => { setCustomStart(""); setCustomEnd(""); }}
                      className="text-xs font-medium text-blue-600 hover:underline ml-1"
                    >Clear</button>
                  )}
                </div>
              )}
            </div>
            <div className="px-5 py-3 flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium text-gray-400">Type</span>
              <div className="flex gap-1">
                {TYPE_FILTERS.map(t => (
                  <button key={t.value} onClick={() => setTypeFilter(t.value)}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      typeFilter === t.value ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >{t.label}</button>
                ))}
              </div>
              {hasFilters && (
                <button onClick={clearFilters} className="ml-auto text-xs font-medium text-blue-600 hover:underline">Clear</button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <SearchX className="w-10 h-10 mx-auto mb-3" />
              <p className="text-sm font-medium">No payments match</p>
              <button onClick={clearFilters} className="mt-3 text-xs font-semibold text-blue-600 hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="space-y-2">
              {paged.map(p => {
                const meta = CATEGORY_META[p.category] ?? CATEGORY_META.other;
                const Icon = meta.icon;
                return (
                  <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", meta.bg)}>
                      <Icon className={cn("w-4.5 h-4.5", meta.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{p.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDate(p.paid_date)} · {p.billing_cycle === "once" ? "One-time" : p.billing_cycle}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900 text-sm">{fmt(p.amount_paid)}</p>
                      <span className="text-[11px] text-green-600 flex items-center gap-1 justify-end mt-0.5"><CheckCircle2 className="w-3 h-3" />Paid</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-gray-400">
                Page {page + 1} of {totalPages} · {filtered.length} total
              </p>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                  className="min-h-[44px] px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                  className="min-h-[44px] px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

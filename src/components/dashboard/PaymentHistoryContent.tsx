import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { ServiceIcon } from "@/lib/service-icons";
import {
  Clock, CheckCircle2, Loader2, SearchX, RefreshCw, Tv, Home, Cpu,
  Dumbbell, CreditCard, MoreHorizontal, ArrowLeft, ArrowRight, TrendingUp,
  BarChart3, Calendar, DollarSign, Wallet, TrendingDown, Minus, Search,
  Sparkles, Zap, Target, PiggyBank, X,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell,
} from "recharts";

type PaymentRecord = {
  id: string; name: string; category: string;
  amount_paid: number; paid_date: string;
  billing_cycle: string; next_billing_date_after: string;
};

const ITEMS_PER_PAGE = 15;

const CATEGORY_LABELS: Record<string, string> = {
  entertainment: "Entertainment", living: "Living Essentials", tech: "Tech & Tools",
  lifestyle: "Lifestyle", financial: "Financial", other: "Other",
};

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string; bg: string; bar: string }> = {
  entertainment: { icon: Tv, color: "text-purple-600", bg: "bg-purple-100", bar: "#9333ea" },
  living: { icon: Home, color: "text-green-600", bg: "bg-green-100", bar: "#16a34a" },
  tech: { icon: Cpu, color: "text-blue-600", bg: "bg-blue-100", bar: "#2563eb" },
  lifestyle: { icon: Dumbbell, color: "text-orange-600", bg: "bg-orange-100", bar: "#ea580c" },
  financial: { icon: CreditCard, color: "text-red-600", bg: "bg-red-100", bar: "#dc2626" },
  other: { icon: MoreHorizontal, color: "text-gray-500", bg: "bg-gray-100", bar: "#6b7280" },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function formatMonth(dateStr: string): string {
  const d = new Date(dateStr + "-01");
  return d.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
}

function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
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

function getMonthTotal(payments: PaymentRecord[], yearOffset: number, monthOffset: number): number {
  const d = new Date();
  const target = new Date(d.getFullYear() + yearOffset, d.getMonth() + monthOffset, 1);
  return payments
    .filter(p => {
      const pd = new Date(p.paid_date);
      return pd.getMonth() === target.getMonth() && pd.getFullYear() === target.getFullYear();
    })
    .reduce((s, p) => s + p.amount_paid, 0);
}

const PERIOD_OPTIONS = [
  { value: "all", label: "All time" },
  { value: "year", label: "This year" },
  { value: "3months", label: "3 months" },
  { value: "month", label: "This month" },
  { value: "lastmonth", label: "Last month" },
];

function CustomTooltip({ active, payload, label, fmt }: { active?: boolean; payload?: { value: number }[]; label?: string; fmt: (n: number) => string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg px-4 py-3 text-sm">
      <p className="text-gray-500 font-medium mb-1">{label}</p>
      <p className="font-bold text-gray-900 text-lg">{fmt(Math.round(payload[0].value))}</p>
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
  const [searchQuery, setSearchQuery] = useState("");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [chartFilter, setChartFilter] = useState<string | null>(null);
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
      { value: "all", label: "All" },
      ...Array.from(cats).sort().map(c => ({ value: c, label: CATEGORY_LABELS[c] ?? c })),
    ];
  }, [payments]);

  const filtered = useMemo(() => {
    let result = payments;
    if (catFilter !== "all") result = result.filter(p => p.category === catFilter);
    if (chartFilter) result = result.filter(p => p.category === chartFilter);
    if (periodFilter !== "all") result = result.filter(p => inPeriod(p.paid_date, periodFilter));
    if (customStart && customEnd) {
      result = result.filter(p => p.paid_date >= customStart && p.paid_date <= customEnd);
    }
    if (typeFilter === "once") result = result.filter(p => p.billing_cycle === "once");
    if (typeFilter === "recurring") result = result.filter(p => p.billing_cycle !== "once");
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    return result;
  }, [payments, catFilter, chartFilter, periodFilter, customStart, customEnd, typeFilter, searchQuery]);

  const thisMonth = getMonthTotal(payments, 0, 0);
  const lastMonth = getMonthTotal(payments, 0, -1);
  const monthDiff = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPaid = filtered.reduce((s, p) => s + p.amount_paid, 0);

  useEffect(() => { setPage(0); }, [catFilter, chartFilter, periodFilter, typeFilter, customStart, customEnd, searchQuery]);

  function clearFilters() {
    setCatFilter("all"); setPeriodFilter("all"); setTypeFilter("all");
    setCustomStart(""); setCustomEnd(""); setShowCustom(false);
    setSearchQuery(""); setChartFilter(null);
  }

  const hasFilters = catFilter !== "all" || periodFilter !== "all" || typeFilter !== "all" || !!customStart || !!customEnd || !!searchQuery || !!chartFilter;

  function handlePeriodClick(value: string) {
    setPeriodFilter(value);
    if (value !== "custom") setShowCustom(false);
    if (value === "all") { setCustomStart(""); setCustomEnd(""); }
  }

  const paymentsForChart = useMemo(() => {
    return customStart && customEnd ? filtered : payments;
  }, [payments, filtered, customStart, customEnd]);

  const trendData = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of paymentsForChart) {
      const mk = monthKey(p.paid_date);
      map.set(mk, (map.get(mk) ?? 0) + p.amount_paid);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total: Math.round(total) }));
  }, [paymentsForChart]);

  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of filtered) {
      map.set(p.category, (map.get(p.category) ?? 0) + p.amount_paid);
    }
    const order = ["entertainment", "living", "tech", "lifestyle", "financial", "other"];
    return order
      .filter(c => map.has(c))
      .map(c => ({
        category: c,
        label: CATEGORY_LABELS[c] ?? c,
        total: Math.round(map.get(c) ?? 0),
        fill: CATEGORY_META[c]?.bar ?? "#6b7280",
        icon: CATEGORY_META[c]?.icon ?? MoreHorizontal,
      }));
  }, [filtered]);

  const biggestPayment = useMemo(() => {
    if (filtered.length === 0) return null;
    return filtered.reduce((max, p) => p.amount_paid > max.amount_paid ? p : max, filtered[0]);
  }, [filtered]);

  const avgPayment = useMemo(() => {
    if (filtered.length === 0) return 0;
    return totalPaid / filtered.length;
  }, [filtered, totalPaid]);

  const monthlyGroups = useMemo(() => {
    const groups = new Map<string, PaymentRecord[]>();
    for (const p of filtered) {
      const mk = monthKey(p.paid_date);
      if (!groups.has(mk)) groups.set(mk, []);
      groups.get(mk)!.push(p);
    }
    return Array.from(groups.entries())
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([month, items]) => ({
        month,
        label: formatMonth(month),
        items,
        subtotal: Math.round(items.reduce((s, i) => s + i.amount_paid, 0)),
      }));
  }, [filtered]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payment History</h1>
          <p className="text-gray-500 text-sm mt-0.5">Every payment you've recorded, at a glance</p>
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
            Payments appear here when you mark a subscription or bill as paid. Head to your subscriptions or bills to get started.
          </p>
          <div className="flex gap-2 mt-6">
            <a href="/dashboard/subscriptions" className="min-h-[44px] px-5 rounded-xl bg-blue-600 text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-blue-700 transition-colors">
              View Subscriptions
            </a>
            <a href="/dashboard/bills" className="min-h-[44px] px-5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
              View Bills
            </a>
          </div>
        </div>
      )}

      {!loading && payments.length > 0 && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                </div>
                {periodFilter !== "all" && monthDiff !== 0 && (
                  <span className={cn("text-xs font-semibold flex items-center gap-0.5", monthDiff > 0 ? "text-red-500" : "text-green-500")}>
                    {monthDiff > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(monthDiff).toFixed(0)}%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-medium">Total paid {periodFilter !== "all" ? "(filtered)" : ""}</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{fmt(Math.round(totalPaid))}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-green-600" />
                </div>
                <span className={cn("text-xs font-semibold flex items-center gap-0.5", monthDiff > 0 ? "text-red-500" : monthDiff < 0 ? "text-green-500" : "text-gray-400")}>
                  {monthDiff > 0 ? <TrendingUp className="w-3 h-3" /> : monthDiff < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  {monthDiff === 0 ? "vs last" : `${Math.abs(monthDiff).toFixed(0)}%`}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">This month</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{fmt(Math.round(thisMonth))}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium">Payments recorded</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{filtered.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Target className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium">Average payment</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{filtered.length > 0 ? fmt(Math.round(avgPayment)) : fmt(0)}</p>
            </div>
          </div>

          {biggestPayment && periodFilter === "month" && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  Biggest payment this month: <ServiceIcon name={biggestPayment.name} size={16} className="inline mr-1 -mt-0.5" /> <span className="text-blue-600">{biggestPayment.name}</span> — {fmt(Math.round(biggestPayment.amount_paid))}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {filtered.length} payment{filtered.length !== 1 ? "s" : ""} this month · Avg {fmt(Math.round(avgPayment))} each
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Spending trend</h3>
                {trendData.length > 1 && (
                  <span className="text-xs text-gray-400">
                    {trendData.length} month{trendData.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              {trendData.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data for this period</div>
              ) : (
                <div className="outline-none [&_*]:outline-none" tabIndex={-1}>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => {
                      const d = new Date(v + "-01");
                      return d.toLocaleDateString(undefined, { month: "short" });
                    }} interval="preserveStartEnd" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => fmt(v)} axisLine={false} tickLine={false} width={50} />
                    <Tooltip content={<CustomTooltip fmt={fmt} />} />
                    <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2.5} fill="url(#tg)" dot={{ fill: "#2563eb", r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">By category</h3>
              {categoryData.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data</div>
              ) : (
                <div className="space-y-3">
                  {categoryData.map(c => {
                    const pct = totalPaid > 0 ? (c.total / totalPaid) * 100 : 0;
                    const Icon = c.icon;
                    const selected = chartFilter === c.category;
                    return (
                      <button key={c.category} onClick={() => setChartFilter(chartFilter === c.category ? null : c.category)}
                        className={cn("w-full text-left p-2.5 rounded-xl transition-all", selected ? "bg-blue-50 ring-2 ring-blue-200" : "hover:bg-gray-50")}
                      >
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", CATEGORY_META[c.category]?.bg)}>
                            <Icon className={cn("w-3.5 h-3.5", CATEGORY_META[c.category]?.color)} />
                          </div>
                          <span className={cn("text-sm font-medium flex-1", selected ? "text-blue-700" : "text-gray-700")}>{c.label}</span>
                          <span className="text-sm font-bold text-gray-900">{fmt(c.total)}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: c.fill }} />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">{pct.toFixed(1)}% of total</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {hasFilters && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-gray-400 font-medium mr-1">Active filters:</span>
              {catFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {CATEGORY_LABELS[catFilter] ?? catFilter}
                  <button onClick={() => setCatFilter("all")} className="hover:text-blue-900 ml-0.5"><X className="w-3 h-3" /></button>
                </span>
              )}
              {chartFilter && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Chart: {CATEGORY_LABELS[chartFilter] ?? chartFilter}
                  <button onClick={() => setChartFilter(null)} className="hover:text-blue-900 ml-0.5"><X className="w-3 h-3" /></button>
                </span>
              )}
              {periodFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                  {PERIOD_OPTIONS.find(p => p.value === periodFilter)?.label ?? periodFilter}
                  <button onClick={() => setPeriodFilter("all")} className="hover:text-gray-900 ml-0.5"><X className="w-3 h-3" /></button>
                </span>
              )}
              {(customStart || customEnd) && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                  {customStart || "…"} — {customEnd || "…"}
                  <button onClick={() => { setCustomStart(""); setCustomEnd(""); }} className="hover:text-gray-900 ml-0.5"><X className="w-3 h-3" /></button>
                </span>
              )}
              {typeFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                  {typeFilter === "recurring" ? "Recurring" : "One-time"}
                  <button onClick={() => setTypeFilter("all")} className="hover:text-gray-900 ml-0.5"><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-gray-900 ml-0.5"><X className="w-3 h-3" /></button>
                </span>
              )}
              <button onClick={clearFilters} className="text-xs font-medium text-blue-600 hover:underline ml-1">Clear all</button>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input type="text" placeholder="Search payments..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-gray-50 border-0 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-colors"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-0.5">
                  {[
                    { value: "all" as const, label: "All" },
                    { value: "recurring" as const, label: "Recurring" },
                    { value: "once" as const, label: "One-time" },
                  ].map(t => (
                    <button key={t.value} onClick={() => setTypeFilter(t.value)}
                      className={cn("px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
                        typeFilter === t.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      )}
                    >{t.label}</button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {activeCategories.map(cat => {
                  const isActive = catFilter === cat.value || (cat.value !== "all" && chartFilter === cat.value);
                  const meta = cat.value !== "all" ? CATEGORY_META[cat.value] : null;
                  const Icon = meta?.icon;
                  const count = cat.value === "all" ? payments.length : payments.filter(p => p.category === cat.value).length;
                  return (
                    <button key={cat.value} onClick={() => { setCatFilter(cat.value); setChartFilter(null); }}
                      className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                        isActive
                          ? "bg-gray-900 text-white shadow-sm"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      )}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {cat.label}
                      <span className={cn("text-[10px] font-bold ml-0.5", isActive ? "text-white/60" : "text-gray-400")}>{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {PERIOD_OPTIONS.map(p => (
                  <button key={p.value} onClick={() => handlePeriodClick(p.value)}
                    className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                      periodFilter === p.value && !showCustom ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    )}
                  >{p.label}</button>
                ))}
                <button onClick={() => { setShowCustom(!showCustom); setPeriodFilter("all"); }}
                  className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1",
                    showCustom ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  )}
                >
                  <Calendar className="w-3 h-3" />Custom
                </button>
              </div>

              {showCustom && (
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)}
                      className="h-9 pl-9 pr-3 bg-gray-50 border-0 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-colors"
                    />
                  </div>
                  <span className="text-xs text-gray-400">—</span>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)}
                      className="h-9 pl-9 pr-3 bg-gray-50 border-0 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-colors"
                    />
                  </div>
                  {(customStart || customEnd) && (
                    <button onClick={() => { setCustomStart(""); setCustomEnd(""); }}
                      className="text-xs font-medium text-blue-600 hover:underline"
                    >Clear</button>
                  )}
                </div>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <SearchX className="w-10 h-10 mx-auto mb-3" />
              <p className="text-sm font-medium">No payments match your filters</p>
              <button onClick={clearFilters} className="mt-3 text-xs font-semibold text-blue-600 hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="space-y-4">
              {monthlyGroups.slice(page * 1, (page + 1) * 1).map(group => (
                <div key={group.month}>
                  <div className="flex items-center justify-between mb-2 px-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{group.label}</h3>
                    <span className="text-xs font-semibold text-gray-500">{fmt(group.subtotal)}</span>
                  </div>
                  <div className="space-y-1.5">
                    {group.items.map(p => {
                      const meta = CATEGORY_META[p.category] ?? CATEGORY_META.other;
                      const Icon = meta.icon;
                      return (
                          <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 flex items-center gap-3 hover:shadow-md hover:border-gray-200 transition-all">
                          <ServiceIcon name={p.name} size={28} />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm truncate">{p.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                              <span>{formatDate(p.paid_date)}</span>
                              <span className="w-1 h-1 rounded-full bg-gray-300" />
                              <span>{p.billing_cycle === "once" ? "One-time" : p.billing_cycle}</span>
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-gray-900 text-sm">{fmt(p.amount_paid)}</p>
                            <span className="text-[11px] text-green-600 flex items-center gap-1 justify-end mt-0.5">
                              <CheckCircle2 className="w-3 h-3" />Paid
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {monthlyGroups.length > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-gray-400">
                Page {page + 1} of {monthlyGroups.length} · {filtered.length} payment{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                  className="min-h-[44px] px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
                <button onClick={() => setPage(p => Math.min(monthlyGroups.length - 1, p + 1))} disabled={page >= monthlyGroups.length - 1}
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

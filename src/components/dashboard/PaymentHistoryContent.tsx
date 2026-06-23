import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { Clock, CheckCircle2, Loader2, SearchX, RefreshCw, Tv, Home, Cpu, Dumbbell, CreditCard, MoreHorizontal, ArrowLeft, ArrowRight } from "lucide-react";

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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
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

export default function PaymentHistoryContent() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [catFilter, setCatFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "once" | "recurring">("all");
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
    if (typeFilter === "once") result = result.filter(p => p.billing_cycle === "once");
    if (typeFilter === "recurring") result = result.filter(p => p.billing_cycle !== "once");
    return result;
  }, [payments, catFilter, periodFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPaid = filtered.reduce((s, p) => s + p.amount_paid, 0);
  const thisMonthTotal = payments.filter(p => inPeriod(p.paid_date, "month")).reduce((s, p) => s + p.amount_paid, 0);

  useEffect(() => { setPage(0); }, [catFilter, periodFilter, typeFilter]);

  function clearFilters() { setCatFilter("all"); setPeriodFilter("all"); setTypeFilter("all"); }

  const hasFilters = catFilter !== "all" || periodFilter !== "all" || typeFilter !== "all";

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
              <p className="text-xs text-gray-400 font-medium">Total paid</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{fmt(Math.round(totalPaid))}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 font-medium">This month</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{fmt(Math.round(thisMonthTotal))}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 font-medium">Payments</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{filtered.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 font-medium">Avg per payment</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{filtered.length > 0 ? fmt(Math.round(totalPaid / filtered.length)) : fmt(0)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-50">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                <span className={cn("px-3 py-1.5 rounded-lg transition-colors cursor-pointer", catFilter === "all" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900")} onClick={() => setCatFilter("all")}>
                  All ({payments.length})
                </span>
                {activeCategories.filter(c => c.value !== "all").map(cat => (
                  <span key={cat.value} className={cn("px-3 py-1.5 rounded-lg transition-colors cursor-pointer", catFilter === cat.value ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900")} onClick={() => setCatFilter(cat.value)}>
                    {cat.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-5 py-3 border-b border-gray-50 flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium text-gray-400 w-10">Period</span>
              <div className="flex gap-1">
                {PERIODS.map(p => (
                  <button key={p.value} onClick={() => setPeriodFilter(p.value)}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      periodFilter === p.value ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >{p.label}</button>
                ))}
              </div>
            </div>
            <div className="px-5 py-3 flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium text-gray-400 w-10">Type</span>
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

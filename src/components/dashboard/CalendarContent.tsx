import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft, ChevronRight, CalendarDays, Plus, Loader2 } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { ServiceIcon } from "@/lib/service-icons";

type Subscription = {
  id: string; name: string; category: string; price: number;
  billing_cycle: string; next_billing_date: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  entertainment: "bg-purple-500",
  living: "bg-emerald-500",
  tech: "bg-blue-500",
  lifestyle: "bg-orange-500",
  financial: "bg-rose-500",
  other: "bg-gray-400",
};

const CATEGORY_LABELS: Record<string, string> = {
  entertainment: "Entertainment", living: "Living Essentials", tech: "Tech & Tools",
  lifestyle: "Lifestyle", financial: "Financial Liabilities", other: "Other",
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function daysUntil(dateStr: string): number {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr); target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function isToday(dateStr: string): boolean {
  return daysUntil(dateStr) === 0;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export default function CalendarContent() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { fmt } = useCurrency();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("subscriptions").select("*").order("next_billing_date", { ascending: true });
        if (!cancelled && data) setSubs(data);
      } catch (e) {
        console.error("CalendarContent load error:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const subsByDay = new Map<number, Subscription[]>();
  for (const s of subs) {
    const d = new Date(s.next_billing_date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!subsByDay.has(day)) subsByDay.set(day, []);
      subsByDay.get(day)!.push(s);
    }
  }

  const daysWithSubs = Array.from(subsByDay.keys()).sort((a, b) => a - b);
  const selectedSubs = selectedDay ? subsByDay.get(selectedDay) ?? [] : [];

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-7 h-7 animate-spin text-blue-400" /></div>;
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {subs.length === 0
              ? "Add subscriptions to see them on the calendar"
              : `${subs.length} subscriptions tracked`}
          </p>
        </div>
      </div>

      {subs.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-5 shadow-sm">
            <CalendarDays className="w-7 h-7 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No payments yet</h3>
          <p className="text-sm text-gray-500 mb-7 max-w-xs leading-relaxed">Add subscriptions and bills to see them on your calendar.</p>
          <a href="/dashboard/subscriptions"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-6 min-h-[48px] rounded-xl shadow-lg shadow-blue-200 transition-all"
          >
            <Plus className="w-4 h-4" /> Add subscription
          </a>
        </div>
      )}

      {subs.length > 0 && (
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-5">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-base font-bold text-gray-900">
                  {MONTH_NAMES[month]} {year}
                </h2>
                <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7">
                {DAY_NAMES.map((d) => (
                  <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-3 border-b border-gray-50">
                    {d}
                  </div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[90px] sm:min-h-[110px] border-b border-r border-gray-50 bg-gray-25" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const daySubs = subsByDay.get(day) ?? [];
                  const isSel = selectedDay === day;
                  const isTod = isCurrentMonth && day === today.getDate();
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(isSel ? null : day)}
                      className={cn(
                        "min-h-[90px] sm:min-h-[110px] border-b border-r border-gray-50 p-1.5 text-left transition-colors relative",
                        "hover:bg-blue-50/40",
                        isSel && "bg-blue-50 ring-2 ring-inset ring-blue-200",
                        isTod && "bg-blue-50/60"
                      )}
                    >
                      <span className={cn(
                        "inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full mb-0.5",
                        isTod && "bg-blue-600 text-white",
                        !isTod && "text-gray-700"
                      )}>
                        {day}
                      </span>
                      <div className="space-y-0.5">
                        {daySubs.slice(0, 3).map((s) => {
                          const overdue = daysUntil(s.next_billing_date) < 0;
                          return (
                            <div
                              key={s.id}
                              className={cn(
                                "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium truncate",
                                overdue
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-600"
                              )}
                              title={`${s.name} · ${fmt(s.price)}`}
                            >
                              <ServiceIcon name={s.name} size={14} className="mr-0.5" />
                              <span className="truncate">{s.name}</span>
                            </div>
                          );
                        })}
                        {daySubs.length > 3 && (
                          <span className="text-[10px] font-semibold text-gray-400 pl-1.5">+{daySubs.length - 3} more</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {selectedDay ? `${MONTH_NAMES[month]} ${selectedDay}` : "Payment days"}
              </h3>
              {daysWithSubs.length > 0 ? (
                selectedDay ? (
                  selectedSubs.length === 0 ? (
                    <p className="text-xs text-gray-400">No payments on this day.</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedSubs.map((s) => {
                        const overdue = daysUntil(s.next_billing_date) < 0;
                        return (
                          <div key={s.id} className={cn("flex items-center gap-2 p-2 rounded-lg", overdue ? "bg-red-50" : "bg-gray-50")}>
                            <ServiceIcon name={s.name} size={18} />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-gray-900 truncate">{s.name}</p>
                              <p className="text-[10px] text-gray-400">{CATEGORY_LABELS[s.category] ?? s.category}</p>
                            </div>
                            <p className={cn("text-xs font-bold flex-shrink-0", overdue ? "text-red-600" : "text-gray-700")}>
                              {fmt(s.price)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )
                ) : (
                  <div className="space-y-1.5">
                    {daysWithSubs.slice(0, 10).map((day) => {
                      const subsThisDay = subsByDay.get(day) ?? [];
                      const total = subsThisDay.reduce((sum, s) => sum + s.price, 0);
                      const overdue = subsThisDay.some(s => daysUntil(s.next_billing_date) < 0);
                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDay(day)}
                          className={cn(
                            "w-full p-2.5 rounded-xl transition-colors text-left",
                            overdue ? "bg-red-50 hover:bg-red-100" : "bg-gray-50 hover:bg-gray-100"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={cn("text-xs font-bold", overdue ? "text-red-700" : "text-gray-700")}>
                              {MONTH_NAMES[month]} {day}
                            </span>
                            <span className={cn("text-[10px] font-semibold", overdue ? "text-red-500" : "text-gray-400")}>
                              {subsThisDay.length} · {fmt(Math.round(total))}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {subsThisDay.slice(0, 4).map((s) => {
                              const overdueS = daysUntil(s.next_billing_date) < 0;
                              return (
                                <span key={s.id} className={cn(
                                  "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium",
                                  overdueS ? "bg-red-200/60 text-red-700" : "bg-white text-gray-600 border border-gray-200"
                                )}>
                                  <ServiceIcon name={s.name} size={12} />
                                  {s.name}
                                </span>
                              );
                            })}
                            {subsThisDay.length > 4 && (
                              <span className="text-[10px] text-gray-400 px-1">+{subsThisDay.length - 4}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                    {daysWithSubs.length > 10 && (
                      <p className="text-[10px] text-gray-400 text-center pt-1">+{daysWithSubs.length - 10} more days</p>
                    )}
                  </div>
                )
              ) : (
                <p className="text-xs text-gray-400 py-6 text-center">No payments this month.</p>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{MONTH_NAMES[month]} spending</h3>
              {(() => {
                const monthSubs = subs.filter((s) => {
                  const d = new Date(s.next_billing_date);
                  return d.getFullYear() === year && d.getMonth() === month;
                });
                if (monthSubs.length === 0) {
                  return <p className="text-xs text-gray-400 py-3 text-center">No spending this month.</p>;
                }
                const byCategory = new Map<string, { subs: Subscription[]; total: number }>();
                for (const s of monthSubs) {
                  const cat = s.category ?? "other";
                  if (!byCategory.has(cat)) byCategory.set(cat, { subs: [], total: 0 });
                  const entry = byCategory.get(cat)!;
                  entry.subs.push(s);
                  entry.total += s.price;
                }
                const sortedCats = Array.from(byCategory.entries()).sort((a, b) => b[1].total - a[1].total);
                return (
                  <div className="space-y-3">
                    {sortedCats.map(([cat, { subs: catSubs, total }]) => (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", CATEGORY_COLORS[cat] ?? "bg-gray-400")} />
                            <span className="text-xs font-semibold text-gray-700">{CATEGORY_LABELS[cat] ?? cat}</span>
                          </div>
                          <span className="text-xs font-bold text-gray-900">{fmt(Math.round(total))}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 ml-5">
                          {catSubs.map((s) => (
                            <span key={s.id} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-100 text-[10px] text-gray-600 font-medium">
                              <ServiceIcon name={s.name} size={12} />
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-100 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                        <span className="text-xs text-gray-600">Overdue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
                          <span className="text-white text-[9px] font-bold">1</span>
                        </span>
                        <span className="text-xs text-gray-600">Today</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <a href="/dashboard/subscriptions"
              className="flex items-center justify-between w-full p-4 min-h-[52px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-blue-50 active:bg-blue-50 transition-colors group"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Manage subscriptions</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

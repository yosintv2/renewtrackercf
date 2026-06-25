import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { ServiceIcon } from "@/lib/service-icons";
import { Plus, Edit2, Trash2, Loader2, AlertCircle, ArrowLeft, X, CheckCircle2, Clock, Tv, Home, Cpu, Dumbbell, CreditCard, MoreHorizontal, Receipt } from "lucide-react";

type CategoryKey = "entertainment" | "living" | "tech" | "lifestyle" | "financial" | "other";
type SectionKey = "subscriptions" | "bills";

const SUBSCRIPTION_CATS: CategoryKey[] = ["entertainment", "tech", "lifestyle"];
const BILL_CATS: CategoryKey[] = ["living", "financial", "other"];

const CATEGORIES: {
  value: CategoryKey; label: string; desc: string; icon: React.ElementType;
  iconBg: string; iconColor: string; borderAccent: string; badgeCls: string; presets: string[];
}[] = [
  { value: "entertainment", label: "Entertainment", desc: "Netflix, Spotify, Disney+", icon: Tv, iconBg: "bg-purple-100", iconColor: "text-purple-600", borderAccent: "border-l-purple-400", badgeCls: "bg-purple-100 text-purple-700", presets: ["Netflix","Amazon Prime","Disney+","YouTube Premium","Apple TV+","Crunchyroll","Hulu","HBO Max","Plex","MUBI","Spotify","Apple Music","YouTube Music","Tidal","Deezer"] },
  { value: "living", label: "Living Essentials", desc: "Rent, Electricity, Water", icon: Home, iconBg: "bg-green-100", iconColor: "text-green-600", borderAccent: "border-l-green-400", badgeCls: "bg-green-100 text-green-700", presets: ["Rent","Electricity","Water Bill","Gas","Internet / WiFi","Phone Bill","Home Insurance","Parking","Trash / Waste","Cleaning Service"] },
  { value: "tech", label: "Tech & Tools", desc: "iCloud, ChatGPT, Notion", icon: Cpu, iconBg: "bg-blue-100", iconColor: "text-blue-600", borderAccent: "border-l-blue-400", badgeCls: "bg-blue-100 text-blue-700", presets: ["iCloud+","Google One","ChatGPT Plus","Notion","Adobe CC","Microsoft 365","Canva Pro","Figma","GitHub Pro","Dropbox","OneDrive","Linear","Vercel"] },
  { value: "lifestyle", label: "Lifestyle", desc: "Gym, Gaming, Wellness", icon: Dumbbell, iconBg: "bg-orange-100", iconColor: "text-orange-600", borderAccent: "border-l-orange-400", badgeCls: "bg-orange-100 text-orange-700", presets: ["Gym Membership","Yoga / Fitness App","Fashion Box","Meal Kit","Book Club","Magazine","Xbox Game Pass","PlayStation Plus","Nintendo Online","Duolingo Plus","Meditation App"] },
  { value: "financial", label: "Financial", desc: "Credit Cards, BNPL, Loans", icon: CreditCard, iconBg: "bg-red-100", iconColor: "text-red-600", borderAccent: "border-l-red-400", badgeCls: "bg-red-100 text-red-700", presets: ["Credit Card Bill","BNPL / Pay Later","Loan EMI","Insurance Premium","Phone / Device EMI","Car Loan EMI","Mortgage","Student Loan"] },
  { value: "other", label: "Other", desc: "Anything else", icon: MoreHorizontal, iconBg: "bg-gray-100", iconColor: "text-gray-500", borderAccent: "border-l-gray-300", badgeCls: "bg-gray-100 text-gray-600", presets: [] },
];

function getCat(value: string) {
  return CATEGORIES.find(c => c.value === value) ?? CATEGORIES[CATEGORIES.length - 1];
}

type Subscription = {
  id: string; user_id: string; name: string; category: string;
  price: number; billing_cycle: string; next_billing_date: string;
  notes: string | null; created_at: string;
};

type FormData = {
  name: string; category: string; price: string;
  billing_cycle: string; next_billing_date: string; notes: string;
};

const EMPTY_FORM: FormData = { name: "", category: "", price: "", billing_cycle: "monthly", next_billing_date: "", notes: "" };

function daysUntil(dateStr: string): number {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr); target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function advanceDate(from: string, cycle: string): string {
  if (cycle === "once") return from;
  const d = new Date(from);
  if (cycle === "monthly") d.setMonth(d.getMonth() + 1);
  else if (cycle === "yearly") d.setFullYear(d.getFullYear() + 1);
  else if (cycle === "weekly") d.setDate(d.getDate() + 7);
  else if (cycle === "quarterly") d.setMonth(d.getMonth() + 3);
  return d.toISOString().split("T")[0];
}

function monthlyEquiv(price: number, cycle: string) {
  if (cycle === "once") return 0;
  if (cycle === "yearly") return price / 12;
  if (cycle === "weekly") return price * 4.33;
  if (cycle === "quarterly") return price / 3;
  return price;
}

function DaysTag({ days }: { days: number }) {
  const base = "inline-block text-xs font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap";
  if (days < 0) return <span className={cn(base, "bg-red-100 text-red-700")}>Overdue {Math.abs(days)} days</span>;
  if (days === 0) return <span className={cn(base, "bg-red-100 text-red-700")}>Due today</span>;
  if (days === 1) return <span className={cn(base, "bg-red-100 text-red-700")}>1 day left</span>;
  if (days <= 3) return <span className={cn(base, "bg-red-100 text-red-700")}>{days} days left</span>;
  if (days <= 7) return <span className={cn(base, "bg-orange-100 text-orange-700")}>{days} days left</span>;
  if (days <= 30) return <span className={cn(base, "bg-yellow-100 text-yellow-700")}>{days} days left</span>;
  return <span className={cn(base, "bg-green-100 text-green-700")}>{days} days left</span>;
}

function AddDialog({ open, onOpenChange, editItem, onSaved, mode }: {
  open: boolean; onOpenChange: (v: boolean) => void;
  editItem: Subscription | null; onSaved: () => void; mode: SectionKey;
}) {
  const [step, setStep] = useState<number>(editItem ? 3 : 1);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { symbol } = useCurrency();

  const isSubscription = mode === "subscriptions";
  const sectionLabel = isSubscription ? "subscription" : "bill";
  const availableCats = editItem ? CATEGORIES : CATEGORIES.filter(c => isSubscription ? SUBSCRIPTION_CATS.includes(c.value) : BILL_CATS.includes(c.value));

  useEffect(() => {
    if (!open) return;
    if (editItem) {
      setStep(3);
      setFormData({ name: editItem.name, category: editItem.category, price: String(editItem.price), billing_cycle: editItem.billing_cycle, next_billing_date: editItem.next_billing_date, notes: editItem.notes ?? "" });
    } else {
      setStep(1);
      setFormData(EMPTY_FORM);
    }
    setError("");
  }, [open, editItem]);

  function selectCategory(cat: CategoryKey) { setFormData(p => ({ ...p, category: cat, name: "" })); setStep(2); }
  function selectPreset(name: string) { setFormData(p => ({ ...p, name })); setStep(3); }
  function goBack() { if (step === 2) setStep(1); if (step === 3 && !editItem) setStep(2); }
  function set(field: keyof FormData, value: string) { setFormData(p => ({ ...p, [field]: value })); }

  async function handleSave(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price || !formData.next_billing_date) {
      setError("Name, category, price, and billing date are required."); return;
    }
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) { setError("Enter a valid price."); return; }
    setSaving(true); setError("");
    const payload = { name: formData.name.trim(), category: formData.category, price, billing_cycle: formData.billing_cycle, next_billing_date: formData.next_billing_date, notes: formData.notes || null };
    const supabase = createClient();
    let err;
    if (editItem) {
      ({ error: err } = await supabase.from("subscriptions").update(payload).eq("id", editItem.id));
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      ({ error: err } = await supabase.from("subscriptions").insert({ ...payload, user_id: user!.id }));
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    onOpenChange(false);
    onSaved();
  }

  const selectedCat = CATEGORIES.find(c => c.value === formData.category);

  const stepTitle = editItem ? `Edit ${selectedCat ? getCat(editItem.category).label : "item"}` : step === 1 ? "Choose category" : step === 2 ? selectedCat?.label ?? "Choose service" : "Add details";

  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-sm sm:max-w-md max-h-[90vh] flex flex-col mx-4 overflow-hidden">
        <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          {step > 1 && !editItem && (
            <button onClick={goBack} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors -ml-1">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <h2 className="flex-1 text-base font-bold text-gray-900">{stepTitle}</h2>
          <button onClick={() => onOpenChange(false)} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {!editItem && (
          <div className="flex gap-1 px-5 py-3 flex-shrink-0">
            {[1, 2, 3].map(s => (
              <div key={s} className={cn("h-1 rounded-full flex-1 transition-colors", s <= step ? "bg-blue-600" : "bg-gray-200")} />
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {step === 1 && (
            <div className="space-y-2.5 pt-1">
              {availableCats.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <button key={cat.value} onClick={() => selectCategory(cat.value)}
                    className="group relative w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-transparent bg-white text-left transition-all duration-150 active:scale-[0.99] hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/60"
                    style={{ borderLeftColor: cat.borderAccent.includes("purple") ? "#a855f7" : cat.borderAccent.includes("green") ? "#22c55e" : cat.borderAccent.includes("blue") ? "#3b82f6" : cat.borderAccent.includes("orange") ? "#f97316" : cat.borderAccent.includes("red") ? "#ef4444" : "#d1d5db", borderLeftWidth: "4px" }}
                  >
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-150 group-hover:scale-110 shadow-sm", cat.iconBg)}>
                      <Icon className={cn("w-5.5 h-5.5", cat.iconColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900">{cat.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{cat.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-gray-300 transition-colors">
                      <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && selectedCat && (
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", selectedCat.iconBg)}>
                  <selectedCat.icon className={cn("w-3.5 h-3.5", selectedCat.iconColor)} />
                </div>
                <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", selectedCat.badgeCls)}>{selectedCat.label}</span>
              </div>
              <p className="text-xs text-gray-400">Pick a service or type a custom name below</p>
              <div className="flex flex-wrap gap-2">
                {(selectedCat.presets ?? []).map(name => (
                  <button key={name} onClick={() => selectPreset(name)}
                    className="px-4 py-2 min-h-[40px] rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 active:scale-[0.97] transition-all"
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-400 mb-2">Or type a custom name</p>
                <div className="flex gap-2">
                  <input placeholder={`Custom ${selectedCat.label} name...`}
                    className="flex-1 min-h-[48px] px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                    value={formData.name} onChange={e => set("name", e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && formData.name) { e.preventDefault(); setStep(3); } }}
                  />
                  <button type="button" disabled={!formData.name}
                    onClick={() => setStep(3)}
                    className="min-h-[48px] px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl flex-shrink-0 disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input className="mt-1.5 w-full min-h-[48px] px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                  value={formData.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Netflix" required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1.5 w-full min-h-[48px] px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-white"
                  value={formData.category} onChange={e => set("category", e.target.value)}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Amount ({symbol})</label>
                  <input type="number" min="0" step="0.01" placeholder="0.00"
                    className="mt-1.5 w-full min-h-[48px] px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                    value={formData.price} onChange={e => set("price", e.target.value)} required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Billing cycle</label>
                  <select className="mt-1.5 w-full min-h-[48px] px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-white"
                    value={formData.billing_cycle} onChange={e => set("billing_cycle", e.target.value)}
                  >
                    <option value="once">One-time</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Next billing date</label>
                <input type="date"
                  className="mt-1.5 w-full min-h-[48px] px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                  value={formData.next_billing_date} onChange={e => set("next_billing_date", e.target.value)} required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Notes <span className="text-gray-400 font-normal">(optional)</span></label>
                <input placeholder="Plan details, account email..."
                  className="mt-1.5 w-full min-h-[48px] px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                  value={formData.notes} onChange={e => set("notes", e.target.value)}
                />
              </div>
              <button type="submit" disabled={saving}
                className="w-full min-h-[52px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-semibold text-sm mt-2 inline-flex items-center justify-center gap-2 disabled:opacity-90 transition-colors"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : editItem ? "Save changes" : `Add ${sectionLabel}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

function DeleteDialog({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-sm w-full mx-4">
        <h2 className="font-bold text-gray-900 text-lg mb-2">Remove &quot;{name}&quot;?</h2>
        <p className="text-sm text-gray-500 mb-6">This will permanently delete this entry. Cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 min-h-[48px] border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 min-h-[48px] bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl transition-colors">Remove</button>
        </div>
      </div>
    </div>
  );
}

type PaymentRecord = {
  id: string; paid_date: string; amount_paid: number;
  next_billing_date_after: string; created_at: string;
};

async function markAsPaid(s: Subscription): Promise<string | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const newDate = advanceDate(s.next_billing_date, s.billing_cycle);
  const { error: insertErr } = await supabase.from("payment_history").insert({
    subscription_id: s.id, user_id: user.id,
    name: s.name, category: s.category,
    amount_paid: s.price, billing_cycle: s.billing_cycle,
    next_billing_date_after: newDate,
  });
  if (insertErr) { console.error("markAsPaid insert error:", insertErr); return null; }
  if (s.billing_cycle === "once") {
    await supabase.from("subscriptions").delete().eq("id", s.id);
    return "deleted";
  }
  const { error: updateErr } = await supabase.from("subscriptions").update({ next_billing_date: newDate }).eq("id", s.id);
  if (updateErr) { console.error("markAsPaid update error:", updateErr); return null; }
  return newDate;
}

function SubCard({ s, fmt, onEdit, onDelete, onPaid }: {
  s: Subscription; fmt: (n: number) => string;
  onEdit: () => void; onDelete: () => void; onPaid: () => void;
}) {
  const days = daysUntil(s.next_billing_date);
  const cat = getCat(s.category);
  const [paidState, setPaidState] = useState<{ date: string } | null>(null);
  const [paying, setPaying] = useState(false);

  async function handlePaid() {
    setPaying(true);
    const result = await markAsPaid(s);
    if (result) {
      if (result === "deleted") {
        onPaid();
      } else {
        setPaidState({ date: result });
        onPaid();
        setTimeout(() => setPaidState(null), 2000);
      }
    }
    setPaying(false);
  }

  const isOnce = s.billing_cycle === "once";
  const showPaidTag = paidState?.date;
  const btnLabel = paying ? "Advancing..." : paidState ? "Paid!" : isOnce ? "Mark done" : "Mark paid";
  const btnIcon = paying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />;

  return (
    <div className={cn("bg-white rounded-2xl border border-l-4 shadow-sm transition-shadow hover:shadow-md", cat.borderAccent)}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <ServiceIcon name={s.name} size={22} />
            <p className="font-bold text-gray-900 text-base leading-tight truncate">{s.name}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-gray-900 text-sm">{fmt(s.price)}</p>
            {s.billing_cycle !== "once" && <p className="text-[11px] text-gray-400">/{s.billing_cycle === "monthly" ? "mo" : s.billing_cycle === "yearly" ? "yr" : s.billing_cycle === "weekly" ? "wk" : "qtr"}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", cat.badgeCls)}>{cat.label}</span>
          {s.billing_cycle === "yearly" && <span className="text-[11px] text-gray-400">≈ {fmt(Math.round(s.price / 12))}/mo</span>}
          {s.billing_cycle === "once" && <span className="text-[11px] text-gray-400">One-time</span>}
          {showPaidTag && <span className="text-[11px] text-green-600 bg-green-50 border border-green-200 font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Paid {formatDate(showPaidTag)}</span>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500">Due {formatDate(s.next_billing_date)}</p>
            {paidState && <span className="text-xs text-green-600 font-semibold animate-pulse">Updated!</span>}
          </div>
          <DaysTag days={days} />
        </div>
        {s.notes && <p className="text-[11px] text-gray-400 mt-2 truncate">{s.notes}</p>}
      </div>
      <div className="border-t border-gray-50 flex divide-x divide-gray-50">
        <button onClick={handlePaid}
          disabled={paying || !!paidState}
          className={cn("flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-bold transition-colors rounded-bl-2xl disabled:opacity-70",
            paidState ? "bg-green-600 text-white" : "text-green-600 hover:text-white hover:bg-green-600 active:bg-green-700"
          )}
        >
          {btnIcon}{btnLabel}
        </button>
        <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors active:bg-blue-100">
          <Edit2 className="w-3.5 h-3.5" />Edit
        </button>
        <button onClick={onDelete} className="flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors rounded-br-2xl active:bg-red-100">
          <Trash2 className="w-3.5 h-3.5" />Remove
        </button>
      </div>
    </div>
  );
}

export default function ItemsPage({ mode }: { mode: SectionKey }) {
  const [items, setItems] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Subscription | null>(null);
  const [deleteItem, setDeleteItem] = useState<Subscription | null>(null);
  const [catFilter, setCatFilter] = useState("all");
  const { fmt } = useCurrency();

  const isSubscription = mode === "subscriptions";
  const sectionCats = isSubscription ? SUBSCRIPTION_CATS : BILL_CATS;
  const sectionLabel = isSubscription ? "subscription" : "bill";
  const sectionLabelCap = isSubscription ? "Subscription" : "Bill";
  const SectionIcon = isSubscription ? Tv : Receipt;
  const pageTitle = isSubscription ? "Subscriptions" : "Bills";

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase.from("subscriptions")
        .select("*").in("category", sectionCats).order("next_billing_date", { ascending: true });
      if (data) setItems(data);
    } catch (e) {
      console.error("ItemsPage fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [mode]);

  useEffect(() => { fetchItems(); }, [fetchItems]);
  useEffect(() => { setCatFilter("all"); }, [mode]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("add=true")) {
      setEditItem(null);
      setDialogOpen(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  function openAdd() { setEditItem(null); setDialogOpen(true); }
  function openEdit(s: Subscription) { setEditItem(s); setDialogOpen(true); }

  async function handleDelete(s: Subscription) {
    const supabase = createClient();
    await supabase.from("subscriptions").delete().eq("id", s.id);
    setItems(prev => prev.filter(x => x.id !== s.id));
    setDeleteItem(null);
  }

  const filtered = catFilter === "all" ? items : items.filter(s => s.category === catFilter);

  const filterTabs = [
    { key: "all", label: `All (${items.length})` },
    ...CATEGORIES.filter(c => sectionCats.includes(c.value) && items.some(s => s.category === c.value)).map(c => ({ key: c.value, label: c.label })),
  ];

  const totalMonthly = items.reduce((sum, s) => sum + monthlyEquiv(s.price, s.billing_cycle), 0);
  const dueSoon = items.filter(s => { const d = daysUntil(s.next_billing_date); return d >= 0 && d <= 7; }).length;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
          {!loading && items.length > 0 && <p className="text-gray-500 text-sm mt-0.5">{fmt(Math.round(totalMonthly))}/month</p>}
        </div>
        <button onClick={openAdd}
          className="hidden lg:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-4 min-h-[44px] rounded-xl shadow-md shadow-blue-200 transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add {sectionLabel}
        </button>
      </div>

      {loading && <div className="flex items-center justify-center py-24"><Loader2 className="w-7 h-7 animate-spin text-blue-400" /></div>}

      {!loading && items.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-5 shadow-sm">
            <SectionIcon className="w-7 h-7 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No {isSubscription ? "subscriptions" : "bills"} yet</h3>
          <p className="text-sm text-gray-500 mb-7 max-w-xs leading-relaxed">
            {isSubscription ? "Add Netflix, Spotify, Adobe, or any digital service you pay for." : "Add rent, WiFi, electricity, credit card bills, and loan payments."}
          </p>

        </div>
      )}

      {!loading && items.length > 0 && (
        <>
          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{fmt(Math.round(totalMonthly))}/mo</span>
              {dueSoon > 0 && <span className="ml-2 text-orange-600 font-semibold">· {dueSoon} due soon</span>}
            </p>
          </div>

          {filterTabs.length > 2 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {filterTabs.map(tab => (
                <button key={tab.key} onClick={() => setCatFilter(tab.key)}
                  className={cn("flex-shrink-0 px-4 min-h-[40px] rounded-full text-sm font-semibold transition-colors flex items-center", catFilter === tab.key ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300")}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {filtered.map(s => (
              <SubCard key={s.id} s={s} fmt={fmt} onEdit={() => openEdit(s)} onDelete={() => setDeleteItem(s)} onPaid={fetchItems} />
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm">Nothing in this category</p>
                <button onClick={() => setCatFilter("all")} className="mt-2 text-xs font-semibold text-blue-600 hover:underline">Clear filter</button>
              </div>
            )}
          </div>

          <div className="bg-gray-900 rounded-2xl p-5 mt-2">
            <p className="text-xs text-gray-400 mb-1">{sectionLabelCap} spend (monthly)</p>
            <p className="text-3xl font-bold text-white">{fmt(Math.round(totalMonthly))}</p>
            <p className="text-sm text-gray-400 mt-1">{fmt(Math.round(totalMonthly * 12))}/year · {items.length} {mode}</p>
          </div>
        </>
      )}

      <AddDialog open={dialogOpen} onOpenChange={setDialogOpen} editItem={editItem} onSaved={fetchItems} mode={mode} />
      {deleteItem && <DeleteDialog name={deleteItem.name} onConfirm={() => handleDelete(deleteItem)} onCancel={() => setDeleteItem(null)} />}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-40 w-[calc(100%-32px)] max-w-sm">
        <button onClick={openAdd}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm px-5 py-4 rounded-2xl shadow-xl shadow-blue-300 transition-all active:scale-[0.97]"
          aria-label={`Add ${sectionLabel}`}
        >
          <Plus className="w-5 h-5" /> Add {sectionLabel}
        </button>
      </div>
    </div>
  );
}

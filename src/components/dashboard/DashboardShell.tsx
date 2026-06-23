import { useState, useEffect, lazy, Suspense } from "react";
import { Menu, ChevronDown, Check, X, LogOut, ChevronRight, LayoutDashboard, Bell, Settings, Tv, Receipt, Clock, LoaderCircle } from "lucide-react";
import { CurrencyProvider, useCurrency, CURRENCIES } from "@/lib/currency";
import DashboardOverviewContent from "./DashboardOverviewContent";
import ItemsPage from "./ItemsPage";
import RemindersContent from "./RemindersContent";
import SettingsContent from "./SettingsContent";
import PaymentHistoryContent from "./PaymentHistoryContent";

const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-rose-500", "bg-orange-500"];

function CurrencySelector() {
  const { code, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("renewtracker-currency")) setOpen(true);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors"
      >
        {code}
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-sm max-h-[80vh] flex flex-col mx-4">
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Choose Currency</h2>
              <button onClick={() => setOpen(false)} className="text-xs text-gray-400 hover:text-gray-600 font-medium px-2 py-1 rounded-lg hover:bg-gray-100">Skip</button>
            </div>
            <div className="overflow-y-auto px-5 py-4 space-y-0.5">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c.code); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-colors ${code === c.code ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold w-8 text-center">{c.symbol}</span>
                    <div>
                      <p className="text-sm font-semibold leading-none">{c.code}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.label}</p>
                    </div>
                  </div>
                  {code === c.code && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "alert" | "count";
};

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr); target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function Sidebar({ currentPage, onClose }: { currentPage: string; onClose: () => void }) {
  const [userName, setUserName] = useState("...");
  const [initials, setInitials] = useState("?");
  const [avatarColor, setAvatarColor] = useState("bg-blue-500");
  const [alertCount, setAlertCount] = useState(0);
  const [subCount, setSubCount] = useState(0);
  const [billCount, setBillCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const [{ data: authData }, { data: subs }, { data: profile }] = await Promise.all([
          supabase.auth.getUser(),
          supabase.from("subscriptions").select("next_billing_date, category"),
          supabase.from("profiles").select("name").single(),
        ]);
        if (cancelled) return;
        const displayName = profile?.name || authData?.user?.user_metadata?.full_name || authData?.user?.email || "User";
        setUserName(displayName);
        const parts = displayName.split(" ").filter(Boolean);
        const inits = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : displayName.slice(0, 2).toUpperCase();
        setInitials(inits);
        setAvatarColor(colors[(inits.charCodeAt(0) + (inits.charCodeAt(1) || 0)) % colors.length]);
        if (subs) {
          const subCats = ["entertainment", "tech", "lifestyle"];
          const billCats = ["living", "financial", "other"];
          setSubCount(subs.filter(s => subCats.includes(s.category ?? "")).length);
          setBillCount(subs.filter(s => billCats.includes(s.category ?? "")).length);
          setAlertCount(subs.filter(s => { const d = daysUntil(s.next_billing_date); return d !== null && d <= 7; }).length);
        }
      } catch (e) {
        console.error("Sidebar load error:", e);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  async function handleLogout() {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const navItems: NavItem[] = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/subscriptions", label: "Subscriptions", icon: Tv, badge: subCount > 0 ? String(subCount) : undefined, badgeVariant: "count" },
    { href: "/dashboard/bills", label: "Bills", icon: Receipt, badge: billCount > 0 ? String(billCount) : undefined, badgeVariant: "count" },
    { href: "/dashboard/reminders", label: "Reminders", icon: Bell, badge: alertCount > 0 ? String(alertCount) : undefined, badgeVariant: "alert" },
    { href: "/dashboard/payment-history", label: "Payment History", icon: Clock },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 flex flex-col z-40">
      <div className="h-14 flex items-center justify-between px-5 border-b border-gray-100 flex-shrink-0">
          <a href="/" className="flex items-center gap-2 font-bold text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" class="w-8 h-8">
              <rect width="32" height="32" rx="8" fill="#2563EB"/>
              <path d="M16 5.5L25 8.5V16C25 22 21 26 16 27.5C11 26 7 22 7 16V8.5L16 5.5Z" fill="white"/>
            </svg>
            <span className="text-gray-900">Renew<span className="text-blue-600">Tracker</span></span>
          </a>
        <button className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100" onClick={onClose} aria-label="Close menu">
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = currentPage === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97] ${active ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${active ? "bg-white/25 text-white" : item.badgeVariant === "alert" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>
                      {item.badge}
                    </span>
                  )}
                  {!active && <ChevronRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColor}`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate leading-none">{userName}</p>
          </div>
          <button onClick={handleLogout} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors" title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function Shell({ children, currentPage }: { children: React.ReactNode; currentPage: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full overflow-x-hidden">
      <div className={`hidden lg:block`}>
        <Sidebar currentPage={currentPage} onClose={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 z-40">
            <Sidebar currentPage={currentPage} onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

          <div className="flex-1 min-w-0 flex flex-col min-h-screen lg:ml-64">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-3 sm:px-6 sticky top-0 z-20 gap-1.5 sm:gap-3">
          <button className="lg:hidden p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>

          <a href="/" className="lg:hidden flex items-center gap-1.5 font-bold text-sm sm:text-base flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" class="w-7 h-7">
              <rect width="32" height="32" rx="8" fill="#2563EB"/>
              <path d="M16 5.5L25 8.5V16C25 22 21 26 16 27.5C11 26 7 22 7 16V8.5L16 5.5Z" fill="white"/>
            </svg>
            <span className="text-gray-900 whitespace-nowrap">Renew<span className="text-blue-600">Tracker</span></span>
          </a>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <CurrencySelector />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}

const PAGE_CONTENT: Record<string, React.ReactNode> = {
  "/dashboard": <DashboardOverviewContent />,
  "/dashboard/subscriptions": <ItemsPage mode="subscriptions" />,
  "/dashboard/bills": <ItemsPage mode="bills" />,
  "/dashboard/reminders": <RemindersContent />,
  "/dashboard/payment-history": <PaymentHistoryContent />,
  "/dashboard/settings": <SettingsContent />,
};

export default function DashboardShell({ currentPage }: { currentPage: string }) {
  const content = PAGE_CONTENT[currentPage];
  return (
    <CurrencyProvider>
      <Shell currentPage={currentPage}>{content ?? <p className="text-gray-500 text-sm">Page not found.</p>}</Shell>
    </CurrencyProvider>
  );
}

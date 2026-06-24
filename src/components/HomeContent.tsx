import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Star, BookOpen, Bell, LayoutDashboard, Shield, WalletCards, Globe, TrendingDown, Zap, CreditCard, Calendar, Clock, AlertTriangle, ChevronDown, Repeat2, BarChart3, Users, Sparkles, Timer } from "lucide-react";
import { blogPosts } from "../lib/blog";
import BlogCoverIcon from "./BlogCoverIcon";

const features = [
  { icon: Bell, title: "Smart Payment Reminders", description: "Get notified 30, 15, 7, 3, and 1 day before every subscription or bill charges. Never get surprised by a payment again.", gradient: "from-blue-500 to-blue-700" },
  { icon: LayoutDashboard, title: "All-in-One Dashboard", description: "See every subscription, bill, and liability at a glance — what's due, what's overdue, and your total monthly spend.", gradient: "from-purple-500 to-violet-700" },
  { icon: WalletCards, title: "5 Tracking Categories", description: "Entertainment, Living Essentials, Tech & Tools, Lifestyle, and Financial Liabilities — every payable tracked in one place.", gradient: "from-green-500 to-emerald-700" },
  { icon: Globe, title: "Multi-Currency Support", description: "Use any of 34 currencies. Switch anytime — USD, EUR, INR, NPR, GBP, SGD, and more. Your currency, your way.", gradient: "from-orange-500 to-amber-600" },
  { icon: TrendingDown, title: "Spend Breakdown", description: "See exactly how much you're spending per category each month and year. Spot subscriptions you've forgotten about.", gradient: "from-red-500 to-pink-600" },
  { icon: Zap, title: "Mobile-First Design", description: "Built for your phone. Add a subscription in seconds, check what's due today, and manage everything on the go.", gradient: "from-yellow-500 to-amber-600" },
];

const stats = [
  { label: "Active users", value: "250+", icon: Users },
  { label: "Subscriptions tracked", value: "1,200+", icon: BarChart3 },
  { label: "Categories", value: "5", icon: LayoutDashboard },
  { label: "Currencies", value: "34", icon: Globe },
];

const testimonials = [
  { name: "Aryan Mehta", role: "Student, Mumbai", text: "I had no idea I was spending $180/month on subscriptions until I added them all to RenewTracker. Cancelled 4 I'd completely forgotten about.", avatar: "AM", avatarColor: "bg-blue-500", stars: 5 },
  { name: "Sophie Laurent", role: "Freelancer, Paris", text: "I track my rent, Netflix, Adobe CC, and gym all in one place. The reminder 7 days before my credit card bill is a lifesaver.", avatar: "SL", avatarColor: "bg-purple-500", stars: 5 },
  { name: "Kai Tanaka", role: "Developer, Tokyo", text: "Simple, clean, and actually useful. I added all my SaaS tools and now I know exactly what hits my card each month. No more surprises.", avatar: "KT", avatarColor: "bg-green-500", stars: 5 },
];

const categories = [
  { label: "Entertainment", examples: "Netflix, Spotify, Crunchyroll", color: "bg-purple-100 text-purple-700 border-purple-200", icon: Zap },
  { label: "Living Essentials", examples: "Rent, Electricity, Water", color: "bg-green-100 text-green-700 border-green-200", icon: Calendar },
  { label: "Tech & Tools", examples: "iCloud, ChatGPT Plus, Notion", color: "bg-blue-100 text-blue-700 border-blue-200", icon: LayoutDashboard },
  { label: "Lifestyle", examples: "Gym, Fashion Box, Gaming", color: "bg-orange-100 text-orange-700 border-orange-200", icon: Sparkles },
  { label: "Financial Liabilities", examples: "Credit Cards, BNPL, Loan EMI", color: "bg-red-100 text-red-700 border-red-200", icon: CreditCard },
];

const faqs = [
  { q: "What can RenewTracker track?", a: "RenewTracker tracks subscriptions, monthly bills, rent, utilities, credit card payments, BNPL installments, loan EMIs, and any other recurring payment you have." },
  { q: "How do reminders work?", a: "We send email reminders at 30, 15, 7, 3, and 1 day before each payment date. Push and Telegram notifications are coming soon." },
  { q: "Is RenewTracker free?", a: "Yes — completely free. No plans, no limits, no credit card required. We built it to be genuinely helpful, not to upsell you." },
  { q: "Which currencies are supported?", a: "34 currencies including USD, EUR, GBP, INR, NPR, SGD, JPY, KRW, AUD, CAD, and more. You can switch currency anytime from the dashboard." },
  { q: "Is my data secure?", a: "Yes. All data is encrypted and stored securely on Supabase (PostgreSQL). Row-level security ensures only you can access your data." },
];

const DEMO_CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "NPR", "BRL", "KRW", "AED"];

function DashboardMockup() {
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const currency = DEMO_CURRENCIES[idx];

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(i => (i + 1) % DEMO_CURRENCIES.length);
      setAnimKey(k => k + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  function fmt(n: number) {
    try {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(n);
    } catch {
      return `$${n.toLocaleString()}`;
    }
  }

  const monthlyTotal = 1283.47;
  const yearlyTotal = monthlyTotal * 12;

  const items = [
    { name: "Netflix", price: 15.99, due: "Tomorrow", badge: "bg-red-100 text-red-700", badgeText: "1 day" },
    { name: "Spotify", price: 9.99, due: "In 3 days", badge: "bg-red-100 text-red-700", badgeText: "3 days" },
    { name: "Rent", price: 1200, due: "In 7 days", badge: "bg-orange-100 text-orange-700", badgeText: "7 days" },
    { name: "iCloud+", price: 2.99, due: "In 12 days", badge: "bg-yellow-100 text-yellow-700", badgeText: "12 days" },
    { name: "Adobe CC", price: 54.99, due: "In 18 days", badge: "bg-green-100 text-green-700", badgeText: "18 days" },
  ];

  const categories = [
    { name: "Entertainment", pct: 35, color: "bg-purple-400" },
    { name: "Living", pct: 28, color: "bg-green-400" },
    { name: "Tech", pct: 22, color: "bg-blue-400" },
    { name: "Lifestyle", pct: 15, color: "bg-orange-400" },
  ];

  return (
    <div className="relative w-full mx-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="h-9 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <div className="ml-3 text-[10px] font-semibold text-gray-400 tracking-wide">renewtracker.net</div>
        </div>
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Good afternoon</p>
              <p className="text-sm font-bold text-gray-900">Alex</p>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              Add
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4">
            <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">Monthly spend</p>
            <p className="text-3xl font-bold text-white mt-0.5">
              <span key={animKey} className="transition-all duration-300 animate-currency-flip">{fmt(monthlyTotal)}</span>
              <span className="text-xs font-semibold text-blue-300 ml-2 bg-blue-500/20 px-1.5 py-0.5 rounded-full">{currency}</span>
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-gray-400">{fmt(yearlyTotal)}/year</span>
              <span className="text-[11px] font-semibold bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">3 due in 7 days</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "8", label: "Active", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              { value: "2", label: "Overdue", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
              { value: "3", label: "Due soon", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
            ].map(s => (
              <div key={s.label} className={`${s.bg} ${s.border} rounded-xl border p-3 text-center`}>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-semibold text-gray-700">Upcoming Payments</p>
              <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">5</span>
            </div>
            <div className="space-y-1.5">
              {items.map(item => (
                <div key={item.name} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5"><span key={animKey} className="inline-block transition-all duration-300">{fmt(item.price)}</span> · {item.due}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${item.badge}`}>{item.badgeText}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2.5">Spend by Category</p>
            <div className="space-y-2.5">
              {categories.map(cat => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-gray-500">{cat.name}</span>
                    <span className="text-[11px] font-bold text-gray-700">{cat.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-full h-full rounded-2xl border-2 border-blue-200 -z-10" />
      <p className="text-center text-[11px] text-gray-400 mt-3 animate-pulse">34 currencies supported — prices cycling above</p>
    </div>
  );
}

export default function HomeContent() {
  return (
    <>
      <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-center">
            <div className="text-center lg:text-left lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full mb-6 border border-blue-200">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Free for everyone — no credit card needed
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-[1.05] mb-5 tracking-tight">
                Never Miss a<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Payment</span>
                <br />Again.
              </h1>
              <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                Track every subscription, bill, rent, loan, and recurring payment in one place. Get reminded before every due date — so you're always in control of your money.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <a href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5"
                >
                  Start for free <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/#features"
                  className="inline-flex items-center justify-center gap-2 text-base font-semibold text-gray-700 border border-gray-200 px-8 py-3.5 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  See how it works
                </a>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-gray-500">
                {["100% free", "No credit card", "34 currencies", "Email reminders"].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-span-3">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {stats.map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                    <Icon className="w-5 h-5 text-blue-200" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-18">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4 bg-blue-50 px-3 py-1 rounded-full">Everything you need</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Stop losing money to forgotten payments</h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">The average person wastes $300/year on unused subscriptions. RenewTracker keeps you aware so every dollar you spend is intentional.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="group relative bg-white border border-gray-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg shadow-blue-200/30 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5.5 h-5.5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2.5 text-lg">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-18">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4 bg-blue-50 px-3 py-1 rounded-full">5 categories</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Track every type of recurring payment</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From streaming services to rent to BNPL installments — if it repeats, RenewTracker tracks it.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <div key={cat.label} className={`border rounded-2xl p-6 ${cat.color} hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <p className="font-bold text-base">{cat.label}</p>
                  </div>
                  <p className="text-sm opacity-75 ml-12">{cat.examples}</p>
                </div>
              );
            })}
            <div className="border border-dashed border-gray-300 rounded-2xl p-6 text-gray-400 flex items-center gap-4 hover:border-gray-400 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Repeat2 className="w-4.5 h-4.5 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-600">+ Custom</p>
                <p className="text-xs text-gray-400">Add anything with a custom name</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-18">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4 bg-blue-50 px-3 py-1 rounded-full">Simple setup</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Up and running in 2 minutes</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Three simple steps to full control of your recurring payments.</p>
          </div>
          <div className="relative">
            <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 -translate-y-1/2" />
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 relative">
              {[
                { step: "01", title: "Add your subscriptions", desc: "Pick a category, choose from presets or type a custom name, set the price and next billing date. Done in seconds.", icon: CreditCard, color: "from-blue-600 to-blue-700" },
                { step: "02", title: "We track every deadline", desc: "RenewTracker monitors all your payment dates and calculates your monthly and yearly totals automatically.", icon: LayoutDashboard, color: "from-indigo-600 to-purple-700" },
                { step: "03", title: "Get timely reminders", desc: "Receive alerts 30, 15, 7, 3, and 1 day before each payment via email. Push and Telegram coming soon.", icon: Bell, color: "from-green-600 to-emerald-700" },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.step} className="flex flex-col items-center text-center relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-xl relative z-10 ring-4 ring-white`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-xs font-mono font-bold text-blue-600 mb-2 tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full">{s.step}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4 bg-blue-50 px-3 py-1 rounded-full">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">Real people, real results</h2>
            <p className="text-gray-500">Join thousands who never miss a payment.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map(review => (
              <div key={review.name} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${review.avatarColor} flex items-center justify-center text-white text-sm font-bold shadow-md`}>{review.avatar}</div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3 bg-blue-50 px-3 py-1 rounded-full">Blog</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">From the blog</h2>
              <p className="text-gray-500 text-sm mt-1.5">Guides on managing subscriptions and saving money</p>
            </div>
            <a href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-4 sm:mt-0">
              All articles <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.slice(0, 3).map(post => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="group bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 hover:border-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <BlogCoverIcon icon={post.coverEmoji} size="sm" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{post.category}</span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1"><Timer className="w-3 h-3" />{post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">{post.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <a href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
              <BookOpen className="w-4 h-4" /> View all articles
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 sm:py-28 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4 bg-blue-50 px-3 py-1 rounded-full">FAQ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(faq => (
              <details key={faq.q} className="group bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:border-gray-300 transition-colors [&[open]]:border-blue-200 [&[open]]:shadow-sm">
                <summary className="flex justify-between items-center font-semibold text-gray-900 list-none text-sm sm:text-base">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-4" />
                </summary>
                <p className="mt-4 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-10 sm:p-16 shadow-2xl shadow-blue-300/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-400/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-300/5 rounded-full blur-xl" />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Shield className="w-7 h-7 text-blue-200" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">Take control of your subscriptions today</h2>
            <p className="text-blue-200 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">Free forever. No limits. Add everything — from Netflix to your rent to your credit card bill.</p>
            <a href="/register" className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 text-base font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
              Get started free <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

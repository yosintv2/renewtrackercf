# RenewTracker

**Never Miss a Payment** — Free subscription tracker & renewal reminder app.

Track every subscription, bill, rent, loan, and recurring payment in one place. Get free email reminders before every due date. Supports 37 currencies. Forever free.

**Site:** https://www.renewtracker.net

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Astro 5](https://astro.build) (static site generation) |
| **UI** | React 19 + [Tailwind CSS v4](https://tailwindcss.com) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) (Radix primitives) |
| **Charts** | [Recharts](https://recharts.org) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Auth** | [Supabase Auth](https://supabase.com/auth) (email/password + Google OAuth) |
| **Database** | [Supabase PostgreSQL](https://supabase.com) |
| **Serverless Functions** | Cloudflare Pages Functions |
| **Hosting** | [Cloudflare Pages](https://pages.cloudflare.com) |
| **Sitemap** | `@astrojs/sitemap` |
| **Package Manager** | npm (Node 20) |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Cloudflare Pages                    │
│  ┌──────────────────────────────────────────────┐   │
│  │           Static Site (Astro)                 │   │
│  │  / (Landing Page)                             │   │
│  │  /blog (Blog listing + 29 articles)           │   │
│  │  /about, /contact, /privacy, /terms           │   │
│  │  /login, /register, /forgot-password          │   │
│  │  /dashboard/* (React SPA with 6 sub-pages)    │   │
│  │  /admin (User management dashboard)           │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │     Pages Functions (Edge Workers)            │   │
│  │  GET  /api/auth/callback (OAuth handler)      │   │
│  │  DELETE /api/account/delete (user deletion)   │   │
│  │  GET  /api/admin/users (list all users)       │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │    Supabase     │
              │  ┌──────────┐  │
              │  │  Auth    │  │
              │  │  (email  │  │
              │  │  + OAuth)│  │
              │  ├──────────┤  │
              │  │PostgreSQL│  │
              │  │ profiles │  │
              │  │ vehicles │  │
              │  │ documents│  │
              │  │ subs     │  │
              │  │ notify   │  │
              │  │ pay_hist │  │
              │  └──────────┘  │
              └─────────────────┘
```

---

## Directory Structure

```
renewtracker/
├── .env.local                    # Supabase credentials
├── .node-version                 # Pins Node to 20
├── .npmrc                        # legacy-peer-deps=true
├── astro.config.ts               # Astro configuration
├── tsconfig.json                 # TypeScript config with @/ alias
├── components.json               # shadcn/ui config
├── supabase-schema.sql           # Full database DDL
├── supabase/
│   └── migrations/
│       └── 002_payment_history.sql
├── functions/
│   └── api/
│       ├── auth/callback.ts      # OAuth callback handler
│       ├── account/delete.ts     # User account deletion
│       └── admin/users.ts        # Admin user listing
├── public/
│   ├── favicon.svg / favicon.ico
│   ├── apple-icon.png
│   ├── robots.txt
│   ├── _redirects                # /sitemap.xml → /sitemap-index.xml
│   └── llms.txt                  # LLM-oriented site index
├── src/
│   ├── env.d.ts                  # ImportMetaEnv types
│   ├── worker-entry.ts           # Cloudflare MessageChannel polyfill
│   ├── styles/globals.css        # Tailwind v4 + shadcn theme
│   ├── layouts/
│   │   └── BaseLayout.astro      # Meta tags, OG, JSON-LD, fonts
│   ├── pages/
│   │   ├── index.astro           # Landing page
│   │   ├── login.astro           # Login page
│   │   ├── register.astro        # Registration page
│   │   ├── forgot-password.astro
│   │   ├── reset-password.astro
│   │   ├── blog.astro            # Blog listing (29 posts)
│   │   ├── blog/[slug].astro     # Blog detail with schema
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── admin.astro           # Admin panel
│   │   ├── api/auth/callback.astro
│   │   └── dashboard/
│   │       ├── index.astro           # /dashboard
│   │       ├── subscriptions.astro   # /dashboard/subscriptions
│   │       ├── bills.astro           # /dashboard/bills
│   │       ├── reminders.astro       # /dashboard/reminders
│   │       ├── payment-history.astro # /dashboard/payment-history
│   │       └── settings.astro        # /dashboard/settings
│   ├── components/
│   │   ├── Navbar.astro          # Site navigation
│   │   ├── Footer.astro          # Site footer
│   │   ├── HomeContent.tsx       # Landing page (React interactive)
│   │   ├── BlogCoverIcon.tsx     # Blog post icon component
│   │   ├── LoginForm.tsx         # Auth login form
│   │   ├── RegisterForm.tsx      # Auth registration form
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   ├── ContactForm.tsx       # Contact page form
│   │   ├── admin/AdminApp.tsx    # Admin dashboard (user analytics)
│   │   ├── dashboard/
│   │   │   ├── DashboardShell.tsx       # SPA shell with sidebar
│   │   │   ├── DashboardOverviewContent.tsx  # Main overview
│   │   │   ├── ItemsPage.tsx           # CRUD for subs/bills
│   │   │   ├── PaymentHistoryContent.tsx     # Charts + history
│   │   │   ├── RemindersContent.tsx         # Upcoming reminders
│   │   │   └── SettingsContent.tsx          # Account settings
│   │   └── ui/
│   │       ├── avatar.tsx, badge.tsx, button.tsx, card.tsx
│   │       ├── dialog.tsx, dropdown-menu.tsx, input.tsx
│   │       ├── label.tsx, progress.tsx, select.tsx
│   │       ├── separator.tsx, tabs.tsx
│   └── lib/
│       ├── blog.ts               # Blog data (29 posts with full content)
│       ├── currency.tsx           # 37 currencies, context + hook
│       ├── utils.ts              # cn() utility
│       └── supabase/
│           ├── client.ts         # Browser Supabase client
│           └── admin.ts          # Service-role Supabase client
└── dist/                         # Build output
```

---

## Database Schema

### Tables

**`profiles`** — extends `auth.users`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | References `auth.users(id)` ON DELETE CASCADE |
| name | text | Auto-set from `raw_user_meta_data->>'full_name'` or email |
| phone | text | Optional |
| plan | text | `'free'`, `'premium'`, or `'fleet'` (default `'free'`) |
| created_at | timestamptz | Default `now()` |

Auto-created via `handle_new_user()` trigger on `auth.users` INSERT.

**`subscriptions`** — core table for bills and subscriptions
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | `gen_random_uuid()` |
| user_id | uuid FK | References `auth.users(id)` ON DELETE CASCADE |
| name | text | Service/bill name |
| category | text | `entertainment`, `living`, `tech`, `lifestyle`, `financial`, `other` |
| price | numeric(10,2) | |
| billing_cycle | text | `once`, `monthly`, `yearly`, `weekly`, `quarterly` |
| next_billing_date | date | |
| notes | text | Optional |
| created_at | timestamptz | |

**`payment_history`** — tracks completed payments
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| subscription_id | uuid FK | References `subscriptions(id)` ON DELETE SET NULL |
| user_id | uuid FK | References `auth.users(id)` ON DELETE CASCADE |
| name | text | |
| category | text | |
| amount_paid | decimal(10,2) | |
| paid_date | date | |
| billing_cycle | text | |
| next_billing_date_after | date | |
| created_at | timestamptz | |

**`vehicles`** — vehicle expiry tracking (legacy feature)
| Column | Type |
|---|---|
| id, user_id, vehicle_number, vehicle_type, province, brand, model, year, tax_expiry, bluebook_expiry, insurance_expiry, pollution_expiry, created_at |

**`documents`** — linked files per vehicle
| Column | Type |
|---|---|
| id, vehicle_id, document_type (`bluebook`/`insurance`/`pollution`), file_url, uploaded_at |

**`notifications`** — reminder log
| Column | Type |
|---|---|
| id, vehicle_id, renewal_type, reminder_date, sent_at, status (`pending`/`sent`/`failed`) |

### Row Level Security (RLS)

Every table has strict RLS: users can only SELECT/INSERT/UPDATE/DELETE rows where `user_id = auth.uid()`. Documents are secured via an EXISTS check against the parent vehicle. Profiles are restricted to the owning user only.

### Indexes
- `idx_payment_history_subscription` on `payment_history(subscription_id)`
- `idx_payment_history_user` on `payment_history(user_id)`

---

## Pages & Routes

### Public Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/index.astro` | Landing page with currency ticker, features, testimonials, FAQ, blog preview |
| `/blog` | `src/pages/blog.astro` | Blog listing (featured + grid of 28 articles) |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | Blog detail with article schema, related posts, prev/next |
| `/about` | `src/pages/about.astro` | About page |
| `/contact` | `src/pages/contact.astro` | Contact form |
| `/privacy` | `src/pages/privacy.astro` | Privacy policy |
| `/terms` | `src/pages/terms.astro` | Terms of service |
| `/login` | `src/pages/login.astro` | Login (email/password + Google OAuth) |
| `/register` | `src/pages/register.astro` | Registration |
| `/forgot-password` | `src/pages/forgot-password.astro` | Password reset request |
| `/reset-password` | `src/pages/reset-password.astro` | Password reset form |

### Dashboard Pages (React SPA via `DashboardShell.tsx`)

| Route | Component | Description |
|---|---|---|
| `/dashboard` | `DashboardOverviewContent` | Monthly summary, alerts, category breakdown, quick actions |
| `/dashboard/subscriptions` | `ItemsPage` (mode="subscriptions") | CRUD for entertainment/tech/lifestyle items with categories, presets, search |
| `/dashboard/bills` | `ItemsPage` (mode="bills") | CRUD for living/financial/other items |
| `/dashboard/reminders` | `RemindersContent` | All upcoming payments grouped by status (overdue, today, upcoming) |
| `/dashboard/payment-history` | `PaymentHistoryContent` | Spending trend chart, category breakdown bars, search, date range filter, monthly groups, stat cards with trend arrows, active filter tags |
| `/dashboard/settings` | `SettingsContent` | Account settings, currency selection, account deletion |

### Admin Page

| Route | Component | Description |
|---|---|---|
| `/admin` | `AdminApp` | User analytics table with search, filters, sort, charts, export |

---

## API Endpoints (Cloudflare Pages Functions)

### `GET /api/auth/callback` — OAuth Callback Handler
- File: `functions/api/auth/callback.ts`
- Handles Supabase OAuth code exchange
- Sets auth cookies and redirects to `/dashboard` (or specified `next` parameter)
- Supports reset-password flow with proper error handling

### `DELETE /api/account/delete` — User Account Deletion
- File: `functions/api/account/delete.ts`
- Requires Bearer token auth
- Uses service_role key to call `admin.deleteUser()`
- Returns `{ success: true }` or error

### `GET /api/admin/users` — Admin User Listing
- File: `functions/api/admin/users.ts`
- Restricted to `mail.yosintv@gmail.com`
- Returns all auth users with subscription counts
- Response: `{ users: [{ id, email, created_at, last_sign_in_at, provider, subscriptions }] }`

---

## Authentication Flow

1. **Sign up** via `RegisterForm.tsx` → Supabase Auth (email/password)
2. **Sign in** via `LoginForm.tsx` → Supabase Auth (email/password) or Google OAuth
3. **OAuth callback** hits `functions/api/auth/callback.ts` which exchanges the code for a session and sets cookies
4. **Auth state** managed client-side via `createBrowserClient()` from `@supabase/ssr`
5. **Protected routes**: Dashboard pages redirect to `/login` if no session detected
6. **Profile auto-creation**: DB trigger `handle_new_user()` inserts a row into `public.profiles` on every new auth user

---

## Blog System

**Data-driven** (not content collections). All posts stored in `src/lib/blog.ts`.

### Types
```typescript
type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;       // Guide | Money Tips | Financial | Entertainment | Lifestyle | Tech | Data | Comparison
  coverEmoji: string;     // banknote | clipboard | creditcard | tv | receipt | search | dumbbell | monitor | chart
  content: BlogSection[];
};

type BlogSection = {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "tip" | "warning";
  text?: string;
  items?: string[];
};
```

### Available Cover Icons (`BlogCoverIcon.tsx`)
- `banknote` (green), `clipboard` (blue), `creditcard` (red), `tv` (purple)
- `receipt` (gray), `search` (amber), `dumbbell` (orange), `monitor` (indigo), `chart` (cyan)
- Fallback: `FileText` with blue color

### 29 Blog Posts (topic overview)

**Original 10:**
1. Stop Paying for Subscriptions You Forgot You Had (Money Tips)
2. How to Manage All Your Subscriptions in One Place (Guide)
3. BNPL and Pay Later Tracker (Financial)
4. Are Your Streaming Subscriptions Worth It? (Entertainment)
5. How to Track Monthly Bills So Nothing Gets Missed (Guide)
6. The 30-Minute Subscription Audit (Money Tips)
7. Gym Memberships and Lifestyle Subscriptions (Lifestyle)
8. Tech and Software Subscriptions (Tech)
9. Never Miss a Credit Card Payment Again (Financial)
10. How Much Do Subscriptions Really Cost? (Data)

**15 Added:**
11. Free Trial Management (Guide)
12. Family Subscription Management (Lifestyle)
13. Annual vs Monthly Billing (Money Tips)
14. Student Subscription Deals (Money Tips)
15. Small Business Subscription Management (Guide)
16. Spot Subscription Price Hikes (Money Tips)
17. Digital Wallet Subscription Tracking (Guide)
18. Subscription Sharing (Lifestyle)
19. Kids' Subscription Management (Lifestyle)
20. Subscription Budgeting (Financial)
21. Email Receipt Mining (Tech)
22. Subscription Security (Tech)
23. Pause vs Cancel (Guide)
24. Tax Deductible Subscriptions (Financial)
25. Renewal Reminder Best Practices (Guide)

**4 Competitor/Comparison (Added):**
26. Rocket Money vs RenewTracker (Comparison)
27. Best Subscription Tracker Apps (Comparison)
28. Subscription Tracker Web App vs Mobile (Guide)
29. Domain and Subscription Tracker Combined (Guide)

### SEO Optimization
- All 180+ targeted keywords integrated naturally across posts
- Country-specific: Nepal, India, Japan keywords included
- Homepage and blog listing meta tags optimized
- `[slug].astro` includes canonical URLs and Article JSON-LD schema
- Sitemap auto-indexes all blog pages

---

## Dashboard Components

### `DashboardShell.tsx`
- SPA container with responsive sidebar navigation
- Currency selector modal (37 currencies, persisted to localStorage)
- Sidebar shows user avatar/initials, subscription/bill counts, alert badge for items due within 7 days
- 6 sub-pages rendered via `PAGE_CONTENT` record

### `ItemsPage.tsx`
- Dual-mode CRUD component (`subscriptions` vs `bills`)
- 6 categories with preset name suggestions (e.g., Netflix, Rent, ChatGPT Plus)
- FAB button for mobile, header button for desktop
- Grouped display by category with color-coded badges
- Search/filter, inline edit, delete with confirmation
- Pagination shows category counts
- Empty state with category-based CTAs

### `PaymentHistoryContent.tsx`
- Recharts area chart (spending trend over time)
- Category breakdown bars (clickable to filter)
- Custom date range picker (quick: 7d, 30d, 90d, 1y)
- Search by payment name
- Monthly grouped payment list
- Smart stat cards with trend arrows (vs last month)
- Active filter tags with X to remove
- Empty state with CTAs to Subscriptions/Bills

### `DashboardOverviewContent.tsx`
- Payment alerts (overdue, today, tomorrow, within 7 days)
- Monthly spending summary with category breakdown bars
- Quick action buttons (Add Subscription, Add Bill, View Reminders)
- Next 5 upcoming payments list

### `RemindersContent.tsx`
- All upcoming payments grouped by: Overdue, Today, Tomorrow, This Week, Later
- Each item shows days remaining, amount, category badge
- Quick actions to pay or edit

### `SettingsContent.tsx`
- User profile display
- Currency selection
- Account deletion with confirmation

---

## UI Components (shadcn/ui)

All in `src/components/ui/`:

| Component | Radix Primitive | Usage |
|---|---|---|
| `avatar.tsx` | Avatar | User avatars in sidebar |
| `badge.tsx` | — | Category badges |
| `button.tsx` | — | Variants (default, destructive, outline, secondary, ghost, link) |
| `card.tsx` | — | Card containers |
| `dialog.tsx` | Dialog | Modal dialogs for forms |
| `dropdown-menu.tsx` | DropdownMenu | Menu dropdowns |
| `input.tsx` | — | Form inputs |
| `label.tsx` | Label | Form labels |
| `progress.tsx` | Progress | Progress bars |
| `select.tsx` | Select | Dropdown selects |
| `separator.tsx` | Separator | Dividers |
| `tabs.tsx` | Tabs | Tab navigation |

---

## Currency System

37 currencies in `src/lib/currency.tsx`:

- USD, EUR, GBP, JPY, INR, NPR, AUD, CAD, SGD, CNY, KRW
- BDT, BRL, DKK, EGP, HKD, IDR, MYR, MXN, NGN, NOK
- PKR, PHP, PLN, SAR, ZAR, LKR, SEK, CHF, TWD, THB
- TRY, AED, VND

Features:
- `CurrencyProvider` context wraps dashboard
- `useCurrency()` hook provides `code`, `symbol`, `setCurrency()`, `fmt(amount)`
- Persisted to `localStorage` under `renewtracker-currency`
- Format: `{symbol}{amount}` with locale-aware number formatting

---

## Cloudflare Configuration

### `astro.config.ts`
```typescript
output: "static"
site: "https://www.renewtracker.net"
integrations: [react(), sitemap({...})]
vite: { plugins: [tailwindcss()] }
```

### Sitemap Priorities
| Path | Priority | Changefreq |
|---|---|---|
| `/` | 1.0 | weekly |
| `/blog/*` | 0.7 | monthly |
| static pages | 0.8 | monthly |
| auth pages | 0.2 | yearly |
| dashboard/api | excluded | — |

### Deployment
- Cloudflare Pages auto-deploys from Git (push to `main`)
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20 (`.node-version`)
- `public/_redirects`: `/sitemap.xml` → `/sitemap-index.xml` 301

### Pages Functions Polyfill
`src/worker-entry.ts` provides a `MessageChannel` polyfill for Cloudflare Workers runtime (missing `MessageChannel` implementation).

---

## Environment Variables

```bash
# Required
PUBLIC_SUPABASE_URL       # Supabase project URL
PUBLIC_SUPABASE_ANON_KEY  # Supabase anon/public key

# Required for admin functions
SUPABASE_SERVICE_ROLE_KEY # Supabase service_role key (keep secret)
```

---

## Development

```bash
# Install
npm install

# Start dev server
npm run dev

# Build
npm run build

# Preview built site
npm run preview

# Deploy to Cloudflare Pages
npm run cf:deploy
```

---

## Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| astro | ^5.0.0 | SSG framework |
| @astrojs/cloudflare | ^12.0.0 | Cloudflare adapter |
| @astrojs/react | ^4.0.0 | React integration |
| @astrojs/sitemap | ^3.7.3 | Sitemap generation |
| @supabase/supabase-js | ^2.108.2 | Supabase client |
| @supabase/ssr | ^0.12.0 | SSR auth helpers |
| react | ^19.0.0 | UI library |
| tailwindcss | ^4.0.0 | CSS framework |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite plugin |
| recharts | ^3.9.0 | Charting |
| lucide-react | ^1.21.0 | Icons |
| class-variance-authority | ^0.7.1 | Component variants |
| radix-ui | ^1.6.0 | Accessible UI primitives |
| wrangler | ^3.0.0 | Cloudflare CLI |

---

## File Tree (complete)

```
renewtracker/
├── .env.local
├── .gitignore
├── .node-version
├── .npmrc
├── AGENTS.md
├── CLAUDE.md
├── astro.config.ts
├── components.json
├── package-lock.json
├── package.json
├── supabase-schema.sql
├── tsconfig.json
├── src/
│   ├── env.d.ts
│   ├── worker-entry.ts
│   ├── styles/
│   │   └── globals.css
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── login.astro
│   │   ├── register.astro
│   │   ├── forgot-password.astro
│   │   ├── reset-password.astro
│   │   ├── blog.astro
│   │   ├── blog/
│   │   │   └── [slug].astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── admin.astro
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── callback.astro
│   │   └── dashboard/
│   │       ├── index.astro
│   │       ├── subscriptions.astro
│   │       ├── bills.astro
│   │       ├── reminders.astro
│   │       ├── payment-history.astro
│   │       └── settings.astro
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── HomeContent.tsx
│   │   ├── BlogCoverIcon.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   ├── ContactForm.tsx
│   │   ├── admin/
│   │   │   └── AdminApp.tsx
│   │   ├── dashboard/
│   │   │   ├── DashboardShell.tsx
│   │   │   ├── DashboardOverviewContent.tsx
│   │   │   ├── ItemsPage.tsx
│   │   │   ├── PaymentHistoryContent.tsx
│   │   │   ├── RemindersContent.tsx
│   │   │   └── SettingsContent.tsx
│   │   └── ui/
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── progress.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       └── tabs.tsx
│   └── lib/
│       ├── blog.ts
│       ├── currency.tsx
│       ├── utils.ts
│       └── supabase/
│           ├── client.ts
│           └── admin.ts
├── functions/
│   └── api/
│       ├── auth/
│       │   └── callback.ts
│       ├── account/
│       │   └── delete.ts
│       └── admin/
│           └── users.ts
├── supabase/
│   └── migrations/
│       └── 002_payment_history.sql
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-icon.png
│   ├── robots.txt
│   ├── _redirects
│   └── llms.txt
└── dist/
```

---

## Key Implementation Details

### Dashboard SPA Architecture
All dashboard pages share a single `DashboardShell` React component. The shell handles sidebar navigation, currency selection, and responsive layout (mobile hamburger, desktop fixed sidebar). Sub-pages are rendered as React components mapped by route path.

### ItemsPage Dual Mode
`ItemsPage` accepts a `mode` prop (`"subscriptions"` or `"bills"`). In subscriptions mode, it shows only entertainment/tech/lifestyle categories. In bills mode, it shows living/financial/other categories. Both share the same CRUD logic and form.

### Payment History Flow
When a user marks a subscription as paid, a record is inserted into `payment_history` and the subscription's `next_billing_date` is advanced by one billing cycle. The chart and breakdown components query `payment_history` for trend data and aggregate by category.

### Auth Callback
The OAuth callback function (`functions/api/auth/callback.ts`) manually parses cookies from the request, calls `exchangeCodeForSession()`, then serializes the returned cookies into `Set-Cookie` headers. This avoids the need for a full SSR framework.

### SEO Strategy
- Meta keywords tag in `BaseLayout.astro` has all 180+ targeted keywords
- Each blog post integrates keywords naturally in excerpts and content
- Competitor comparison articles target brand keywords (Rocket Money, Bobby, Subby, Truebill)
- Country-specific keywords (Nepal, India, Japan) distributed across posts
- Sitemap with priority tiers, automatic blog post inclusion

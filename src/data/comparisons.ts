export type ComparisonEntry = {
  slug: string;
  title: string;
  competitorName: string;
  competitorUrl?: string;
  description: string;
  prosRenewTracker: string[];
  prosCompetitor: string[];
  features: { feature: string; renewTracker: string; competitor: string }[];
  pricing: { plan: string; renewTracker: string; competitor: string }[];
  faq: { q: string; a: string }[];
};

export const comparisons: ComparisonEntry[] = [
  {
    slug: "renewtracker-vs-rocket-money",
    title: "RenewTracker vs Rocket Money",
    competitorName: "Rocket Money",
    competitorUrl: "https://www.rocketmoney.com",
    description:
      "Comparing RenewTracker and Rocket Money (formerly Truebill) to help you decide which subscription management tool is right for you.",
    prosRenewTracker: [
      "Free forever with no premium paywalls or subscription fees",
      "Specialized in renewal tracking with proactive reminders via email and push",
      "Supports domain, hosting, SSL, and SaaS renewals—not just bills",
      "Lightweight and privacy-focused with no bank account linking required",
    ],
    prosCompetitor: [
      "Negotiates bills on your behalf to lower cable, internet, and phone costs",
      "Full subscription cancellation service via concierge team",
      "Provides a net worth dashboard and spending insights across all accounts",
      "Mature platform with millions of users and extensive bank integrations",
    ],
    features: [
      {
        feature: "Price",
        renewTracker: "Free",
        competitor: "Free tier + Premium at $4–$12/month",
      },
      {
        feature: "Platform",
        renewTracker: "Web, iOS, Android",
        competitor: "iOS, Android, Web",
      },
      {
        feature: "Renewal Reminders",
        renewTracker: "Email + push notifications with custom lead times",
        competitor: "Email alerts for upcoming bills",
      },
      {
        feature: "Bill Negotiation",
        renewTracker: "Not available",
        competitor: "Automated negotiation concierge service",
      },
      {
        feature: "Subscription Cancellation",
        renewTracker: "Manual tracking and reminders",
        competitor: "Concierge cancellation service",
      },
      {
        feature: "Domain & Hosting Tracking",
        renewTracker: "Built-in support for domains, hosting, SSL certs",
        competitor: "Not supported",
      },
      {
        feature: "Multi-Currency Support",
        renewTracker: "Yes",
        competitor: "USD only",
      },
      {
        feature: "Bank Account Linking",
        renewTracker: "Not required",
        competitor: "Required for full functionality",
      },
    ],
    pricing: [
      {
        plan: "Free",
        renewTracker: "$0",
        competitor: "$0 (limited)",
      },
      {
        plan: "Premium",
        renewTracker: "—",
        competitor: "$4–$12/month",
      },
      {
        plan: "Concierge",
        renewTracker: "—",
        competitor: "$12–$36/year (cancellation service)",
      },
    ],
    faq: [
      {
        q: "Does RenewTracker offer bill negotiation like Rocket Money?",
        a: "No. RenewTracker focuses on proactive renewal tracking and reminders for subscriptions, domains, and hosting services. It does not negotiate bills on your behalf.",
      },
      {
        q: "Can I use RenewTracker without linking my bank account?",
        a: "Yes. RenewTracker is designed to work without bank account access. You manually add subscriptions and services you want to track, keeping your financial data private.",
      },
      {
        q: "Which is better for tracking domain and hosting renewals?",
        a: "RenewTracker is the clear choice for domain, hosting, and SSL certificate renewals. Rocket Money is focused on personal finance bills and standard subscriptions.",
      },
      {
        q: "Is RenewTracker really free?",
        a: "Yes, RenewTracker is completely free with no paid tiers. All features including reminders, multi-currency support, and category management are available at no cost.",
      },
    ],
  },
  {
    slug: "renewtracker-vs-subby",
    title: "RenewTracker vs Subby",
    competitorName: "Subby",
    competitorUrl: "https://subby.co",
    description:
      "A detailed comparison between RenewTracker and Subby for tracking subscriptions and managing recurring expenses.",
    prosRenewTracker: [
      "Completely free with no premium tiers or locked features",
      "Covers technical renewals like domains, hosting, and SSL certificates",
      "Multi-currency support out of the box",
      "Privacy-first approach with no bank account linking",
    ],
    prosCompetitor: [
      "Beautiful native iOS design with interactive charts",
      "iCloud sync across all your Apple devices seamlessly",
      "Automatic currency conversion with live exchange rates",
      "Widgets and Siri shortcuts for quick glance at upcoming bills",
    ],
    features: [
      {
        feature: "Price",
        renewTracker: "Free",
        competitor: "Free with optional tips/iAP",
      },
      {
        feature: "Platform",
        renewTracker: "Web, iOS, Android",
        competitor: "iOS only",
      },
      {
        feature: "Renewal Reminders",
        renewTracker: "Email + push notifications",
        competitor: "Push notifications only",
      },
      {
        feature: "Domain & Hosting Tracking",
        renewTracker: "Yes, built-in",
        competitor: "No",
      },
      {
        feature: "Multi-Currency Support",
        renewTracker: "Yes",
        competitor: "Yes (live rates)",
      },
      {
        feature: "Categories",
        renewTracker: "Custom categories with color coding",
        competitor: "Predefined categories with icons",
      },
      {
        feature: "Data Export",
        renewTracker: "CSV export",
        competitor: "CSV export",
      },
      {
        feature: "Cross-Platform Sync",
        renewTracker: "Cloud sync across web, iOS, and Android",
        competitor: "iCloud sync (Apple devices only)",
      },
    ],
    pricing: [
      {
        plan: "Free",
        renewTracker: "$0",
        competitor: "$0 (full features)",
      },
      {
        plan: "Tip Jar",
        renewTracker: "—",
        competitor: "Optional tips ($1–$10)",
      },
      {
        plan: "Premium",
        renewTracker: "—",
        competitor: "—",
      },
    ],
    faq: [
      {
        q: "Is Subby available on Android?",
        a: "No, Subby is currently iOS-only. RenewTracker is available on Web, iOS, and Android, making it a better choice if you use multiple platforms.",
      },
      {
        q: "Can I track domain renewals with Subby?",
        a: "Subby is designed for standard personal subscriptions like Netflix and Spotify. It does not support domain, hosting, or SSL certificate renewal tracking.",
      },
      {
        q: "How do reminders compare between the two?",
        a: "RenewTracker offers both email and push notifications with customizable lead times. Subby relies solely on push notifications through the iOS app.",
      },
      {
        q: "Which app has better multi-currency support?",
        a: "Both support multiple currencies. Subby uses live exchange rates for automatic conversion, while RenewTracker lets you set amounts in any currency manually.",
      },
    ],
  },
  {
    slug: "renewtracker-vs-bobby",
    title: "RenewTracker vs Bobby",
    competitorName: "Bobby",
    competitorUrl: "https://bobbyapp.co",
    description:
      "A side-by-side comparison of RenewTracker and Bobby, two popular subscription tracking apps with different strengths.",
    prosRenewTracker: [
      "Free forever with no in-app purchases or premium tiers",
      "Available on web, iOS, and Android for cross-platform use",
      "Purpose-built for tracking domain, hosting, and SSL expirations",
      "Email reminders in addition to push notifications",
    ],
    prosCompetitor: [
      "Clean, minimalist interface that is intuitive and easy to use",
      "Supports split payments to track shared subscriptions with others",
      "Automatic currency conversion with real-time exchange rates",
      "Dark mode and widget support on iOS",
    ],
    features: [
      {
        feature: "Price",
        renewTracker: "Free",
        competitor: "Free + Bobby 2 Pro ($3.99 one-time)",
      },
      {
        feature: "Platform",
        renewTracker: "Web, iOS, Android",
        competitor: "iOS only",
      },
      {
        feature: "Renewal Reminders",
        renewTracker: "Email + push notifications",
        competitor: "Push notifications only",
      },
      {
        feature: "Domain & Hosting",
        renewTracker: "Yes",
        competitor: "No",
      },
      {
        feature: "Split Payments",
        renewTracker: "Not supported",
        competitor: "Yes, per-subscription split tracking",
      },
      {
        feature: "Multi-Currency",
        renewTracker: "Yes",
        competitor: "Yes (live rates)",
      },
      {
        feature: "Categories",
        renewTracker: "Custom categories with colors",
        competitor: "Predefined with icons",
      },
      {
        feature: "iCloud Sync",
        renewTracker: "Cloud sync (multi-platform)",
        competitor: "iCloud sync (Apple only)",
      },
    ],
    pricing: [
      {
        plan: "Free",
        renewTracker: "$0",
        competitor: "$0 (basic)",
      },
      {
        plan: "Pro",
        renewTracker: "—",
        competitor: "$3.99 one-time (Bobby 2)",
      },
      {
        plan: "Platform",
        renewTracker: "Web, iOS, Android",
        competitor: "iOS only",
      },
    ],
    faq: [
      {
        q: "Does Bobby have an Android app?",
        a: "No, Bobby is iOS-only. RenewTracker is available on Web, iOS, and Android.",
      },
      {
        q: "Can I share subscriptions with others in RenewTracker?",
        a: "RenewTracker does not currently support split payments or shared subscriptions. Bobby offers per-subscription split tracking for shared bills.",
      },
      {
        q: "Which app is better for technical users?",
        a: "RenewTracker is better for technical users who need to track domains, hosting, and SSL certificates in addition to standard SaaS subscriptions.",
      },
      {
        q: "Is there a one-time purchase option?",
        a: "RenewTracker is completely free with no purchases of any kind. Bobby offers a free version plus Bobby 2 Pro at a one-time cost of $3.99.",
      },
    ],
  },
  {
    slug: "renewtracker-vs-truebill",
    title: "RenewTracker vs Truebill",
    competitorName: "Truebill",
    competitorUrl: "https://www.truebill.com",
    description:
      "Comparing RenewTracker with Truebill (now part of Rocket Money) to understand how renewal-focused tracking differs from full financial management.",
    prosRenewTracker: [
      "Focused exclusively on renewal tracking with no financial data required",
      "Free with no subscription fee for the service itself",
      "Supports technical renewals: domains, hosting, and SSL certificates",
      "Multi-currency support for international users",
    ],
    prosCompetitor: [
      "Comprehensive financial dashboard with spending categorization",
      "Bill negotiation service to reduce cable, internet, and phone costs",
      "Subscription cancellation concierge handles the process for you",
      "Net worth tracking with linked bank accounts and investments",
    ],
    features: [
      {
        feature: "Price",
        renewTracker: "Free",
        competitor: "Free + Premium ($4–$12/month)",
      },
      {
        feature: "Platform",
        renewTracker: "Web, iOS, Android",
        competitor: "iOS, Android, Web",
      },
      {
        feature: "Renewal Reminders",
        renewTracker: "Email + push notifications with customizable lead times",
        competitor: "Basic email alerts",
      },
      {
        feature: "Bill Negotiation",
        renewTracker: "Not available",
        competitor: "Automated negotiation service",
      },
      {
        feature: "Cancellation Service",
        renewTracker: "Manual tracking",
        competitor: "Concierge handles cancellation",
      },
      {
        feature: "Domain & Hosting",
        renewTracker: "Built-in support",
        competitor: "Not supported",
      },
      {
        feature: "Multi-Currency",
        renewTracker: "Yes",
        competitor: "USD only",
      },
      {
        feature: "Bank Linking",
        renewTracker: "Not required",
        competitor: "Required for full features",
      },
    ],
    pricing: [
      {
        plan: "Free",
        renewTracker: "$0",
        competitor: "$0 (limited)",
      },
      {
        plan: "Premium",
        renewTracker: "—",
        competitor: "$4–$12/month",
      },
      {
        plan: "Concierge",
        renewTracker: "—",
        competitor: "$12–$36/year",
      },
    ],
    faq: [
      {
        q: "Is Truebill the same as Rocket Money?",
        a: "Yes, Truebill rebranded to Rocket Money in 2021. The core features remain the same: bill negotiation, subscription tracking, and financial management.",
      },
      {
        q: "Do I need to link my bank account to use RenewTracker?",
        a: "No. RenewTracker is designed as a privacy-first tool. You manually add subscriptions and services to track, and no bank or credit card linking is required.",
      },
      {
        q: "Which service is better for tracking non-financial subscriptions?",
        a: "RenewTracker is better for technical subscriptions like domains, hosting plans, and SSL certificates. Truebill focuses on consumer bills and standard subscriptions.",
      },
      {
        q: "Can Truebill track domain renewals?",
        a: "No, Truebill does not support domain, hosting, or SSL certificate tracking. It is designed for personal financial subscriptions and bills.",
      },
    ],
  },
  {
    slug: "renewtracker-vs-mint",
    title: "RenewTracker vs Mint",
    competitorName: "Mint",
    competitorUrl: "https://mint.intuit.com",
    description:
      "Comparing RenewTracker with Mint by Intuit to see how a dedicated renewal tracker stacks up against a full-featured personal finance platform.",
    prosRenewTracker: [
      "Focused on renewal tracking with proactive reminders well in advance",
      "Tracks technical subscriptions like domains, hosting, and SSL certs",
      "No financial data sharing or bank account linking required",
      "Completely free with no ads or upsells",
    ],
    prosCompetitor: [
      "Comprehensive personal finance hub with budgets, goals, and credit score",
      "Automatic transaction import and categorization from thousands of banks",
      "Investment tracking and net worth dashboard",
      "Bill payment tracking and alerts for unusual spending",
    ],
    features: [
      {
        feature: "Price",
        renewTracker: "Free",
        competitor: "Free (ad-supported)",
      },
      {
        feature: "Platform",
        renewTracker: "Web, iOS, Android",
        competitor: "Web, iOS, Android",
      },
      {
        feature: "Renewal Reminders",
        renewTracker: "Email + push with custom lead times",
        competitor: "Bill reminders only",
      },
      {
        feature: "Domain & Hosting",
        renewTracker: "Yes",
        competitor: "No",
      },
      {
        feature: "Budgeting",
        renewTracker: "Not available",
        competitor: "Full budgeting tools",
      },
      {
        feature: "Credit Score",
        renewTracker: "Not available",
        competitor: "Free credit score monitoring",
      },
      {
        feature: "Multi-Currency",
        renewTracker: "Yes",
        competitor: "USD only",
      },
      {
        feature: "Auto Transaction Import",
        renewTracker: "Manual entry",
        competitor: "Automatic via bank sync",
      },
    ],
    pricing: [
      {
        plan: "Free",
        renewTracker: "$0",
        competitor: "$0 (with ads)",
      },
      {
        plan: "Premium",
        renewTracker: "—",
        competitor: "—",
      },
      {
        plan: "Ads",
        renewTracker: "No ads",
        competitor: "Ad-supported with partner offers",
      },
    ],
    faq: [
      {
        q: "Does Mint track domain and hosting renewals?",
        a: "No, Mint is a personal finance platform focused on budgeting, bills, and spending. It does not support tracking domain, hosting, or SSL certificate renewals.",
      },
      {
        q: "Is RenewTracker better for subscription-only tracking?",
        a: "If you only need to track subscriptions and renewals without budgeting or financial management, RenewTracker is simpler, more focused, and free of ads.",
      },
      {
        q: "Can RenewTracker import transactions automatically?",
        a: "No, RenewTracker uses manual entry. Mint automatically imports transactions from linked bank accounts and credit cards.",
      },
      {
        q: "Which app supports multiple currencies?",
        a: "RenewTracker supports multiple currencies. Mint is USD-only, which limits its usefulness for international users.",
      },
    ],
  },
  {
    slug: "renewtracker-vs-ynab",
    title: "RenewTracker vs YNAB",
    competitorName: "YNAB (You Need A Budget)",
    competitorUrl: "https://www.ynab.com",
    description:
      "A comparison between RenewTracker and YNAB to help you choose between a dedicated renewal tracker and a proactive budgeting system.",
    prosRenewTracker: [
      "Free forever with no subscription or monthly fee",
      "Specialized renewal tracking with multi-channel reminders",
      "Supports domain, hosting, SSL, and SaaS subscription renewals",
      "Privacy-focused with no bank account linking needed",
    ],
    prosCompetitor: [
      "Proactive zero-based budgeting methodology that changes spending habits",
      "Goal tracking with age-of-money metrics and spending reports",
      "Direct bank import for automatic transaction syncing",
      "Strong community, live workshops, and extensive educational resources",
    ],
    features: [
      {
        feature: "Price",
        renewTracker: "Free",
        competitor: "$14.99/month or $99/year (34-day free trial)",
      },
      {
        feature: "Platform",
        renewTracker: "Web, iOS, Android",
        competitor: "Web, iOS, Android, Apple Watch",
      },
      {
        feature: "Renewal Reminders",
        renewTracker: "Email + push with custom lead times",
        competitor: "Goal-based reminders for bills",
      },
      {
        feature: "Domain & Hosting",
        renewTracker: "Yes",
        competitor: "No (generic categories only)",
      },
      {
        feature: "Budgeting Methodology",
        renewTracker: "Not available",
        competitor: "Zero-based budgeting with four rules",
      },
      {
        feature: "Multi-Currency",
        renewTracker: "Yes",
        competitor: "Yes (limited)",
      },
      {
        feature: "Bank Sync",
        renewTracker: "Not available",
        competitor: "Direct import with 12,000+ institutions",
      },
      {
        feature: "Reporting",
        renewTracker: "Basic spending by category",
        competitor: "Detailed spending reports, net worth, income/expense",
      },
    ],
    pricing: [
      {
        plan: "Free",
        renewTracker: "$0",
        competitor: "34-day free trial",
      },
      {
        plan: "Monthly",
        renewTracker: "—",
        competitor: "$14.99/month",
      },
      {
        plan: "Yearly",
        renewTracker: "—",
        competitor: "$99/year",
      },
    ],
    faq: [
      {
        q: "Is YNAB good for tracking subscription renewals?",
        a: "YNAB can track subscriptions as recurring budget categories or goals, but it is not specialized for renewal tracking with proactive reminders like RenewTracker.",
      },
      {
        q: "Does RenewTracker offer budgeting features?",
        a: "No, RenewTracker is focused solely on tracking subscriptions, domains, and hosting renewals. YNAB is a full budgeting platform with a proven methodology.",
      },
      {
        q: "Which is more affordable?",
        a: "RenewTracker is completely free. YNAB costs $14.99/month or $99/year after a 34-day free trial, though many users find the budgeting framework worth the cost.",
      },
      {
        q: "Can I track domain renewals in YNAB?",
        a: "You can create a category for domain costs in YNAB, but it won't provide specialized renewal reminders, expiration date tracking, or integration with registrar data.",
      },
    ],
  },
];

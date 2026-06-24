export type ToolEntry = {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  category: "calculator" | "checker" | "planner";
  component: string;
  faq: { q: string; a: string }[];
};

export const tools: ToolEntry[] = [
  {
    slug: "subscription-calculator",
    title: "Subscription Cost Calculator",
    description:
      "Calculate your total monthly and annual spending on all active subscriptions with this free online subscription calculator.",
    metaDescription:
      "Free subscription cost calculator to total your monthly and annual recurring spending across all your subscriptions, domains, and services.",
    category: "calculator",
    component: "SubscriptionCalculator",
    faq: [
      {
        q: "How does the subscription calculator work?",
        a: "Enter each subscription name, cost, billing cycle (monthly/yearly), and next renewal date. The calculator automatically sums your total recurring spending.",
      },
      {
        q: "Can I save my subscription list for later?",
        a: "The calculator works in your browser. You can export the results as CSV or use RenewTracker's full dashboard to save and track subscriptions permanently.",
      },
      {
        q: "Does the calculator support different currencies?",
        a: "Yes, select your preferred currency and the calculator will display all amounts in that currency. Conversion happens based on your input.",
      },
    ],
  },
  {
    slug: "renewal-reminder-tool",
    title: "Renewal Reminder Planner",
    description:
      "Plan and schedule proactive reminders for all your subscription, domain, and service renewals so you never miss an expiration date.",
    metaDescription:
      "Smart renewal reminder planner that schedules email and push notifications for subscription, domain, hosting, and SSL certificate renewals.",
    category: "planner",
    component: "RenewalReminderTool",
    faq: [
      {
        q: "How far in advance should I set renewal reminders?",
        a: "We recommend 30 days for domains and SSL certificates, 7 days for subscriptions, and 14 days for hosting plans. The planner has presets for each type.",
      },
      {
        q: "Can I receive reminders via email and push?",
        a: "Yes, the renewal reminder planner supports both email notifications and push notifications through your browser or mobile device.",
      },
      {
        q: "What happens if I miss a reminder?",
        a: "The planner sends escalating reminders: a first alert at your chosen lead time, a follow-up at 7 days, and a final urgent notice 24 hours before expiry.",
      },
    ],
  },
  {
    slug: "monthly-subscription-calculator",
    title: "Monthly Subscription Spending Calculator",
    description:
      "See exactly how much you spend on subscriptions each month and identify opportunities to save money.",
    metaDescription:
      "Free monthly subscription spending calculator that totals all your recurring monthly costs and helps identify savings opportunities across services.",
    category: "calculator",
    component: "MonthlySubscriptionCalculator",
    faq: [
      {
        q: "What counts as a monthly subscription?",
        a: "Any service that bills you monthly, including streaming services, SaaS tools, gym memberships, insurance premiums, and app subscriptions.",
      },
      {
        q: "How do I calculate annual subscriptions as monthly costs?",
        a: "The calculator automatically divides annual subscription costs by 12 to give you a true monthly spending picture, including both monthly and yearly bills.",
      },
      {
        q: "Can I compare my spending to averages?",
        a: "The calculator shows your total against typical spending benchmarks so you can see if your subscription costs are above or below average.",
      },
    ],
  },
  {
    slug: "yearly-subscription-calculator",
    title: "Yearly Subscription Cost Calculator",
    description:
      "Project your total annual subscription spending and see how much you could save by switching to annual billing where available.",
    metaDescription:
      "Free yearly subscription cost calculator that projects your annual recurring spending and compares monthly vs annual billing options.",
    category: "calculator",
    component: "YearlySubscriptionCalculator",
    faq: [
      {
        q: "How much can I save with annual billing?",
        a: "Many services offer 15–25% discounts for annual billing. The calculator shows potential savings by comparing monthly vs yearly total costs.",
      },
      {
        q: "Does the calculator include one-time purchases?",
        a: "No, this calculator is for recurring subscription costs only. One-time purchases should not be included for accurate annual projections.",
      },
      {
        q: "Can I export the yearly projection?",
        a: "Yes, you can download your yearly subscription projection as a CSV file for budgeting and financial planning purposes.",
      },
    ],
  },
  {
    slug: "domain-expiry-calculator",
    title: "Domain Expiration Date Calculator",
    description:
      "Calculate when your domain will expire based on the registration or last renewal date and the renewal term length.",
    metaDescription:
      "Free domain expiration date calculator that computes exact expiry dates based on registration or last renewal date and term length in years.",
    category: "calculator",
    component: "DomainExpiryCalculator",
    faq: [
      {
        q: "How accurate is the domain expiry calculator?",
        a: "The calculator is accurate based on the dates and terms you provide. For the most authoritative date, always check your registrar's dashboard.",
      },
      {
        q: "Does the calculator account for grace periods?",
        a: "It calculates the exact expiration date. Grace periods vary by registrar and TLD, so we recommend not relying on grace periods to keep domains active.",
      },
      {
        q: "Can I calculate expiry for multiple domains at once?",
        a: "Yes, you can add multiple domains to the calculator and see all expiration dates in a single table view.",
      },
    ],
  },
  {
    slug: "hosting-renewal-calculator",
    title: "Hosting Renewal Cost Calculator",
    description:
      "Calculate your hosting renewal costs including introductory vs renewal pricing to plan your budget accurately.",
    metaDescription:
      "Free hosting renewal cost calculator that compares introductory rates vs renewal prices for web hosting, VPS, and cloud hosting plans.",
    category: "calculator",
    component: "HostingRenewalCalculator",
    faq: [
      {
        q: "Why do hosting renewal prices differ from introductory prices?",
        a: "Most hosting providers offer deep discounts on the first billing cycle to attract customers, then charge standard rates upon renewal.",
      },
      {
        q: "How can I estimate my total hosting costs over multiple years?",
        a: "Enter the introductory and renewal rates for each year. The calculator projects total cost over 1, 2, 3, and 5-year periods.",
      },
      {
        q: "Does the calculator include domain and add-on costs?",
        a: "Yes, you can add separate line items for domain renewals, SSL certificates, and any optional add-ons to get a complete hosting cost picture.",
      },
    ],
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverEmoji: string;
  content: BlogSection[];
};

export type BlogSection = {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "tip" | "warning";
  text?: string;
  items?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "stop-paying-for-subscriptions-you-forgot",
    title: "Stop Paying for Subscriptions You Forgot You Had",
    excerpt:
      "The average person pays for 4–6 subscriptions they no longer use. Here is how to find them, cancel them, and take back control of your money.",
    date: "2025-06-01",
    readTime: "4 min read",
    category: "Money Tips",
    coverEmoji: "💸",
    content: [
      {
        type: "p",
        text: "Subscription creep is real. You sign up for a free trial, forget to cancel, and suddenly three years later you are still paying $12.99 a month for something you haven't used since 2022. It happens to almost everyone.",
      },
      {
        type: "h2",
        text: "How Much Are You Actually Spending?",
      },
      {
        type: "p",
        text: "Most people massively underestimate their subscription spend. Studies consistently show that people think they spend around $80 per month on subscriptions, when the real number is often $200 or more. Streaming services, cloud storage, fitness apps, software tools, BNPL installments — it adds up fast.",
      },
      {
        type: "h2",
        text: "The Hidden Subscriptions Draining Your Account",
      },
      {
        type: "ul",
        items: [
          "Free trials that converted to paid without a reminder",
          "Annual subscriptions you forgot renew automatically",
          "Duplicate services doing the same thing (e.g. two cloud storage plans)",
          "Old memberships tied to an email you rarely check",
          "Apps that raised their prices quietly after your signup",
        ],
      },
      {
        type: "h2",
        text: "How to Find Forgotten Subscriptions",
      },
      {
        type: "ol",
        items: [
          "Check your bank or card statement for recurring charges",
          "Search your email for words like 'receipt', 'invoice', 'renews', 'subscription'",
          "Check your phone's app subscription manager (App Store or Play Store)",
          "Look through your PayPal or digital wallet recurring payments",
          "Check every card you own — forgotten charges hide on old cards",
        ],
      },
      {
        type: "h2",
        text: "How to Stay in Control Going Forward",
      },
      {
        type: "p",
        text: "Once you've audited everything, the key is a system. Use a tool like RenewTracker to log every subscription and bill, set the next billing date, and get reminded before charges hit. You will never be surprised by a renewal again.",
      },
      {
        type: "tip",
        text: "Track everything in RenewTracker — not just streaming, but rent, electricity, loan EMIs, and BNPL installments too. When you see the full picture in one dashboard, managing it becomes simple.",
      },
    ],
  },
  {
    slug: "how-to-manage-all-your-subscriptions",
    title: "How to Manage All Your Subscriptions in One Place",
    excerpt:
      "Managing Netflix, Spotify, rent, loans, and utilities across different apps is chaos. Here is a smarter approach.",
    date: "2025-06-05",
    readTime: "5 min read",
    category: "Guide",
    coverEmoji: "📋",
    content: [
      {
        type: "p",
        text: "Modern life means juggling dozens of recurring payments — streaming services, SaaS tools, rent, utilities, gym memberships, and financial obligations. The problem is that these are spread across different billing dates, payment methods, and email inboxes.",
      },
      {
        type: "h2",
        text: "The Problem With Managing Subscriptions Manually",
      },
      {
        type: "p",
        text: "Trying to track subscriptions in a spreadsheet or your head fails for a simple reason: billing dates creep up on you. You don't think about your AWS bill until you get the charge. You forget your yearly Adobe renewal until the money is already gone.",
      },
      {
        type: "h2",
        text: "Organize By Category",
      },
      {
        type: "ul",
        items: [
          "Entertainment: Netflix, Spotify, Crunchyroll, gaming subscriptions",
          "Living Essentials: Rent, electricity, water, internet, phone bill",
          "Tech & Tools: iCloud, ChatGPT Plus, Notion, Adobe CC, Microsoft 365",
          "Lifestyle: Gym, meal kits, fashion boxes, fitness apps",
          "Financial Liabilities: Credit card bills, BNPL installments, loan EMIs",
        ],
      },
      {
        type: "h2",
        text: "Set Up Reminders 7 Days in Advance",
      },
      {
        type: "p",
        text: "The ideal window for a billing reminder is 7 days. Long enough to do something about it if you want to cancel or pause, short enough that it's still top of mind when the charge happens. RenewTracker sends you reminders at 30, 15, 7, 3, and 1 day before every payment.",
      },
      {
        type: "tip",
        text: "Don't just track what you enjoy. Track everything you're obligated to pay — credit card minimums, BNPL payments, insurance premiums. Missing those has real financial consequences.",
      },
    ],
  },
  {
    slug: "bnpl-buy-now-pay-later-tracker",
    title: "BNPL and Pay Later: How to Track Installments Without Falling Behind",
    excerpt:
      "Buy Now Pay Later is convenient until you lose track of what you owe and when. Here is how to stay ahead of every installment.",
    date: "2025-06-10",
    readTime: "5 min read",
    category: "Financial",
    coverEmoji: "💳",
    content: [
      {
        type: "p",
        text: "Buy Now Pay Later (BNPL) services like Klarna, Afterpay, Zip, and Tabby have made it incredibly easy to split purchases into installments. The problem is that it's equally easy to lose track of what you owe, when payments are due, and what total debt you're carrying.",
      },
      {
        type: "h2",
        text: "The BNPL Debt Trap",
      },
      {
        type: "p",
        text: "BNPL payments are small individually. A $50 installment here, a $35 payment there. But when you have four or five active plans simultaneously, the cumulative monthly obligation can easily reach $300–500 — and you may not realize it until your account is short.",
      },
      {
        type: "h2",
        text: "Why BNPL Reminders Are Critical",
      },
      {
        type: "ul",
        items: [
          "Missed payments often carry immediate late fees, sometimes higher than credit cards",
          "Some BNPL providers report to credit bureaus — missed payments can affect your score",
          "Payment dates are staggered across providers and don't align with your paycheck",
          "It's easy to forget a plan you took out months ago",
        ],
      },
      {
        type: "h2",
        text: "How to Track BNPL in RenewTracker",
      },
      {
        type: "ol",
        items: [
          "Add each active BNPL plan as a separate entry under Financial Liabilities",
          "Set the name to something recognizable, like 'Klarna – iPhone case'",
          "Enter the installment amount and the next payment date",
          "Set billing cycle to Monthly (or Weekly for weekly installments)",
          "Add notes with the total remaining balance or number of installments left",
        ],
      },
      {
        type: "tip",
        text: "Treat every BNPL installment like a bill, not an optional payment. Add them to RenewTracker the same day you make the purchase — while it is still fresh.",
      },
    ],
  },
  {
    slug: "streaming-subscriptions-worth-it",
    title: "Are Your Streaming Subscriptions Worth It? How to Decide",
    excerpt:
      "With Netflix, Disney+, Amazon Prime, Apple TV+ and more all charging monthly, it's worth doing a regular audit. Here's how.",
    date: "2025-06-15",
    readTime: "4 min read",
    category: "Entertainment",
    coverEmoji: "📺",
    content: [
      {
        type: "p",
        text: "Streaming has replaced cable, but the bills are starting to look the same. Between Netflix, Disney+, Amazon Prime, Apple TV+, a music service, and maybe a sports platform, a household can easily spend $80–120 per month on entertainment subscriptions alone.",
      },
      {
        type: "h2",
        text: "The Cost of Streaming Fatigue",
      },
      {
        type: "p",
        text: "Most people go through phases with streaming services. You binge a show on one platform, then barely open the app for four months. You are paying for access, not usage. That is money leaving your account for no return.",
      },
      {
        type: "h2",
        text: "A Simple Audit Formula",
      },
      {
        type: "ul",
        items: [
          "Track how many hours you used each platform in the last 30 days",
          "Divide the monthly cost by hours used to get your cost per hour",
          "Anything over $3–4 per hour is worth reconsidering",
          "Identify platforms with shows you are 'planning to watch' but never do",
        ],
      },
      {
        type: "h2",
        text: "The Rotation Strategy",
      },
      {
        type: "p",
        text: "Instead of paying for five services simultaneously, subscribe to one or two at a time, binge what you want, then cancel and rotate. Most streaming services have enough content for two to three months of heavy watching. After that, switch to the next one.",
      },
      {
        type: "h2",
        text: "What You Actually Need Year-Round",
      },
      {
        type: "p",
        text: "Most households really only need one or two year-round subscriptions. A music service tends to be daily-use and worth keeping. A video platform depends on your watching habits. Everything else can be rotational.",
      },
      {
        type: "tip",
        text: "Use RenewTracker to log every streaming service and its next billing date. When you see them all on one screen with a monthly total, it becomes much easier to decide what to cut.",
      },
    ],
  },
  {
    slug: "monthly-bills-tracker-guide",
    title: "How to Track Monthly Bills So Nothing Gets Missed",
    excerpt:
      "Electricity, rent, internet, phone — missing any of these has real consequences. Here is a system that keeps every bill visible.",
    date: "2025-06-20",
    readTime: "4 min read",
    category: "Guide",
    coverEmoji: "🧾",
    content: [
      {
        type: "p",
        text: "Monthly bills are not optional. Unlike a subscription you can cancel, bills like rent, electricity, and loan EMIs come with consequences if missed — late fees, disconnection, or credit damage. Yet most people have no single place where all their bills live.",
      },
      {
        type: "h2",
        text: "The Bills Most People Forget to Track",
      },
      {
        type: "ul",
        items: [
          "Annual insurance premiums — easy to forget until the policy lapses",
          "Quarterly taxes or council fees",
          "Phone EMI payments — often auto-deducted but worth tracking",
          "Parking or storage unit fees",
          "Domain or hosting fees for personal projects",
        ],
      },
      {
        type: "h2",
        text: "Build a Master Bill List",
      },
      {
        type: "p",
        text: "Start by listing every recurring obligation you have. Go through your bank statement for the last three months and highlight anything that recurs. Separate them by category — housing, utilities, financial, tech. This alone gives you a clearer picture of your monthly obligations.",
      },
      {
        type: "h2",
        text: "Set Billing Dates, Not Just Due Dates",
      },
      {
        type: "p",
        text: "The critical date to track is the billing or due date — not the service start date. Set a reminder 7 days before so you have time to ensure your account has the funds or to take action if something is wrong.",
      },
      {
        type: "warning",
        text: "Never rely on the service provider to remind you. Utility companies and lenders may send a statement, but by that time the due date is often only 3–5 days away — leaving you no room.",
      },
      {
        type: "tip",
        text: "Add every bill to RenewTracker under Living Essentials or Financial Liabilities. Set the next billing date and let the reminders do the work. One dashboard, every obligation visible.",
      },
    ],
  },
  {
    slug: "subscription-audit-save-money",
    title: "The 30-Minute Subscription Audit That Could Save You $1,000 a Year",
    excerpt:
      "A guided exercise to find every subscription you're paying for, evaluate each one, and cut the ones you don't need.",
    date: "2025-06-25",
    readTime: "6 min read",
    category: "Money Tips",
    coverEmoji: "🔍",
    content: [
      {
        type: "p",
        text: "A subscription audit takes about 30 minutes and has a surprisingly high return. People routinely find $50–100 per month — or more — of recurring charges they had forgotten about, no longer use, or can easily replace with a free alternative.",
      },
      {
        type: "h2",
        text: "Step 1: List Every Card and Payment Method You Own",
      },
      {
        type: "p",
        text: "Subscriptions can hide across multiple cards. Make a list of every credit card, debit card, PayPal account, digital wallet, and phone billing account you have. Subscriptions get charged to wherever you put them when you signed up — often a card you rarely check.",
      },
      {
        type: "h2",
        text: "Step 2: Go Through 3 Months of Statements",
      },
      {
        type: "p",
        text: "Download or open three months of statements for each payment method. Look for any charge that appears more than once. Note the service name, amount, and how frequently it charges.",
      },
      {
        type: "h2",
        text: "Step 3: Rate Each Subscription",
      },
      {
        type: "ul",
        items: [
          "Keep: You use it regularly and it provides clear value",
          "Review: You use it occasionally — consider downgrading or replacing",
          "Cancel: You haven't used it in 30+ days or you can't remember what it is",
        ],
      },
      {
        type: "h2",
        text: "Step 4: Cancel Immediately",
      },
      {
        type: "p",
        text: "Don't add things to a 'cancel later' list. Cancel them right now, during the audit. It takes two minutes per service and the procrastination is what costs you money.",
      },
      {
        type: "h2",
        text: "Step 5: Track What Remains",
      },
      {
        type: "p",
        text: "Add every subscription you're keeping into RenewTracker. Set the billing date, amount, and category. From now on, you have a single view of everything you pay for — and you'll get reminded before each charge.",
      },
      {
        type: "tip",
        text: "Do a subscription audit every six months. Services raise prices, your usage habits change, and new subscriptions creep in. Thirty minutes twice a year keeps your recurring spend in check.",
      },
    ],
  },
  {
    slug: "gym-lifestyle-subscriptions-guide",
    title: "Gym Memberships and Lifestyle Subscriptions: Are They Worth It?",
    excerpt:
      "From gym memberships to meal kits and fashion boxes, lifestyle subscriptions are easy to sign up for and hard to cancel. Here's how to think about them.",
    date: "2025-07-01",
    readTime: "4 min read",
    category: "Lifestyle",
    coverEmoji: "🏋️",
    content: [
      {
        type: "p",
        text: "Lifestyle subscriptions tap into aspirational spending. You sign up for the gym imagining you'll go every day. You start a meal kit to eat healthier. You join a book club with plans to read more. The subscriptions represent who you want to be — not always who you actually are.",
      },
      {
        type: "h2",
        text: "The 10-Use Rule",
      },
      {
        type: "p",
        text: "A simple way to evaluate any lifestyle subscription: did you use it at least 10 times in the last month? If the answer is no, the service is costing you more than it's worth. A $50/month gym membership used twice is $25 per session — you'd be better off buying class passes.",
      },
      {
        type: "h2",
        text: "Common Lifestyle Subscriptions and Their Red Flags",
      },
      {
        type: "ul",
        items: [
          "Gym memberships: Low-cost options often have hidden fees or lock-in contracts",
          "Meal kits: High per-meal cost; most people pause/cancel after a few months",
          "Fashion boxes: High markup, difficult return process, subscription inertia",
          "Meditation and fitness apps: Often used intensively for a month then forgotten",
          "Gaming subscriptions: Easy to keep active 'just in case' without actually playing",
        ],
      },
      {
        type: "h2",
        text: "The Pause Before You Subscribe Rule",
      },
      {
        type: "p",
        text: "Before signing up for any lifestyle subscription, add it to RenewTracker first — with a billing date 30 days from now and the monthly cost. Seeing it as a future charge before it happens makes the decision much more deliberate.",
      },
      {
        type: "tip",
        text: "Annual gym memberships often seem cheaper per month but lock you in. If you've been a member for less than six months, stick to monthly billing until you've proven the habit.",
      },
    ],
  },
  {
    slug: "tech-tools-software-subscriptions",
    title: "Tech and Software Subscriptions: What You Actually Need",
    excerpt:
      "Between iCloud, ChatGPT, Adobe, Notion, GitHub, and a dozen others, tech subscriptions can silently drain $100+ per month. Here's how to audit them.",
    date: "2025-07-05",
    readTime: "5 min read",
    category: "Tech",
    coverEmoji: "💻",
    content: [
      {
        type: "p",
        text: "Tech subscriptions are sneaky. They often start as free tiers, then a feature you need is moved to paid. Or you sign up during a promotion and forget about it. Or you keep paying for a tool you replaced months ago.",
      },
      {
        type: "h2",
        text: "The Most Commonly Over-Subscribed Tech Services",
      },
      {
        type: "ul",
        items: [
          "Cloud storage: People often pay for iCloud AND Google One AND Dropbox",
          "AI tools: Multiple AI subscriptions for services that do the same thing",
          "Design tools: Canva Pro, Figma, and Adobe CC for occasional use",
          "Password managers: Multiple accounts when one is enough",
          "Domain and hosting: Forgotten domains registered 'just in case'",
        ],
      },
      {
        type: "h2",
        text: "Consolidation vs. Duplication",
      },
      {
        type: "p",
        text: "Before adding a new tech subscription, ask if you already pay for something that does the same job. Microsoft 365 includes OneDrive — do you still need Dropbox? Apple One bundles iCloud, Apple Music, and Apple TV+ — are you paying for those separately?",
      },
      {
        type: "h2",
        text: "Annual vs. Monthly for Tech Tools",
      },
      {
        type: "p",
        text: "Most SaaS tools offer 20–40% discounts for annual billing. If you've used a tool consistently for at least six months and plan to continue, switching to annual billing is usually the right move. But don't pay annually for something you're still evaluating.",
      },
      {
        type: "tip",
        text: "List every tech subscription in RenewTracker's Tech & Tools category. You'll often notice duplicates or services you haven't opened in weeks. The dashboard makes it easy to make decisions you'd otherwise keep putting off.",
      },
    ],
  },
  {
    slug: "credit-card-bills-tracker",
    title: "Never Miss a Credit Card Payment Again",
    excerpt:
      "A missed credit card payment can mean fees, interest charges, and damage to your credit score. Here's a simple system to make sure it never happens.",
    date: "2025-07-10",
    readTime: "4 min read",
    category: "Financial",
    coverEmoji: "💳",
    content: [
      {
        type: "p",
        text: "Credit cards are one of the most consequential recurring financial obligations. A missed minimum payment triggers immediate late fees, potentially a penalty APR, and a negative mark on your credit report. And yet many people miss credit card due dates simply because they lost track.",
      },
      {
        type: "h2",
        text: "Why Credit Card Reminders Are Essential",
      },
      {
        type: "ul",
        items: [
          "Due dates vary by card and don't always align with payday",
          "Statement closing dates and payment due dates are different and easy to confuse",
          "Multiple cards mean multiple dates to track",
          "Travel, emergencies, or a busy week can push the due date out of your mind",
          "Autopay doesn't always work — banks sometimes have technical issues",
        ],
      },
      {
        type: "h2",
        text: "Track the Minimum, Pay the Full Balance",
      },
      {
        type: "p",
        text: "When you add your credit card to RenewTracker under Financial Liabilities, enter the minimum payment amount and the due date. The goal is to never miss a payment — but of course, always aim to pay the full statement balance to avoid interest.",
      },
      {
        type: "h2",
        text: "Set Reminders 7 Days Early",
      },
      {
        type: "p",
        text: "Seven days is the ideal lead time for credit card payment reminders. It gives you enough time to transfer funds if needed, check your balance, and confirm autopay is set up correctly — without being so far in advance that you forget again.",
      },
      {
        type: "warning",
        text: "Autopay for the minimum payment is a safety net, not a strategy. Always check your statement and aim to pay the full balance. Minimum payments on high-interest cards can take years to clear.",
      },
      {
        type: "tip",
        text: "Add each credit card as a separate entry in RenewTracker's Financial Liabilities section. Note the due date and the rough monthly amount. You'll never miss a payment with a 7-day reminder.",
      },
    ],
  },
  {
    slug: "how-much-do-subscriptions-cost-monthly",
    title: "How Much Do Subscriptions Really Cost? The Average Person's Bill",
    excerpt:
      "When you add up every subscription, streaming service, app, and bill, the monthly total surprises most people. Here's the data.",
    date: "2025-07-15",
    readTime: "4 min read",
    category: "Data",
    coverEmoji: "📊",
    content: [
      {
        type: "p",
        text: "Research consistently shows that people underestimate their subscription spending by 40–50%. The average smartphone user has over 30 apps installed, and many of those come with subscriptions. Add in rent, utilities, insurance, and financial obligations, and the monthly total can be startling.",
      },
      {
        type: "h2",
        text: "Typical Monthly Subscription Breakdown",
      },
      {
        type: "ul",
        items: [
          "Entertainment (streaming + music): $30–80/month",
          "Living essentials (utilities + phone): $200–500/month",
          "Tech and software tools: $20–60/month",
          "Lifestyle (gym, fitness, lifestyle boxes): $30–80/month",
          "Financial liabilities (BNPL, EMIs, credit cards): $100–300/month",
        ],
      },
      {
        type: "h2",
        text: "The Subscription Tipping Point",
      },
      {
        type: "p",
        text: "Research shows that most people start feeling subscription fatigue when their total monthly recurring spend crosses 15–20% of their take-home income. Below that threshold, subscriptions feel manageable. Above it, they start feeling like a burden.",
      },
      {
        type: "h2",
        text: "How to Know Your Own Number",
      },
      {
        type: "p",
        text: "The first step is getting an accurate number. Add every recurring payment you make into RenewTracker — not just the obvious ones, but everything. Once you see the monthly and yearly totals, you can make informed decisions about where to cut.",
      },
      {
        type: "tip",
        text: "Many people discover $200–300 in monthly subscriptions they had forgotten about after their first RenewTracker audit. Seeing the number forces clarity that guessing never provides.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}

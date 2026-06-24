I already have an existing production Astro.js project called RenewTracker.net.


DO NOT replace existing code unless necessary.

Your task is to EXTEND the existing codebase while preserving the current architecture.

Current state: As it is.


Goal:
Transform RenewTracker.net into a scalable programmatic SEO SaaS with 1,000+ pages.

---

STEP 1: Analyze Existing Project

First inspect:

src/pages
src/components
src/layouts
src/content
src/content/blog
src/styles

Understand existing layouts, SEO components, navbar, footer, and blog structure.

Reuse them instead of creating duplicates.

---

STEP 2: Create New Routes

Add:

src/pages/track/[slug].astro
src/pages/tools/[slug].astro
src/pages/compare/[slug].astro
src/pages/domains/[slug].astro

These should integrate with existing layouts.

---

STEP 3: Create Data Files

Create:

src/data/subscriptions.ts
src/data/domains.ts
src/data/comparisons.ts
src/data/tools.ts

Store structured objects rather than hardcoded pages.

---

STEP 4: Programmatic Subscription Pages

Generate pages like:

/track/netflix
/track/chatgpt
/track/canva
/track/spotify
/track/notion
/track/github-copilot
/track/midjourney
/track/claude

Support 300+ subscriptions.

Use getStaticPaths().

Each page should contain:

title
description
service name
category
pricing
billing cycle
renewal tips
how to cancel
FAQ
schema.org JSON-LD
breadcrumbs
CTA to RenewTracker

---

STEP 5: Tools Section

Create:

/tools/subscription-calculator
/tools/renewal-reminder-tool
/tools/monthly-subscription-calculator
/tools/yearly-subscription-calculator
/tools/domain-expiry-calculator
/tools/hosting-renewal-calculator

Implement client-side functionality.

Reuse existing UI styles.

---

STEP 6: Comparison Pages

Generate:

/compare/renewtracker-vs-rocket-money
/compare/renewtracker-vs-subby
/compare/renewtracker-vs-bobby
/compare/renewtracker-vs-truebill

Include:

comparison table
pros and cons
features
FAQs
schema markup

---

STEP 7: Domain Pages

Generate:

/domains/track-domain-expiry
/domains/namecheap-domain-renewal
/domains/godaddy-domain-renewal
/domains/cloudflare-domain-expiry
/domains/hostinger-renewal
/domains/ssl-certificate-expiration

---

STEP 8: Internal Linking

Automatically connect:

Blogs → Track pages
Track pages → Tool pages
Track pages → Comparison pages
Domain pages → Blog posts

Improve topical authority.

---

STEP 9: SEO

Reuse existing SEO components if available.

Otherwise create:

SeoHead.astro
Breadcrumbs.astro
FaqSection.astro

Support:

Canonical URLs
Open Graph tags
Twitter cards
JSON-LD
FAQ schema
Breadcrumb schema

---

STEP 10: Sitemap

Ensure all dynamic pages are automatically included in sitemap.xml.

---

STEP 11: Performance

Optimize for:

Cloudflare Pages
Core Web Vitals
Lazy loading
Static generation
Minimal JavaScript

---

STEP 12: Folder Structure

Extend existing structure instead of replacing it.

Target architecture:

src/
pages/
blog/
track/
tools/
compare/
domains/

data/
subscriptions.ts
tools.ts
domains.ts
comparisons.ts

components/
layouts/
content/

---

STEP 13: Output

Work incrementally.

Before writing code:

1. Analyze current project structure.
2. Show what files need to be added.
3. Explain why.
4. Then generate code file-by-file.
5. Never rewrite unrelated files.
6. Preserve existing design and blog functionality.
export type DomainEntry = {
  slug: string;
  name: string;
  description: string;
  services: string[];
  renewalTips: string[];
  faq: { q: string; a: string }[];
  pricing?: string;
  url?: string;
};

export const domains: DomainEntry[] = [
  {
    slug: "namecheap-domain-renewal",
    name: "Namecheap",
    description:
      "Namecheap is a popular domain registrar and web hosting company known for affordable pricing, free WHOIS privacy protection, and a strong stance on digital rights.",
    services: ["domain renewal", "web hosting", "SSL certificates", "email hosting"],
    renewalTips: [
      "Enable auto-renewal in your Namecheap account dashboard to avoid accidental domain expiration.",
      "Renew domains for multiple years (up to 10) to lock in current rates and save on future price increases.",
      "Use the 'Multi-Year Domain Renewal' option during checkout for a discount on registrations of 2+ years.",
      "Set calendar reminders 30 days before expiry—Namecheap sends email notices but they can land in spam.",
    ],
    faq: [
      {
        q: "When does Namecheap send renewal reminders?",
        a: "Namecheap sends renewal reminders starting 30 days before expiration, with additional reminders at 15, 7, and 1 day before expiry.",
      },
      {
        q: "Can I transfer a domain to Namecheap close to expiry?",
        a: "It is recommended to transfer domains at least 14 days before expiry. Most registrars lock transfers within 14 days of expiration.",
      },
      {
        q: "Does Namecheap offer grace periods after expiration?",
        a: "Yes, Namecheap provides a 30-day grace period after expiration during which you can renew at the standard rate. After that, a redemption fee applies.",
      },
    ],
    pricing: "Varies by TLD; .com renewals typically $13–$16/year",
    url: "https://www.namecheap.com",
  },
  {
    slug: "godaddy-domain-renewal",
    name: "GoDaddy",
    description:
      "GoDaddy is the world's largest domain registrar, offering a wide range of domain extensions, hosting services, and website building tools.",
    services: ["domain renewal", "web hosting", "SSL certificates", "email marketing", "website builder"],
    renewalTips: [
      "GoDaddy renewal prices are often higher than initial registration—compare transfer options before auto-renewing.",
      "Turn off auto-renewal early if you plan to transfer, as GoDaddy locks domains for 60 days after a transfer.",
      "Check for renewal coupon codes before paying full price; GoDaddy frequently offers discounts on renewals.",
      "Renew for 5–10 years at once to lock in current pricing and avoid annual price hikes.",
    ],
    faq: [
      {
        q: "How much does GoDaddy charge for domain renewal?",
        a: "GoDaddy .com renewal is typically $19–$22/year, significantly higher than the introductory ~$12 price. Prices vary by TLD.",
      },
      {
        q: "What is the GoDaddy domain redemption fee?",
        a: "If a domain expires and enters the redemption period, GoDaddy charges an additional fee (typically $80–$100) on top of the renewal cost to recover the domain.",
      },
      {
        q: "Can I cancel a GoDaddy domain renewal after payment?",
        a: "GoDaddy offers a 5-day money-back guarantee on domain renewals, provided the domain has not been used or configured during that period.",
      },
    ],
    pricing: ".com renewals typically $19–$22/year",
    url: "https://www.godaddy.com",
  },
  {
    slug: "cloudflare-domain-expiry",
    name: "Cloudflare",
    description:
      "Cloudflare offers domain registration at cost with no markup, making it one of the most affordable registrars. Domains are registered through their partner, Nominet.",
    services: ["domain registration", "DNS management", "CDN", "DDoS protection", "SSL"],
    renewalTips: [
      "Cloudflare sells domains at cost with no markup—renew directly through Cloudflare to avoid registrar surcharges.",
      "Enable auto-renewal to ensure your domain is renewed before expiration and avoid service disruptions.",
      "Transfer your domains to Cloudflare from other registrars to save on renewal costs and get built-in DNS and security features.",
      "Monitor your Cloudflare dashboard for renewal dates—Cloudflare sends email alerts but also provides an API for automated tracking.",
    ],
    faq: [
      {
        q: "Does Cloudflare charge extra for domain renewal?",
        a: "No, Cloudflare passes on the wholesale registry cost with no markup. You pay exactly what the registry charges for the TLD.",
      },
      {
        q: "What happens when a Cloudflare domain expires?",
        a: "Cloudflare provides a 30-day grace period for renewal at standard pricing, followed by a redemption period with additional fees.",
      },
      {
        q: "Can I use Cloudflare just for DNS without registering domains there?",
        a: "Yes, Cloudflare's DNS and CDN services work with domains registered at any registrar. You only need to change your nameservers.",
      },
    ],
    pricing: "At-cost pricing; .com renewals ~$9.15/year (no markup)",
    url: "https://www.cloudflare.com",
  },
  {
    slug: "hostinger-renewal",
    name: "Hostinger",
    description:
      "Hostinger is a budget-friendly web hosting provider known for extremely low introductory pricing, with higher renewal rates after the initial term.",
    services: ["domain registration", "web hosting", "VPS hosting", "email hosting", "SSL certificates"],
    renewalTips: [
      "Hostinger's introductory prices are significantly lower than renewal rates—plan ahead for the price jump after the first term.",
      "Lock in the best rate by choosing the longest initial billing cycle (48 months) when signing up.",
      "Set reminders 30 days before hosting renewal to evaluate whether the service still meets your needs before auto-renewal kicks in.",
      "Check if a free domain is included with your hosting plan and note when the free period ends to avoid surprise charges.",
    ],
    faq: [
      {
        q: "How much does Hostinger charge for hosting renewal?",
        a: "Hostinger renewal prices are typically 3–5x higher than introductory rates. For example, a $2.99/month plan renews at around $7.99–$9.99/month.",
      },
      {
        q: "Does Hostinger offer a grace period after expiration?",
        a: "Yes, Hostinger provides a 30-day grace period for domain renewals and a shorter period for hosting services before data is removed.",
      },
      {
        q: "Can I transfer my Hostinger domain to another registrar?",
        a: "Yes, you can transfer domains away from Hostinger. Ensure the domain is unlocked and obtain the EPP code from your Hostinger dashboard.",
      },
    ],
    pricing: "Shared hosting from $2.99/month intro, renews at $7.99–$9.99/month",
    url: "https://www.hostinger.com",
  },
  {
    slug: "hostgator-domain-renewal",
    name: "HostGator",
    description:
      "HostGator is a popular web hosting provider offering domain registration, shared hosting, VPS, and dedicated servers with competitive introductory pricing and higher renewal rates.",
    services: ["domain registration", "web hosting", "VPS hosting", "SSL certificates", "website builder"],
    renewalTips: [
      "HostGator's introductory prices are significantly lower than renewal rates — expect prices to increase 2-3x after the first term.",
      "Lock in the best rate by choosing the longest initial billing cycle (36 months) when signing up.",
      "Set reminders 30 days before hosting renewal to evaluate whether you still need the plan before auto-renewal kicks in.",
    ],
    faq: [
      {
        q: "How much does HostGator charge for hosting renewal?",
        a: "HostGator renewal prices are typically 2-3x higher than introductory rates. A $2.99/month intro plan may renew at $6.99–$8.99/month.",
      },
      {
        q: "Does HostGator offer a grace period after expiration?",
        a: "Yes, HostGator provides a grace period of approximately 30 days for domain renewals before additional fees apply.",
      },
      {
        q: "Can I transfer my HostGator domain to another registrar?",
        a: "Yes, unlock the domain in your HostGator dashboard and obtain the EPP code to transfer to any other registrar.",
      },
    ],
    pricing: "Shared hosting from $2.99/month intro, renews at $6.99–$8.99/month",
    url: "https://www.hostgator.com",
  },
  {
    slug: "ssl-certificate-expiration",
    name: "SSL Certificate Expiration",
    description:
      "SSL/TLS certificates secure website connections and have fixed validity periods. Letting an SSL certificate expire causes browser security warnings and potential downtime.",
    services: ["SSL certificate renewal", "TLS configuration", "HTTPS enforcement"],
    renewalTips: [
      "Set renewal reminders 30 days before expiry—certificate authorities (CAs) send notices, but they can be missed.",
      "Use automated tools like Certbot or ACME clients to auto-renew Let's Encrypt certificates before they expire.",
      "Validate that your certificate is correctly installed after renewal by using online SSL checker tools.",
      "Keep a centralized list of all certificates, their expiry dates, and issuing CAs to avoid missing any renewals.",
    ],
    faq: [
      {
        q: "How long are SSL certificates valid?",
        a: "As of 2023, SSL certificates are valid for a maximum of 398 days (approximately 13 months). Many CAs issue certificates for 1 year.",
      },
      {
        q: "What happens when an SSL certificate expires?",
        a: "Visitors see browser security warnings like 'Your connection is not private,' which can severely damage trust and reduce traffic to your site.",
      },
      {
        q: "Can I get a free SSL certificate?",
        a: "Yes, Let's Encrypt provides free 90-day SSL certificates that can be auto-renewed using ACME client software like Certbot.",
      },
    ],
    pricing: "Free (Let's Encrypt) to $50–$300+/year for premium/business certificates",
  },
  {
    slug: "google-domains-renewal",
    name: "Google Domains",
    description:
      "Google Domains (now managed by Squarespace) offers straightforward domain registration with transparent pricing and integration with Google Workspace.",
    services: ["domain registration", "DNS management", "email forwarding", "Google Workspace integration"],
    renewalTips: [
      "Google Domains pricing is transparent with no hidden fees—renewal prices are clearly displayed and consistent year over year.",
      "Enable auto-renewal to prevent accidental expiration; you can disable it at any time from the Google Domains dashboard.",
      "Google Domains offers free privacy protection and email forwarding—take advantage of these included benefits.",
      "Transfer domains you want to keep into Google Domains for predictable, no-surge pricing compared to other registrars.",
    ],
    faq: [
      {
        q: "Is Google Domains still active after the Squarespace acquisition?",
        a: "Google Domains was acquired by Squarespace in 2023. Existing domains continue to work, and management has transitioned to Squarespace.",
      },
      {
        q: "How much does Google Domains charge for renewal?",
        a: "Google Domains charged transparent, no-markup pricing. Under Squarespace, .com renewals remain competitive at around $12–$14/year.",
      },
      {
        q: "Can I use Google Domains with third-party hosting?",
        a: "Yes, you can point Google Domains to any hosting provider by configuring custom DNS records in the domain management dashboard.",
      },
    ],
    pricing: ".com renewals ~$12–$14/year",
    url: "https://domains.google",
  },
  {
    slug: "aws-domain-renewal",
    name: "AWS Domain Registration (Route 53)",
    description:
      "Amazon Route 53 provides domain registration integrated with AWS services, ideal for users already running infrastructure on Amazon Web Services.",
    services: ["domain registration", "DNS hosting", "health checks", "traffic routing", "AWS integration"],
    renewalTips: [
      "Route 53 renewal prices vary by TLD and are generally competitive but watch for the separate DNS hosting fee ($0.50/hosted zone/month).",
      "Use AWS Budgets to set alerts for domain renewal costs and avoid unexpected charges on your AWS bill.",
      "Automate domain renewal using AWS Lambda and Step Functions to run checks and send notifications before expiry.",
      "Enable auto-renewal in the Route 53 console, but verify your payment method is up to date to avoid failed renewals.",
    ],
    faq: [
      {
        q: "Does AWS Route 53 charge extra beyond domain renewal?",
        a: "Yes, Route 53 charges a monthly fee of $0.50 per hosted zone and $0.40 per million queries for DNS resolution, in addition to domain registration costs.",
      },
      {
        q: "What happens when a Route 53 domain expires?",
        a: "AWS provides a grace period of approximately 30 days for most TLDs, followed by a redemption period with additional fees up to $150+.",
      },
      {
        q: "Can I transfer a domain from AWS to another registrar?",
        a: "Yes, you can transfer domains from Route 53 to any registrar. Unlock the domain, obtain the authorization code, and initiate the transfer at the destination registrar.",
      },
    ],
    pricing: ".com renewals ~$10–$14/year plus $0.50/month per hosted zone",
    url: "https://aws.amazon.com/route53",
  },
  {
    slug: "porkbun-domain-renewal",
    name: "Porkbun",
    description:
      "Porkbun is an independent domain registrar known for low prices, a quirky brand, and free WHOIS privacy protection on all domains.",
    services: ["domain registration", "DNS management", "SSL certificates", "email hosting"],
    renewalTips: [
      "Porkbun consistently offers some of the lowest renewal prices—check their pricing page for transparent renewal costs before purchasing.",
      "Take advantage of Porkbun's bundled services like free WHOIS privacy and free DNS hosting, which are included at no extra cost.",
      "Renew domains for multiple years to lock in current rates, as Porkbun occasionally adjusts prices for popular TLDs.",
      "Enable push notifications through the Porkbun dashboard and also set up external reminders as a backup.",
    ],
    faq: [
      {
        q: "Are Porkbun renewal prices the same as initial prices?",
        a: "Porkbun is transparent about pricing. Renewal prices are often very close to initial registration prices, though some TLDs have a slight increase.",
      },
      {
        q: "Does Porkbun offer a grace period after domain expiration?",
        a: "Yes, Porkbun provides a grace period (typically 30 days) during which you can renew at the standard rate before redemption fees apply.",
      },
      {
        q: "How do I transfer a domain away from Porkbun?",
        a: "Unlock the domain in your Porkbun dashboard, request the EPP authorization code, and initiate the transfer at the gaining registrar.",
      },
    ],
    pricing: ".com renewals ~$10–$12/year",
    url: "https://porkbun.com",
  },
  {
    slug: "namecom-domain-renewal",
    name: "Name.com",
    description:
      "Name.com is a domain registrar and web hosting provider offering a clean dashboard, competitive pricing, and a range of domain management tools.",
    services: ["domain registration", "web hosting", "SSL certificates", "email hosting", "DNS management"],
    renewalTips: [
      "Name.com sends renewal reminders starting 60 days before expiration—use this window to review and renew early at current rates.",
      "Enable auto-renewal with a backup payment method to prevent accidental domain loss if your primary card expires.",
      "Look for Name.com coupon codes before renewing—they frequently offer small discounts on renewal orders.",
      "Consider transferring domains to Name.com if their renewal pricing is better than your current registrar's rates.",
    ],
    faq: [
      {
        q: "How much does Name.com charge for domain renewal?",
        a: "Name.com .com renewal is typically $10–$14/year, with prices varying by TLD. They are generally competitive with other major registrars.",
      },
      {
        q: "Does Name.com offer free WHOIS privacy?",
        a: "Yes, Name.com provides free WHOIS privacy protection on all domains, keeping your personal contact information hidden from public WHOIS lookups.",
      },
      {
        q: "What happens if I miss a domain renewal at Name.com?",
        a: "Name.com has a grace period (varies by TLD) followed by a redemption period with additional fees. After that, the domain may be released for public registration.",
      },
    ],
    pricing: ".com renewals ~$10–$14/year",
    url: "https://www.name.com",
  },
  {
    slug: "ionos-domain-renewal",
    name: "IONOS (1&1)",
    description:
      "IONOS by 1&1 is a European web hosting and domain registration company offering affordable bundles and integrated cloud services.",
    services: ["domain registration", "web hosting", "cloud servers", "email hosting", "SSL certificates"],
    renewalTips: [
      "IONOS introductory domain prices are very low but renewal rates can be significantly higher—plan for the price increase after year one.",
      "Cancel auto-renewal for domains you no longer need well before expiration to avoid being charged at the higher renewal rate.",
      "Beware of bundled services (like email or hosting) that may auto-renew with your domain—review your billing settings regularly.",
      "Transfer domains you want to keep long-term to a registrar with more consistent renewal pricing if IONOS rates increase too much.",
    ],
    faq: [
      {
        q: "Why are IONOS renewal prices higher than initial prices?",
        a: "IONOS uses aggressive introductory pricing to attract customers, with renewal prices reverting to standard market rates after the first term.",
      },
      {
        q: "Does IONOS offer a grace period for expired domains?",
        a: "Yes, IONOS provides a grace period of approximately 30 days for most TLDs, during which you can renew without additional fees.",
      },
      {
        q: "Can I keep my domain with IONOS without using their hosting?",
        a: "Yes, you can manage domains independently through the IONOS control panel and point them to any hosting provider using custom DNS settings.",
      },
    ],
    pricing: ".com renewals ~$15–$20/year after intro pricing",
    url: "https://www.ionos.com",
  },
  {
    slug: "track-domain-expiry",
    name: "How to Track Domain Expiry",
    description:
      "Tracking domain expiration dates is essential to prevent accidental loss of your domain names. Learn the best methods, tools, and practices for monitoring domain renewals.",
    services: ["domain monitoring", "expiration tracking", "renewal management"],
    renewalTips: [
      "Use a dedicated domain tracking tool like RenewTracker to centralize all your domain expiry dates in one dashboard.",
      "Set multiple reminder layers: registrar email, calendar alerts 30 and 7 days before, and a secondary tracking service as backup.",
      "Enable auto-renewal on all critical domains, but verify annually that your payment method on file is still valid.",
      "Check the WHOIS record after renewal to confirm the new expiration date has been properly extended.",
    ],
    faq: [
      {
        q: "What happens when a domain expires?",
        a: "After expiration, the domain enters a grace period (typically 30 days) where you can renew at standard rates, then a redemption period ($80–$150+ fees), and finally it is released for public registration.",
      },
      {
        q: "How far in advance should I track domain expiry?",
        a: "It's recommended to start tracking 60–90 days before expiration to allow time for renewal, transfer, or resolution of any billing issues.",
      },
      {
        q: "Can I lose my domain permanently if I miss the renewal?",
        a: "Yes, if you miss the grace and redemption periods, the domain is released and can be registered by anyone, including domain squatters who may demand a high price for it.",
      },
    ],
  },
  {
    slug: "domain-renewal-price-comparison",
    name: "Domain Renewal Price Comparison",
    description:
      "Compare domain renewal prices across 12+ registrars including Cloudflare, Porkbun, Namecheap, GoDaddy, and more. Find the cheapest place to renew .com, .io, .org, and other TLDs.",
    services: ["price comparison", "registrar comparison", "domain renewal savings"],
    renewalTips: [
      "Cloudflare sells domains at cost (~$9.15 for .com) with no markup — the cheapest option for most TLDs.",
      "Porkbun and NameSilo consistently offer the next best renewal prices at $10–$12/year for .com domains.",
      "GoDaddy charges $19–$22/year for .com renewals — up to 2x more than budget registrars. Always compare before renewing.",
      "Bulk renewal discounts are rare but some registrars (Namecheap, Porkbun) offer small savings for multi-year renewals.",
      "Watch for hidden fees: WHOIS privacy, DNS hosting, and email forwarding can add $5–$15/year on top of renewal costs.",
    ],
    faq: [
      {
        q: "Which registrar has the cheapest .com renewal?",
        a: "Cloudflare is the cheapest at ~$9.15/year (at cost). Porkbun (~$10–$12), NameSilo (~$10.39), and Namecheap (~$13–$16) are also competitive. GoDaddy is typically the most expensive at $19–$22/year.",
      },
      {
        q: "Are renewal prices the same as initial registration prices?",
        a: "Almost never. Most registrars offer discounted first-year pricing ($1–$6 for .com) and charge standard rates on renewal. Cloudflare and Porkbun have the smallest spreads between intro and renewal pricing.",
      },
      {
        q: "How can I avoid paying high domain renewal fees?",
        a: "Transfer your domain to a cheaper registrar before renewal. You must wait 60 days after registration or last transfer, and each transfer adds 1 year to the expiration date. Cloudflare, Porkbun, and NameSilo are popular low-cost destinations.",
      },
      {
        q: "What TLDs have the highest renewal costs?",
        a: "Premium TLDs like .io ($30–$60/year), .ai ($40–$80/year), and .co ($20–$30/year) cost significantly more than .com. Specialized TLDs like .design or .photography can also carry higher renewal rates.",
      },
    ],
    pricing: "Varies by registrar and TLD; .com renewals range from ~$9.15 (Cloudflare) to ~$22 (GoDaddy)",
  },
  {
    slug: "check-domain-expiration-date",
    name: "How to Check a Domain Expiration Date",
    description:
      "Learn multiple methods to check when any domain expires, including WHOIS lookups, registrar dashboards, and automated monitoring tools.",
    services: ["WHOIS lookup", "expiration checking", "domain monitoring"],
    renewalTips: [
      "Use the WHOIS lookup tool at whois.icann.org to check any domain's expiration date without logging into a registrar account.",
      "For domains you own, check the expiration date directly in your registrar's dashboard—this is the most reliable source.",
      "Run a bulk WHOIS check for all your domains at once using tools like DomainTools or RenewTracker to get a complete overview.",
      "Set up automated expiry monitoring with RenewTracker to receive alerts as domains approach expiration across all your registrars.",
    ],
    faq: [
      {
        q: "Is WHOIS lookup always accurate for expiration dates?",
        a: "WHOIS is generally reliable, but some registrars may mask or delay updating the expiration date, especially during grace periods.",
      },
      {
        q: "Can I check a domain expiration date for free?",
        a: "Yes, WHOIS lookups are free at services like ICANN Lookup, whois.com, and many registrar sites.",
      },
      {
        q: "How often do domain expiration dates change?",
        a: "Each renewal extends the expiration by the registration period (typically 1 year). Transfers also add one year to the expiration date.",
      },
    ],
  },
  {
    slug: "domain-renewal-costs",
    name: "Domain Renewal Costs by Registrar",
    description:
      "Domain renewal costs vary significantly between registrars and by TLD. Compare typical renewal prices and learn how to minimize costs.",
    services: ["cost comparison", "domain pricing", "renewal savings"],
    renewalTips: [
      "TLD matters—.com renewals are typically $10–$22/year while specialty TLDs like .io or .ai can cost $30–$60/year to renew.",
      "Avoid registrar lock-in: transfer domains to a registrar with lower renewal prices, but wait at least 60 days after initial registration.",
      "Renew for multiple years (5–10) to lock in current rates and avoid annual price increases, especially if you plan to keep the domain long-term.",
      "Factor in hidden costs: some registrars charge separate fees for WHOIS privacy, DNS hosting, or email forwarding on top of renewal.",
    ],
    faq: [
      {
        q: "Which registrar has the cheapest domain renewal?",
        a: "Cloudflare offers domains at cost (~$9.15 for .com) with no markup, making them the cheapest. Porkbun and Namecheap are also competitively priced.",
      },
      {
        q: "Why do some registrars charge more for renewal than initial registration?",
        a: "Many registrars use loss-leading introductory prices to attract customers, then recoup costs through higher renewal rates in subsequent years.",
      },
      {
        q: "Are there any ways to reduce domain renewal costs?",
        a: "Yes: transfer to low-cost registrars, renew for multiple years, use coupon codes, take advantage of bulk discounts, and avoid unnecessary add-on services.",
      },
    ],
  },
];

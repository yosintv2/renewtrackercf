export type SubscriptionEntry = {
  slug: string;
  name: string;
  category: string;
  description: string;
  pricing: string;
  billingCycle: string;
  renewalTips: string[];
  cancellationTips: string[];
  faq: { q: string; a: string }[];
  url?: string;
};

export const subscriptions: SubscriptionEntry[] = [
  // ===== Communication =====
  {
    slug: "discord-nitro",
    name: "Discord Nitro",
    category: "communication",
    description:
      "Discord Nitro unlocks enhanced chat features, higher upload limits, animated emojis, server boosts, and a personalized profile for your Discord experience.",
    pricing: "$9.99/month or $99.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing saves roughly 17% compared to paying monthly.",
      "Set a calendar reminder a few days before your renewal date to review if you still use the perks.",
      "Nitro gift subscriptions can be stacked, so check your gift inventory before renewing.",
    ],
    cancellationTips: [
      "Downgrade to Nitro Classic if you only want basic emoji perks at a lower price.",
      "You lose access to server boosting slots immediately upon cancellation.",
      "Request a refund within 7 days of renewal if you accidentally auto-renewed.",
    ],
    faq: [
      {
        q: "Can I keep my Discord tag after canceling Nitro?",
        a: "Yes, your current discriminator is preserved for 30 days after cancellation, after which Discord may assign a new one.",
      },
      {
        q: "Do I lose my custom emojis when I cancel?",
        a: "Custom emojis you uploaded will be disabled until you resubscribe, but they are not deleted from your server.",
      },
      {
        q: "Can I transfer my Nitro subscription to another account?",
        a: "No, Nitro subscriptions are tied to a single account and cannot be transferred.",
      },
    ],
    url: "https://discord.com/nitro",
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams",
    category: "communication",
    description:
      "Microsoft Teams is a workplace collaboration hub offering chat, video conferencing, file storage, and deep Office 365 integration for businesses.",
    pricing: "$4.00/user/month (Essentials) or free with Microsoft 365 Business",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Teams Essentials is billed per user and renews automatically on your subscription date.",
      "Business Voice add-ons renew separately — review your add-on subscriptions before renewal.",
      "Annual plans lock in a 20% discount over monthly billing for Microsoft 365 Business bundles.",
    ],
    cancellationTips: [
      "Cancel through the Microsoft 365 admin center before the next billing date to avoid charges.",
      "Downgrade to the free tier if you only need basic chat and limited meeting minutes.",
      "Data remains accessible in read-only mode for 90 days after subscription cancellation.",
    ],
    faq: [
      {
        q: "Can I use Microsoft Teams without a Microsoft 365 subscription?",
        a: "Yes, the free tier offers unlimited chat, 60-minute meetings, and 10 GB of file storage.",
      },
      {
        q: "Are meeting recordings stored after cancellation?",
        a: "Yes, recordings saved to Microsoft Stream or OneDrive persist as long as your tenant exists.",
      },
      {
        q: "How do guest users affect billing?",
        a: "Guest users who are external to your organization do not require a license unless they need full Teams features.",
      },
    ],
    url: "https://www.microsoft.com/microsoft-teams",
  },
  {
    slug: "slack",
    name: "Slack",
    category: "communication",
    description:
      "Slack is a messaging platform for teams with channels, direct messaging, file sharing, and deep integrations with thousands of business tools.",
    pricing: "$7.25/user/month (Pro) to $12.50/user/month (Business+)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing offers a 25% discount over monthly per-user pricing.",
      "Review connected app usage before renewal to ensure you still need each integration.",
      "Slack credits unused workspace time if you downgrade mid-cycle — check your billing history.",
    ],
    cancellationTips: [
      "Cancel from the workspace settings under 'Billing' — workspace owner access is required.",
      "Export your message history before canceling; Slack retains it for 90 days post-cancellation.",
      "Downgrade to the free plan if you only need the last 90 days of searchable messages.",
    ],
    faq: [
      {
        q: "What happens to my messages after I cancel?",
        a: "Your workspace becomes read-only on the free plan, and message history beyond 90 days is hidden.",
      },
      {
        q: "Can I pause my subscription instead of canceling?",
        a: "Slack does not offer a pause feature; you must cancel and resubscribe when needed.",
      },
      {
        q: "Do Slackbot custom responses survive cancellation?",
        a: "Custom Slackbot responses are preserved but become inactive until you resubscribe to a paid plan.",
      },
    ],
    url: "https://slack.com/pricing",
  },
  {
    slug: "telegram-premium",
    name: "Telegram Premium",
    category: "communication",
    description:
      "Telegram Premium unlocks faster downloads, larger file uploads (up to 4 GB), voice-to-text, animated profile pictures, and exclusive sticker packs.",
    pricing: "$4.99/month",
    billingCycle: "Monthly",
    renewalTips: [
      "Premium is billed monthly and auto-renews unless canceled 24 hours before the billing date.",
      "You can purchase Premium as a gift for other users without linking your payment method.",
      "Telegram occasionally runs promotional pricing — check the app before renewing.",
    ],
    cancellationTips: [
      "Cancel directly in the Telegram app under Settings > Premium > Manage Subscription.",
      "You keep Premium features for the remainder of the billing period after cancellation.",
      "No refunds are provided for partial months after cancellation.",
    ],
    faq: [
      {
        q: "Do I lose my Premium stickers after canceling?",
        a: "Premium stickers remain in your collection but cannot be sent unless you resubscribe.",
      },
      {
        q: "Can I use Telegram Premium on multiple devices?",
        a: "Yes, Premium applies to your account across all devices simultaneously.",
      },
      {
        q: "Is voice-to-text available in all languages?",
        a: "Voice-to-text supports a growing list of languages, including English, Spanish, Arabic, and more.",
      },
    ],
    url: "https://telegram.org/premium",
  },
  {
    slug: "whatsapp-business",
    name: "WhatsApp Business",
    category: "communication",
    description:
      "WhatsApp Business offers business messaging tools including automated replies, quick replies, labels, and catalog sharing for small to medium businesses.",
    pricing: "Free (standard) or usage-based API pricing via Meta",
    billingCycle: "Monthly",
    renewalTips: [
      "The WhatsApp Business API charges per conversation template opened — monitor your usage dashboard.",
      "Meta charges are billed monthly and vary by region; review your Meta Business Suite settings.",
      "Set spending limits in the Meta Business Suite to avoid unexpected overage charges.",
    ],
    cancellationTips: [
      "Disconnect the API through the Meta Business Suite to stop further billing.",
      "Your business profile and catalog data persist even after API disconnection.",
      "Refunds for API overage charges are not typically granted — monitor usage proactively.",
    ],
    faq: [
      {
        q: "Is WhatsApp Business free to download?",
        a: "Yes, the WhatsApp Business app is free on iOS and Android; only the API incurs usage fees.",
      },
      {
        q: "Can I use WhatsApp Business and WhatsApp Messenger together?",
        a: "Yes, but they require separate phone numbers on the same device.",
      },
      {
        q: "What happens to my business catalog if I stop using the API?",
        a: "Your catalog data remains on your business profile but becomes inaccessible for automated sharing.",
      },
    ],
    url: "https://business.whatsapp.com",
  },
  {
    slug: "zoom-one",
    name: "Zoom One",
    category: "communication",
    description:
      "Zoom One bundles Meetings, Phone, Whiteboard, and Team Chat into a single subscription for hybrid and remote work teams.",
    pricing: "$14.99/user/month (Pro) to $25.99/user/month (Enterprise Bundle)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing saves approximately 20% compared to monthly billing for Zoom One plans.",
      "Review your user count before renewal — Zoom bills per licensed user, and inactive users still count.",
      "Zoom One bundles include cloud recording storage; check your usage to avoid overage fees.",
    ],
    cancellationTips: [
      "Cancel through the Zoom web portal under Account Management > Billing.",
      "Downgrade to the free Basic plan if you only need 40-minute group meetings.",
      "Cloud recordings remain accessible for the retention period even after cancellation.",
    ],
    faq: [
      {
        q: "Can I keep my Zoom Phone number after canceling?",
        a: "No, Zoom Phone numbers are released back to the pool upon cancellation unless ported out.",
      },
      {
        q: "What happens to my team chat history after cancellation?",
        a: "Chat history is preserved for 30 days post-cancellation in read-only mode.",
      },
      {
        q: "Is Zoom One available for a single user?",
        a: "Yes, Zoom One Pro supports single users, while Business plans require a minimum of 10 licenses.",
      },
    ],
    url: "https://zoom.us/pricing",
  },

  // ===== Entertainment =====
  {
    slug: "acorn-tv",
    name: "Acorn TV",
    category: "entertainment",
    description:
      "Acorn TV streams British and international television series, mysteries, and dramas from the UK, Australia, Ireland, and beyond.",
    pricing: "$6.99/month or $69.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing brings the cost down to roughly $5.83/month, a sizable saving over monthly.",
      "New content drops every Monday — check the upcoming schedule before committing to another year.",
      "Acorn TV often runs free trial promotions through partner programs like American Express.",
    ],
    cancellationTips: [
      "Cancel online via the 'My Account' page — no need to call customer support.",
      "You retain access until the end of the current billing period after canceling.",
      "If you subscribed through Amazon Prime Video Channels, cancel directly through Amazon's account settings.",
    ],
    faq: [
      {
        q: "Can I download shows for offline viewing?",
        a: "Yes, the Acorn TV app supports downloads on iOS and Android devices.",
      },
      {
        q: "How many devices can stream simultaneously?",
        a: "Acorn TV allows up to 5 devices to stream at the same time on a single account.",
      },
      {
        q: "Does Acorn TV offer a free trial?",
        a: "Yes, new subscribers typically get a 7-day free trial before billing begins.",
      },
    ],
    url: "https://acorn.tv",
  },
  {
    slug: "amazon-music-unlimited",
    name: "Amazon Music Unlimited",
    category: "entertainment",
    description:
      "Amazon Music Unlimited provides access to over 100 million songs in HD and Ultra HD, with offline listening and hands-free Alexa control.",
    pricing: "$9.99/month (Prime members) or $10.99/month (non-Prime)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Prime members save $1/month over non-Prime pricing for the individual plan.",
      "A single-device plan is available for $5.99/month if you only listen on one Echo or Fire TV.",
      "Annual plans are not offered — budget for monthly renewal charges.",
    ],
    cancellationTips: [
      "Cancel through Amazon's 'Memberships & Subscriptions' page in your account settings.",
      "Your playlists and library persist after cancellation and return when you resubscribe.",
      "Downloaded songs become unplayable offline once the subscription lapses.",
    ],
    faq: [
      {
        q: "Do I lose access to my purchased music if I cancel?",
        a: "No, any music you bought through Amazon remains in your library permanently.",
      },
      {
        q: "Is there a family plan?",
        a: "Yes, Amazon Music Unlimited Family covers up to 6 household members for $16.99/month.",
      },
      {
        q: "Can I switch from the individual to the single-device plan?",
        a: "Yes, you can change plans anytime through your Amazon account settings.",
      },
    ],
    url: "https://music.amazon.com",
  },
  {
    slug: "amazon-prime-video",
    name: "Amazon Prime Video",
    category: "entertainment",
    description:
      "Amazon Prime Video offers thousands of movies and TV shows, award-winning Originals, and add-on channels like HBO, Showtime, and Starz.",
    pricing: "$8.99/month or included with Amazon Prime ($14.99/month or $139/year)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Amazon Prime Video standalone costs $8.99/month, but Prime membership bundles video with shipping and music.",
      "Annual Prime membership locks in the best value for frequent Amazon shoppers.",
      "Add-on channels like Max and Paramount+ bill separately via Prime Video Channels.",
    ],
    cancellationTips: [
      "Standalone Prime Video can be canceled independently of your main Prime membership.",
      "Canceled accounts maintain access until the end of the paid billing cycle.",
      "Rented or purchased content remains accessible forever even after cancellation.",
    ],
    faq: [
      {
        q: "How many people can share a Prime Video account?",
        a: "Amazon offers a 'Share Your Prime Benefits' option that allows two adults per household.",
      },
      {
        q: "Can I watch Prime Video offline?",
        a: "Yes, select titles can be downloaded to mobile devices for offline viewing.",
      },
      {
        q: "Does Prime Video include live sports?",
        a: "Prime Video carries Thursday Night Football, Premier League, and other select live events.",
      },
    ],
    url: "https://primevideo.com",
  },
  {
    slug: "apple-music",
    name: "Apple Music",
    category: "entertainment",
    description:
      "Apple Music offers over 100 million songs, spatial audio with Dolby Atmos, curated playlists, and live radio stations.",
    pricing: "$10.99/month (Individual) or $16.99/month (Family)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Apple Music's annual plan costs $109/year — a savings of about $23 compared to monthly billing.",
      "The Voice Plan at $4.99/month is limited to Siri-only control and may not fit all use cases.",
      "Family Sharing allows up to 6 people; ensure all members are in your iCloud Family group.",
    ],
    cancellationTips: [
      "Cancel directly in the Music app or through Settings > [Your Name] > Subscriptions on iOS.",
      "Your entire music library (playlists, downloads, favorites) is preserved for 90 days after canceling.",
      "Spatial audio and lossless downloads become unavailable until you resubscribe.",
    ],
    faq: [
      {
        q: "Do I keep my downloaded songs after canceling?",
        a: "Downloaded songs remain on your device but become unplayable until you renew the subscription.",
      },
      {
        q: "Can I transfer my Apple Music playlists to another service?",
        a: "Yes, services like TuneMyMusic and SongShift can transfer playlists between platforms.",
      },
      {
        q: "Is Apple Music available on Android?",
        a: "Yes, Apple Music has a full-featured Android app available on Google Play.",
      },
    ],
    url: "https://music.apple.com",
  },
  {
    slug: "apple-tv-plus",
    name: "Apple TV+",
    category: "entertainment",
    description:
      "Apple TV+ features award-winning original series, films, and documentaries produced by Apple, all in 4K HDR with Dolby Atmos sound.",
    pricing: "$9.99/month or $99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual pricing at $99/year saves you roughly $20 compared to the monthly plan.",
      "New Apple device purchases often include 3 to 6 months of Apple TV+ free.",
      "Apple One bundles Apple TV+ with Music, Arcade, and iCloud+ at a discounted rate.",
    ],
    cancellationTips: [
      "Cancel through Settings > [Your Name] > Subscriptions on any Apple device.",
      "Access continues through the end of the billing period after cancellation.",
      "There is no prorated refund for canceling mid-cycle.",
    ],
    faq: [
      {
        q: "How many people can share Apple TV+?",
        a: "Apple TV+ supports Family Sharing for up to 6 family members.",
      },
      {
        q: "Can I download shows for offline watching?",
        a: "Yes, all Apple TV+ content can be downloaded to iPhone, iPad, or Mac for offline playback.",
      },
      {
        q: "Is Apple TV+ available on non-Apple devices?",
        a: "Yes, the Apple TV app is available on smart TVs, Roku, Fire TV, and web browsers.",
      },
    ],
    url: "https://tv.apple.com",
  },
  {
    slug: "britbox",
    name: "BritBox",
    category: "entertainment",
    description:
      "BritBox streams the best of British television including classic BBC, ITV, Channel 4, and original productions exclusive to the platform.",
    pricing: "$7.99/month or $79.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual plan of $79.99/year works out to roughly $6.67/month, a 16% saving.",
      "BritBox regularly adds new seasons of British panel shows and mysteries — check the 'Coming Soon' page.",
      "If you subscribed through Amazon Channels, manage renewal via your Amazon account settings.",
    ],
    cancellationTips: [
      "Cancel directly on the BritBox website under 'My Account' — one click and no phone calls.",
      "You keep access until the last day of your paid billing cycle.",
      "Subscriptions purchased via Apple or Amazon must be canceled through those platforms.",
    ],
    faq: [
      {
        q: "Does BritBox include live TV?",
        a: "No, BritBox is an on-demand streaming service and does not offer live television.",
      },
      {
        q: "How many simultaneous streams are allowed?",
        a: "BritBox allows up to 4 simultaneous streams per account.",
      },
      {
        q: "Are subtitles available for all content?",
        a: "The majority of BritBox titles include English subtitles.",
      },
    ],
    url: "https://britbox.com",
  },
  {
    slug: "calm",
    name: "Calm",
    category: "entertainment",
    description:
      "Calm is a meditation and mindfulness app offering guided sessions, sleep stories, breathing exercises, and relaxing music to reduce stress and improve sleep.",
    pricing: "$69.99/year or $399.99 (lifetime)",
    billingCycle: "Annual & Lifetime",
    renewalTips: [
      "Calm charges annually rather than monthly, so the full $69.99 renews once per year.",
      "A lifetime subscription at $399.99 is the best value if you plan to use Calm for 6+ years.",
      "Calm often runs Black Friday and New Year discounts — consider timing your renewal.",
    ],
    cancellationTips: [
      "Cancel through the app settings or via the Calm website under 'Manage Subscription'.",
      "If subscribed through Apple, cancel via Settings > [Your Name] > Subscriptions.",
      "No refunds are given for partial years — wait until close to the renewal date to cancel.",
    ],
    faq: [
      {
        q: "Does Calm offer a free trial?",
        a: "Yes, Calm provides a 7-day free trial for new users on the annual plan.",
      },
      {
        q: "Can I use Calm offline?",
        a: "Yes, you can download sessions and sleep stories for offline use within the app.",
      },
      {
        q: "Is Calm suitable for children?",
        a: "Calm offers a dedicated 'Calm Kids' section with age-appropriate meditations.",
      },
    ],
    url: "https://www.calm.com",
  },
  {
    slug: "classpass",
    name: "ClassPass",
    category: "entertainment",
    description:
      "ClassPass gives you access to thousands of fitness studios, gyms, and wellness experiences with a flexible credit-based booking system.",
    pricing: "$49/month (15 credits) to $199/month (100 credits)",
    billingCycle: "Monthly",
    renewalTips: [
      "ClassPass credits roll over up to the number of credits in your plan, but unearned credits expire monthly.",
      "Review your monthly credit usage in the app and adjust your plan size before the next billing date.",
      "Freezing your account for up to 90 days is possible if you know you will not use it.",
    ],
    cancellationTips: [
      "Cancel anytime from the 'Account Settings' page — no contracts or cancellation fees.",
      "Any unused credits expire upon cancellation, so book your classes before canceling.",
      "You can rejoin later and your previous credit history remains intact.",
    ],
    faq: [
      {
        q: "What happens to my credits if I cancel?",
        a: "All remaining credits are forfeited immediately upon cancellation.",
      },
      {
        q: "Can I use ClassPass in multiple cities?",
        a: "Yes, ClassPass works in over 30 countries and thousands of cities worldwide.",
      },
      {
        q: "How far in advance can I book classes?",
        a: "Booking windows vary by studio, typically ranging from 1 to 7 days ahead.",
      },
    ],
    url: "https://classpass.com",
  },
  {
    slug: "crunchyroll",
    name: "Crunchyroll",
    category: "entertainment",
    description:
      "Crunchyroll is the world's largest anime streaming service, offering thousands of episodes of popular and classic anime series, simulcasts, and manga.",
    pricing: "$7.99/month (Fan) to $15.99/month (Ultimate Fan)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing ($79.99 for Fan) saves about 17% compared to monthly pricing.",
      "The Ultimate Fan tier includes offline viewing, exclusive merchandise discounts, and larger simultaneous streams.",
      "New episodes air as simulcasts within hours of Japanese broadcast — check the seasonal lineup.",
    ],
    cancellationTips: [
      "Cancel via the Crunchyroll website under 'Account Settings' > 'Membership'.",
      "If you subscribed through the app store, you must cancel through Apple or Google Play.",
      "Access to Crunchyroll content ends immediately at the end of your current billing period.",
    ],
    faq: [
      {
        q: "Can I watch Crunchyroll offline?",
        a: "Offline downloads are available only on the Ultimate Fan plan.",
      },
      {
        q: "Does Crunchyroll include manga?",
        a: "Crunchyroll Manga is available as a separate subscription or bundled with some annual plans.",
      },
      {
        q: "How many devices can stream simultaneously?",
        a: "Fan: 1 stream; Mega Fan: 4 streams; Ultimate Fan: 6 streams at once.",
      },
    ],
    url: "https://www.crunchyroll.com",
  },
  {
    slug: "curiosity-stream",
    name: "Curiosity Stream",
    category: "entertainment",
    description:
      "Curiosity Stream offers thousands of documentary films and series covering science, history, nature, technology, and civilization.",
    pricing: "$3.99/month or $39.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual plan at $39.99/year is the most popular option, working out to just $3.33/month.",
      "Curiosity Stream frequently runs 40% off promotions for new and returning subscribers.",
      "Bundling with Nebula gives you access to creator-led educational content at a combined discount.",
    ],
    cancellationTips: [
      "Cancel easily via the 'Account' page on the Curiosity Stream website.",
      "You retain access until the end of the paid billing period.",
      "If you subscribed through the Curiosity Stream+ Nebula bundle, cancel via the bundle settings.",
    ],
    faq: [
      {
        q: "Does Curiosity Stream have a free trial?",
        a: "Yes, new subscribers get a 7-day free trial on any plan.",
      },
      {
        q: "Can I download documentaries for offline viewing?",
        a: "Yes, the mobile app supports offline downloads for all subscribers.",
      },
      {
        q: "How many devices can I use?",
        a: "Curiosity Stream allows unlimited devices registered to your account.",
      },
    ],
    url: "https://curiositystream.com",
  },
  {
    slug: "dazn",
    name: "DAZN",
    category: "entertainment",
    description:
      "DAZN is a global sports streaming platform offering live and on-demand boxing, MMA, soccer, and other combat sports events.",
    pricing: "$24.99/month or $149.99/year (US) — varies by region",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual pricing in the US at $149.99 saves about $150 versus the monthly rate.",
      "DAZN's content library varies significantly by country — check your region's lineup before renewing.",
      "DAZN often offers discounted annual plans during major fight weeks.",
    ],
    cancellationTips: [
      "Cancel online through your DAZN account settings — no phone call needed.",
      "Your subscription continues until the end of the paid period after canceling.",
      "Refunds are only provided if requested within 14 days of purchase for annual plans.",
    ],
    faq: [
      {
        q: "Can I watch DAZN on multiple devices at once?",
        a: "DAZN allows up to 2 simultaneous streams per account.",
      },
      {
        q: "Does DAZN offer pay-per-view events?",
        a: "Some premium events may require an additional PPV fee on top of the subscription.",
      },
      {
        q: "Is DAZN available worldwide?",
        a: "DAZN is available in over 200 countries, but content libraries differ by region.",
      },
    ],
    url: "https://www.dazn.com",
  },
  {
    slug: "deezer",
    name: "Deezer",
    category: "entertainment",
    description:
      "Deezer is a music streaming service with over 90 million tracks, personalized playlists, lyrics, and exclusive podcasts and radio stations.",
    pricing: "$10.99/month (Premium) or $17.99/month (Family)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual HiFi plan at $119.88/year includes CD-quality lossless audio.",
      "Deezer's 'Flow' feature learns your taste over time — the more you listen, the better it gets.",
      "Family plan members must live at the same address; Deezer verifies addresses periodically.",
    ],
    cancellationTips: [
      "Cancel from the Deezer website under 'Account' > 'Manage My Subscription'.",
      "App store subscriptions (Apple/Google) must be canceled via the respective store.",
      "Your playlists and favorites are saved for 30 days after cancellation.",
    ],
    faq: [
      {
        q: "Does Deezer have a free tier?",
        a: "Yes, Deezer offers an ad-supported free tier with limited skips and on-demand playback.",
      },
      {
        q: "Can I download music for offline listening?",
        a: "Yes, Premium and HiFi subscribers can download unlimited tracks to mobile devices.",
      },
      {
        q: "Does Deezer offer lossless audio?",
        a: "Yes, Deezer HiFi streams in CD-quality FLAC (16-bit, 44.1 kHz).",
      },
    ],
    url: "https://www.deezer.com",
  },
  {
    slug: "discovery-plus",
    name: "Discovery+",
    category: "entertainment",
    description:
      "Discovery+ streams thousands of reality shows and documentaries from Discovery Channel, HGTV, Food Network, TLC, Animal Planet, and more.",
    pricing: "$4.99/month (ads) or $8.99/month (ad-free)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The ad-free tier at $8.99/month removes commercials across all Discovery+ content.",
      "Annual plans are available at a discount — $49.99/year for ad-supported versus $89.99/year ad-free.",
      "Discovery+ frequently bundles with other services like Philo or Verizon for promotional pricing.",
    ],
    cancellationTips: [
      "Cancel anytime through the Discovery+ website under 'Account Settings'.",
      "If billed through a third party (Amazon, Apple, Verizon), cancel via that provider.",
      "Your access continues until the end of the current billing cycle.",
    ],
    faq: [
      {
        q: "Can I watch Discovery+ offline?",
        a: "Yes, the Discovery+ app allows downloads for offline viewing on mobile devices.",
      },
      {
        q: "How many simultaneous streams are allowed?",
        a: "Discovery+ supports up to 4 simultaneous streams per account.",
      },
      {
        q: "Does Discovery+ include live TV?",
        a: "Some live events are available, but Discovery+ is primarily an on-demand service.",
      },
    ],
    url: "https://www.discoveryplus.com",
  },
  {
    slug: "disney-plus",
    name: "Disney+",
    category: "entertainment",
    description:
      "Disney+ streams beloved Disney, Pixar, Marvel, Star Wars, and National Geographic movies and series, plus exclusive Originals.",
    pricing: "$7.99/month (Basic with ads) or $13.99/month (Premium no ads)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing for Disney+ Premium ($139.99/year) saves about $28 compared to monthly.",
      "The Disney+, Hulu, and Max bundle offers significant savings for households that want all three.",
      "Disney+ occasionally raises prices — review any price change emails before auto-renewal.",
    ],
    cancellationTips: [
      "Cancel via the Disney+ website under 'Account' > 'Subscription'.",
      "If you subscribed through Apple or Google, you must cancel through the app store.",
      "Access remains until the end of the current billing period after cancellation.",
    ],
    faq: [
      {
        q: "Can I download movies from Disney+?",
        a: "Yes, all Disney+ content is available for download on mobile devices for offline viewing.",
      },
      {
        q: "How many people can stream at once?",
        a: "Disney+ Premium allows 4 simultaneous streams; Basic allows 2.",
      },
      {
        q: "Does Disney+ include 4K HDR content?",
        a: "Yes, Premium subscribers get 4K UHD and HDR10 on supported titles at no extra cost.",
      },
    ],
    url: "https://www.disneyplus.com",
  },
  {
    slug: "dropout",
    name: "Dropout",
    category: "entertainment",
    description:
      "Dropout is CollegeHumor's ad-free subscription platform featuring original improv comedy shows like Dimension 20, Game Changer, and Um, Actually.",
    pricing: "$5.99/month or $59.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual plan at $59.99/year is effectively $5/month — a 17% saving over monthly.",
      "New seasons of Dimension 20 are released regularly — check the production schedule before renewing.",
      "Dropout offers a free trial for first-time subscribers to explore the content library.",
    ],
    cancellationTips: [
      "Cancel directly on the Dropout website under 'Account Settings'.",
      "Access to all content continues until the end of the paid billing period.",
      "There are no cancellation fees or penalties for canceling early.",
    ],
    faq: [
      {
        q: "Can I watch Dropout on my TV?",
        a: "Yes, Dropout has apps for Roku, Apple TV, Fire TV, Android TV, and web browsers.",
      },
      {
        q: "Are all episodes available immediately?",
        a: "Most shows release weekly, but full seasons become available after the season finale.",
      },
      {
        q: "Does Dropout offer gift subscriptions?",
        a: "Yes, you can purchase Dropout gift subscriptions for friends and family.",
      },
    ],
    url: "https://dropout.tv",
  },
  {
    slug: "espn-plus",
    name: "ESPN+",
    category: "entertainment",
    description:
      "ESPN+ offers exclusive live sports, original shows, documentaries, and premium articles from ESPN's writers, covering UFC, NHL, MLS, and more.",
    pricing: "$10.99/month or $109.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $109.99/year saves about $22 compared to the monthly plan.",
      "The Disney Bundle (Disney+, Hulu, ESPN+) is cheaper than subscribing to ESPN+ alone.",
      "ESPN+ PPV events like UFC fights are an additional charge on top of the subscription.",
    ],
    cancellationTips: [
      "Cancel via the ESPN website under 'Account' > 'ESPN+ Subscription'.",
      "If you subscribed through the Disney Bundle, manage all three services together.",
      "Access to ESPN+ content ends at the conclusion of the current billing period.",
    ],
    faq: [
      {
        q: "Does ESPN+ include regular ESPN channels?",
        a: "No, ESPN+ is a separate streaming service and does not include ESPN, ESPN2, or ESPN News.",
      },
      {
        q: "Can I watch ESPN+ on multiple devices?",
        a: "Yes, up to 3 simultaneous streams are allowed per account.",
      },
      {
        q: "Are out-of-market MLB/NHL games available?",
        a: "Yes, ESPN+ carries out-of-market games for NHL, MLB, and MLS leagues.",
      },
    ],
    url: "https://plus.espn.com",
  },
  {
    slug: "fitbit-premium",
    name: "Fitbit Premium",
    category: "entertainment",
    description:
      "Fitbit Premium provides personalized health insights, advanced sleep analysis, guided fitness programs, and wellness reports based on your Fitbit data.",
    pricing: "$9.99/month or $79.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $79.99/year saves about $40 compared to the monthly rate.",
      "Google Fitbit users get a 90-day free trial with new device purchases.",
      "Premium features like Daily Readiness Score and sleep apnea detection require consistent device wear.",
    ],
    cancellationTips: [
      "Cancel through the Fitbit app or Fitbit.com under 'Account' > 'Premium'.",
      "If subscribed via Apple/Google, cancel through the respective app store.",
      "You keep Premium features until the end of the current billing period.",
    ],
    faq: [
      {
        q: "Do I need a Fitbit device to use Premium?",
        a: "Yes, a compatible Fitbit device is required to collect the data for Premium insights.",
      },
      {
        q: "Can I share Fitbit Premium with family?",
        a: "No, Premium is a single-user subscription tied to one Fitbit account.",
      },
      {
        q: "Does Fitbit Premium include recipes?",
        a: "Yes, Premium includes hundreds of recipes and meal-planning tools.",
      },
    ],
    url: "https://www.fitbit.com/premium",
  },
  {
    slug: "fubotv",
    name: "FuboTV",
    category: "entertainment",
    description:
      "FuboTV is a live TV streaming service focused on sports, offering 150+ channels including NFL, NBA, MLB, NHL, and international soccer leagues.",
    pricing: "$79.99/month (Pro) to $99.99/month (Elite)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "FuboTV's Elite plan adds 30+ channels and 1,000 hours of cloud DVR over the Pro plan.",
      "Annual billing is not available — you will be billed monthly.",
      "Regional sports fees may be added depending on your location.",
    ],
    cancellationTips: [
      "Cancel via the FuboTV website under 'Account' > 'Subscription'.",
      "You keep access until the end of your paid billing period after cancellation.",
      "If you subscribed through Apple App Store billing, cancel via Apple subscriptions.",
    ],
    faq: [
      {
        q: "Does FuboTV include ESPN?",
        a: "Yes, ESPN, ESPN2, and ESPN News are included in FuboTV's Pro and Elite plans.",
      },
      {
        q: "Can I record shows on FuboTV?",
        a: "Yes, Pro includes 1,000 hours of cloud DVR storage.",
      },
      {
        q: "Is FuboTV available in Canada?",
        a: "Yes, FuboTV operates in the US, Canada, and Spain with region-specific channel lineups.",
      },
    ],
    url: "https://www.fubo.tv",
  },
  {
    slug: "funimation",
    name: "Funimation",
    category: "entertainment",
    description:
      "Funimation is the leading distributor of English-dubbed anime, offering thousands of hours of dubbed and subtitled series and films.",
    pricing: "$7.99/month (Premium) or $99.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Funimation is merging with Crunchyroll — consider switching before your next renewal.",
      "Annual Premium Plus at $99.99/year includes offline viewing and 5 simultaneous streams.",
      "SimulDub episodes are available within hours of the Japanese broadcast.",
    ],
    cancellationTips: [
      "Cancel through the Funimation website under 'Account' > 'Subscription'.",
      "App store subscriptions must be canceled through Apple or Google Play.",
      "Access to dubbed content continues until the end of the current billing cycle.",
    ],
    faq: [
      {
        q: "Will my Funimation library transfer to Crunchyroll?",
        a: "Crunchyroll is actively migrating Funimation libraries — check your Crunchyroll account for transferred titles.",
      },
      {
        q: "Can I download episodes for offline viewing?",
        a: "Downloads are available on Premium Plus and Premium Plus Ultra plans.",
      },
      {
        q: "How many devices can stream simultaneously?",
        a: "Premium: 2 streams; Premium Plus: 5 streams.",
      },
    ],
    url: "https://www.funimation.com",
  },
  {
    slug: "hbo-max",
    name: "HBO Max",
    category: "entertainment",
    description:
      "HBO Max combines HBO's premium programming with a vast library of Warner Bros. movies, DC content, Studio Ghibli films, and Max Originals.",
    pricing: "$9.99/month (With Ads) or $15.99/month (Ad-Free)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual plan for Ad-Free ($149.99/year) saves about $42 compared to monthly billing.",
      "HBO Max now offers a Max Ad-Lite plan at a lower entry price.",
      "Check for bundle deals with Discovery+ or other Warner Bros. Discovery services.",
    ],
    cancellationTips: [
      "Cancel via the HBO Max website under 'Account' > 'Subscription'.",
      "If subscribed through Hulu, Amazon, or an internet provider, cancel via that provider.",
      "You keep access until the end of the current billing period after canceling.",
    ],
    faq: [
      {
        q: "Can I download movies and shows on HBO Max?",
        a: "Yes, all content on the Ad-Free plan is available for offline download.",
      },
      {
        q: "How many simultaneous streams does HBO Max allow?",
        a: "HBO Max supports up to 3 simultaneous streams on the Ad-Free plan, 2 on With Ads.",
      },
      {
        q: "Does HBO Max include 4K content?",
        a: "Selected content streams in 4K HDR on the Ad-Free plan at no extra cost.",
      },
    ],
    url: "https://www.hbomax.com",
  },
  {
    slug: "headspace",
    name: "Headspace",
    category: "entertainment",
    description:
      "Headspace offers guided meditation, mindfulness exercises, sleep sounds, and movement sessions designed to reduce stress and improve focus.",
    pricing: "$69.99/year or $399.99 (lifetime)",
    billingCycle: "Annual & Lifetime",
    renewalTips: [
      "Headspace charges annually — budget for the full $69.99 once per year.",
      "The family plan ($99.99/year) covers up to 6 household members.",
      "Headspace often discounts the first year for new subscribers.",
    ],
    cancellationTips: [
      "Cancel through the Headspace website or app under 'Account' > 'Subscription'.",
      "If subscribed through Apple, cancel via Settings > [Your Name] > Subscriptions.",
      "Refunds are only processed within 14 days of purchase for annual plans.",
    ],
    faq: [
      {
        q: "Does Headspace have a free trial?",
        a: "Yes, Headspace offers a 7-day free trial for new users.",
      },
      {
        q: "Can I use Headspace offline?",
        a: "Yes, guided meditations and sleep sounds can be downloaded for offline use.",
      },
      {
        q: "Is Headspace suitable for beginners?",
        a: "Yes, Headspace has a dedicated 'Basics' course that teaches meditation fundamentals step by step.",
      },
    ],
    url: "https://www.headspace.com",
  },
  {
    slug: "hulu",
    name: "Hulu",
    category: "entertainment",
    description:
      "Hulu streams current TV episodes, classic shows, award-winning Originals, and live TV options with a massive on-demand library.",
    pricing: "$7.99/month (with ads) or $17.99/month (no ads)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The Disney Bundle (Disney+, Hulu, ESPN+) offers better value than standalone Hulu.",
      "Annual billing is available for Hulu (No Ads) at $179.99/year, saving about $36.",
      "Hulu + Live TV costs $89.99/month and includes the Disney Bundle.",
    ],
    cancellationTips: [
      "Cancel online 24/7 via the Hulu website under 'Account' > 'Cancel Your Subscription'.",
      "If subscribed through Spotify Premium Student (which includes Hulu), cancel through Spotify.",
      "Access continues through the end of your paid billing cycle after cancellation.",
    ],
    faq: [
      {
        q: "Can I watch Hulu offline?",
        a: "Yes, Hulu (No Ads) and Hulu (Live TV) plans allow downloads on mobile devices.",
      },
      {
        q: "How many devices can stream Hulu at once?",
        a: "Hulu's base plan allows 2 simultaneous streams; the Unlimited Screens add-on supports unlimited in-home streams.",
      },
      {
        q: "Does Hulu include local channels?",
        a: "Hulu + Live TV includes local ABC, NBC, Fox, and CBS stations in most markets.",
      },
    ],
    url: "https://www.hulu.com",
  },
  {
    slug: "masterclass",
    name: "MasterClass",
    category: "entertainment",
    description:
      "MasterClass offers online video lessons taught by world-renowned experts and celebrities across cooking, writing, music, business, sports, and more.",
    pricing: "$10/month (annual) or $180/year (Individual)",
    billingCycle: "Annual",
    renewalTips: [
      "MasterClass bills annually at $180/year for the Individual plan.",
      "The Duo plan ($240/year) covers two accounts, and Family ($300/year) covers up to 6.",
      "MasterClass often runs 'buy one get one' promotions during holiday seasons.",
    ],
    cancellationTips: [
      "Cancel before the next annual renewal date through your account settings on MasterClass.com.",
      "You keep access for the full year you already paid for after cancellation.",
      "Refunds within 30 days of purchase are available for new subscriptions.",
    ],
    faq: [
      {
        q: "Can I download MasterClass videos?",
        a: "Yes, the MasterClass mobile app allows offline downloads for all subscribers.",
      },
      {
        q: "Are closed captions available?",
        a: "Yes, MasterClass provides English closed captions on all classes.",
      },
      {
        q: "Do I get a certificate after completing a class?",
        a: "Yes, you can download a certificate for each class you complete.",
      },
    ],
    url: "https://www.masterclass.com",
  },
  {
    slug: "mlb-tv",
    name: "MLB.TV",
    category: "entertainment",
    description:
      "MLB.TV streams every out-of-market MLB game live and on-demand, with DVR controls, multi-game viewing, and condensed game replays.",
    pricing: "$29.99/month or $149.99/year (All Teams)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual All Teams pass at $149.99 is the best value for full-season subscribers.",
      "A single-team pass is available for $119.99/year if you only follow one club.",
      "Blackout restrictions apply for in-market games — check your ZIP code before purchasing.",
    ],
    cancellationTips: [
      "Cancel via the MLB website under 'Account' > 'Subscriptions'.",
      "You retain access through the end of the current billing period after canceling.",
      "MLB.TV does not offer refunds for partial months or seasons.",
    ],
    faq: [
      {
        q: "Are Spring Training games included?",
        a: "Yes, MLB.TV includes all Spring Training and regular season games.",
      },
      {
        q: "Can I watch on multiple devices at once?",
        a: "MLB.TV allows up to 2 simultaneous streams per account.",
      },
      {
        q: "Is the postseason included?",
        a: "Postseason games are subject to national broadcast restrictions and may not be available on MLB.TV.",
      },
    ],
    url: "https://www.mlb.com/live-stream-games",
  },
  {
    slug: "mubi",
    name: "MUBI",
    category: "entertainment",
    description:
      "MUBI is a curated streaming service that brings you a new hand-picked film every day, plus a growing library of classic and contemporary cinema.",
    pricing: "$13.99/month or $95.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual plan ($95.99/year) saves roughly $72 compared to monthly billing.",
      "MUBI's library rotates — each film is available for 30 days before being replaced.",
      "A 7-day free trial is available for new subscribers.",
    ],
    cancellationTips: [
      "Cancel through the MUBI website under 'Account' > 'Subscription'.",
      "If subscribed via Apple or Google, cancel through the respective app store.",
      "Access to the currently playing film and library content continues until billing period ends.",
    ],
    faq: [
      {
        q: "Can I watch MUBI offline?",
        a: "Yes, MUBI supports offline downloads on mobile devices.",
      },
      {
        q: "How many devices can I use MUBI on?",
        a: "MUBI allows streaming on up to 5 devices simultaneously.",
      },
      {
        q: "Does MUBI include film festival content?",
        a: "Yes, MUBI occasionally features exclusive festival docuseries and filmmaker Q&As.",
      },
    ],
    url: "https://mubi.com",
  },
  {
    slug: "nba-league-pass",
    name: "NBA League Pass",
    category: "entertainment",
    description:
      "NBA League Pass streams live out-of-market NBA games, full-game replays, condensed games, and classic matchups from past seasons.",
    pricing: "$28.99/month or $249.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual plan provides the lowest monthly equivalent and is the best option for full-season fans.",
      "A single-team pass is available at a reduced rate during the season.",
      "Blackouts apply to national broadcasts and in-market games — verify your local blackout status.",
    ],
    cancellationTips: [
      "Cancel through NBA.com under 'Account' > 'Manage Subscription'.",
      "You maintain access until the end of your current billing period.",
      "Season-long subscriptions are non-refundable after the 5-day cancellation window.",
    ],
    faq: [
      {
        q: "Are playoff games included in League Pass?",
        a: "No, NBA playoff games are nationally broadcast and not available on League Pass.",
      },
      {
        q: "Can I watch multiple games at once?",
        a: "Yes, League Pass supports multi-game viewing on supported devices.",
      },
      {
        q: "How long after a game ends is the replay available?",
        a: "Game replays are typically available within 2 hours of the final buzzer.",
      },
    ],
    url: "https://www.nba.com/leaguepass",
  },
  {
    slug: "nebula",
    name: "Nebula",
    category: "entertainment",
    description:
      "Nebula is a creator-owned streaming platform featuring educational and thought-provoking content from top YouTube creators without ads or algorithms.",
    pricing: "$5.00/month or $50.00/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual plan ($50/year) saves about $10 compared to paying monthly.",
      "Nebula occasionally bundles with Curiosity Stream at a combined discount.",
      "New Nebula Originals are announced monthly — check the production schedule.",
    ],
    cancellationTips: [
      "Cancel through the Nebula website under 'Account Settings' > 'Subscription'.",
      "Access continues until the end of the paid billing period.",
      "No refunds are provided for partial months.",
    ],
    faq: [
      {
        q: "Is Nebula ad-free?",
        a: "Yes, Nebula is entirely ad-free with no sponsored segments in the content.",
      },
      {
        q: "Can I download videos for offline viewing?",
        a: "Yes, the Nebula app supports downloads on iOS and Android devices.",
      },
      {
        q: "How does Nebula differ from YouTube?",
        a: "Nebula is creator-owned, algorithm-free, and ad-free, with exclusive Originals not found on YouTube.",
      },
    ],
    url: "https://nebula.tv",
  },
  {
    slug: "netflix",
    name: "Netflix",
    category: "entertainment",
    description:
      "Netflix is the world's leading streaming entertainment service with award-winning TV shows, movies, anime, documentaries, and mobile games across thousands of genres.",
    pricing: "$6.99/month (Standard with ads) to $24.99/month (Premium)",
    billingCycle: "Monthly",
    renewalTips: [
      "Netflix bills monthly with no long-term contracts — you can cancel or change plans anytime.",
      "The Standard with ads plan is the cheapest option but limits downloads and device count.",
      "Premium (4K UHD, 4 screens) is ideal for households with multiple simultaneous viewers.",
    ],
    cancellationTips: [
      "Cancel at any time via the Netflix website under 'Account' > 'Cancel Membership'.",
      "Your profile and viewing history are saved for 10 months if you resubscribe.",
      "There is no refund for partial months — use the service until the billing cycle ends.",
    ],
    faq: [
      {
        q: "Can I share my Netflix account with someone outside my household?",
        a: "Netflix's paid sharing policy restricts sharing outside your household; extra member slots can be added for $7.99/month each.",
      },
      {
        q: "Does Netflix offer a free trial?",
        a: "Netflix phased out free trials in most regions but occasionally offers promotional periods.",
      },
      {
        q: "Can I download shows to watch offline?",
        a: "Yes, Netflix allows downloads on mobile devices on select plans.",
      },
    ],
    url: "https://www.netflix.com",
  },
  {
    slug: "nfl-plus",
    name: "NFL+",
    category: "entertainment",
    description:
      "NFL+ streams live local and primetime games on mobile devices, plus full-game replays, condensed games, and NFL Network programming.",
    pricing: "$6.99/month or $49.99/year (NFL+ Premium: $14.99/month or $99.99/year)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "NFL+ Premium adds game replays in All-22 coaches film and condensed games.",
      "Annual billing at $49.99 for NFL+ saves about $34 compared to monthly.",
      "NFL+ is mobile-only for live games — verify device compatibility before subscribing.",
    ],
    cancellationTips: [
      "Cancel via the NFL website under 'Account' > 'Subscriptions'.",
      "You keep access until the end of your current billing period.",
      "Subscriptions purchased through the NFL app via Apple/Google must be canceled via the app store.",
    ],
    faq: [
      {
        q: "Can I watch NFL+ on my TV?",
        a: "Live games are restricted to phones and tablets; replays can be watched on TV via AirPlay or Chromecast.",
      },
      {
        q: "Are preseason games included?",
        a: "Yes, NFL+ includes all preseason games live on mobile.",
      },
      {
        q: "Does NFL+ include NFL RedZone?",
        a: "No, NFL RedZone is not included in NFL+ and requires a separate subscription through a TV provider.",
      },
    ],
    url: "https://www.nfl.com/plus",
  },
  {
    slug: "noom",
    name: "Noom",
    category: "entertainment",
    description:
      "Noom is a psychology-based weight management program that combines personalized coaching, daily lessons, food logging, and activity tracking.",
    pricing: "$70/month to $199 for 4-month program (varies by plan)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Noom offers auto-renewing plans — review your renewal date in the app settings.",
      "Longer commitment plans (6 months) have a lower monthly equivalent cost.",
      "Noom frequently runs discounts — you can sometimes lock in a lower rate by chatting with a sales agent before renewing.",
    ],
    cancellationTips: [
      "Cancel through the Noom app by navigating to Settings > Subscription > Cancel.",
      "If you cancel mid-program, you lose access to your coach and group at the end of the billing period.",
      "Noom has a 14-day cancellation policy for refunds on new purchases.",
    ],
    faq: [
      {
        q: "Does Noom require a food scale?",
        a: "No, Noom uses a traffic-light food rating system (green, yellow, red) rather than precise weighing.",
      },
      {
        q: "Is Noom medically supervised?",
        a: "Noom is a behavioral change program, not a medically supervised weight loss plan.",
      },
      {
        q: "Can I use Noom without a smartphone?",
        a: "Noom is app-based and requires a compatible iOS or Android device.",
      },
    ],
    url: "https://www.noom.com",
  },
  {
    slug: "pandora",
    name: "Pandora",
    category: "entertainment",
    description:
      "Pandora is a personalized music streaming service known for its Music Genome Project, offering custom stations, playlists, and podcasts.",
    pricing: "$4.99/month (Plus) or $10.99/month (Premium)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Pandora Premium at $10.99/month includes on-demand listening and offline downloads.",
      "Annual plans are available for both Plus ($54.89/year) and Premium ($119.88/year).",
      "Pandora's subscription revenue supports artists — consider Premium for unlimited skips.",
    ],
    cancellationTips: [
      "Cancel via the Pandora website under 'Account' > 'Subscription'.",
      "If subscribed through Apple or Google, cancel via the respective app store.",
      "You keep access to Premium features until the end of your paid billing period.",
    ],
    faq: [
      {
        q: "What is the difference between Pandora Plus and Premium?",
        a: "Plus allows unlimited skips and offline stations; Premium offers full on-demand playback and playlists.",
      },
      {
        q: "Can I use Pandora outside the US?",
        a: "Pandora is only available in the United States due to licensing restrictions.",
      },
      {
        q: "Does Pandora have a free tier?",
        a: "Yes, the free ad-supported tier offers limited skips and shuffle-only listening.",
      },
    ],
    url: "https://www.pandora.com",
  },
  {
    slug: "paramount-plus",
    name: "Paramount+",
    category: "entertainment",
    description:
      "Paramount+ streams live TV, breaking news, and thousands of movies and shows from CBS, Nickelodeon, Comedy Central, MTV, and Paramount Pictures.",
    pricing: "$5.99/month (Essential) or $11.99/month (Premium with Showtime)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing for Essential ($59.99/year) saves roughly $12 compared to monthly.",
      "The Premium plan bundles Showtime content for a single combined price.",
      "Paramount+ carries live CBS sports including NFL, UEFA Champions League, and NCAA coverage.",
    ],
    cancellationTips: [
      "Cancel via the Paramount+ website under 'Account' > 'Subscription Settings'.",
      "If you subscribed through Amazon Prime Video Channels, cancel via Amazon.",
      "You retain access until the end of the current billing period after canceling.",
    ],
    faq: [
      {
        q: "Does Paramount+ include local CBS stations?",
        a: "Yes, the Premium plan includes a live feed of your local CBS affiliate.",
      },
      {
        q: "Can I download shows for offline viewing?",
        a: "Yes, the Premium plan supports offline downloads on mobile devices.",
      },
      {
        q: "How many simultaneous streams are allowed?",
        a: "Paramount+ allows up to 3 simultaneous streams on both plans.",
      },
    ],
    url: "https://www.paramountplus.com",
  },
  {
    slug: "peacock",
    name: "Peacock",
    category: "entertainment",
    description:
      "Peacock streams NBCUniversal content including hit TV shows, movies, live sports, breaking news, and exclusive Originals with multiple pricing tiers.",
    pricing: "$5.99/month (Premium) or $11.99/month (Premium Plus)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Premium Plus removes ads and includes offline downloads for the full library.",
      "Annual billing ($59.99/year for Premium) saves approximately $12 versus monthly.",
      "Peacock carries Premier League soccer and WWE events — check the live schedule before renewing.",
    ],
    cancellationTips: [
      "Cancel online through the Peacock website under 'Account' > 'Manage Subscription'.",
      "If subscribed via Apple or Google, cancel through the app store.",
      "Access to premium content continues until the end of the billing period.",
    ],
    faq: [
      {
        q: "Does Peacock have a free tier?",
        a: "Yes, Peacock offers a free ad-supported tier with a limited library of shows and movies.",
      },
      {
        q: "Can I watch Peacock on multiple devices?",
        a: "Yes, Peacock allows up to 3 simultaneous streams per account.",
      },
      {
        q: "Is 4K streaming available?",
        a: "Selected movies and live events stream in 4K on the Premium Plus plan.",
      },
    ],
    url: "https://www.peacocktv.com",
  },
  {
    slug: "peloton",
    name: "Peloton",
    category: "entertainment",
    description:
      "Peloton offers live and on-demand fitness classes including cycling, running, strength, yoga, and meditation, accessible via app or Peloton hardware.",
    pricing: "$12.99/month (App One) to $44/month (All-Access)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The All-Access membership ($44/month) is required if you own a Peloton Bike or Tread.",
      "App One at $12.99/month gives you strength, yoga, and outdoor classes without hardware.",
      "Annual plans for the Peloton App are available at a discount — $129.99/year for App One.",
    ],
    cancellationTips: [
      "Cancel via the Peloton website under 'Account' > 'Membership'.",
      "If you cancel All-Access, your Peloton hardware operates in 'Free' mode with limited features.",
      "Cancel before the next billing date to avoid being charged for another month.",
    ],
    faq: [
      {
        q: "Can I use the Peloton app without Peloton equipment?",
        a: "Yes, the Peloton App works with any fitness equipment or bodyweight exercises.",
      },
      {
        q: "How many profiles can I have on one membership?",
        a: "Each membership supports unlimited user profiles.",
      },
      {
        q: "Are live classes included in all plans?",
        a: "Yes, all paid plans include access to live-streamed classes.",
      },
    ],
    url: "https://www.onepeloton.com",
  },
  {
    slug: "philo",
    name: "Philo",
    category: "entertainment",
    description:
      "Philo is a budget-friendly live TV streaming service offering 60+ entertainment and lifestyle channels including AMC, Comedy Central, Discovery, and more.",
    pricing: "$25/month",
    billingCycle: "Monthly",
    renewalTips: [
      "Philo bills a flat $25/month with no hidden fees, taxes, or annual contracts.",
      "Unlimited cloud DVR storage is included at no extra cost.",
      "Philo does not offer annual billing — expect a monthly charge.",
    ],
    cancellationTips: [
      "Cancel anytime via the Philo website under 'Account' > 'Cancel Subscription'.",
      "Your DVR recordings remain accessible for 30 days after cancellation.",
      "Philo does not charge early termination fees.",
    ],
    faq: [
      {
        q: "Does Philo include local channels or sports?",
        a: "No, Philo focuses on entertainment and lifestyle channels; local broadcast and major sports networks are not included.",
      },
      {
        q: "How many simultaneous streams are allowed?",
        a: "Philo allows up to 3 simultaneous streams per account.",
      },
      {
        q: "Can I watch Philo on my TV?",
        a: "Yes, Philo is available on Roku, Apple TV, Fire TV, Android TV, and Chromecast.",
      },
    ],
    url: "https://www.philo.com",
  },
  {
    slug: "shudder",
    name: "Shudder",
    category: "entertainment",
    description:
      "Shudder is a streaming service dedicated to horror, thriller, and supernatural films and series, including exclusive Shudder Originals and curated collections.",
    pricing: "$5.99/month or $56.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $56.99/year is the equivalent of roughly $4.75/month.",
      "Shudder adds new titles weekly — check the 'Coming Soon' page for upcoming releases.",
      "A 7-day free trial lets you explore the library before committing.",
    ],
    cancellationTips: [
      "Cancel via the Shudder website under 'Account' > 'Subscription'.",
      "If you subscribed through Amazon Prime Video Channels, cancel through Amazon.",
      "Your access to horror content continues through the end of the current billing cycle.",
    ],
    faq: [
      {
        q: "Can I download Shudder movies for offline viewing?",
        a: "Yes, the Shudder app supports downloads on iOS and Android devices.",
      },
      {
        q: "How many devices can stream Shudder simultaneously?",
        a: "Shudder allows up to 4 simultaneous streams per account.",
      },
      {
        q: "Does Shudder include live streams or events?",
        a: "Shudder occasionally hosts live-streamed events like movie marathons and filmmaker Q&As.",
      },
    ],
    url: "https://www.shudder.com",
  },
  {
    slug: "skillshare",
    name: "Skillshare",
    category: "entertainment",
    description:
      "Skillshare is an online learning community offering thousands of classes in design, photography, business, writing, and creative arts.",
    pricing: "$13.99/month or $167.88/year (billed annually)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $167.88/year works out to $13.99/month but is charged once yearly.",
      "Skillshare offers a 1-month free trial for new users.",
      "Classes are project-based — factor in time to complete projects before renewing.",
    ],
    cancellationTips: [
      "Cancel via the Skillshare website under 'Account' > 'Billing' > 'Cancel Subscription'.",
      "You keep access to Premium features until the end of your current billing cycle.",
      "If billed through Apple, cancel via Settings > [Your Name] > Subscriptions.",
    ],
    faq: [
      {
        q: "Does Skillshare offer certificates of completion?",
        a: "No, Skillshare is focused on project-based learning and does not provide certificates.",
      },
      {
        q: "Can I download classes to watch offline?",
        a: "Yes, the Skillshare mobile app supports offline viewing of downloaded classes.",
      },
      {
        q: "Are there prerequisites for Skillshare classes?",
        a: "Most classes are designed for all skill levels, from beginner to advanced.",
      },
    ],
    url: "https://www.skillshare.com",
  },
  {
    slug: "sling-tv",
    name: "Sling TV",
    category: "entertainment",
    description:
      "Sling TV is a customizable live TV streaming service that lets you pick channel packages including Sling Orange, Sling Blue, or both combined.",
    pricing: "$35/month (Sling Orange or Blue) or $50/month (Orange + Blue)",
    billingCycle: "Monthly",
    renewalTips: [
      "Sling Orange (31 channels) includes ESPN; Sling Blue (42 channels) includes local NFL and Fox.",
      "Sling often discounts the first month to $20-$25 for new subscribers.",
      "Annual billing is not available — expect monthly charges on your billing date.",
    ],
    cancellationTips: [
      "Cancel easily through the Sling website under 'Account' > 'Cancel Subscription'.",
      "Your access continues through the end of the current billing period.",
      "Sling's 'Pause Subscription' option lets you freeze your account for up to 3 months.",
    ],
    faq: [
      {
        q: "Can I watch Sling TV on multiple devices?",
        a: "Sling Orange allows 1 stream; Sling Blue allows 3; Orange + Blue allows 4 simultaneous streams.",
      },
      {
        q: "Does Sling TV include cloud DVR?",
        a: "Yes, 50 hours of cloud DVR storage is included; DVR Plus add-on expands to 200 hours.",
      },
      {
        q: "Are local channels available on Sling TV?",
        a: "Local channel availability varies by market — Fox and NBC are available in select cities.",
      },
    ],
    url: "https://www.sling.com",
  },
  {
    slug: "soundcloud-go",
    name: "SoundCloud Go",
    category: "entertainment",
    description:
      "SoundCloud Go offers ad-free listening, offline downloads, and access to SoundCloud's vast library of independent and mainstream music tracks.",
    pricing: "$4.99/month (Go) or $9.99/month (Go+)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "SoundCloud Go+ adds full access to major label catalog compared to Go's independent-focused library.",
      "Annual billing is available for both plans at a discounted rate.",
      "Upload limits for artists are not affected by your subscription tier.",
    ],
    cancellationTips: [
      "Cancel via the SoundCloud website under 'Settings' > 'Subscription'.",
      "If subscribed through Apple/Google, cancel via the respective app store.",
      "Offline downloads become unplayable once the subscription ends.",
    ],
    faq: [
      {
        q: "What is the difference between Go and Go+?",
        a: "Go gives ad-free access to independent tracks; Go+ adds the full major-label catalog.",
      },
      {
        q: "Can I upload my own music with SoundCloud Go?",
        a: "Yes, upload features are the same regardless of subscription tier.",
      },
      {
        q: "Is SoundCloud available in all countries?",
        a: "SoundCloud is available worldwide, but track availability varies by region.",
      },
    ],
    url: "https://soundcloud.com/go",
  },
  {
    slug: "spotify",
    name: "Spotify",
    category: "entertainment",
    description:
      "Spotify is the world's most popular audio streaming service, offering millions of songs, podcasts, audiobooks, and personalized playlists.",
    pricing: "$10.99/month (Individual) or $16.99/month (Duo) or $19.99/month (Family)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Spotify Premium Individual is $10.99/month with no annual plan — expect monthly billing.",
      "The Duo plan ($16.99/month) covers two accounts at a discount vs. two Individuals.",
      "Family plan ($19.99/month) covers up to 6 accounts with parental controls.",
    ],
    cancellationTips: [
      "Cancel via the Spotify website under 'Account' > 'Subscription' > 'Cancel Premium'.",
      "If you subscribed through Apple App Store, cancel via Apple's subscription settings.",
      "Your playlists and saved music remain intact after canceling, but you revert to the ad-supported free tier.",
    ],
    faq: [
      {
        q: "Can I keep my downloaded music after canceling?",
        a: "Downloaded songs remain on your device but are only playable while you have an active Premium subscription.",
      },
      {
        q: "Does Spotify offer a student discount?",
        a: "Yes, Spotify Premium Student is $5.99/month and includes Hulu (with ads) and Showtime.",
      },
      {
        q: "How many devices can I use Spotify on?",
        a: "You can log in to as many devices as you want, but only one device can play music at a time (Individual plan).",
      },
    ],
    url: "https://www.spotify.com",
  },
  {
    slug: "starz",
    name: "Starz",
    category: "entertainment",
    description:
      "Starz delivers premium original series, blockbuster movies, and exclusive documentaries with new titles added every week.",
    pricing: "$8.99/month or $74.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $74.99/year saves about $33 compared to the monthly $8.99 plan.",
      "Starz is available as an add-on to Amazon Prime Video Channels, Apple TV, and Hulu.",
      "New Starz Originals drop on Sundays — check the premiere schedule before renewing.",
    ],
    cancellationTips: [
      "If subscribed directly, cancel via the Starz website under 'Account' > 'Cancel Subscription'.",
      "If subscribed through a third-party (Amazon, Apple, Hulu), cancel via that provider.",
      "You maintain access until the end of your current billing period.",
    ],
    faq: [
      {
        q: "Can I download Starz content for offline viewing?",
        a: "Yes, downloads are available on the Starz app for mobile devices.",
      },
      {
        q: "How many simultaneous streams does Starz allow?",
        a: "Starz allows up to 4 simultaneous streams per account.",
      },
      {
        q: "Does Starz include 4K content?",
        a: "Select movies and Originals are available in 4K on supported devices.",
      },
    ],
    url: "https://www.starz.com",
  },
  {
    slug: "strava",
    name: "Strava",
    category: "entertainment",
    description:
      "Strava is a social fitness platform for athletes, tracking running, cycling, swimming, and more with route planning, challenges, and performance analytics.",
    pricing: "$5.99/month or $47.99/year (Summit) — now $11.99/month or $79.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $79.99/year saves roughly $64 compared to paying monthly for the full-feature plan.",
      "Strava's free tier still offers robust tracking — evaluate if you truly need premium analysis.",
      "Summit specific features like Beacon (safety tracking) and route planning are the main premium draws.",
    ],
    cancellationTips: [
      "Cancel through the Strava website under 'Settings' > 'My Account' > 'Subscription'.",
      "If subscribed via Apple/Google, cancel through the app store.",
      "You keep premium features until the end of the current billing period.",
    ],
    faq: [
      {
        q: "Can I create routes on the free plan?",
        a: "Route creation and route sharing are premium features on Strava.",
      },
      {
        q: "Does Strava work with any fitness device?",
        a: "Strava syncs with most GPS watches, bike computers, and fitness trackers.",
      },
      {
        q: "Is my data still visible after canceling premium?",
        a: "Yes, your activities remain visible but with fewer analytics and insights.",
      },
    ],
    url: "https://www.strava.com",
  },
  {
    slug: "sundance-now",
    name: "Sundance Now",
    category: "entertainment",
    description:
      "Sundance Now streams curated independent films, documentaries, and award-winning series from the Sundance Film Festival archive.",
    pricing: "$6.99/month or $69.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The annual plan ($69.99/year) reduces the monthly equivalent to about $5.83.",
      "Sundance Now adds festival films seasonally — time your renewal for maximum new content.",
      "A 7-day free trial is available for new subscribers.",
    ],
    cancellationTips: [
      "Cancel directly on the Sundance Now website under 'My Account'.",
      "Access continues until the end of your paid billing cycle.",
      "If subscribed through Amazon Prime Video Channels, manage cancellation via Amazon.",
    ],
    faq: [
      {
        q: "Can I watch Sundance Now offline?",
        a: "Yes, the Sundance Now app supports downloads on iOS and Android.",
      },
      {
        q: "How many simultaneous streams are allowed?",
        a: "Sundance Now allows up to 4 simultaneous streams.",
      },
      {
        q: "Does Sundance Now include Sundance Film Festival passes?",
        a: "No, the streaming service is separate from the festival's ticketed screenings.",
      },
    ],
    url: "https://www.sundancenow.com",
  },
  {
    slug: "tidal",
    name: "Tidal",
    category: "entertainment",
    description:
      "Tidal is a high-fidelity music streaming service with lossless CD-quality and Master Quality Authenticated (MQA) audio, plus curated playlists and music videos.",
    pricing: "$10.99/month (HiFi) or $19.99/month (HiFi Plus)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "HiFi Plus adds Dolby Atmos spatial audio and direct artist payouts through the Tidal Rising program.",
      "Annual billing is available for both tiers, saving about 2 months' worth of charges.",
      "Tidal's curated playlists are built by expert editors — a key differentiator from competitors.",
    ],
    cancellationTips: [
      "Cancel through the Tidal website under 'Account' > 'Subscription'.",
      "App store subscriptions must be canceled via Apple or Google Play.",
      "You retain HiFi streaming until the end of the current billing period.",
    ],
    faq: [
      {
        q: "What equipment do I need for Tidal's Master quality?",
        a: "Master Quality audio requires compatible DAC hardware or supported headphones.",
      },
      {
        q: "Can I download music for offline listening?",
        a: "Yes, all Tidal plans support offline downloads on mobile devices.",
      },
      {
        q: "Does Tidal offer a family plan?",
        a: "Yes, Tidal Family (up to 6 accounts) is $16.99/month for HiFi or $29.99/month for HiFi Plus.",
      },
    ],
    url: "https://tidal.com",
  },
  {
    slug: "wwe-network",
    name: "WWE Network",
    category: "entertainment",
    description:
      "WWE Network streams every WWE, NXT, and ECW pay-per-view event, plus original programming, documentaries, and an archive of classic matches.",
    pricing: "$9.99/month (or included with Peacock in the US)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "In the US, WWE Network is now part of Peacock Premium — check if you already have access.",
      "International subscribers can access WWE Network directly at $9.99/month.",
      "WWE Network adds new original documentaries monthly.",
    ],
    cancellationTips: [
      "International subscribers cancel via the WWE Network website under 'Account' > 'Subscription'.",
      "US subscribers must cancel through their Peacock account settings.",
      "Access to PPV archives continues until the end of the billing period.",
    ],
    faq: [
      {
        q: "Are live pay-per-views included in the subscription?",
        a: "Yes, all live PPVs including WrestleMania and SummerSlam are included at no extra cost.",
      },
      {
        q: "Can I watch WWE Network offline?",
        a: "Yes, the WWE Network app supports offline downloads on mobile devices.",
      },
      {
        q: "How many devices can stream simultaneously?",
        a: "WWE Network allows up to 2 simultaneous streams per account.",
      },
    ],
    url: "https://www.wwe.com/network",
  },
  {
    slug: "ww-weight-watchers",
    name: "WW (Weight Watchers)",
    category: "entertainment",
    description:
      "WW (formerly Weight Watchers) is a holistic weight management program combining a personalized points system, coaching, workshops, and a supportive community.",
    pricing: "$23/month (Digital) to $54/month (Unlimited Workshops + Coaching)",
    billingCycle: "Monthly",
    renewalTips: [
      "WW bills monthly but requires a 3-month commitment for Digital 360 plans.",
      "Core plan pricing varies by region — check the WW app for your current rate.",
      "Workshop memberships include in-person and virtual sessions with trained coaches.",
    ],
    cancellationTips: [
      "Cancel through the WW app or website under 'Account' > 'Settings' > 'Cancel Membership'.",
      "If you are on a commitment plan, early cancellation may incur a fee equal to remaining months.",
      "Your recipe and tracking data remains in the app after cancellation.",
    ],
    faq: [
      {
        q: "Does WW work for vegetarians or vegans?",
        a: "Yes, the WW Points system accommodates all dietary preferences, including plant-based eating.",
      },
      {
        q: "Can I use WW without attending workshops?",
        a: "Yes, the Digital plan provides the app and tools without in-person meetings.",
      },
      {
        q: "Is there a free trial for WW?",
        a: "WW occasionally offers a limited free trial period for new members.",
      },
    ],
    url: "https://www.weightwatchers.com",
  },
  {
    slug: "youtube-music",
    name: "YouTube Music",
    category: "entertainment",
    description:
      "YouTube Music offers official songs, albums, live performances, covers, and remixes with personalized recommendations and offline listening.",
    pricing: "$10.99/month (Individual) or $16.99/month (Family)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "YouTube Music Premium is included with YouTube Premium ($13.99/month).",
      "Annual billing saves about 15% compared to monthly payment.",
      "Family plan covers up to 5 household members with Google Family Link.",
    ],
    cancellationTips: [
      "Cancel via YouTube Settings > 'Purchases and Memberships' on the web.",
      "If subscribed through Google Play or the YouTube app, manage within the app.",
      "Offline downloads become unplayable after cancellation.",
    ],
    faq: [
      {
        q: "Can I use YouTube Music without ads on the free plan?",
        a: "No, the free plan includes ads; Premium removes ads and enables background playback.",
      },
      {
        q: "Does YouTube Music include video content?",
        a: "Yes, YouTube Music includes official music videos alongside audio tracks.",
      },
      {
        q: "Can I transfer my library from another music service?",
        a: "Google offers a data transfer tool for importing playlists from Spotify, Apple Music, and others.",
      },
    ],
    url: "https://music.youtube.com",
  },
  {
    slug: "youtube-tv",
    name: "YouTube TV",
    category: "entertainment",
    description:
      "YouTube TV is a live TV streaming service with 100+ channels, unlimited cloud DVR, and access to local broadcast networks and major cable channels.",
    pricing: "$72.99/month",
    billingCycle: "Monthly",
    renewalTips: [
      "YouTube TV bills monthly at a flat $72.99 — no annual discount is available.",
      "The Base Plan includes unlimited DVR storage with recordings saved for 9 months.",
      "Add-on packs (4K Plus, Sports Plus, Spanish Plus) each add $9.99-$14.99/month.",
    ],
    cancellationTips: [
      "Cancel via the YouTube TV website under 'Settings' > 'Membership' > 'Pause or Cancel'.",
      "You can pause your membership for up to 6 months instead of canceling.",
      "DVR recordings persist for 21 days after cancellation, then are deleted.",
    ],
    faq: [
      {
        q: "Does YouTube TV include local channels?",
        a: "Yes, YouTube TV includes ABC, CBS, Fox, NBC, and PBS in most markets.",
      },
      {
        q: "How many simultaneous streams are allowed?",
        a: "The Base Plan allows 3 simultaneous streams; the 4K Plus add-on increases this to unlimited in-home streams.",
      },
      {
        q: "Can I share YouTube TV with family?",
        a: "Yes, you can share up to 6 accounts per household with Google Family Sharing.",
      },
    ],
    url: "https://tv.youtube.com",
  },

  // ===== Financial =====
  {
    slug: "paypal",
    name: "PayPal",
    category: "financial",
    description:
      "PayPal is a digital wallet platform that processes online payments, money transfers, and recurring subscription billing across millions of merchants worldwide.",
    pricing: "Free (personal) or 2.99% + $0.49 fee per transaction (business)",
    billingCycle: "Per transaction",
    renewalTips: [
      "PayPal itself has no subscription fee — but it stores your recurring payment agreements that you need to track separately.",
      "Review your PayPal 'Preapproved Payments' page regularly to find forgotten subscriptions.",
      "Set PayPal notifications for every recurring payment to catch unexpected renewals.",
    ],
    cancellationTips: [
      "Cancel recurring payments via PayPal Settings > 'Payments' > 'Manage Automatic Payments'.",
      "Removing a payment method does not cancel subscriptions — you must cancel each agreement individually.",
    ],
    faq: [
      {
        q: "Does PayPal charge for subscriptions?",
        a: "PayPal does not charge users for recurring payments. Merchants pay transaction fees.",
      },
      {
        q: "How do I find all my PayPal subscriptions in one place?",
        a: "Go to Settings > Payments > Manage Automatic Payments to see every active recurring agreement.",
      },
    ],
    url: "https://www.paypal.com",
  },
  {
    slug: "klarna",
    name: "Klarna",
    category: "financial",
    description:
      "Klarna is a buy now, pay later (BNPL) service that lets you split purchases into interest-free installments or pay later, with automatic payment reminders.",
    pricing: "Free (consumer) — late fees may apply",
    billingCycle: "Per installment plan",
    renewalTips: [
      "Klarna sends payment reminders via email and the app — enable push notifications to avoid late fees.",
      "Each installment plan is separate; missing one payment can affect your Klarna purchasing power.",
      "Klarna reports missed payments to credit bureaus in some regions.",
    ],
    cancellationTips: [
      "Cancel a pending order in the Klarna app before the first payment is processed.",
      "You cannot cancel an active installment plan — you must pay the remaining balance.",
      "Close your Klarna account by contacting customer support after all plans are paid off.",
    ],
    faq: [
      {
        q: "Does Klarna affect my credit score?",
        a: "Klarna performs a soft credit check initially. Missed payments may be reported to credit bureaus in some countries.",
      },
      {
        q: "Can I pay off my Klarna plan early?",
        a: "Yes, you can pay off any installment plan early at no extra cost through the Klarna app.",
      },
    ],
    url: "https://www.klarna.com",
  },
  {
    slug: "afterpay",
    name: "Afterpay",
    category: "financial",
    description:
      "Afterpay lets you buy now and pay later in four interest-free installments, with automatic bi-weekly payments and no credit check for most purchases.",
    pricing: "Free (consumer) — late fees up to 25% of order value",
    billingCycle: "Per installment plan",
    renewalTips: [
      "Afterpay auto-deducts payments from your linked card every two weeks — ensure sufficient balance.",
      "Late fees are capped at 25% of the order value or $8, whichever is less, in the US.",
      "Afterpay does not charge interest, but missed payments can restrict future spending limits.",
    ],
    cancellationTips: [
      "Cancel an Afterpay order within the app before the first payment is processed for a full refund.",
      "Once payments have started, you must complete the payment plan or contact support.",
      "Close your Afterpay account by contacting customer support after all plans are cleared.",
    ],
    faq: [
      {
        q: "Does Afterpay run a credit check?",
        a: "Afterpay does not perform credit checks in most regions. Eligibility is based on order history and payment behavior.",
      },
      {
        q: "Can I use Afterpay anywhere?",
        a: "Afterpay is accepted at thousands of online retailers. Look for the Afterpay logo at checkout.",
      },
    ],
    url: "https://www.afterpay.com",
  },
  {
    slug: "credit-karma",
    name: "Credit Karma",
    category: "financial",
    description:
      "Credit Karma provides free credit scores, credit monitoring, and personalized financial recommendations for credit cards, loans, and savings accounts.",
    pricing: "Free",
    billingCycle: "None",
    renewalTips: [
      "Credit Karma is entirely free — there is nothing to renew.",
      "You can opt into credit monitoring alerts for TransUnion and Equifax at no cost.",
      "Credit Karma makes money through personalized offers, not subscriptions.",
    ],
    cancellationTips: [
      "Close your account by contacting Credit Karma support or deleting the app.",
      "Credit score tracking stops once your account is closed.",
      "Unsubscribing from marketing emails does not delete your account.",
    ],
    faq: [
      {
        q: "Does Credit Karma affect my credit score?",
        a: "No, checking your scores on Credit Karma uses a soft pull that does not impact your credit.",
      },
      {
        q: "How often are Credit Karma scores updated?",
        a: "TransUnion and Equifax scores are typically updated weekly.",
      },
      {
        q: "Is Credit Karma really free?",
        a: "Yes, Credit Karma is free. It earns revenue through targeted financial product recommendations.",
      },
    ],
    url: "https://www.creditkarma.com",
  },
  {
    slug: "credit-sesame",
    name: "Credit Sesame",
    category: "financial",
    description:
      "Credit Sesame offers free credit monitoring, identity theft protection, and personalized loan and credit card recommendations based on your credit profile.",
    pricing: "Free (Basic) to $19.95/month (Sesame Protect)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The free tier provides monthly credit scores and monitoring at no charge.",
      "Sesame Protect ($19.95/month) includes $1 million in identity theft insurance.",
      "Premium tier at $15.95/month adds quarterly credit reports from all three bureaus.",
    ],
    cancellationTips: [
      "Cancel paid plans through the Credit Sesame dashboard under 'Account Settings'.",
      "Downgrading to the free tier keeps basic monitoring active.",
      "You remain protected until the end of the current billing cycle after canceling.",
    ],
    faq: [
      {
        q: "Does Credit Sesame provide FICO scores?",
        a: "Credit Sesame provides VantageScore 3.0 scores based on TransUnion data.",
      },
      {
        q: "Can I lock my credit report through Credit Sesame?",
        a: "No, credit freezes must be placed directly with each credit bureau.",
      },
      {
        q: "Is Credit Sesame available in Canada?",
        a: "Yes, Credit Sesame operates in both the US and Canada.",
      },
    ],
    url: "https://www.creditsesame.com",
  },
  {
    slug: "equifax",
    name: "Equifax",
    category: "financial",
    description:
      "Equifax provides credit monitoring, identity theft protection, and credit reports from one of the three major US credit bureaus.",
    pricing: "$15.95/month (Equifax Complete Premier)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing for Equifax Complete reduces the monthly cost to roughly $13.25.",
      "Equifax Complete covers all three bureaus despite the name — you get full tri-bureau monitoring.",
      "Family plan pricing adds coverage for a second adult at a discounted rate.",
    ],
    cancellationTips: [
      "Cancel via the Equifax website under 'My Account' > 'Manage Subscription'.",
      "You retain monitoring services until the end of the billing period.",
      "Cancellation does not delete your credit file — you must request that separately.",
    ],
    faq: [
      {
        q: "Is Equifax Complete the same as a credit freeze?",
        a: "No, monitoring is different from a freeze. A freeze restricts credit access; monitoring alerts you to changes.",
      },
      {
        q: "Can I get my Equifax credit report for free?",
        a: "Yes, you can request one free Equifax report per year at annualcreditreport.com.",
      },
      {
        q: "Does Equifax Complete include dark web monitoring?",
        a: "Yes, Equifax Complete Premier includes dark web surveillance of your personal information.",
      },
    ],
    url: "https://www.equifax.com",
  },
  {
    slug: "experian",
    name: "Experian",
    category: "financial",
    description:
      "Experian offers credit monitoring, identity theft protection, credit reports, and FICO scores with real-time alerts and fraud resolution support.",
    pricing: "Free (Basic) to $24.99/month (IdentityWorks Premium)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Experian's free tier includes a monthly FICO score and basic credit monitoring.",
      "IdentityWorks Premium at $24.99/month covers two adults and includes $1M identity theft insurance.",
      "Annual billing for IdentityWorks saves roughly $50 compared to monthly.",
    ],
    cancellationTips: [
      "Cancel paid plans through the Experian website under 'Membership' > 'Cancel'.",
      "You can revert to the free tier at any time without losing your FICO score access.",
      "Cancel at least 24 hours before the renewal date to avoid the next charge.",
    ],
    faq: [
      {
        q: "Does Experian give a free credit score?",
        a: "Yes, Experian provides a free FICO Score 8 based on your Experian data.",
      },
      {
        q: "What is the difference between Experian and Credit Karma?",
        a: "Experian uses FICO scores; Credit Karma uses VantageScore. Both offer free basic monitoring.",
      },
      {
        q: "Can I lock my Experian credit report through the app?",
        a: "Yes, Experian offers a free credit lock feature within its mobile app.",
      },
    ],
    url: "https://www.experian.com",
  },
  {
    slug: "mint",
    name: "Mint",
    category: "financial",
    description:
      "Mint is a free personal finance management app that connects your accounts to track spending, create budgets, and monitor your credit score.",
    pricing: "Free (with optional Mint Credit Manager paid tier)",
    billingCycle: "Monthly (optional)",
    renewalTips: [
      "Mint's core budgeting and tracking features are completely free.",
      "Mint Credit Manager costs $4.99/month for enhanced credit monitoring.",
      "Mint earns revenue through financial product recommendations and partnerships.",
    ],
    cancellationTips: [
      "Delete your Mint account via the 'Settings' page on the website.",
      "Your transaction history is permanently deleted upon account deletion — export it first.",
      "Credit Manager subscriptions auto-renew monthly until canceled.",
    ],
    faq: [
      {
        q: "Is Mint safe to use for bank account connections?",
        a: "Mint uses 256-bit encryption and read-only access tokens — it cannot move money.",
      },
      {
        q: "Does Mint support investment tracking?",
        a: "Yes, Mint can track investment accounts, though it focuses more on spending and budgeting.",
      },
      {
        q: "How often does Mint update transactions?",
        a: "Transactions typically update every 24-48 hours depending on the financial institution.",
      },
    ],
    url: "https://mint.intuit.com",
  },
  {
    slug: "personal-capital",
    name: "Personal Capital",
    category: "financial",
    description:
      "Personal Capital combines free financial tracking and investment tools with paid wealth management advisory services for high-net-worth individuals.",
    pricing: "Free (tools) or 0.89% AUM (Wealth Management)",
    billingCycle: "Quarterly (advisory fee)",
    renewalTips: [
      "The free dashboard tracks net worth, cash flow, and portfolio allocation at no cost.",
      "Wealth Management clients pay an advisory fee of 0.89% of assets under management, billed quarterly.",
      "Review your portfolio performance quarterly to assess if the advisory fee is justified.",
    ],
    cancellationTips: [
      "Free users can delete their account via 'Settings' > 'Close Account'.",
      "Wealth Management clients can terminate the advisory agreement with 30 days written notice.",
      "Free dashboard access continues for as long as the account exists.",
    ],
    faq: [
      {
        q: "Do I need a minimum balance to use Personal Capital?",
        a: "The free tools have no minimum; Wealth Management requires $100,000 in investable assets.",
      },
      {
        q: "Is my financial data encrypted?",
        a: "Yes, Personal Capital uses AES-256 encryption and multi-factor authentication.",
      },
      {
        q: "Can I use Personal Capital only for tracking without advice?",
        a: "Yes, the free financial dashboard is completely independent of the advisory service.",
      },
    ],
    url: "https://www.personalcapital.com",
  },
  {
    slug: "quicken",
    name: "Quicken",
    category: "financial",
    description:
      "Quicken is a personal finance management software offering budgeting, investment tracking, bill management, and financial reporting for individuals and small businesses.",
    pricing: "$3.99/month (Starter) to $7.99/month (Premier)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing reduces the monthly cost — Quicken Premier for a year is about $83.88.",
      "Quicken requires a subscription — there is no longer a perpetual license option.",
      "Premier adds investment tracking and mutual fund cost basis reporting.",
    ],
    cancellationTips: [
      "Cancel subscription via the Quicken website under 'Account' > 'Manage Subscription'.",
      "You keep access to your data file but lose online connectivity and sync after cancellation.",
      "If you cancel mid-year, you can request a prorated refund within 60 days of renewal.",
    ],
    faq: [
      {
        q: "Can I use Quicken without a subscription?",
        a: "No, Quicken now requires an active subscription for all features.",
      },
      {
        q: "Does Quicken sync with my bank automatically?",
        a: "Yes, Quicken connects to over 14,000 financial institutions for automatic transaction downloads.",
      },
      {
        q: "Is my Quicken data stored locally or in the cloud?",
        a: "Quicken data files are stored locally on your computer, with optional cloud backup.",
      },
    ],
    url: "https://www.quicken.com",
  },
  {
    slug: "rocket-money",
    name: "Rocket Money",
    category: "financial",
    description:
      "Rocket Money (formerly Truebill) helps you track subscriptions, cancel unwanted services, negotiate bills, and manage your personal finances.",
    pricing: "Free (Basic) to $12/month (Premium, pay-what-you-want available)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Rocket Money's premium tier uses a 'pay what you want' model from $4-$12/month.",
      "The premium tier enables bill negotiation and the concierge cancellation service.",
      "Annual billing at $60/year locks in the maximum feature set at a lower cost.",
    ],
    cancellationTips: [
      "Cancel premium via the Rocket Money app under 'Settings' > 'Subscription'.",
      "If subscribed through Apple/Google, cancel via the app store.",
      "You keep premium features until the end of the current billing period.",
    ],
    faq: [
      {
        q: "Is Rocket Money safe to link my bank account?",
        a: "Yes, Rocket Money uses Plaid for bank connections and 256-bit encryption.",
      },
      {
        q: "Can Rocket Money actually cancel subscriptions for me?",
        a: "Yes, Premium members can request concierge cancellation for any subscription.",
      },
      {
        q: "Does Rocket Money affect my credit score?",
        a: "No, Rocket Money does not perform credit checks or report to credit bureaus.",
      },
    ],
    url: "https://www.rocketmoney.com",
  },
  {
    slug: "truebill",
    name: "Truebill",
    category: "financial",
    description:
      "Truebill (now Rocket Money) identifies recurring charges, negotiates bills, and helps you cancel unwanted subscriptions to save money each month.",
    pricing: "Free (Basic) to $12/month (Premium)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Truebill has rebranded to Rocket Money — existing accounts were migrated automatically.",
      "The free tier shows all your subscriptions in one dashboard.",
      "Premium tier's bill negotiation takes a 40% cut of the first year's savings.",
    ],
    cancellationTips: [
      "Cancel premium via the Rocket Money app (formerly Truebill) settings.",
      "Free accounts can simply stop using the service with no action needed.",
      "Export your subscription list before canceling premium to keep your records.",
    ],
    faq: [
      {
        q: "What happened to Truebill?",
        a: "Truebill rebranded to Rocket Money in 2022 with expanded financial management features.",
      },
      {
        q: "Does Truebill still work for subscription tracking?",
        a: "Yes, the same features are now available under the Rocket Money app.",
      },
      {
        q: "Can I negotiate my own bills through Truebill?",
        a: "Truebill provides the data; the concierge negotiation is a premium feature.",
      },
    ],
    url: "https://www.rocketmoney.com",
  },
  {
    slug: "ynab",
    name: "YNAB (You Need A Budget)",
    category: "financial",
    description:
      "YNAB is a zero-based budgeting app that helps you give every dollar a job, break the paycheck-to-paycheck cycle, and build long-term financial stability.",
    pricing: "$14.99/month or $99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $99/year saves about $81 compared to paying monthly.",
      "YNAB offers a 34-day free trial — you can get up to 4 extra months free by referring friends.",
      "YNAB does not auto-renew — you must manually renew an annual subscription.",
    ],
    cancellationTips: [
      "Cancel via the YNAB website under 'Account' > 'Subscription' > 'Cancel'.",
      "Your budget data remains accessible in read-only mode after cancellation.",
      "You can re-subscribe later and pick up exactly where you left off.",
    ],
    faq: [
      {
        q: "Is YNAB suitable for couples?",
        a: "Yes, YNAB supports shared budgeting with real-time syncing between partners.",
      },
      {
        q: "Does YNAB sync with my bank accounts?",
        a: "Yes, YNAB uses Plaid and MX for direct import from thousands of financial institutions.",
      },
      {
        q: "What if I go over budget in a category?",
        a: "YNAB encourages you to move money from other categories rather than seeing it as failure.",
      },
    ],
    url: "https://www.youneedabudget.com",
  },

  // ===== Gaming =====
  {
    slug: "apple-arcade",
    name: "Apple Arcade",
    category: "gaming",
    description:
      "Apple Arcade provides unlimited access to 200+ premium games without ads or in-app purchases, playable across iPhone, iPad, Mac, and Apple TV.",
    pricing: "$6.99/month or $49.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $49.99/year saves roughly $34 compared to monthly.",
      "Apple Arcade is included in the Apple One bundle — check if that bundle saves you more.",
      "New games are added regularly, often alongside Apple's latest hardware launches.",
    ],
    cancellationTips: [
      "Cancel via Settings > [Your Name] > Subscriptions on any Apple device.",
      "You keep access to all games until the end of the billing period.",
      "Game save data is preserved in iCloud if you resubscribe later.",
    ],
    faq: [
      {
        q: "Can I keep my game progress if I cancel?",
        a: "Game progress saved via iCloud is retained and restored when you resubscribe.",
      },
      {
        q: "Do Apple Arcade games include controllers?",
        a: "Many Arcade games support console controllers like Xbox and PlayStation controllers.",
      },
      {
        q: "Can family members share Apple Arcade?",
        a: "Yes, Apple Arcade supports Family Sharing for up to 6 family members.",
      },
    ],
    url: "https://www.apple.com/apple-arcade",
  },
  {
    slug: "ea-play",
    name: "EA Play",
    category: "gaming",
    description:
      "EA Play gives you access to a library of Electronic Arts' top games, exclusive in-game challenges, member rewards, and early trials of new releases.",
    pricing: "$4.99/month (Basic) or $14.99/month (Pro)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "EA Play Pro ($14.99/month) includes brand-new EA releases with unlimited playtime.",
      "Annual billing for EA Play costs $29.99/year (Basic) — saving roughly $30 vs. monthly.",
      "EA Play is included with Xbox Game Pass Ultimate and PC Game Pass at no extra cost.",
    ],
    cancellationTips: [
      "Cancel via the EA website under 'Account Settings' > 'Subscription'.",
      "If subscribed through Xbox or PlayStation, cancel via the respective console store.",
      "You retain access to the game library until the end of the current billing period.",
    ],
    faq: [
      {
        q: "Does EA Play include sports titles like Madden and FIFA?",
        a: "Yes, EA Play includes Madden, FIFA/EA Sports FC, NHL, and UFC titles.",
      },
      {
        q: "Can I play new EA games on day one with EA Play?",
        a: "EA Play Basic offers 10-hour trials; EA Play Pro gives full access to new releases.",
      },
      {
        q: "Is EA Play available on Steam?",
        a: "Yes, EA Play is available as an add-on subscription on Steam.",
      },
    ],
    url: "https://www.ea.com/ea-play",
  },
  {
    slug: "geforce-now",
    name: "GeForce Now",
    category: "gaming",
    description:
      "GeForce Now is NVIDIA's cloud gaming service that streams your existing PC game library from Steam, Epic Games, and other stores with RTX graphics.",
    pricing: "Free (1-hour sessions) to $19.99/month (Ultimate)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Priority ($9.99/month) extends sessions to 6 hours with RTX on.",
      "Ultimate ($19.99/month) gives 8-hour sessions with RTX 4080-class performance.",
      "Annual plans are available at a discount — Ultimate yearly pricing is roughly $199/year.",
    ],
    cancellationTips: [
      "Cancel via the GeForce Now website under 'Account' > 'Membership'.",
      "If you cancel, you drop to the free tier with 1-hour session limits.",
      "Your game library and save files are unaffected by membership cancellation.",
    ],
    faq: [
      {
        q: "Do I need to own games to use GeForce Now?",
        a: "Yes, you must own or have access to games on supported digital storefronts.",
      },
      {
        q: "Does GeForce Now support mods?",
        a: "Mod support is limited and depends on the game and storefront integration.",
      },
      {
        q: "What internet speed is required for GeForce Now?",
        a: "NVIDIA recommends 15 Mbps for 720p/60fps and 35 Mbps for 4K streaming.",
      },
    ],
    url: "https://www.nvidia.com/geforce-now",
  },
  {
    slug: "google-play-pass",
    name: "Google Play Pass",
    category: "gaming",
    description:
      "Google Play Pass provides access to hundreds of premium Android apps and games without ads or in-app purchases for a single monthly fee.",
    pricing: "$4.99/month or $29.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $29.99/year saves about $30 compared to the monthly plan.",
      "Play Pass includes both games and productivity apps — check the full catalog.",
      "Family sharing allows up to 6 family members to use Play Pass on their accounts.",
    ],
    cancellationTips: [
      "Cancel via the Google Play Store app under 'Menu' > 'Subscriptions'.",
      "You keep access to all Play Pass titles until the end of the billing period.",
      "Apps downloaded through Play Pass remain installed but may revert to free versions.",
    ],
    faq: [
      {
        q: "Can I use Google Play Pass on multiple devices?",
        a: "Yes, your subscription works across all Android devices signed into your Google account.",
      },
      {
        q: "What happens to my in-app purchases if I cancel?",
        a: "Items purchased within Play Pass games are tied to the game, not the subscription.",
      },
      {
        q: "Does Google Play Pass include all apps?",
        a: "No, Play Pass includes a curated selection of apps and games, not the entire Play Store.",
      },
    ],
    url: "https://play.google.com/play-pass",
  },
  {
    slug: "humble-choice",
    name: "Humble Choice",
    category: "gaming",
    description:
      "Humble Choice delivers a curated selection of DRM-free PC games each month, with a portion of proceeds supporting charity.",
    pricing: "$11.99/month (Premium)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing for Humble Choice is $119.40/year ($9.95/month) — a 17% saving.",
      "Premium gives you 8+ games per month; the Classic plan (legacy) is cheaper.",
      "Humble Bundle store discounts (up to 20%) apply to all Choice members.",
    ],
    cancellationTips: [
      "Cancel or pause via the Humble Bundle website under 'Settings' > 'My Subscription'.",
      "You can pause your subscription for up to 6 months without losing benefits.",
      "Unclaimed games from previous months are lost if not redeemed before cancellation.",
    ],
    faq: [
      {
        q: "What happens to my game keys if I cancel?",
        a: "All previously claimed game keys remain in your library permanently.",
      },
      {
        q: "Can I skip a month instead of canceling?",
        a: "Yes, you can pause a month and skip billing without losing your subscription.",
      },
      {
        q: "Does Humble Choice include AAA games?",
        a: "Yes, Choice frequently includes AAA titles alongside indie games.",
      },
    ],
    url: "https://www.humblebundle.com/subscription",
  },
  {
    slug: "nintendo-switch-online",
    name: "Nintendo Switch Online",
    category: "gaming",
    description:
      "Nintendo Switch Online enables online multiplayer, cloud save backups, and access to a growing library of classic NES and SNES games.",
    pricing: "$3.99/month or $19.99/year (Individual) or $34.99/year (Family)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual Individual at $19.99/year saves about $28 compared to paying monthly.",
      "The Expansion Pack tier ($49.99/year) adds N64, Sega Genesis, and Mario Kart 8 Deluxe DLC.",
      "Family membership covers up to 8 Nintendo Accounts.",
    ],
    cancellationTips: [
      "Cancel via the Nintendo eShop under 'Account Information' > 'Nintendo Switch Online'.",
      "Auto-renewal can be turned off from the eShop settings on your Switch console.",
      "Cloud save backups are deleted 180 days after membership expiration.",
    ],
    faq: [
      {
        q: "Can I play NES and SNES games offline?",
        a: "Yes, classic games can be launched and played without an internet connection.",
      },
      {
        q: "What happens to my cloud saves if I cancel?",
        a: "Cloud saves are retained for 180 days after your membership ends.",
      },
      {
        q: "Do I need Nintendo Switch Online for all multiplayer games?",
        a: "Most online multiplayer games require a membership, but free-to-play games like Fortnite do not.",
      },
    ],
    url: "https://www.nintendo.com/switch-online",
  },
  {
    slug: "playstation-plus",
    name: "PlayStation Plus",
    category: "gaming",
    description:
      "PlayStation Plus provides online multiplayer, monthly games, exclusive discounts, and cloud storage for PS4 and PS5 save data.",
    pricing: "$9.99/month (Essential) to $17.99/month (Premium)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual Essential ($79.99/year) saves about $40 compared to monthly billing.",
      "Premium tier ($159.99/year) adds game streaming, classic catalog, and time-limited game trials.",
      "Extra tier ($134.99/year) adds the Game Catalog of hundreds of PS4 and PS5 games.",
    ],
    cancellationTips: [
      "Cancel via the PlayStation Store under 'Settings' > 'Account Management' > 'Subscription'.",
      "Auto-renewal is on by default — turn it off immediately after purchase.",
      "You keep access to monthly games and online play until the billing period ends.",
    ],
    faq: [
      {
        q: "Do I keep the monthly games after my subscription ends?",
        a: "Monthly PS Plus games are only playable while your subscription is active.",
      },
      {
        q: "Can I upgrade from Essential to Premium mid-cycle?",
        a: "Yes, the upgrade fee is prorated based on the remaining time on your current plan.",
      },
      {
        q: "Does PS Plus Premium include PS3 game streaming?",
        a: "Yes, Premium tier streams select PS3 games via cloud streaming.",
      },
    ],
    url: "https://www.playstation.com/ps-plus",
  },
  {
    slug: "ubisoft-plus",
    name: "Ubisoft+",
    category: "gaming",
    description:
      "Ubisoft+ gives you unlimited access to 100+ Ubisoft games including new releases, premium editions, DLC, and in-game rewards on PC and console.",
    pricing: "$17.99/month (PC Access) or included with Xbox Game Pass Ultimate",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Ubisoft+ Classics is available at a lower price via PlayStation Extra/Premium.",
      "Annual billing for Ubisoft+ PC Access costs about $179.99/year.",
      "New Ubisoft releases are available on day one with Ubisoft+.",
    ],
    cancellationTips: [
      "Cancel via the Ubisoft website under 'Account' > 'Subscriptions'.",
      "If subscribed through Xbox or PlayStation, cancel via the console store.",
      "You keep access to the game library through the end of the billing cycle.",
    ],
    faq: [
      {
        q: "Do I keep my save files if I cancel?",
        a: "Yes, Ubisoft save files are stored in the cloud and accessible if you resubscribe.",
      },
      {
        q: "Is Ubisoft+ available on Steam?",
        a: "No, Ubisoft+ games are accessed through Ubisoft Connect or Xbox/PlayStation stores.",
      },
      {
        q: "What happens to DLC if I cancel?",
        a: "DLC accessed through Ubisoft+ requires an active subscription to play.",
      },
    ],
    url: "https://www.ubisoft.com/ubisoft-plus",
  },
  {
    slug: "xbox-game-pass",
    name: "Xbox Game Pass",
    category: "gaming",
    description:
      "Xbox Game Pass offers hundreds of high-quality games for console and PC, including first-party titles on day one, with discounts and EA Play included.",
    pricing: "$9.99/month (Core) to $19.99/month (Ultimate)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Game Pass Ultimate ($19.99/month) bundles console, PC, Xbox Cloud Gaming, EA Play, and Xbox Live Gold.",
      "PC Game Pass is $9.99/month and ideal for Windows gamers who do not own an Xbox.",
      "Annual prepaid cards can be stacked up to 36 months for long-term savings.",
    ],
    cancellationTips: [
      "Cancel via the Xbox website under 'Account' > 'Subscriptions'.",
      "Turning off auto-renewal stops future charges but keeps access until the current period ends.",
      "Unused time for Xbox Live Gold is converted to Ultimate at a ratio if upgrading.",
    ],
    faq: [
      {
        q: "Do I keep Game Pass games forever?",
        a: "No, games rotate out of the library, but you keep any purchased games at a discount.",
      },
      {
        q: "Can I play Game Pass games offline?",
        a: "Console titles can be played offline, but PC titles require periodic online check-ins.",
      },
      {
        q: "Are all Microsoft first-party games on day one?",
        a: "Yes, every Microsoft Game Studios title launches on Game Pass on day one.",
      },
    ],
    url: "https://www.xbox.com/game-pass",
  },
  {
    slug: "xbox-game-pass-core",
    name: "Xbox Game Pass Core",
    category: "gaming",
    description:
      "Xbox Game Pass Core (formerly Xbox Live Gold) provides online console multiplayer, a curated library of 25+ games, and member deals and discounts.",
    pricing: "$9.99/month or $59.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $59.99/year saves about $60 compared to monthly.",
      "Game Pass Core includes 25+ games that do not rotate out of the library.",
      "Upgrading to Game Pass Ultimate converts remaining Core time at a 3:2 ratio.",
    ],
    cancellationTips: [
      "Cancel via the Xbox website under 'Account' > 'Subscriptions'.",
      "Online multiplayer access ends when the subscription lapses.",
      "Free Games with Gold titles are only playable with an active Core subscription.",
    ],
    faq: [
      {
        q: "What is the difference between Core and Ultimate?",
        a: "Core provides online multiplayer and 25+ games; Ultimate adds hundreds of games, PC, and cloud gaming.",
      },
      {
        q: "Can I convert Xbox Live Gold to Game Pass Core?",
        a: "Gold was automatically converted to Core in September 2023.",
      },
      {
        q: "Do I need Core for free-to-play online games?",
        a: "No, free-to-play multiplayer games like Fortnite do not require Core.",
      },
    ],
    url: "https://www.xbox.com/game-pass",
  },
  {
    slug: "xbox-game-pass-ultimate",
    name: "Xbox Game Pass Ultimate",
    category: "gaming",
    description:
      "Xbox Game Pass Ultimate combines console, PC, and cloud gaming with EA Play, Xbox Live Gold, and exclusive member perks in one subscription.",
    pricing: "$19.99/month",
    billingCycle: "Monthly",
    renewalTips: [
      "Game Pass Ultimate is the only tier that includes Xbox Cloud Gaming for mobile and tablet play.",
      "You can pre-pay up to 36 months of Core then upgrade to Ultimate to maximize value.",
      "Ultimate members get exclusive perks like in-game content and free trials.",
    ],
    cancellationTips: [
      "Cancel via the Xbox website under 'Account' > 'Subscriptions'.",
      "Cloud gaming access ends immediately when the subscription ends.",
      "EA Play game access from the bundle also stops upon cancellation.",
    ],
    faq: [
      {
        q: "Can I use Xbox Cloud Gaming on my phone?",
        a: "Yes, cloud gaming works on Android and iOS via a web browser or the Game Pass app.",
      },
      {
        q: "How many devices can use Ultimate simultaneously?",
        a: "You can stream on one cloud device and play on your console simultaneously.",
      },
      {
        q: "Does Ultimate include all DLC for included games?",
        a: "No, Ultimate includes base games; DLC and expansions must be purchased separately.",
      },
    ],
    url: "https://www.xbox.com/game-pass",
  },

  // ===== Lifestyle =====
  {
    slug: "apple-fitness-plus",
    name: "Apple Fitness+",
    category: "lifestyle",
    description:
      "Apple Fitness+ brings studio-style workouts to your Apple devices with trainer-led sessions in yoga, HIIT, strength, cycling, and more, synced with Apple Watch metrics.",
    pricing: "$9.99/month or $79.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $79.99/year saves roughly $40 compared to the monthly rate.",
      "Apple Fitness+ is included in the Apple One Premier bundle.",
      "New workout types are added regularly with new trainers every season.",
    ],
    cancellationTips: [
      "Cancel via Settings > [Your Name] > Subscriptions on any Apple device.",
      "You keep access to the workout library until the end of the billing period.",
      "Workout history and achievements remain in Apple Health after cancellation.",
    ],
    faq: [
      {
        q: "Do I need an Apple Watch to use Fitness+?",
        a: "An Apple Watch is recommended but not required; on-screen metrics are visible with or without one.",
      },
      {
        q: "Can I use Fitness+ on a non-Apple device?",
        a: "Fitness+ is exclusive to Apple devices — iPhone, iPad, and Apple TV.",
      },
      {
        q: "Are Fitness+ workouts suitable for beginners?",
        a: "Yes, Fitness+ offers modifications for every exercise and beginner-friendly programs.",
      },
    ],
    url: "https://www.apple.com/apple-fitness-plus",
  },
  {
    slug: "babbel",
    name: "Babbel",
    category: "lifestyle",
    description:
      "Babbel offers conversational language courses designed by linguistic experts, covering 14 languages with speech recognition and real-life dialogue practice.",
    pricing: "$13.95/month (3 months) to $6.95/month (12 months)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The 12-month plan at $6.95/month is the most cost-effective option.",
      "Babbel renews automatically at the end of each subscription period.",
      "Lifetime access is occasionally offered at a flat rate of ~$299.",
    ],
    cancellationTips: [
      "Cancel via the Babbel website under 'My Account' > 'Subscription' before the renewal date.",
      "If subscribed through Apple or Google, cancel via the respective app store.",
      "You retain access to your courses until the end of the paid period.",
    ],
    faq: [
      {
        q: "How many languages does Babbel offer?",
        a: "Babbel offers courses in 14 languages including Spanish, French, German, Italian, and more.",
      },
      {
        q: "Does Babbel offer a free trial?",
        a: "Yes, Babbel offers a 7-day free trial on its mobile app.",
      },
      {
        q: "Can I use Babbel offline?",
        a: "Yes, completed lessons are available for offline review on the mobile app.",
      },
    ],
    url: "https://www.babbel.com",
  },
  {
    slug: "duolingo-plus",
    name: "Duolingo Plus",
    category: "lifestyle",
    description:
      "Duolingo Plus removes ads, gives unlimited hearts, offline lessons, and personalized progress quizzes for learning 40+ languages on the go.",
    pricing: "$6.99/month or $83.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $83.99/year saves about $55 compared to the monthly Duolingo Plus plan.",
      "Super Duolingo (formerly Duolingo Plus) also includes the Family plan for up to 6 members at $119.99/year.",
      "Check your league standings — competitive users benefit most from unlimited hearts.",
    ],
    cancellationTips: [
      "Cancel via the Duolingo website under 'Settings' > 'Subscription'.",
      "If subscribed through Apple or Google, cancel via the app store.",
      "You retain Plus features for the remainder of your billing period.",
    ],
    faq: [
      {
        q: "Can I use Duolingo Plus on multiple devices?",
        a: "Yes, your subscription syncs across all devices logged into your Duolingo account.",
      },
      {
        q: "What happens to my progress if I cancel?",
        a: "Your streak and progress are preserved, but you revert to the free (ad-supported) experience.",
      },
      {
        q: "Does Duolingo Plus include all languages?",
        a: "Yes, Plus covers all languages available on Duolingo.",
      },
    ],
    url: "https://www.duolingo.com/plus",
  },
  {
    slug: "myfitnesspal-premium",
    name: "MyFitnessPal Premium",
    category: "lifestyle",
    description:
      "MyFitnessPal Premium offers calorie tracking, macronutrient goals, meal planning, fitness app sync, and advanced nutrition analytics.",
    pricing: "$19.99/month or $79.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "Annual billing at $79.99/year saves about $160 compared to paying monthly.",
      "Premium removes ads and unlocks macro-specific reports and food analyses.",
      "The free tier still offers comprehensive tracking if you do not need advanced reports.",
    ],
    cancellationTips: [
      "Cancel via the MyFitnessPal website under 'Account' > 'Subscription'.",
      "If subscribed through Apple/Google, cancel via the app store.",
      "Your food diary and history persist in the free tier after cancellation.",
    ],
    faq: [
      {
        q: "Does MyFitnessPal Premium sync with fitness trackers?",
        a: "Yes, Premium syncs with Apple Watch, Fitbit, Garmin, and over 50 other apps.",
      },
      {
        q: "Can I set custom macro goals with Premium?",
        a: "Yes, Premium allows custom calorie, macro, and micronutrient targets.",
      },
      {
        q: "Is the food database different in Premium?",
        a: "No, the food database is the same; Premium adds barcode scanning and meal plans.",
      },
    ],
    url: "https://www.myfitnesspal.com",
  },
  {
    slug: "rosetta-stone",
    name: "Rosetta Stone",
    category: "lifestyle",
    description:
      "Rosetta Stone immerses you in a new language through dynamic immersion, speech recognition, and bite-sized lessons across 24 languages.",
    pricing: "$11.99/month (3 months) to $7.99/month (12 months)",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "The lifetime subscription ($179 one-time) is the most economical for serious learners.",
      "Rosetta Stone often includes lifetime access to all 24 languages with one purchase.",
      "Auto-renewal is on by default — turn it off immediately after purchasing a timed plan.",
    ],
    cancellationTips: [
      "Cancel via the Rosetta Stone website under 'My Account' > 'Subscriptions'.",
      "Lifetime purchases do not require cancellation — they are a one-time fee.",
      "Request a refund within 30 days if unsatisfied with a new purchase.",
    ],
    faq: [
      {
        q: "Does Rosetta Stone teach grammar explicitly?",
        a: "Rosetta Stone uses immersive learning without explicit grammar instruction, similar to how you learned your first language.",
      },
      {
        q: "Can I use Rosetta Stone offline?",
        a: "Yes, the Rosetta Stone app supports offline lessons after downloading course content.",
      },
      {
        q: "How many languages are available?",
        a: "Rosetta Stone offers 24 languages, including Spanish, French, Japanese, Mandarin, and Arabic.",
      },
    ],
    url: "https://www.rosettastone.com",
  },
  // ===== Tech & Tools =====
  {
    slug: "chatgpt-plus",
    name: "ChatGPT Plus",
    category: "tech",
    description: "ChatGPT Plus provides priority access to OpenAI's GPT-4 and GPT-4o models, faster response times, early access to new features, and advanced data analysis.",
    pricing: "$20/month",
    billingCycle: "Monthly",
    renewalTips: ["ChatGPT Plus renews monthly — set a reminder to review if you still use it regularly.", "OpenAI occasionally offers annual billing at a discount for team plans.", "Usage limits apply based on demand, even for Plus subscribers."],
    cancellationTips: ["Cancel via the ChatGPT website under 'Settings' > 'Data controls' > 'Manage subscription'.", "You keep access to Plus features until the end of your billing period.", "Downgrading to Free means losing GPT-4 access and priority during peak times."],
    faq: [
      { q: "Is ChatGPT Plus worth it for casual users?", a: "For casual users, the free tier with GPT-3.5 is usually sufficient. Plus is best for power users who need GPT-4 daily." },
      { q: "Does ChatGPT Plus include DALL-E access?", a: "Yes, Plus includes DALL-E image generation as part of the subscription." },
      { q: "Can I cancel anytime?", a: "Yes, you can cancel anytime and access continues until the end of the billing period." },
    ],
    url: "https://openai.com/chatgpt",
  },
  {
    slug: "claude-pro",
    name: "Claude Pro",
    category: "tech",
    description: "Claude Pro offers priority access to Anthropic's Claude 3 and Claude 4 models, higher usage limits, and faster response times for work and creative tasks.",
    pricing: "$20/month",
    billingCycle: "Monthly",
    renewalTips: ["Claude Pro has a monthly usage cap — monitor your usage each month to avoid hitting limits.", "Annual billing is not currently available for individual Pro plans.", "Usage is measured in messages; heavier users may reach limits before month-end."],
    cancellationTips: ["Cancel via the Anthropic console under 'Account' > 'Subscription'.", "You keep Pro access until the end of your billing cycle.", "Unused time is not refunded but access continues through the paid period."],
    faq: [
      { q: "What is the difference between Claude Free and Claude Pro?", a: "Pro offers 5x higher usage limits, priority during peak times, and early access to new features." },
      { q: "Can I use Claude Pro for commercial projects?", a: "Yes, Claude Pro can be used for commercial work under the standard terms of service." },
      { q: "How many messages can I send with Claude Pro?", a: "Usage limits vary based on demand, but Pro users get roughly 5x more capacity than free users." },
    ],
    url: "https://claude.ai",
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    category: "tech",
    description: "GitHub Copilot provides real-time AI code suggestions in your editor, supporting hundreds of languages and frameworks directly in VS Code, JetBrains, and more.",
    pricing: "$10/month (Individual) or $19/month (Business)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing at $100/year saves $20 compared to monthly.", "Students and open-source maintainers get Copilot for free via GitHub Education.", "Copilot Business ($19/user/month) includes organization-wide policy management."],
    cancellationTips: ["Cancel via GitHub under 'Settings' > 'Copilot' > 'Manage subscription'.", "Access continues until the end of the billing period after cancellation.", "Your Copilot chat history is retained if you resubscribe later."],
    faq: [
      { q: "Does GitHub Copilot work offline?", a: "No, Copilot requires an internet connection to generate code suggestions." },
      { q: "Can I use Copilot with languages other than JavaScript?", a: "Yes, Copilot supports all major languages including Python, TypeScript, Go, Ruby, and Rust." },
      { q: "Is my code shared with GitHub when using Copilot?", a: "Suggestions are generated locally; your code is not stored by GitHub unless you explicitly opt in." },
    ],
    url: "https://github.com/features/copilot",
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    category: "tech",
    description: "Midjourney is a generative AI image creation tool that produces high-quality artistic images from text prompts, accessible via Discord.",
    pricing: "$10/month (Basic) to $60/month (Pro)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing offers a 20% discount across all Midjourney plan tiers.", "Basic ($10/month) gives ~200 generations; Pro ($60/month) gives unlimited with GPU time.", "Midjourney bills through Stripe — check your email for the invoice each month."],
    cancellationTips: ["Cancel via the Midjourney website under 'Account' > 'Manage Subscription'.", "You keep access to your gallery and generations after cancellation.", "Unused GPU time is lost upon cancellation — use it before you cancel."],
    faq: [
      { q: "Do I need Discord to use Midjourney?", a: "Yes, Midjourney is accessed through a Discord bot in the official Midjourney server." },
      { q: "Can I use Midjourney images commercially?", a: "Yes, all paid plans include commercial usage rights for generated images." },
      { q: "What is GPU time?", a: "GPU time is the processing time used to generate images. Different resolutions and features use more or less time." },
    ],
    url: "https://www.midjourney.com",
  },
  {
    slug: "canva-pro",
    name: "Canva Pro",
    category: "tech",
    description: "Canva Pro unlocks premium templates, millions of stock photos and videos, brand kits, background removal, and team collaboration features.",
    pricing: "$12.99/month or $119.99/year",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing at $119.99/year saves about $36 compared to monthly.", "Canva Pro for Teams ($14.99/month for 5 users) scales up with additional seats.", "Free Canva for Education accounts are available for verified teachers and students."],
    cancellationTips: ["Cancel via the Canva website under 'Settings' > 'Account' > 'Billing & Plans'.", "You keep Pro features until the end of your billing cycle.", "Brand kits and uploaded assets remain accessible in the free tier after cancellation."],
    faq: [
      { q: "What is included in Canva Pro that free does not have?", a: "Pro adds background removal, brand kits, 100M+ premium stock assets, and transparent PNG exports." },
      { q: "Can I collaborate with free users on Pro designs?", a: "Yes, free users can edit designs shared by Pro users, but Pro features require a Pro license." },
      { q: "Is there a Canva Pro free trial?", a: "Yes, Canva Pro offers a 30-day free trial for new users." },
    ],
    url: "https://www.canva.com",
  },
  {
    slug: "figma",
    name: "Figma",
    category: "tech",
    description: "Figma is a collaborative interface design tool used for UI/UX design, prototyping, and design systems, accessible entirely in the browser.",
    pricing: "$12/month (Professional) to $75/month (Organization)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves 17% on Professional ($12/month) and Organization ($75/month) plans.", "Figma is free for students and educators with a verified educational email.", "Enterprise plans include custom contracts, SAML SSO, and dedicated support."],
    cancellationTips: ["Cancel via the Figma website under 'Settings' > 'Billing' > 'Plan'.", "You retain access to your files and projects after switching to the free tier.", "Team libraries and shared components remain readable but may require a paid seat to edit."],
    faq: [
      { q: "Is Figma free to use?", a: "Yes, Figma has a generous free tier with unlimited files and up to 3 project pages." },
      { q: "Can I use Figma offline?", a: "Figma is primarily browser-based. The desktop app provides some offline caching, but an internet connection is required for full functionality." },
      { q: "What is the difference between Figma and FigJam?", a: "Figma is for UI/UX design; FigJam is for whiteboarding and brainstorming. Both are included in Figma plans." },
    ],
    url: "https://www.figma.com",
  },
  {
    slug: "notion",
    name: "Notion",
    category: "tech",
    description: "Notion is an all-in-one workspace that combines notes, documents, databases, wikis, and project management in a single flexible platform.",
    pricing: "$10/month (Plus) or $18/month (Business)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing reduces Plus to $8/month and Business to $15/month.", "Notion AI ($10/month per member) adds AI writing and Q&A across your workspace.", "Notion is free for personal use with unlimited pages and blocks."],
    cancellationTips: ["Cancel via the Notion website under 'Settings & Members' > 'Plans'.", "Workspace data is retained in read-only mode after downgrading to the free plan.", "Export your data before canceling — Notion supports Markdown and HTML exports."],
    faq: [
      { q: "Is Notion better than Evernote?", a: "Notion offers more flexibility with databases, relational data, and project management compared to Evernote's primarily note-focused approach." },
      { q: "Does Notion work offline?", a: "Notion has limited offline support on mobile and desktop apps. Full functionality requires an internet connection." },
      { q: "Can I share pages with non-Notion users?", a: "Yes, Notion pages can be published to the web and shared publicly without requiring recipients to have an account." },
    ],
    url: "https://www.notion.so",
  },
  {
    slug: "linear",
    name: "Linear",
    category: "tech",
    description: "Linear is a modern issue tracking and project management tool designed for software teams, emphasizing speed, keyboard shortcuts, and a clean interface.",
    pricing: "$8/month (Standard) to $16/month (Premium)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing offers approximately 20% savings across all Linear tiers.", "Linear is free for teams of up to 10 users with basic features.", "Premium ($16/month per user) adds SLA tracking, intake workflows, and advanced roadmaps."],
    cancellationTips: ["Cancel via the Linear workspace settings under 'Billing' > 'Plan'.", "Data is retained in read-only mode for 30 days after cancellation.", "Export your data using Linear's CSV export before the read-only period ends."],
    faq: [
      { q: "Is Linear only for software teams?", a: "Linear is designed for software teams but can be adapted for any team that needs fast, lightweight project tracking." },
      { q: "Does Linear integrate with GitHub?", a: "Yes, Linear has deep GitHub integration including automatic status updates from pull requests." },
      { q: "What makes Linear different from Jira?", a: "Linear prioritizes speed and developer experience with a minimal interface, while Jira offers more customization at the cost of complexity." },
    ],
    url: "https://linear.app",
  },
  {
    slug: "asana",
    name: "Asana",
    category: "tech",
    description: "Asana is a work management platform that helps teams track projects, tasks, and goals with timelines, workflows, and portfolio views.",
    pricing: "$10.99/month (Premium) to $24.99/month (Business)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves roughly 20% on Premium and Business plans.", "Asana is free for up to 15 users with basic task management features.", "Business tier adds goals, portfolios, and time tracking integrations."],
    cancellationTips: ["Cancel via Asana under 'Admin' > 'Billing' > 'Subscription'.", "Workspace data reverts to the free tier after cancellation.", "Export projects as CSV or JSON before canceling."],
    faq: [
      { q: "Can I use Asana for personal task management?", a: "Yes, Asana's free tier is excellent for personal use, though it is optimized for team collaboration." },
      { q: "Does Asana have a mobile app?", a: "Yes, Asana has iOS and Android apps with core task management and notification features." },
      { q: "How is Asana different from Monday.com?", a: "Asana focuses on task and project management; Monday.com offers more visual customization and CRM-like features." },
    ],
    url: "https://asana.com",
  },
  {
    slug: "monday-com",
    name: "Monday.com",
    category: "tech",
    description: "Monday.com is a visual project management and work operating system that helps teams plan, track, and collaborate across any workflow.",
    pricing: "$9/month (Basic) to $19/month (Standard) per seat",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves approximately 18% across all Monday.com tiers.", "Monday.com bills per seat — review active users regularly to avoid overpaying.", "The Enterprise tier includes custom contracts, advanced security, and premium support."],
    cancellationTips: ["Cancel via Monday.com under 'Admin' > 'Billing' > 'Plan Details'.", "Data is frozen in read-only mode for 30 days after cancellation.", "Downgrade to the free tier before canceling if you want to retain limited access."],
    faq: [
      { q: "Is Monday.com suitable for small teams?", a: "Yes, Monday.com's Basic and Standard tiers are designed for small to medium teams." },
      { q: "Does Monday.com integrate with Slack?", a: "Yes, deep Slack integration allows you to create items, receive notifications, and update tasks from Slack." },
      { q: "Can I create custom workflows in Monday.com?", a: "Yes, Monday.com supports automation recipes to trigger actions based on column changes, due dates, and status updates." },
    ],
    url: "https://monday.com",
  },
  {
    slug: "slack",
    name: "Slack",
    category: "communication",
    description: "Slack is a messaging platform for business communication with channels, direct messages, file sharing, and thousands of app integrations.",
    pricing: "$7.25/month (Pro) or $12.50/month (Business+)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves about 17% on Pro and Business+ plans.", "Slack is free for unlimited users with limited message history (90 days) and 10 app integrations.", "Business+ adds SAML SSO, 99.99% uptime SLA, and 20GB file storage per user."],
    cancellationTips: ["Cancel via Slack under 'Settings & Administration' > 'Workspace Settings' > 'Plan'.", "Your workspace reverts to the free tier with limited message history after cancellation.", "Export your workspace data before canceling — Slack allows exports in various formats."],
    faq: [
      { q: "What happens to my messages if I cancel Slack Pro?", a: "Your messages are retained but become searchable only within the free tier's 90-day history limit." },
      { q: "Can I use Slack for free forever?", a: "Yes, Slack's free tier is unlimited for small teams with the main limitation being message history." },
      { q: "Does Slack integrate with Google Drive?", a: "Yes, Slack integrates deeply with Google Drive, allowing file previews and sharing without leaving the app." },
    ],
    url: "https://slack.com",
  },
  {
    slug: "zoom",
    name: "Zoom One",
    category: "communication",
    description: "Zoom One provides video conferencing with HD video and audio, breakout rooms, cloud recording, and team chat for businesses and individuals.",
    pricing: "$13.32/month (Pro) to $21.39/month (Business)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves about 17% across all Zoom plans.", "Zoom Pro removes the 40-minute limit on group meetings (up to 30 hours per session).", "Business tier ($21.39/month per host) adds 300-participant capacity and transcribed cloud recordings."],
    cancellationTips: ["Cancel via the Zoom website under 'Account' > 'Billing' > 'Plans'.", "You revert to the free tier with 40-minute group meeting limits after cancellation.", "Cloud recordings are retained for 30 days after plan downgrade."],
    faq: [
      { q: "Can I use Zoom for free?", a: "Yes, Zoom's free tier allows unlimited one-on-one meetings and 40-minute group meetings with up to 100 participants." },
      { q: "Does Zoom work without an account?", a: "Yes, participants can join meetings without a Zoom account via a meeting link." },
      { q: "What recording options does Zoom offer?", a: "Zoom supports local recording on all plans and cloud recording on paid plans." },
    ],
    url: "https://zoom.us",
  },
  {
    slug: "google-workspace",
    name: "Google Workspace",
    category: "tech",
    description: "Google Workspace (formerly G Suite) provides business email, cloud storage, and collaborative tools including Gmail, Google Drive, Docs, Sheets, and Meet.",
    pricing: "$6/month (Business Starter) to $18/month (Business Plus)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual contracts with monthly billing are available and save approximately 20% over flexible monthly plans.", "Business Standard ($12/month) adds 2TB storage per user and Google Meet recording.", "No free tier for business accounts — personal Google accounts remain free."],
    cancellationTips: ["Cancel via Google Admin Console under 'Billing' > 'Cancel Subscription'.", "Data remains accessible for 30 days after cancellation before permanent deletion.", "Export all Drive data using Google Takeout before canceling."],
    faq: [
      { q: "Can I keep my custom email after canceling Workspace?", a: "Your custom domain emails will stop working after cancellation unless you migrate to another provider." },
      { q: "Is Google Workspace different from a free Gmail account?", a: "Yes, Workspace adds custom domain email, admin controls, increased storage, and no ads." },
      { q: "Does Google Workspace include Gemini AI features?", a: "Yes, Google Workspace plans include access to Gemini in Gmail, Docs, Sheets, and Meet." },
    ],
    url: "https://workspace.google.com",
  },
  {
    slug: "microsoft-365",
    name: "Microsoft 365",
    category: "tech",
    description: "Microsoft 365 provides Office apps (Word, Excel, PowerPoint), 1TB cloud storage, Outlook email, and Teams collaboration across devices.",
    pricing: "$6.99/month (Personal) or $9.99/month (Family up to 6 users)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves about 25% compared to monthly for Personal ($69.99/year) and Family ($99.99/year).", "Microsoft 365 Family covers up to 6 users with 1TB OneDrive storage each.", "Office apps are installed locally and also available as web apps."],
    cancellationTips: ["Cancel via the Microsoft website under 'Services & Subscriptions' > 'Manage'.", "You lose access to premium features but can still view and print Office documents after cancellation."],
    faq: [
      { q: "Can I use Microsoft 365 on multiple devices?", a: "Yes, Personal covers 1 PC/Mac + 1 tablet + 1 phone; Family covers 6 users x 5 devices each." },
      { q: "Is Microsoft 365 a one-time purchase or subscription?", a: "Microsoft 365 is a subscription. Office Home & Student 2024 is the one-time purchase alternative." },
      { q: "Does Microsoft 365 include Teams?", a: "Yes, Microsoft 365 includes Teams for personal chat, calls, and meetings." },
    ],
    url: "https://www.microsoft.com/microsoft-365",
  },
  {
    slug: "adobe-creative-cloud",
    name: "Adobe Creative Cloud",
    category: "tech",
    description: "Adobe Creative Cloud provides access to 20+ creative apps including Photoshop, Illustrator, Premiere Pro, InDesign, and After Effects with cloud storage.",
    pricing: "$54.99/month (All Apps) or individual apps from $22.99/month",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual plans have an early termination fee if canceled within the first year.", "Photography Plan ($9.99/month) includes Photoshop + Lightroom at a lower price.", "Students and teachers get up to 70% off through Adobe's education store."],
    cancellationTips: ["Cancel via the Adobe website under 'Account' > 'Plans & Payment'.", "Annual plans may require a termination fee (50% of remaining contract value).", "You keep access to locally saved files but cloud storage syncing stops after cancellation."],
    faq: [
      { q: "Can I buy individual apps instead of the full suite?", a: "Yes, individual apps like Photoshop ($22.99/month) and Illustrator ($22.99/month) are available separately." },
      { q: "Is Adobe Creative Cloud available as a one-time purchase?", a: "Adobe apps are subscription-only. Older perpetual license versions are no longer sold." },
      { q: "Does Creative Cloud include Adobe Fonts?", a: "Yes, all Creative Cloud plans include access to thousands of Adobe Fonts for commercial use." },
    ],
    url: "https://www.adobe.com/creativecloud",
  },
  {
    slug: "webflow",
    name: "Webflow",
    category: "tech",
    description: "Webflow is a visual web development platform that lets you design, build, and launch responsive websites without writing code, with built-in hosting and CMS.",
    pricing: "$12/month (Basic site plan) to $36/month (Business CMS)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves about 20% across all Webflow site and account plans.", "Workspace plans (from $19/month) include team collaboration, staging, and localization.", "Student and educator discounts are available with verified educational accounts."],
    cancellationTips: ["Cancel via Webflow under 'Settings' > 'Billing' > 'Plans'.", "Sites revert to a static export state after cancellation — export site code before canceling.", "Unused hosting credits are forfeited upon cancellation."],
    faq: [
      { q: "Can I export my Webflow site if I cancel?", a: "Yes, Webflow allows you to export the HTML, CSS, and JavaScript of your site at any time." },
      { q: "Does Webflow include hosting?", a: "Yes, all published site plans include hosting on AWS CloudFront with SSL certificates." },
      { q: "Is Webflow suitable for e-commerce?", a: "Yes, Webflow has dedicated e-commerce plans with product management, cart, and checkout features." },
    ],
    url: "https://webflow.com",
  },
  {
    slug: "squarespace",
    name: "Squarespace",
    category: "tech",
    description: "Squarespace is an all-in-one website building and hosting platform with designer templates, e-commerce capabilities, and integrated marketing tools.",
    pricing: "$16/month (Personal) to $49/month (Commerce Advanced)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves about 30% — Personal becomes $12/month billed annually.", "Commerce plans include transaction fees ranging from 0–3% depending on the plan tier.", "Domain registration is free for the first year with annual plans."],
    cancellationTips: ["Cancel via Squarespace under 'Settings' > 'Billing' > 'Subscriptions'.", "You can unpublish your site and pause billing instead of fully canceling.", "Domain credits and store data remain accessible for a limited time after cancellation."],
    faq: [
      { q: "Can I switch templates after building my site?", a: "Yes, but content from some template-specific layout blocks may not transfer automatically." },
      { q: "Does Squarespace support blogging?", a: "Yes, Squarespace includes a full blogging platform with RSS, categories, tags, and comments." },
      { q: "Is Squarespace good for SEO?", a: "Yes, Squarespace has built-in SEO tools including clean markup, sitemaps, meta tag editing, and Google Search Console integration." },
    ],
    url: "https://www.squarespace.com",
  },

  // ===== Cloud Storage =====
  {
    slug: "icloud-plus",
    name: "iCloud+",
    category: "tech",
    description: "iCloud+ provides expanded Apple cloud storage, iCloud Private Relay (VPN-like privacy), Hide My Email, and unlimited HomeKit camera streams.",
    pricing: "$0.99/month (50GB) to $9.99/month (2TB)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves about 20% — 200GB plan is $23.88/year vs $2.99/month.", "iCloud+ is bundled with Apple One for additional savings across Apple services.", "Family Sharing lets up to 6 members share a single storage plan."],
    cancellationTips: ["Cancel via Settings > [Your Name] > iCloud > 'Manage Subscription' on Apple devices.", "Data exceeding the free 5GB limit may not sync after downgrading.", "Photos, documents, and backups remain on your device but stop updating to iCloud."],
    faq: [
      { q: "What happens if I exceed my iCloud storage?", a: "Your device stops backing up to iCloud, and new photos/videos stop syncing until you free up space or upgrade." },
      { q: "Can I share iCloud storage with my family?", a: "Yes, iCloud+ supports Family Sharing so all members share the same storage pool." },
      { q: "Is iCloud Private Relay included?", a: "Yes, all iCloud+ plans include iCloud Private Relay, which encrypts and anonymizes your browsing traffic." },
    ],
    url: "https://www.apple.com/icloud",
  },
  {
    slug: "google-one",
    name: "Google One",
    category: "tech",
    description: "Google One provides expanded Google Drive storage, automatic phone backup, VPN access, and Google Workspace premium features across all Google services.",
    pricing: "$1.99/month (100GB) to $9.99/month (2TB)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves 15–17% — 100GB is $19.99/year vs $23.88/year monthly billing.", "2TB plan ($99.99/year) includes Google Workspace Premium features like enhanced Meet calls.", "Family sharing up to 6 members is included on all paid plans."],
    cancellationTips: ["Cancel via Google One website or Google Play Store subscriptions.", "If storage exceeds the free 15GB, your account becomes over quota and may lose access to email and photos.", "You have 2 years to recover data after canceling before permanent deletion."],
    faq: [
      { q: "Does Google One include YouTube Premium?", a: "No, Google One is separate from YouTube Premium, though certain bundles may exist." },
      { q: "Can I keep my data if I downgrade to free?", a: "Yes, but if your data exceeds 15GB, you cannot send or receive emails in Gmail or upload new photos." },
      { q: "Is Google One VPN included?", a: "Yes, Google One plans include VPN access for Android and iOS devices." },
    ],
    url: "https://one.google.com",
  },
  {
    slug: "dropbox",
    name: "Dropbox",
    category: "tech",
    description: "Dropbox is a cloud storage and file synchronization service that allows users to store, share, and collaborate on files across devices.",
    pricing: "$11.99/month (Plus) to $26.99/month (Family 6 users)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves about 20% — Plus is $99.99/year vs $143.88/year billed monthly.", "Family plan ($26.99/month) gives 2TB shared among 6 users — the best value for households.", "Dropbox Professional ($19.99/month) adds 3TB, watermarking, and document tracking."],
    cancellationTips: ["Cancel via Dropbox under 'Settings' > 'Plan' > 'Cancel'.", "You revert to the free 2GB plan after cancellation.", "Files exceeding the free storage limit remain for 30 days before being set to read-only."],
    faq: [
      { q: "What happens to shared links after I cancel?", a: "Shared links continue to work for 30 days after cancellation, then are deactivated." },
      { q: "Does Dropbox have file version history?", a: "Yes, Dropbox Plus keeps 30 days of version history; Professional extends to 180 days." },
      { q: "Can I access Dropbox offline?", a: "Yes, the Dropbox desktop and mobile apps allow offline access to selected files." },
    ],
    url: "https://www.dropbox.com",
  },
  {
    slug: "pcloud",
    name: "pCloud",
    category: "tech",
    description: "pCloud is a cloud storage provider with client-side encryption, file versioning, and a unique lifetime plan option for one-time payment users.",
    pricing: "$4.99/month (500GB) or $175 lifetime (500GB)",
    billingCycle: "Monthly & Annual & Lifetime",
    renewalTips: ["pCloud's lifetime plans are a one-time payment with no recurring renewal — the best long-term value.", "Annual billing saves 20% compared to monthly ($49.99/year for 500GB).", "pCloud Encryption (+$3.99/month) adds client-side zero-knowledge encryption."],
    cancellationTips: ["Cancel via pCloud website under 'Account' > 'Subscription'.", "Lifetime plans do not require cancellation — they are a one-time purchase.", "Auto-renewal can be disabled in your account settings to prevent unwanted charges."],
    faq: [
      { q: "Is pCloud lifetime actually permanent?", a: "Yes, lifetime plans provide access for the lifetime of the account, not a limited term." },
      { q: "Does pCloud offer client-side encryption?", a: "Yes, pCloud Encryption (optional add-on) encrypts files on your device before uploading." },
      { q: "Can I play media files directly from pCloud?", a: "Yes, pCloud's built-in audio and video player supports streaming directly from the cloud." },
    ],
    url: "https://www.pcloud.com",
  },
  {
    slug: "backblaze",
    name: "Backblaze",
    category: "tech",
    description: "Backblaze is a cloud backup service that automatically backs up your entire computer with unlimited storage for a flat annual fee.",
    pricing: "$9/month or $99/year (Unlimited)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing at $99/year saves $9 compared to monthly billing.", "Backblaze backs up everything including external drives connected to your computer.", "Two-year plans offer additional discounts for long-term users."],
    cancellationTips: ["Cancel via Backblaze under 'My Account' > 'Settings' > 'Cancel Subscription'.", "Backups are deleted 30 days after cancellation unless you re-subscribe.", "You can restore your data before canceling via zip download or physical drive shipment."],
    faq: [
      { q: "Does Backblaze back up external drives?", a: "Yes, Backblaze automatically backs up external drives connected to your computer at no extra cost." },
      { q: "How is Backblaze different from Dropbox?", a: "Backblaze is automated backup (continuous, unlimited); Dropbox is file sync and sharing." },
      { q: "Can I restore files from any date?", a: "Yes, Backblaze keeps 30-day version history (or longer with Extended Version History add-on)." },
    ],
    url: "https://www.backblaze.com",
  },

  // ===== VPN & Security =====
  {
    slug: "nordvpn",
    name: "NordVPN",
    category: "tech",
    description: "NordVPN is a leading VPN service offering 5400+ servers in 60+ countries with advanced security features, no-logs policy, and threat protection.",
    pricing: "$12.99/month or $3.79/month (2-year plan)",
    billingCycle: "Monthly & Annual & Multi-Year",
    renewalTips: ["Longer plans drastically reduce the monthly cost — 2-year plans are typically the best value.", "NordVPN auto-renews at the standard monthly rate — switch to manual renewal.", "The Complete plan ($3.99/month for 2 years) adds NordPass and NordLocker."],
    cancellationTips: ["Cancel via NordVPN under 'Account' > 'Payment Information' > 'Cancel Automatic Payments'.", "Multi-year plans do not offer refunds after 30 days.", "Use the 30-day money-back guarantee to test before committing long-term."],
    faq: [
      { q: "Does NordVPN keep logs?", a: "NordVPN maintains a strict no-logs policy and has been independently audited." },
      { q: "How many devices can I use simultaneously?", a: "NordVPN allows up to 10 simultaneous connections per account." },
      { q: "Does NordVPN work with Netflix?", a: "Yes, NordVPN provides dedicated servers optimized for streaming services like Netflix." },
    ],
    url: "https://nordvpn.com",
  },
  {
    slug: "expressvpn",
    name: "ExpressVPN",
    category: "tech",
    description: "ExpressVPN is a premium VPN service known for high-speed servers across 105 countries, robust encryption, and a verified no-logs policy.",
    pricing: "$12.95/month or $6.67/month (12-month plan)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing ($99.95/year) saves about 50% compared to the monthly rate.", "ExpressVPN includes a free VPN router app (Aircove) for whole-home protection.", "30-day money-back guarantee allows risk-free testing on any plan."],
    cancellationTips: ["Cancel via ExpressVPN under 'Account Settings' > 'Cancel Subscription'.", "For plans purchased through the website, follow the cancellation link in your confirmation email.", "ExpressVPN does not offer partial refunds for mid-cycle cancellations."],
    faq: [
      { q: "Is ExpressVPN faster than free VPNs?", a: "Yes, ExpressVPN is significantly faster because it does not throttle bandwidth like many free VPNs." },
      { q: "Does ExpressVPN work in China?", a: "ExpressVPN's Lightway protocol is designed to work in restrictive network environments, including China." },
      { q: "How many devices does ExpressVPN support?", a: "ExpressVPN allows up to 8 simultaneous device connections per account." },
    ],
    url: "https://www.expressvpn.com",
  },
  {
    slug: "1password",
    name: "1Password",
    category: "tech",
    description: "1Password is a password manager that stores and autofills passwords, credit cards, and identities with end-to-end encryption and travel mode.",
    pricing: "$2.99/month (Individual) or $4.99/month (Family up to 5 users)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves about 17% — Individual is $35.88/year vs $35.88/year.", "Family plan ($59.88/year) covers up to 5 users with shared vaults.", "1Password Business ($7.99/month per user) adds SSO, automated provisioning, and activity logs."],
    cancellationTips: ["Cancel via 1Password under 'Account' > 'Subscription' > 'Cancel'.", "Your vault data is retained indefinitely after cancellation — you can still export it.", "You lose the ability to create new items or use 1Password's browser extension."],
    faq: [
      { q: "Can I use 1Password offline?", a: "Yes, 1Password works fully offline with local vault syncing via Wi-Fi between devices." },
      { q: "Is 1Password more secure than browser autofill?", a: "Yes, 1Password encrypts your entire vault with a master password and secret key, providing much stronger protection." },
      { q: "Does 1Password support passkeys?", a: "Yes, 1Password supports passkeys for passwordless authentication across devices." },
    ],
    url: "https://1password.com",
  },
  {
    slug: "bitwarden",
    name: "Bitwarden",
    category: "tech",
    description: "Bitwarden is an open-source password manager offering unlimited password storage, cross-platform sync, and self-hosting options for maximum control.",
    pricing: "$10/year (Premium) or $40/year (Family 6 users)",
    billingCycle: "Annual",
    renewalTips: ["Bitwarden Premium at $10/year is the most cost-effective password manager available.", "The free tier is generous — unlimited passwords, two-step login, and unlimited devices.", "Self-host Bitwarden on your own server for zero reliance on Bitwarden's cloud."],
    cancellationTips: ["Cancel via the Bitwarden website under 'Account' > 'Subscription'.", "Premium features revert to free after cancellation — no data loss.", "Bitwarden's free tier is so comprehensive that many users never need Premium."],
    faq: [
      { q: "Is Bitwarden really free?", a: "Yes, the free tier includes unlimited passwords, unlimited devices, and most core features." },
      { q: "Can I self-host Bitwarden?", a: "Yes, Bitwarden is open-source and offers a self-hosted option for complete data control." },
      { q: "Does Bitwarden have a security audit?", a: "Yes, Bitwarden undergoes regular third-party security audits with results published publicly." },
    ],
    url: "https://bitwarden.com",
  },
  {
    slug: "dashlane",
    name: "Dashlane",
    category: "tech",
    description: "Dashlane is an all-in-one password manager and digital wallet with dark web monitoring, VPN, and phishing alerts for personal and business use.",
    pricing: "$4.99/month (Advanced) or $7.49/month (Friends & Family 10 users)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves about 40% — Advanced is $59.88/year vs $59.88/year.", "Dashlane includes a built-in VPN and dark web scanning for compromised credentials.", "Friends & Family plan covers 10 users with individual vaults and shared items."],
    cancellationTips: ["Cancel via Dashlane under 'Account' > 'Settings' > 'Subscription'.", "Premium features end immediately upon cancellation; free plan access continues.", "Export your data before canceling using Dashlane's CSV export feature."],
    faq: [
      { q: "Does Dashlane work on all browsers?", a: "Yes, Dashlane has extensions for Chrome, Firefox, Safari, Edge, and Brave browsers." },
      { q: "Is Dashlane's VPN included in all plans?", a: "VPN is included with Dashlane Advanced and higher plans at no additional cost." },
      { q: "What happens to my data if I cancel?", a: "Your data is encrypted and stored — you can export it anytime, but premium features like sync stop working." },
    ],
    url: "https://www.dashlane.com",
  },

  // ===== News & Publications =====
  {
    slug: "new-york-times",
    name: "New York Times",
    category: "lifestyle",
    description: "The New York Times digital subscription provides unlimited access to NYT articles, news analysis, investigative journalism, and the NYT Cooking and Games apps.",
    pricing: "$6.25/week (Basic) to $12.50/week (All Access)",
    billingCycle: "Weekly & Annual",
    renewalTips: ["Annual billing reduces the effective weekly cost — check the yearly rate.", "NYT All Access includes Games, Cooking, Wirecutter, and The Athletic.", "The introductory rate increases significantly after the first year — set a renewal reminder."],
    cancellationTips: ["Cancel via the NYT website under 'Account' > 'Help' > 'Cancel Subscription'.", "Subscription continues until the end of the current billing period.", "You can pause your subscription instead of canceling if you are traveling."],
    faq: [
      { q: "Does NYT include the crossword app?", a: "Yes, NYT Games (including Crossword, Spelling Bee, and Wordle) is included with All Access." },
      { q: "Can I share my NYT subscription?", a: "Yes, NYT subscriptions include limited sharing features for household members." },
      { q: "Is NYT Cooking included?", a: "Yes, NYT Cooking with thousands of recipes and meal planning is part of All Access." },
    ],
    url: "https://www.nytimes.com",
  },
  {
    slug: "the-economist",
    name: "The Economist",
    category: "lifestyle",
    description: "The Economist digital subscription delivers weekly global news analysis, in-depth reporting, and the full digital archive with audio editions.",
    pricing: "$15/month or $195/year",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing at $195/year saves about $185 compared to monthly.", "Student subscriptions are available at significant discounts with a .edu email.", "The Economist Espresso app is a daily briefing included in all subscriptions."],
    cancellationTips: ["Cancel via The Economist website under 'Account' > 'Manage Subscription' > 'Cancel'.", "You retain digital access until the end of your paid subscription period.", "Print + Digital subscriptions require separate cancellation of the print portion."],
    faq: [
      { q: "Does The Economist include daily audio briefings?", a: "Yes, The Economist offers full audio editions narrated by professional voice actors." },
      { q: "Can I access The Economist on mobile?", a: "Yes, The Economist has iOS and Android apps with full access for subscribers." },
      { q: "Is there a student discount?", a: "Yes, students save up to 80% with a valid university email address." },
    ],
    url: "https://www.economist.com",
  },
  {
    slug: "medium",
    name: "Medium",
    category: "lifestyle",
    description: "Medium is a publishing platform where members get unlimited access to curated stories from journalists, experts, and writers across thousands of topics.",
    pricing: "$5/month or $50/year",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing at $50/year saves $10 compared to the monthly plan.", "Medium Partner Program allows writers to earn money from member reading time.", "Your membership supports the writers you read directly through revenue sharing."],
    cancellationTips: ["Cancel via Medium under 'Settings' > 'Membership' > 'Cancel Membership'.", "Access to member-only stories ends at the end of your billing cycle.", "Your Medium account and published stories remain visible after cancellation."],
    faq: [
      { q: "Can I read Medium articles for free?", a: "Yes, free users get 3 member-only articles per month before hitting the paywall." },
      { q: "Does Medium have a mobile app?", a: "Yes, Medium has iOS and Android apps with offline reading and audio narration." },
      { q: "Can I write on Medium without a membership?", a: "Yes, anyone can write and publish on Medium for free." },
    ],
    url: "https://medium.com",
  },

  // ===== Email & Marketing =====
  {
    slug: "mailchimp",
    name: "Mailchimp",
    category: "tech",
    description: "Mailchimp is an all-in-one marketing platform for email campaigns, automation, landing pages, and audience management for businesses of all sizes.",
    pricing: "$13/month (Essentials) to $299/month (Premium)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves 15% across all Mailchimp paid plans.", "Mailchimp's free tier supports up to 500 contacts and 1,000 sends per month.", "Pricing scales with contact count — clean your list regularly to avoid overpaying."],
    cancellationTips: ["Cancel via Mailchimp under 'Account' > 'Settings' > 'Billing' > 'Cancel Account'.", "Your audience data is retained for 90 days after cancellation.", "Export all campaigns and reports before canceling."],
    faq: [
      { q: "Is Mailchimp free for small businesses?", a: "Yes, the free tier supports up to 500 contacts and 1,000 email sends per month." },
      { q: "Does Mailchimp support SMS marketing?", a: "Yes, Mailchimp includes SMS marketing as an add-on to any paid plan." },
      { q: "Can I use Mailchimp for transactional emails?", a: "Mailchimp does not support transactional emails; use a dedicated service like SendGrid for that." },
    ],
    url: "https://mailchimp.com",
  },
  {
    slug: "convertkit",
    name: "ConvertKit",
    category: "tech",
    description: "ConvertKit is an email marketing platform built for creators, with visual automation, subscriber tagging, and landing pages designed for audience growth.",
    pricing: "$15/month (Creator) to $29/month (Creator Pro)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves roughly 17% on all ConvertKit plans.", "ConvertKit offers a free plan for up to 1,000 subscribers with basic email features.", "Creator Pro adds subscriber scoring, funnels, and newsletter referral system."],
    cancellationTips: ["Cancel via ConvertKit under 'Account' > 'Billing' > 'Cancel Subscription'.", "You retain access to broadcasts and sequences until the end of the billing period.", "Export your subscriber list as CSV before canceling."],
    faq: [
      { q: "Is ConvertKit better than Mailchimp for creators?", a: "ConvertKit is specifically designed for creators with features like subscriber tags, visual automations, and paid newsletter tools." },
      { q: "Does ConvertKit have landing pages?", a: "Yes, ConvertKit includes unlimited landing pages with customizable templates." },
      { q: "Can I sell digital products with ConvertKit?", a: "Yes, ConvertKit has built-in commerce features for selling digital products and paid subscriptions." },
    ],
    url: "https://convertkit.com",
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    category: "tech",
    description: "HubSpot is an all-in-one CRM, marketing, sales, and customer service platform designed to help businesses grow with inbound marketing strategies.",
    pricing: "$15/month (Starter) to custom (Enterprise)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves roughly 10% across all HubSpot hubs.", "HubSpot's free CRM is generous — unlimited users, deals, and contact management.", "HubSpot pricing increases with contact count — regularly clean your database."],
    cancellationTips: ["Cancel via HubSpot under 'Account' > 'Billing' > 'Subscriptions'.", "Data remains accessible for 30 days after cancellation.", "You can move the remaining subscription value to another product if canceling early."],
    faq: [
      { q: "Is HubSpot really free?", a: "The CRM hub is free with unlimited users and core features. Paid hubs add marketing, sales, and service tools." },
      { q: "Does HubSpot integrate with Gmail?", a: "Yes, HubSpot has a Gmail extension for tracking emails and logging contacts." },
      { q: "Can I try HubSpot before paying?", a: "Yes, HubSpot offers a 14-day free trial on all paid hubs with no credit card required." },
    ],
    url: "https://www.hubspot.com",
  },

  // ===== Hosting & Domains =====
  {
    slug: "namecheap-domain-renewal",
    name: "Namecheap Domains",
    category: "tech",
    description: "Namecheap is a domain registrar and web hosting provider offering competitive domain pricing, free WHOIS privacy, and reliable shared hosting.",
    pricing: "$8.88/year (.com domains) + hosting from $2.18/month",
    billingCycle: "Annual",
    renewalTips: ["Domain renewal prices are higher than first-year rates — transfer to lock in lower prices.", "Namecheap offers free WHOIS privacy protection on all domains.", "Set auto-renew on domains you want to keep and renew before the expiration grace period ends."],
    cancellationTips: [
      "Disable auto-renew in your Namecheap account to stop domain renewal charges.",
      "Domains enter a redemption period after expiration, with higher recovery fees.",
      "Cancel hosting plans separately from domain registration via the dashboard.",
    ],
    faq: [
      { q: "Does Namecheap include free email hosting?", a: "Yes, Namecheap includes free email forwarding and paid email hosting options." },
      { q: "Can I transfer domains to Namecheap?", a: "Yes, Namecheap supports domain transfers and includes an additional year of registration." },
      { q: "What is Namecheap's renewal policy?", a: "Domains auto-renew by default. Auto-renew can be turned off, but expired domains may have recovery fees." },
    ],
    url: "https://www.namecheap.com",
  },
  {
    slug: "godaddy-domain-renewal",
    name: "GoDaddy Domains",
    category: "tech",
    description: "GoDaddy is the world's largest domain registrar, offering domain registration, hosting, website builders, and professional email services.",
    pricing: "$11.99/year (.com domains) + hosting from $5.99/month",
    billingCycle: "Annual",
    renewalTips: ["GoDaddy renewal prices are significantly higher than introductory rates — compare and transfer if needed.", "GoDaddy offers ICANN-mandated 45-day auto-renew grace period.", "Turn off auto-renew in account settings if you do not plan to keep the domain."],
    cancellationTips: [
      "Cancel auto-renew in GoDaddy under 'My Products' > 'Domains' > 'Auto-renew Settings'.",
      "Domain cancellations are not refundable after 48-hour grace period.",
      "Expired domains can be recovered within 25 days of expiration with a redemption fee.",
    ],
    faq: [
      { q: "Why is GoDaddy renewal so expensive?", a: "GoDaddy uses low introductory pricing to attract customers, then charges standard rates on renewal." },
      { q: "Can I transfer my domain away from GoDaddy?", a: "Yes, unlock the domain and obtain the authorization code to transfer to any registrar." },
      { q: "Does GoDaddy offer privacy protection?", a: "Yes, GoDaddy includes Domain Privacy on some plans or as a paid add-on." },
    ],
    url: "https://www.godaddy.com",
  },
  {
    slug: "cloudflare-domain-expiry",
    name: "Cloudflare Domains",
    category: "tech",
    description: "Cloudflare Registrar offers domain registration at cost price with no markups, free WHOIS privacy, and integrated DNS and security services.",
    pricing: "$8.57/year (.com domains) — at-cost pricing",
    billingCycle: "Annual",
    renewalTips: ["Cloudflare sells domains at cost — no markup, no upsells.", "Auto-renew is strongly recommended as Cloudflare does not offer redemption after expiration.", "Domains are managed alongside your Cloudflare DNS and security settings in one dashboard."],
    cancellationTips: [
      "Turn off auto-renew in the Cloudflare dashboard under 'Registrar' > 'Manage Domains'.",
      "Cloudflare does not offer refunds on domain registrations.",
      "You can transfer the domain to another registrar before expiration.",
    ],
    faq: [
      { q: "Is Cloudflare Registrar cheaper than GoDaddy?", a: "Yes, Cloudflare sells domains at the registry price with no markup, often 30-40% cheaper." },
      { q: "Does Cloudflare Registrar support all TLDs?", a: "Cloudflare supports most popular TLDs including .com, .org, .net, .io, and .dev." },
      { q: "Can I transfer my existing domain to Cloudflare?", a: "Yes, you can transfer domains from any registrar to Cloudflare at cost plus one year renewal." },
    ],
    url: "https://www.cloudflare.com/products/registrar",
  },
  {
    slug: "hostinger-renewal",
    name: "Hostinger",
    category: "tech",
    description: "Hostinger is a budget-friendly web hosting provider with shared hosting, cloud hosting, and VPS plans starting at low introductory rates.",
    pricing: "$2.49/month (Premium Shared) — renews at $7.99/month",
    billingCycle: "Monthly & Annual & Multi-Year",
    renewalTips: ["Hostinger's huge introductory discounts apply to the first term only — renewal prices are higher.", "48-month plans lock in the lowest rate for the longest period.", "Renewal reminders are sent 30 days before the end of your current term."],
    cancellationTips: [
      "Cancel auto-renewal in Hostinger under 'Account' > 'Billing' > 'Subscriptions'.",
      "Money-back guarantee applies within 30 days for shared hosting.",
      "Domains registered through Hostinger are separate from hosting cancellations.",
    ],
    faq: [
      { q: "Is Hostinger good for beginners?", a: "Yes, Hostinger's custom control panel is beginner-friendly with one-click WordPress installation." },
      { q: "Does Hostinger include a free domain?", a: "Yes, higher-tier Hostinger plans include a free domain name for the first year." },
      { q: "What is Hostinger's renewal price?", a: "Renewal prices are 3-4x higher than introductory rates — check the renewal price before committing." },
    ],
    url: "https://www.hostinger.com",
  },
  {
    slug: "bluehost",
    name: "Bluehost",
    category: "tech",
    description: "Bluehost is a WordPress-recommended web hosting provider offering shared hosting, site builders, and managed WordPress plans with 24/7 support.",
    pricing: "$2.95/month (Basic) — renews at $11.99/month",
    billingCycle: "Annual & Multi-Year",
    renewalTips: ["Bluehost's low introductory pricing applies to the first 12–36 months only.", "Lock in the rate for 36 months to maximize the introductory discount.", "Bluehost includes a free domain for the first year with all hosting plans."],
    cancellationTips: [
      "Cancel via Bluehost's account management panel under 'My Accounts' > 'Cancel'.",
      "Money-back guarantee is valid for 30 days from purchase.",
      "Domain fees (if registered through Bluehost) are non-refundable after 48 hours.",
    ],
    faq: [
      { q: "Is Bluehost officially recommended by WordPress?", a: "Yes, Bluehost is one of the few hosting providers officially recommended by WordPress.org." },
      { q: "Does Bluehost include SSL certificates?", a: "Yes, all Bluehost plans include a free SSL certificate via Let's Encrypt." },
      { q: "Can I cancel Bluehost at any time?", a: "Yes, but early cancellation of multi-year plans does not refund unused months." },
    ],
    url: "https://www.bluehost.com",
  },
  {
    slug: "siteground",
    name: "SiteGround",
    category: "tech",
    description: "SiteGround is a premium web hosting provider known for excellent customer support, performance-optimized WordPress hosting, and advanced security features.",
    pricing: "$2.99/month (StartUp) — renews at $12.99/month",
    billingCycle: "Annual & Multi-Year",
    renewalTips: ["SiteGround renewal prices are significantly higher than introductory rates.", "SiteGround's 30-day money-back guarantee applies to all shared hosting plans.", "GrowBig ($5.99/month intro, $21.99/month renewal) adds more server resources and priority support."],
    cancellationTips: [
      "Cancel via SiteGround's Client Area under 'My Accounts' > 'Cancel'.",
      "Domains registered through SiteGround must be canceled separately.",
      "A refund is processed within 10 business days after cancellation confirmation.",
    ],
    faq: [
      { q: "Is SiteGround better than Bluehost?", a: "SiteGround generally offers better performance and customer support but has higher renewal prices." },
      { q: "Does SiteGround include staging?", a: "Yes, GrowBig and higher plans include a staging environment for testing changes." },
      { q: "What is SiteGround's uptime guarantee?", a: "SiteGround guarantees 99.99% uptime and provides hosting credits for any downtime." },
    ],
    url: "https://www.siteground.com",
  },
  {
    slug: "digitalocean",
    name: "DigitalOcean",
    category: "tech",
    description: "DigitalOcean provides cloud infrastructure with scalable droplets (VPS), managed databases, Kubernetes, and object storage for developers.",
    pricing: "$4/month (Basic Droplet) to custom (Enterprise)",
    billingCycle: "Hourly & Monthly",
    renewalTips: ["DigitalOcean bills hourly, so destroying unused droplets stops charges immediately.", "Set spending alerts in your DigitalOcean account to avoid surprise bills.", "Reserved Droplets (1-year or 3-year) offer up to 35% savings over on-demand pricing."],
    cancellationTips: [
      "Destroy all droplets and resources in the DigitalOcean control panel.",
      "Remove your payment method in 'Settings' > 'Billing' after destroying all resources.",
      "Unused credits or promo balances are forfeited upon account closure.",
    ],
    faq: [
      { q: "Does DigitalOcean offer managed hosting?", a: "Yes, DigitalOcean offers managed databases, Kubernetes, and App Platform (PaaS)." },
      { q: "How does DigitalOcean pricing work?", a: "DigitalOcean charges by the hour for droplets and fixed monthly rates for managed services." },
      { q: "Is DigitalOcean good for beginners?", a: "DigitalOcean requires technical knowledge. For beginners, shared hosting or a managed WordPress plan is easier." },
    ],
    url: "https://www.digitalocean.com",
  },
  {
    slug: "wp-engine",
    name: "WP Engine",
    category: "tech",
    description: "WP Engine is a premium managed WordPress hosting platform with automated backups, staging environments, performance optimization, and expert support.",
    pricing: "$20/month (Startup) to custom (Enterprise)",
    billingCycle: "Monthly & Annual",
    renewalTips: ["Annual billing saves 20% compared to monthly on WP Engine plans.", "WP Engine includes StudioPress themes and the Genesis framework at no extra cost.", "Traffic overages are billed at $2 per 1,000 additional visitors — monitor your analytics."],
    cancellationTips: [
      "Cancel via WP Engine's portal under 'Account' > 'Cancel Plan'.",
      "WP Engine offers a 60-day money-back guarantee on annual plans.",
      "Download all site data and backups before canceling."
    ],
    faq: [
      { q: "Is WP Engine worth the premium price?", a: "If you run a business-critical WordPress site, WP Engine's performance, security, and support justify the cost." },
      { q: "Does WP Engine include email hosting?", a: "No, WP Engine recommends using Google Workspace or Microsoft 365 for email." },
      { q: "Can I use WP Engine for multiple sites?", a: "Yes, the Growth plan covers up to 10 sites, and the Scale plan covers up to 30 sites." },
    ],
    url: "https://wpengine.com",
  },
  {
    slug: "hostgator-domain-renewal",
    name: "HostGator",
    category: "tech",
    description:
      "HostGator is a popular web hosting provider offering domain registration, shared hosting, VPS, and dedicated servers with competitive introductory pricing and higher renewal rates.",
    pricing: "$2.99/month intro, renews at $6.99–$8.99/month",
    billingCycle: "Monthly & Annual",
    renewalTips: [
      "HostGator's introductory prices are significantly lower than renewal rates — expect prices to increase 2-3x after the first term.",
      "Lock in the best rate by choosing the longest initial billing cycle (36 months) when signing up.",
      "Set reminders 30 days before hosting renewal to evaluate whether you still need the plan before auto-renewal kicks in.",
    ],
    cancellationTips: [
      "Cancel hosting via HostGator's portal under 'Billing' > 'Cancel'.",
      "Domain registrations must be canceled or transferred separately from hosting.",
      "HostGator offers a 45-day money-back guarantee on shared hosting plans.",
    ],
    faq: [
      { q: "How much does HostGator charge for hosting renewal?", a: "HostGator renewal prices are typically 2-3x higher than introductory rates. A $2.99/month intro plan may renew at $6.99–$8.99/month." },
      { q: "Does HostGator offer a grace period after expiration?", a: "Yes, HostGator provides a grace period of approximately 30 days for domain renewals before additional fees apply." },
      { q: "Can I transfer my HostGator domain to another registrar?", a: "Yes, unlock the domain in your HostGator dashboard and obtain the EPP code to transfer to any other registrar." },
    ],
    url: "https://www.hostgator.com",
  },
];

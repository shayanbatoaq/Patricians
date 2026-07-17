export const companyName = "Patricians";
export const companyTagline = "Engineering Intelligent Growth";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Clientele", href: "/clientele" },
  { label: "Contact", href: "/contact" },
] as const;

export const contactDetails = {
  email: {
    label: "Email",
    value: "info@patricians.pk",
    href: "mailto:info@patricians.pk",
  },
  phone: {
    label: "Phone",
    value: "+92 333 2612654",
    href: "tel:+923332612654",
  },
} as const;

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/patricianspak/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61586050635541",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/patricianspk/?viewAsMember=true",
  },
] as const;

export type ServiceSlug =
  | "ai-chatbots"
  | "websites-in-3-days"
  | "ai-social-media-marketing"
  | "mobile-app-development";

export type Service = {
  slug: ServiceSlug;
  icon: string;
  label: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  focus: string[];
  introTitle: string;
  introText: string;
  benefits: Array<{ title: string; description: string; icon: string }>;
  process: Array<{ step: string; title: string; description: string }>;
  deliverables: string[];
  whyPatricians: string[];
  heroHighlights: string[];
  ctaTitle: string;
  ctaText: string;
};

export type MarketingPlan = {
  name: string;
  price: string;
  tagline: string;
  bestFor: string;
  icon: string;
  badge?: string;
  featured?: boolean;
  accentClassName: string;
  accentSoftClassName: string;
  highlights: string[];
  includes: string[];
  reelsStrategy: string;
  ctaLabel: string;
};

export type ChatbotPlan = {
  name: string;
  price: string;
  commitment: string;
  role: string;
  bestFor: string;
  icon: string;
  badge?: string;
  featured?: boolean;
  accentClassName: string;
  accentSoftClassName: string;
  positioning: string;
  usage: string;
  overage: string;
  support: string;
  includes: string[];
  limitations?: string[];
  ctaLabel: string;
};

export const services = [
  {
    slug: "ai-chatbots",
    icon: "message",
    label: "AI Website Assistants",
    title: "AI Website Assistants",
    seoTitle: "AI Website Assistants | Patricians",
    seoDescription:
      "Patricians builds branded AI website assistants that answer questions, capture leads, qualify prospects, and improve customer experience.",
    eyebrow: "Always-On Customer Experience",
    shortDescription:
      "Premium website assistants designed for 24/7 support, lead capture, qualification, FAQs, and conversion support.",
    description:
      "We build branded AI chat experiences that answer questions, qualify visitors, and support sales or service workflows directly on your website.",
    focus: [
      "24/7 customer assistance",
      "Lead capture and qualification",
      "Website-integrated recurring assistant systems",
    ],
    introTitle: "A website assistant that feels useful, not ornamental",
    introText:
      "A high-quality website assistant should do more than sit in the corner of the screen. Patricians designs AI chat experiences that support visitors, reduce repetitive questions, and move serious inquiries toward the right next step.",
    benefits: [
      {
        title: "Round-the-clock support",
        description:
          "Help visitors get answers and direction even when your team is offline.",
        icon: "sparkles",
      },
      {
        title: "Smarter lead capture",
        description:
          "Qualify visitors and collect useful context before a human conversation begins.",
        icon: "users",
      },
      {
        title: "Better website engagement",
        description:
          "Turn passive traffic into active conversations with clear intent and routing.",
        icon: "globe",
      },
    ],
    process: [
      {
        step: "01",
        title: "Use-case definition",
        description:
          "We identify the support, sales, FAQ, and qualification flows the website assistant needs to handle.",
      },
      {
        step: "02",
        title: "Conversation design",
        description:
          "We structure responses, escalation paths, lead capture points, and brand tone.",
      },
      {
        step: "03",
        title: "Integration and training",
        description:
          "We connect the website assistant to your website and shape the knowledge it should rely on.",
      },
      {
        step: "04",
        title: "Support and refinement path",
        description:
          "We match the support and optimization rhythm to the selected plan, from stable maintenance to ongoing conversion-focused improvement.",
      },
    ],
    deliverables: [
      "Branded website assistant setup for your website",
      "Lead capture and qualification flows",
      "FAQ and support response design",
      "Escalation pathways for high-intent inquiries",
      "Support and optimization path matched to the selected plan",
    ],
    whyPatricians: [
      "We treat website assistant design as part of the customer experience, not an add-on.",
      "We build for clarity, conversion, and trust instead of novelty.",
      "We structure each plan so support, automation, and optimization match the business need.",
    ],
    heroHighlights: [
      "24/7 assistance with premium brand presentation",
      "Lead capture, qualification, and conversion support on-site",
      "No setup fee with a 3-month commitment required",
    ],
    ctaTitle: "Turn your website into a smarter front door",
    ctaText:
      "We can build a website assistant that supports visitors, captures better leads, and fits your brand.",
  },
  {
    slug: "websites-in-3-days",
    icon: "screen",
    label: "High-End Websites Within Days",
    title: "High-End Websites Within Days",
    seoTitle: "High-End Websites Within Days | Patricians",
    seoDescription:
      "Patricians designs and develops high-end websites within days for businesses that need premium presentation, strong front-end execution, and clear conversion paths.",
    eyebrow: "Fast Premium Delivery",
    shortDescription:
      "High-end websites delivered with speed, modern design direction, strong front-end quality, and clear conversion intent.",
    description:
      "We create premium business-facing websites quickly without making the work look rushed, generic, or template-driven.",
    focus: [
      "Fast premium delivery",
      "Modern design and clean front-end execution",
      "Conversion-focused website structure",
    ],
    introTitle: "Speed without sacrificing polish",
    introText:
      "This offer is built for businesses that need a serious website quickly. Patricians combines AI-assisted production with strong front-end craft, giving you a fast launch path without settling for low-end execution.",
    benefits: [
      {
        title: "Fast launch path",
        description:
          "Move from idea to a premium live presence on an accelerated timeline.",
        icon: "rocket",
      },
      {
        title: "Sharper first impressions",
        description:
          "Launch with a visual system and interface quality that feels high trust from day one.",
        icon: "layers",
      },
      {
        title: "Conversion-aware structure",
        description:
          "Guide visitors with clearer page hierarchy, stronger messaging, and focused CTAs.",
        icon: "arrow",
      },
    ],
    process: [
      {
        step: "01",
        title: "Fast discovery",
        description:
          "We gather positioning, content direction, business goals, and necessary references.",
      },
      {
        step: "02",
        title: "Design and build sprint",
        description:
          "We shape the layout, brand treatment, and site structure in a tightly managed execution window.",
      },
      {
        step: "03",
        title: "Refinement pass",
        description:
          "We tighten the details, responsiveness, content hierarchy, and interaction polish.",
      },
      {
        step: "04",
        title: "Launch-ready handoff",
        description:
          "We deliver a site that feels premium, clear, and ready to represent the business properly.",
      },
    ],
    deliverables: [
      "Premium responsive website build",
      "Clear page structure and conversion-focused sections",
      "AI-assisted production for faster turnaround",
      "Modern front-end interactions and refined polish",
      "Launch-ready assets and content structure",
    ],
    whyPatricians: [
      "We move quickly without leaning on low-effort agency templates.",
      "We pair speed with strong visual judgment and front-end quality.",
      "We design for credibility, clarity, and modern business positioning.",
    ],
    heroHighlights: [
      "Premium web delivery in an accelerated window",
      "Modern design with strong front-end detail",
      "Conversion-focused structure built for business use",
    ],
    ctaTitle: "Launch a serious website on a faster timeline",
    ctaText:
      "If you need a premium web presence quickly, we can build it with quality and control.",
  },
  {
    slug: "ai-social-media-marketing",
    icon: "megaphone",
    label: "AI Social Media Marketing",
    title: "AI Social Media Marketing",
    seoTitle: "AI Social Media Marketing | Patricians",
    seoDescription:
      "Patricians delivers Meta-only social media marketing for Facebook and Instagram with content systems, reels editing, ad setup, and reporting for growing businesses.",
    eyebrow: "Smarter Growth Systems",
    shortDescription:
      "Meta-only social media marketing for Facebook and Instagram with premium content systems, reels strategy, and ad-ready execution.",
    description:
      "We help businesses grow on Facebook and Instagram with clearer content systems, reels editing, Meta ads support, and reporting that is easy to understand.",
    focus: [
      "Facebook + Instagram management",
      "Content, reels, and Meta ads",
      "Clearer reporting and optimization",
    ],
    introTitle: "Meta growth systems with clearer structure",
    introText:
      "Patricians keeps social media marketing focused on the Meta platforms that matter most for many businesses: Facebook and Instagram. We build a cleaner operating rhythm around content, reels, ads, and reporting so growth feels easier to run, refine, and scale.",
    benefits: [
      {
        title: "Stronger Meta presence",
        description:
          "Stay active on Facebook and Instagram with sharper page setup, clearer content direction, and a more reliable posting rhythm.",
        icon: "wand",
      },
      {
        title: "Better short-form creative",
        description:
          "Use edited reels, better hooks, and cleaner creative structure to improve reach, engagement, and response quality.",
        icon: "chart",
      },
      {
        title: "More disciplined growth",
        description:
          "Connect organic content, conversion-focused reels, and Meta ads into a growth system that feels easier to manage.",
        icon: "briefcase",
      },
    ],
    process: [
      {
        step: "01",
        title: "Meta audit and direction",
        description:
          "We review your current Facebook and Instagram presence, offer positioning, and the content gaps holding growth back.",
      },
      {
        step: "02",
        title: "Content and reel planning",
        description:
          "We shape the monthly content mix, reel direction, captions, and CTA structure around your business goals.",
      },
      {
        step: "03",
        title: "Execution and ads layer",
        description:
          "We publish the content, edit client-provided clips into reels, and launch or manage Meta ads when the selected plan includes paid growth.",
      },
      {
        step: "04",
        title: "Reporting and refinement",
        description:
          "We track the right signals, review performance, and refine the creative or targeting based on what is getting response.",
      },
    ],
    deliverables: [
      "Facebook and Instagram page setup or optimization",
      "Monthly content planning, design direction, and posting cadence",
      "Reels editing from client-provided raw video clips",
      "Captions, hashtags, CTA writing, and content structure",
      "Meta ads setup, monitoring, or optimization depending on plan",
      "Monthly reporting with performance insights and next-step refinement",
    ],
    whyPatricians: [
      "We keep the offer focused on Meta instead of spreading effort across too many channels.",
      "We structure the packages so the jump from presence to engagement to leads to paid scale is easy to understand.",
      "We bring the same premium creative direction and disciplined execution to social media that we bring to web and product work.",
    ],
    heroHighlights: [
      "Meta-only strategy for Facebook and Instagram",
      "Organic content, reels, and paid ads in one clear progression",
      "Packages designed around clarity, conversion, and scale",
    ],
    ctaTitle: "Build a clearer Meta social media growth system",
    ctaText:
      "If you want a sharper Facebook and Instagram presence with a clearer growth plan, we can build the right package around it.",
  },
  {
    slug: "mobile-app-development",
    icon: "smartphone",
    label: "AI-Enhanced Mobile App Development",
    title: "AI-Enhanced Mobile App Development",
    seoTitle: "AI-Enhanced Mobile App Development | Patricians",
    seoDescription:
      "Patricians develops AI-enhanced mobile apps and MVPs with modern UX, faster launch timelines, and product-focused execution.",
    eyebrow: "Fast Product Launches",
    shortDescription:
      "AI-enhanced MVP app development for modern mobile products, business use cases, and faster launch paths.",
    description:
      "We help businesses shape and build mobile app experiences with a faster execution model and an AI-enhanced product development approach.",
    focus: [
      "MVP mobile products",
      "Modern mobile experience design",
      "Fast launch strategy for business use cases",
    ],
    introTitle: "A more focused way to launch mobile products",
    introText:
      "Patricians brings product thinking, interface quality, and AI-assisted execution into mobile app development. The result is a faster route to a usable MVP without losing the clarity and polish that matter when a product is new.",
    benefits: [
      {
        title: "Quicker MVP momentum",
        description:
          "Compress idea-to-launch timelines with a more efficient product build process.",
        icon: "clock",
      },
      {
        title: "Modern user experience",
        description:
          "Create mobile experiences that feel current, usable, and business-ready.",
        icon: "smartphone",
      },
      {
        title: "Better product clarity",
        description:
          "Focus early scope around the features and flows that actually matter for launch.",
        icon: "badge",
      },
    ],
    process: [
      {
        step: "01",
        title: "Scope and product framing",
        description:
          "We define the MVP, the business use case, and the key user flows worth building first.",
      },
      {
        step: "02",
        title: "Experience design",
        description:
          "We structure the interface, navigation, and product rhythm around usability and launch goals.",
      },
      {
        step: "03",
        title: "AI-enhanced build",
        description:
          "We accelerate delivery with an efficient build process while keeping product quality high.",
      },
      {
        step: "04",
        title: "Launch preparation",
        description:
          "We help shape the product into something clearer, leaner, and more ready for real users.",
      },
    ],
    deliverables: [
      "MVP mobile app planning and structure",
      "Modern mobile UI/UX direction",
      "AI-enhanced product delivery process",
      "Business-focused feature prioritization",
      "Launch-oriented product refinement",
    ],
    whyPatricians: [
      "We bring product judgment, modern UI standards, and AI-assisted speed together.",
      "We focus on MVPs that feel deliberate rather than improvised.",
      "We align app delivery with business use, launch readiness, and clarity of scope.",
    ],
    heroHighlights: [
      "AI-assisted MVP product delivery",
      "Modern mobile experiences with business intent",
      "Fast launch approach for high-priority product ideas",
    ],
    ctaTitle: "Launch your mobile product with more clarity and less drag",
    ctaText:
      "If you need an MVP or a sharper mobile product path, we can help structure and build it.",
  },
] satisfies ReadonlyArray<Service>;

export const homeWhyPatricians = [
  {
    title: "AI-first thinking",
    description:
      "We lead with intelligent customer experiences, AI-supported social media systems, and clear digital strategy before surface-level tactics.",
    icon: "brain",
  },
  {
    title: "Premium execution",
    description:
      "Every touchpoint is designed to feel considered, business-ready, and high trust.",
    icon: "shield",
  },
  {
    title: "Modern delivery speed",
    description:
      "We use AI-enhanced workflows to move faster while keeping the work sharp.",
    icon: "rocket",
  },
  {
    title: "Strategic clarity",
    description:
      "We help businesses choose the right system, product, or growth move instead of overbuilding.",
    icon: "layers",
  },
] as const;

export const homeProcess = [
  {
    step: "01",
    title: "Clarity",
    description:
      "We define the actual business need, not just the requested deliverable.",
  },
  {
    step: "02",
    title: "System Design",
    description:
      "We shape the website, website assistant, social media marketing, or app approach around outcomes.",
  },
  {
    step: "03",
    title: "Execution",
    description:
      "We build with speed, premium design judgment, and clean implementation.",
  },
  {
    step: "04",
    title: "Refinement",
    description:
      "We improve the result after launch so it keeps becoming more useful and effective.",
  },
] as const;

export const aboutPrinciples = [
  {
    title: "Mission",
    description:
      "Build intelligent systems and modern digital products that help businesses operate and grow with more control.",
  },
  {
    title: "Vision",
    description:
      "A future where growing companies run on cleaner workflows, better interfaces, and more intelligent digital systems instead of scattered effort.",
  },
  {
    title: "Operating Style",
    description:
      "Founder-led thinking, direct execution, premium standards, and a bias toward clarity over noise.",
  },
] as const;

export const contactFaq = [
  {
    question: "Can we start with one focused service?",
    answer:
      "Yes. Many engagements begin with a single website, website assistant, social media marketing plan, or mobile product and expand from there.",
  },
  {
    question: "Do you support ongoing work?",
    answer:
      "Yes. Website assistants, social media systems, and product improvements often benefit from an ongoing optimization model.",
  },
  {
    question: "Is Patricians only for large companies?",
    answer:
      "No. We work best with businesses that value clarity, quality, and intelligent execution, regardless of company size.",
  },
] as const;

export const contactServiceOptions = [
  "AI Website Assistants",
  "High-End Websites Within Days",
  "AI Social Media Marketing",
  "Mobile App Development",
] as const;

export const socialMediaMarketingPlans: ReadonlyArray<MarketingPlan> = [
  {
    name: "Ignite",
    price: "$99 / month",
    tagline: "Start your online presence",
    bestFor: "New businesses",
    icon: "flame",
    accentClassName: "from-emerald-500 via-emerald-400 to-lime-300",
    accentSoftClassName:
      "border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(236,253,245,0.96)_100%)]",
    highlights: ["8 posts / month", "0-2 reels / month", "Meta setup"],
    includes: [
      "Meta page setup and optimization for Facebook and Instagram",
      "Static content posting with a consistent monthly schedule",
      "Basic captions and hashtags",
      "Monthly performance summary",
    ],
    reelsStrategy:
      "Basic presence only with simple edits or slideshow reels. No advanced editing or trend-led reel strategy.",
    ctaLabel: "Get Started",
  },
  {
    name: "Propel",
    price: "$149 / month",
    tagline: "Build an engaged audience",
    bestFor: "Businesses that want better engagement",
    icon: "rocket",
    accentClassName: "from-sky-600 via-blue-500 to-cyan-300",
    accentSoftClassName:
      "border-sky-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(239,246,255,0.96)_100%)]",
    highlights: ["12 posts / month", "4 reels / month", "Audience growth"],
    includes: [
      "Static posts and carousels built around educational, promotional, and trust content pillars",
      "Caption hooks and call-to-actions",
      "Basic competitor analysis",
      "Monthly insights and improvement recommendations",
    ],
    reelsStrategy:
      "Educational and relatable reels designed to earn saves, shares, and better audience engagement.",
    ctaLabel: "Build My Brand",
  },
  {
    name: "Elevate",
    price: "$199 / month",
    tagline: "Turn followers into customers",
    bestFor: "Service-based businesses that need leads",
    icon: "badge",
    badge: "Most Popular",
    featured: true,
    accentClassName: "from-amber-500 via-yellow-400 to-orange-300",
    accentSoftClassName:
      "border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,251,235,0.96)_100%)]",
    highlights: ["16 posts / month", "6-8 reels / month", "Lead focused"],
    includes: [
      "Sales-driven content strategy",
      "Offer and promotion content",
      "DM and WhatsApp funnel guidance",
      "Lead-focused captions and call-to-actions",
      "Performance tracking for leads, clicks, and reach",
    ],
    reelsStrategy:
      "Problem-to-solution reels with clear calls-to-action designed to generate inquiries.",
    ctaLabel: "Get More Leads",
  },
  {
    name: "Momentum",
    price: "$249 / month",
    tagline: "Scale with paid ads",
    bestFor: "Businesses ready to grow faster with ads",
    icon: "trending",
    accentClassName: "from-orange-600 via-orange-500 to-amber-300",
    accentSoftClassName:
      "border-orange-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,247,237,0.96)_100%)]",
    highlights: ["16 posts / month", "8-10 reels / month", "Meta ads"],
    includes: [
      "Content optimized for both ads and organic posting",
      "Meta Ads setup and campaign creation",
      "Audience targeting",
      "Ad creative direction",
      "Weekly ad monitoring",
      "Monthly ad performance reporting",
    ],
    reelsStrategy:
      "Hook-driven short-form reels designed for ad performance and creative testing.",
    ctaLabel: "Scale My Growth",
  },
  {
    name: "Dominion",
    price: "$299 / month",
    tagline: "Dominate your market",
    bestFor: "Serious businesses scaling aggressively",
    icon: "target",
    accentClassName: "from-rose-600 via-red-500 to-orange-300",
    accentSoftClassName:
      "border-rose-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,241,242,0.96)_100%)]",
    highlights: ["20-25 posts / month", "12-20 reels / month", "Full Meta scale"],
    includes: [
      "Advanced content and reel strategy",
      "Full Meta ads management and optimization",
      "Retargeting strategy",
      "Weekly strategy calls",
      "Priority support",
      "Advanced analytics and reporting",
    ],
    reelsStrategy:
      "High-volume, high-performance reels focused on reach, authority, and scaling.",
    ctaLabel: "Let's Grow",
  },
] as const;

export const chatbotPlans: ReadonlyArray<ChatbotPlan> = [
  {
    name: "Starter",
    price: "$99 / month",
    commitment: "3-month commitment required",
    role: "24/7 AI receptionist",
    bestFor:
      "Small and local businesses that need instant replies and a simple way to capture inquiries.",
    icon: "message",
    accentClassName: "from-emerald-500 via-emerald-400 to-cyan-300",
    accentSoftClassName:
      "border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(236,253,245,0.96)_100%)]",
    positioning:
      "A 24/7 AI receptionist that answers customers and captures basic leads.",
    usage: "2,000 messages / month",
    overage: "$10 per extra 1,000",
    support: "Standard support, 24-48h response",
    includes: [
      "Website assistant on one site with basic UI customization",
      "Training on up to 10 website pages and FAQ content",
      "Lead capture for name and phone or email",
      "Answers FAQs and common customer questions",
      "Basic dashboard for conversations and captured leads",
    ],
    limitations: [
      "No lead qualification logic or integrations",
      "No advanced workflows or optimization layer",
    ],
    ctaLabel: "Start with Starter",
  },
  {
    name: "Growth",
    price: "$199 / month",
    commitment: "3-month commitment required",
    role: "AI lead generator + assistant",
    bestFor:
      "Service businesses, e-commerce brands, and teams that want better leads instead of more loose inquiries.",
    icon: "users",
    badge: "Smart Choice",
    featured: true,
    accentClassName: "from-[rgba(9,48,111,1)] via-[rgba(29,102,245,1)] to-[rgba(131,184,255,1)]",
    accentSoftClassName:
      "border-[rgba(17,94,212,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(235,244,255,0.98)_100%)]",
    positioning:
      "An AI assistant that answers customers, qualifies leads, and captures better-fit opportunities.",
    usage: "8,000 messages / month",
    overage: "$8 per extra 1,000",
    support: "12-24h support with minor monthly tweaks",
    includes: [
      "Everything in Starter, plus website and document training",
      "Lead qualification around service need, budget range, and timeline",
      "Guided conversation flows instead of random replies",
      "Basic AI sales assistance with service and product recommendations",
      "Lead storage to Google Sheets, Notion, or Airtable",
      "Basic analytics for total chats and leads generated",
    ],
    limitations: [
      "No deep personalization or custom API integrations",
      "Advanced automation logic is not included",
    ],
    ctaLabel: "Choose Growth",
  },
  {
    name: "Pro",
    price: "$499 / month",
    commitment: "3-month commitment required",
    role: "AI sales system",
    bestFor:
      "High-ticket businesses, agencies, and revenue-driven teams that want the website assistant to actively support conversion.",
    icon: "target",
    accentClassName: "from-rose-600 via-red-500 to-orange-300",
    accentSoftClassName:
      "border-rose-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,241,242,0.96)_100%)]",
    positioning:
      "A full AI sales rep on your website that captures, qualifies, and converts visitors into customers.",
    usage: "25,000 messages / month",
    overage: "$5 per extra 1,000",
    support: "Priority support under 12h with custom changes",
    includes: [
      "Everything in Growth, plus structured sales flows from greeting to conversion",
      "Deep custom training across website, documents, and internal business context",
      "Conditional logic and multi-step conversation funnels",
      "Full CRM integration with HubSpot, Zoho, or custom webhooks",
      "Advanced analytics for conversion, lead quality, and chat performance",
      "Ongoing monthly optimization for prompts, flows, and conversion improvements",
    ],
    ctaLabel: "Book Pro Strategy",
  },
] as const;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

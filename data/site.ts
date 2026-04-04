export const companyName = "Patricians";
export const companyTagline = "Engineering Intelligent Growth";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
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
  | "ai-digital-marketing"
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
  goal: string;
  icon: string;
  accentClassName: string;
  accentSoftClassName: string;
  includes: string[];
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
    label: "AI Chatbots for Websites",
    title: "AI Chatbots for Websites",
    seoTitle: "AI Chatbots for Websites | Patricians",
    seoDescription:
      "Patricians builds branded AI chatbots for websites that answer questions, capture leads, qualify prospects, and improve customer experience.",
    eyebrow: "Always-On Customer Experience",
    shortDescription:
      "Premium website chatbots designed for 24/7 support, lead capture, qualification, FAQs, and conversion support.",
    description:
      "We build branded AI chat experiences that answer questions, qualify visitors, and support sales or service workflows directly on your website.",
    focus: [
      "24/7 customer assistance",
      "Lead capture and qualification",
      "Website-integrated recurring chatbot systems",
    ],
    introTitle: "A website chatbot that feels useful, not ornamental",
    introText:
      "A high-quality chatbot should do more than sit in the corner of the screen. Patricians designs AI chat experiences that support visitors, reduce repetitive questions, and move serious inquiries toward the right next step.",
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
          "We identify the support, sales, FAQ, and qualification flows the chatbot needs to handle.",
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
          "We connect the chatbot to your website and shape the knowledge it should rely on.",
      },
      {
        step: "04",
        title: "Support and refinement path",
        description:
          "We match the support and optimization rhythm to the selected plan, from stable maintenance to ongoing conversion-focused improvement.",
      },
    ],
    deliverables: [
      "Branded chatbot setup for your website",
      "Lead capture and qualification flows",
      "FAQ and support response design",
      "Escalation pathways for high-intent inquiries",
      "Support and optimization path matched to the selected plan",
    ],
    whyPatricians: [
      "We treat chatbot design as part of the customer experience, not an add-on.",
      "We build for clarity, conversion, and trust instead of novelty.",
      "We structure each plan so support, automation, and optimization match the business need.",
    ],
    heroHighlights: [
      "24/7 assistance with premium brand presentation",
      "Lead capture, qualification, and conversion support on-site",
      "No setup fee with a 3-month upfront commitment",
    ],
    ctaTitle: "Turn your website into a smarter front door",
    ctaText:
      "We can build a chatbot that supports visitors, captures better leads, and fits your brand.",
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
    slug: "ai-digital-marketing",
    icon: "megaphone",
    label: "AI Digital Marketing",
    title: "AI Digital Marketing",
    seoTitle: "AI Digital Marketing | Patricians",
    seoDescription:
      "Patricians creates AI digital marketing systems that improve content workflows, campaign efficiency, engagement, and performance for growing brands.",
    eyebrow: "Smarter Growth Systems",
    shortDescription:
      "AI-supported digital marketing systems focused on content workflows, campaign efficiency, iteration, and stronger engagement.",
    description:
      "We help businesses improve digital marketing execution with AI-supported systems that make strategy easier to run, analyze, and refine.",
    focus: [
      "Content and campaign workflows",
      "Efficiency and smarter iteration",
      "Engagement and performance improvement",
    ],
    introTitle: "Marketing systems that move with more discipline",
    introText:
      "Patricians approaches AI marketing as operational leverage. We build systems that help teams produce, test, and improve campaigns with better speed, consistency, and insight.",
    benefits: [
      {
        title: "More efficient output",
        description:
          "Use AI support to reduce production drag across planning, content, and campaign execution.",
        icon: "wand",
      },
      {
        title: "Smarter iteration",
        description:
          "Create faster feedback loops around what is landing, where it is slipping, and what to change next.",
        icon: "chart",
      },
      {
        title: "Clearer engagement systems",
        description:
          "Support campaigns with stronger workflows, response quality, and follow-up discipline.",
        icon: "briefcase",
      },
    ],
    process: [
      {
        step: "01",
        title: "Growth diagnosis",
        description:
          "We assess current channels, production flow, bottlenecks, and campaign opportunities.",
      },
      {
        step: "02",
        title: "System design",
        description:
          "We shape the content, campaign, and reporting workflow you need around your business goals.",
      },
      {
        step: "03",
        title: "Execution layer",
        description:
          "We implement AI-supported processes that improve speed, consistency, and team capacity.",
      },
      {
        step: "04",
        title: "Performance refinement",
        description:
          "We review outputs and optimize the system based on what drives better response and results.",
      },
    ],
    deliverables: [
      "AI-supported content workflow structure",
      "Campaign planning and production systems",
      "Engagement and iteration improvements",
      "Marketing reporting and optimization rhythm",
      "Smarter process design for leaner execution",
    ],
    whyPatricians: [
      "We focus on useful marketing systems, not inflated AI promises.",
      "We think in workflows, outputs, and iteration discipline.",
      "We bring the same premium execution standard to growth as we do to product and web work.",
    ],
    heroHighlights: [
      "AI-supported content and campaign workflows",
      "Better efficiency and smarter iteration",
      "Performance-focused system design for modern marketing",
    ],
    ctaTitle: "Modernize your growth execution with AI support",
    ctaText:
      "We can help you build a leaner, sharper marketing system that improves how work gets done.",
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
      "We lead with intelligent customer experiences, AI-supported growth systems, and clear digital strategy before surface-level tactics.",
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
      "We shape the website, chatbot, marketing, or app approach around outcomes.",
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
      "Yes. Many engagements begin with a single website, chatbot, marketing system, or mobile product and expand from there.",
  },
  {
    question: "Do you support ongoing work?",
    answer:
      "Yes. Chatbots, marketing systems, and product improvements often benefit from an ongoing optimization model.",
  },
  {
    question: "Is Patricians only for large companies?",
    answer:
      "No. We work best with businesses that value clarity, quality, and intelligent execution, regardless of company size.",
  },
] as const;

export const contactServiceOptions = [
  "AI Chatbots",
  "High-End Websites Within Days",
  "AI Digital Marketing",
  "Mobile App Development",
] as const;

export const digitalMarketingPlans: ReadonlyArray<MarketingPlan> = [
  {
    name: "Ignite",
    price: "$99 / month",
    goal: "Establish credibility and online presence",
    icon: "flame",
    accentClassName: "from-emerald-500 via-emerald-400 to-lime-300",
    accentSoftClassName:
      "border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(236,253,245,0.96)_100%)]",
    includes: [
      "Social media setup and optimization",
      "8 static posts per month",
      "2 reels per month",
      "Basic SEO setup",
      "Basic analytics setup",
    ],
  },
  {
    name: "Propel",
    price: "$149 / month",
    goal: "Improve engagement and brand consistency",
    icon: "rocket",
    accentClassName: "from-sky-600 via-blue-500 to-cyan-300",
    accentSoftClassName:
      "border-sky-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(239,246,255,0.96)_100%)]",
    includes: [
      "Social platform management",
      "12-15 posts per month",
      "4 reels per month",
      "Basic paid ads strategy support",
    ],
  },
  {
    name: "Elevate",
    price: "$199 / month",
    goal: "Increase visibility and generate qualified leads",
    icon: "badge",
    accentClassName: "from-amber-500 via-yellow-400 to-orange-300",
    accentSoftClassName:
      "border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,251,235,0.96)_100%)]",
    includes: [
      "Brand style guide",
      "20-25 posts per month",
      "8 reels per month",
      "Basic email marketing setup",
    ],
  },
  {
    name: "Momentum",
    price: "$249 / month",
    goal: "Maximize ROI and drive measurable conversions",
    icon: "trending",
    accentClassName: "from-orange-600 via-orange-500 to-amber-300",
    accentSoftClassName:
      "border-orange-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,247,237,0.96)_100%)]",
    includes: [
      "Conversion tracking setup",
      "30 posts per month",
      "12 reels per month",
      "Paid campaign creation and optimization",
    ],
  },
  {
    name: "Dominion",
    price: "$299 / month",
    goal: "Scale, dominate, and operate with precision",
    icon: "target",
    accentClassName: "from-rose-600 via-red-500 to-orange-300",
    accentSoftClassName:
      "border-rose-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,241,242,0.96)_100%)]",
    includes: [
      "Full paid ads management",
      "40+ posts per month",
      "20 reels per month",
      "Dedicated account manager",
      "Weekly optimization calls",
    ],
  },
] as const;

export const chatbotPlans: ReadonlyArray<ChatbotPlan> = [
  {
    name: "Starter",
    price: "$100 / month",
    commitment: "$300 upfront for a 3-month commitment",
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
      "Website chatbot on one site with basic UI customization",
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
    price: "$200 / month",
    commitment: "$600 upfront for a 3-month commitment",
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
    price: "$500 / month",
    commitment: "$1,500 upfront for a 3-month commitment",
    role: "AI sales system",
    bestFor:
      "High-ticket businesses, agencies, and revenue-driven teams that want the chatbot to actively support conversion.",
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

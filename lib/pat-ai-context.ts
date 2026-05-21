import {
  aboutPrinciples,
  chatbotPlans,
  companyName,
  companyTagline,
  contactDetails,
  contactFaq,
  contactServiceOptions,
  homeProcess,
  homeWhyPatricians,
  services,
  socialLinks,
  socialMediaMarketingPlans,
} from "@/data/site";

export const PAT_AI_CONTEXT = {
  sourcePolicy:
    "This context is the only approved source of truth for Pat AI. If a fact is not present here, Pat AI should say it does not have that information and recommend contacting Patricians.",

  company: {
    name: companyName,
    tagline: companyTagline,
    overview:
      "Patricians is an AI-first company and premium digital execution partner building intelligent systems, high-end websites, AI website assistants, Meta-focused social media marketing systems, and AI-enhanced mobile products for businesses.",
    positioning:
      "Patricians is evolving from traditional agency-style delivery into an AI systems company focused on automation, customer experience, modern products, and business growth.",
    story:
      "Patricians began with social media marketing and web development, then moved toward intelligent customer experiences, automation-first operations, and digital systems that create cleaner growth.",
    tone: [
      "Premium",
      "Calm",
      "Clear",
      "Business-focused",
      "Practical",
      "Professional",
    ],
  },

  allowedTopics: [
    "Patricians company information",
    "Patricians services",
    "AI automation services",
    "AI website assistants",
    "Website development",
    "Business websites and landing pages",
    "E-commerce websites",
    "AI social media marketing",
    "Meta, Facebook, and Instagram marketing packages",
    "Mobile app development and MVPs",
    "Pricing and packages listed on the website",
    "Timelines listed on the website",
    "Process and FAQs listed on the website",
    "Contact and booking guidance",
    "Helping users choose a Patricians service",
  ],

  disallowedTopics: [
    "Cooking or recipes",
    "Schoolwork, essays, or homework help",
    "Coding help unrelated to Patricians",
    "General AI questions not connected to Patricians",
    "Medical advice",
    "Legal advice",
    "Financial advice",
    "Religious advice",
    "News, politics, entertainment, or sports",
    "Personal advice unrelated to Patricians services",
    "Random factual questions unrelated to Patricians",
  ],

  services: services.map((service) => ({
    slug: service.slug,
    label: service.label,
    title: service.title,
    summary: service.description,
    shortDescription: service.shortDescription,
    focus: service.focus,
    introTitle: service.introTitle,
    introText: service.introText,
    benefits: service.benefits,
    process: service.process,
    deliverables: service.deliverables,
    whyPatricians: service.whyPatricians,
    highlights: service.heroHighlights,
    ctaTitle: service.ctaTitle,
    ctaText: service.ctaText,
  })),

  websitePackages: [
    {
      name: "Business Website / Landing Page",
      price: "$199",
      timeline: "Delivered in 3 days",
      includes: [
        "Modern responsive design",
        "3-5 pages or landing page",
        "Fast loading performance",
        "Contact form integration",
        "Basic SEO setup",
      ],
      extras: ["Domain: $19.99 for 2 years", "Hosting: $39.99/year"],
      cta: "Get Started",
    },
    {
      name: "E-Commerce Website",
      price: "$499",
      timeline: "Delivered in 7 days",
      includes: [
        "Full online store",
        "Up to 10 products uploaded",
        "Payment integration",
        "Mobile responsive design",
        "Basic store setup",
      ],
      extras: ["Domain: $19.99 for 2 years", "Hosting: $39.99/year"],
      cta: "Start Your Store",
    },
  ],

  websitePackageFaqs: [
    {
      question: "Why is it so fast?",
      answer:
        "Patricians uses optimized workflows and AI-assisted development to reduce drag without lowering quality.",
    },
    {
      question: "Can I scale later?",
      answer:
        "Yes. Patricians can expand the website into more pages, e-commerce, chat, or automation as the business grows.",
    },
  ],

  aiWebsiteAssistantPlans: chatbotPlans.map((plan) => ({
    name: plan.name,
    price: plan.price,
    commitment: plan.commitment,
    role: plan.role,
    bestFor: plan.bestFor,
    positioning: plan.positioning,
    usage: plan.usage,
    overage: plan.overage,
    support: plan.support,
    includes: plan.includes,
    limitations: plan.limitations ?? [],
    cta: plan.ctaLabel,
  })),

  marketingPackages: socialMediaMarketingPlans.map((plan) => ({
    name: plan.name,
    price: plan.price,
    tagline: plan.tagline,
    bestFor: plan.bestFor,
    highlights: plan.highlights,
    includes: plan.includes,
    reelsStrategy: plan.reelsStrategy,
    cta: plan.ctaLabel,
  })),

  process: homeProcess,
  differentiators: homeWhyPatricians,
  principles: aboutPrinciples,
  faqs: contactFaq,

  contact: {
    email: contactDetails.email.value,
    phone: contactDetails.phone.value,
    socialLinks,
    serviceOptions: contactServiceOptions,
    guidance:
      "Best inquiries include the business problem, the service or outcome that matters most, and any timing, launch, or process constraints.",
  },

  callsToAction: {
    primary: "Book a Strategy Call",
    contact: "Contact Patricians",
    services: "Explore Services",
    inquiry: "Submit an Inquiry",
  },
} as const;

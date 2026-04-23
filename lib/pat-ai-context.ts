export const PAT_AI_CONTEXT = {
  company: {
    name: "Patricians",
    tagline: "Engineering Intelligent Growth",
    description:
      "Patricians is an AI-first company that builds intelligent systems, premium websites, and modern digital products for businesses. It focuses on clarity, speed, and practical AI-powered execution.",
  },

  positioning: {
    summary:
      "Patricians is evolving from a traditional agency into an AI systems company focused on automation, customer experience, and business growth.",
    focus: [
      "AI automation systems",
      "Premium business websites",
      "AI chatbots",
      "AI digital marketing",
      "AI-enhanced mobile apps",
    ],
  },

  services: {
    aiAutomation:
      "Builds intelligent systems to automate workflows, leads, and operations.",
    chatbots:
      "Website AI assistants for support, lead capture, and conversion.",
    websites:
      "High-performance business websites built quickly with modern tech.",
    marketing:
      "AI-supported social media marketing focused on Meta platforms.",
    mobile:
      "AI-enhanced mobile app MVPs for modern business use.",
  },

  websitePackages: [
    {
      name: "Business Website",
      price: "$200",
      timeline: "3 days",
      description:
        "A modern business website designed for speed, credibility, and conversion.",
    },
    {
      name: "E-Commerce Website",
      price: "$500",
      timeline: "7 days",
      description:
        "A complete online store with essential setup and product listing.",
    },
  ],

  chatbotPlans: [
    { name: "Starter", price: "$100/month" },
    { name: "Growth", price: "$200/month" },
    { name: "Pro", price: "$500/month" },
  ],

  marketingPlans: [
    { name: "Ignite", price: "$100/month" },
    { name: "Propel", price: "$150/month" },
    { name: "Elevate", price: "$200/month" },
    { name: "Momentum", price: "$250/month" },
    { name: "Dominion", price: "$300/month" },
  ],

  differentiators: [
    "AI-first thinking",
    "Premium execution",
    "Fast delivery",
    "Strategic clarity",
  ],

  process: ["Clarity", "System Design", "Execution", "Refinement"],

  cta: {
    primary: "Book a Strategy Call",
    secondary: "Contact Patricians",
  },
} as const;

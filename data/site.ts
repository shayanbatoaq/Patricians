export const companyName = "Patricians";
export const companyTagline = "Engineering Intelligent Growth";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
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

export const services = [
  {
    slug: "ai-chatbots",
    icon: "message",
    label: "AI Chatbots for Websites",
    title: "AI Chatbots for Websites",
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
        title: "Monthly improvement",
        description:
          "We refine responses, prompts, and handoff logic based on real visitor behavior.",
      },
    ],
    deliverables: [
      "Branded chatbot setup for your website",
      "Lead capture and qualification flows",
      "FAQ and support response design",
      "Escalation pathways for high-intent inquiries",
      "Recurring optimization and support model",
    ],
    whyPatricians: [
      "We treat chatbot design as part of the customer experience, not an add-on.",
      "We build for clarity, conversion, and trust instead of novelty.",
      "We support recurring refinement so performance improves over time.",
    ],
    heroHighlights: [
      "24/7 assistance with premium brand presentation",
      "Lead capture and qualification on-site",
      "Integrated support model with monthly optimization",
    ],
    ctaTitle: "Turn your website into a smarter front door",
    ctaText:
      "We can build a chatbot that supports visitors, captures better leads, and fits your brand.",
  },
  {
    slug: "websites-in-3-days",
    icon: "screen",
    label: "High-End Websites in 3 Days",
    title: "High-End Websites in 3 Days",
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
  "Website in 3 Days",
  "AI Digital Marketing",
  "Mobile App Development",
] as const;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

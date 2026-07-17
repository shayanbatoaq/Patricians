export type ClienteleCategory = "websites" | "digital-growth";

export type ClienteleGalleryAsset = {
  src: string;
  alt: string;
  caption: string;
  format: "square" | "landscape" | "wide";
  platform?: "Instagram" | "Facebook" | "Meta Ads";
};

export type ClienteleCampaign = {
  title: string;
  objective: string;
  audience: string;
  platforms: string[];
  languages: string[];
  creativeDirection: string;
};

export type ClienteleLink = {
  label: string;
  href: string;
};

export type ClienteleClient = {
  slug: string;
  name: string;
  shortName?: string;
  industry: string;
  categories: ClienteleCategory[];
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  reflection: string;
  services: string[];
  capabilities: string[];
  logo: {
    src: string;
    alt: string;
    background: string;
  };
  websiteUrl?: string;
  externalLinks?: ClienteleLink[];
  gallery: ClienteleGalleryAsset[];
  campaigns?: ClienteleCampaign[];
};

export const clienteleCategories = [
  { value: "all", label: "All Work" },
  { value: "websites", label: "Websites" },
  { value: "digital-growth", label: "Digital Growth" },
] as const;

export type ClienteleFilter = (typeof clienteleCategories)[number]["value"];

export const clientele: ClienteleClient[] = [
  {
    slug: "the-corporate-lens",
    name: "The Corporate Lens",
    shortName: "Corporate Lens",
    industry: "Corporate Media / Editorial",
    categories: ["websites"],
    summary:
      "A premium corporate media platform for Pakistan's business landscape, pairing trusted reporting with a refined editorial experience.",
    overview:
      "The Corporate Lens is a corporate media platform built to present business reporting through a polished, credible, and easy-to-navigate editorial experience.",
    challenge:
      "The platform needed to make a growing body of business coverage feel authoritative and readable while preserving clear paths between stories, topics, and the wider publication.",
    approach:
      "Patricians designed and developed an editorial system with strong information hierarchy, focused reading experiences, and a premium visual rhythm suited to corporate reporting.",
    reflection:
      "The work demonstrates how careful editorial structure and restrained interaction design can help a media product feel current without competing with its reporting.",
    services: ["Website Design", "Next.js Development", "Editorial UX"],
    capabilities: ["Next.js", "TypeScript", "Responsive Editorial Experience"],
    logo: {
      src: "/clientele/the-corporate-lens/logo.png",
      alt: "The Corporate Lens logo with the Beyond the Headlines tagline",
      background: "#fbbf24",
    },
    websiteUrl: "https://thecorporatelens.com",
    gallery: [],
  },
  {
    slug: "euphoric",
    name: "Euphoric",
    industry: "Fragrance / E-commerce / Digital Growth",
    categories: ["websites", "digital-growth"],
    summary:
      "A luxury fragrance storefront supported by distinct Instagram and Facebook content systems.",
    overview:
      "Euphoric brings together an e-commerce storefront for perfume impressions and an ongoing social system shaped around premium product storytelling.",
    challenge:
      "The brand needed a refined shopping experience and a recognizable social presence without making Instagram and Facebook feel like duplicated channels.",
    approach:
      "Patricians developed a luxury-led storefront and kept the brand positioning consistent across social platforms while adapting pacing, hierarchy, and content treatment for each channel.",
    reflection:
      "The system keeps consistency at the brand level while giving each platform enough flexibility to support its own content behavior and audience expectations.",
    services: [
      "E-commerce Website",
      "Instagram Branding",
      "Facebook Content",
      "Product Storytelling",
    ],
    capabilities: ["Next.js", "Tailwind CSS", "Headless Commerce", "Social Content"],
    logo: {
      src: "/clientele/euphoric/logo.png",
      alt: "Euphoric fragrance brand logo",
      background: "#f4f2f3",
    },
    websiteUrl: "https://euphoric.pk",
    externalLinks: [
      { label: "Instagram", href: "https://www.instagram.com/euphoricpak/" },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61560426114088",
      },
    ],
    gallery: [
      {
        src: "/clientele/euphoric/instagram-01.jpg",
        alt: "Euphoric Instagram creative presenting luxury-inspired fragrances",
        caption: "Luxury-inspired fragrance positioning for Instagram",
        format: "square",
        platform: "Instagram",
      },
      {
        src: "/clientele/euphoric/facebook-01.jpg",
        alt: "Euphoric Facebook creative about accessible luxury scents",
        caption: "Product-led Facebook communication",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/euphoric/cover.png",
        alt: "Euphoric Facebook cover featuring three fragrance bottles",
        caption: "Where scent meets precision",
        format: "wide",
        platform: "Facebook",
      },
    ],
  },
  {
    slug: "better-life",
    name: "Better Life",
    industry: "Healthcare / Wellness",
    categories: ["websites"],
    summary:
      "A calm Traditional Chinese Medicine clinic website covering treatments, practitioners, pricing, and booking.",
    overview:
      "Better Life's website organizes wellness services and Traditional Chinese Medicine information into a clear experience for prospective patients.",
    challenge:
      "The clinic needed to explain unfamiliar treatment options, introduce practitioners, make pricing understandable, and keep booking within easy reach.",
    approach:
      "Patricians created a calm, service-led structure that gives treatments, practitioner information, pricing, and booking pathways a clear hierarchy.",
    reflection:
      "The result treats clarity as part of the wellness experience, helping detailed service information feel composed and approachable.",
    services: ["Website Design", "Healthcare UX", "Booking Pathways"],
    capabilities: ["Traditional Chinese Medicine", "Practitioner Profiles", "Pricing UX"],
    logo: {
      src: "/clientele/better-life/logo.png",
      alt: "Better Life clinic logo",
      background: "#f4f7f5",
    },
    websiteUrl: "https://betterlife.soundstudio.pk",
    gallery: [],
  },
  {
    slug: "sound-studio",
    name: "Sound Studio",
    industry: "Audiology / Healthcare",
    categories: ["websites"],
    summary:
      "An accessible clinic website presenting hearing-care services with clear, reassuring navigation.",
    overview:
      "Sound Studio is an audiology clinic website built to introduce hearing-care services in a direct and accessible format.",
    challenge:
      "The clinic required a dependable online presence that could explain its hearing-care services clearly to patients and families across devices.",
    approach:
      "Patricians built the website in WordPress and Elementor, focusing the page structure on service discovery, legibility, and simple next steps.",
    reflection:
      "The project shows the value of disciplined content hierarchy in healthcare, where confidence often begins with information that is easy to find and understand.",
    services: ["Website Development", "Accessible Content Structure", "Responsive UX"],
    capabilities: ["WordPress", "Elementor", "Audiology"],
    logo: {
      src: "/clientele/sound-studio/logo.png",
      alt: "Sound Studio audiology clinic logo",
      background: "#050505",
    },
    websiteUrl: "https://soundstudio.pk",
    gallery: [],
  },
  {
    slug: "gateway-health-services",
    name: "Gateway Health Services",
    shortName: "Gateway Health",
    industry: "Dental / Healthcare",
    categories: ["websites"],
    summary:
      "A responsive dental-clinic website combining treatment information, educational content, and booking pathways.",
    overview:
      "Gateway Health Services uses its website to help patients understand dental treatments and move from education to booking with less friction.",
    challenge:
      "The clinic needed to present a broad set of treatments, educational material, and practical appointment pathways without making the site feel dense.",
    approach:
      "Patricians built a responsive WordPress experience with Elementor and Astra, organizing treatment content around clear navigation and patient-facing next steps.",
    reflection:
      "The work balances depth and usability by keeping detailed healthcare information structured around the decisions patients need to make.",
    services: ["Website Development", "Treatment Information", "Booking UX"],
    capabilities: ["WordPress", "Elementor", "Astra"],
    logo: {
      src: "/clientele/gateway-health-services/logo.webp",
      alt: "Gateway Health Services logo",
      background: "#eceff1",
    },
    websiteUrl: "https://gwhs.pk",
    gallery: [],
  },
  {
    slug: "home-cure",
    name: "Home Cure",
    industry: "Healthcare / Home Sample Collection",
    categories: ["websites", "digital-growth"],
    summary:
      "A reassuring website and social presence focused on service clarity, hygiene, booking, and patient guidance.",
    overview:
      "Home Cure supports at-home diagnostic sample collection with a digital presence designed around reassurance, service education, and easy contact pathways.",
    challenge:
      "Patients needed to understand how at-home collection works, what hygiene and transport practices support the service, and how to book without uncertainty.",
    approach:
      "Patricians organized the website and social communication around service clarity, patient guidance, and repeatable visual cues across Instagram and Facebook.",
    reflection:
      "The system treats clarity as part of the identity itself, leading every page and creative with the information a patient needs first.",
    services: ["Healthcare Website", "Social Branding", "Patient Education", "Content Design"],
    capabilities: ["Home Diagnostics", "Booking Pathways", "Instagram", "Facebook"],
    logo: {
      src: "/clientele/home-cure/logo.png",
      alt: "Home Cure healthcare logo",
      background: "#ffffff",
    },
    websiteUrl: "https://homecure.com.pk",
    externalLinks: [
      { label: "Instagram", href: "https://www.instagram.com/homecurepak/" },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61585081491893",
      },
    ],
    gallery: [
      {
        src: "/clientele/home-cure/facebook-01.jpg",
        alt: "Home Cure sample collection journey explainer",
        caption: "What happens after sample collection",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/home-cure/facebook-02.jpg",
        alt: "Home Cure safe sample transport explainer",
        caption: "From home to lab: a safe journey",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/home-cure/cover.png",
        alt: "Home Cure home nursing care cover creative",
        caption: "Care delivered at the patient's doorstep",
        format: "landscape",
        platform: "Facebook",
      },
    ],
  },
  {
    slug: "clear-voice-hub",
    name: "Clear Voice Hub",
    industry: "Speech Therapy / Healthcare / Education",
    categories: ["websites", "digital-growth"],
    summary:
      "A welcoming website and content system for therapy, communication, language, and consultation services.",
    overview:
      "Clear Voice Hub brings therapy, communication, language, and consultation services into one approachable digital experience for families and learners.",
    challenge:
      "The organization needed to explain a varied service offering with clinical credibility while staying calm, welcoming, and easy for families to navigate.",
    approach:
      "Patricians paired a clear consultation and enrolment structure with a consistent educational content system shaped around services, early signs, and common questions.",
    reflection:
      "The work uses hierarchy and tone to reduce uncertainty before adding detail, balancing clinical clarity with an approachable voice.",
    services: ["Website Design", "Social Branding", "Educational Content", "Consultation UX"],
    capabilities: ["Speech Therapy", "Languages", "Instagram", "Facebook"],
    logo: {
      src: "/clientele/clear-voice-hub/logo.png",
      alt: "Clear Voice Hub logo with the Find Your Voice, Speak with Confidence tagline",
      background: "#f4f7fb",
    },
    websiteUrl: "https://clearvoicehub.com",
    externalLinks: [
      { label: "Instagram", href: "https://www.instagram.com/clearvoicehub/" },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61588375756820",
      },
    ],
    gallery: [
      {
        src: "/clientele/clear-voice-hub/facebook-01.jpg",
        alt: "Clear Voice Hub learning languages creative",
        caption: "Learning languages opens doors",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/clear-voice-hub/facebook-02.jpg",
        alt: "Clear Voice Hub services overview creative",
        caption: "Services organized for quick understanding",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/clear-voice-hub/facebook-03.jpg",
        alt: "Clear Voice Hub communication confidence creative",
        caption: "Confidence begins with communication",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/clear-voice-hub/cover.png",
        alt: "Clear Voice Hub services cover creative",
        caption: "One destination for confident communication",
        format: "landscape",
        platform: "Facebook",
      },
    ],
  },
  {
    slug: "root-cyber",
    name: "RootCyber",
    industry: "Cybersecurity / Digital Growth",
    categories: ["digital-growth"],
    summary:
      "A technical Instagram and Facebook content system for communicating cybersecurity topics clearly and consistently.",
    overview:
      "RootCyber's social system turns ongoing cybersecurity subjects into structured, authoritative content for Instagram and Facebook.",
    challenge:
      "The brand needed to communicate technical expertise without reducing complex topics to generic security slogans or overwhelming readers with terminology.",
    approach:
      "Patricians used a repeatable hierarchy and topic-led content structure so subjects such as ransomware, VAPT, cloud security, and compliance could remain authoritative and scannable.",
    reflection:
      "The system separates the technical detail that builds trust from the visual information a reader needs first, creating consistency without flattening the subject matter.",
    services: ["Instagram Content", "Facebook Content", "Technical Communication"],
    capabilities: ["Cybersecurity Education", "Content Design", "Visual Consistency"],
    logo: {
      src: "/clientele/root-cyber/logo.jpg",
      alt: "RootCyber logo mark",
      background: "#ffffff",
    },
    externalLinks: [
      { label: "Instagram", href: "https://www.instagram.com/official.rootcyber/" },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61571781654318",
      },
    ],
    gallery: [
      {
        src: "/clientele/root-cyber/facebook-01.jpg",
        alt: "RootCyber managed security services creative",
        caption: "Managed security services",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/root-cyber/facebook-02.jpg",
        alt: "RootCyber cybersecurity service creative",
        caption: "Security expertise made scannable",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/root-cyber/facebook-03.jpg",
        alt: "RootCyber technical awareness creative",
        caption: "Technical security communication",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/root-cyber/cover.jpg",
        alt: "RootCyber Facebook cover identity",
        caption: "RootCyber social identity",
        format: "wide",
        platform: "Facebook",
      },
    ],
  },
  {
    slug: "ama-audit-and-accounting",
    name: "AMA Audit and Accounting",
    shortName: "AMA",
    industry: "Accounting / Corporate Finance / UAE",
    categories: ["digital-growth"],
    summary:
      "A social content and Meta advertising system covering audit, tax, bookkeeping, compliance, and multilingual campaigns.",
    overview:
      "AMA's digital growth system supports ongoing finance education and paid campaign work across audit, tax, bookkeeping, compliance, and related business services.",
    challenge:
      "The firm needed one coherent corporate presence that could support education, service communication, and multilingual paid campaigns across several finance topics.",
    approach:
      "Patricians separated organic and paid objectives while retaining a recognizable visual structure across Instagram, Facebook, and Meta Ads in English and Arabic.",
    reflection:
      "The system keeps campaign structure visible while allowing messaging and creative variants to evolve. Unpublished performance metrics remain private and are not presented as claims.",
    services: ["Social Content", "Meta Advertising", "Campaign Design", "Multilingual Creative"],
    capabilities: ["Audit", "Tax", "Bookkeeping", "Compliance", "English and Arabic"],
    logo: {
      src: "/clientele/ama-audit-and-accounting/logo.jpg",
      alt: "AMA Auditing, Accounting and Tax logo",
      background: "#050505",
    },
    externalLinks: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/amaauditandaccounting/",
      },
      { label: "Facebook", href: "https://www.facebook.com/amaauditing" },
    ],
    gallery: [
      {
        src: "/clientele/ama-audit-and-accounting/facebook-01.jpg",
        alt: "AMA business confidence campaign creative",
        caption: "Build your business with confidence",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/ama-audit-and-accounting/facebook-02.jpg",
        alt: "AMA business compliance services creative",
        caption: "Complete business compliance",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/ama-audit-and-accounting/facebook-03.jpg",
        alt: "AMA audit accounting and tax services creative",
        caption: "Audit, accounting, and tax services",
        format: "square",
        platform: "Facebook",
      },
      {
        src: "/clientele/ama-audit-and-accounting/cover.png",
        alt: "AMA Facebook cover identity",
        caption: "Corporate finance social identity",
        format: "wide",
        platform: "Facebook",
      },
    ],
    campaigns: [
      {
        title: "Corporate Tax Campaign",
        objective: "Communicate corporate tax support to businesses in the UAE.",
        audience: "UAE businesses seeking corporate tax guidance.",
        platforms: ["Meta Ads"],
        languages: ["English", "Arabic"],
        creativeDirection:
          "Clear corporate messaging with a structured, service-led hierarchy.",
      },
      {
        title: "Bookkeeping Campaign",
        objective: "Present bookkeeping and accounting support to UAE SMEs.",
        audience: "Small and medium-sized businesses in the UAE.",
        platforms: ["Meta Ads"],
        languages: ["English", "Arabic"],
        creativeDirection:
          "Service clarity supported by a restrained corporate visual system.",
      },
      {
        title: "UAE E-Invoicing Campaign",
        objective:
          "Introduce e-invoicing support through timely compliance communication.",
        audience: "UAE businesses preparing for e-invoicing requirements.",
        platforms: ["Meta Ads", "Facebook"],
        languages: ["English", "Arabic"],
        creativeDirection:
          "Compliance information presented with direct, scannable visual hierarchy.",
      },
      {
        title: "Audit Services Campaign",
        objective:
          "Communicate professional audit services to business decision-makers.",
        audience: "UAE business owners and finance decision-makers.",
        platforms: ["Meta Ads", "Instagram", "Facebook"],
        languages: ["English", "Arabic"],
        creativeDirection:
          "Professional finance positioning with concise service messaging.",
      },
    ],
  },
];

export function getClienteleClient(slug: string) {
  return clientele.find((client) => client.slug === slug);
}

export function getAdjacentClienteleClients(slug: string) {
  const index = clientele.findIndex((client) => client.slug === slug);

  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: clientele[(index - 1 + clientele.length) % clientele.length],
    next: clientele[(index + 1) % clientele.length],
  };
}

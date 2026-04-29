export type Project = {
  slug: string;
  title: string;
  acronym: string;
  category: string;
  description: string;
  tech: string[];
  outcome?: string;
  gradient: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "northwind-saas",
    title: "Northwind — SaaS marketing site",
    acronym: "NW",
    category: "Web Design + Dev",
    description:
      "Rebuilt the marketing site for a B2B analytics SaaS, with a tighter narrative, faster load times, and an integrated demo flow.",
    tech: ["Next.js", "Tailwind", "Sanity", "Vercel"],
    outcome: "+47% demo signups in the first 60 days post-launch.",
    gradient:
      "linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 60%, #000000 100%)",
  },
  {
    slug: "harbor-ai-support",
    title: "Harbor — AI support copilot",
    acronym: "HB",
    category: "AI Integration",
    description:
      "Built a custom GPT-powered support agent that ingests their docs and resolves Tier-1 tickets without human handoff.",
    tech: ["OpenAI API", "Pinecone", "Next.js", "Postgres"],
    outcome: "62% of tickets fully resolved by AI; 4-hour ↓ in median response.",
    gradient:
      "linear-gradient(135deg, #2A2A2A 0%, #141414 50%, #000000 100%)",
  },
  {
    slug: "lumen-ecommerce",
    title: "Lumen — DTC e-commerce relaunch",
    acronym: "LM",
    category: "Web Design + Dev",
    description:
      "Migrated a Shopify theme to a custom headless storefront with conversion-focused PDPs and a streamlined checkout.",
    tech: ["Next.js", "Shopify Hydrogen", "Tailwind"],
    outcome: "+22% conversion rate, +1.4x LCP improvement on mobile.",
    gradient:
      "linear-gradient(135deg, #0A0A0A 0%, #1F1F1F 50%, #0A0A0A 100%)",
  },
  {
    slug: "atlas-ops",
    title: "Atlas — internal AI ops dashboard",
    acronym: "AT",
    category: "AI Integration",
    description:
      "Internal tool that classifies and triages 4k+ daily ops emails with AI, surfacing only what needs a human.",
    tech: ["OpenAI API", "Next.js", "tRPC", "Prisma"],
    outcome: "Saved ~28 hrs/week of manual triage across the ops team.",
    gradient:
      "linear-gradient(135deg, #000000 0%, #1A1A1A 60%, #2A2A2A 100%)",
  },
  {
    slug: "fern-studio",
    title: "Fern Studio — agency portfolio",
    acronym: "FS",
    category: "Web Design",
    description:
      "Brand refresh and portfolio site for a boutique design studio. Editorial-style layouts and motion-driven case studies.",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    outcome: "Won 3 inbound enterprise leads in launch month.",
    gradient:
      "linear-gradient(135deg, #1F1F1F 0%, #0A0A0A 50%, #2A2A2A 100%)",
  },
  {
    slug: "kindred-clinic",
    title: "Kindred Clinic — booking + AI intake",
    acronym: "KC",
    category: "Web Design + AI",
    description:
      "Patient-facing site with an AI intake form that pre-fills medical paperwork and routes urgent cases to staff.",
    tech: ["Next.js", "OpenAI API", "Calendly", "Vercel"],
    outcome: "Cut intake time per patient by 8 minutes on average.",
    gradient:
      "linear-gradient(135deg, #2A2A2A 0%, #0A0A0A 100%)",
  },
];

export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  outcomes: string[];
  useCases: string[];
  price: string;
  originalPrice?: string;
  priceSuffix: string;
  iconKey: "design" | "code" | "ai" | "phone";
};

export const SERVICES: Service[] = [
  {
    id: "landing-page",
    name: "Professional Landing Page",
    tagline: "A premium one-page site, built to convert.",
    description:
      "A single, beautifully crafted landing page designed for small businesses that need a real online presence — fast. We map your offer, write the copy, and design every section to do one thing: turn visitors into qualified leads. Hosted on a fast, reliable stack with a custom domain, mobile-perfect responsiveness, contact form, and on-page SEO baked in.",
    outcomes: [
      "A polished, professional site live within 72 hours",
      "Mobile-first, sub-second load times",
      "Clear call-to-action that captures real leads",
      "On-page SEO so you show up when people search you",
      "Custom domain + secure hosting handled for you",
    ],
    useCases: [
      "Local service business getting online for the first time",
      "Solo operator or contractor needing a credible web presence",
      "Coaches, consultants, and freelancers running ads to a single offer",
      "Testing a new product or offer before scaling",
    ],
    price: "$75",
    originalPrice: "$150",
    priceSuffix: "/month",
    iconKey: "design",
  },
  {
    id: "multipage-ai",
    name: "Multi-Page Site + AI Integration",
    tagline: "SEO-optimized website with an AI chatbot that brings qualified leads.",
    description:
      "A full multi-page website (Home, Services, About, Contact, and more) engineered to rank locally and convert visitors around the clock. We integrate a custom AI chatbot trained on your business — it greets visitors, answers FAQs, qualifies leads in real time, and routes hot prospects straight to your inbox. Every page is built on a fast, modern stack with structured data, local SEO, and Core Web Vitals optimization.",
    outcomes: [
      "Ranks locally for the keywords your customers actually search",
      "AI chatbot that captures and qualifies leads 24/7",
      "Multi-page architecture (Home, About, Services, Contact, more)",
      "Structured data + local schema for richer Google results",
      "Editor-friendly so you can update content without a developer",
    ],
    useCases: [
      "Established service business ready to dominate local search",
      "Growing companies that need pages for each service or location",
      "Businesses that miss leads because no one answers the website",
      "Operators who want AI doing the first conversation for them",
    ],
    price: "$200",
    originalPrice: "$250",
    priceSuffix: "/month",
    iconKey: "ai",
  },
  {
    id: "never-miss-lead",
    name: "Never Miss Another Lead Package",
    tagline: "AI receptionist + SEO website + AI chatbot + review optimization.",
    description:
      "The complete capture system. An AI receptionist answers every missed call — 24/7, on weekends, after hours — taking messages, qualifying intent, and texting you the details instantly. Pair that with a multi-page SEO-optimized website, an integrated AI chatbot capturing leads from web traffic, and a Google review optimization system that automatically prompts happy customers to leave 5-star reviews. Nothing slips through the cracks again.",
    outcomes: [
      "Every missed call answered by an AI receptionist that texts you the lead",
      "AI chatbot on your site qualifying web visitors 24/7",
      "Multi-page SEO-optimized site that ranks in local search",
      "Automated Google review requests after every job",
      "More 5-star reviews → higher map pack rankings → more calls",
    ],
    useCases: [
      "Home service businesses (HVAC, plumbing, electricians, contractors)",
      "Medical, dental, or legal practices that lose leads after-hours",
      "Any business where a missed call is a missed customer",
      "Operators ready to compound leads + reviews + rankings together",
    ],
    price: "$1,000",
    priceSuffix: "/month",
    iconKey: "phone",
  },
];

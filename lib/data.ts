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
    tagline: "A clean, professional one-page website that makes people trust your business.",
    description:
      "You get a polished, professional landing page that makes your business look like the real deal. We handle everything — design, copy, your own custom domain, hosting, and a contact form so people can reach you. It loads fast on every phone, shows up when people search your name, and turns visitors into phone calls and bookings. Live within 72 hours.",
    outcomes: [
      "A professional website live within 72 hours",
      "Loads fast on every phone so visitors don't leave",
      "Turns visitors into phone calls, form fills, and bookings",
      "Built to rank on Google so customers find you first",
      "Your own custom domain, fully hosted — we handle everything",
    ],
    useCases: [
      "Local service business getting online for the first time",
      "Solo operator or contractor who needs to look legit online",
      "Coaches, consultants, and freelancers who need a place to send clients",
      "Anyone testing a new business idea before going all-in",
    ],
    price: "$75",
    originalPrice: "$150",
    priceSuffix: "/month",
    iconKey: "design",
  },
  {
    id: "multipage-ai",
    name: "Multi-Page Site + AI Integration",
    tagline: "A full website that ranks on Google, plus an AI chatbot that captures leads for you.",
    description:
      "A full website with multiple pages — Home, Services, About, Contact, and whatever else you need. Every page is built to show up when people Google what you do in your city. Plus, we add an AI chatbot to your site that answers visitor questions, captures their info, and sends you the lead — even at 2am. You can update the content yourself anytime, no coding needed.",
    outcomes: [
      "Shows up when people Google what you do in your city",
      "AI chatbot that answers questions and captures leads 24/7",
      "Multiple pages for each service, location, or offering",
      "Loads fast on every phone so visitors don't leave",
      "Easy for you to update without touching any code",
    ],
    useCases: [
      "Established business ready to own your local Google results",
      "Companies that need a page for each service or location",
      "Businesses that lose leads because nobody's answering the website",
      "Anyone who wants AI doing the first conversation for them",
    ],
    price: "$200",
    originalPrice: "$250",
    priceSuffix: "/month",
    iconKey: "ai",
  },
  {
    id: "never-miss-lead",
    name: "Never Miss Another Lead Package",
    tagline: "AI receptionist for missed calls + full website + AI chatbot + Google review booster.",
    description:
      "The complete system so you never lose another customer. An AI receptionist picks up every missed call — nights, weekends, holidays — takes a message, figures out what they need, and texts you the details right away. On top of that, you get a full multi-page website that ranks on Google, an AI chatbot catching leads from your site, and an automatic Google review system that asks happy customers to leave you 5-star reviews. More reviews means higher rankings means more calls. It compounds.",
    outcomes: [
      "Every missed call picked up by AI and sent to you as a text",
      "AI chatbot on your website catching leads around the clock",
      "A full website that ranks when people search for your services",
      "Automatic Google review requests after every job you finish",
      "More 5-star reviews = higher Google rankings = more customers",
    ],
    useCases: [
      "Plumbers, electricians, HVAC techs, and contractors",
      "Dentists, doctors, lawyers, and clinics that miss after-hours calls",
      "Any business where a missed call means a missed customer",
      "Business owners who want leads, reviews, and rankings all working together",
    ],
    price: "$1,000",
    priceSuffix: "/month",
    iconKey: "phone",
  },
];

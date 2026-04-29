# ClearDesk AI

Marketing site for **ClearDesk AI** — a senior-only studio combining web design, web development, and AI integration for startups, small businesses, and SaaS teams.

Built on **Next.js (App Router) + Tailwind CSS**, deployable to **Vercel** in one click.

---

## Stack

- Next.js 14 (App Router, server components)
- React 18 + TypeScript
- Tailwind CSS 3.4 with custom design tokens
- Edge runtime API route for the contact form
- Embedded Calendly scheduler
- Built-in lead-qualifying chatbot (scripted, ready to swap to an AI API)

## Features

- Sticky responsive navbar with a CTA
- Home, Services, Portfolio, About, Contact pages
- Three-tier AI pricing on the Services page
- Calendly embed on Contact + “Book a Free Call” CTAs throughout
- Floating AI assistant chatbot (lead qualification flow)
- Contact form with validation, posting to `/api/contact`
- SEO metadata, OpenGraph, sitemap, robots.txt
- A11y: skip link, focus rings, semantic landmarks, aria-labels
- Mobile-first design, smooth scrolling, subtle animations

---

## Folder structure

```
cleardesk-ai/
├── app/
│   ├── api/
│   │   └── contact/route.ts        # Edge POST handler
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── portfolio/page.tsx
│   ├── services/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx                    # Home
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Button.tsx
│   ├── CalendlyEmbed.tsx
│   ├── Chatbot.tsx
│   ├── ContactForm.tsx
│   ├── CTABanner.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   └── ServiceCard.tsx
├── lib/
│   └── data.ts                     # Services + portfolio content
├── public/
│   ├── favicon.svg
│   └── logo.png                    # Drop the provided logo here
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Configure your Calendly link
cp .env.example .env.local
# edit .env.local and set NEXT_PUBLIC_CALENDLY_URL

# 3. Start dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Drop in your logo

Save the brand logo PNG you have (the wave + "ClearDesk AI" wordmark) at:

```
public/logo.png
```

The `Logo` component currently renders an inline SVG that closely matches the brand mark. If you'd rather use the PNG, replace the SVG block in [`components/Logo.tsx`](components/Logo.tsx) with:

```tsx
import Image from "next/image";

<Image src="/logo.png" alt="ClearDesk AI" width={160} height={40} priority />
```

---

## Deploy on Vercel

1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. **Framework preset:** Next.js (auto-detected). No build overrides needed.
4. **Environment variables:**
   - `NEXT_PUBLIC_CALENDLY_URL` → your Calendly event URL.
5. Click **Deploy**.

Vercel will build, deploy, and give you a live URL within ~60 seconds. Add a custom domain (`cleardesk.ai`) under Project → Settings → Domains.

---

## Customizing

| Where to edit                          | What it controls                             |
| -------------------------------------- | -------------------------------------------- |
| `lib/data.ts`                          | Services, pricing, portfolio projects        |
| `app/layout.tsx`                       | Site-wide SEO defaults, fonts                |
| `tailwind.config.ts`                   | Brand colors, typography, animations         |
| `components/Chatbot.tsx`               | Chatbot script and qualification flow        |
| `app/api/contact/route.ts`             | Where contact-form submissions are sent      |
| `components/CalendlyEmbed.tsx`         | Default Calendly URL fallback                |

### Wiring the contact form to a real inbox

The handler at `app/api/contact/route.ts` currently logs submissions. To actually deliver email, drop in [Resend](https://resend.com) (recommended for Vercel):

```bash
npm install resend
```

```ts
// app/api/contact/route.ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "ClearDesk AI <hello@cleardesk.ai>",
  to: "you@cleardesk.ai",
  subject: `New inquiry from ${name}`,
  reply_to: email,
  text: message,
});
```

### Connecting the chatbot to a real AI

The chatbot in [`components/Chatbot.tsx`](components/Chatbot.tsx) is a deterministic scripted flow today. To swap in a real LLM (Claude, OpenAI, etc.):

1. Add an API route at `app/api/chat/route.ts` that calls your model.
2. Replace the `pickOption` flow with a `fetch('/api/chat')` call that streams tokens back.
3. Keep the qualification structure (project type → budget → timeline → CTA).

---

## Branding cheat sheet

### Color palette

| Role           | Hex       | Tailwind         |
| -------------- | --------- | ---------------- |
| Brand primary  | `#2B7FFF` | `brand-500`      |
| Brand dark     | `#1E5FCC` | `brand-600`      |
| Brand deep     | `#172554` | `brand-900`      |
| Ink (text)     | `#0F172A` | `ink`            |
| Ink muted      | `#475569` | `ink-muted`      |
| Surface        | `#FFFFFF` | `surface`        |
| Surface subtle | `#F8FAFC` | `surface-subtle` |
| Accent (sky)   | `#0EA5E9` | `sky-500`        |
| Success        | `#10B981` | `emerald-500`    |

### Typography

- **Headings:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — modern, slightly geometric, distinct.
- **Body:** [Inter](https://fonts.google.com/specimen/Inter) — clean, highly readable, neutral.

Both are loaded via `next/font/google` for zero-CLS, self-hosted delivery.

---

## License

© ClearDesk AI. All rights reserved.

import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { CTABanner } from "@/components/CTABanner";
import { NeuralFlow } from "@/components/NeuralFlow";

const PROCESS = [
  {
    step: "01",
    title: "Quick Call",
    body: "A free 15-min call where we learn about your business and plan out your website together.",
  },
  {
    step: "02",
    title: "We Build It",
    body: "We design and build your entire website — fast, professional, and ready to bring in customers.",
  },
  {
    step: "03",
    title: "You Go Live",
    body: "Your website goes live and starts working for you. We handle hosting, updates, and everything in between.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* NEURAL FLOW — interactive particle hero */}
      <NeuralFlow />

      {/* BENTO: WHAT WE DO */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="h2 text-balance">
                Everything you need
                <br />
                to get more customers.
              </h2>
            </div>
            <p className="max-w-md text-white/60">
              We don't just build you a pretty site. We build one that
              actually gets you customers.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-2">
            {/* WEB DESIGN — large */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.04] lg:col-span-4 lg:row-span-1">
              <div className="flex items-start justify-between gap-6">
                <div className="max-w-md">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                    01 — Professional Website
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
                    A website that makes you look legit.
                  </h3>
                  <p className="mt-3 text-white/65">
                    Clean, professional, and built to make people trust your
                    business the second they land on your page.
                  </p>
                  <Link
                    href="/services#landing-page"
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-white/80 hover:text-white"
                  >
                    See plans
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M3 6h6m0 0L6 3m3 3L6 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="hidden flex-1 items-center justify-end sm:flex">
                  <div className="relative h-40 w-56 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent">
                    <div className="absolute inset-0 bg-grid-dense opacity-40" />
                    <div className="absolute left-3 top-3 h-1.5 w-12 rounded-full bg-white/30" />
                    <div className="absolute left-3 top-7 h-1 w-20 rounded-full bg-white/15" />
                    <div className="absolute left-3 top-12 h-8 w-24 rounded-md bg-white" />
                    <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-1.5">
                      <div className="h-10 rounded-md bg-white/10" />
                      <div className="h-10 rounded-md bg-white/10" />
                      <div className="h-10 rounded-md bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI INTEGRATION (small) */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.04] lg:col-span-2 lg:row-span-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                02 — AI Tools
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                Let AI handle the busy work.
              </h3>
              <p className="mt-3 text-sm text-white/65">
                A chatbot that answers questions and captures leads while
                you sleep. Plus Google review automation to boost your
                ratings.
              </p>
              <ul className="mt-5 space-y-1.5 font-mono text-[11px] text-white/70">
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">›</span>AI chatbot on your site
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">›</span>Answers questions 24/7
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">›</span>Google review booster
                </li>
              </ul>
            </div>

            {/* SEO OPTIMIZATION — large */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 transition-all hover:border-white/25 lg:col-span-3 lg:row-span-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                03 — Get Found on Google
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
                Show up when people search
                <br />
                <span className="text-white/50">for what you do.</span>
              </h3>
              <p className="mt-3 max-w-md text-white/65">
                Every site we build is designed to rank in your area. When
                someone Googles "plumber near me" or "best dentist in
                Oakland" — you actually show up.
              </p>
              <ul className="mt-6 grid gap-2 font-mono text-xs text-white/70 sm:grid-cols-2">
                {[
                  "Rank for your city + service",
                  "Google Business optimization",
                  "Show up on Google Maps",
                  "Fast on every phone",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-brand-400">›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* PROCESS */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.04] lg:col-span-3 lg:row-span-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                How it works
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                3 steps. That's it.
              </h3>
              <p className="mt-3 text-sm text-white/65">
                We keep it simple — call, build, launch. No
                back-and-forth for months.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {PROCESS.map((p) => (
                  <div
                    key={p.step}
                    className="rounded-lg border border-white/10 bg-black/40 p-3 text-center"
                  >
                    <p className="font-mono text-[10px] text-white/40">
                      {p.step}
                    </p>
                    <p className="mt-1 font-display text-sm font-semibold text-white">
                      {p.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI CHATBOT PREVIEW */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="h2 text-balance">
                Your AI chatbot answers questions and captures leads while
                you sleep.
              </h2>
              <p className="mt-5 text-lg text-white/65">
                Every site we build comes with an AI assistant that knows
                your business inside and out. It answers customer questions
                instantly, captures their info, and sends you the lead —
                even at 2am on a Sunday.
              </p>
              <ul className="mt-6 space-y-3 text-white/70">
                {[
                  "Answers FAQs about your services and pricing",
                  "Captures name, email, and what they need",
                  "Helps visitors book a call with you",
                  "Works 24/7 — nights, weekends, holidays",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4 10.5l3.5 3.5L16 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock chat window */}
            <div className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-ring">
                <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-br from-brand-700/40 via-brand-500/20 to-transparent px-4 py-3">
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-black bg-brand-400" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">ClearDesk Assistant</p>
                    <p className="text-[10px] text-white/50">Online</p>
                  </div>
                </div>
                <div className="space-y-3 px-4 py-4">
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl bg-white/[0.06] px-4 py-2.5 text-sm text-white ring-1 ring-white/10">
                      Hey! 👋 How can I help you today?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl bg-brand-500 px-4 py-2.5 text-sm text-white">
                      How much does a website cost?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl bg-white/[0.06] px-4 py-2.5 text-sm text-white ring-1 ring-white/10">
                      Our plans start at just $75/month for a professional landing page. Want me to help you pick the right plan?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl bg-brand-500 px-4 py-2.5 text-sm text-white">
                      Yes! Can I book a call?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl bg-white/[0.06] px-4 py-2.5 text-sm text-white ring-1 ring-white/10">
                      Absolutely! Here's the link to book a free 15-min strategy call 👇
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/30">
                      Ask me anything...
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M14 2L7 9M14 2l-5 12-2-5-5-2 12-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIG STAT — 72 HOURS */}
      <section className="border-y border-white/5 py-24 sm:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              From call to live website
            </p>
            <p className="mt-6 font-display text-6xl font-semibold leading-none tracking-tightest text-white sm:text-[120px] lg:text-[160px]">
              <CountUp
                target={72}
                duration={2200}
                suffix=" hours"
                className="gradient-text"
              />
            </p>
            <p className="mt-6 max-w-xl text-balance text-lg text-white/60 sm:text-xl mx-auto">
              Your website goes live within 72 hours of our first call.
              No waiting around for weeks.
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — CANCEL ANYTIME + UNLIMITED CHANGES */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center transition-all hover:border-white/20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                Cancel anytime
              </h3>
              <p className="mt-2 text-sm text-white/60">
                No contracts, no commitments. Stay because it works,
                not because you're locked in.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center transition-all hover:border-white/20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                Unlimited changes
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Need something updated? Just ask. We make unlimited
                changes to your site — no extra charges.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center transition-all hover:border-white/20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                We handle everything
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Hosting, domain, updates, security — we take care of it
                all so you can focus on your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS DETAIL */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="h2">How it works</h2>
          </div>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-3">
            {PROCESS.map((p) => (
              <li
                key={p.step}
                className="group relative bg-black p-8 transition-colors hover:bg-white/[0.03]"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">
                  STEP {p.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {p.body}
                </p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-brand-500 transition-all duration-500 group-hover:w-full" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

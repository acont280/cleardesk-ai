import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { CTABanner } from "@/components/CTABanner";
import { NeuralFlow } from "@/components/NeuralFlow";

const PROCESS = [
  {
    step: "01",
    title: "Onboarding Meeting",
    body: "A 15-min call to map your goals and strategize the design structure of your website.",
  },
  {
    step: "02",
    title: "Build",
    body: "We architect, design, and engineer a high-performance, conversion-optimized website tailored to your brand.",
  },
  {
    step: "03",
    title: "Launch",
    body: "We deploy your site to production, dial in performance, and hand you the keys to a polished, live presence.",
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
                Three services.
                <br />
                One outcome: revenue.
              </h2>
            </div>
            <p className="max-w-md text-white/60">
              We don't sell deliverables. Every project ships against a
              measurable conversion or efficiency target.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-2">
            {/* WEB DESIGN — large */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.04] lg:col-span-4 lg:row-span-1">
              <div className="flex items-start justify-between gap-6">
                <div className="max-w-md">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                    01 — Web Design
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
                    Sites that look premium and convert.
                  </h3>
                  <p className="mt-3 text-white/65">
                    Brand-first websites that turn visitors into qualified
                    leads. Every section earns its place.
                  </p>
                  <Link
                    href="/services#landing-page"
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-white/80 hover:text-white"
                  >
                    Explore
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
                02 — AI Integration
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                Automate the boring stuff.
              </h3>
              <p className="mt-3 text-sm text-white/65">
                Integrated AI chatbots, SaaS workflow automation, and
                Google review optimization — built into your site.
              </p>
              <ul className="mt-5 space-y-1.5 font-mono text-[11px] text-white/70">
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">›</span>AI chatbot
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">›</span>SaaS workflow automation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">›</span>Google review optimization
                </li>
              </ul>
            </div>

            {/* SEO OPTIMIZATION — large */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 transition-all hover:border-white/25 lg:col-span-3 lg:row-span-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                03 — SEO Optimization
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
                Built to rank locally.
                <br />
                <span className="text-white/50">Found by your customers.</span>
              </h3>
              <p className="mt-3 max-w-md text-white/65">
                We architect every site to rank in your city — Google
                Business optimization, structured local schema, hyper-fast
                Core Web Vitals, and on-page SEO baked in from day one. The
                customers searching for you actually find you.
              </p>
              <ul className="mt-6 grid gap-2 font-mono text-xs text-white/70 sm:grid-cols-2">
                {[
                  "Local keyword targeting",
                  "Google Business Profile",
                  "Local schema + maps",
                  "Sub-second page loads",
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
                Process
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                Tight 3-step workflow.
              </h3>
              <p className="mt-3 text-sm text-white/65">
                Designed to launch in days, not months — without skipping
                strategy.
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

      {/* BIG STAT — 72 HOURS */}
      <section className="border-y border-white/5 py-24 sm:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Track record
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
              We will launch your website within 72 hours of our meeting.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS DETAIL */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="h2">How we work</h2>
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

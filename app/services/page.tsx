import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Websites, AI Integration & Lead Capture",
  description:
    "Three packages — a professional landing page, a multi-page SEO site with AI chatbot, or the complete Never Miss Another Lead system with an AI receptionist.",
};

const ICONS = {
  design: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v8A1.5 1.5 0 0 1 18.5 15h-5l-3 4-3-4h-2A1.5 1.5 0 0 1 4 13.5v-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 8h8M8 11h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 7l-5 5 5 5M15 7l5 5-5 5M13 5l-2 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ai: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l1.6 3.4L17 8l-3.4 1.6L12 13l-1.6-3.4L7 8l3.4-1.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 17l.9 1.9L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-1.1L5 17z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  phone: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
} as const;

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden="true" className="absolute inset-0 bg-grid" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-grid-fade"
        />
        <div className="container-page relative pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <h1 className="h1 text-balance">
              Simple pricing.
              <br />
              <span className="gradient-text">No surprises.</span>
            </h1>
            <p className="lede mt-6">
              Pick the plan that fits your business. Cancel anytime. Unlimited
              changes included.
            </p>
          </div>
        </div>
      </section>

      {/* Service detail blocks */}
      <section className="pb-20 pt-12 sm:pt-20">
        <div className="container-page space-y-16 sm:space-y-24">
          {SERVICES.map((service, idx) => {
            const isFeatured = service.id === "multipage-ai";
            return (
              <article
                key={service.id}
                id={service.id}
                className={`scroll-mt-28 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start ${
                  idx % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:sticky lg:top-28">
                  <div
                    className={`relative overflow-hidden rounded-2xl border p-6 sm:rounded-3xl sm:p-10 ${
                      isFeatured
                        ? "border-white/20 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-400 sm:h-14 sm:w-14 sm:rounded-2xl">
                      {ICONS[service.iconKey]}
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-semibold leading-[1.1] tracking-tight text-white sm:mt-6 sm:text-4xl">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-base text-white/65 sm:mt-3 sm:text-lg">
                      {service.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
                      <div className="inline-flex items-baseline gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 sm:px-4 sm:py-2">
                        {service.originalPrice && (
                          <span className="font-display text-sm font-medium text-white/40 line-through sm:text-base">
                            {service.originalPrice}
                          </span>
                        )}
                        <span className="font-display text-xl font-semibold text-white sm:text-2xl">
                          {service.price}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 sm:text-[11px]">
                          {service.priceSuffix}
                        </span>
                      </div>
                      {service.originalPrice && (
                        <span className="relative font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-400 sm:text-[11px]">
                          — Limited Discount
                          <span className="absolute -bottom-0.5 left-0 h-px w-full bg-brand-400/40" />
                        </span>
                      )}
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <Button href="/contact">
                        Book a Free Strategy Call
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="hidden text-lg leading-relaxed text-white/80 sm:block">
                    {service.description}
                  </p>

                  <div className="sm:mt-10">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                      What&apos;s included
                    </h3>
                    <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                      {service.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.02] p-3 sm:gap-3 sm:rounded-xl sm:p-4"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400 sm:h-5 sm:w-5"
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
                          <span className="text-sm text-white/85 sm:text-base">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 sm:mt-10">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                      Best for
                    </h3>
                    <ul className="mt-3 grid gap-2 grid-cols-2 sm:mt-4 sm:gap-3">
                      {service.useCases.map((u) => (
                        <li
                          key={u}
                          className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs text-white/65 sm:rounded-xl sm:p-4 sm:text-sm"
                        >
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CTABanner
        title="Not sure which plan is right?"
        subtitle="Jump on a free 15-min call and we'll help you pick. No pressure, no pitch — just honest advice."
      />
    </>
  );
}

import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About — A one-person studio in the Bay Area",
  description:
    "ClearDesk AI is a one-person studio based in the Bay Area, helping small businesses get the websites they deserve at an honest price.",
};

export default function AboutPage() {
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
              <span className="gradient-text">Honest pricing.</span>{" "}
              Professional websites.
            </h1>
            <p className="lede mt-6">
              ClearDesk AI is a one-person studio based in the Bay Area —
              helping small businesses get the websites they actually
              deserve, at a price that doesn't insult them.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="pb-16 pt-20">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-white">
                Why this exists
              </h2>
              <div className="mt-5 space-y-4 text-white/70">
                <p>
                  Most web design agencies charge $15k–$50k for sites that
                  small businesses don't need, take months to deliver, and
                  often look generic when they finally launch. The pitch
                  decks are big, the team is bigger, and the bill reflects
                  every layer in between.
                </p>
                <p>
                  Small business owners — the local plumber, the dentist,
                  the contractor, the consultant — keep getting overcharged
                  and underdelivered. They get a slow site, a stock-photo
                  template, and an invoice that hurts.
                </p>
                <p>
                  ClearDesk is the opposite. One person, working directly
                  with you, building a real website that loads fast, ranks
                  locally, and captures leads. No project managers, no
                  account executives, no junior designers learning on your
                  dime — just the person actually doing the work.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-white">
                What I believe
              </h2>
              <p className="mt-4 text-white/70">
                Your business deserves a great website — you shouldn't
                have to pay agency prices to get one. Today's tools make
                it possible to build something professional and fast
                without a 10-person team. The big agency markup is a
                choice, not a necessity.
              </p>
              <p className="mt-4 text-white/70">
                If I take on your project, it's because I know I can
                build you something better than what you have — and
                faster than you'd expect. If I can't help, I'll tell
                you upfront.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact">Book a free call</Button>
                <Button
                  href="mailto:hello@cleardesk.ai"
                  variant="secondary"
                >
                  Email me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-y border-white/5 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border border-brand-500/30 bg-gradient-to-br from-brand-500/30 via-brand-500/10 to-transparent font-display text-5xl font-semibold text-white shadow-glow-strong">
                AC
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-white">
                  Adrian Contreras
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                  Founder · Bay Area
                </p>
                <p className="mt-4 text-white/70">
                  I'm a one-person studio based in the Bay Area. I design,
                  build, and launch websites for small businesses — and
                  layer in AI tools (chatbots, AI receptionists, review
                  automation) where they genuinely save time or capture
                  leads. If you've been quoted $20k for a site you know
                  shouldn't cost that, we should talk.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button href="/contact" size="sm">
                    Book a call
                  </Button>
                  <Button
                    href="mailto:hello@cleardesk.ai"
                    variant="secondary"
                    size="sm"
                  >
                    Email Adrian
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

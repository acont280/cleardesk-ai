import { Button } from "./Button";

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function CTABanner({
  title = "Ready to get more customers?",
  subtitle = "Book a free 15-minute call. No pitch, no pressure — just an honest conversation about what your business needs.",
  primaryHref = "/contact",
  primaryLabel = "Book a Free Call",
}: Props) {
  return (
    <section className="container-page py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 sm:px-12 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-grid-fade"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-white text-balance sm:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primaryHref} size="lg">
              {primaryLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8m0 0L7 3m4 4L7 11"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button
              href="mailto:hello@cleardesk.ai"
              variant="ghost"
              size="lg"
            >
              Or email us →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

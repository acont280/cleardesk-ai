import type { Metadata } from "next";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Book a Free 15-Min Strategy Call",
  description:
    "Book a free 15-minute strategy call with ClearDesk AI, or send us a quick note. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden="true" className="absolute inset-0 bg-grid" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-grid-fade"
        />
        <div className="container-page relative pt-20 pb-12 sm:pt-28 sm:pb-16">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <h1 className="h1 text-balance">
              Book a Free 15-Min{" "}
              <span className="gradient-text">Strategy Call</span>
            </h1>
            <p className="lede mt-6">
              In this call we'll discuss the design of your website and
              what tools would be most useful for you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-12">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white">
                Pick a time
              </h2>
              <p className="mt-2 text-white/65">
                All times shown in your local timezone. Calls are 15
                minutes — we keep them tight.
              </p>
              <div className="mt-5">
                <CalendlyEmbed height={680} />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
              <h2 className="font-display text-2xl font-semibold text-white">
                Or send a quick note
              </h2>
              <p className="mt-2 text-white/65">
                Tell me what you're looking for. I'll reply within one
                business day.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

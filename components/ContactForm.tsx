"use client";

import { useState } from "react";
import { Button } from "./Button";

type Status = "idle" | "submitting" | "success" | "error";

const PACKAGES = [
  {
    id: "landing-page",
    label: "Landing Page Only",
    sub: "One-page site, professional & fast",
  },
  {
    id: "multipage",
    label: "Multi-Page Website",
    sub: "SEO-optimized + AI chatbot",
  },
  {
    id: "never-miss-lead",
    label: "Never Miss Another Lead",
    sub: "AI receptionist + site + reviews",
  },
] as const;

type PackageId = (typeof PACKAGES)[number]["id"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<PackageId | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const business = String(formData.get("business") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim();

    if (!selected) {
      setStatus("error");
      setError("Please pick what you're looking for.");
      return;
    }
    if (!name || !email || !business) {
      setStatus("error");
      setError("Please fill in name, email, and your profession/business.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    const packageLabel =
      PACKAGES.find((p) => p.id === selected)?.label ?? selected;

    const message = [
      `Looking for: ${packageLabel}`,
      `Profession/Business: ${business}`,
      website ? `Current website: ${website}` : "Current website: (none)",
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setSelected(null);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please email hello@cleardesk.ai.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 text-white">
        <p className="font-display text-lg font-semibold">Got it — thanks!</p>
        <p className="mt-1 text-sm text-white/70">
          I'll get back to you within one business day. In the meantime,
          feel free to grab a slot on the calendar above.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" type="text" autoComplete="name" required />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      {/* Package picker */}
      <div>
        <label className="mb-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
          What are you looking for?
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {PACKAGES.map((pkg) => {
            const active = selected === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelected(pkg.id)}
                aria-pressed={active}
                className={`group flex h-full flex-col rounded-xl border p-4 text-left transition-all ${
                  active
                    ? "border-brand-400/60 bg-brand-500/10 shadow-glow"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`font-display text-sm font-semibold ${
                    active ? "text-white" : "text-white/90"
                  }`}
                >
                  {pkg.label}
                </span>
                <span className="mt-1 text-[11px] leading-snug text-white/55">
                  {pkg.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Field
        id="business"
        label="What is your profession / business?"
        type="text"
        placeholder="e.g. Plumber in San Jose, dental practice, marketing consultant"
        required
      />

      <Field
        id="website"
        label="Link to your current website (optional)"
        type="url"
        placeholder="https://"
      />

      {error && (
        <p className="rounded-lg border border-white/20 bg-white/[0.05] px-4 py-3 text-sm text-white">
          {error}
        </p>
      )}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
          Replies within one business day.
        </p>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type,
  autoComplete,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/60"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-4 focus:ring-white/5"
      />
    </div>
  );
}

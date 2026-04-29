"use client";

import { useEffect, useRef, useState } from "react";

type Sender = "bot" | "user";
type Message = { id: string; sender: Sender; text: string };
type StepKey = "intro" | "type" | "budget" | "timeline" | "wrap" | "done";

type Option = { label: string; value: string; next: StepKey };

const STEPS: Record<
  StepKey,
  {
    botText: string;
    options?: Option[];
  }
> = {
  intro: {
    botText:
      "Hey 👋 I'm ClearDesk's assistant. I can help qualify your project in under a minute. What are you exploring?",
    options: [
      { label: "Web design", value: "design", next: "budget" },
      { label: "Web development", value: "dev", next: "budget" },
      { label: "AI automation", value: "ai", next: "budget" },
      { label: "Not sure yet", value: "unsure", next: "budget" },
    ],
  },
  type: {
    botText: "Got it. What kind of project is it?",
    options: [
      { label: "Web design", value: "design", next: "budget" },
      { label: "Web development", value: "dev", next: "budget" },
      { label: "AI automation", value: "ai", next: "budget" },
    ],
  },
  budget: {
    botText: "What's the rough budget you have in mind?",
    options: [
      { label: "Under $5k", value: "<5k", next: "timeline" },
      { label: "$5k–$15k", value: "5-15k", next: "timeline" },
      { label: "$15k+", value: "15k+", next: "timeline" },
      { label: "Not sure", value: "unsure", next: "timeline" },
    ],
  },
  timeline: {
    botText: "When are you hoping to start?",
    options: [
      { label: "ASAP", value: "asap", next: "wrap" },
      { label: "Within a month", value: "1m", next: "wrap" },
      { label: "1–3 months", value: "3m", next: "wrap" },
      { label: "Just exploring", value: "explore", next: "wrap" },
    ],
  },
  wrap: {
    botText:
      "Perfect — sounds like a fit. The fastest next step is a free 15-min strategy call. Want to grab a slot now?",
    options: [
      { label: "Book a call", value: "book", next: "done" },
      { label: "Maybe later", value: "later", next: "done" },
    ],
  },
  done: {
    botText:
      "Sounds good. You can also reach us anytime at hello@cleardesk.ai — talk soon!",
  },
};

const CALENDLY_PATH = "/contact";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [step, setStep] = useState<StepKey>("intro");
  const [messages, setMessages] = useState<Message[]>([
    { id: uid(), sender: "bot", text: STEPS.intro.botText },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setUnread(false);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function pickOption(opt: Option) {
    setMessages((m) => [...m, { id: uid(), sender: "user", text: opt.label }]);

    if (opt.value === "book") {
      window.location.href = CALENDLY_PATH;
      return;
    }

    setTyping(true);
    setTimeout(() => {
      const next = STEPS[opt.next];
      setMessages((m) => [
        ...m,
        { id: uid(), sender: "bot", text: next.botText },
      ]);
      setStep(opt.next);
      setTyping(false);
    }, 650);
  }

  const current = STEPS[step];

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-glow-strong ring-1 ring-brand-400/30 transition-transform hover:-translate-y-0.5 hover:bg-brand-400 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8A2.5 2.5 0 0 1 17.5 17H9l-4 3v-3H6.5A2.5 2.5 0 0 1 4 14.5v-8z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="10.5" r="1" fill="currentColor" />
              <circle cx="12" cy="10.5" r="1" fill="currentColor" />
              <circle cx="15" cy="10.5" r="1" fill="currentColor" />
            </svg>
            {unread && (
              <span className="absolute right-1 top-1 inline-flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-400 ring-2 ring-black" />
              </span>
            )}
          </>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="ClearDesk AI Assistant"
          className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-2xl border border-white/15 bg-black shadow-ring animate-fade-up sm:right-6"
          style={{ height: "min(560px, calc(100vh - 8rem))" }}
        >
          <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-br from-brand-700/40 via-brand-500/20 to-transparent px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_0_16px_rgba(59,130,246,0.5)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-black bg-brand-400" />
              </span>
              <div>
                <p className="text-sm font-semibold">ClearDesk Assistant</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
                  Typically replies instantly
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-black px-4 py-4 scrollbar-thin"
          >
            <ul className="space-y-3">
              {messages.map((m) => (
                <li
                  key={m.id}
                  className={`flex ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.sender === "user"
                        ? "bg-brand-500 text-white"
                        : "bg-white/[0.06] text-white ring-1 ring-white/10"
                    }`}
                  >
                    {m.text}
                  </div>
                </li>
              ))}
              {typing && (
                <li className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10">
                    <span className="h-2 w-2 animate-pulse-soft rounded-full bg-brand-400" />
                    <span
                      className="h-2 w-2 animate-pulse-soft rounded-full bg-white/60"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="h-2 w-2 animate-pulse-soft rounded-full bg-white/60"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="border-t border-white/10 bg-black p-3">
            {current.options ? (
              <div className="flex flex-wrap gap-2">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => pickOption(opt)}
                    disabled={typing}
                    className="rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white transition-colors hover:border-brand-400/60 hover:bg-brand-500/10 hover:text-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : (
              <a
                href={CALENDLY_PATH}
                className="block rounded-full bg-brand-500 py-2.5 text-center text-sm font-medium text-white shadow-glow-strong transition-colors hover:bg-brand-400"
              >
                Book a free strategy call →
              </a>
            )}
            <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              Powered by ClearDesk AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}

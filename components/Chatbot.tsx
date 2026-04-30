"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES = 20;

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/cleardesk-ai/strategy-call";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

/** Turn URLs in text into clickable links */
function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-brand-400 hover:text-brand-300"
      >
        {part.length > 40 ? "Book a call here" : part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        "Hey! 👋 I'm the ClearDesk assistant. I can answer questions about our services, pricing, and process — or help you book a free strategy call. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const userMsgCount = messages.filter((m) => m.role === "user").length;

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading || limitReached) return;

    if (userMsgCount >= MAX_MESSAGES) {
      setLimitReached(true);
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "assistant",
          content: `You've hit the message limit! To keep the conversation going, book a free call with Adrian: ${CALENDLY_URL}`,
        },
      ]);
      return;
    }

    const userMsg: Message = { id: uid(), role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const reply = data.reply ?? data.error ?? "Sorry, something went wrong.";

      setMessages((m) => [
        ...m,
        { id: uid(), role: "assistant", content: reply },
      ]);

      if (data.reply && userMsgCount + 1 >= MAX_MESSAGES) {
        setLimitReached(true);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "assistant",
          content: "Something went wrong. Please try again or email hello@cleardesk.ai.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

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
                  AI-powered · Online
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
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-brand-500 text-white"
                        : "bg-white/[0.06] text-white ring-1 ring-white/10"
                    }`}
                  >
                    {m.role === "assistant" ? linkify(m.content) : m.content}
                  </div>
                </li>
              ))}
              {loading && (
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
            {limitReached ? (
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-brand-500 py-2.5 text-center text-sm font-medium text-white shadow-glow-strong transition-colors hover:bg-brand-400"
              >
                Book a free strategy call →
              </a>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask me anything..."
                  disabled={loading}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white transition-colors hover:bg-brand-400 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M14 2L7 9M14 2l-5 12-2-5-5-2 12-5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
            <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              {limitReached
                ? "Message limit reached"
                : `${MAX_MESSAGES - userMsgCount} messages remaining`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

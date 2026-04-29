"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  url?: string;
  height?: number;
  className?: string;
};

const DEFAULT_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/cleardesk-ai/strategy-call";

export function CalendlyEmbed({
  url = DEFAULT_URL,
  height = 720,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl border border-white/10 bg-white ${className}`}
      style={{ minHeight: height }}
    >
      {loaded ? (
        <iframe
          src={`${url}?hide_gdpr_banner=1&background_color=ffffff&text_color=0a0a0a&primary_color=000000`}
          title="Schedule a strategy call with ClearDesk AI"
          width="100%"
          height={height}
          frameBorder="0"
          loading="lazy"
          className="block"
        />
      ) : (
        <div
          className="flex items-center justify-center font-mono text-xs uppercase tracking-[0.16em] text-black/50"
          style={{ height }}
        >
          Loading scheduler…
        </div>
      )}
    </div>
  );
}

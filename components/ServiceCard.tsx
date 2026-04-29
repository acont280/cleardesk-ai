import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  bullets?: string[];
  href?: string;
};

export function ServiceCard({ icon, title, description, bullets, href }: Props) {
  return (
    <article className="card group flex h-full flex-col">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-400 transition-colors group-hover:border-brand-400/50 group-hover:bg-brand-500 group-hover:text-white">
        {icon}
      </div>
      <h3 className="h3">{title}</h3>
      <p className="mt-3 text-white/65">{description}</p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-5 space-y-2 text-sm text-white/65">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 10.5l3.5 3.5L16 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {href && (
        <a
          href={href}
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-brand-400 hover:text-brand-500"
        >
          Learn more
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 6h6m0 0L6 3m3 3L6 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </article>
  );
}

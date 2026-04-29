import Link from "next/link";
import { Logo } from "./Logo";

const FOOTER_NAV = [
  {
    title: "Services",
    links: [
      { href: "/services#landing-page", label: "Landing Page" },
      { href: "/services#multipage-ai", label: "Multi-Page + AI" },
      { href: "/services#never-miss-lead", label: "Never Miss a Lead" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/contact", label: "Book a Call" },
      { href: "mailto:hello@cleardesk.ai", label: "hello@cleardesk.ai" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Modern web design and AI automation for teams who want to ship
              fast and convert better.
            </p>
          </div>
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ClearDesk AI. All rights reserved.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
            Built with Next.js · Designed to convert.
          </p>
        </div>
      </div>
    </footer>
  );
}

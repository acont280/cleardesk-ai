import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const SITE_URL = "https://cleardesk.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ClearDesk AI — Web Design, Development & AI Automation",
    template: "%s · ClearDesk AI",
  },
  description:
    "ClearDesk AI builds high-converting websites and AI automations for startups, small businesses, and SaaS teams. Book a free strategy call.",
  keywords: [
    "web design agency",
    "AI automation",
    "AI integration",
    "Next.js development",
    "SaaS website design",
    "AI chatbot",
    "lead qualification",
  ],
  authors: [{ name: "ClearDesk AI" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "ClearDesk AI — Web Design, Development & AI Automation",
    description:
      "Premium web design and AI automation for startups, small businesses, and SaaS. Built to convert.",
    siteName: "ClearDesk AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearDesk AI — Web Design, Development & AI Automation",
    description:
      "Premium web design and AI automation for startups, small businesses, and SaaS. Built to convert.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-black font-sans text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}

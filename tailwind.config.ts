import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Black + Blue dark theme.
        // brand-400/500/600 = blue accent (CTAs, gradients, indicators)
        // brand-50–300 = dark blue-tinted surfaces (kept for legacy refs)
        brand: {
          50: "#0A0F1F",
          100: "#0F1729",
          200: "#172554",
          300: "#1E3A8A",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#172554",
        },
        ink: {
          DEFAULT: "#FAFAFA",
          muted: "#A3A3A3",
          subtle: "#737373",
        },
        surface: {
          DEFAULT: "#000000",
          subtle: "#0A0A0A",
          muted: "#171717",
        },
        line: {
          DEFAULT: "#262626",
          subtle: "#171717",
          strong: "#404040",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space-grotesk)", "ui-sans-serif", "system-ui"],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        soft: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.3)",
        ring: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.5)",
        glow: "0 0 80px rgba(59,130,246,0.18)",
        "glow-strong":
          "0 0 0 1px rgba(59,130,246,0.4), 0 8px 32px rgba(59,130,246,0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.18), transparent 70%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>\")",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.6s ease-out both",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "scan": "scan 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scan: {
          "0%, 100%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

"use client";

import { useEffect, useRef, useState } from "react";
import { makePerlin } from "@/lib/perlin";
import { Button } from "./Button";

/**
 * NeuralFlow — interactive particle hero.
 *
 * A full-bleed canvas particle field that flows left → right under a
 * Perlin-noise vector field. Particles are drawn additively from a
 * pre-rendered radial-gradient sprite to fake a soft bloom. The cursor
 * acts as an attractor; click anywhere on the field to detonate a
 * radial shockwave that pushes nearby particles outward in a ripple.
 *
 * Performance:
 *   - Single requestAnimationFrame loop (no React state per frame).
 *   - Pointer position lives in a ref — zero re-renders on mouse move.
 *   - Pre-rendered sprite means each particle is one drawImage() call.
 *   - Particle count scales with viewport area; coarse pointers (touch)
 *     get a lower density to keep mobile smooth.
 *   - IntersectionObserver pauses the loop when offscreen.
 *   - Respects prefers-reduced-motion (renders one static frame).
 *
 * UX:
 *   - On mount, auto-fires a centered shockwave for an entrance moment.
 *   - On pointerdown, fires a shockwave at the click location.
 *   - Shockwaves render a fading ring + apply a single-pass impulse to
 *     particles in the wave's leading edge band.
 */
export function NeuralFlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showFirstLine, setShowFirstLine] = useState(true);

  // Hide the first headline after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowFirstLine(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const section = sectionRef.current;
    if (!canvas || !overlay || !section) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    // ------------------------------------------------------------------
    //  Particle state
    // ------------------------------------------------------------------
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      tone: number; // 0 = blue, 1 = cyan
    };

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    const noise = makePerlin(42);

    // Pointer (refs only — zero re-renders).
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      influence: 0,
    };
    const ATTRACT_RADIUS = isCoarse ? 160 : 230;
    const ATTRACT_FORCE = 0.55;

    // ------------------------------------------------------------------
    //  Shockwave state — radial impulse on click + initial entrance.
    // ------------------------------------------------------------------
    type Shockwave = {
      x: number;
      y: number;
      prevR: number; // last frame's radius (for band-based force)
      startTime: number;
      maxR: number;
      power: number;
    };
    const SW_SPEED_PX_PER_S = 1500;
    const shockwaves: Shockwave[] = [];

    function explode(x: number, y: number, power = 14, maxR = 700) {
      shockwaves.push({
        x,
        y,
        prevR: 0,
        startTime: performance.now(),
        maxR,
        power,
      });
    }

    // ------------------------------------------------------------------
    //  Pre-rendered glow sprites (radial cyan→blue gradients).
    //  Drawing under composite "lighter" produces additive bloom cheaply.
    // ------------------------------------------------------------------
    const SPRITE_BLUE = makeGlowSprite("#7DC8FF", "#3B82F6");
    const SPRITE_CYAN = makeGlowSprite("#A5F2FF", "#22D3EE");

    function makeGlowSprite(inner: string, outer: string): HTMLCanvasElement {
      const SIZE = 64;
      const c = document.createElement("canvas");
      c.width = c.height = SIZE;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(
        SIZE / 2,
        SIZE / 2,
        0,
        SIZE / 2,
        SIZE / 2,
        SIZE / 2
      );
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.18, hexToRgba(inner, 0.85));
      grad.addColorStop(0.45, hexToRgba(outer, 0.35));
      grad.addColorStop(1, hexToRgba(outer, 0));
      g.fillStyle = grad;
      g.fillRect(0, 0, SIZE, SIZE);
      return c;
    }

    function hexToRgba(hex: string, a: number): string {
      const h = hex.replace("#", "");
      const n = parseInt(h, 16);
      const r = (n >> 16) & 255;
      const g = (n >> 8) & 255;
      const b = n & 255;
      return `rgba(${r},${g},${b},${a})`;
    }

    // ------------------------------------------------------------------
    //  Sizing — particle count scales with viewport area.
    // ------------------------------------------------------------------
    function spawn(initial = false): Particle {
      return {
        x: initial ? Math.random() * width : -10,
        y: Math.random() * height,
        vx: 0.4 + Math.random() * 0.9,
        vy: 0,
        size: 0.5 + Math.random() * 1.6,
        baseAlpha: 0.1 + Math.random() * 0.55,
        tone: Math.random(),
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const divisor = isCoarse ? 1800 : 850;
      const max = isCoarse ? 1200 : 2600;
      const target = Math.min(max, Math.max(500, Math.floor(area / divisor)));

      if (particles.length === 0) {
        for (let i = 0; i < target; i++) particles.push(spawn(true));
      } else if (particles.length < target) {
        for (let i = particles.length; i < target; i++)
          particles.push(spawn(true));
      } else if (particles.length > target) {
        particles.length = target;
      }
    }

    // ------------------------------------------------------------------
    //  Main render loop
    // ------------------------------------------------------------------
    function step(t: number) {
      if (!running) return;
      raf = requestAnimationFrame(step);

      // Smooth mouse influence.
      if (mouse.active) {
        mouse.influence = Math.min(1, mouse.influence + 0.08);
      } else {
        mouse.influence *= 0.94;
      }

      // Trail clear: semi-transparent black gives a motion-blur "river" feel.
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx!.fillRect(0, 0, width, height);

      // Additive blending for soft, glowy particles + rings.
      ctx!.globalCompositeOperation = "lighter";

      // ---- Advance shockwaves and apply band-impulse to particles -------
      const now = performance.now();
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        const elapsed = (now - sw.startTime) / 1000;
        const r = elapsed * SW_SPEED_PX_PER_S;
        if (r > sw.maxR) {
          shockwaves.splice(i, 1);
          continue;
        }
        const lifeFrac = r / sw.maxR;
        const decay = 1 - lifeFrac;
        const impulse = sw.power * decay;

        // Apply outward velocity to particles inside the leading edge band
        // (between previous frame's radius and current radius).
        for (let pi = 0; pi < particles.length; pi++) {
          const p = particles[pi];
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < sw.prevR * sw.prevR || d2 > r * r) continue;
          const d = Math.sqrt(d2) || 0.001;
          p.vx += (dx / d) * impulse;
          p.vy += (dy / d) * impulse;
        }
        sw.prevR = r;

        // Draw a fading ring at the wave front (additive → glows).
        ctx!.strokeStyle = `rgba(120, 190, 255, ${0.35 * decay})`;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.arc(sw.x, sw.y, r, 0, Math.PI * 2);
        ctx!.stroke();

        // Subtle inner ring for depth.
        if (r > 30) {
          ctx!.strokeStyle = `rgba(59, 130, 246, ${0.2 * decay})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(sw.x, sw.y, r * 0.85, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }

      // ---- Particles ----------------------------------------------------
      const time = t * 0.00018;
      const flowScale = 0.0035;
      const r2 = ATTRACT_RADIUS * ATTRACT_RADIUS;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Flow field — Perlin sample → smooth organic angle.
        const angle =
          noise(p.x * flowScale, p.y * flowScale + time) * Math.PI * 1.4;
        const targetVx = Math.cos(angle) * 0.05 + 0.5; // bias right
        const targetVy = Math.sin(angle) * 0.55;

        p.vx += (targetVx - p.vx) * 0.05;
        p.vy += (targetVy - p.vy) * 0.05;

        // Cursor attraction.
        let hubProx = 0;
        if (mouse.influence > 0.01) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < r2) {
            const dist = Math.sqrt(dist2) || 1;
            const falloff = 1 - dist / ATTRACT_RADIUS;
            hubProx = falloff * mouse.influence;
            const f = falloff * falloff * ATTRACT_FORCE * mouse.influence;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
          }
        }

        // Speed cap.
        const sp2 = p.vx * p.vx + p.vy * p.vy;
        if (sp2 > 36) {
          const k = 6 / Math.sqrt(sp2);
          p.vx *= k;
          p.vy *= k;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap / respawn.
        if (p.x > width + 24) {
          p.x = -12;
          p.y = Math.random() * height;
          p.vx = 0.4 + Math.random() * 0.9;
          p.vy = 0;
        } else if (p.x < -24) {
          p.x = width + 12;
        }
        if (p.y < -24) p.y = height + 24;
        else if (p.y > height + 24) p.y = -24;

        // Draw — alpha and size pop near the cursor hub.
        const alpha = Math.min(1, p.baseAlpha + hubProx * 0.85);
        const drawSize = p.size * (8 + hubProx * 18);
        const sprite = p.tone > 0.55 ? SPRITE_CYAN : SPRITE_BLUE;

        ctx!.globalAlpha = alpha;
        ctx!.drawImage(
          sprite,
          p.x - drawSize / 2,
          p.y - drawSize / 2,
          drawSize,
          drawSize
        );
      }

      ctx!.globalAlpha = 1;
    }

    // ------------------------------------------------------------------
    //  Pointer handling
    // ------------------------------------------------------------------
    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // CSS-var-driven parallax for the slogan.
      const nx = mouse.x / width - 0.5;
      const ny = mouse.y / height - 0.5;
      section!.style.setProperty("--mx", `${nx * 12}px`);
      section!.style.setProperty("--my", `${ny * 8}px`);
    }
    function onPointerLeave() {
      mouse.active = false;
      section!.style.setProperty("--mx", "0px");
      section!.style.setProperty("--my", "0px");
    }
    function onPointerDown(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      explode(x, y, 16, Math.max(width, height) * 0.9);
    }

    // ------------------------------------------------------------------
    //  Lifecycle
    // ------------------------------------------------------------------
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible) {
          if (!running) {
            running = true;
            raf = requestAnimationFrame(step);
          }
          overlay!.classList.remove("opacity-0", "translate-y-4");
          overlay!.classList.add("opacity-100", "translate-y-0");
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    resize();

    // Initial entrance shockwave from center after a short delay so the
    // animation has a "wake up" moment.
    const initialBurst = window.setTimeout(() => {
      if (!running) return;
      explode(width / 2, height * 0.45, 22, Math.max(width, height) * 1.15);
    }, 650);

    if (reducedMotion) {
      step(0);
      running = false;
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(initialBurst);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      canvas!.removeEventListener("pointermove", onPointerMove);
      canvas!.removeEventListener("pointerleave", onPointerLeave);
      canvas!.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="ClearDesk AI — interactive hero"
      className="relative isolate w-full overflow-hidden border-b border-white/5 bg-black"
      style={{
        // @ts-expect-error – CSS custom properties on inline style.
        "--mx": "0px",
        "--my": "0px",
      }}
    >
      <canvas
        ref={canvasRef}
        className="block h-[100svh] min-h-[640px] w-full cursor-crosshair"
      />

      {/* Overlay — slogan + CTAs */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 translate-y-4 transition-all duration-1000 ease-out"
        style={{ transform: "translate3d(var(--mx), var(--my), 0)" }}
      >
        <div className="container-page text-center">
          <h1 className="font-display font-semibold leading-[1.08] tracking-tightest text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span
              className={`animate-fade-up block sm:whitespace-nowrap transition-all duration-1000 ease-in-out ${
                showFirstLine
                  ? "opacity-100 max-h-[3em] sm:max-h-[1.3em]"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              Stop being the invisible option.
            </span>
            <span className="gradient-text animate-fade-up block sm:whitespace-nowrap" style={{ animationDelay: "0.3s" }}>Start being fully booked.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl animate-fade-up" style={{ animationDelay: "0.5s" }}>
            We build websites that get local businesses found, called, and
            booked — starting at <span className="font-semibold text-brand-400">$75/month</span>.
          </p>

          <div className="pointer-events-auto mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: "0.7s" }}>
            <Button href="/contact" size="lg">
              Book a Free Call
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
            <Button href="/services" variant="secondary" size="lg">
              See Pricing
            </Button>
          </div>
        </div>
      </div>

      {/* Soft black fade at the bottom for clean transition into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"
      />
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  target: number;
  /** Animation duration in ms (default 2000) */
  duration?: number;
  /** Text to render after the number */
  suffix?: string;
  className?: string;
};

export function CountUp({
  target,
  duration = 2000,
  suffix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  // Trigger when element enters the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // Animate from 0 → target using easeOutExpo
  useEffect(() => {
    if (!started) return;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo: fast start, decelerates toward end
      const eased =
        progress >= 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix && <>{suffix}</>}
    </span>
  );
}

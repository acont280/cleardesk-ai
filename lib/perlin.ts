/**
 * Compact 2D Perlin (Ken Perlin's improved noise, 2002).
 * Returns a callable noise(x, y) → [-1, 1].
 *
 * Self-contained — no external deps. ~1 KB minified.
 * Seed-based permutation table makes the noise deterministic per instance.
 */
export type NoiseFn = (x: number, y: number) => number;

export function makePerlin(seed = 1): NoiseFn {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;

  // Fisher–Yates shuffle with a tiny LCG for deterministic seeding.
  let s = seed >>> 0 || 1;
  for (let i = 255; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }

  // Doubled permutation table avoids overflow checks.
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);

  // Gradient: dot of one of 8 unit gradients with (x, y).
  const grad = (hash: number, x: number, y: number) => {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return (h & 1 ? -u : u) + (h & 2 ? -2 * v : 2 * v);
  };

  return (x: number, y: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const A = perm[X] + Y;
    const B = perm[X + 1] + Y;
    return (
      lerp(
        lerp(grad(perm[A], xf, yf), grad(perm[B], xf - 1, yf), u),
        lerp(grad(perm[A + 1], xf, yf - 1), grad(perm[B + 1], xf - 1, yf - 1), u),
        v
      ) * 0.7 // empirical normalization to ~[-1, 1]
    );
  };
}

import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]">
      <div
        className="relative aspect-[16/10] overflow-hidden border-b border-white/10"
        style={{ background: project.gradient }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-grid-dense opacity-30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl font-semibold tracking-tightest text-white/90 sm:text-6xl">
            {project.acronym}
          </span>
        </div>
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-brand-500/30 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-400 backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-white">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>
        {project.outcome && (
          <p className="mt-5 border-t border-white/10 pt-4 text-sm">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-400">
              Result —{" "}
            </span>
            <span className="text-white/70">{project.outcome}</span>
          </p>
        )}
      </div>
    </article>
  );
}

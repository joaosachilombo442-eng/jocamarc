import { Link } from "@tanstack/react-router";
import { ArrowRight, ImageIcon, MapPin, Users } from "lucide-react";

import type { Cooperative } from "@/content/types";
import { cn } from "@/lib/utils";

const TOP = ["border-t-primary", "border-t-accent", "border-t-brand-blue", "border-t-brand-red", "border-t-brand-yellow"];

/** Logo shown on a white tile so the cooperative's original artwork is never recoloured. */
export function CooperativeLogo({ coop, className }: { coop: Cooperative; className?: string }) {
  return (
    <div className={cn("relative grid place-items-center overflow-hidden rounded-xl border bg-background p-3", className)}>
      {coop.logo ? (
        <img
          src={coop.logo.src}
          alt={coop.logo.alt}
          width={coop.logo.width}
          height={coop.logo.height}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-[inherit]"
        />
      ) : (
        <span className="flex flex-col items-center gap-1 text-muted-foreground">
          <ImageIcon className="size-5" aria-hidden />
          <span className="text-[0.65rem] font-semibold uppercase tracking-wider">Logótipo</span>
        </span>
      )}
    </div>
  );
}

export function CooperativeCard({ coop, index }: { coop: Cooperative; index: number }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-t-4 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        TOP[index % TOP.length],
      )}
    >
      <CooperativeLogo coop={coop} className="aspect-[4/3] w-full" />
      <div className="mt-5 flex flex-1 flex-col">
        {coop.kind && (
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{coop.kind}</p>
        )}
        <h3 className="mt-1 text-lg font-bold leading-snug">
          <Link
            to="/cooperativas/$slug"
            params={{ slug: coop.slug }}
            className="after:absolute after:inset-0 group-hover:text-primary"
          >
            {coop.name}
          </Link>
        </h3>
        <dl className="mt-4 space-y-2 text-sm">
          {coop.location && (
            <div className="flex items-start gap-2">
              <dt className="sr-only">Localização</dt>
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <dd className="font-medium">{coop.location}</dd>
            </div>
          )}
          {coop.members && (
            <div className="flex items-start gap-2">
              <dt className="sr-only">Membros</dt>
              <Users className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <dd className="font-medium">{coop.members.total} membros</dd>
            </div>
          )}
        </dl>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
          Ver detalhes <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

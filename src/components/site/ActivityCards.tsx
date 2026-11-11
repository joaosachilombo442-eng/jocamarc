import { MessageCircle } from "lucide-react";

import { site } from "@/config/site";
import { actionAreas, type ActionArea } from "@/content/institutional";
import { cn } from "@/lib/utils";

import { CommunityButtons } from "./CommunityButtons";
import { Reveal } from "./primitives";

const ACCENT: Record<ActionArea["tone"], { bar: string; chip: string; panel: string }> = {
  primary: { bar: "bg-primary", chip: "text-primary", panel: "bg-primary-deep" },
  accent: { bar: "bg-accent", chip: "text-accent", panel: "bg-accent" },
  blue: { bar: "bg-brand-blue", chip: "text-brand-blue", panel: "bg-brand-blue" },
  red: { bar: "bg-brand-red", chip: "text-brand-red", panel: "bg-brand-red" },
};

const CARD =
  "group relative isolate flex aspect-[5/6] flex-col justify-end overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:aspect-[4/5]";

/** Photo-led card for one area of work. Without an original photo it shows an institutional composition. */
export function ActivityCard({ area }: { area: ActionArea }) {
  const a = ACCENT[area.tone];
  return (
    <article className={cn(CARD, "bg-ink")}>
      {area.photo ? (
        <img
          src={area.photo.src}
          alt={area.photo.alt}
          loading="lazy"
          width={area.photo.width}
          height={area.photo.height}
          style={{ objectPosition: area.photo.position }}
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div aria-hidden className={cn("absolute inset-0 -z-10 text-primary-foreground", a.panel)}>
          <div className="placeholder-pattern absolute inset-0 opacity-[0.12]" />
          <area.Icon
            className="absolute -right-10 top-8 size-64 opacity-20 transition-transform duration-700 group-hover:scale-105"
            strokeWidth={1}
          />
        </div>
      )}
      <div className="activity-scrim absolute inset-0 -z-10" aria-hidden />

      <span
        className={cn(
          "absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-background shadow-soft",
          a.chip,
        )}
      >
        <area.Icon className="size-5" />
      </span>
      {!area.photo && (
        <span className="absolute right-5 top-6 rounded-full bg-background/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-foreground backdrop-blur-sm">
          Fotografias a publicar
        </span>
      )}

      <div className="p-6 text-ink-foreground">
        <span className={cn("mb-4 block h-1 w-10 rounded-full transition-all duration-500 group-hover:w-16", a.bar)} />
        <h3 className="text-2xl font-bold leading-tight">{area.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-foreground/85">{area.description}</p>
      </div>
    </article>
  );
}

/** Closing card of the grid: invitation to the WhatsApp community and Facebook. */
function CommunityCard() {
  return (
    <article className={cn(CARD, "justify-between bg-primary-deep p-6 text-ink-foreground")}>
      <div className="placeholder-pattern absolute inset-0 -z-10 opacity-[0.06]" aria-hidden />
      <span className="brand-stripe absolute inset-x-0 top-0 h-1" aria-hidden />
      <span className="grid h-11 w-11 place-items-center rounded-full bg-background text-primary shadow-soft">
        <MessageCircle className="size-5" />
      </span>
      <div>
        <p className="eyebrow mb-3 text-accent">Comunidade</p>
        <h3 className="text-2xl font-bold leading-tight">Acompanhe e participe</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-foreground/85">
          Receba as novidades da {site.shortName} e junte-se aos jovens catadores, parceiros e
          cidadãos que apoiam a economia circular.
        </p>
        <CommunityButtons tone="dark" size="default" stacked className="mt-5" />
      </div>
    </article>
  );
}

export function ActivityGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {actionAreas.map((area, i) => (
        <Reveal as="li" key={area.title} delay={(i % 3) * 80}>
          <ActivityCard area={area} />
        </Reveal>
      ))}
      <Reveal as="li" delay={160}>
        <CommunityCard />
      </Reveal>
    </ul>
  );
}

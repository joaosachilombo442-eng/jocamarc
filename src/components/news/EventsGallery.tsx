import { Calendar, Expand, ImageIcon, MapPin, X } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/site/primitives";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { EventItem } from "@/content/types";
import { formatOptionalDate } from "@/lib/format";

/** Flyer gallery: each event shows its original flyer, which opens enlarged. Empty slots wait for new flyers. */
export function EventsGallery({ events, slots }: { events: EventItem[]; slots: number }) {
  const [open, setOpen] = useState<EventItem | null>(null);
  const empty = Math.max(0, slots - events.length);

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {events.map((ev, i) => (
          <Reveal as="li" key={ev.id} delay={(i % 2) * 80} className={i === 0 ? "md:col-span-2" : ""}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow hover:shadow-lift">
              {ev.flyer ? (
                <button
                  type="button"
                  onClick={() => setOpen(ev)}
                  className="relative block overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  aria-label={`Ampliar cartaz: ${ev.title}`}
                >
                  <img
                    src={ev.flyer.src}
                    alt={ev.flyer.alt}
                    width={ev.flyer.width}
                    height={ev.flyer.height}
                    loading="lazy"
                    className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-semibold text-ink-foreground">
                    <Expand className="size-3.5" /> Ampliar
                  </span>
                </button>
              ) : null}
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-4 text-accent" />
                    <time dateTime={ev.date ?? undefined}>{formatOptionalDate(ev.date)}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-accent" /> {ev.location ?? "Local a confirmar"}
                  </span>
                </p>
                <h3 className="font-display text-2xl font-bold leading-snug">{ev.title}</h3>
                {ev.description && <p className="mt-3 leading-relaxed text-muted-foreground">{ev.description}</p>}
                {ev.highlights.length > 0 && (
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {ev.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
        {Array.from({ length: empty }, (_, i) => (
          <li
            key={`slot-${i}`}
            className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-muted/40 p-8 text-center text-muted-foreground"
          >
            <ImageIcon className="size-6" aria-hidden />
            <p className="font-display text-base font-semibold text-foreground">Espaço para cartaz de evento</p>
            <p className="max-w-xs text-sm">Os próximos cartazes da AJOCAMARC serão publicados aqui.</p>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-6xl border-none bg-ink p-0 text-ink-foreground sm:rounded-2xl [&>button]:hidden">
          {open?.flyer && (
            <div className="relative">
              <img src={open.flyer.src} alt={open.flyer.alt} className="max-h-[80vh] w-full rounded-t-2xl object-contain" />
              <button
                onClick={() => setOpen(null)}
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink/80 hover:bg-ink"
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
              <div className="p-5">
                <DialogTitle className="font-display text-lg">{open.title}</DialogTitle>
                <DialogDescription className="text-sm text-ink-muted">
                  {formatOptionalDate(open.date)} · {open.location ?? "Local a confirmar"}
                </DialogDescription>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

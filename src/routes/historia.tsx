import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader, PendingContent, Reveal } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { photos } from "@/content/media";
import { timeline } from "@/content/institutional";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "História da AJOCAMARC — De Cacuaco (2020) à constituição em 2021" },
      {
        name: "description",
        content:
          "A história da AJOCAMARC: a iniciativa iniciada em Cacuaco em 2020, a constituição da associação e das cinco cooperativas em 2021.",
      },
      { property: "og:title", content: "História da AJOCAMARC" },
      {
        property: "og:description",
        content: "Da iniciativa em Cacuaco, em 2020, à constituição da associação e das cinco cooperativas em 2021.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HistoryPage,
});

const dotTone = ["bg-primary", "bg-accent", "bg-brand-blue", "bg-muted-foreground"];

function HistoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quem somos"
        title="História da AJOCAMARC"
        description={`Da iniciativa de jovens catadores em ${site.origin.place}, em ${site.origin.year}, à constituição da associação e das suas cinco cooperativas, em ${site.foundedYear}.`}
        crumbs={[{ label: "História" }]}
        image={photos.camiao}
      />

      <section className="container-site grid gap-12 py-20 md:py-24 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3">Origem</p>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Começou em {site.origin.place}
          </h2>
          <p className="prose-site mt-5 text-muted-foreground">
            A iniciativa que deu origem à {site.shortName} teve início em {site.origin.year}, em{" "}
            {site.origin.place}. A associação só viria a ser formalmente constituída em{" "}
            {site.foundedYear} — o mesmo ano em que foram constituídas as cinco cooperativas de
            catadores.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary-deep">
            <MapPin className="size-4" /> {site.origin.place}, Luanda — {site.country}
          </p>
        </Reveal>

        <ol className="relative space-y-10 border-l-2 border-border pl-8 md:pl-12">
          {timeline.map((ev, i) => (
            <Reveal as="li" key={`${ev.year}-${ev.title}`} delay={i * 80} className="relative">
              <span
                className={cn(
                  "absolute -left-[2.6rem] top-1 grid h-5 w-5 place-items-center rounded-full ring-4 ring-background md:-left-[3.6rem]",
                  dotTone[i] ?? "bg-muted-foreground",
                )}
                aria-hidden
              />
              <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-accent">
                {ev.year}
              </p>
              <h3 className="mt-1 text-2xl font-bold">{ev.title}</h3>
              {ev.confirmed && ev.description ? (
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{ev.description}</p>
              ) : (
                <PendingContent
                  className="mt-4"
                  hint="Os acontecimentos e datas posteriores serão acrescentados com base no documento institucional sobre a história da associação."
                />
              )}
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-secondary py-16">
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Conheça as nossas cooperativas</h2>
            <p className="mt-2 text-muted-foreground">
              As cinco cooperativas constituídas em {site.foundedYear} são a base do nosso trabalho.
            </p>
          </div>
          <Button asChild variant="brand" size="lg">
            <Link to="/cooperativas-parceiros">
              Cooperativas e parceiros <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

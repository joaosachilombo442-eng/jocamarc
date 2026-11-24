import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, MapPin, Quote } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PartnerSlots } from "@/components/site/PartnerSlots";
import { PageHeader, PendingContent, Reveal, SectionHeading } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { partnersQuery } from "@/content/api";
import { missionVisionValues, timeline } from "@/content/institutional";
import { photos } from "@/content/media";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sobre-nos")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — AJOCAMARC | Associação dos Jovens Catadores" },
      {
        name: "description",
        content:
          "Conheça a AJOCAMARC, a sua história, missão, liderança e rede de cooperativas de catadores de materiais recicláveis em Angola.",
      },
      { property: "og:title", content: "Sobre Nós — AJOCAMARC" },
      {
        property: "og:description",
        content: "História, missão, liderança e rede de cooperativas da AJOCAMARC em Angola.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(partnersQuery()),
  component: AboutPage,
});

const dotTone = ["bg-primary", "bg-accent", "bg-brand-blue", "bg-muted-foreground"];

function AboutPage() {
  const { data: partners } = useSuspenseQuery(partnersQuery());

  return (
    <>
      <PageHeader
        eyebrow="Quem somos"
        title="Sobre Nós"
        description={`A ${site.fullName}: da iniciativa de jovens catadores em ${site.origin.place}, em ${site.origin.year}, à organização e representação de cooperativas em Angola.`}
        crumbs={[{ label: "Sobre Nós" }]}
        image={{ ...photos.camiao, position: "50% 40%" }}
      />

      <section className="container-site grid gap-10 py-20 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow mb-3">A associação</p>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">{site.shortName}</h2>
          <p className="mt-2 text-lg font-medium text-muted-foreground">{site.fullName}</p>
          <p className="prose-site mt-6 text-muted-foreground">
            Nascida de uma iniciativa em {site.origin.place}, em {site.origin.year}, a {site.shortName}{" "}
            foi constituída como associação em {site.foundedYear}. A associação indica uma rede de{" "}
            {site.cooperativesAssociated} cooperativas associadas. A listagem pública disponível neste website é apresentada progressivamente e ainda não representa necessariamente a totalidade dessa rede.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="lg">
              <Link to="/missao-visao-valores">Missão, visão e valores</Link>
            </Button>
            <Button asChild variant="outline-brand" size="lg">
              <Link to="/cooperativas">Cooperativas integradas</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <figure className="relative rounded-2xl bg-primary-deep p-8 text-primary-foreground shadow-lift md:p-10">
            <span className="brand-stripe absolute inset-x-0 top-0 h-1 rounded-t-2xl" aria-hidden />
            <Quote className="size-8 text-accent" aria-hidden />
            <p className="eyebrow mt-4 text-accent">A nossa missão</p>
            <blockquote className="mt-3 font-display text-xl leading-relaxed md:text-2xl">
              {missionVisionValues.mission}
            </blockquote>
          </figure>
        </Reveal>
      </section>

      <section id="presidencia" className="border-y bg-card py-16 md:py-20">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow mb-3">Liderança institucional</p>
            <div className="grid gap-6 rounded-2xl border bg-background p-7 shadow-soft md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-10">
              <div>
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">Presidência da AJOCAMARC</h2>
                <p className="mt-4 font-display text-2xl font-bold text-primary md:text-3xl">Manuel Lourenço Salvador</p>
                <p className="mt-2 text-base font-medium text-muted-foreground">Presidente da Associação dos Jovens Catadores de Materiais Recicláveis de Angola</p>
              </div>
              <span className="inline-flex w-fit items-center rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary-deep">
                Presidência
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t bg-secondary">
        <div className="container-site grid gap-12 py-20 md:py-24 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-3">História</p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">Começou em {site.origin.place}</h2>
            <p className="prose-site mt-5 text-muted-foreground">
              A iniciativa que deu origem à {site.shortName} teve início em {site.origin.year}, em{" "}
              {site.origin.place}. A associação só viria a ser formalmente constituída em{" "}
              {site.foundedYear} — o mesmo ano em que foram constituídas as cinco primeiras cooperativas
              de catadores.
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
                    "absolute -left-[2.6rem] top-1 grid h-5 w-5 place-items-center rounded-full ring-4 ring-secondary md:-left-[3.6rem]",
                    dotTone[i] ?? "bg-muted-foreground",
                  )}
                  aria-hidden
                />
                <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-accent">{ev.year}</p>
                <h3 className="mt-1 text-2xl font-bold">{ev.title}</h3>
                {ev.confirmed && ev.description ? (
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{ev.description}</p>
                ) : (
                  <PendingContent
                    className="mt-4 bg-card"
                    hint="Os acontecimentos e datas posteriores serão acrescentados com base no documento institucional sobre a história da associação."
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border bg-card p-8 shadow-soft md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-display text-5xl font-extrabold text-primary">{site.cooperativesAssociated}</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Cooperativas associadas</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Total indicado pela associação. A listagem pública está a ser actualizada progressivamente e não representa ainda, necessariamente, todas as cooperativas da rede.
            </p>
          </div>
          <Button asChild variant="cta" size="lg">
            <Link to="/cooperativas">
              Ver cooperativas <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section id="parceiros" className="scroll-mt-28 bg-secondary py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Parceiros e instituições"
            title="Quem colabora connosco"
            description="Espaço reservado para os logótipos e a apresentação das instituições parceiras."
          />
          {partners.length === 0 && (
            <PendingContent
              className="mb-8 bg-card"
              hint="Nenhum parceiro foi ainda publicado. Os nomes e logótipos serão adicionados apenas após confirmação das parcerias pela AJOCAMARC."
            />
          )}
          <PartnerSlots partners={partners} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

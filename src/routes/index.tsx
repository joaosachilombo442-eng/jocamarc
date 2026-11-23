import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

import { FeaturedNews, NewsCard } from "@/components/news/NewsCard";
import { ActivityGrid } from "@/components/site/ActivityCards";
import { PartnerSlots } from "@/components/site/PartnerSlots";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { CooperativeLogo } from "@/components/site/CooperativeCard";
import {
  cooperativesQuery,
  latestNewsQuery,
  newsCategoriesQuery,
  partnersQuery,
} from "@/content/api";
import { photos } from "@/content/media";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AJOCAMARC — Jovens Catadores de Angola, Juntos pela Economia Circular" },
      {
        name: "description",
        content:
          "Associação dos Jovens Catadores de Materiais Recicláveis de Angola. Organização e representação dos catadores de materiais recicláveis em Angola.",
      },
      { property: "og:title", content: "AJOCAMARC — Juntos pela Economia Circular" },
      {
        property: "og:description",
        content: "Associação dos Jovens Catadores de Materiais Recicláveis de Angola.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(latestNewsQuery(3)),
      queryClient.ensureQueryData(partnersQuery()),
      queryClient.ensureQueryData(cooperativesQuery()),
    ]),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Areas />
      <CooperativesPreview />
      <NewsPreview />
      <Partners />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img
        src={photos.triagemCartao.src}
        alt={photos.triagemCartao.alt}
        width={photos.triagemCartao.width}
        height={photos.triagemCartao.height}
        fetchPriority="high"
        style={{ objectPosition: photos.triagemCartao.position }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
      <div className="container-site flex min-h-[78vh] flex-col justify-center py-20 text-ink-foreground md:min-h-[86vh]">
        <p className="mb-5 inline-flex w-fit animate-fade-up items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-foreground">
          {site.tagline}
        </p>
        <h1 className="max-w-3xl animate-fade-up text-4xl font-extrabold leading-[1.02] [animation-delay:80ms] sm:text-5xl md:text-7xl">
          Catadores de materiais recicláveis a transformar resíduos em valor
        </h1>
        <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink-foreground/85 [animation-delay:160ms] md:text-xl">
          A {site.shortName} — {site.fullName} — trabalha pela organização e representação dos
          catadores e pela valorização dos materiais recicláveis em Angola.
        </p>
        <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
          <Button asChild variant="cta" size="lg">
            <Link to="/cooperativas" search={{ q: undefined, local: undefined }}>
              Conheça a nossa rede
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline-light" size="lg">
            <Link to="/noticias">Acompanhe a AJOCAMARC</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
      <Reveal className="relative">
        <img
          src={photos.catadoresContentor.src}
          alt={photos.catadoresContentor.alt}
          loading="lazy"
          width={photos.catadoresContentor.width}
          height={photos.catadoresContentor.height}
          style={{ objectPosition: photos.catadoresContentor.position }}
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift"
        />
        <div className="absolute -bottom-6 -right-2 hidden rounded-xl bg-background p-5 shadow-lift sm:block md:-right-6">
          <p className="font-display text-4xl font-extrabold text-primary">{site.origin.year}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" /> Origem em {site.origin.place}
          </p>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <p className="eyebrow mb-3">Quem somos</p>
        <h2 className="text-3xl font-bold leading-tight md:text-5xl">
          Uma associação de representação dos catadores
        </h2>
        <div className="prose-site mt-6 text-muted-foreground">
          <p>
            A {site.fullName} é uma organização dedicada à representação, valorização e
            fortalecimento dos catadores de materiais recicláveis, promovendo o reconhecimento
            do seu trabalho e a sua participação na economia circular.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg">
            <Link to="/sobre-nos">Sobre nós</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function Areas() {
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHeading
        eyebrow="Áreas de actuação"
        title="Onde concentramos o nosso trabalho"
        description="Da recolha nas ruas à organização em cooperativas, o trabalho dos jovens catadores contribui para cidades mais limpas e para uma economia mais circular."
      />
      <ActivityGrid />
    </section>
  );
}

function CooperativesPreview() {
  const { data: coops } = useSuspenseQuery(cooperativesQuery());
  return (
    <section className="border-y bg-secondary py-20 md:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Cooperativas integradas"
          title="Conheça as cooperativas da nossa rede"
          description="Conheça as cooperativas de catadores que integram a AJOCAMARC, apresentadas progressivamente."
          action={
            <Button asChild variant="outline-brand">
              <Link to="/cooperativas" search={{ q: undefined, local: undefined }}>
                Ver cooperativas <ArrowRight />
              </Link>
            </Button>
          }
        />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {coops.slice(0, 8).map((c, i) => (
            <Reveal as="li" key={c.id} delay={(i % 4) * 50}>
              <Link
                to="/cooperativas/$slug"
                params={{ slug: c.slug }}
                className="group block rounded-2xl bg-card p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <CooperativeLogo coop={c} className="aspect-[4/3] w-full border-none" />
                <p className="mt-3 truncate px-1 text-center text-sm font-semibold group-hover:text-primary">{c.name}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function NewsPreview() {
  const { data: latest } = useSuspenseQuery(latestNewsQuery(4));
  const { data: categories } = useSuspenseQuery(newsCategoriesQuery());
  const [lead, ...rest] = latest;
  if (!lead) return null;
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHeading
        eyebrow="Notícias e eventos"
        title="Últimas da AJOCAMARC"
        action={
          <Button asChild variant="outline-brand">
            <Link to="/noticias">
              Todas as notícias <ArrowRight />
            </Link>
          </Button>
        }
      />
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <FeaturedNews article={lead} categories={categories} />
        </Reveal>
        <Reveal delay={100} className="flex flex-col divide-y rounded-2xl border bg-card p-6">
          {rest.map((a) => (
            <div key={a.id} className="py-5 first:pt-0 last:pb-0">
              <NewsCard article={a} categories={categories} variant="compact" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Partners() {
  const { data: partners } = useSuspenseQuery(partnersQuery());
  // Do not render empty logo slots on the homepage: the section appears only
  // when AJOCAMARC has confirmed partner records to display.
  if (partners.length === 0) return null;

  return (
    <section className="container-site pt-20 md:pt-28">
      <SectionHeading
        eyebrow="Parceiros e instituições"
        title="Quem caminha connosco"
        description={
          partners.length === 0
            ? "Os parceiros e instituições que colaboram com a AJOCAMARC serão apresentados aqui após confirmação."
            : undefined
        }
        action={
          <Button asChild variant="outline-brand">
            <Link to="/sobre-nos" hash="parceiros">
              Saber mais <ArrowRight />
            </Link>
          </Button>
        }
      />
      <PartnerSlots partners={partners} />
    </section>
  );
}

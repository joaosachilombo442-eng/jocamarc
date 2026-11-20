import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { FeaturedNews, NewsCard } from "@/components/news/NewsCard";
import { CtaBand } from "@/components/site/CtaBand";
import { ActivityGrid } from "@/components/site/ActivityCards";
import { MediaPlaceholder, type PlaceholderTone } from "@/components/site/MediaPlaceholder";
import { PartnerSlots } from "@/components/site/PartnerSlots";
import { DemoBadge, Reveal, SectionHeading } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { CooperativeLogo } from "@/components/site/CooperativeCard";
import {
  albumsQuery,
  cooperativesQuery,
  latestNewsQuery,
  newsCategoriesQuery,
  partnersQuery,
  projectsQuery,
} from "@/content/api";
import { photos } from "@/content/media";
import { iconForArea, missionVisionValues } from "@/content/institutional";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AJOCAMARC — Jovens Catadores de Angola, Juntos pela Economia Circular" },
      {
        name: "description",
        content:
          "Associação dos Jovens Catadores de Materiais Recicláveis de Angola. Nascida em Cacuaco em 2020, constituída em 2021 e hoje com 150 cooperativas associadas.",
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
      queryClient.ensureQueryData(latestNewsQuery(4)),
      queryClient.ensureQueryData(newsCategoriesQuery()),
      queryClient.ensureQueryData(projectsQuery()),
      queryClient.ensureQueryData(albumsQuery()),
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
      <Indicators />
      <Areas />
      <CooperativesPreview />
      <ProjectsPreview />
      <NewsPreview />
      <PortfolioPreview />
      <Partners />
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img
        src={photos.grupoRua.src}
        alt={photos.grupoRua.alt}
        width={photos.grupoRua.width}
        height={photos.grupoRua.height}
        fetchPriority="high"
        style={{ objectPosition: photos.grupoRua.position }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
      <div className="container-site flex min-h-[78vh] flex-col justify-center py-20 text-ink-foreground md:min-h-[86vh]">
        <p className="mb-5 inline-flex w-fit animate-fade-up items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-foreground">
          {site.tagline}
        </p>
        <h1 className="max-w-3xl animate-fade-up text-4xl font-extrabold leading-[1.02] [animation-delay:80ms] sm:text-5xl md:text-7xl">
          Jovens catadores a transformar resíduos em futuro
        </h1>
        <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink-foreground/85 [animation-delay:160ms] md:text-xl">
          A {site.shortName} — {site.fullName} — reúne jovens que fazem da recolha de materiais
          recicláveis um trabalho digno e um contributo para a economia circular em Angola.
        </p>
        <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
          <Button asChild variant="cta" size="lg">
            <Link to="/sobre-nos">
              Conheça a AJOCAMARC
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline-light" size="lg">
            <Link to="/actividades">As nossas actividades</Link>
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
          Uma associação feita por jovens catadores
        </h2>
        <div className="prose-site mt-6 text-muted-foreground">
          <p>
            A {site.shortName} nasceu de uma iniciativa iniciada em {site.origin.place}, em{" "}
            {site.origin.year}, e foi constituída como associação em {site.foundedYear}, ano em que
            foram também constituídas as suas cinco primeiras cooperativas. Hoje conta com{" "}
            {site.cooperativesAssociated} cooperativas associadas.
          </p>
        </div>
        <figure className="mt-6 border-l-4 border-accent pl-5">
          <figcaption className="eyebrow mb-2">A nossa missão</figcaption>
          <blockquote className="font-display text-lg leading-relaxed text-foreground">
            {missionVisionValues.mission}
          </blockquote>
        </figure>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg">
            <Link to="/sobre-nos">Sobre nós</Link>
          </Button>
          <Button asChild variant="outline-brand" size="lg">
            <Link to="/missao-visao-valores">Missão, visão e valores</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function Indicators() {
  const items = [
    { value: String(site.origin.year), label: "Início da iniciativa", detail: `Em ${site.origin.place}` },
    { value: String(site.foundedYear), label: "Constituição da associação", detail: site.shortName },
    { value: String(site.cooperativesFounded), label: "Primeiras cooperativas", detail: `Constituídas em ${site.foundedYear}` },
    { value: String(site.cooperativesAssociated), label: "Cooperativas associadas", detail: "Rede actual" },
  ];
  const tones = ["text-primary", "text-accent", "text-brand-blue", "text-brand-red"];
  return (
    <section aria-labelledby="indicadores" className="border-y bg-secondary">
      <div className="container-site py-14">
        <h2 id="indicadores" className="sr-only">
          Indicadores institucionais
        </h2>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal as="li" key={it.label} delay={i * 80} className="border-l-4 border-border pl-6">
              <p className={`font-display text-5xl font-extrabold md:text-6xl ${tones[i]}`}>{it.value}</p>
              <p className="mt-2 text-base font-semibold text-foreground">{it.label}</p>
              <p className="text-sm text-muted-foreground">{it.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
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
          title={`Uma rede de ${site.cooperativesAssociated} cooperativas associadas`}
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

const PROJECT_TONES: PlaceholderTone[] = ["primary", "accent", "blue"];

function ProjectsPreview() {
  const { data: projects } = useSuspenseQuery(projectsQuery());
  const items = projects.slice(0, 3);
  return (
    <section className="bg-primary-soft py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Actividades e projectos"
          title="Iniciativas em destaque"
          action={
            <Button asChild variant="outline-brand">
              <Link to="/actividades">
                Ver todas <ArrowRight />
              </Link>
            </Button>
          }
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 80}>
              <Link
                to="/actividades"
                hash={p.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div className="aspect-[16/9] overflow-hidden bg-secondary">
                  {p.images[0] ? (
                    <img
                      src={p.images[0].src}
                      alt={p.images[0].alt}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <MediaPlaceholder label={p.area} Icon={iconForArea(p.area)} tone={PROJECT_TONES[i % PROJECT_TONES.length] ?? "primary"} />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.area}</span>
                    {p.isDemo && <DemoBadge />}
                  </div>
                  <h3 className="text-xl font-semibold leading-snug transition-colors group-hover:text-primary">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
                    Ver iniciativa
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
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

function PortfolioPreview() {
  const { data: albums } = useSuspenseQuery(albumsQuery());
  const all = albums.flatMap((a) => a.photos.map((p) => ({ ...p, album: a })));
  const firstOfEach = albums.flatMap((a) => (a.photos[0] ? [{ ...a.photos[0], album: a }] : []));
  const picks = [...firstOfEach, ...all.filter((p) => !firstOfEach.some((f) => f.id === p.id))].slice(0, 5);
  return (
    <section className="bg-ink py-20 text-ink-foreground md:py-28">
      <div className="container-site">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3 text-accent">Portfólio</p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">O nosso trabalho em imagens</h2>
          </div>
          <Button asChild variant="outline-light">
            <Link to="/portfolio">
              Abrir galeria <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4">
          {picks.map((p, i) => (
            <Link
              key={p.id}
              to="/portfolio"
              className={`group relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                width={p.width}
                height={p.height}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="card-scrim absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                {p.album.title}
              </span>
            </Link>
          ))}
        </div>
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

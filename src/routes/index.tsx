import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, MapPin } from "lucide-react";

import heroImage from "@/assets/photo-catadores-triagem.jpg";
import { CategoryTag, FeaturedNews, NewsCard } from "@/components/news/NewsCard";
import { CtaBand } from "@/components/site/CtaBand";
import { PartnerSlots } from "@/components/site/PartnerSlots";
import { DemoBadge, Reveal, SectionHeading } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import {
  albumsQuery,
  latestNewsQuery,
  newsCategoriesQuery,
  partnersQuery,
  projectsQuery,
} from "@/content/api";
import { images } from "@/content/demo-data";
import { actionAreas, toneClasses } from "@/content/institutional";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AJOCAMARC — Jovens Catadores de Angola, Juntos pela Economia Circular" },
      {
        name: "description",
        content:
          "Associação dos Jovens Catadores de Materiais Recicláveis de Angola. Nascida em Cacuaco em 2020 e constituída em 2021, com cinco cooperativas.",
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
        src={heroImage}
        alt="Jovens catadores separam garrafas de plástico num ponto de recolha ao fim da tarde"
        width={1600}
        height={907}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[65%_center]"
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
            <Link to="/historia">
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
          src={images.reuniao}
          alt="Jovens reunidos numa reunião de cooperativa"
          loading="lazy"
          width={1600}
          height={1072}
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
            foram também constituídas as suas cinco cooperativas.
          </p>
          <p>
            O nosso trabalho une responsabilidade ambiental, inclusão social e juventude, com o
            objectivo de afirmar os catadores de materiais recicláveis como parte essencial da
            economia circular angolana.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg">
            <Link to="/historia">A nossa história</Link>
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
    { value: String(site.cooperativesFounded), label: "Cooperativas constituídas", detail: `Em ${site.foundedYear}` },
  ];
  const tones = ["text-primary", "text-accent", "text-brand-blue"];
  return (
    <section aria-labelledby="indicadores" className="border-y bg-secondary">
      <div className="container-site py-14">
        <h2 id="indicadores" className="sr-only">
          Indicadores institucionais
        </h2>
        <ul className="grid gap-10 sm:grid-cols-3">
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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {actionAreas.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 70}>
            <div className="group relative h-full overflow-hidden rounded-xl border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span className={`absolute inset-x-0 top-0 h-1 ${toneClasses[a.tone].solid}`} aria-hidden />
              <span className={`mb-6 grid h-12 w-12 place-items-center rounded-lg ${toneClasses[a.tone].soft}`}>
                <a.Icon className="size-6" />
              </span>
              <h3 className="text-xl font-semibold">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

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
                className="group block h-full overflow-hidden rounded-xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.images[0]?.src}
                    alt={p.images[0]?.alt ?? ""}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.area}</span>
                    {p.isDemo && <DemoBadge />}
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
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
        eyebrow="Notícias e actualidade"
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
  const photos = albums.flatMap((a) => a.photos.map((p) => ({ ...p, album: a }))).slice(0, 5);
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
          {photos.map((p, i) => (
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
            <Link to="/cooperativas-parceiros">
              Cooperativas e parceiros <ArrowRight />
            </Link>
          </Button>
        }
      />
      <PartnerSlots partners={partners} />
    </section>
  );
}

// Exported for reuse by tests and other routes.
export { CategoryTag, formatDate };

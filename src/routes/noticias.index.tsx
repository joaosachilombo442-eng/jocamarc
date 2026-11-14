import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Archive, CalendarDays, ChevronLeft, ChevronRight, Newspaper, Search, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { EventsGallery } from "@/components/news/EventsGallery";
import { FeaturedNews, NewsCard } from "@/components/news/NewsCard";
import { PendingContent, Reveal, SectionHeading } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  eventsQuery,
  featuredNewsQuery,
  latestNewsQuery,
  newsArchiveQuery,
  newsCategoriesQuery,
  newsListQuery,
} from "@/content/api";
import { INITIAL_EVENT_SLOTS } from "@/content/events";
import { formatMonth } from "@/lib/format";
import { cn } from "@/lib/utils";

type NewsSearch = {
  q?: string | undefined;
  categoria?: string | undefined;
  mes?: string | undefined;
  pagina?: number | undefined;
};

export const Route = createFileRoute("/noticias/")({
  validateSearch: (search: Record<string, unknown>): NewsSearch => {
    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
    const page = Number(search["pagina"]);
    return {
      q: str(search["q"]),
      categoria: str(search["categoria"]),
      mes: typeof search["mes"] === "string" && /^\d{4}-\d{2}$/.test(search["mes"]) ? search["mes"] : undefined,
      pagina: Number.isFinite(page) && page > 1 ? Math.floor(page) : undefined,
    };
  },
  loaderDeps: ({ search }) => search,
  loader: ({ context: { queryClient }, deps }) =>
    Promise.all([
      queryClient.ensureQueryData(
        newsListQuery({ q: deps.q, category: deps.categoria, month: deps.mes, page: deps.pagina }),
      ),
      queryClient.ensureQueryData(featuredNewsQuery()),
      queryClient.ensureQueryData(latestNewsQuery(4)),
      queryClient.ensureQueryData(newsCategoriesQuery()),
      queryClient.ensureQueryData(newsArchiveQuery()),
      queryClient.ensureQueryData(eventsQuery()),
    ]),
  head: () => ({
    meta: [
      { title: "Notícias e Eventos — AJOCAMARC" },
      {
        name: "description",
        content: "Notícias da AJOCAMARC e cartazes dos eventos em que a associação participa, com data, local e descrição.",
      },
      { property: "og:title", content: "Notícias e Eventos — AJOCAMARC" },
      { property: "og:description", content: "Notícias e eventos da AJOCAMARC e das cooperativas de catadores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/noticias/" });
  const { data: result } = useSuspenseQuery(
    newsListQuery({ q: search.q, category: search.categoria, month: search.mes, page: search["pagina"] }),
  );
  const { data: featured } = useSuspenseQuery(featuredNewsQuery());
  const { data: latest } = useSuspenseQuery(latestNewsQuery(4));
  const { data: categories } = useSuspenseQuery(newsCategoriesQuery());
  const { data: archive } = useSuspenseQuery(newsArchiveQuery());
  const { data: events } = useSuspenseQuery(eventsQuery());

  const [query, setQuery] = useState(search["q"] ?? "");
  useEffect(() => setQuery(search["q"] ?? ""), [search.q]);

  const filtering = Boolean(search["q"] || search["categoria"] || search["mes"]);
  const showLead = !filtering && (search["pagina"] ?? 1) === 1 && featured;
  const sideLatest = latest.filter((n) => n.id !== featured?.id).slice(0, 3);
  const hasPending = latest.some((n) => n.pending);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({ search: (prev) => ({ ...prev, q: query.trim() || undefined, pagina: undefined }) });
  };

  const activeCategory = categories.find((c) => c.slug === search["categoria"]);

  return (
    <>
      {/* Editorial masthead */}
      <section className="border-b">
        <div className="container-site py-10 md:py-14">
          <nav aria-label="Localização" className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Notícias e Eventos</span>
          </nav>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3">Sala de imprensa</p>
              <h1 className="text-4xl font-extrabold leading-none md:text-7xl">
                Notícias <span className="text-primary">&amp;</span> Eventos
              </h1>
              <nav aria-label="Secções da página" className="mt-6 flex gap-2">
                <a href="#noticias" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep">
                  <Newspaper className="size-4" /> Notícias
                </a>
                <a href="#eventos" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:border-foreground/50">
                  <CalendarDays className="size-4" /> Eventos
                </a>
              </nav>
            </div>
            <form onSubmit={onSearch} role="search" className="relative w-full md:w-96">
              <label htmlFor="news-search" className="sr-only">
                Pesquisar notícias
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="news-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar notícias…"
                className="h-12 rounded-full pl-11 pr-24"
              />
              <Button type="submit" variant="brand" size="sm" className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-full px-4">
                Pesquisar
              </Button>
            </form>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categorias">
            <CategoryChip active={!search.categoria} label="Todas" categoria={undefined} />
            {categories.map((c) => (
              <CategoryChip key={c.slug} active={search["categoria"] === c.slug} label={c.name} categoria={c.slug} />
            ))}
          </div>
        </div>
      </section>

      <div id="noticias" className="container-site scroll-mt-28 py-10 md:py-14">
        {hasPending && (
          <PendingContent
            className="mb-10"
            hint="As notícias marcadas “Texto a publicar” já têm o tema confirmado. O texto completo, a data e a fotografia serão publicados assim que forem enviados pela AJOCAMARC."
          />
        )}

        {showLead && featured && (
          <section aria-label="Notícia em destaque" className="mb-16 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            <Reveal>
              <FeaturedNews article={featured} categories={categories} />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mb-5 border-b-2 border-foreground pb-3 font-display text-sm font-bold uppercase tracking-[0.14em]">
                Mais recentes
              </h2>
              <div className="divide-y">
                {sideLatest.map((a) => (
                  <div key={a.id} className="py-5 first:pt-0">
                    <NewsCard article={a} categories={categories} variant="compact" />
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        <div className="grid gap-12 lg:grid-cols-[1fr_17rem]">
          <section aria-labelledby="lista-noticias">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b-2 border-foreground pb-3">
              <h2 id="lista-noticias" className="font-display text-sm font-bold uppercase tracking-[0.14em]">
                {filtering ? "Resultados" : "Todas as notícias"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {result.total} {result.total === 1 ? "notícia" : "notícias"}
              </p>
            </div>

            {filtering && (
              <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
                {search["q"] && <FilterPill label={`“${search.q}”`} clear={{ q: undefined }} />}
                {activeCategory && <FilterPill label={activeCategory.name} clear={{ categoria: undefined }} />}
                {search["mes"] && <FilterPill label={formatMonth(search["mes"])} clear={{ mes: undefined }} />}
              </div>
            )}

            {result.items.length === 0 ? (
              <div className="rounded-xl border border-dashed p-12 text-center">
                <p className="font-display text-xl font-semibold">Nenhuma notícia encontrada</p>
                <p className="mt-2 text-muted-foreground">Experimente outra pesquisa ou categoria.</p>
                <Button asChild variant="outline-brand" className="mt-6">
                  <Link to="/noticias">Limpar filtros</Link>
                </Button>
              </div>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2">
                {result.items.map((a, i) => (
                  <Reveal as="li" key={a.id} delay={(i % 2) * 60}>
                    <NewsCard article={a} categories={categories} />
                  </Reveal>
                ))}
              </ul>
            )}

            {result.pageCount > 1 && <Pager page={result.page} pageCount={result.pageCount} />}
          </section>

          <aside className="space-y-10">
            <div>
              <h2 className="mb-4 flex items-center gap-2 border-b-2 border-foreground pb-3 font-display text-sm font-bold uppercase tracking-[0.14em]">
                <Archive className="size-4" /> Arquivo
              </h2>
              {archive.length === 0 && (
                <p className="text-sm text-muted-foreground">O arquivo mensal aparece quando as notícias tiverem data publicada.</p>
              )}
              <ul className="space-y-1">
                {archive.map((m) => (
                  <li key={m.month}>
                    <Link
                      to="/noticias"
                      search={(prev) => ({ ...prev, mes: prev.mes === m.month ? undefined : m.month, pagina: undefined })}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                        search["mes"] === m.month && "bg-primary-soft font-semibold text-primary-deep",
                      )}
                    >
                      <span>{formatMonth(m.month)}</span>
                      <span className="text-xs text-muted-foreground">{m.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <section id="eventos" aria-labelledby="titulo-eventos" className="scroll-mt-28 border-t bg-secondary py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Eventos"
            title={<span id="titulo-eventos">Cartazes e eventos</span>}
            description="Os eventos da AJOCAMARC e aqueles em que a associação participa, com o cartaz original, data, local e descrição. Toque num cartaz para o ver ampliado."
          />
          <EventsGallery events={events} slots={INITIAL_EVENT_SLOTS} />
        </div>
      </section>
    </>
  );
}

function CategoryChip({ active, label, categoria }: { active: boolean; label: string; categoria?: string | undefined }) {
  return (
    <Link
      to="/noticias"
      search={(prev) => ({ ...prev, categoria, pagina: undefined })}
      role="tab"
      aria-selected={active}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-foreground hover:border-foreground/50",
      )}
    >
      {label}
    </Link>
  );
}

function FilterPill({ label, clear }: { label: string; clear: Partial<NewsSearch> }) {
  return (
    <Link
      to="/noticias"
      search={(prev) => ({ ...prev, ...clear, pagina: undefined })}
      className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-medium hover:bg-border"
      aria-label={`Remover filtro ${label}`}
    >
      {label}
      <X className="size-3.5" />
    </Link>
  );
}

function Pager({ page, pageCount }: { page: number; pageCount: number }) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const linkClass =
    "grid h-10 min-w-10 place-items-center rounded-lg border px-3 text-sm font-medium transition-colors hover:border-primary";
  return (
    <nav aria-label="Paginação" className="mt-12 flex items-center justify-center gap-2">
      <Link
        to="/noticias"
        search={(prev) => ({ ...prev, pagina: page - 1 > 1 ? page - 1 : undefined })}
        disabled={page <= 1}
        aria-label="Página anterior"
        className={cn(linkClass, page <= 1 && "pointer-events-none opacity-40")}
      >
        <ChevronLeft className="size-4" />
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          to="/noticias"
          search={(prev) => ({ ...prev, pagina: p > 1 ? p : undefined })}
          aria-current={p === page ? "page" : undefined}
          className={cn(linkClass, p === page && "border-primary bg-primary text-primary-foreground")}
        >
          {p}
        </Link>
      ))}
      <Link
        to="/noticias"
        search={(prev) => ({ ...prev, pagina: page + 1 })}
        disabled={page >= pageCount}
        aria-label="Página seguinte"
        className={cn(linkClass, page >= pageCount && "pointer-events-none opacity-40")}
      >
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}

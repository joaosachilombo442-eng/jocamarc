import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { CooperativeCard } from "@/components/site/CooperativeCard";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader, Reveal } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site } from "@/config/site";
import { cooperativeLocationsQuery, cooperativesQuery, PENDING_LOCATION } from "@/content/api";
import { photos } from "@/content/media";
import { cn } from "@/lib/utils";

type CoopSearch = { q?: string | undefined; local?: string | undefined };

const PAGE_SIZE = 12;

export const Route = createFileRoute("/cooperativas/")({
  validateSearch: (search: Record<string, unknown>): CoopSearch => {
    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
    return { q: str(search["q"]), local: str(search["local"]) };
  },
  loaderDeps: ({ search }) => search,
  loader: ({ context: { queryClient }, deps }) =>
    Promise.all([
      queryClient.ensureQueryData(cooperativesQuery({ q: deps.q, location: deps.local })),
      queryClient.ensureQueryData(cooperativesQuery()),
      queryClient.ensureQueryData(cooperativeLocationsQuery()),
    ]),
  head: () => ({
    meta: [
      { title: "Cooperativas Integradas — Rede de cooperativas da AJOCAMARC" },
      {
        name: "description",
        content:
          "A rede de cooperativas de catadores associadas à AJOCAMARC: logótipos, localização e informação de cada cooperativa, com pesquisa por nome e filtro por localização.",
      },
      { property: "og:title", content: "Cooperativas Integradas — AJOCAMARC" },
      { property: "og:description", content: "Conheça as cooperativas de catadores que integram a rede da AJOCAMARC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CooperativesPage,
});

function CooperativesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/cooperativas/" });
  const { data: items } = useSuspenseQuery(cooperativesQuery({ q: search.q, location: search.local }));
  const { data: all } = useSuspenseQuery(cooperativesQuery());
  const { data: locations } = useSuspenseQuery(cooperativeLocationsQuery());

  const [query, setQuery] = useState(search.q ?? "");
  useEffect(() => setQuery(search.q ?? ""), [search.q]);
  const [shown, setShown] = useState(PAGE_SIZE);
  useEffect(() => setShown(PAGE_SIZE), [search.q, search.local]);

  const hasPendingLocation = all.some((c) => !c.location);
  const filtering = Boolean(search.q || search.local);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({ search: (prev) => ({ ...prev, q: query.trim() || undefined }) });
  };

  const filters = [
    { value: undefined, label: "Todas" },
    ...locations.map((l) => ({ value: l, label: l })),
    ...(hasPendingLocation ? [{ value: PENDING_LOCATION, label: "Localização a confirmar" }] : []),
  ];

  return (
    <>
      <PageHeader
        eyebrow="Rede"
        title="Cooperativas Integradas"
        description={`A ${site.shortName} conta com ${site.cooperativesAssociated} cooperativas associadas. Apresentamos aqui as cooperativas já registadas; as restantes serão acrescentadas progressivamente.`}
        crumbs={[{ label: "Cooperativas Integradas" }]}
        image={{ ...photos.catadoresContentor, position: "50% 45%" }}
      />

      <section aria-label="Números da rede" className="border-b bg-secondary">
        <div className="container-site grid gap-6 py-10 sm:grid-cols-2">
          <div className="border-l-4 border-primary pl-5">
            <p className="font-display text-4xl font-extrabold text-primary md:text-5xl">{site.cooperativesAssociated}</p>
            <p className="mt-1 font-semibold">Cooperativas associadas</p>
          </div>
          <div className="border-l-4 border-accent pl-5">
            <p className="font-display text-4xl font-extrabold text-accent md:text-5xl">{all.length}</p>
            <p className="mt-1 font-semibold">Cooperativas registadas no website</p>
          </div>
        </div>
      </section>

      <section className="container-site py-14 md:py-20">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={onSearch} role="search" className="relative w-full lg:max-w-md">
            <label htmlFor="coop-search" className="sr-only">
              Pesquisar cooperativa pelo nome
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="coop-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar pelo nome…"
              className="h-12 rounded-full pl-11 pr-28"
            />
            <Button type="submit" variant="brand" size="sm" className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-full px-4">
              Pesquisar
            </Button>
          </form>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por localização">
            {filters.map((f) => {
              const active = search.local === f.value;
              return (
                <Link
                  key={f.label}
                  to="/cooperativas"
                  search={(prev) => ({ ...prev, local: f.value })}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/50",
                  )}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-foreground pb-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em]">
            {filtering ? "Resultados" : "Cooperativas registadas"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "cooperativa" : "cooperativas"}
          </p>
        </div>

        {search.q && (
          <div className="mb-6">
            <Link
              to="/cooperativas"
              search={(prev) => ({ ...prev, q: undefined })}
              className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm font-medium hover:bg-border"
              aria-label={`Remover pesquisa ${search.q}`}
            >
              “{search.q}” <X className="size-3.5" />
            </Link>
          </div>
        )}

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed p-12 text-center">
            <p className="font-display text-xl font-semibold">Nenhuma cooperativa encontrada</p>
            <p className="mt-2 text-muted-foreground">Experimente outro nome ou localização.</p>
            <Button asChild variant="outline-brand" className="mt-6">
              <Link to="/cooperativas" search={{ q: undefined, local: undefined }}>
                Limpar filtros
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {items.slice(0, shown).map((c, i) => (
                <Reveal as="li" key={c.id} delay={(i % 4) * 60}>
                  <CooperativeCard coop={c} index={i} />
                </Reveal>
              ))}
            </ul>
            {items.length > shown && (
              <div className="mt-10 text-center">
                <Button variant="outline-brand" size="lg" onClick={() => setShown((n) => n + PAGE_SIZE)}>
                  Mostrar mais cooperativas
                </Button>
              </div>
            )}
          </>
        )}

        <p className="mt-12 rounded-xl border border-dashed border-primary/35 bg-primary-soft/60 p-5 text-sm leading-relaxed text-muted-foreground">
          {all.length} de {site.cooperativesAssociated} cooperativas associadas já registadas. Os dados que
          ainda não foram fornecidos pelas cooperativas aparecem como “a confirmar”.
        </p>
      </section>

      <CtaBand />
    </>
  );
}

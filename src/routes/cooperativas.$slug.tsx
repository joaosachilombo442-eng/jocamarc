import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Phone } from "lucide-react";

import { CooperativeLogo } from "@/components/site/CooperativeCard";
import { CtaBand } from "@/components/site/CtaBand";
import { Button } from "@/components/ui/button";
import { PENDING_LABEL } from "@/config/site";
import { cooperativeBySlugQuery } from "@/content/api";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/cooperativas/$slug")({
  loader: async ({ context: { queryClient }, params }) => {
    const coop = await queryClient.ensureQueryData(cooperativeBySlugQuery(params.slug));
    if (!coop) throw notFound();
    return { name: coop.name, fullName: coop.fullName, location: coop.location };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Cooperativa indisponível — AJOCAMARC" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — Cooperativa integrada na AJOCAMARC`;
    const description = `${loaderData.fullName ?? loaderData.name}${loaderData.location ? `, ${loaderData.location}` : ""}. Cooperativa associada à AJOCAMARC.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-bold">Cooperativa não encontrada</h1>
      <p className="mt-3 text-muted-foreground">A cooperativa que procura não existe ou ainda não foi registada.</p>
      <Button asChild variant="brand" className="mt-8">
        <Link to="/cooperativas" search={{ q: undefined, local: undefined }}>
          Ver todas as cooperativas
        </Link>
      </Button>
    </div>
  ),
  component: CooperativePage,
});

function Field({ label, value }: { label: string; value: React.ReactNode | null }) {
  return (
    <div className="grid gap-1 border-b py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className={value ? "font-medium" : "italic text-muted-foreground"}>{value ?? PENDING_LABEL}</dd>
    </div>
  );
}

function CooperativePage() {
  const { slug } = Route.useParams();
  const { data: coop } = useSuspenseQuery(cooperativeBySlugQuery(slug));
  if (!coop) return null;

  const members = coop.members
    ? `${coop.members.total} membros` +
      (coop.members.men !== null && coop.members.women !== null
        ? ` — ${coop.members.men} homens e ${coop.members.women} mulheres`
        : "")
    : null;

  return (
    <>
      <section className="border-b bg-primary-soft">
        <div className="container-site py-10 md:py-14">
          <Link
            to="/cooperativas"
            search={{ q: undefined, local: undefined }}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Cooperativas Integradas
          </Link>
          <div className="grid gap-8 md:grid-cols-[16rem_1fr] md:items-center">
            <CooperativeLogo coop={coop} className="aspect-square w-48 p-4 shadow-soft md:w-64" />
            <div>
              <p className="eyebrow mb-3">{coop.kind ? `Cooperativa · ${coop.kind}` : "Cooperativa"}</p>
              <h1 className="text-4xl font-extrabold leading-[1.05] md:text-5xl">{coop.name}</h1>
              {coop.fullName && <p className="mt-3 text-lg text-muted-foreground">{coop.fullName}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-14 md:py-20 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-[0.14em]">Informação da cooperativa</h2>
          <dl className="border-t">
            <Field label="Designação" value={coop.fullName ?? coop.name} />
            {coop.acronym && <Field label="Sigla" value={coop.acronym} />}
            <Field label="Localização" value={coop.location} />
            <Field label="Data de fundação" value={coop.foundedAt ? formatDate(coop.foundedAt) : null} />
            <Field label="Presidente" value={coop.president} />
            <Field label="Membros" value={members} />
            {coop.ageRange && <Field label="Faixa etária" value={coop.ageRange} />}
            <Field
              label="Materiais"
              value={
                coop.materials.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {coop.materials.map((m) => (
                      <li key={m} className="rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary-deep">
                        {m}
                      </li>
                    ))}
                  </ul>
                ) : null
              }
            />
            <Field label="NIF" value={coop.nif} />
          </dl>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold">Contactos</h2>
            {coop.phones.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {coop.phones.map((p) => (
                  <li key={p.tel}>
                    <Button asChild variant="outline-brand" className="w-full justify-start">
                      <a href={`tel:${p.tel}`}>
                        <Phone /> {p.display}
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm italic text-muted-foreground">Contactos {PENDING_LABEL.toLowerCase()}.</p>
            )}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Informação fornecida pela AJOCAMARC. Os campos “a confirmar” serão completados quando a cooperativa
            disponibilizar os dados.
          </p>
        </aside>
      </section>

      <CtaBand />
    </>
  );
}

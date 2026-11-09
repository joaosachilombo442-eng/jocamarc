import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ImageIcon } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PartnerSlots } from "@/components/site/PartnerSlots";
import { PageHeader, PendingContent, Reveal, SectionHeading } from "@/components/site/primitives";
import { PENDING_LABEL, site } from "@/config/site";
import { cooperativesQuery, partnersQuery } from "@/content/api";
import { photos } from "@/content/media";

export const Route = createFileRoute("/cooperativas-parceiros")({
  head: () => ({
    meta: [
      { title: "Cooperativas e Parceiros — AJOCAMARC" },
      {
        name: "description",
        content: "As cinco cooperativas de jovens catadores constituídas em 2021 e as instituições que colaboram com a AJOCAMARC.",
      },
      { property: "og:title", content: "Cooperativas e Parceiros — AJOCAMARC" },
      { property: "og:description", content: "As cooperativas e os parceiros da AJOCAMARC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(cooperativesQuery()),
      queryClient.ensureQueryData(partnersQuery()),
    ]),
  component: CooperativesPage,
});

const ringTone = ["border-t-primary", "border-t-accent", "border-t-brand-blue", "border-t-brand-red", "border-t-brand-yellow"];

function CooperativesPage() {
  const { data: cooperatives } = useSuspenseQuery(cooperativesQuery());
  const { data: partners } = useSuspenseQuery(partnersQuery());

  return (
    <>
      <PageHeader
        eyebrow="Rede"
        title="Cooperativas e Parceiros"
        description={`As ${site.cooperativesFounded} cooperativas constituídas em ${site.foundedYear} e as instituições que colaboram com a ${site.shortName}.`}
        crumbs={[{ label: "Cooperativas e Parceiros" }]}
        image={photos.triagemCartao}
      />

      <section className="container-site py-20 md:py-24">
        <SectionHeading
          eyebrow="Cooperativas"
          title={`${site.cooperativesFounded} cooperativas constituídas em ${site.foundedYear}`}
          description="Os nomes, localizações e descrições de cada cooperativa serão publicados após confirmação pela associação."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cooperatives.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 60}>
              <article className={`flex h-full flex-col rounded-xl border border-t-4 bg-card p-6 shadow-soft ${ringTone[i % ringTone.length]}`}>
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-lg border border-dashed bg-muted/60 text-muted-foreground">
                  {c.logo ? (
                    <img src={c.logo} alt="" className="h-12 w-12 object-contain" />
                  ) : (
                    <ImageIcon className="size-5" aria-label="Espaço para logótipo" />
                  )}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Cooperativa {i + 1}
                </p>
                <h3 className={`mt-1 text-lg font-semibold ${c.name ? "" : "italic text-muted-foreground"}`}>
                  {c.name ?? "Nome a confirmar"}
                </h3>
                <dl className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Constituição</dt>
                    <dd className="font-medium">{c.foundedYear ?? PENDING_LABEL}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Local</dt>
                    <dd className={c.location ? "font-medium" : "italic text-muted-foreground"}>
                      {c.location ?? PENDING_LABEL}
                    </dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-secondary py-20 md:py-24">
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

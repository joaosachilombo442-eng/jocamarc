import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Building2, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

import { ActivityGrid } from "@/components/site/ActivityCards";
import { CtaBand } from "@/components/site/CtaBand";
import { MediaPlaceholder, type PlaceholderTone } from "@/components/site/MediaPlaceholder";
import { DemoBadge, DemoNotice, PageHeader, Reveal, SectionHeading } from "@/components/site/primitives";
import { projectsQuery } from "@/content/api";
import { photos } from "@/content/media";
import { actionAreas, iconForArea } from "@/content/institutional";
import type { ProjectStatus } from "@/content/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/actividades")({
  head: () => ({
    meta: [
      { title: "Actividades e Projectos — AJOCAMARC" },
      {
        name: "description",
        content: "Áreas de intervenção, iniciativas e projectos da AJOCAMARC e das cooperativas de jovens catadores.",
      },
      { property: "og:title", content: "Actividades e Projectos — AJOCAMARC" },
      { property: "og:description", content: "Áreas de intervenção, iniciativas e projectos da AJOCAMARC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(projectsQuery()),
  component: ActivitiesPage,
});

const STATUS: Record<ProjectStatus, { label: string; className: string }> = {
  planeado: { label: "Planeado", className: "bg-brand-blue-soft text-brand-blue" },
  "em-curso": { label: "Em curso", className: "bg-accent-soft text-accent" },
  concluido: { label: "Concluído", className: "bg-primary-soft text-primary" },
};

const PLACEHOLDER_TONES: PlaceholderTone[] = ["primary", "accent", "blue", "deep"];

function ActivitiesPage() {
  const { data: projects } = useSuspenseQuery(projectsQuery());
  const areas = ["Todas", ...Array.from(new Set(projects.map((p) => p.area)))];
  const [area, setArea] = useState("Todas");
  const visible = area === "Todas" ? projects : projects.filter((p) => p.area === area);

  return (
    <>
      <PageHeader
        eyebrow="O que fazemos"
        title="Actividades e Projectos"
        description="As áreas de intervenção, as iniciativas e os projectos desenvolvidos pela AJOCAMARC e pelas suas cooperativas."
        crumbs={[{ label: "Actividades e Projectos" }]}
        image={{ ...photos.grupoContentor, position: "50% 20%" }}
      />

      <section className="container-site py-20 md:py-24">
        <SectionHeading
          eyebrow="Áreas de intervenção"
          title={`${actionAreas.length === 5 ? "Cinco" : actionAreas.length} frentes de trabalho`}
          description="Fotografias originais do trabalho da AJOCAMARC no terreno. Onde ainda não há fotografia adequada, mostramos um painel institucional até recebermos o material."
        />
        <ActivityGrid />
      </section>

      <section className="bg-secondary py-20 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Iniciativas" title="Projectos e actividades" />
          {projects.some((p) => p.isDemo) && (
            <div className="mb-8">
              <DemoNotice>
                As fichas abaixo são exemplos que mostram como cada projecto será apresentado. Serão
                substituídas pelos projectos oficiais através do futuro painel de gestão de conteúdos.
              </DemoNotice>
            </div>
          )}

          <div role="tablist" aria-label="Filtrar por área" className="mb-10 flex flex-wrap gap-2">
            {areas.map((a) => (
              <button
                key={a}
                role="tab"
                aria-selected={area === a}
                onClick={() => setArea(a)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  area === a
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/50",
                )}
              >
                {a}
              </button>
            ))}
          </div>

          <ul className="grid gap-8 lg:grid-cols-2">
            {visible.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 2) * 80}>
                <article
                  id={p.slug}
                  className="grid h-full scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-soft sm:grid-cols-[0.9fr_1fr]"
                >
                  <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
                    {p.images[0] ? (
                      <img
                        src={p.images[0].src}
                        alt={p.images[0].alt}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <MediaPlaceholder label={p.area} Icon={iconForArea(p.area)} tone={PLACEHOLDER_TONES[i % PLACEHOLDER_TONES.length] ?? "primary"} className="min-h-48" />
                    )}
                  </div>
                  <div className="flex flex-col p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.area}</span>
                      {p.status && (
                        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", STATUS[p.status].className)}>
                          {STATUS[p.status].label}
                        </span>
                      )}
                      {p.isDemo && <DemoBadge />}
                    </div>
                    <h3 className="text-2xl font-bold leading-snug">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                    <dl className="mt-auto grid gap-2 pt-6 text-sm">
                      {p.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4 text-accent" />
                          <dt className="sr-only">Data</dt>
                          <dd>{p.date}</dd>
                        </div>
                      )}
                      {p.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-accent" />
                          <dt className="sr-only">Localização</dt>
                          <dd>{p.location}</dd>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <Building2 className="mt-0.5 size-4 text-accent" />
                        <dt className="sr-only">Instituições envolvidas</dt>
                        <dd className={p.institutions.length ? "" : "italic text-muted-foreground"}>
                          {p.institutions.length ? p.institutions.join(", ") : "Instituições envolvidas a confirmar"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

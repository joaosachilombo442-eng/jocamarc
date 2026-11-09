import { createFileRoute } from "@tanstack/react-router";
import { Compass, Gem, Target } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader, PendingContent, Reveal } from "@/components/site/primitives";
import { photos } from "@/content/media";
import { missionVisionValues } from "@/content/institutional";

export const Route = createFileRoute("/missao-visao-valores")({
  head: () => ({
    meta: [
      { title: "Missão, Visão e Valores — AJOCAMARC" },
      {
        name: "description",
        content: "A missão, a visão e os valores da Associação dos Jovens Catadores de Materiais Recicláveis de Angola.",
      },
      { property: "og:title", content: "Missão, Visão e Valores — AJOCAMARC" },
      { property: "og:description", content: "Os princípios que orientam a AJOCAMARC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MvvPage,
});

function MvvPage() {
  const { mission, vision, values } = missionVisionValues;
  const blocks = [
    { key: "mission", title: "Missão", text: mission, Icon: Target, tone: "bg-primary text-primary-foreground" },
    { key: "vision", title: "Visão", text: vision, Icon: Compass, tone: "bg-accent text-accent-foreground" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Quem somos"
        title="Missão, Visão e Valores"
        description="Os princípios que orientam o trabalho da AJOCAMARC e dos jovens catadores."
        crumbs={[{ label: "Missão, Visão e Valores" }]}
        image={photos.grupoEdificio}
      />

      <section className="container-site grid gap-6 py-20 md:grid-cols-2 md:py-24">
        {blocks.map((b, i) => (
          <Reveal key={b.key} delay={i * 100}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-soft">
              <header className={`flex items-center gap-4 px-8 py-6 ${b.tone}`}>
                <b.Icon className="size-7" />
                <h2 className="text-3xl font-bold">{b.title}</h2>
              </header>
              <div className="flex-1 p-8">
                {b.text ? (
                  <p className="font-display text-xl leading-relaxed">{b.text}</p>
                ) : (
                  <PendingContent hint={`A formulação oficial da ${b.title.toLowerCase()} será publicada após confirmação pela associação.`} />
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="bg-secondary py-20 md:py-24">
        <div className="container-site">
          <div className="mb-10 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-blue text-primary-foreground">
              <Gem className="size-6" />
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">Valores</h2>
          </div>
          {values.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => (
                <li key={v.title} className="rounded-xl border bg-card p-7 shadow-soft">
                  <h3 className="text-xl font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <li key={n}>
                  <PendingContent
                    title={`Valor ${n}`}
                    hint="Nome e descrição do valor a confirmar pela AJOCAMARC."
                    className="h-full bg-card"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}

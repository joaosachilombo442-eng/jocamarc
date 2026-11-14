import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Briefcase,
  Compass,
  Flag,
  Gem,
  HandHeart,
  Handshake,
  HeartHandshake,
  Landmark,
  Leaf,
  Lightbulb,
  Recycle,
  Scale,
  ShieldCheck,
  Sprout,
  Target,
  Users,
  UsersRound,
  Vote,
  type LucideIcon,
} from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader, Reveal } from "@/components/site/primitives";
import { photos } from "@/content/media";
import { missionVisionValues } from "@/content/institutional";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/missao-visao-valores")({
  head: () => ({
    meta: [
      { title: "Missão, Visão e Valores — AJOCAMARC" },
      {
        name: "description",
        content:
          "Missão, visão, valores, princípios, objectivos e compromisso institucional da Associação dos Jovens Catadores de Materiais Recicláveis de Angola.",
      },
      { property: "og:title", content: "Missão, Visão e Valores — AJOCAMARC" },
      {
        property: "og:description",
        content: "Por uma Angola mais limpa, inclusiva e sustentável: a identidade institucional da AJOCAMARC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MvvPage,
});

const VALUE_ICONS: Record<string, LucideIcon> = {
  "Dignidade humana": HandHeart,
  "Inclusão social": UsersRound,
  Solidariedade: HeartHandshake,
  Transparência: Gem,
  "Responsabilidade ambiental": Leaf,
  Empreendedorismo: Briefcase,
  "Compromisso social": BadgeCheck,
  "Participação democrática": Vote,
  Inovação: Lightbulb,
  Integridade: ShieldCheck,
  "Igualdade de oportunidades": Scale,
  "Cooperação institucional": Landmark,
};

const PRINCIPLE_ICONS: Record<string, LucideIcon> = {
  "Justiça social": Scale,
  "Democracia participativa": Vote,
  Legalidade: Landmark,
  Igualdade: Users,
  "Protecção ambiental": Leaf,
  "Economia circular": Recycle,
  Cooperação: Handshake,
  "Valorização dos catadores": Sprout,
};

const VALUE_TONES = [
  "bg-primary-soft text-primary",
  "bg-accent-soft text-accent",
  "bg-brand-blue-soft text-brand-blue",
  "bg-brand-red-soft text-brand-red",
];

function MvvPage() {
  const { mission, vision, values, principles, objectives, commitment } = missionVisionValues;
  const blocks = [
    { key: "mission", title: "Missão", text: mission, Icon: Target, tone: "bg-primary text-primary-foreground" },
    { key: "vision", title: "Visão", text: vision, Icon: Compass, tone: "bg-accent text-accent-foreground" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Identidade institucional"
        title="Missão, Visão e Valores"
        description="Os princípios, objectivos e compromissos que orientam o trabalho da AJOCAMARC e dos catadores de materiais recicláveis em Angola."
        crumbs={[{ label: "Missão, Visão e Valores" }]}
        image={{ ...photos.encontroArLivre, position: "50% 40%" }}
      />

      <section className="container-site grid gap-6 py-20 md:grid-cols-2 md:py-24">
        {blocks.map((b, i) => (
          <Reveal key={b.key} delay={i * 100}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-soft">
              <header className={`flex items-center gap-4 px-8 py-6 ${b.tone}`}>
                <b.Icon className="size-7" />
                <h2 className="text-3xl font-bold">{b.title}</h2>
              </header>
              <p className="flex-1 p-8 font-display text-xl leading-relaxed">{b.text}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="bg-secondary py-20 md:py-24">
        <div className="container-site">
          <Heading Icon={Gem} tone="bg-brand-blue" title="Valores" count={values.length} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[v] ?? BadgeCheck;
              return (
                <Reveal as="li" key={v} delay={(i % 4) * 50}>
                  <div className="flex h-full items-center gap-4 rounded-xl border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift">
                    <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-lg", VALUE_TONES[i % VALUE_TONES.length])}>
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-base font-semibold leading-snug">{v}</h3>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="container-site grid gap-14 py-20 md:py-24 lg:grid-cols-2">
        <div>
          <Heading Icon={Scale} tone="bg-brand-red" title="Princípios" count={principles.length} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {principles.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[p] ?? Scale;
              return (
                <Reveal as="li" key={p} delay={(i % 2) * 50}>
                  <div className="flex items-center gap-3 rounded-lg border-l-4 border-brand-red bg-card px-4 py-3 shadow-soft">
                    <Icon className="size-5 shrink-0 text-brand-red" />
                    <span className="font-medium">{p}</span>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <div>
          <Heading Icon={Flag} tone="bg-primary" title="Objectivos" count={objectives.length} />
          <ol className="space-y-3">
            {objectives.map((o, i) => (
              <Reveal as="li" key={o} delay={(i % 3) * 50}>
                <div className="flex items-center gap-4 rounded-lg border bg-card px-4 py-3 shadow-soft">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft font-display text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="font-medium">{o}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary-deep py-20 text-primary-foreground md:py-24">
        <span className="brand-stripe absolute inset-x-0 top-0 h-1" aria-hidden />
        <Recycle className="absolute -right-16 -top-10 size-80 opacity-[0.07]" strokeWidth={1} aria-hidden />
        <div className="container-site relative max-w-4xl text-center">
          <p className="eyebrow mb-4 text-accent">Compromisso institucional</p>
          <p className="font-display text-2xl font-bold leading-snug md:text-4xl">{commitment}</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Heading({ Icon, tone, title, count }: { Icon: LucideIcon; tone: string; title: string; count: number }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className={cn("grid h-12 w-12 place-items-center rounded-lg text-primary-foreground", tone)}>
        <Icon className="size-6" />
      </span>
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      <span className="ml-1 rounded-full bg-muted px-2.5 py-0.5 text-sm font-semibold text-muted-foreground">{count}</span>
    </div>
  );
}

/**
 * Institutional texts. Only confirmed facts are written here; everything else is `null`
 * and renders as an editable placeholder until the association provides the official wording.
 */
import { Handshake, Megaphone, Recycle, Sprout, UsersRound, type LucideIcon } from "lucide-react";

import { photos, type SitePhoto } from "./media";

export type TimelineEvent = {
  year: string;
  title: string;
  description: string | null;
  confirmed: boolean;
};

export const timeline: TimelineEvent[] = [
  {
    year: "2020",
    title: "Início da iniciativa em Cacuaco",
    description:
      "A iniciativa que dá origem à AJOCAMARC começa em Cacuaco, reunindo jovens catadores de materiais recicláveis.",
    confirmed: true,
  },
  {
    year: "2021",
    title: "Constituição da AJOCAMARC",
    description:
      "A Associação dos Jovens Catadores de Materiais Recicláveis de Angola é formalmente constituída.",
    confirmed: true,
  },
  {
    year: "2021",
    title: "Constituição das cinco cooperativas",
    description: "São constituídas as cinco cooperativas de catadores ligadas à associação.",
    confirmed: true,
  },
  {
    year: "Depois de 2021",
    title: "Marcos institucionais posteriores",
    description: null,
    confirmed: false,
  },
];

export const missionVisionValues = {
  mission: null as string | null,
  vision: null as string | null,
  values: [] as { title: string; description: string }[],
};

export type ActionArea = {
  title: string;
  description: string;
  Icon: LucideIcon;
  tone: "primary" | "accent" | "blue" | "red";
  /** Original AJOCAMARC photo that shows this kind of work; null until a fitting photo is supplied. */
  photo: SitePhoto | null;
};

/** Thematic areas derived from the association's purpose (name and identity). */
export const actionAreas: ActionArea[] = [
  {
    title: "Recolha e triagem",
    description: "Recolha, separação e organização de materiais recicláveis pelos jovens catadores.",
    Icon: Recycle,
    tone: "primary",
    photo: photos.triagemCartao,
  },
  {
    title: "Organização cooperativa",
    description: "Reuniões e trabalho colectivo para organizar os catadores em cooperativas, com mais dignidade e estrutura.",
    Icon: Handshake,
    tone: "accent",
    photo: photos.encontroArLivre,
  },
  {
    title: "Sensibilização ambiental",
    description: "Informação e educação comunitária sobre a separação de resíduos e a reciclagem.",
    Icon: Megaphone,
    tone: "blue",
    photo: null,
  },
  {
    title: "Inclusão social e juventude",
    description: "Valorização do trabalho dos jovens catadores e da sua participação na sociedade.",
    Icon: UsersRound,
    tone: "red",
    photo: photos.grupoEdificio,
  },
  {
    title: "Economia circular",
    description: "Promoção da reutilização e da reciclagem como caminho para o desenvolvimento sustentável.",
    Icon: Sprout,
    tone: "primary",
    photo: photos.camiao,
  },
];

/** Icon for a project/news area label, falling back to the recycling symbol. */
export function iconForArea(area: string): LucideIcon {
  const match = actionAreas.find((a) => a.title.toLowerCase() === area.toLowerCase());
  if (match) return match.Icon;
  return area.toLowerCase() === "comunidade" ? UsersRound : Recycle;
}

export const toneClasses: Record<ActionArea["tone"], { soft: string; solid: string }> = {
  primary: { soft: "bg-primary-soft text-primary", solid: "bg-primary" },
  accent: { soft: "bg-accent-soft text-accent", solid: "bg-accent" },
  blue: { soft: "bg-brand-blue-soft text-brand-blue", solid: "bg-brand-blue" },
  red: { soft: "bg-brand-red-soft text-brand-red", solid: "bg-brand-red" },
};

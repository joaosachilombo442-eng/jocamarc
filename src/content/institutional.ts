/**
 * Institutional texts. Only confirmed facts are written here; everything else is `null`
 * and renders as an editable placeholder until the association provides the official wording.
 */
import { Handshake, Recycle, Sprout, UsersRound, type LucideIcon } from "lucide-react";

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
};

/** Thematic areas derived from the association's purpose (name and identity). */
export const actionAreas: ActionArea[] = [
  {
    title: "Recolha e triagem",
    description: "Recolha, separação e encaminhamento de materiais recicláveis pelos jovens catadores.",
    Icon: Recycle,
    tone: "primary",
  },
  {
    title: "Organização cooperativa",
    description: "Apoio à organização dos catadores em cooperativas, para um trabalho mais digno e estruturado.",
    Icon: Handshake,
    tone: "accent",
  },
  {
    title: "Inclusão social e juventude",
    description: "Valorização do trabalho dos jovens catadores e da sua participação na sociedade.",
    Icon: UsersRound,
    tone: "blue",
  },
  {
    title: "Economia circular",
    description: "Promoção da reutilização e da reciclagem como caminho para o desenvolvimento sustentável.",
    Icon: Sprout,
    tone: "red",
  },
];

export const toneClasses: Record<ActionArea["tone"], { soft: string; solid: string }> = {
  primary: { soft: "bg-primary-soft text-primary", solid: "bg-primary" },
  accent: { soft: "bg-accent-soft text-accent", solid: "bg-accent" },
  blue: { soft: "bg-brand-blue-soft text-brand-blue", solid: "bg-brand-blue" },
  red: { soft: "bg-brand-red-soft text-brand-red", solid: "bg-brand-red" },
};

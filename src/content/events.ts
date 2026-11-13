/**
 * EVENTOS — events announced by AJOCAMARC with their original flyer.
 * Title, date, place and highlights are transcribed from the flyer; nothing is added.
 */
import { flyers } from "./media";
import type { EventItem } from "./types";

export const events: EventItem[] = [
  {
    id: "event-conferencia-municipal-dande-2026",
    slug: "i-conferencia-municipal-do-dande",
    title: "I Conferência Municipal do Dande — Gestão de Resíduos e Desenvolvimento Local",
    date: "2026-10-30",
    location: "Dande",
    description:
      "Conferência dedicada à gestão de resíduos e ao desenvolvimento local, anunciada pela Administração Municipal do Dande (Governo Provincial do Bengo), com a AJOCAMARC entre as entidades presentes no cartaz.",
    highlights: [
      "Promover a gestão adequada de resíduos",
      "Fortalecer a educação ambiental",
      "Valorizar os resíduos e gerar empregos verdes",
      "Contribuir para o desenvolvimento local",
    ],
    flyer: flyers.conferenciaDande,
  },
];

/** Initial number of flyer slots shown in the events gallery (the brief asks for 4 to 5). */
export const INITIAL_EVENT_SLOTS = 4;

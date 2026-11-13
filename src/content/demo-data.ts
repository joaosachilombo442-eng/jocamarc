/**
 * DEMONSTRATION DATA — layout samples only.
 *
 * Nothing in this file is an official AJOCAMARC publication. Every item carries
 * `isDemo: true` and renders with an "Exemplo" badge. It will be replaced by
 * content managed in the future admin panel (see src/content/api.ts).
 * Only example projects remain here; partners stay empty until confirmed.
 *
 * Demo items carry NO photographs: the association's real photos (src/content/media.ts)
 * must never illustrate an invented event, so these render a typographic placeholder.
 */
import type { Partner, Project } from "./types";

export const projects: Project[] = [
  {
    id: "demo-project-1",
    slug: "exemplo-pontos-de-recolha",
    title: "Pontos de recolha comunitários",
    description:
      "Exemplo de ficha de projecto: descrição dos objectivos, das acções realizadas e dos resultados. Substituir pela informação oficial do projecto.",
    area: "Recolha e triagem",
    images: [],
    date: "2026",
    location: "Luanda",
    institutions: [],
    status: "em-curso",
    isDemo: true,
  },
  {
    id: "demo-project-2",
    slug: "exemplo-fortalecimento-cooperativo",
    title: "Fortalecimento das cooperativas",
    description:
      "Exemplo de ficha de projecto dedicada à organização e capacitação das cooperativas de catadores.",
    area: "Organização cooperativa",
    images: [],
    date: "2026",
    location: "Luanda",
    institutions: [],
    status: "planeado",
    isDemo: true,
  },
  {
    id: "demo-project-3",
    slug: "exemplo-educacao-ambiental",
    title: "Educação ambiental nas comunidades",
    description:
      "Exemplo de ficha de projecto sobre sessões de sensibilização para a separação de resíduos.",
    area: "Sensibilização ambiental",
    images: [],
    date: "2026",
    location: "Luanda",
    institutions: [],
    status: "concluido",
    isDemo: true,
  },
  {
    id: "demo-project-4",
    slug: "exemplo-limpeza-de-espacos-publicos",
    title: "Limpeza de espaços públicos",
    description:
      "Exemplo de ficha de actividade sobre mobilização de jovens para a limpeza de ruas e zonas costeiras.",
    area: "Comunidade",
    images: [],
    date: "2026",
    location: "Luanda",
    institutions: [],
    status: "concluido",
    isDemo: true,
  },
];


/** No partner is published until confirmed by the association. */
export const partners: Partner[] = [];

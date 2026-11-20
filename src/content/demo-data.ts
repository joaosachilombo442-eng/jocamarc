/**
 * DEMONSTRATION DATA — layout samples only.
 *
 * Nothing in this file is an official AJOCAMARC publication. Every item carries
 * `isDemo: true` and renders with an "Exemplo" badge. It will be replaced by
 * content managed in the future admin panel (see src/content/api.ts).
 * Only example projects remain here; partners stay empty until confirmed.
 *
 * Project cards may use original AJOCAMARC photographs as thematic illustrations.
 * These images do not confirm that the example projects took place.
 */
import type { Partner, Project } from "./types";
import { partnerLogos, photos } from "./media";

export const projects: Project[] = [
  {
    id: "demo-project-1",
    slug: "exemplo-pontos-de-recolha",
    title: "Pontos de recolha comunitários",
    description:
      "Exemplo de ficha de projecto: descrição dos objectivos, das acções realizadas e dos resultados. Substituir pela informação oficial do projecto.",
    area: "Recolha e triagem",
    images: [{ src: photos.triagemCartao.src, alt: photos.triagemCartao.alt }],
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
    images: [{ src: photos.encontroArLivre.src, alt: photos.encontroArLivre.alt }],
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
    images: [{ src: photos.reciclagemPapel.src, alt: photos.reciclagemPapel.alt }],
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


/** Institutional partners confirmed by the association and represented by supplied logos. */
export const partners: Partner[] = [
  { id: "minamb", name: "Ministério do Ambiente (MINAMB)", type: "Instituição pública", logo: partnerLogos.minamb },
  { id: "cnj", name: "Conselho Nacional de Juventude (CNJ)", type: "Instituição", logo: partnerLogos.cnj },
  { id: "minjude", name: "Ministério da Juventude e Desportos", type: "Instituição pública", logo: partnerLogos.minjude },
  { id: "assembleia-nacional", name: "Assembleia Nacional", type: "Instituição pública", logo: partnerLogos.assembleia },
  { id: "inefop", name: "Instituto Nacional de Emprego e Formação Profissional (INEFOP)", type: "Instituição pública", logo: partnerLogos.inefop },
  { id: "anr", name: "Agência Nacional de Resíduos (ANR)", type: "Instituição pública", logo: partnerLogos.anr },
  { id: "iaj", name: "Instituto Angolano da Juventude (IAJ)", type: "Instituição pública", logo: partnerLogos.iaj },
  { id: "inapem", name: "Instituto Nacional de Apoio às Micro, Pequenas e Médias Empresas (INAPEM)", type: "Instituição pública", logo: partnerLogos.inapem },
];

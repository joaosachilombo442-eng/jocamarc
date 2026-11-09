/**
 * DEMONSTRATION DATA — layout samples only.
 *
 * Nothing in this file is an official AJOCAMARC publication. Every item carries
 * `isDemo: true` and renders with an "Exemplo" badge. It will be replaced by
 * content managed in the future admin panel (see src/content/api.ts).
 * Cooperatives and partners are intentionally left unnamed until confirmed.
 *
 * Demo items carry NO photographs: the association's real photos (src/content/media.ts)
 * must never illustrate an invented event, so these render a typographic placeholder.
 */
import type { Cooperative, NewsArticle, NewsCategory, Partner, Project } from "./types";

export const newsCategories: NewsCategory[] = [
  { slug: "institucional", name: "Institucional" },
  { slug: "cooperativas", name: "Cooperativas" },
  { slug: "ambiente", name: "Ambiente" },
  { slug: "comunidade", name: "Comunidade" },
  { slug: "formacao", name: "Formação" },
];

const demoBody = (topic: string): string[] => [
  `Este é um artigo de demonstração criado para ilustrar o formato editorial da secção Notícias e Actualidade. O tema de exemplo é: ${topic.toLowerCase()}.`,
  "Quando o painel administrativo estiver activo, a equipa da AJOCAMARC poderá publicar aqui as suas notícias oficiais, com título, imagem de capa, categoria, data, localização e texto completo.",
  "Cada notícia terá a sua própria página, com ligações de partilha para as redes sociais e sugestões de leitura relacionadas. Este texto deve ser substituído pelo conteúdo oficial da associação.",
];

type DemoNewsSeed = Omit<NewsArticle, "body" | "isDemo" | "id" | "coverImage" | "coverAlt">;

const newsSeeds: DemoNewsSeed[] = [
  {
    slug: "exemplo-recolha-e-triagem-nos-bairros",
    title: "Recolha e triagem de materiais recicláveis nos bairros",
    excerpt:
      "Exemplo de notícia principal sobre o trabalho diário dos jovens catadores na recolha e separação de materiais.",
    categorySlug: "ambiente",
    publishedAt: "2026-10-28",
    location: "Luanda",
    featured: true,
  },
  {
    slug: "exemplo-encontro-das-cooperativas",
    title: "Encontro de trabalho entre as cooperativas",
    excerpt: "Exemplo de notícia sobre a articulação entre as cooperativas de catadores.",
    categorySlug: "cooperativas",
    publishedAt: "2026-10-14",
    location: "Luanda",
  },
  {
    slug: "exemplo-sensibilizacao-ambiental",
    title: "Sessão de sensibilização ambiental com jovens",
    excerpt: "Exemplo de notícia sobre acções de educação ambiental e separação de resíduos.",
    categorySlug: "formacao",
    publishedAt: "2026-09-30",
    location: "Luanda",
  },
  {
    slug: "exemplo-limpeza-comunitaria",
    title: "Acção de limpeza comunitária junto à costa",
    excerpt: "Exemplo de notícia sobre mobilização comunitária e limpeza de espaços públicos.",
    categorySlug: "comunidade",
    publishedAt: "2026-09-12",
    location: "Luanda",
  },
  {
    slug: "exemplo-valorizacao-de-materiais",
    title: "Da recolha à valorização: o percurso dos materiais",
    excerpt: "Exemplo de notícia sobre a cadeia de valor dos materiais recicláveis.",
    categorySlug: "ambiente",
    publishedAt: "2026-08-21",
    location: "Luanda",
  },
  {
    slug: "exemplo-comunicado-institucional",
    title: "Comunicado institucional da AJOCAMARC",
    excerpt: "Exemplo de formato para comunicados oficiais da direcção da associação.",
    categorySlug: "institucional",
    publishedAt: "2026-07-30",
  },
  {
    slug: "exemplo-formacao-de-catadores",
    title: "Formação prática para jovens catadores",
    excerpt: "Exemplo de notícia sobre capacitação e boas práticas de segurança no trabalho.",
    categorySlug: "formacao",
    publishedAt: "2026-07-08",
    location: "Luanda",
  },
  {
    slug: "exemplo-dia-do-ambiente",
    title: "Participação em iniciativa ambiental",
    excerpt: "Exemplo de notícia sobre a presença da associação em eventos públicos.",
    categorySlug: "comunidade",
    publishedAt: "2026-06-05",
  },
  {
    slug: "exemplo-materiais-e-mercado",
    title: "Materiais recicláveis e oportunidades de rendimento",
    excerpt: "Exemplo de artigo de análise sobre economia circular e geração de rendimento.",
    categorySlug: "cooperativas",
    publishedAt: "2026-05-19",
  },
];

export const news: NewsArticle[] = newsSeeds.map((seed, i) => ({
  ...seed,
  id: `demo-news-${i + 1}`,
  coverImage: null,
  coverAlt: null,
  body: demoBody(seed.title),
  isDemo: true,
}));

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

/** The five cooperatives constituted in 2021. Names and details await confirmation. */
export const cooperatives: Cooperative[] = Array.from({ length: 5 }, (_, i) => ({
  id: `cooperative-${i + 1}`,
  name: null,
  foundedYear: 2021,
  location: null,
  description: null,
  logo: null,
}));

/** No partner is published until confirmed by the association. */
export const partners: Partner[] = [];

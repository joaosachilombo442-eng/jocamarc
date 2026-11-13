/**
 * NOTÍCIAS — official AJOCAMARC news.
 *
 * The association asked for two news items (its participation in the Relatório Anual de
 * Resíduos de Angola 2025 and its entry into the CNJ). Their full text, date and photograph
 * have not been supplied yet, so they are flagged `pending` and show an editable slot
 * instead of an invented article.
 */
import type { NewsArticle, NewsCategory } from "./types";

export const newsCategories: NewsCategory[] = [
  { slug: "institucional", name: "Institucional" },
  { slug: "cooperativas", name: "Cooperativas" },
  { slug: "ambiente", name: "Ambiente" },
  { slug: "comunidade", name: "Comunidade" },
  { slug: "formacao", name: "Formação" },
];

export const news: NewsArticle[] = [
  {
    id: "news-relatorio-anual-residuos-2025",
    slug: "relatorio-anual-de-residuos-de-angola-2025",
    title: "Participação da AJOCAMARC no Relatório Anual de Resíduos de Angola 2025",
    excerpt: "A AJOCAMARC participou no Relatório Anual de Resíduos de Angola 2025.",
    body: [],
    categorySlug: "ambiente",
    coverImage: null,
    coverAlt: null,
    publishedAt: null,
    featured: true,
    pending: true,
  },
  {
    id: "news-entrada-cnj",
    slug: "entrada-da-ajocamarc-no-cnj",
    title: "Entrada da AJOCAMARC no CNJ",
    excerpt: "A AJOCAMARC passou a integrar o CNJ.",
    body: [],
    categorySlug: "institucional",
    coverImage: null,
    coverAlt: null,
    publishedAt: null,
    pending: true,
  },
];

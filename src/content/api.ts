/**
 * Content repository.
 *
 * Every page reads content through these functions and their queryOptions — never from
 * hard-coded component text. Today they resolve the demonstration source; when the admin
 * panel (Lovable Cloud) is enabled, replace each function body with a database query and
 * keep the signatures, so no page needs to change.
 */
import { queryOptions } from "@tanstack/react-query";

import * as source from "./demo-data";
import type { ContactMessage, NewsArticle } from "./types";

export const NEWS_PAGE_SIZE = 6;

export type NewsListParams = {
  q?: string | undefined;
  category?: string | undefined;
  page?: number | undefined;
  /** Archive filter, formatted "YYYY-MM". */
  month?: string | undefined;
};

export type NewsListResult = {
  items: NewsArticle[];
  total: number;
  page: number;
  pageCount: number;
};

const byDateDesc = (a: NewsArticle, b: NewsArticle) => b.publishedAt.localeCompare(a.publishedAt);

const normalise = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export async function listNews(params: NewsListParams = {}): Promise<NewsListResult> {
  const { q, category, month } = params;
  let items = [...source.news].sort(byDateDesc);
  if (category) items = items.filter((n) => n.categorySlug === category);
  if (month) items = items.filter((n) => n.publishedAt.startsWith(month));
  if (q && q.trim()) {
    const needle = normalise(q.trim());
    items = items.filter((n) => normalise(`${n.title} ${n.excerpt}`).includes(needle));
  }
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / NEWS_PAGE_SIZE));
  const page = Math.min(Math.max(1, params.page ?? 1), pageCount);
  const start = (page - 1) * NEWS_PAGE_SIZE;
  return { items: items.slice(start, start + NEWS_PAGE_SIZE), total, page, pageCount };
}

export async function getFeaturedNews(): Promise<NewsArticle | null> {
  const sorted = [...source.news].sort(byDateDesc);
  return sorted.find((n) => n.featured) ?? sorted[0] ?? null;
}

export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  return [...source.news].sort(byDateDesc).slice(0, limit);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  return source.news.find((n) => n.slug === slug) ?? null;
}

export async function getRelatedNews(article: NewsArticle, limit = 3): Promise<NewsArticle[]> {
  const others = [...source.news].filter((n) => n.id !== article.id).sort(byDateDesc);
  const same = others.filter((n) => n.categorySlug === article.categorySlug);
  return [...same, ...others.filter((n) => n.categorySlug !== article.categorySlug)].slice(
    0,
    limit,
  );
}

export async function getNewsArchive(): Promise<{ month: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const n of source.news) {
    const m = n.publishedAt.slice(0, 7);
    counts.set(m, (counts.get(m) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([month, count]) => ({ month, count }));
}

export async function listNewsCategories() {
  return source.newsCategories;
}

export async function listProjects() {
  return source.projects;
}

export async function listAlbums() {
  return source.albums;
}

export async function listCooperatives() {
  return source.cooperatives;
}

export async function listPartners() {
  return source.partners;
}

export type ContactResult = { ok: true } | { ok: false; reason: "not-configured" };

/** Contact form submission. Not connected yet — returns `not-configured` so the UI stays honest. */
export async function submitContactMessage(_message: ContactMessage): Promise<ContactResult> {
  return { ok: false, reason: "not-configured" };
}

/* ---------- Query options ---------- */

export const newsListQuery = (params: NewsListParams) =>
  queryOptions({ queryKey: ["news", "list", params], queryFn: () => listNews(params) });

export const featuredNewsQuery = () =>
  queryOptions({ queryKey: ["news", "featured"], queryFn: getFeaturedNews });

export const latestNewsQuery = (limit = 3) =>
  queryOptions({ queryKey: ["news", "latest", limit], queryFn: () => getLatestNews(limit) });

export const newsBySlugQuery = (slug: string) =>
  queryOptions({ queryKey: ["news", "slug", slug], queryFn: () => getNewsBySlug(slug) });

export const newsArchiveQuery = () =>
  queryOptions({ queryKey: ["news", "archive"], queryFn: getNewsArchive });

export const newsCategoriesQuery = () =>
  queryOptions({ queryKey: ["news", "categories"], queryFn: listNewsCategories });

export const projectsQuery = () => queryOptions({ queryKey: ["projects"], queryFn: listProjects });

export const albumsQuery = () => queryOptions({ queryKey: ["albums"], queryFn: listAlbums });

export const cooperativesQuery = () =>
  queryOptions({ queryKey: ["cooperatives"], queryFn: listCooperatives });

export const partnersQuery = () => queryOptions({ queryKey: ["partners"], queryFn: listPartners });

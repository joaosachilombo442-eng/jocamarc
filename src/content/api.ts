/**
 * Content repository.
 *
 * Every page reads content through these functions and their queryOptions — never from
 * hard-coded component text. Today they resolve the demonstration source; when the admin
 * panel (Lovable Cloud) is enabled, replace each function body with a database query and
 * keep the signatures, so no page needs to change.
 */
import { queryOptions } from "@tanstack/react-query";

import * as coopSource from "./cooperatives";
import * as source from "./demo-data";
import * as eventSource from "./events";
import * as media from "./media";
import * as newsSource from "./news";
import type { ContactMessage, Cooperative, EventItem, NewsArticle } from "./types";

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

/** Newest first; items still awaiting a confirmed date keep their editorial order at the top. */
const byDateDesc = (a: NewsArticle, b: NewsArticle) => {
  if (a.publishedAt === b.publishedAt) return 0;
  if (a.publishedAt === null) return -1;
  if (b.publishedAt === null) return 1;
  return b.publishedAt.localeCompare(a.publishedAt);
};

const normalise = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export async function listNews(params: NewsListParams = {}): Promise<NewsListResult> {
  const { q, category, month } = params;
  let items = [...newsSource.news].sort(byDateDesc);
  if (category) items = items.filter((n) => n.categorySlug === category);
  if (month) items = items.filter((n) => n.publishedAt?.startsWith(month));
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
  const sorted = [...newsSource.news].sort(byDateDesc);
  return sorted.find((n) => n.featured) ?? sorted[0] ?? null;
}

export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  return [...newsSource.news].sort(byDateDesc).slice(0, limit);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  return newsSource.news.find((n) => n.slug === slug) ?? null;
}

export async function getRelatedNews(article: NewsArticle, limit = 3): Promise<NewsArticle[]> {
  const others = [...newsSource.news].filter((n) => n.id !== article.id).sort(byDateDesc);
  const same = others.filter((n) => n.categorySlug === article.categorySlug);
  return [...same, ...others.filter((n) => n.categorySlug !== article.categorySlug)].slice(
    0,
    limit,
  );
}

export async function getNewsArchive(): Promise<{ month: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const n of newsSource.news) {
    if (!n.publishedAt) continue;
    const m = n.publishedAt.slice(0, 7);
    counts.set(m, (counts.get(m) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([month, count]) => ({ month, count }));
}

export async function listNewsCategories() {
  return newsSource.newsCategories;
}

export async function listProjects() {
  return source.projects;
}

export async function listAlbums() {
  return media.albums;
}

export type CooperativeListParams = {
  q?: string | undefined;
  /** Exact location label, or PENDING_LOCATION for cooperatives whose location is not confirmed. */
  location?: string | undefined;
};

/** Filter value for cooperatives whose location has not been confirmed yet. */
export const PENDING_LOCATION = "a-confirmar";

export async function listCooperatives(params: CooperativeListParams = {}): Promise<Cooperative[]> {
  let items = [...coopSource.cooperatives];
  if (params.location === PENDING_LOCATION) items = items.filter((c) => !c.location);
  else if (params.location) items = items.filter((c) => c.location === params.location);
  if (params.q && params.q.trim()) {
    const needle = normalise(params.q.trim());
    items = items.filter((c) =>
      normalise(`${c.name} ${c.fullName ?? ""} ${c.acronym ?? ""}`).includes(needle),
    );
  }
  return items;
}

export async function listCooperativeLocations(): Promise<string[]> {
  const set = new Set(coopSource.cooperatives.flatMap((c) => (c.location ? [c.location] : [])));
  return [...set].sort((a, b) => a.localeCompare(b, "pt"));
}

export async function getCooperativeBySlug(slug: string): Promise<Cooperative | null> {
  return coopSource.cooperatives.find((c) => c.slug === slug) ?? null;
}

/** Events, most recent first; events without a confirmed date go last. */
export async function listEvents(): Promise<EventItem[]> {
  return [...eventSource.events].sort((a, b) => {
    if (a.date === b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
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

export const cooperativesQuery = (params: CooperativeListParams = {}) =>
  queryOptions({ queryKey: ["cooperatives", "list", params], queryFn: () => listCooperatives(params) });

export const cooperativeLocationsQuery = () =>
  queryOptions({ queryKey: ["cooperatives", "locations"], queryFn: listCooperativeLocations });

export const cooperativeBySlugQuery = (slug: string) =>
  queryOptions({ queryKey: ["cooperatives", "slug", slug], queryFn: () => getCooperativeBySlug(slug) });

export const eventsQuery = () => queryOptions({ queryKey: ["events"], queryFn: listEvents });

export const partnersQuery = () => queryOptions({ queryKey: ["partners"], queryFn: listPartners });

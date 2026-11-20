import { Link } from "@tanstack/react-router";
import { Calendar } from "lucide-react";

import { MediaPlaceholder, type PlaceholderTone } from "@/components/site/MediaPlaceholder";
import { DemoBadge, PendingBadge } from "@/components/site/primitives";
import type { NewsArticle, NewsCategory } from "@/content/types";
import { formatOptionalDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const CATEGORY_TONE: Record<string, string> = {
  institucional: "bg-primary-deep text-primary-foreground",
  cooperativas: "bg-brand-blue text-primary-foreground",
  ambiente: "bg-primary text-primary-foreground",
  comunidade: "bg-accent text-accent-foreground",
  formacao: "bg-brand-red text-primary-foreground",
};

const CATEGORY_PLACEHOLDER: Record<string, PlaceholderTone> = {
  institucional: "deep",
  cooperativas: "blue",
  ambiente: "primary",
  comunidade: "accent",
  formacao: "red",
};

const categoryName = (slug: string, categories: NewsCategory[]) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

export function CategoryTag({
  slug,
  categories,
  className,
}: {
  slug: string;
  categories: NewsCategory[];
  className?: string;
}) {
  const name = categoryName(slug, categories);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider",
        CATEGORY_TONE[slug] ?? "bg-muted text-foreground",
        className,
      )}
    >
      {name}
    </span>
  );
}

export function NewsCard({
  article,
  categories,
  variant = "default",
}: {
  article: NewsArticle;
  categories: NewsCategory[];
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return (
      <article className="group grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4">
        <Link
          to="/noticias/$slug"
          params={{ slug: article.slug }}
          className="block aspect-[4/3] overflow-hidden rounded-lg bg-muted"
          tabIndex={-1}
          aria-hidden
        >
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt=""
              loading="lazy"
              width={320}
              height={240}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <MediaPlaceholder size="sm" tone={CATEGORY_PLACEHOLDER[article.categorySlug] ?? "primary"} />
          )}
        </Link>
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <CategoryTag slug={article.categorySlug} categories={categories} />
            {article.isDemo && <DemoBadge />}
            {article.pending && <PendingBadge />}
          </div>
          <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug">
            <Link
              to="/noticias/$slug"
              params={{ slug: article.slug }}
              className="transition-colors hover:text-primary"
            >
              {article.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{formatOptionalDate(article.publishedAt)}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        to="/noticias/$slug"
        params={{ slug: article.slug }}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
        tabIndex={-1}
        aria-hidden
      >
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt=""
            loading="lazy"
            width={800}
            height={500}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <MediaPlaceholder
            label={categoryName(article.categorySlug, categories)}
            tone={CATEGORY_PLACEHOLDER[article.categorySlug] ?? "primary"}
          />
        )}
        <span className="absolute left-4 top-4 flex gap-2">
          <CategoryTag slug={article.categorySlug} categories={categories} />
          {article.isDemo && <DemoBadge />}
            {article.pending && <PendingBadge />}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Calendar className="size-3.5" />
          <time dateTime={article.publishedAt ?? undefined}>{formatOptionalDate(article.publishedAt)}</time>
        </p>
        <h3 className="font-display text-xl font-semibold leading-snug">
          <Link
            to="/noticias/$slug"
            params={{ slug: article.slug }}
            className="transition-colors hover:text-primary"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
      </div>
    </article>
  );
}

/** Large editorial lead story. The photograph and editorial text remain in separate blocks
 * so the headline never competes with the image, especially on narrow screens. */
export function FeaturedNews({
  article,
  categories,
}: {
  article: NewsArticle;
  categories: NewsCategory[];
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-card shadow-lift transition-shadow hover:shadow-lift">
      <Link
        to="/noticias/$slug"
        params={{ slug: article.slug }}
        className="relative block aspect-[16/9] overflow-hidden bg-muted"
        aria-label={`Abrir notícia: ${article.title}`}
      >
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.coverAlt ?? ""}
            width={1600}
            height={900}
            loading="eager"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <MediaPlaceholder
            size="lg"
            variant="solid"
            showText={false}
            tone={CATEGORY_PLACEHOLDER[article.categorySlug] ?? "primary"}
            className="absolute inset-0"
          />
        )}
        <span className="absolute left-4 top-4 flex flex-wrap items-center gap-2 sm:left-6 sm:top-6">
          <span className="rounded bg-background px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-foreground shadow-sm">
            Em destaque
          </span>
          <CategoryTag slug={article.categorySlug} categories={categories} />
          {article.isDemo && <DemoBadge />}
          {article.pending && <PendingBadge />}
        </span>
      </Link>

      <div className="p-5 sm:p-7 md:p-8">
        <h2 className="max-w-3xl font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
          <Link
            to="/noticias/$slug"
            params={{ slug: article.slug }}
            className="transition-colors hover:text-primary"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-4 md:text-lg">
          {article.excerpt}
        </p>
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-4 text-xs text-muted-foreground sm:text-sm">
          <span className="inline-flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <time dateTime={article.publishedAt ?? undefined}>{formatOptionalDate(article.publishedAt)}</time>
          </span>
          {article.location && <span>{article.location}</span>}
        </p>
      </div>
    </article>
  );
}

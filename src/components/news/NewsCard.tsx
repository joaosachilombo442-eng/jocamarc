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

/** Large editorial lead story. */
export function FeaturedNews({
  article,
  categories,
}: {
  article: NewsArticle;
  categories: NewsCategory[];
}) {
  return (
    <article className="group relative isolate overflow-hidden rounded-2xl bg-ink shadow-lift">
      {article.coverImage ? (
        <img
          src={article.coverImage}
          alt={article.coverAlt ?? ""}
          width={1600}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
        />
      ) : (
        <MediaPlaceholder
          size="lg"
          variant="solid"
          showText={false}
          tone={CATEGORY_PLACEHOLDER[article.categorySlug] ?? "primary"}
          className="absolute inset-0 -z-10"
        />
      )}
      <div className="card-scrim absolute inset-0 -z-10" aria-hidden />
      <div className="flex min-h-[24rem] flex-col justify-end gap-0 p-5 text-ink-foreground sm:min-h-[28rem] sm:p-8 md:min-h-[32rem] md:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded bg-ink-foreground px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-ink">
            Em destaque
          </span>
          <CategoryTag slug={article.categorySlug} categories={categories} />
          {article.isDemo && <DemoBadge />}
            {article.pending && <PendingBadge />}
        </div>
        <h2 className="max-w-3xl text-2xl font-bold leading-[1.12] sm:text-3xl md:text-5xl">
          <Link
            to="/noticias/$slug"
            params={{ slug: article.slug }}
            className="after:absolute after:inset-0 hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-foreground/90 sm:text-base md:mt-4 md:text-lg">
          {article.excerpt}
        </p>
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-foreground/80 sm:text-sm">
          <Calendar className="size-4" />
          <time dateTime={article.publishedAt ?? undefined}>{formatOptionalDate(article.publishedAt)}</time>
          {article.location && <span>· {article.location}</span>}
        </p>
      </div>
    </article>
  );
}

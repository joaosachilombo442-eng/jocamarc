import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

import { CategoryTag, NewsCard } from "@/components/news/NewsCard";
import { ShareButtons } from "@/components/news/ShareButtons";
import { DemoBadge, DemoNotice } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { getRelatedNews, newsBySlugQuery, newsCategoriesQuery } from "@/content/api";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/noticias/$slug")({
  loader: async ({ context: { queryClient }, params }) => {
    const article = await queryClient.ensureQueryData(newsBySlugQuery(params.slug));
    if (!article) throw notFound();
    await queryClient.ensureQueryData(newsCategoriesQuery());
    const related = await getRelatedNews(article, 3);
    return { title: article.title, excerpt: article.excerpt, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — AJOCAMARC` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Notícia indisponível — AJOCAMARC" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-bold">Notícia não encontrada</h1>
      <p className="mt-3 text-muted-foreground">A notícia que procura não existe ou foi removida.</p>
      <Button asChild variant="brand" className="mt-8">
        <Link to="/noticias">Ver todas as notícias</Link>
      </Button>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { related } = Route.useLoaderData();
  const { data: article } = useSuspenseQuery(newsBySlugQuery(slug));
  const { data: categories } = useSuspenseQuery(newsCategoriesQuery());
  if (!article) return null;

  return (
    <article>
      <header className="container-site max-w-4xl pt-10 md:pt-14">
        <Link
          to="/noticias"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Notícias e Actualidade
        </Link>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <CategoryTag slug={article.categorySlug} categories={categories} />
          {article.isDemo && <DemoBadge />}
        </div>
        <h1 className="text-4xl font-extrabold leading-[1.08] md:text-6xl">{article.title}</h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <div className="mt-8 flex flex-col gap-4 border-y py-5 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" />
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </span>
            {article.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" /> {article.location}
              </span>
            )}
          </p>
          <ShareButtons title={article.title} />
        </div>
      </header>

      {article.coverImage && (
        <figure className="container-site mt-10 max-w-6xl">
          <img
            src={article.coverImage}
            alt={article.coverAlt ?? ""}
            width={1600}
            height={1000}
            className="aspect-[16/9] w-full rounded-2xl object-cover shadow-lift"
          />
          {article.coverAlt && (
            <figcaption className="mt-3 text-sm text-muted-foreground">{article.coverAlt}</figcaption>
          )}
        </figure>
      )}

      <div className="container-site max-w-3xl py-12 md:py-16">
        {article.isDemo && (
          <div className="mb-8">
            <DemoNotice>Este é um artigo de demonstração.</DemoNotice>
          </div>
        )}
        <div className="prose-site">
          {article.body.map((p, i) => (
            <p key={i} className={i === 0 ? "text-xl leading-relaxed" : ""}>
              {p}
            </p>
          ))}
        </div>
        <div className="mt-12 border-t pt-6">
          <ShareButtons title={article.title} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t bg-secondary py-16 md:py-20">
          <div className="container-site">
            <h2 className="mb-8 border-b-2 border-foreground pb-3 font-display text-sm font-bold uppercase tracking-[0.14em]">
              Leia também
            </h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <li key={a.id}>
                  <NewsCard article={a} categories={categories} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}

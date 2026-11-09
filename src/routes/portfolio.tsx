import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calendar, ChevronLeft, ChevronRight, Clapperboard, Expand, Images, MapPin, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CtaBand } from "@/components/site/CtaBand";
import { DemoBadge, Reveal } from "@/components/site/primitives";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { albumsQuery } from "@/content/api";
import type { PortfolioAlbum, PortfolioPhoto, PortfolioVideo } from "@/content/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — Fotografias e vídeos da AJOCAMARC" },
      {
        name: "description",
        content: "Galeria de fotografias e vídeos das actividades e projectos da AJOCAMARC e dos jovens catadores.",
      },
      { property: "og:title", content: "Portfólio — AJOCAMARC" },
      { property: "og:description", content: "Fotografias e vídeos das actividades da AJOCAMARC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(albumsQuery()),
  component: PortfolioPage,
});

type FlatPhoto = PortfolioPhoto & { album: PortfolioAlbum };

function PortfolioPage() {
  const { data: albums } = useSuspenseQuery(albumsQuery());
  const [tab, setTab] = useState<"fotos" | "videos">("fotos");
  const [category, setCategory] = useState<string>("Todas");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = ["Todas", ...Array.from(new Set(albums.map((a) => a.category)))];
  const visibleAlbums = category === "Todas" ? albums : albums.filter((a) => a.category === category);
  const flatPhotos: FlatPhoto[] = useMemo(
    () => visibleAlbums.flatMap((a) => a.photos.map((p) => ({ ...p, album: a }))),
    [visibleAlbums],
  );
  const videos = visibleAlbums.flatMap((a) => a.videos.map((v) => ({ ...v, album: a })));
  const photoCount = albums.reduce((n, a) => n + a.photos.length, 0);
  const videoCount = albums.reduce((n, a) => n + a.videos.length, 0);

  return (
    <div className="bg-ink text-ink-foreground">
      <section className="container-site pb-10 pt-14 md:pt-20">
        <p className="eyebrow mb-3 text-accent">Portfólio</p>
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h1 className="text-5xl font-extrabold leading-[0.95] md:text-8xl">
            O trabalho
            <br />
            <span className="text-accent">em imagens</span>
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-ink-muted">
            Fotografias e vídeos das actividades e projectos da AJOCAMARC, organizados por álbum, com
            data e local.
          </p>
        </div>
        {albums.some((a) => a.isDemo) && (
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 px-4 py-1.5 text-sm text-ink-muted">
            <DemoBadge /> Álbuns de demonstração — serão substituídos pelas fotografias oficiais.
          </p>
        )}
      </section>

      <div className="sticky top-[5.25rem] z-30 border-y border-ink-foreground/10 bg-ink/95 backdrop-blur">
        <div className="container-site flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Tipo de conteúdo" className="flex gap-1 rounded-full bg-ink-foreground/5 p-1">
            <TabButton active={tab === "fotos"} onClick={() => setTab("fotos")} Icon={Images} label={`Fotografias (${photoCount})`} />
            <TabButton active={tab === "videos"} onClick={() => setTab("videos")} Icon={Clapperboard} label={`Vídeos (${videoCount})`} />
          </div>
          <div className="flex gap-2 overflow-x-auto" aria-label="Categorias">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  category === c ? "bg-accent text-accent-foreground" : "text-ink-muted hover:text-ink-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="container-site py-14 md:py-20">
        {tab === "fotos" ? (
          <div className="space-y-20">
            {visibleAlbums.map((album) => (
              <AlbumBlock
                key={album.id}
                album={album}
                onOpen={(photoId) => setLightbox(flatPhotos.findIndex((p) => p.id === photoId))}
              />
            ))}
          </div>
        ) : videos.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2">
            {videos.map((v) => (
              <li key={v.id}>
                <VideoPlayer video={v} />
                <p className="mt-3 font-display text-lg font-semibold">{v.title}</p>
                <p className="text-sm text-ink-muted">{v.album.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-ink-foreground/20 p-12 text-center">
            <Clapperboard className="mx-auto size-10 text-accent" />
            <p className="mt-4 font-display text-2xl font-semibold">Ainda não há vídeos publicados</p>
            <p className="mt-2 text-ink-muted">
              Os vídeos das actividades da AJOCAMARC aparecerão aqui assim que forem adicionados.
            </p>
          </div>
        )}
      </section>

      <Lightbox photos={flatPhotos} index={lightbox} onChange={setLightbox} />

      <div className="bg-background text-foreground">
        <CtaBand />
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  Icon: typeof Images;
  label: string;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active ? "bg-ink-foreground text-ink" : "text-ink-muted hover:text-ink-foreground",
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}

function AlbumBlock({ album, onOpen }: { album: PortfolioAlbum; onOpen: (photoId: string) => void }) {
  return (
    <Reveal as="article">
      <header className="mb-8 grid gap-4 border-b border-ink-foreground/10 pb-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{album.category}</span>
            {album.isDemo && <DemoBadge />}
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">{album.title}</h2>
          <p className="mt-2 max-w-2xl text-ink-muted">{album.description}</p>
        </div>
        <p className="flex flex-wrap gap-4 text-sm text-ink-muted">
          {album.date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" /> {album.date}
            </span>
          )}
          {album.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" /> {album.location}
            </span>
          )}
        </p>
      </header>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {album.photos.map((p) => (
          <li key={p.id} className="mb-4 break-inside-avoid">
            <button
              onClick={() => onOpen(p.id)}
              className="group relative block w-full overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`Ampliar fotografia: ${p.alt}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                width={p.width}
                height={p.height}
                className="w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="card-scrim absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/70 opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function Lightbox({
  photos,
  index,
  onChange,
}: {
  photos: FlatPhoto[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const open = index !== null && index >= 0 && index < photos.length;
  const photo = open ? photos[index] : null;

  const go = useCallback(
    (delta: number) => {
      if (index === null || photos.length === 0) return;
      onChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onChange(null)}>
      <DialogContent className="max-w-6xl border-none bg-ink p-0 text-ink-foreground sm:rounded-2xl [&>button]:hidden">
        {photo && (
          <div className="relative">
            <img src={photo.src} alt={photo.alt} className="max-h-[78vh] w-full rounded-t-2xl object-contain" />
            <button
              onClick={() => onChange(null)}
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink/80 hover:bg-ink"
              aria-label="Fechar"
            >
              <X className="size-5" />
            </button>
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ink/80 hover:bg-accent"
                  aria-label="Fotografia anterior"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ink/80 hover:bg-accent"
                  aria-label="Fotografia seguinte"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
            <div className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <DialogTitle className="font-display text-lg">{photo.album.title}</DialogTitle>
                <DialogDescription className="text-sm text-ink-muted">{photo.alt}</DialogDescription>
              </div>
              <p className="text-sm text-ink-muted">
                {(index ?? 0) + 1} / {photos.length}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function VideoPlayer({ video }: { video: PortfolioVideo }) {
  const isFile = /\.(mp4|webm|mov)(\?|$)/i.test(video.url);
  return (
    <div className="aspect-video overflow-hidden rounded-xl bg-ink-foreground/5">
      {isFile ? (
        <video src={video.url} poster={video.poster} controls preload="metadata" className="h-full w-full" />
      ) : (
        <iframe
          src={video.url}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      )}
    </div>
  );
}

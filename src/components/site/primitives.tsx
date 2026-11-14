import { Link } from "@tanstack/react-router";
import { ChevronRight, FilePenLine, Info } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Fades content in once it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-12",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">{title}</h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

type Crumb = { label: string; to?: string };

/** Inner-page header with breadcrumb. */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  /** Original AJOCAMARC photograph only (see src/content/media.ts). */
  image?: { src: string; alt: string; width: number; height: number; position: string };
}) {
  return (
    <section className="relative overflow-hidden border-b bg-primary-soft">
      {image && (
        <>
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: image.position }}
            width={image.width}
            height={image.height}
          />
          <div className="hero-scrim absolute inset-0" aria-hidden />
        </>
      )}
      <div className={cn("container-site relative py-14 md:py-20", image && "text-ink-foreground")}>
        <nav aria-label="Localização" className="mb-6">
          <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", image ? "text-ink-muted" : "text-muted-foreground")}>
            <li>
              <Link to="/" className="hover:underline">
                Início
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden />
                {c.to ? (
                  <Link to={c.to} className="hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className={image ? "text-ink-foreground" : "text-foreground"}>
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className={cn("eyebrow mb-3", image && "text-accent")}>{eyebrow}</p>
        <h1 className="max-w-3xl animate-fade-up text-4xl font-extrabold leading-[1.05] md:text-6xl">{title}</h1>
        {description && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-lg leading-relaxed",
              image ? "text-ink-foreground/85" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

/** Editable slot for official content that the association has not confirmed yet. */
export function PendingContent({
  title,
  hint = "Conteúdo oficial a confirmar pela AJOCAMARC.",
  className,
  children,
}: {
  title?: string;
  hint?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl border border-dashed border-primary/35 bg-primary-soft/60 p-6",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-semibold text-primary-deep">
        <FilePenLine className="size-3.5" />
        Espaço editável
      </span>
      {title && <p className="font-display text-lg font-semibold text-foreground">{title}</p>}
      <p className="text-sm leading-relaxed text-muted-foreground">{hint}</p>
      {children}
    </div>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-brand-yellow/60 bg-brand-yellow-soft px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-foreground",
        className,
      )}
      title="Conteúdo de demonstração"
    >
      Exemplo
    </span>
  );
}

export function DemoNotice({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-xl border border-brand-yellow/50 bg-brand-yellow-soft px-4 py-3 text-sm text-foreground"
    >
      <Info className="mt-0.5 size-4 shrink-0 text-accent" />
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

/** Marks a publication whose topic is confirmed but whose official text is still to be supplied. */
export function PendingBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/40 bg-primary-soft px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary-deep",
        className,
      )}
      title="Texto oficial a publicar"
    >
      Texto a publicar
    </span>
  );
}

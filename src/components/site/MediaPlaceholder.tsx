import { Recycle, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const TONES = {
  primary: { solid: "bg-primary text-primary-foreground", soft: "bg-primary-soft text-primary", chip: "text-primary" },
  deep: { solid: "bg-primary-deep text-primary-foreground", soft: "bg-primary-soft text-primary-deep", chip: "text-primary-deep" },
  accent: { solid: "bg-accent text-accent-foreground", soft: "bg-accent-soft text-accent", chip: "text-accent" },
  blue: { solid: "bg-brand-blue text-primary-foreground", soft: "bg-brand-blue-soft text-brand-blue", chip: "text-brand-blue" },
  red: { solid: "bg-brand-red text-primary-foreground", soft: "bg-brand-red-soft text-brand-red", chip: "text-brand-red" },
  ink: { solid: "bg-ink text-ink-foreground", soft: "bg-secondary text-foreground", chip: "text-foreground" },
} as const;

export type PlaceholderTone = keyof typeof TONES;

/**
 * Institutional composition shown where no original AJOCAMARC photograph exists yet.
 * Never replace it with generated or stock imagery.
 *
 * `soft` (default) is a light, patterned panel; `solid` is a saturated backdrop for
 * text overlaid on top (e.g. the featured news card).
 */
export function MediaPlaceholder({
  label,
  tone = "primary",
  size = "md",
  variant = "soft",
  showText = true,
  Icon = Recycle,
  className,
}: {
  label?: string;
  tone?: PlaceholderTone;
  size?: "sm" | "md" | "lg";
  variant?: "soft" | "solid";
  /** Hide the label block when other text is overlaid on the panel. */
  showText?: boolean;
  Icon?: LucideIcon;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <div
      aria-hidden
      className={cn(
        "relative isolate flex h-full w-full overflow-hidden",
        variant === "solid" ? t.solid : t.soft,
        className,
      )}
    >
      <div className="placeholder-pattern absolute inset-0 -z-10 opacity-[0.07]" />
      <Recycle
        className={cn(
          "absolute -z-10 opacity-[0.12]",
          size === "sm" ? "-bottom-3 -right-3 size-16" : "-bottom-10 -right-8 size-56",
          size === "lg" && "size-80",
        )}
        strokeWidth={1.1}
      />
      {size === "sm" && (
        <span className={cn("m-auto grid h-9 w-9 place-items-center rounded-full bg-background shadow-soft", t.chip)}>
          <Icon className="size-4" />
        </span>
      )}
      {size !== "sm" && showText && (
        <div className="m-auto flex flex-col items-center px-6 text-center">
          <span
            className={cn(
              "grid h-14 w-14 place-items-center rounded-full shadow-soft",
              variant === "solid" ? "bg-background/15" : cn("bg-background", t.chip),
            )}
          >
            <Icon className="size-6" />
          </span>
          {label && (
            <p className={cn("mt-4 font-display font-bold leading-tight", size === "lg" ? "text-3xl" : "text-lg")}>
              {label}
            </p>
          )}
          <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] opacity-70">
            Fotografia a publicar
          </p>
        </div>
      )}
      {variant === "soft" && <span className="brand-stripe absolute inset-x-0 bottom-0 h-1" />}
    </div>
  );
}

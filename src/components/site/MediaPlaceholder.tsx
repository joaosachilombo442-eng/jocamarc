import { Recycle } from "lucide-react";

import { cn } from "@/lib/utils";

const TONES = {
  primary: "bg-primary text-primary-foreground",
  deep: "bg-primary-deep text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  blue: "bg-brand-blue text-primary-foreground",
  red: "bg-brand-red text-primary-foreground",
  ink: "bg-ink text-ink-foreground",
} as const;

export type PlaceholderTone = keyof typeof TONES;

/**
 * Institutional typographic panel shown where no original AJOCAMARC photograph exists.
 * Never replace it with generated or stock imagery.
 */
export function MediaPlaceholder({
  label,
  tone = "primary",
  size = "md",
  showText = true,
  className,
}: {
  label?: string;
  tone?: PlaceholderTone;
  size?: "sm" | "md" | "lg";
  /** Hide the label block when other text is overlaid on the panel. */
  showText?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("relative isolate flex h-full w-full overflow-hidden", TONES[tone], className)}
    >
      <Recycle
        className={cn(
          "absolute -z-10 opacity-15",
          size === "sm" ? "-bottom-3 -right-3 size-16" : "-bottom-10 -right-8 size-56",
          size === "lg" && "size-80",
        )}
        strokeWidth={1.25}
      />
      {size !== "sm" && showText && (
        <div className="mt-auto p-6">
          {label && (
            <p
              className={cn(
                "font-display font-extrabold uppercase leading-none tracking-tight",
                size === "lg" ? "text-4xl md:text-5xl" : "text-2xl",
              )}
            >
              {label}
            </p>
          )}
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] opacity-75">AJOCAMARC</p>
        </div>
      )}
    </div>
  );
}

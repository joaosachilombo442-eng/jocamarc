import { Link } from "@tanstack/react-router";

import logo from "@/assets/ajocamarc-logo.webp.asset.json";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Official logo, used as-is (never redrawn). */
export function LogoImage({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt={`Logótipo da ${site.shortName} — ${site.tagline}`}
      width={480}
      height={480}
      className={cn("object-contain", className)}
    />
  );
}

export function LogoLink({ withName = true }: { withName?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex min-w-0 items-center gap-3"
      aria-label={`${site.shortName} — página inicial`}
    >
      <LogoImage className="h-14 w-14 shrink-0 sm:h-16 sm:w-16" />
      {withName && (
        <span className="hidden min-w-0 flex-col leading-tight md:flex">
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
            {site.shortName}
          </span>
          <span className="max-w-[14rem] truncate text-[0.7rem] font-medium text-muted-foreground">
            Jovens Catadores de Angola
          </span>
        </span>
      )}
    </Link>
  );
}

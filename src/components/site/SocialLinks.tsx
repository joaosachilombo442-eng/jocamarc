import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const NETWORKS = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "youtube", label: "YouTube", Icon: Youtube },
] as const;

/** Renders confirmed profiles as links; unconfirmed ones as muted, non-clickable icons. */
export function SocialLinks({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul className="flex items-center gap-2">
      {NETWORKS.map(({ key, label, Icon }) => {
        const url = site.social[key];
        const base = cn(
          "grid h-10 w-10 place-items-center rounded-full border transition-colors",
          tone === "dark"
            ? "border-ink-foreground/15 text-ink-foreground"
            : "border-border text-foreground",
        );
        return (
          <li key={key}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(base, "hover:border-accent hover:bg-accent hover:text-accent-foreground")}
              >
                <Icon className="size-4" />
              </a>
            ) : (
              <span
                className={cn(base, "cursor-not-allowed opacity-40")}
                title={`${label} — perfil a confirmar`}
                aria-label={`${label}: perfil a confirmar`}
              >
                <Icon className="size-4" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

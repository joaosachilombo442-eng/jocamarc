import { Facebook, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The two community links supplied by the association: the WhatsApp GROUP invite and
 * the Facebook link. Both open externally, with the exact URLs from site config.
 */
const WRAP = { default: "h-auto min-h-9 whitespace-normal py-2 text-center", lg: "h-auto min-h-12 whitespace-normal py-3 text-center" };

export function CommunityButtons({
  tone = "light",
  size = "lg",
  className,
  stacked = false,
}: {
  /** `light` for white backgrounds, `dark` for green/ink backgrounds. */
  tone?: "light" | "dark";
  size?: "default" | "lg";
  stacked?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", !stacked && "sm:flex-row sm:flex-wrap", className)}>
      <Button asChild variant="cta" size={size} className={WRAP[size]}>
        <a href={site.community.whatsappGroup} target="_blank" rel="noopener noreferrer">
          <MessageCircle />
          {site.community.whatsappLabel}
        </a>
      </Button>
      <Button
        asChild
        variant={tone === "dark" ? "outline-light" : "outline-brand"}
        size={size}
        className={WRAP[size]}
      >
        <a href={site.community.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook />
          {site.community.facebookLabel}
        </a>
      </Button>
    </div>
  );
}

/** Click-to-call links for the confirmed phone numbers. */
export function PhoneLinks({ className, linkClassName }: { className?: string; linkClassName?: string }) {
  return (
    <ul className={cn("space-y-1.5", className)}>
      {site.contacts.phones.map((p) => (
        <li key={p.tel}>
          <a href={`tel:${p.tel}`} className={cn("font-medium transition-colors", linkClassName)}>
            {p.display}
          </a>
        </li>
      ))}
    </ul>
  );
}

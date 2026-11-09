import { ImageIcon } from "lucide-react";

import type { Partner } from "@/content/types";

/** Shows confirmed partners, or reserved logo slots while none are confirmed. */
export function PartnerSlots({ partners, slots = 6 }: { partners: Partner[]; slots?: number }) {
  if (partners.length > 0) {
    return (
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((p) => (
          <li key={p.id} className="flex h-28 items-center justify-center rounded-xl border bg-card p-4">
            {p.logo ? (
              <img src={p.logo} alt={p.name} className="max-h-16 w-auto object-contain" loading="lazy" />
            ) : (
              <span className="text-center text-sm font-semibold">{p.name}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" aria-label="Espaços reservados para logótipos de parceiros">
      {Array.from({ length: slots }, (_, i) => (
        <li
          key={i}
          className="flex h-28 flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/50 text-muted-foreground"
        >
          <ImageIcon className="size-5" aria-hidden />
          <span className="text-[0.7rem] font-medium uppercase tracking-wider">Logótipo</span>
        </li>
      ))}
    </ul>
  );
}

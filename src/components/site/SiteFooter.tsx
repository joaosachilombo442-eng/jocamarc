import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { mainNav, PENDING_LABEL, site } from "@/config/site";

import { LogoImage } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const contacts = [
    { Icon: Phone, label: "Telefone", value: site.contacts.phone },
    { Icon: Mail, label: "E-mail", value: site.contacts.email },
    { Icon: MapPin, label: "Endereço", value: site.contacts.address },
  ];

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="brand-stripe h-1 w-full" aria-hidden />
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="inline-flex rounded-xl bg-background p-2">
            <LogoImage className="h-20 w-20" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            A {site.shortName} reúne jovens catadores de materiais recicláveis em Angola. Nascida de
            uma iniciativa em {site.origin.place}, em {site.origin.year}, foi constituída em{" "}
            {site.foundedYear}.
          </p>
          <SocialLinks tone="dark" />
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Instituição
          </h2>
          <ul className="space-y-2.5 text-sm">
            {mainNav.slice(0, 5).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-ink-foreground/85 transition-colors hover:text-accent">
                  {item.full}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Acompanhe
          </h2>
          <ul className="space-y-2.5 text-sm">
            {mainNav.slice(5).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-ink-foreground/85 transition-colors hover:text-accent">
                  {item.full}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contactos" className="text-ink-foreground/85 transition-colors hover:text-accent">
                Contactos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Contactos
          </h2>
          <ul className="space-y-3 text-sm">
            {contacts.map(({ Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  <span className="block text-xs text-ink-muted">{label}</span>
                  <span className={value ? "" : "italic text-ink-muted"}>{value ?? PENDING_LABEL}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            <span className="font-semibold text-ink-foreground">{site.shortName}</span> — {site.fullName}
          </p>
          <p>
            © {year} {site.shortName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

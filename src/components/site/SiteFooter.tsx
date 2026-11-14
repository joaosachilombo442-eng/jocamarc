import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";

import { mainNav, site } from "@/config/site";

import { CommunityButtons, PhoneLinks } from "./CommunityButtons";
import { LogoImage } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="brand-stripe h-1 w-full" aria-hidden />
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <div className="inline-flex rounded-xl bg-background p-2">
            <LogoImage className="h-20 w-20" />
          </div>
          <p className="font-display text-base font-semibold leading-snug">{site.fullName}</p>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            A {site.shortName} reúne jovens catadores de materiais recicláveis em Angola. Nascida de
            uma iniciativa em {site.origin.place}, em {site.origin.year}, foi constituída em{" "}
            {site.foundedYear}, e conta hoje com {site.cooperativesAssociated} cooperativas associadas.
          </p>
          <CommunityButtons tone="dark" size="default" stacked className="max-w-sm" />
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
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                <span className="mb-1 block text-xs text-ink-muted">Telefone</span>
                <PhoneLinks linkClassName="hover:text-accent" />
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                <span className="mb-1 block text-xs text-ink-muted">Onde estamos</span>
                <ul className="space-y-1.5">
                  {site.locations.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p className="leading-relaxed">
            <span className="font-semibold text-ink-foreground">{site.shortName}</span> — {site.legal.legalForm}
            {" · "}NIF {site.legal.nif}
            {" · "}Registo fiscal {site.legal.fiscalRegistrationDate}
            {" · "}Domicílio fiscal: {site.legal.fiscalAddress}
            {" · "}Repartição fiscal {site.legal.taxOffice}
          </p>
          <p>
            © {year} {site.shortName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

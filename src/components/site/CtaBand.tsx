import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

import { CommunityButtons } from "./CommunityButtons";

export function CtaBand() {
  return (
    <section className="container-site py-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12 md:py-16">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary-deep/40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-brand-blue/80"
          aria-hidden
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/80">
              Participação e cooperação
            </p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
              Juntos pela economia circular em Angola
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/85">
              Instituições, empresas, comunidades e cidadãos que pretendam colaborar com a AJOCAMARC
              e com os jovens catadores podem entrar em contacto connosco.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-2 font-semibold">
                <Phone className="size-4" /> Ligue-nos:
              </span>
              {site.contacts.phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="font-medium underline-offset-4 hover:underline"
                >
                  {p.display}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <CommunityButtons tone="dark" stacked />
            <Button asChild variant="outline-light" size="lg">
              <Link to="/contactos">
                Fale connosco
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

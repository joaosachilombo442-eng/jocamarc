import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="container-site py-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12 md:py-16">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/90"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-brand-blue/80"
          aria-hidden
        />
        <div className="relative grid gap-8 md:grid-cols-[1.5fr_auto] md:items-center">
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
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button asChild variant="cta" size="lg">
              <Link to="/contactos">
                Fale connosco
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/cooperativas-parceiros">Cooperativas e parceiros</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

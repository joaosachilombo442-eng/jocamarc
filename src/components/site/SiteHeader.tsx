import { Link } from "@tanstack/react-router";
import { Menu, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav, site } from "@/config/site";
import { cn } from "@/lib/utils";

import { LogoImage, LogoLink } from "./Logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background/95 backdrop-blur transition-shadow",
        scrolled ? "shadow-soft" : "",
      )}
    >
      <div className="brand-stripe h-1 w-full" aria-hidden />
      <div className="container-site grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 xl:grid-cols-[auto_1fr_auto]">
        <LogoLink />

        <nav aria-label="Navegação principal" className="hidden justify-center xl:flex">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  title={item.full}
                  activeOptions={{ exact: item.to === "/" }}
                  className="relative rounded-md px-3 py-2 text-[0.9rem] font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary-deep data-[status=active]:after:absolute data-[status=active]:after:inset-x-3 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:rounded-full data-[status=active]:after:bg-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="cta" size="lg" className="hidden sm:inline-flex">
            <Link to="/contactos">
              Contactos
              <ArrowRight />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline-brand" size="icon" className="h-11 w-11 xl:hidden" aria-label="Abrir menu">
                <Menu className="!size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[88vw] max-w-sm flex-col gap-0 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="brand-stripe h-1 w-full" aria-hidden />
              <div className="flex items-center gap-3 border-b px-6 py-5">
                <LogoImage className="h-12 w-12" />
                <div className="leading-tight">
                  <p className="font-display font-extrabold">{site.shortName}</p>
                  <p className="text-xs text-muted-foreground">{site.tagline}</p>
                </div>
              </div>
              <nav aria-label="Navegação móvel" className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                  {[...mainNav, { to: "/contactos", label: "Contactos", full: "Contactos" } as const].map(
                    (item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          activeOptions={{ exact: item.to === "/" }}
                          className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted data-[status=active]:bg-primary-soft data-[status=active]:text-primary-deep"
                        >
                          {item.full}
                          <ArrowRight className="size-4 text-muted-foreground" />
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
              <div className="border-t p-5">
                <Button asChild variant="cta" size="lg" className="w-full">
                  <Link to="/contactos" onClick={() => setOpen(false)}>
                    Contacte-nos
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHeader } from "@/components/site/primitives";
import { SocialLinks } from "@/components/site/SocialLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PENDING_LABEL, site } from "@/config/site";
import { submitContactMessage } from "@/content/api";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos — AJOCAMARC" },
      {
        name: "description",
        content: "Entre em contacto com a AJOCAMARC — Associação dos Jovens Catadores de Materiais Recicláveis de Angola.",
      },
      { property: "og:title", content: "Contactos — AJOCAMARC" },
      { property: "og:description", content: "Fale com a AJOCAMARC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Indique o seu nome").max(100),
  email: z.string().trim().email("Indique um e-mail válido").max(255),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(3, "Indique o assunto").max(150),
  message: z.string().trim().min(10, "A mensagem deve ter pelo menos 10 caracteres").max(2000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function ContactPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        next[key] ??= issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    const result = await submitContactMessage(parsed.data);
    setSending(false);
    if (result.ok) {
      toast.success("Mensagem enviada. Obrigado pelo contacto.");
      form.reset();
    } else {
      toast.info("O envio de mensagens ainda não está activo", {
        description: "Este formulário será ligado brevemente. Por favor, tente mais tarde.",
      });
    }
  };

  const info = [
    { Icon: Phone, label: "Telefone", value: site.contacts.phone, href: site.contacts.phone ? `tel:${site.contacts.phone}` : null },
    { Icon: Mail, label: "E-mail", value: site.contacts.email, href: site.contacts.email ? `mailto:${site.contacts.email}` : null },
    { Icon: MapPin, label: "Endereço", value: site.contacts.address, href: null },
    { Icon: Clock, label: "Horário", value: site.contacts.hours, href: null },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Fale connosco"
        title="Contactos"
        description="Para cooperação institucional, imprensa ou informações sobre o trabalho dos jovens catadores, escreva-nos."
        crumbs={[{ label: "Contactos" }]}
      />

      <section className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {info.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                  {value ? (
                    href ? (
                      <a href={href} className="mt-1 block font-medium hover:text-primary">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium">{value}</p>
                    )
                  ) : (
                    <p className="mt-1 italic text-muted-foreground">{PENDING_LABEL}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div>
            <p className="mb-3 text-sm font-semibold">Redes sociais</p>
            <SocialLinks />
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-2xl border bg-card p-6 shadow-soft sm:p-10">
          <h2 className="text-2xl font-bold">Envie-nos uma mensagem</h2>
          <p className="mt-2 text-sm text-muted-foreground">Os campos assinalados com * são obrigatórios.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Nome *" error={errors.name}>
              <Input id="name" name="name" autoComplete="name" className="h-11" aria-invalid={!!errors.name} />
            </Field>
            <Field id="email" label="E-mail *" error={errors.email}>
              <Input id="email" name="email" type="email" autoComplete="email" className="h-11" aria-invalid={!!errors.email} />
            </Field>
            <Field id="phone" label="Telefone" error={errors.phone}>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" className="h-11" />
            </Field>
            <Field id="subject" label="Assunto *" error={errors.subject}>
              <Input id="subject" name="subject" className="h-11" aria-invalid={!!errors.subject} />
            </Field>
            <div className="sm:col-span-2">
              <Field id="message" label="Mensagem *" error={errors.message}>
                <Textarea id="message" name="message" rows={6} aria-invalid={!!errors.message} />
              </Field>
            </div>
          </div>
          <Button type="submit" variant="cta" size="lg" className="mt-8 w-full sm:w-auto" disabled={sending}>
            {sending ? "A enviar…" : "Enviar mensagem"}
            <Send />
          </Button>
        </form>
      </section>

      <section className="container-site pb-20">
        <div className="overflow-hidden rounded-2xl border shadow-soft">
          <iframe
            title={`Mapa — ${site.map.label}`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(site.map.bbox)}&layer=mapnik&marker=${encodeURIComponent(site.map.marker)}`}
            loading="lazy"
            className="h-[26rem] w-full border-0"
          />
          <p className="flex items-center gap-2 border-t bg-secondary px-5 py-3 text-sm text-muted-foreground">
            <MapPin className="size-4 text-accent" />
            Mapa indicativo — {site.map.label}, local de origem da iniciativa. Endereço oficial a confirmar.
          </p>
        </div>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

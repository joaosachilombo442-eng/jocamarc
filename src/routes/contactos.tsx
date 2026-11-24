import { createFileRoute } from "@tanstack/react-router";
import { Clock, ExternalLink, FileText, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { CommunityButtons, PhoneLinks } from "@/components/site/CommunityButtons";
import { PageHeader } from "@/components/site/primitives";
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
        content: "Telefones, localizações, comunidade no WhatsApp e identificação institucional da AJOCAMARC — Associação dos Jovens Catadores de Materiais Recicláveis de Angola.",
      },
      { property: "og:title", content: "Contactos — AJOCAMARC" },
      { property: "og:description", content: "Telefones, localizações e comunidade da AJOCAMARC." },
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

  const legal = [
    { label: "Nome", value: site.fullName },
    { label: "Sigla", value: site.shortName },
    { label: "Natureza jurídica", value: site.legal.legalForm },
    { label: "NIF", value: site.legal.nif },
    { label: "Data de registo fiscal", value: site.legal.fiscalRegistrationDate },
    { label: "Domicílio fiscal", value: site.legal.fiscalAddress },
    { label: "Repartição fiscal", value: site.legal.taxOffice },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Fale connosco"
        title="Contactos"
        description="Para cooperação institucional, imprensa ou informações sobre o trabalho da AJOCAMARC e dos catadores de materiais recicláveis, escreva-nos."
        crumbs={[{ label: "Contactos" }]}
      />

      <section className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <InfoCard Icon={Phone} label="Telefone">
              <PhoneLinks className="mt-1" linkClassName="hover:text-primary" />
            </InfoCard>
            <InfoCard Icon={MapPin} label="Onde estamos">
              <ul className="mt-1 space-y-1.5">
                {site.locations.map((l) => (
                  <li key={l} className="font-medium">
                    {l}
                  </li>
                ))}
              </ul>
            </InfoCard>
            <InfoCard Icon={Mail} label="E-mail">
              {site.contacts.email ? (
                <a href={`mailto:${site.contacts.email}`} className="mt-1 block font-medium hover:text-primary">
                  {site.contacts.email}
                </a>
              ) : (
                <p className="mt-1 italic text-muted-foreground">{PENDING_LABEL}</p>
              )}
            </InfoCard>
            <InfoCard Icon={Clock} label="Horário">
              <p className={site.contacts.hours ? "mt-1 font-medium" : "mt-1 italic text-muted-foreground"}>
                {site.contacts.hours ?? PENDING_LABEL}
              </p>
            </InfoCard>
          </ul>
          <div className="rounded-xl border bg-primary-soft p-5">
            <p className="mb-1 text-sm font-semibold">Comunidade AJOCAMARC</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Junte-se ao grupo no WhatsApp e acompanhe as nossas publicações no Facebook.
            </p>
            <CommunityButtons stacked size="default" />
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-2xl border bg-card p-6 shadow-soft sm:p-10">
          <h2 className="text-2xl font-bold">Envie-nos uma mensagem</h2>
          <p className="mt-2 text-sm text-muted-foreground">Os campos assinalados com * são obrigatórios.</p>
          <p role="status" className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-muted-foreground">
            O formulário ainda não está ligado ao sistema de recepção de mensagens. Para um contacto efectivo, utilize os números de telefone indicados nesta página.
          </p>
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

      <section className="container-site grid gap-6 pb-20 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border bg-card p-6 shadow-soft sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <MapPin className="size-5 text-accent" /> Referências de localização
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {site.locations.map((l) => (
              <li key={l} className="flex flex-col justify-between gap-4 rounded-xl bg-secondary p-5">
                <p className="font-semibold leading-snug">{l}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Procurar no mapa <ExternalLink className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Referências indicadas pela AJOCAMARC. A pesquisa no mapa é feita pelo nome do local.
          </p>
        </div>

        <div className="rounded-2xl border bg-secondary p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <FileText className="size-4" /> Identificação institucional
          </h2>
          <dl className="mt-5 grid gap-3 text-sm">
            {legal.map((row) => (
              <div key={row.label} className="grid grid-cols-[9.5rem_minmax(0,1fr)] gap-3 border-b border-border/70 pb-3 last:border-0 last:pb-0">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
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
  error?: string | undefined;
  children: ReactNode;
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

function InfoCard({
  Icon,
  label,
  children,
}: {
  Icon: typeof Phone;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-soft">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        {children}
      </div>
    </li>
  );
}

import { Facebook, Link2, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

/** Social share links. The URL is read from the browser at click time. */
export function ShareButtons({ title }: { title: string }) {
  const open = (build: (url: string, text: string) => string) => () => {
    const url = window.location.href;
    window.open(build(encodeURIComponent(url), encodeURIComponent(title)), "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Ligação copiada");
    } catch {
      toast.error("Não foi possível copiar a ligação");
    }
  };

  const items = [
    { label: "Partilhar no Facebook", Icon: Facebook, onClick: open((u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`) },
    { label: "Partilhar no WhatsApp", Icon: MessageCircle, onClick: open((u, t) => `https://wa.me/?text=${t}%20${u}`) },
    { label: "Partilhar no X", Icon: Twitter, onClick: open((u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`) },
    { label: "Partilhar no LinkedIn", Icon: Linkedin, onClick: open((u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`) },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted-foreground">Partilhar</span>
      {items.map(({ label, Icon, onClick }) => (
        <Button
          key={label}
          type="button"
          variant="outline-brand"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label={label}
          title={label}
          onClick={onClick}
        >
          <Icon />
        </Button>
      ))}
      <Button
        type="button"
        variant="outline-brand"
        size="icon"
        className="h-10 w-10 rounded-full"
        aria-label="Copiar ligação"
        title="Copiar ligação"
        onClick={copy}
      >
        <Link2 />
      </Button>
    </div>
  );
}

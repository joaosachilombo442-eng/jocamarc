/**
 * Institutional identity of AJOCAMARC.
 *
 * Only confirmed information lives here. Fields set to `null` are not yet
 * confirmed by the association and render as "a confirmar" placeholders —
 * fill them in (or move them to the future admin panel) instead of inventing data.
 */
export const site = {
  shortName: "AJOCAMARC",
  fullName: "Associação dos Jovens Catadores de Materiais Recicláveis de Angola",
  tagline: "Juntos pela Economia Circular",
  country: "Angola",
  origin: { year: 2020, place: "Cacuaco" },
  foundedYear: 2021,
  cooperativesFounded: 5,

  contacts: {
    /** Confirmed by the association. `tel` is the dialable form used in tel: links. */
    phones: [
      { display: "+244 929 624 857", tel: "+244929624857" },
      { display: "+244 923 266 385", tel: "+244923266385" },
    ],
    email: null as string | null,
    hours: null as string | null,
  },

  /** Location references supplied by the association. Not the fiscal address; no coordinates are known. */
  locations: ["Zango 4, Município do Calumbo", "Casa da Juventude, Viana, Luanda"],

  /** Fiscal identification. Shown discreetly; the fiscal certificate itself is never published. */
  legal: {
    legalForm: "Associação",
    nif: "5001153617",
    fiscalRegistrationDate: "05/09/2022",
    fiscalAddress: "Rua da 8.ª Esquadra, PR 28",
    taxOffice: "04.05 — RF Viana",
  },

  /** WhatsApp community GROUP invite (not a direct chat) and the Facebook link, exactly as supplied. */
  community: {
    whatsappGroup: "https://chat.whatsapp.com/D3j8UAqhhNDKifPxIASFR5?s=cl&p=i&mlu=4&ilr=4&iam=2",
    whatsappLabel: "Junte-se à comunidade AJOCAMARC",
    facebook: "https://www.facebook.com/share/p/1ExtsxdeqQ/?mibextid=wwXIfr",
    facebookLabel: "Acompanhe a AJOCAMARC no Facebook",
  },

  social: {
    facebook: "https://www.facebook.com/share/p/1ExtsxdeqQ/?mibextid=wwXIfr" as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
    youtube: null as string | null,
  },
} as const;

export const mainNav = [
  { to: "/", label: "Início", full: "Início" },
  { to: "/historia", label: "História", full: "História da AJOCAMARC" },
  { to: "/missao-visao-valores", label: "Missão", full: "Missão, Visão e Valores" },
  { to: "/actividades", label: "Actividades", full: "Actividades e Projectos" },
  { to: "/cooperativas-parceiros", label: "Cooperativas", full: "Cooperativas e Parceiros" },
  { to: "/noticias", label: "Notícias", full: "Notícias e Actualidade" },
  { to: "/portfolio", label: "Portfólio", full: "Portfólio" },
] as const;

export const PENDING_LABEL = "A confirmar";

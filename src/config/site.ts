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
    phone: null as string | null,
    email: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },

  /** Indicative map area only (place of origin). Replace with the official address when confirmed. */
  map: {
    label: "Cacuaco, Luanda",
    bbox: "13.29,-8.83,13.42,-8.74",
    marker: "-8.7833,13.3667",
  },

  social: {
    facebook: null as string | null,
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

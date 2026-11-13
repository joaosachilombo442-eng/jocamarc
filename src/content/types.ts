/**
 * Content model. Mirrors the tables the future admin panel (Lovable Cloud) will manage,
 * so swapping the demo source for real queries only touches src/content/api.ts.
 */

export type NewsCategory = {
  slug: string;
  name: string;
};

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  categorySlug: string;
  /** Only original AJOCAMARC photographs; null renders a typographic placeholder. */
  coverImage: string | null;
  coverAlt: string | null;
  /** ISO date; null while the association has not confirmed it. */
  publishedAt: string | null;
  author?: string;
  location?: string;
  featured?: boolean;
  /** Demonstration content: shown with an "Exemplo" badge until replaced by official publications. */
  isDemo?: boolean;
  /** Topic confirmed by the association, official text still to be supplied. */
  pending?: boolean;
};

export type EventFlyer = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  /** ISO date as printed on the flyer; null when not supplied. */
  date: string | null;
  location: string | null;
  description: string | null;
  /** Points printed on the flyer (e.g. objectives), reproduced as-is. */
  highlights: string[];
  flyer: EventFlyer | null;
};

export type ProjectStatus = "planeado" | "em-curso" | "concluido";

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  area: string;
  images: { src: string; alt: string }[];
  date?: string;
  location?: string;
  institutions: string[];
  status?: ProjectStatus;
  isDemo?: boolean;
};

export type PortfolioPhoto = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PortfolioVideo = {
  id: string;
  title: string;
  /** YouTube/Vimeo embed URL or a direct .mp4 URL. */
  url: string;
  poster?: string;
};

export type PortfolioAlbum = {
  id: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  location?: string;
  projectSlug?: string;
  photos: PortfolioPhoto[];
  videos: PortfolioVideo[];
  isDemo?: boolean;
};

export type CooperativeLogo = { src: string; alt: string; width: number; height: number };

/** One cooperative of the AJOCAMARC network. Any field not supplied by the association is null. */
export type Cooperative = {
  id: string;
  slug: string;
  /** Short display name, as written on the logo or supplied by the association. */
  name: string;
  /** Full legal designation, when supplied or printed on the logo. */
  fullName: string | null;
  acronym: string | null;
  /** Kind of cooperative as printed on the logo (e.g. "Saneamento básico"). */
  kind: string | null;
  location: string | null;
  foundedAt: string | null; // ISO date
  president: string | null;
  members: { total: number; men: number | null; women: number | null } | null;
  ageRange: string | null;
  materials: string[];
  phones: { display: string; tel: string }[];
  nif: string | null;
  logo: CooperativeLogo | null;
  description: string | null;
};

export type Partner = {
  id: string;
  name: string;
  type: string;
  logo?: string | null;
  url?: string | null;
};

export type ContactMessage = {
  name: string;
  email: string;
  phone?: string | undefined;
  subject: string;
  message: string;
};

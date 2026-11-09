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
  publishedAt: string; // ISO date
  author?: string;
  location?: string;
  featured?: boolean;
  /** Demonstration content: shown with an "Exemplo" badge until replaced by official publications. */
  isDemo?: boolean;
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

export type Cooperative = {
  id: string;
  name: string | null;
  foundedYear: number | null;
  location: string | null;
  description: string | null;
  logo?: string | null;
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

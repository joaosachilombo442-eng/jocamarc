import { describe, expect, it } from "vitest";

import { site } from "@/config/site";
import { listAlbums, listCooperatives, listNews, listPartners, listProjects, NEWS_PAGE_SIZE } from "@/content/api";
import { photos } from "@/content/media";
import { actionAreas, timeline } from "@/content/institutional";

describe("Confirmed institutional facts", () => {
  it("the initiative started in Cacuaco in 2020", () => {
    expect(site.origin).toEqual({ year: 2020, place: "Cacuaco" });
  });

  it("the association was constituted in 2021, not 2020", () => {
    expect(site.foundedYear).toBe(2021);
    const constitution = timeline.find((e) => e.title === "Constituição da AJOCAMARC");
    expect(constitution?.year).toBe("2021");
  });

  it("five cooperatives were constituted in 2021", async () => {
    const coops = await listCooperatives();
    expect(coops).toHaveLength(5);
    expect(coops.every((c) => c.foundedYear === 2021)).toBe(true);
  });
});

describe("No invented institutional data", () => {
  it("cooperative names stay empty until confirmed", async () => {
    const coops = await listCooperatives();
    expect(coops.every((c) => c.name === null)).toBe(true);
  });

  it("no partner is published until confirmed", async () => {
    expect(await listPartners()).toEqual([]);
  });

  it("e-mail, hours and unconfirmed social profiles stay empty", () => {
    expect(site.contacts.email).toBeNull();
    expect(site.contacts.hours).toBeNull();
    expect(site.social.instagram).toBeNull();
    expect(site.social.linkedin).toBeNull();
    expect(site.social.youtube).toBeNull();
  });

  it("every sample news item is flagged as demonstration", async () => {
    const { items } = await listNews({ page: 1 });
    expect(items.every((n) => n.isDemo)).toBe(true);
  });
});

describe("News listing", () => {
  it("paginates by page size", async () => {
    const first = await listNews({ page: 1 });
    expect(first.items.length).toBeLessThanOrEqual(NEWS_PAGE_SIZE);
    expect(first.pageCount).toBe(Math.ceil(first.total / NEWS_PAGE_SIZE));
  });

  it("filters by category and accent-insensitive search", async () => {
    const coops = await listNews({ category: "cooperativas" });
    expect(coops.items.every((n) => n.categorySlug === "cooperativas")).toBe(true);
    const found = await listNews({ q: "sensibilizacao" });
    expect(found.items.some((n) => n.title.includes("sensibilização"))).toBe(true);
  });
});

describe("Only original AJOCAMARC photographs", () => {
  const supplied = new Set(Object.values(photos).map((p) => p.src));

  it("every portfolio photo is one supplied by the association", async () => {
    const albums = await listAlbums();
    const all = albums.flatMap((a) => a.photos);
    expect(all.length).toBeGreaterThan(0);
    expect(all.every((p) => supplied.has(p.src))).toBe(true);
  });

  it("supplied photos are served from the asset CDN, not bundled files", () => {
    expect([...supplied].every((src) => src.startsWith("/__l5e/assets-v1/"))).toBe(true);
  });

  it("demo news and projects carry no photograph, so real photos never illustrate invented events", async () => {
    const { items } = await listNews({ page: 1 });
    expect(items.every((n) => n.coverImage === null)).toBe(true);
    const projects = await listProjects();
    expect(projects.filter((p) => p.isDemo).every((p) => p.images.length === 0)).toBe(true);
  });
});

describe("Confirmed contacts and fiscal identity", () => {
  it("lists exactly the two supplied phone numbers, dialable", () => {
    expect(site.contacts.phones).toEqual([
      { display: "+244 929 624 857", tel: "+244929624857" },
      { display: "+244 923 266 385", tel: "+244923266385" },
    ]);
  });

  it("uses the WhatsApp group invite, not a direct-chat link", () => {
    expect(site.community.whatsappGroup).toBe(
      "https://chat.whatsapp.com/D3j8UAqhhNDKifPxIASFR5?s=cl&p=i&mlu=4&ilr=4&iam=2",
    );
    expect(site.community.whatsappLabel).toBe("Junte-se à comunidade AJOCAMARC");
  });

  it("uses the exact Facebook link", () => {
    expect(site.community.facebook).toBe("https://www.facebook.com/share/p/1ExtsxdeqQ/?mibextid=wwXIfr");
    expect(site.community.facebookLabel).toBe("Acompanhe a AJOCAMARC no Facebook");
  });

  it("keeps the location references separate from the fiscal address", () => {
    expect(site.locations).toEqual(["Zango 4, Município do Calumbo", "Casa da Juventude, Viana, Luanda"]);
    expect(site.locations).not.toContain(site.legal.fiscalAddress);
  });

  it("carries the supplied fiscal data", () => {
    expect(site.legal).toEqual({
      legalForm: "Associação",
      nif: "5001153617",
      fiscalRegistrationDate: "05/09/2022",
      fiscalAddress: "Rua da 8.ª Esquadra, PR 28",
      taxOffice: "04.05 — RF Viana",
    });
  });
});

describe("Activity cards use only original photographs", () => {
  it("every area photo is one supplied by AJOCAMARC", () => {
    const supplied = new Set(Object.values(photos).map((p) => p.src));
    for (const area of actionAreas) {
      if (area.photo) expect(supplied.has(area.photo.src)).toBe(true);
    }
  });
});

import { describe, expect, it } from "vitest";

import { site } from "@/config/site";
import {
  getCooperativeBySlug,
  listAlbums,
  listCooperativeLocations,
  listCooperatives,
  listEvents,
  listNews,
  listPartners,
  listProjects,
  NEWS_PAGE_SIZE,
  PENDING_LOCATION,
} from "@/content/api";
import { cooperativeLogos, flyers, photos } from "@/content/media";
import { actionAreas, missionVisionValues, timeline } from "@/content/institutional";

describe("Confirmed institutional facts", () => {
  it("the initiative started in Cacuaco in 2020", () => {
    expect(site.origin).toEqual({ year: 2020, place: "Cacuaco" });
  });

  it("the association was constituted in 2021, not 2020", () => {
    expect(site.foundedYear).toBe(2021);
    const constitution = timeline.find((e) => e.title === "Constituição da AJOCAMARC");
    expect(constitution?.year).toBe("2021");
  });

  it("five cooperatives were constituted in 2021", () => {
    expect(site.cooperativesFounded).toBe(5);
    expect(timeline.find((e) => e.title === "Constituição das cinco cooperativas")?.year).toBe("2021");
  });

  it("the association has 150 associated cooperatives", () => {
    expect(site.cooperativesAssociated).toBe(150);
  });
});

describe("No invented institutional data", () => {
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

  it("publishes only the two requested news items, without invented text or date", async () => {
    const { items, total } = await listNews({ page: 1 });
    expect(total).toBe(2);
    expect(items.map((n) => n.slug).sort()).toEqual([
      "entrada-da-ajocamarc-no-cnj",
      "relatorio-anual-de-residuos-de-angola-2025",
    ]);
    expect(items.every((n) => n.pending && n.body.length === 0 && n.publishedAt === null)).toBe(true);
  });
});

describe("News listing", () => {
  it("paginates by page size", async () => {
    const first = await listNews({ page: 1 });
    expect(first.items.length).toBeLessThanOrEqual(NEWS_PAGE_SIZE);
    expect(first.pageCount).toBe(Math.ceil(first.total / NEWS_PAGE_SIZE));
  });

  it("filters by category and accent-insensitive search", async () => {
    const inst = await listNews({ category: "institucional" });
    expect(inst.items.map((n) => n.slug)).toEqual(["entrada-da-ajocamarc-no-cnj"]);
    const found = await listNews({ q: "residuos" });
    expect(found.items.map((n) => n.slug)).toEqual(["relatorio-anual-de-residuos-de-angola-2025"]);
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

  it("news without a supplied photo stays empty and demo project images are original thematic photos", async () => {
    const { items } = await listNews({ page: 1 });
    expect(items.every((n) => n.coverImage === null)).toBe(true);
    const projects = await listProjects();
    const demos = projects.filter((p) => p.isDemo);
    expect(demos).toHaveLength(4);
    expect(demos.slice(0, 3).every((p) => p.images.length === 1)).toBe(true);
    expect(demos.slice(0, 3).flatMap((p) => p.images).every((image) => supplied.has(image.src))).toBe(true);
    expect(demos.slice(0, 3).map((p) => p.images[0]?.src)).toEqual([
      photos.triagemCartao.src,
      photos.encontroArLivre.src,
      photos.reciclagemPapel.src,
    ]);
    expect(demos[3]?.images).toEqual([]);
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

describe("Official mission, vision and values", () => {
  it("uses the supplied mission and vision wording", () => {
    expect(missionVisionValues.mission).toBe(
      "Promover a organização, representação, dignificação e inclusão socioeconómica dos catadores de materiais recicláveis em Angola, através do associativismo, formação profissional, fortalecimento das cooperativas, empreendedorismo verde e valorização dos resíduos.",
    );
    expect(missionVisionValues.vision).toBe(
      "Ser uma organização nacional de referência e reconhecimento internacional, contribuindo para uma Angola mais limpa, inclusiva e sustentável.",
    );
  });

  it("lists the twelve values and eight principles, with no invented descriptions", () => {
    expect(missionVisionValues.values).toHaveLength(12);
    expect(missionVisionValues.values).toContain("Igualdade de oportunidades");
    expect(missionVisionValues.principles).toEqual([
      "Justiça social",
      "Democracia participativa",
      "Legalidade",
      "Igualdade",
      "Protecção ambiental",
      "Economia circular",
      "Cooperação",
      "Valorização dos catadores",
    ]);
  });

  it("states the institutional commitment", () => {
    expect(missionVisionValues.commitment).toBe(
      "Transformar a actividade dos catadores numa actividade económica organizada, reconhecida, dignificada e sustentável.",
    );
  });
});

describe("Cooperativas integradas", () => {
  it("preserves the eight original cooperatives with their supplied logos", async () => {
    const coops = await listCooperatives();
    expect(coops).toHaveLength(28);
    const original = coops.slice(0, 8);
    const logos = new Set(Object.values(cooperativeLogos).map((l) => l.src));
    expect(original.every((c) => c.logo !== null && logos.has(c.logo.src))).toBe(true);
    expect([...logos].every((src) => src.startsWith("/__l5e/assets-v1/"))).toBe(true);
  });

  it("Mbongo Paxi carries exactly the supplied details", async () => {
    const c = await getCooperativeBySlug("mbongo-paxi");
    expect(c?.location).toBe("Cacuaco, Luanda");
    expect(c?.president).toBe("David Paxi João");
    expect(c?.members).toEqual({ total: 15, men: 11, women: 4 });
    expect(c?.materials).toEqual(["Plástico", "Papel", "Papelão", "Latas", "Outros"]);
    expect(c?.phones.map((p) => p.display)).toEqual(["938 236 248", "925 079 931"]);
    expect(c?.nif).toBe("5002430053");
  });

  it("Dilangangu Kuanzambi carries exactly the supplied details", async () => {
    const c = await getCooperativeBySlug("dilangangu-kuanzambi");
    expect(c?.fullName).toBe("Cooperativa de Saneamento Básico Dilangangu Kuanzambi, R.L.");
    expect(c?.foundedAt).toBe("2022-02-02");
    expect(c?.president).toBe("Alexandre Domingos Daniel");
    expect(c?.members).toEqual({ total: 25, men: 15, women: 10 });
    expect(c?.ageRange).toBe("18 a 50 anos");
    expect(c?.materials).toEqual(["Plástico", "Papel", "Papelão", "Garrafas", "Alumínio"]);
  });

  it("the other six cooperatives have no invented president, members, location or contacts", async () => {
    const coops = await listCooperatives();
    const others = coops.slice(0, 8).filter((c) => !["mbongo-paxi", "dilangangu-kuanzambi"].includes(c.slug));
    expect(others).toHaveLength(6);
    for (const c of others) {
      expect(c.president).toBeNull();
      expect(c.members).toBeNull();
      expect(c.location).toBeNull();
      expect(c.foundedAt).toBeNull();
      expect(c.phones).toEqual([]);
      expect(c.materials).toEqual([]);
    }
  });

  it("searches by name ignoring accents and filters by location", async () => {
    expect((await listCooperatives({ q: "raizes" })).map((c) => c.slug)).toEqual(["raizes-4as"]);
    expect((await listCooperatives({ q: "CSBN" })).map((c) => c.slug)).toEqual(["nakulima"]);
    expect((await listCooperatives({ location: "Cacuaco, Luanda" })).map((c) => c.slug)).toEqual(["mbongo-paxi"]);
    expect(await listCooperatives({ location: PENDING_LOCATION })).toHaveLength(26);
    expect(await listCooperativeLocations()).toEqual(["Cacuaco, Luanda", "Luanda, Angola"]);
  });
});

describe("Eventos", () => {
  it("shows the Dande conference exactly as printed on its flyer", async () => {
    const [ev] = await listEvents();
    expect(ev?.title).toBe("I Conferência Municipal do Dande — Gestão de Resíduos e Desenvolvimento Local");
    expect(ev?.date).toBe("2026-10-30");
    expect(ev?.location).toBe("Dande");
    expect(ev?.flyer?.src).toBe(flyers.conferenciaDande.src);
    expect(ev?.flyer?.src.startsWith("/__l5e/assets-v1/")).toBe(true);
  });
});

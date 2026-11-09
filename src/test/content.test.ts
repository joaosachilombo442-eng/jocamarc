import { describe, expect, it } from "vitest";

import { site } from "@/config/site";
import { listCooperatives, listNews, listPartners, NEWS_PAGE_SIZE } from "@/content/api";
import { timeline } from "@/content/institutional";

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

  it("contacts and social profiles stay empty until confirmed", () => {
    expect(Object.values(site.contacts).every((v) => v === null)).toBe(true);
    expect(Object.values(site.social).every((v) => v === null)).toBe(true);
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

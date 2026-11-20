import { describe, expect, it } from "vitest";
import { cooperatives } from "@/content/cooperatives";
import asset0 from "@/assets/cooperativas/ccaac.webp.asset.json";
import asset1 from "@/assets/cooperativas/decsu.webp.asset.json";
import asset2 from "@/assets/cooperativas/ambiental-regente.webp.asset.json";
import asset3 from "@/assets/cooperativas/nuxima.webp.asset.json";
import asset4 from "@/assets/cooperativas/4a-recicla.webp.asset.json";
import asset5 from "@/assets/cooperativas/jovens-unidos.webp.asset.json";
import asset6 from "@/assets/cooperativas/logo-nif-5001653008.webp.asset.json";
import asset7 from "@/assets/cooperativas/bengo-limpa.webp.asset.json";
import asset8 from "@/assets/cooperativas/cooperbengo.webp.asset.json";
import asset9 from "@/assets/cooperativas/calumbo.webp.asset.json";
import asset10 from "@/assets/cooperativas/jurdsp.webp.asset.json";
import asset11 from "@/assets/cooperativas/coamcib.webp.asset.json";
import asset12 from "@/assets/cooperativas/caibvr.webp.asset.json";
import asset13 from "@/assets/cooperativas/muzalana-recicla.webp.asset.json";
import asset14 from "@/assets/cooperativas/salv.webp.asset.json";
import asset15 from "@/assets/cooperativas/logo-emblema-jft.webp.asset.json";
import asset16 from "@/assets/cooperativas/mama-super-limpinha.webp.asset.json";

describe("Explicit cooperative logo identity", () => {
  it("caridade-cd uses ccaac.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "caridade-cd");
    expect(asset0.original_filename).toBe("ccaac.webp");
    expect(asset0.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset0.url);
    expect(coop?.logo?.width).toBe(492);
    expect(coop?.logo?.height).toBe(461);
  });
  it("decsu uses decsu.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "decsu");
    expect(asset1.original_filename).toBe("decsu.webp");
    expect(asset1.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset1.url);
    expect(coop?.logo?.width).toBe(569);
    expect(coop?.logo?.height).toBe(569);
  });
  it("ambiental-regente uses ambiental-regente.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "ambiental-regente");
    expect(asset2.original_filename).toBe("ambiental-regente.webp");
    expect(asset2.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset2.url);
    expect(coop?.logo?.width).toBe(640);
    expect(coop?.logo?.height).toBe(640);
  });
  it("muxima-saudavel-e-limpo uses nuxima.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "muxima-saudavel-e-limpo");
    expect(asset3.original_filename).toBe("nuxima.webp");
    expect(asset3.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset3.url);
    expect(coop?.logo?.width).toBe(1599);
    expect(coop?.logo?.height).toBe(867);
  });
  it("ambiental-44-recicla uses 4a-recicla.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "ambiental-44-recicla");
    expect(asset4.original_filename).toBe("4a-recicla.webp");
    expect(asset4.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset4.url);
    expect(coop?.logo?.width).toBe(1599);
    expect(coop?.logo?.height).toBe(867);
  });
  it("jovens-unidos uses jovens-unidos.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "jovens-unidos");
    expect(asset5.original_filename).toBe("jovens-unidos.webp");
    expect(asset5.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset5.url);
    expect(coop?.logo?.width).toBe(521);
    expect(coop?.logo?.height).toBe(521);
  });
  it("ambiental-lunguzo uses logo-nif-5001653008.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "ambiental-lunguzo");
    expect(asset6.original_filename).toBe("logo-nif-5001653008.webp");
    expect(asset6.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset6.url);
    expect(coop?.logo?.width).toBe(1599);
    expect(coop?.logo?.height).toBe(1131);
  });
  it("bengo-limpa uses bengo-limpa.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "bengo-limpa");
    expect(asset7.original_filename).toBe("bengo-limpa.webp");
    expect(asset7.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset7.url);
    expect(coop?.logo?.width).toBe(640);
    expect(coop?.logo?.height).toBe(640);
  });
  it("cooperbengo uses cooperbengo.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "cooperbengo");
    expect(asset8.original_filename).toBe("cooperbengo.webp");
    expect(asset8.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset8.url);
    expect(coop?.logo?.width).toBe(1600);
    expect(coop?.logo?.height).toBe(1503);
  });
  it("calumbo-reciclar-para-brilhar uses calumbo.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "calumbo-reciclar-para-brilhar");
    expect(asset9.original_filename).toBe("calumbo.webp");
    expect(asset9.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset9.url);
    expect(coop?.logo?.width).toBe(1599);
    expect(coop?.logo?.height).toBe(1594);
  });
  it("jurdsp uses jurdsp.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "jurdsp");
    expect(asset10.original_filename).toBe("jurdsp.webp");
    expect(asset10.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset10.url);
    expect(coop?.logo?.width).toBe(1484);
    expect(coop?.logo?.height).toBe(1060);
  });
  it("coamcib uses coamcib.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "coamcib");
    expect(asset11.original_filename).toBe("coamcib.webp");
    expect(asset11.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset11.url);
    expect(coop?.logo?.width).toBe(640);
    expect(coop?.logo?.height).toBe(640);
  });
  it("caibvr uses caibvr.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "caibvr");
    expect(asset12.original_filename).toBe("caibvr.webp");
    expect(asset12.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset12.url);
    expect(coop?.logo?.width).toBe(1024);
    expect(coop?.logo?.height).toBe(1024);
  });
  it("muzalana-recicla uses muzalana-recicla.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "muzalana-recicla");
    expect(asset13.original_filename).toBe("muzalana-recicla.webp");
    expect(asset13.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset13.url);
    expect(coop?.logo?.width).toBe(1599);
    expect(coop?.logo?.height).toBe(867);
  });
  it("solucoes-ambientais-luanda-verde uses salv.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "solucoes-ambientais-luanda-verde");
    expect(asset14.original_filename).toBe("salv.webp");
    expect(asset14.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset14.url);
    expect(coop?.logo?.width).toBe(720);
    expect(coop?.logo?.height).toBe(1392);
  });
  it("cooperativa-jt-comercio-prestacao-servicos uses logo-emblema-jft.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "cooperativa-jt-comercio-prestacao-servicos");
    expect(asset15.original_filename).toBe("logo-emblema-jft.webp");
    expect(asset15.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset15.url);
    expect(coop?.logo?.width).toBe(714);
    expect(coop?.logo?.height).toBe(1599);
  });
  it("mama-super-limpinha uses mama-super-limpinha.webp", () => {
    const coop = cooperatives.find((c) => c.slug === "mama-super-limpinha");
    expect(asset16.original_filename).toBe("mama-super-limpinha.webp");
    expect(asset16.content_type).toBe("image/webp");
    expect(coop?.logo?.src).toBe(asset16.url);
    expect(coop?.logo?.width).toBe(720);
    expect(coop?.logo?.height).toBe(970);
  });
  it("zango-saudavel-e-limpo has no substitute logo while its file is missing", () => {
    const coop = cooperatives.find((c) => c.slug === "zango-saudavel-e-limpo");
    expect(coop).toBeDefined();
    expect(coop?.logo).toBeNull();
  });
  it("zango-recicla has no substitute logo while its file is missing", () => {
    const coop = cooperatives.find((c) => c.slug === "zango-recicla");
    expect(coop).toBeDefined();
    expect(coop?.logo).toBeNull();
  });
  it("jovens-sonhadores has no substitute logo while its file is missing", () => {
    const coop = cooperatives.find((c) => c.slug === "jovens-sonhadores");
    expect(coop).toBeDefined();
    expect(coop?.logo).toBeNull();
  });
  it("keeps 28 unique records, 25 unique logos and exactly three missing logos", () => {
    expect(cooperatives).toHaveLength(28);
    expect(new Set(cooperatives.map((c) => c.id)).size).toBe(28);
    expect(new Set(cooperatives.map((c) => c.slug)).size).toBe(28);
    const logos = cooperatives.flatMap((c) => c.logo ? [c.logo.src] : []);
    expect(logos).toHaveLength(25);
    expect(new Set(logos).size).toBe(25);
  });
});

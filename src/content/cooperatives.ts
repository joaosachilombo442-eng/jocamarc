/**
 * COOPERATIVAS INTEGRADAS — confirmed records only.
 *
 * AJOCAMARC has 150 associated cooperatives (see `site.cooperativesAssociated`); they are
 * registered here progressively. Mbongo Paxi and Dilangangu Kuanzambi carry the details
 * supplied by the association; the other six are known only from the logos they supplied,
 * so they carry just what is printed on the logo (name, kind, NIF). Every other field stays
 * null and renders "A confirmar" — never fill it in without confirmation.
 */
import { cooperativeLogos as logos } from "./media";
import type { Cooperative } from "./types";

const blank = {
  fullName: null,
  acronym: null,
  kind: null,
  location: null,
  foundedAt: null,
  president: null,
  members: null,
  ageRange: null,
  materials: [],
  phones: [],
  nif: null,
  description: null,
} satisfies Partial<Cooperative>;

export const cooperatives: Cooperative[] = [
  {
    ...blank,
    id: "coop-mbongo-paxi",
    slug: "mbongo-paxi",
    name: "Mbongo Paxi, R.L.",
    location: "Cacuaco, Luanda",
    president: "David Paxi João",
    members: { total: 15, men: 11, women: 4 },
    materials: ["Plástico", "Papel", "Papelão", "Latas", "Outros"],
    phones: [
      { display: "938 236 248", tel: "+244938236248" },
      { display: "925 079 931", tel: "+244925079931" },
    ],
    nif: "5002430053",
    logo: logos.mbongoPaxi,
  },
  {
    ...blank,
    id: "coop-dilangangu-kuanzambi",
    slug: "dilangangu-kuanzambi",
    name: "Dilangangu Kuanzambi, R.L.",
    fullName: "Cooperativa de Saneamento Básico Dilangangu Kuanzambi, R.L.",
    kind: "Saneamento básico",
    foundedAt: "2022-02-02",
    president: "Alexandre Domingos Daniel",
    members: { total: 25, men: 15, women: 10 },
    ageRange: "18 a 50 anos",
    materials: ["Plástico", "Papel", "Papelão", "Garrafas", "Alumínio"],
    logo: logos.dilangangu,
  },
  {
    ...blank,
    id: "coop-nakulima",
    slug: "nakulima",
    name: "Nakulima, R.L.",
    fullName: "Cooperativa de Saneamento Básico Nakulima, R.L.",
    acronym: "CSBN",
    kind: "Saneamento básico",
    nif: "5002267659",
    logo: logos.nakulima,
  },
  {
    ...blank,
    id: "coop-jovens-batalhadores-de-angola",
    slug: "jovens-batalhadores-de-angola",
    name: "Jovens Batalhadores de Angola, R.L.",
    fullName: "Cooperativa de Saneamento Básico Jovens Batalhadores de Angola, R.L.",
    acronym: "C.S.B.J.B.A.",
    kind: "Saneamento básico",
    logo: logos.batalhadores,
  },
  {
    ...blank,
    id: "coop-funda-umpare",
    slug: "funda-umpare",
    name: "Funda Umpare",
    fullName: "Cooperativa Ambiental Funda Umpare",
    acronym: "CAFL",
    kind: "Ambiental",
    nif: "5002272296",
    logo: logos.fundaUmpare,
  },
  {
    ...blank,
    id: "coop-lusevikueno-kaka",
    slug: "lusevikueno-kaka",
    name: "Lusevikueno Kaka, R.L.",
    fullName: "Cooperativa de Prestação de Serviços Lusevikueno Kaka, R.L.",
    kind: "Prestação de serviços",
    logo: logos.lusevikueno,
  },
  {
    ...blank,
    id: "coop-raizes-4as",
    slug: "raizes-4as",
    name: "Raízes 4As",
    fullName: "Raízes 4As — Cooperativa Agropecuária",
    kind: "Agropecuária",
    logo: logos.raizes,
  },
  {
    ...blank,
    id: "coop-kuyelissa",
    slug: "kuyelissa",
    name: "Kuyelissa, R.L.",
    fullName: "Cooperativa de Saneamento Básico Kuyelissa, R.L.",
    kind: "Saneamento básico",
    nif: "5002323230",
    logo: logos.kuyelissa,
  },
];

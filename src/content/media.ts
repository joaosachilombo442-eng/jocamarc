/**
 * ORIGINAL AJOCAMARC PHOTOGRAPHS — supplied by the association.
 *
 * This is the only image source allowed on the site: AI-generated and stock imagery are
 * forbidden. Captions describe only what is visible; dates, places and names that the
 * association has not confirmed are left out. `position` is the CSS object-position used
 * when a photo is cropped, chosen so people and key details stay in frame.
 */
import camiao from "@/assets/photos/camiao-garrafas-plastico.webp.asset.json";
import catadoresContentor from "@/assets/photos/campo-catadores-contentor.webp.asset.json";
import triagemCartao from "@/assets/photos/campo-catadores-triagem-cartao.webp.asset.json";
import conversaColete from "@/assets/photos/campo-conversa-catador-colete.webp.asset.json";
import grupoEdificio from "@/assets/photos/campo-grupo-catadores-edificio.webp.asset.json";
import grupoRua from "@/assets/photos/campo-grupo-catadores-rua.webp.asset.json";
import grupoContentor from "@/assets/photos/campo-grupo-junto-contentor.webp.asset.json";
import registoRua from "@/assets/photos/campo-registo-rua-garcia-neto.webp.asset.json";
import reciclagemPapel from "@/assets/photos/contentor-reciclagem-papel.webp.asset.json";
import encontroArLivre from "@/assets/photos/encontro-ao-ar-livre.webp.asset.json";
import encontroGabinete from "@/assets/photos/encontro-institucional-gabinete.webp.asset.json";
import encontroSala from "@/assets/photos/encontro-institucional-sala.webp.asset.json";

import type { PortfolioAlbum, PortfolioPhoto } from "./types";

export type SitePhoto = PortfolioPhoto & { position: string };

const p = (
  id: string,
  asset: { url: string },
  alt: string,
  width: number,
  height: number,
  position = "50% 50%",
): SitePhoto => ({ id, src: asset.url, alt, width, height, position });

export const photos = {
  grupoRua: p(
    "grupo-rua",
    grupoRua,
    "Grupo de catadores e membros da equipa reunidos numa rua, junto a uma vedação vermelha e a materiais recolhidos",
    1200,
    1600,
    "50% 52%",
  ),
  grupoEdificio: p(
    "grupo-edificio",
    grupoEdificio,
    "Catadores e membros da equipa posam juntos numa rua da cidade, ao lado de caixas de cartão recolhidas",
    1200,
    1600,
    "50% 52%",
  ),
  catadoresContentor: p(
    "catadores-contentor",
    catadoresContentor,
    "Catadores junto a um contentor e a materiais recolhidos, acompanhados por membros da equipa",
    1600,
    1200,
    "40% 55%",
  ),
  registoRua: p(
    "registo-rua",
    registoRua,
    "Membro da equipa toma notas junto de um catador, ao lado de uma técnica da Administração Municipal do Sambizanga",
    1200,
    1600,
    "50% 45%",
  ),
  conversaColete: p(
    "conversa-colete",
    conversaColete,
    "Técnica da Administração Municipal do Sambizanga conversa com um catador de colete refletor",
    1200,
    1600,
    "55% 45%",
  ),
  grupoContentor: p(
    "grupo-contentor",
    grupoContentor,
    "Catadores e membros da equipa reunidos junto a um contentor, ao lado de cartão e caixas recolhidas",
    1600,
    1200,
    "45% 50%",
  ),
  triagemCartao: p(
    "triagem-cartao",
    triagemCartao,
    "Catadores separam cartão e outros materiais junto a um contentor numa rua da cidade",
    1200,
    1600,
    "50% 50%",
  ),
  camiao: p(
    "camiao",
    camiao,
    "Camião carregado com garrafas de plástico recolhidas para reciclagem",
    960,
    1280,
    "50% 50%",
  ),
  encontroArLivre: p(
    "encontro-ar-livre",
    encontroArLivre,
    "Participantes sentados num encontro ao ar livre, sob uma cobertura, com materiais recolhidos ao fundo",
    1280,
    720,
    "50% 50%",
  ),
  encontroGabinete: p(
    "encontro-gabinete",
    encontroGabinete,
    "Quatro pessoas, uma delas com colete da AJOCAMARC, num encontro institucional em gabinete",
    1402,
    1122,
    "50% 50%",
  ),
  encontroSala: p(
    "encontro-sala",
    encontroSala,
    "Fotografia de grupo num encontro institucional, numa sala com a bandeira de Angola",
    1448,
    1086,
    "50% 50%",
  ),
  reciclagemPapel: p(
    "reciclagem-papel",
    reciclagemPapel,
    "Participante sentado numa sala, ao lado de um contentor azul para reciclagem de papel",
    1106,
    1422,
    "50% 50%",
  ),
} satisfies Record<string, SitePhoto>;

/** Portfolio albums built only from the photographs above. */
export const albums: PortfolioAlbum[] = [
  {
    id: "album-trabalho-de-campo",
    title: "Trabalho de campo com catadores",
    description:
      "Encontros com catadores nas ruas, junto a contentores e a pontos de recolha de materiais recicláveis. Data e local a confirmar pela AJOCAMARC.",
    category: "Trabalho de campo",
    photos: [
      photos.catadoresContentor,
      photos.grupoRua,
      photos.triagemCartao,
      photos.grupoContentor,
      photos.registoRua,
      photos.conversaColete,
      photos.grupoEdificio,
    ],
    videos: [],
  },
  {
    id: "album-recolha-e-transporte",
    title: "Recolha e transporte de materiais",
    description:
      "Materiais recicláveis recolhidos e preparados para transporte. Data e local a confirmar pela AJOCAMARC.",
    category: "Recolha",
    photos: [photos.camiao],
    videos: [],
  },
  {
    id: "album-encontros",
    title: "Encontros e reuniões",
    description:
      "Encontros institucionais e reuniões em que a AJOCAMARC participou. Data, local e participantes a confirmar pela AJOCAMARC.",
    category: "Encontros",
    photos: [photos.encontroSala, photos.encontroGabinete, photos.encontroArLivre, photos.reciclagemPapel],
    videos: [],
  },
];

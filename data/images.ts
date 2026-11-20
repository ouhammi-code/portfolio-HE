import type { SiteImage } from "./types";

/**
 * Image registry.
 *
 * Images flagged `illustrative: true` are free-licence stock photographs
 * (Unsplash Licence) used for atmosphere only. They are NOT the researcher's
 * field material and are labelled as such on the site. Replace them with
 * original field / laboratory photographs placed in /public/images/fieldwork
 * or /public/images/research and remove the flag.
 */
export const images = {
  portrait: {
    src: "/images/profile/hasna-laboratory.jpg",
    alt: "Hasna Er-Raqqady seated in a geoscience laboratory beside a magnetic susceptibility instrument, with geological posters on the wall",
    width: 1200,
    height: 1600,
  },
  /* ── Original field photographs — Anti-Atlas, Saghro massif ── */
  saghroPanorama: {
    src: "/images/fieldwork/saghro-panorama.jpg",
    alt: "View from a boulder-strewn ridge of the Saghro massif across a desert plain towards distant Anti-Atlas ranges",
    width: 1600,
    height: 1198,
  },
  saghroPeaks: {
    src: "/images/fieldwork/saghro-peaks.jpg",
    alt: "Rocky peaks of the Saghro massif with patches of snow, above a village and its fields",
    credit: "© moha",
    width: 1600,
    height: 831,
  },
  saghroFoldedBeds: {
    src: "/images/fieldwork/saghro-folded-beds.jpg",
    alt: "Steeply dipping, folded alternations of dark fissile layers and greenish competent beds in a Saghro outcrop",
    width: 1200,
    height: 1600,
  },
  saghroBeddedSequence: {
    src: "/images/fieldwork/saghro-bedded-sequence.jpg",
    alt: "Well-bedded grey-green sequence cut by closely spaced fractures, with a geological hammer for scale",
    width: 1600,
    height: 1200,
  },
  saghroFoliatedOutcrop: {
    src: "/images/fieldwork/saghro-foliated-outcrop.jpg",
    alt: "Close-up of a foliated outcrop with pale lenticular layers and clasts, a pen for scale",
    width: 1600,
    height: 1200,
  },

  /* ── Illustrative stock photographs ── */
  atlasRanges: {
    src: "/images/geology/atlas-ranges.jpg",
    alt: "Layered red and ochre mountain ranges of Morocco stretching to the horizon",
    illustrative: true,
    credit: "Ansgar Scheffold / Unsplash",
    width: 2400,
    height: 1600,
  },
  foldedStrata: {
    src: "/images/geology/folded-strata-village.jpg",
    alt: "Folded sedimentary strata on an arid Moroccan mountainside above a village",
    illustrative: true,
    credit: "Bernd Dittrich / Unsplash",
    width: 2000,
    height: 1333,
  },
  tiltedStrata: {
    src: "/images/geology/tilted-strata.jpg",
    alt: "Steeply tilted rock beds forming a jagged ridge",
    illustrative: true,
    credit: "Pacha Shot's / Unsplash",
    width: 1600,
    height: 2400,
  },
  layeredOutcrop: {
    src: "/images/geology/layered-outcrop.jpg",
    alt: "Close view of thinly layered sedimentary rock in an outcrop",
    illustrative: true,
    credit: "Melody Zimmerman / Unsplash",
    width: 1800,
    height: 1198,
  },
  bandedTexture: {
    src: "/images/geology/banded-rock-texture.jpg",
    alt: "Banded rock texture with grey, white and ochre layers",
    illustrative: true,
    credit: "Max van den Oetelaar / Unsplash",
    width: 1600,
    height: 1200,
  },
  sulfides: {
    src: "/images/geology/mineral-sulfides.jpg",
    alt: "Macro photograph of an iridescent sulfide mineral surface",
    illustrative: true,
    credit: "USGS / Unsplash",
    width: 1600,
    height: 1067,
  },
  pyrite: {
    src: "/images/geology/pyrite-specimen.jpg",
    alt: "Pyrite crystal aggregate on a black background",
    illustrative: true,
    credit: "Calvin Chai / Unsplash",
    width: 1600,
    height: 1067,
  },
  darkRock: {
    src: "/images/geology/dark-rock-face.jpg",
    alt: "Dark, fractured rock face with angular surfaces",
    illustrative: true,
    credit: "Jude Infantini / Unsplash",
    width: 1600,
    height: 1067,
  },
  erodedStrata: {
    src: "/images/geology/eroded-strata.jpg",
    alt: "Eroded cliff of yellow and ochre sedimentary strata under a deep blue sky",
    illustrative: true,
    credit: "Jeffrey Eisen / Unsplash",
    width: 1800,
    height: 1200,
  },
  presaharanPlain: {
    src: "/images/geology/presaharan-plain.jpg",
    alt: "Pre-Saharan plain of southern Morocco with mesas and an oasis settlement",
    illustrative: true,
    credit: "rigel / Unsplash",
    width: 2000,
    height: 1333,
  },
  darkStrata: {
    src: "/images/geology/dark-strata.jpg",
    alt: "Dark rock wall crossed by a pale sedimentary band",
    illustrative: true,
    credit: "Max Kuntscher / Unsplash",
    width: 1400,
    height: 2100,
  },
} satisfies Record<string, SiteImage>;

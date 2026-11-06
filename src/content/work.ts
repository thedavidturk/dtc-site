/* ------------------------------------------------------------------ */
/*  Site content: every project, the homepage selection, and the       */
/*  shared copy. Pages read from here; nothing else hard-codes a        */
/*  project list.                                                       */
/*                                                                      */
/*  Media for the three newer projects lives in public/work/<slug>/.    */
/*  Drop files there with these names and they appear on the next       */
/*  build, no code changes needed:                                      */
/*    hero.mp4   hero loop (homepage, 2062 only). H.264, muted, 6-10s   */
/*    hero.jpg   still for the hero: mobile, reduced motion, poster     */
/*    card.jpg   cover still for cards (falls back to hero.jpg)         */
/*    card.mp4   optional cover loop for cards                          */
/*    film.mp4   optional full film, played on the project page with    */
/*               controls (film.jpg as its poster, else hero.jpg)       */
/*    gallery/   any .jpg/.png/.webp, shown on the project page in      */
/*               file-name order (01.jpg, 02.jpg, ...)                  */
/* ------------------------------------------------------------------ */

export type Discipline =
  | "Film"
  | "3D & VFX"
  | "Experiential"
  | "Strategy"
  | "Original";

export const DISCIPLINE_FILTERS: Discipline[] = [
  "Film",
  "3D & VFX",
  "Experiential",
  "Strategy",
  "Original",
];

export interface WorkItem {
  slug: string;
  href: string;
  /** Who it was for (or the title, for originals). */
  client: string;
  /** Short project title. */
  title: string;
  /** One line for cards and meta descriptions. */
  summary: string;
  kind: "client" | "original";
  /** Short role / craft line shown under cards. */
  label: string;
  disciplines: Discipline[];
  /** Small local poster + loop used by the Work grid. */
  poster?: string;
  loop?: string;
  /** Large, high-resolution still for big homepage cards. */
  feature?: string;
  /** Hidden on the live site (production builds) until approved. */
  draft?: boolean;
  /** Folder under public/work/ holding this project's media. */
  mediaDir?: string;
  /** Uniform gallery shape for this project's stills, e.g. "aspect-[4/5]". */
  galleryAspect?: string;
}

const PORTFOLIO_CDN = "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104";

export const work: WorkItem[] = [
  {
    slug: "new-era-cap",
    href: "/projects/new-era-cap",
    client: "New Era Cap",
    title: "4 Campaigns. One Vision.",
    summary: "Four campaigns spanning creative strategy, 3D animation, and VFX.",
    kind: "client",
    label: "Creative strategy, 3D & VFX",
    disciplines: ["Strategy", "3D & VFX"],
    poster: "/motion/new-era-cosmic.jpg",
    loop: "/motion/new-era-cosmic.mp4",
    feature: `${PORTFOLIO_CDN}/bc84ed39-2bc9-411a-8290-6f0cc5b43df2_rw_3840.png?h=ccf4884ee6b1129fa7a3eecd9ddb11f9`,
  },
  {
    slug: "2062",
    href: "/projects/2062",
    client: "2062",
    title: "2062",
    summary:
      "An original sci-fi series set in a post-apocalyptic Miami, made with AI and directed like a film.",
    kind: "original",
    label: "AI film series",
    disciplines: ["Original"],
    mediaDir: "2062",
    galleryAspect: "aspect-[4/5]",
  },
  {
    slug: "fold-party",
    href: "/projects/fold-party",
    client: "Fold Party",
    title: "Fold Party",
    summary: "A party-game arcade for one phone. Pass it around, share one scoreboard.",
    kind: "original",
    label: "Game for iPhone & iPad",
    disciplines: ["Original"],
    mediaDir: "fold-party",
    galleryAspect: "aspect-[4/3]",
  },
  {
    slug: "weinstein-legal-team",
    href: "/projects/weinstein-legal-team",
    client: "Weinstein Legal Team",
    title: "One Firm, One Thread",
    summary:
      "Film, out-of-home, bilingual ads, and a weekly social system, held together by one creative thread.",
    kind: "client",
    label: "Creative direction & production",
    disciplines: ["Strategy", "Film"],
    mediaDir: "weinstein-legal-team",
    draft: true,
  },
  {
    slug: "seaworld",
    href: "/projects/seaworld",
    client: "SeaWorld",
    title: "SEAQuest",
    summary:
      "An underwater world built in Unreal Engine 5, grown into a teaser trailer and hero visuals for a new ride.",
    kind: "client",
    label: "Worldbuilding, 3D & trailer",
    disciplines: ["3D & VFX", "Strategy"],
    poster: "/motion/seaworld-reel.jpg",
    loop: "/motion/seaworld-reel.mp4",
    feature: `${PORTFOLIO_CDN}/3c7bc293-4736-41b8-8521-17c11820918f_rw_3840.png?h=f85762d23e378abf6d005270cc55be51`,
  },
  {
    slug: "crespo-jaden-smith",
    href: "/projects/crespo-jaden-smith",
    client: "Jaden Smith × CRESPO",
    title: "Behind the Stage",
    summary: "A documentary short, shot and edited in 24 hours.",
    kind: "client",
    label: "Documentary direction",
    disciplines: ["Film"],
    poster: "/motion/crespo.jpg",
    loop: "/motion/crespo.mp4",
    feature: `${PORTFOLIO_CDN}/f40af874-5bc9-4587-8f9d-db17859dc0d4_rw_1920.png?h=fe79d831e34b086f0a55b6e716993816`,
  },
  {
    slug: "el-secreto",
    href: "/projects/el-secreto",
    client: "Faena",
    title: "El Secreto: Savoring the Unseen",
    summary: "Cinematic video production for Faena.",
    kind: "client",
    label: "Cinematic video production",
    disciplines: ["Film"],
    poster: "/motion/faena.jpg",
    loop: "/motion/faena.mp4",
  },
  {
    slug: "betterfly",
    href: "/projects/betterfly",
    client: "Betterfly",
    title: "#RecursosMasHumanos",
    summary:
      "A fake out-of-home campaign: branded banners digitally draped over iconic monuments.",
    kind: "client",
    label: "VFX & FOOH campaign",
    disciplines: ["3D & VFX", "Experiential"],
    poster: "/motion/betterfly-fooh.jpg",
    loop: "/motion/betterfly-fooh.mp4",
  },
  {
    slug: "ford-mustang-mach-e",
    href: "/projects/ford-mustang-mach-e",
    client: "Ford",
    title: "Mustang Mach-E",
    summary: "Automotive CGI and commercial production for the Mustang Mach-E.",
    kind: "client",
    label: "Automotive CGI & commercial",
    disciplines: ["3D & VFX"],
    poster: "/motion/ford-mustang.jpg",
    loop: "/motion/ford-mustang.mp4",
  },
  {
    slug: "brugal-rum",
    href: "/projects/brugal-rum",
    client: "Brugal Rum",
    title: "Tasting the Island",
    summary: "Brand activation and event film for Brugal Rum.",
    kind: "client",
    label: "Brand activation & event film",
    disciplines: ["Experiential", "Film"],
    poster: "/motion/brugal.jpg",
    loop: "/motion/brugal.mp4",
  },
  {
    slug: "ford-field-club",
    href: "/projects/ford-field-club",
    client: "Miami Dolphins",
    title: "Ford Field Club",
    summary: "Experiential creative direction for the Miami Dolphins' Ford Field Club.",
    kind: "client",
    label: "Experiential creative direction",
    disciplines: ["Experiential"],
    poster: "/motion/ford-field-club.jpg",
    loop: "/motion/ford-field-club.mp4",
  },
  {
    slug: "hospitality-mentor",
    href: "/projects/hospitality-mentor",
    client: "The Hospitality Mentor",
    title: "Inside the Fontainebleau",
    summary: "A TV episode filmed inside the Fontainebleau Miami Beach.",
    kind: "client",
    label: "TV episode & cinematography",
    disciplines: ["Film"],
    poster: "/motion/hospitality.jpg",
    loop: "/motion/hospitality.mp4",
  },
  {
    slug: "unplugged-sessions",
    href: "/projects/unplugged-sessions",
    client: "Unplugged Sessions",
    title: "Live, In One Take",
    summary: "Live music captured in one take with multi-camera direction.",
    kind: "client",
    label: "Live music & multi-camera",
    disciplines: ["Film"],
    poster: "/motion/unplugged.jpg",
    loop: "/motion/unplugged.mp4",
  },
  {
    slug: "todes-vejigante",
    href: "/projects/todes-vejigante",
    client: "Todes Vejigante",
    title: "A Story of Resistance",
    summary: "A documentary about cultural preservation.",
    kind: "client",
    label: "Documentary",
    disciplines: ["Film"],
    poster: "/motion/todes.jpg",
    loop: "/motion/todes.mp4",
  },
  {
    slug: "runway-health",
    href: "/projects/runway-health",
    client: "Runway Health",
    title: "Built From the Ground Up",
    summary: "3D product design and CGI rendering for Runway Health.",
    kind: "client",
    label: "3D product design & CGI",
    disciplines: ["3D & VFX"],
    poster: `${PORTFOLIO_CDN}/66ead1cf-6a1a-4284-908a-a56b5e058937_rw_1200.png?h=3d9f7b1732640485b0971f4afe66b1dd`,
  },
  {
    slug: "pamm",
    href: "/projects/pamm",
    client: "Pérez Art Museum Miami",
    title: "A Cultural Identity",
    summary: "Cultural branding and art direction for Pérez Art Museum Miami.",
    kind: "client",
    label: "Cultural branding & art direction",
    disciplines: ["Strategy"],
    poster: "/motion/pamm.jpg",
    loop: "/motion/pamm.mp4",
  },
  {
    slug: "biscayne-coffee",
    href: "/projects/biscayne-coffee",
    client: "Biscayne Coffee",
    title: "Launch Campaign",
    summary: "A launch campaign built from video and 3D product design.",
    kind: "client",
    label: "Video & 3D product design",
    disciplines: ["Film", "3D & VFX"],
    poster: "/motion/biscayne.jpg",
    loop: "/motion/biscayne.mp4",
  },
  {
    slug: "florida-panthers",
    href: "/projects/florida-panthers",
    client: "Ford × Florida Panthers",
    title: "Go Further",
    summary: "A brand film and cause campaign for Ford and the Florida Panthers.",
    kind: "client",
    label: "Brand film & cause campaign",
    disciplines: ["Film"],
    poster: "/motion/panthers.jpg",
    loop: "/motion/panthers.mp4",
  },
  {
    slug: "barrys-bootcamp",
    href: "/projects/barrys-bootcamp",
    client: "Barry's",
    title: "In Motion",
    summary: "Social content and motion design for Barry's.",
    kind: "client",
    label: "Social content & motion design",
    disciplines: ["Film"],
    poster: "/motion/barrys.jpg",
    loop: "/motion/barrys.mp4",
  },
];

/** Pages that exist but aren't cards (sub-pages of a larger project). */
export const extraProjectPages: { slug: string; title: string; summary: string }[] = [
  {
    slug: "new-era-cap-sprouted",
    title: "New Era Cap: Sprouted Collection",
    summary: "Sprouted: a nature-themed 3D campaign for New Era Cap.",
  },
];

/** Homepage order: the flagship, then five more. */
export const FLAGSHIP_SLUG = "new-era-cap";
export const SELECTED_SLUGS = [
  "2062",
  "fold-party",
  "weinstein-legal-team",
  "seaworld",
  "crespo-jaden-smith",
];

/** The project the homepage hero plays. */
export const HERO_SLUG = "2062";

export const clients = [
  "New Era Cap",
  "Ford",
  "SeaWorld",
  "Miami Dolphins",
  "Betterfly",
  "Brugal Rum",
  "Faena",
  "Barry's",
  "United Parks",
  "Pérez Art Museum Miami",
];

export const capabilities = [
  {
    name: "Creative direction",
    line: "Concepts, campaigns, and the visual world around them.",
  },
  {
    name: "Film & photography",
    line: "Commercials, documentaries, and stills, on set or on location.",
  },
  {
    name: "3D, VFX & AI",
    line: "Virtual worlds, product CGI, and AI-generated film, directed with the same craft.",
  },
  {
    name: "Brand campaigns",
    line: "Ideas that carry across social, out-of-home, and the web.",
  },
];

export const site = {
  person: "David Turk",
  studio: "David Turk Creative",
  legalName: "David Turk Creative, LLC",
  email: "david@davidturkcreative.com",
  linkedin: "https://www.linkedin.com/in/davidturk",
  url: "https://davidturkcreative.com",
  tagline: "Cinematic worlds. Ideas in motion.",
  positioning: "Creative direction, film, and 3D for brands and original stories.",
  intro:
    "I’m David Turk. Through David Turk Creative, I develop ideas and bring them to life through film, 3D, and visual storytelling.",
};

export function getWork(slug: string): WorkItem | undefined {
  return work.find((item) => item.slug === slug);
}

/** Metadata for a case-study route, used by each project's layout. */
export function projectMetadata(slug: string) {
  const item = getWork(slug);
  const extra = extraProjectPages.find((page) => page.slug === slug);
  const title = item
    ? item.kind === "original"
      ? item.client
      : `${item.client}: ${item.title}`
    : extra?.title ?? "Project";
  const description = item?.summary ?? extra?.summary ?? "";
  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: `${title} | ${site.studio}`, description },
    twitter: { title: `${title} | ${site.studio}`, description },
  };
}

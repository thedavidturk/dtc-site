/* ------------------------------------------------------------------ */
/*  Build-time helpers. Server components only (reads the filesystem). */
/* ------------------------------------------------------------------ */

import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { work, type WorkItem } from "@/content/work";

const PUBLIC_DIR = join(process.cwd(), "public");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Netlify sets CONTEXT at build time: "production" for the live site,
 * "deploy-preview" / "branch-deploy" for previews. Local builds have no
 * CONTEXT and behave like a preview.
 */
export const isLiveSite = process.env.CONTEXT === "production";

/** Preview-only notes ("asset goes here") never reach the live site. */
export const showPreviewNotes = !isLiveSite;

/** Draft projects (awaiting client approval) only render on previews. */
export const includeDrafts = !isLiveSite;

/** Returns the public URL path if the file exists in /public. */
export function publicAsset(path: string): string | undefined {
  return existsSync(join(PUBLIC_DIR, path)) ? path : undefined;
}

function firstAsset(paths: string[]): string | undefined {
  for (const path of paths) {
    const found = publicAsset(path);
    if (found) return found;
  }
  return undefined;
}

export interface ResolvedMedia {
  /** Cover still for cards. */
  still?: string;
  /** Optional cover loop for cards. */
  loop?: string;
  /** Hero still (mobile, reduced motion, poster). */
  heroStill?: string;
  /** Hero loop (desktop). */
  heroLoop?: string;
  /** Gallery stills for the project page, in file-name order. */
  gallery: string[];
  /** Optional full film with its poster. */
  film?: string;
  filmPoster?: string;
}

export function resolveMedia(item: WorkItem): ResolvedMedia {
  if (!item.mediaDir) {
    return {
      still: item.feature ?? item.poster,
      loop: item.loop,
      heroStill: item.feature ?? item.poster,
      gallery: [],
    };
  }

  const base = `/work/${item.mediaDir}`;
  const heroStill = firstAsset([`${base}/hero.jpg`, `${base}/hero.webp`, `${base}/hero.png`]);
  const heroLoop = firstAsset([`${base}/hero.mp4`]);
  const cardStill =
    firstAsset([`${base}/card.jpg`, `${base}/card.webp`, `${base}/card.png`]) ?? heroStill;
  const cardLoop = firstAsset([`${base}/card.mp4`]);

  let gallery: string[] = [];
  const galleryDir = join(PUBLIC_DIR, "work", item.mediaDir, "gallery");
  if (existsSync(galleryDir)) {
    gallery = readdirSync(galleryDir)
      .filter((file) => IMAGE_EXT.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `${base}/gallery/${file}`);
  }

  const film = firstAsset([`${base}/film.mp4`]);
  const filmPoster = firstAsset([`${base}/film.jpg`]) ?? heroStill;

  return { still: cardStill, loop: cardLoop, heroStill, heroLoop, gallery, film, filmPoster };
}

/** Every project that should be visible in this build. */
export function visibleWork(): WorkItem[] {
  return work.filter((item) => includeDrafts || !item.draft);
}

export function visibleBySlug(slugs: string[]): WorkItem[] {
  const visible = visibleWork();
  return slugs
    .map((slug) => visible.find((item) => item.slug === slug))
    .filter((item): item is WorkItem => Boolean(item));
}

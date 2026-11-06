import { FLAGSHIP_SLUG, SELECTED_SLUGS, getWork, type WorkItem } from "@/content/work";
import { visibleBySlug } from "./media";

/** The project after `slug` in the homepage order, wrapping to the flagship. */
export function nextProject(slug: string): WorkItem {
  const order = visibleBySlug([FLAGSHIP_SLUG, ...SELECTED_SLUGS]);
  const index = order.findIndex((item) => item.slug === slug);
  if (index === -1) return order[0] ?? getWork(FLAGSHIP_SLUG)!;
  return order[(index + 1) % order.length];
}

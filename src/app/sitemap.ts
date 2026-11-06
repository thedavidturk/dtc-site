import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { extraProjectPages, site } from "@/content/work";
import { visibleWork } from "@/lib/media";

/** Article slugs, read from the insights folder so new posts list themselves. */
function insightSlugs(): string[] {
  const dir = join(process.cwd(), "src/app/insights");
  return readdirSync(dir).filter((name) => statSync(join(dir, name)).isDirectory());
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("", 1.0),
    entry("/work", 0.9),
    entry("/about", 0.8),
    entry("/contact", 0.7),
    ...visibleWork()
      .filter((item) => !item.draft)
      .map((item) => entry(item.href, 0.8)),
    ...extraProjectPages.map((page) => entry(`/projects/${page.slug}`, 0.7)),
    entry("/insights", 0.6),
    ...insightSlugs().map((slug) => entry(`/insights/${slug}`, 0.6)),
  ];
}

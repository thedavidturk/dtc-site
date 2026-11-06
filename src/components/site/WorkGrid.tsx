"use client";

import { useMemo, useState } from "react";
import Link from "@/components/TransitionLink";
import type { Discipline, WorkItem } from "@/content/work";
import type { ResolvedMedia } from "@/lib/media";
import CoverMedia from "./CoverMedia";

export interface GridEntry {
  item: WorkItem;
  media: ResolvedMedia;
}

/**
 * Every project in one grid, with plain-text filters. Cards play their
 * small loops while on screen (they're sized for it here).
 */
export default function WorkGrid({
  entries,
  filters,
  showNotes,
}: {
  entries: GridEntry[];
  filters: Discipline[];
  showNotes: boolean;
}) {
  const [active, setActive] = useState<"All" | Discipline>("All");

  const available = useMemo(
    () => filters.filter((f) => entries.some(({ item }) => item.disciplines.includes(f))),
    [entries, filters],
  );

  const visible =
    active === "All" ? entries : entries.filter(({ item }) => item.disciplines.includes(active));

  return (
    <>
      <nav aria-label="Filter work" className="mb-10 flex flex-wrap gap-x-6 gap-y-3 md:mb-14">
        {(["All", ...available] as const).map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={`font-body text-sm font-normal uppercase tracking-[0.02em] transition-colors duration-500 ease-prism focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-bone ${
                isActive ? "text-bone" : "text-fog-blue hover:text-bone"
              }`}
            >
              {filter}
            </button>
          );
        })}
        <span className="ml-auto text-caption font-normal uppercase tracking-[0.02em] text-fog-blue" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </nav>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ item, media }) => (
          <li key={item.slug}>
            <Link href={item.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-[#161616]">
                {media.still || media.loop ? (
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-prism group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none">
                    <CoverMedia
                      still={item.poster ?? media.still}
                      loop={media.loop}
                      alt={`${item.client}: ${item.title}`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-end rounded-card border border-ash-border bg-[#151515] p-5">
                    <span aria-hidden="true" className="font-anton text-[clamp(2.25rem,4vw,3.5rem)] uppercase leading-[0.9] text-bone/90">
                      {item.client}
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-4 text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                {item.kind === "original" ? "Original" : "Client"} · {item.label}
              </p>
              <h2 className="mt-2 font-body text-body-lg font-normal text-bone transition-colors duration-500 ease-prism group-hover:text-fog-blue">
                {item.client}
                {item.kind === "client" && item.title !== item.client && (
                  <span className="text-fog-blue">, {item.title}</span>
                )}
              </h2>
              {item.draft && showNotes && (
                <p className="mt-2 text-caption text-fog-blue">Draft · preview only</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

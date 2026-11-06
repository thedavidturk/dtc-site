import Link from "@/components/TransitionLink";
import type { WorkItem } from "@/content/work";
import type { ResolvedMedia } from "@/lib/media";
import CoverMedia from "./CoverMedia";
import MediaPlaceholder from "./MediaPlaceholder";
import PreviewNote from "./PreviewNote";

/**
 * A project card: media on top, caption below (never text over media).
 * `size` picks the caption scale; `aspect` and `sizes` come from the grid.
 */
export default function WorkCard({
  item,
  media,
  aspect,
  sizes,
  size = "md",
  playLoop = false,
  priority = false,
  showNotes,
}: {
  item: WorkItem;
  media: ResolvedMedia;
  aspect: string;
  sizes: string;
  size?: "lg" | "md" | "sm";
  /** Loops are small (480-640px); only play them where cards are small. */
  playLoop?: boolean;
  priority?: boolean;
  showNotes: boolean;
}) {
  const hasMedia = Boolean(media.still || (playLoop && media.loop));
  const kindLabel = item.kind === "original" ? "Original" : "Client";

  return (
    <article>
      <Link href={item.href} className="group block" aria-label={`${item.client}. ${item.summary}`}>
        <div className={`relative overflow-hidden rounded-card bg-[#161616] ${aspect}`}>
          {hasMedia ? (
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-prism group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none">
              <CoverMedia
                still={media.still}
                loop={playLoop ? media.loop : undefined}
                alt={`${item.client}: ${item.title}`}
                sizes={sizes}
                priority={priority}
              />
            </div>
          ) : (
            <MediaPlaceholder
              title={item.client}
              showNote={showNotes}
              large={size === "lg"}
              note={
                item.mediaDir
                  ? `Add a cover still at public/work/${item.mediaDir}/card.jpg`
                  : undefined
              }
            />
          )}
        </div>

        <div className={size === "lg" ? "mt-6 md:mt-8" : "mt-5"}>
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
            {kindLabel} · {item.label}
          </p>
          <h3
            className={`mt-2 font-body font-normal text-bone transition-colors duration-500 ease-prism group-hover:text-fog-blue ${
              size === "lg" ? "text-heading-lg" : size === "md" ? "text-heading-sm" : "text-body-lg"
            }`}
          >
            {item.client}
          </h3>
          <p
            className={`mt-2 max-w-[52ch] font-body font-normal text-fog-blue ${
              size === "sm" ? "text-caption leading-[1.4]" : "text-body-sm"
            }`}
          >
            {item.summary}
          </p>
        </div>
      </Link>
      {item.draft && (
        <PreviewNote show={showNotes} className="mt-4">
          Draft: hidden on the live site until Weinstein approves what&rsquo;s shown.
        </PreviewNote>
      )}
    </article>
  );
}

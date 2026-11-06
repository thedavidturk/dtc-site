import PreviewNote from "./PreviewNote";

/**
 * Stand-in for a project whose media hasn't been added yet. It is built
 * to look intentional on its own (a quiet typographic plate), so nothing
 * reads as broken if it ever ships; the dashed note shows on previews only.
 */
export default function MediaPlaceholder({
  title,
  note,
  showNote,
  large = false,
}: {
  title: string;
  note?: string;
  showNote: boolean;
  large?: boolean;
}) {
  return (
    <div className="absolute inset-0 rounded-card border border-ash-border bg-[#151515]">
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
        <div>{note && <PreviewNote show={showNote}>{note}</PreviewNote>}</div>
        <p
          aria-hidden="true"
          className={`font-anton uppercase leading-[0.9] tracking-normal text-bone/90 ${
            large ? "text-display" : "text-[clamp(2.75rem,6vw,5.5rem)]"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

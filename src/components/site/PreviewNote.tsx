/**
 * A small dashed note that only renders on preview builds (never on the
 * live site). Used to mark where missing media or unverified copy goes.
 */
export default function PreviewNote({
  show,
  children,
  className = "",
}: {
  show: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!show) return null;
  return (
    <p
      className={`inline-flex max-w-[640px] items-start gap-2 rounded-nav border border-dashed border-fog-blue/60 bg-obsidian/80 px-3 py-2 text-caption font-normal text-fog-blue ${className}`}
    >
      <span className="shrink-0 uppercase tracking-[0.02em] text-bone">Preview only</span>
      <span>{children}</span>
    </p>
  );
}

import { clients } from "@/content/work";

/** One quiet row of client names. */
export default function ClientRow({ bordered = true }: { bordered?: boolean }) {
  return (
    <section className={bordered ? "border-t border-ash-border" : ""} aria-label="Selected clients">
      <div className="section-container py-12 md:py-16">
        <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
          Selected clients
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 md:gap-x-10">
          {clients.map((client) => (
            <li key={client} className="font-body text-body-sm font-normal text-bone/80">
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

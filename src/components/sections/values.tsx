"use client";

import { type } from "@/components/ui/section";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { cx } from "@/utils/cx";

/**
 * Valores — v2 bento.
 * Columna izquierda sticky con fondo mauve + columna derecha oscura con
 * 4 filas separadas por borde, que scrollean mientras la izquierda permanece
 * fija en desktop.
 *
 * Mobile: apilado (header mauve → 4 cards en columna).
 */
const values = [
    {
        title: "Estrategia antes que estética",
        body: "Pensamos qué decir y por qué, no solo cómo se ve.",
    },
    {
        title: "Un equipo con varias cabezas",
        body: "Varias miradas trabajando tu marca, no una sola persona para todo.",
    },
    {
        title: "Medimos si comunica",
        body: "Nos importa el impacto real, no solo los likes.",
    },
    {
        title: "Te acompañamos",
        body: "Seguimos después de entregar. No desaparecemos.",
    },
];

function ValueRow({ v, index }: { v: (typeof values)[number]; index: number }) {
    const { ref, inView } = useInViewOnce<HTMLLIElement>(0.3);

    return (
        <li
            ref={ref}
            style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
            className={cx(
                "flex flex-col gap-3 p-10 sm:p-12 lg:px-16 lg:py-12",
                "border-t border-[var(--neutral-800)]",
                "transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
        >
            <h3
                className="font-display font-semibold leading-[1.1] tracking-[-0.01em] text-[var(--neutral-50)]"
                style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)" }}
            >
                {v.title}
            </h3>
            <p className={cx(type.bodyLg, "text-[var(--neutral-500)] max-w-[54ch]")}>{v.body}</p>
        </li>
    );
}

export function Values() {
    return (
        <section
            id="valores"
            className={cx(
                "flex flex-col",
                "lg:flex-row lg:min-h-[200vh]",
            )}
        >
            {/* ── Left: sticky mauve ── */}
            <div
                className={cx(
                    "flex flex-col justify-end gap-6 p-10 sm:p-12 lg:p-16",
                    "bg-[var(--accent-default)]",
                    "min-h-[55vw] sm:min-h-0 py-16",
                    "lg:sticky lg:top-0 lg:h-screen lg:w-[38%] lg:shrink-0 lg:min-h-0",
                )}
            >
                <p className={cx(type.label, "uppercase tracking-[0.12em] text-[var(--neutral-700)]")}>
                    Nuestros valores
                </p>
                <h2
                    className="font-display font-medium leading-[1.0] tracking-[-0.035em] text-[var(--neutral-950)]"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                >
                    Los valores no se anuncian,
                    <br />se demuestran
                </h2>
                <p className={cx(type.bodyLg, "text-[var(--neutral-700)]")}>
                    Y se ven en cómo trabajamos.
                </p>
            </div>

            {/* ── Right: dark with 4 value rows ── */}
            <div className="flex flex-1 flex-col bg-[var(--neutral-950)]">
                <ul className="flex flex-col">
                    {values.map((v, i) => (
                        <ValueRow key={v.title} v={v} index={i} />
                    ))}
                </ul>
                {/* Bottom border */}
                <div className="border-t border-[var(--neutral-800)]" />
            </div>
        </section>
    );
}

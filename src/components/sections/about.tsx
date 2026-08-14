import { IsoCluster } from "@/components/graphics/iso";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { type } from "@/components/ui/section";
import { cx } from "@/utils/cx";

/**
 * Quiénes somos — v2 bento.
 * Columna sticky oscura (izquierda) + columna scrollable clara (derecha).
 *
 * Desktop: columna left fija en viewport mientras el usuario scrollea el
 *          contenido de la derecha (texto + ilustración).
 * Mobile:  apilado vertical (header oscuro → contenido claro).
 */
export function About() {
    return (
        <section
            id="quienes-somos"
            className={cx(
                "flex flex-col",
                // Desktop: fila flex con la columna left pegajosa
                "lg:flex-row lg:min-h-[180vh]",
            )}
        >
            {/* ── Left: sticky dark — eyebrow + titular ── */}
            <div
                className={cx(
                    "flex flex-col justify-end gap-6 p-10 sm:p-12 lg:p-16",
                    "bg-[var(--neutral-950)]",
                    // Mobile: ocupa el alto que necesita el texto
                    "min-h-[55vw] sm:min-h-0 py-16",
                    // Desktop: sticky, plena altura
                    "lg:sticky lg:top-0 lg:h-screen lg:w-[42%] lg:shrink-0 lg:min-h-0",
                )}
            >
                <Reveal delay={0}>
                    <p className={cx(type.label, "uppercase tracking-[0.12em] text-[var(--neutral-500)]")}>
                        Quiénes somos
                    </p>
                </Reveal>

                <SplitReveal
                    delay={100}
                    className={cx(
                        "font-display font-medium leading-[1.0] tracking-[-0.035em] text-[var(--neutral-50)]",
                    )}
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
                >
                    De la estrategia a la ejecución.
                    Sin intermediarios.
                </SplitReveal>
            </div>

            {/* ── Right: scrollable light ── */}
            <div className="flex flex-1 flex-col">
                {/* Texto */}
                <div className="flex flex-col justify-center gap-6 p-10 sm:p-12 lg:p-16 lg:pt-24 bg-[var(--neutral-50)] flex-1">
                    <Reveal delay={200}>
                        <p className={cx(type.bodyLg, "text-[var(--neutral-600)] max-w-[54ch]")}>
                            No entregamos piezas lindas y desaparecemos. Pensamos qué decir y por qué,
                            trabajamos con vos en cada paso y medimos si de verdad comunica.
                        </p>
                    </Reveal>
                    <Reveal delay={300}>
                        <p className={cx(type.bodyLg, "text-[var(--neutral-600)] max-w-[54ch]")}>
                            Somos la cara de comunicación de 4HIS, aplicando la misma forma de
                            trabajar a tu marca.
                        </p>
                    </Reveal>
                    <Reveal delay={400}>
                        <a
                            href="#contacto"
                            className={cx(
                                type.body,
                                "self-start mt-2 rounded-full border border-[var(--neutral-300)] px-5 py-2.5",
                                "text-[var(--neutral-700)] transition-colors hover:bg-[var(--neutral-900)] hover:border-[var(--neutral-900)] hover:text-[var(--neutral-50)]",
                            )}
                        >
                            Contanos tu proyecto
                        </a>
                    </Reveal>
                </div>

                {/* Ilustración */}
                <Reveal delay={0} variant="scale" className="bg-[var(--neutral-100)] p-10 sm:p-12 lg:p-16">
                    <IsoCluster className="w-full max-w-[400px] opacity-60" />
                </Reveal>
            </div>
        </section>
    );
}

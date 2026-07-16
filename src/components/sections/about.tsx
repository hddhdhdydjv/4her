import { Network } from "@/components/graphics/illustrations";
import { Reveal } from "@/components/motion/reveal";

/**
 * PLACEHOLDER - Quiénes somos.
 * Pendiente de datos reales de la empresa. No redactar copy inventado.
 */
export function About() {
    return (
        <section id="quienes-somos" className="mx-auto max-w-container px-6 py-24 lg:py-32">
            <Reveal>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <p className="font-mono text-[11px] tracking-widest text-quaternary uppercase">
                            Placeholder / quiénes somos
                        </p>
                        <p className="mt-4 font-display text-3xl leading-tight font-medium text-balance text-primary sm:text-4xl">
                            Texto pendiente de definir
                        </p>
                        <p className="mt-4 max-w-md text-lg leading-relaxed text-tertiary">
                            Se completa con datos reales de la empresa.
                        </p>
                    </div>

                    <div className="flex aspect-[4/3] items-center justify-center rounded-3xl bg-[var(--brand-black)] text-[var(--brand-sage)]">
                        <Network className="h-3/4 w-3/4" spin />
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

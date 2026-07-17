import { Network } from "@/components/graphics/illustrations";
import { Reveal } from "@/components/motion/reveal";

/**
 * PLACEHOLDER - Quiénes somos.
 * Pendiente de datos reales de la empresa. No redactar copy inventado.
 */
export function About() {
    return (
        <section id="quienes-somos" className="mx-auto max-w-container px-6 py-32 lg:py-44">
            <Reveal>
                <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
                    {/* Offset asimétrico: el texto arranca en col 2 */}
                    <div className="lg:col-span-6 lg:col-start-2">
                        <p className="font-mono text-[10px] tracking-[0.2em] text-quaternary uppercase">
                            Placeholder / quiénes somos
                        </p>
                        <p className="mt-6 font-display text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[1.02] font-medium tracking-[-0.02em] text-balance text-primary">
                            Texto pendiente de definir
                        </p>
                        <p className="mt-6 max-w-md text-lg leading-relaxed text-tertiary">
                            Se completa con datos reales de la empresa.
                        </p>
                    </div>

                    <div className="lg:col-span-4 lg:col-start-9">
                        <div className="flex aspect-square items-center justify-center rounded-3xl bg-[var(--brand-black)] text-[var(--brand-sage)]">
                            <Network className="h-3/4 w-3/4" spin />
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

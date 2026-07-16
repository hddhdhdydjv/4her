import { Badge } from "@/components/ui/badge";
import { Chevrons } from "@/components/graphics/op-art";
import { Reveal } from "@/components/motion/reveal";

/**
 * PLACEHOLDER — Quiénes somos.
 * Pendiente de datos reales de la empresa. No redactar copy inventado.
 */
export function About() {
    return (
        <section id="quienes-somos" className="mx-auto max-w-container px-6 py-24 lg:py-32">
            <Reveal>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <Badge tone="neutral">Quiénes somos</Badge>
                        <p className="mt-6 font-mono text-[11px] tracking-widest text-quaternary uppercase">
                            Placeholder
                        </p>
                        <p className="mt-3 font-display text-3xl leading-tight font-medium text-balance text-primary sm:text-4xl">
                            Texto pendiente de definir
                        </p>
                        <p className="mt-4 max-w-md text-lg leading-relaxed text-tertiary">
                            Se completa con datos reales de la empresa.
                        </p>
                    </div>

                    {/* Bloque visual (op-art como placeholder de imagen) */}
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                        <Chevrons
                            className="h-full w-full"
                            stripe="var(--brand-ink)"
                            bg="var(--brand-sage)"
                        />
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

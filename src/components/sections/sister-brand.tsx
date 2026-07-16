import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stripes } from "@/components/graphics/op-art";
import { Reveal } from "@/components/motion/reveal";

/** Bloque negro full-width con op-art. */
export function SisterBrand() {
    return (
        <section id="marca-hermana" className="bg-[var(--brand-black)]">
            <div className="mx-auto max-w-container px-6 py-24 lg:py-32">
                <Reveal>
                    <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
                        <div>
                            <Badge tone="onDark">Marca hermana</Badge>
                            <h2 className="mt-6 font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance text-primary_on-brand sm:text-5xl lg:text-6xl">
                                Comunicación y tecnología, una sola casa
                            </h2>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary_on-brand">
                                4HER y 4HIS son parte del mismo grupo. Si tu desafío también es
                                técnico —web, software, automatización—, lo resolvés con el mismo
                                equipo, sin saltar entre proveedores.
                            </p>
                            <div className="mt-8">
                                <Button href="#contacto" size="lg">
                                    Conocer 4HIS
                                </Button>
                            </div>
                        </div>

                        <div className="hidden aspect-square overflow-hidden rounded-3xl lg:block">
                            <Stripes className="h-full w-full" stripe="var(--brand-sage)" bg="var(--brand-black-soft)" />
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

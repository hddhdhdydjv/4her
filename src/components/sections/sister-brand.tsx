import { Button } from "@/components/ui/button";
import { Globe } from "@/components/graphics/illustrations";
import { Reveal } from "@/components/motion/reveal";

/**
 * Marca hermana (4HIS) - versión menos literal, sin eyebrow.
 * Sin em dashes en el copy.
 */
export function SisterBrand() {
    return (
        <section id="marca-hermana" className="bg-[var(--brand-black)]">
            <div className="mx-auto max-w-container px-6 py-24 lg:py-32">
                <Reveal>
                    <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
                        <div>
                            <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance text-primary_on-brand sm:text-5xl lg:text-6xl">
                                Comunicación y tecnología, una sola casa
                            </h2>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary_on-brand">
                                4HER y 4HIS son parte del mismo grupo. Si tu desafío también es
                                técnico (web, software, automatización), lo resolvés con el mismo
                                equipo, sin saltar entre proveedores.
                            </p>
                            <div className="mt-8">
                                <Button
                                    href="#"
                                    size="lg"
                                    className="bg-[var(--brand-sage)] text-[var(--brand-ink)] hover:bg-[var(--brand-sage-deep)]"
                                >
                                    Conocer 4HIS
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </div>
                        </div>

                        <div className="mx-auto hidden h-72 w-72 text-[var(--brand-sage)] lg:block">
                            <Globe className="h-full w-full" spin />
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

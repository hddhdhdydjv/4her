import { Section, SectionIntro, type, tone } from "@/components/ui/section";
import { IsoCluster } from "@/components/graphics/iso";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Intro — Quiénes somos` (40:3782) + `Feature 1` (40:3776).
 * Feature 1: flex gap-64 items-center, imagen 544×432 a la izquierda.
 */
export function About() {
    return (
        <>
            <SectionIntro
                id="quienes-somos"
                eyebrow="Quiénes somos"
                title={
                    <>
                        Más estratégicos que una agencia,
                        <br className="hidden sm:block" /> más cerca que un freelance
                    </>
                }
                lead="No entregamos piezas lindas y desaparecemos. Pensamos qué decir y por qué, trabajamos con vos en cada paso y medimos si de verdad comunica. Somos la cara de comunicación de 4HIS, aplicando la misma forma de trabajar a tu marca."
            />

            <Section>
                <Reveal>
                    <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
                        {/* Image (73:6758) */}
                        <div className="aspect-[544/432] w-full lg:flex-1">
                            <IsoCluster className="h-full w-full" />
                        </div>

                        {/* Content (40:3778) */}
                        <div className="flex w-full flex-col gap-6 lg:flex-1">
                            <h3 className={cx(type.h2, tone.primary, "text-balance")}>
                                De la estrategia a la ejecución,
                                <br className="hidden sm:block" /> sin intermediarios
                            </h3>
                            <p className={cx(type.bodyLg, tone.secondary)}>
                                No tercerizamos ni fragmentamos tu marca entre proveedores sueltos. Un mismo
                                equipo piensa, produce y mide.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </Section>
        </>
    );
}

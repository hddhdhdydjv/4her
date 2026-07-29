import { Screen, gutter, type, tone } from "@/components/ui/section";
import { IsoCluster } from "@/components/graphics/iso";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Intro 2` (2020:5846) — el frame va de y=142 a y=814 dentro de los 900
 * de la sección (142 arriba / 86 abajo) y mide 1280×672.
 *
 * Dos columnas de 608 con 64 de gap: ilustración a la izquierda, contenido a
 * la derecha centrado en vertical. Los anchos van en % del contenedor de 1280
 * para que acompañen cuando la ventana es más angosta.
 */
export function About() {
    return (
        <Screen
            id="quienes-somos"
            inset={cx(gutter, "pt-[clamp(88px,15.78vh,174px)] pb-[clamp(48px,9.56vh,105px)]")}
        >
            {/* El frame mide 672 de alto sobre los 900 de la sección = 74.67vh. */}
            <div className="flex flex-1 flex-col gap-8 lg:min-h-[74.67vh] lg:flex-row lg:gap-[5%]">
                {/* Image (2020:5847) — 608 de 1280 = 47.5% */}
                <Reveal
                    delay={0}
                    variant="scale"
                    className="flex h-52 shrink-0 items-center justify-center sm:h-64 lg:h-auto lg:w-[47.5%] lg:flex-none lg:self-center"
                >
                    <IsoCluster className="h-full w-full max-w-[320px] lg:max-w-none" />
                </Reveal>

                {/* Content (2020:5893) — gap 24, bloque de titular con gap 16 */}
                <div className="flex flex-col gap-6 lg:w-[47.5%] lg:flex-none lg:justify-center">
                    <div className="flex max-w-[800px] flex-col gap-4">
                        <Reveal delay={80}>
                            <p className={cx(type.title, tone.secondary)}>Quiénes somos</p>
                        </Reveal>
                        <Reveal delay={160}>
                            <h2 className={cx(type.h2, tone.primary, "text-balance")}>
                                De la estrategia a la ejecución, sin intermediarios
                            </h2>
                        </Reveal>
                    </div>

                    <Reveal delay={280}>
                        <p className={cx(type.bodyLg, tone.secondary, "max-w-[800px]")}>
                            No entregamos piezas lindas y desaparecemos. Pensamos qué decir y por qué,
                            trabajamos con vos en cada paso y medimos si de verdad comunica. Somos la cara de
                            comunicación de 4HIS, aplicando la misma forma de trabajar a tu marca.
                        </p>
                    </Reveal>
                </div>
            </div>
        </Screen>
    );
}

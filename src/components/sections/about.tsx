import { Screen, screenType, tone } from "@/components/ui/section";
import { IsoCluster } from "@/components/graphics/iso";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Intro — Quiénes somos` (40:3782) + `Feature 1` (40:3776), fusionados
 * en una sola pantalla (marcada así en el wireframe de referencia): el
 * segundo titular queda como pie de imagen en vez de su propia sección.
 */
export function About() {
    return (
        <Screen id="quienes-somos" className="justify-center">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
                <Reveal delay={0} variant="side" x={-28} className="flex flex-col gap-3 lg:gap-4">
                    <p className={cx(screenType.title, tone.secondary)}>Quiénes somos</p>
                    <h1 className={cx(screenType.h1, tone.primary, "text-balance")}>
                        Más estratégicos que una agencia, más cerca que un freelance
                    </h1>
                    <p className={cx(screenType.body, tone.secondary)}>
                        No entregamos piezas lindas y desaparecemos. Pensamos qué decir y por qué,
                        trabajamos con vos en cada paso y medimos si de verdad comunica. Somos la cara de
                        comunicación de 4HIS, aplicando la misma forma de trabajar a tu marca.
                    </p>
                </Reveal>

                <Reveal delay={160} variant="scale" className="flex flex-col gap-3 lg:gap-4">
                    <div className="aspect-[16/10] w-full max-w-[260px] lg:max-w-[380px]">
                        <IsoCluster className="h-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <h3 className={cx(screenType.h3, tone.primary)}>
                            De la estrategia a la ejecución, sin intermediarios
                        </h3>
                        <p className={cx(screenType.body, tone.secondary)}>
                            No tercerizamos ni fragmentamos tu marca entre proveedores sueltos. Un mismo
                            equipo piensa, produce y mide.
                        </p>
                    </div>
                </Reveal>
            </div>
        </Screen>
    );
}

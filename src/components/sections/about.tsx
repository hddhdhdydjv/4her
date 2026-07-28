import { Screen, screenType, type, tone } from "@/components/ui/section";
import { IsoCluster } from "@/components/graphics/iso";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Desktop: ilustración grande a la izquierda (~44% ancho), columna derecha con
 * dos párrafos cortos arriba y un titular display grande abajo — copiando el
 * ritmo de texto/imagen de la referencia.
 * Mobile: ilustración arriba (altura fija), texto y titular debajo apilados.
 */
export function About() {
    return (
        <Screen id="quienes-somos">
            {/* flex-1 para ocupar el alto disponible en desktop */}
            <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:gap-14">
                {/* Ilustración: altura fija mobile, ocupa todo el alto del row en desktop */}
                <Reveal
                    delay={0}
                    variant="scale"
                    className="flex h-52 shrink-0 items-center justify-center sm:h-64 lg:h-auto lg:w-[44%] lg:flex-none lg:self-stretch"
                >
                    <IsoCluster className="h-full w-full max-w-[320px] lg:max-w-none" />
                </Reveal>

                {/* Columna derecha: cuerpo arriba, titular grande abajo */}
                <div className="flex flex-col gap-6 lg:flex-1 lg:justify-between lg:py-1">
                    <div className="flex flex-col gap-3 lg:gap-4">
                        <Reveal delay={80}>
                            <p className={cx(screenType.title, tone.secondary)}>Quiénes somos</p>
                        </Reveal>
                        <Reveal delay={160}>
                            <p className={cx(screenType.body, tone.secondary)}>
                                Somos la rama de comunicación y marketing de 4HIS Technology. Antes de producir
                                cualquier pieza, pensamos qué decir, a quién y por qué.
                            </p>
                        </Reveal>
                        <Reveal delay={240}>
                            <p className={cx(screenType.body, tone.secondary)}>
                                No tercerizamos ni fragmentamos tu marca entre proveedores sueltos. Un mismo
                                equipo piensa, produce y mide — con vos, en cada paso.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={360} variant="side" x={28}>
                        <h1 className={cx(type.displaySm, tone.primary, "text-balance")}>
                            Más estratégicos que una agencia, más cerca que un freelance
                        </h1>
                    </Reveal>
                </div>
            </div>
        </Screen>
    );
}

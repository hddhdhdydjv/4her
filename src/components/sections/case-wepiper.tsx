"use client";

import { Screen, screenPadTop, type, tone } from "@/components/ui/section";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Feature 3` (40:3795): texto + `WePiper visual` (77:7620), en una
 * sola pantalla. El visual ya no crece con el scroll (esa pista ocupaba
 * varias pantallas, incompatible con el flujo de "una sección = un
 * viewport"): en su lugar, la primera vez que entra en cámara "crece" desde
 * un tamaño chico hasta llenar el resto de la pantalla, con un ease
 * pronunciado para que se note el efecto de crecimiento.
 *
 * La composición original (logo + mockup + cards) no se puede exportar desde
 * este entorno. Apenas exista el archivo, basta con dejarlo en
 * /public/images/wepiper.jpg — no hace falta tocar el código.
 */
const IMAGE_SRC: string | undefined = undefined; // "/images/wepiper.jpg"

export function CaseWePiper() {
    const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3);

    return (
        // Mantiene el top del ritmo general (para no pisar el navbar) pero
        // recorta laterales y base: el recuadro llega más cerca de los bordes
        // que en el resto de las secciones.
        <Screen
            id="caso-wepiper"
            inset={cx("px-4 sm:px-6 lg:px-8", screenPadTop, "pb-[clamp(40px,7vh,72px)]")}
            content="flex w-full flex-1 flex-col"
        >
            <div className="flex flex-col gap-2 pb-4">
                <Reveal delay={0} variant="side" x={-28}>
                    <h3 className={cx(type.h2, tone.primary, "text-balance")}>
                        De la idea a una marca que se entiende
                    </h3>
                </Reveal>
                <Reveal delay={140} variant="side" x={-28}>
                    <p className={cx(type.h3, tone.secondary)}>Así construimos WePiper.</p>
                </Reveal>
            </div>

            <div
                ref={ref}
                className={cx(
                    "relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-[var(--bg-inverse)] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    inView ? "scale-100 opacity-100" : "scale-[0.62] opacity-0",
                )}
            >
                {IMAGE_SRC ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={IMAGE_SRC} alt="Caso WePiper" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                    // Cada línea vive en una máscara `overflow-hidden` y sube
                    // desde abajo (como si el scroll la fuera descubriendo),
                    // encadenada a que el recuadro ya haya terminado de crecer.
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                        <span className="block overflow-hidden pb-2">
                            <span
                                className={cx(
                                    "block font-display text-[clamp(1.75rem,4vw,3rem)] leading-none font-medium tracking-[-0.02em] text-[var(--text-inverse)]",
                                    "transition-transform delay-[520ms] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                    inView ? "translate-y-0" : "translate-y-full",
                                )}
                            >
                                WePiper
                            </span>
                        </span>
                        <span className="block overflow-hidden">
                            <span
                                className={cx(
                                    type.body,
                                    "block text-[var(--neutral-400)]",
                                    "transition-transform delay-[660ms] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                    inView ? "translate-y-0" : "translate-y-full",
                                )}
                            >
                                Identidad, sistema visual y producto
                            </span>
                        </span>
                    </div>
                )}
            </div>
        </Screen>
    );
}

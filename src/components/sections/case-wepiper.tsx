"use client";

import { Screen, screenType, tone } from "@/components/ui/section";
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
        <Screen id="caso-wepiper">
            <div className="flex flex-col gap-3 pb-6">
                <Reveal delay={0} variant="side" x={-28}>
                    <h3 className={cx(screenType.h1, tone.primary, "text-balance")}>
                        De la idea a una marca que se entiende
                    </h3>
                </Reveal>
                <Reveal delay={140} variant="side" x={-28}>
                    <p className={cx(screenType.h2, tone.secondary)}>Así construimos WePiper.</p>
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 text-center">
                        <span className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-none font-medium tracking-[-0.02em] text-[var(--text-inverse)]">
                            WePiper
                        </span>
                        <span className={cx(screenType.body, "text-[var(--neutral-400)]")}>
                            Identidad, sistema visual y producto
                        </span>
                    </div>
                )}
            </div>
        </Screen>
    );
}

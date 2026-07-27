"use client";

import { Section, type, tone } from "@/components/ui/section";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Feature 3` (40:3795): texto + `WePiper visual` (77:7620, 1152×648).
 *
 * El bloque no es estático: arranca chico y se va agrandando a medida que
 * se scrollea, hasta ocupar el ancho completo de la pantalla.
 *
 * La composición original (logo + mockup + cards) no se puede exportar desde
 * este entorno. Apenas exista el archivo, basta con dejarlo en
 * /public/images/wepiper.jpg — no hace falta tocar el código.
 */
const IMAGE_SRC: string | undefined = undefined; // "/images/wepiper.jpg"

/** smoothstep: arranque y llegada suaves, sin librería. */
const ease = (p: number) => p * p * (3 - 2 * p);

export function CaseWePiper() {
    const { ref, progress, reduced } = useScrollProgress<HTMLDivElement>();
    const p = reduced ? 1 : ease(progress);

    return (
        <>
            {/* Text (40:3796) */}
            <Section id="caso-wepiper" pad="pt-20 pb-10 lg:pt-30 lg:pb-16">
                <Reveal>
                    <div className="flex flex-col gap-4">
                        <h3 className={cx(type.h1, tone.primary, "text-balance")}>
                            De la idea a una marca que se entiende
                        </h3>
                        <p className={cx(type.h2, tone.secondary)}>Así construimos WePiper.</p>
                    </div>
                </Reveal>
            </Section>

            {/* Pista de scroll: el bloque crece mientras se recorre. */}
            <div ref={ref} className="relative h-[250vh]">
                <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                    <div
                        className="relative aspect-[1152/648] overflow-hidden bg-[var(--bg-inverse)] will-change-[width]"
                        style={{
                            width: `${38 + 62 * p}vw`,
                            borderRadius: `${32 - 32 * p}px`,
                        }}
                    >
                        {IMAGE_SRC ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={IMAGE_SRC}
                                alt="Caso WePiper"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        ) : (
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center"
                                style={{ opacity: 0.25 + 0.75 * p }}
                            >
                                <span
                                    className="font-display leading-none font-medium tracking-[-0.02em] text-[var(--text-inverse)]"
                                    style={{ fontSize: `${2 + 4 * p}vw` }}
                                >
                                    WePiper
                                </span>
                                <span className={cx(type.body, "text-[var(--neutral-400)]")}>
                                    Identidad, sistema visual y producto
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

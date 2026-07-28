"use client";

import { useEffect, useState } from "react";
import { Section, type, tone } from "@/components/ui/section";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Feature 3` (40:3795): texto + `WePiper visual` (77:7620, 1152×648).
 *
 * El bloque no es estático: arranca grande y termina de ocupar el viewport
 * completo (ancho Y alto) a medida que se scrollea. Por eso el tamaño no se
 * anima solo con `vw` + aspect-ratio (eso deja franjas arriba/abajo si el
 * viewport no tiene la misma proporción que el bloque) — se miden los px
 * reales del viewport y se interpola ancho y alto por separado, así al
 * final el bloque es exactamente 100vw x 100vh sin importar la pantalla.
 *
 * La composición original (logo + mockup + cards) no se puede exportar desde
 * este entorno. Apenas exista el archivo, basta con dejarlo en
 * /public/images/wepiper.jpg — no hace falta tocar el código.
 */
const IMAGE_SRC: string | undefined = undefined; // "/images/wepiper.jpg"

/** smoothstep: arranque y llegada suaves, sin librería. */
const ease = (p: number) => p * p * (3 - 2 * p);

/** Proporción inicial del bloque (ancho/alto) antes de empezar a crecer. */
const START_RATIO_MOBILE = 3 / 4;
const START_RATIO_DESKTOP = 1152 / 648;
const START_WIDTH_FRACTION = 0.78;

function useViewportSize() {
    const [size, setSize] = useState({ w: 1280, h: 800 });
    useEffect(() => {
        const measure = () => setSize({ w: window.innerWidth, h: window.innerHeight });
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);
    return size;
}

export function CaseWePiper() {
    const { ref, progress, reduced } = useScrollProgress<HTMLDivElement>();
    const p = reduced ? 1 : ease(progress);
    const { w: vw, h: vh } = useViewportSize();

    const startRatio = vw < 640 ? START_RATIO_MOBILE : START_RATIO_DESKTOP;
    const startWidth = vw * START_WIDTH_FRACTION;
    const startHeight = startWidth / startRatio;

    const width = startWidth + (vw - startWidth) * p;
    const height = startHeight + (vh - startHeight) * p;

    return (
        <>
            {/* Text (40:3796): título y bajada entran con una pequeña narrativa propia. */}
            <Section id="caso-wepiper" pad="pt-12 pb-8 lg:pt-20 lg:pb-16">
                <div className="flex flex-col gap-4">
                    <Reveal delay={0}>
                        <h3 className={cx(type.h1, tone.primary, "text-balance")}>
                            De la idea a una marca que se entiende
                        </h3>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className={cx(type.h2, tone.secondary)}>Así construimos WePiper.</p>
                    </Reveal>
                </div>
            </Section>

            {/* Pista de scroll: el bloque arranca grande y termina de cubrir el viewport. */}
            <div ref={ref} className="relative h-[160vh]">
                <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                    <div
                        className="relative overflow-hidden bg-[var(--bg-inverse)] will-change-[width,height]"
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            borderRadius: `${24 - 24 * p}px`,
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
                                style={{ opacity: 0.55 + 0.45 * p }}
                            >
                                <span
                                    className="font-display leading-none font-medium tracking-[-0.02em] text-[var(--text-inverse)]"
                                    style={{ fontSize: `${3 + 3 * p}vw` }}
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

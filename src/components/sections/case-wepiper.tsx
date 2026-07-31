"use client";

import { useCallback, useEffect, useRef } from "react";
import { Screen, gutter, type, tone } from "@/components/ui/section";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
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
    // Threshold alto (0.6, no el 0.3 default): con una caja casi del ancho
    // completo de la pantalla, al 30% disparaba con la mitad de arriba
    // todavía fuera de cámara — para cuando se veía completa ya había
    // terminado de crecer, así que en la práctica no se notaba.
    const { ref, inView } = useInViewOnce<HTMLDivElement>(0.6);
    const boxRef = useRef<HTMLDivElement>(null);
    // Callback ref memoizado: uno inline se recrea en cada render y React
    // desengancha + reengancha el nodo en cada uno (aunque sea el mismo
    // elemento), sin necesidad.
    const setRefs = useCallback(
        (el: HTMLDivElement | null) => {
            ref.current = el;
            boxRef.current = el;
        },
        [ref],
    );

    // Crecimiento sutil (no un "pop" desde invisible): el recuadro ya está ahí,
    // solo se agranda un poco al llegar a la sección. anime.js para que la
    // curva sea la misma que el resto de las entradas del sitio.
    useEffect(() => {
        if (!inView) return;
        const el = boxRef.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.style.transform = "none";
            return;
        }

        import("animejs").then(({ animate }) => {
            animate(el, { scale: [0.9, 1], duration: 1200, ease: "outExpo" });
        });
    }, [inView]);

    return (
        <Screen
            id="caso-wepiper"
            inset={cx(gutter, "pt-[clamp(72px,13.33vh,147px)] pb-[clamp(40px,7.11vh,78px)]")}
        >
            {/* Text (2020:5933): título H1 44 y subtítulo H2 34, a 800 de ancho.
                El bloque cierra en y=220 y el visual abre en y=268: gap 48. */}
            <div className="flex max-w-[800px] flex-col gap-4 pb-12">
                <SplitReveal delay={0} className={cx(type.h1, tone.primary, "text-balance")}>
                    De la idea a una marca que se entiende
                </SplitReveal>
                <Reveal delay={140} variant="side" x={-28}>
                    <p className={cx(type.h2, tone.tertiary)}>Así construimos WePiper.</p>
                </Reveal>
            </div>

            <div
                ref={setRefs}
                style={{ transform: "scale(0.9)" }}
                className={cx(
                    // WePiper visual (2020:5936): 1280×648 — el ancho completo
                    // del contenido, no a sangre.
                    "relative aspect-[3/4] lg:aspect-[1280/648] min-h-[320px] w-full overflow-hidden rounded-2xl bg-[var(--bg-inverse)]",
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

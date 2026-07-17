"use client";

import { useEffect, useRef } from "react";
import { Hero } from "@/components/sections/hero";
import { Globe } from "@/components/graphics/illustrations";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import type Lenis from "lenis";

/**
 * Scroll perpetuo sin costura:
 * 1. Antesala en crema con el wordmark gigante.
 * 2. CLON estático del hero a continuación.
 * 3. Cuando el scroll alcanza el clon, Lenis teletransporta a la posición
 *    equivalente del hero real. Ambos son idénticos pixel a pixel → salto imperceptible.
 */
export function LoopSeam() {
    const cloneRef = useRef<HTMLDivElement>(null);
    const lenis = useLenisInstance();

    useEffect(() => {
        const clone = cloneRef.current;
        if (!clone || !lenis) return;

        let cloneTop = clone.offsetTop;
        const measure = () => {
            cloneTop = clone.offsetTop;
        };
        window.addEventListener("resize", measure, { passive: true });

        const onScroll = (l: Lenis) => {
            if (l.scroll >= cloneTop) {
                lenis.scrollTo(l.scroll - cloneTop, { immediate: true });
            }
        };

        lenis.on("scroll", onScroll);
        return () => {
            lenis.off("scroll", onScroll);
            window.removeEventListener("resize", measure);
        };
    }, [lenis]);

    return (
        <>
            {/* Antesala: crema, wordmark gigante */}
            <section
                aria-hidden="true"
                className="relative flex h-[80vh] items-end overflow-hidden bg-[var(--brand-cream)]"
            >
                <div className="pointer-events-none absolute top-[10vh] right-[-18vw] w-[42vw] text-[var(--brand-ink)] opacity-25">
                    <Globe className="h-auto w-full" spin />
                </div>
                <div className="mx-auto w-full max-w-container px-6 pb-8">
                    <p className="font-display text-[clamp(5rem,18vw,17rem)] leading-[0.9] font-medium tracking-[-0.04em] text-primary">
                        4HER
                    </p>
                </div>
            </section>

            {/* Clon estático del hero: zona de teleport */}
            <div ref={cloneRef} aria-hidden="true" className="pointer-events-none">
                <Hero isStatic />
            </div>
        </>
    );
}

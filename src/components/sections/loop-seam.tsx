"use client";

import { useEffect, useRef } from "react";
import { Hero } from "@/components/sections/hero";
import { Globe } from "@/components/graphics/illustrations";

/**
 * Scroll perpetuo sin costura:
 * 1. Antesala en crema con el wordmark gigante.
 * 2. CLON estatico del hero a continuacion.
 * 3. Apenas el scroll entra al clon, se teletransporta a la posicion
 *    equivalente del hero real (que esta en scrollY=0). Como ambos son
 *    identicos pixel a pixel, el salto es imperceptible incluso con inercia.
 */
export function LoopSeam() {
    const cloneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clone = cloneRef.current;
        if (!clone) return;

        let cloneTop = 0;
        const measure = () => {
            cloneTop = clone.offsetTop;
        };
        measure();

        const onScroll = () => {
            if (window.scrollY >= cloneTop) {
                window.scrollTo({
                    top: window.scrollY - cloneTop,
                    left: 0,
                    behavior: "instant" as ScrollBehavior,
                });
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", measure, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", measure);
        };
    }, []);

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

            {/* Clon estatico del hero: la zona de teleport */}
            <div ref={cloneRef} aria-hidden="true" className="pointer-events-none">
                <Hero isStatic />
            </div>
        </>
    );
}

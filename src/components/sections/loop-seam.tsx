"use client";

import { useEffect, useRef } from "react";
import { Hero } from "@/components/sections/hero";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import type Lenis from "lenis";

/**
 * Scroll perpetuo sin costura:
 * 1. Apenas termina Contacto, arranca un CLON estático del hero.
 * 2. Cuando el scroll alcanza el clon, Lenis teletransporta a la posición
 *    equivalente del hero real. Ambos son idénticos pixel a pixel → salto imperceptible.
 * Sin antesala: del form de contacto se vuelve directo al hero.
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
        // Clon estático del hero: zona de teleport que cierra el loop.
        <div ref={cloneRef} aria-hidden="true" className="pointer-events-none">
            <Hero isStatic />
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useLenisInstance } from "@/components/providers/lenis-provider";

/**
 * Sigue el scroll y devuelve un entero de 0 a `steps`.
 *
 * Devuelve un entero, y no la fracción cruda, para poder actualizar el estado
 * sólo cuando ese entero cambia. El scroll dispara decenas de veces por
 * segundo; con la fracción habría un re-render por evento, y así hay como
 * mucho `steps` renders en todo el recorrido.
 *
 * `span` es cuánto scroll (en alturas de ventana) tarda en llegar al tope.
 *
 * Con `prefers-reduced-motion` arranca y queda en el tope: el efecto que lo
 * use tiene que verse igual de terminado, sólo que sin la progresión.
 */
export function useScrollSteps(steps: number, span = 0.6) {
    const [value, setValue] = useState(0);
    const lenis = useLenisInstance();

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setValue(steps);
            return;
        }

        const compute = (scroll: number) => {
            const distance = Math.max(window.innerHeight * span, 1);
            const p = Math.min(Math.max(scroll / distance, 0), 1);
            const next = Math.round(p * steps);
            setValue((prev) => (prev === next ? prev : next));
        };

        if (lenis) {
            const onScroll = ({ scroll }: { scroll: number }) => compute(scroll);
            lenis.on("scroll", onScroll);
            compute(lenis.scroll);
            return () => lenis.off("scroll", onScroll);
        }

        const onScroll = () => compute(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        compute(window.scrollY);
        return () => window.removeEventListener("scroll", onScroll);
    }, [lenis, span, steps]);

    return value;
}

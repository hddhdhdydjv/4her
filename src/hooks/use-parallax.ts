"use client";

import { useEffect, useRef } from "react";
import { useLenisInstance } from "@/components/providers/lenis-provider";

/**
 * Devuelve una ref para pegar a una capa; la mueve en Y según el scroll.
 *
 * `speed` es cuánto se "queda atrás" la capa respecto de la página:
 *   0     -> viaja igual que el resto (primer plano)
 *   0.45  -> se queda muy atrás (fondo lejano)
 * Valores negativos la adelantan (sale de cuadro antes que la página).
 *
 * Se engancha al scroll de Lenis cuando está disponible; si todavía no montó
 * (o el usuario navega sin smooth scroll) cae a un listener de scroll nativo.
 * Respeta `prefers-reduced-motion`: en ese caso no mueve nada.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number) {
    const ref = useRef<T>(null);
    const lenis = useLenisInstance();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        let frame = 0;

        const apply = (scroll: number) => {
            // Sólo interesa el tramo en que el hero sigue en pantalla; más allá
            // la capa ya no se ve y seguir moviéndola es trabajo tirado.
            const limit = window.innerHeight * 1.5;
            const y = Math.min(scroll, limit) * speed;
            el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
        };

        const schedule = (scroll: number) => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                apply(scroll);
            });
        };

        if (lenis) {
            const onScroll = ({ scroll }: { scroll: number }) => apply(scroll);
            lenis.on("scroll", onScroll);
            apply(lenis.scroll);
            return () => {
                lenis.off("scroll", onScroll);
                if (frame) cancelAnimationFrame(frame);
            };
        }

        const onScroll = () => schedule(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        apply(window.scrollY);
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [lenis, speed]);

    return ref;
}

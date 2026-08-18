"use client";

import { useEffect, useRef } from "react";
import { useLenisInstance } from "@/components/providers/lenis-provider";

/**
 * Publica el avance del scroll (0 → 1) como la variable CSS `--reveal` sobre
 * el elemento de la ref.
 *
 * Va como variable y no como estado de React a propósito: el scroll dispara
 * decenas de veces por segundo, y re-renderizar en cada evento obliga al
 * navegador a rehacer el subárbol entero. Tocando una variable, el cambio no
 * pasa por React y no toca el layout.
 *
 * `span` es cuánto scroll (en alturas de ventana) tarda en llegar a 1.
 *
 * Con `prefers-reduced-motion` queda fijo en 1: el efecto que la use tiene que
 * verse igual de terminado, sólo que sin la progresión.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(span = 0.6) {
    const ref = useRef<T>(null);
    const lenis = useLenisInstance();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.style.setProperty("--reveal", "1");
            return;
        }

        let frame = 0;
        let last = -1;

        const apply = (scroll: number) => {
            const distance = Math.max(window.innerHeight * span, 1);
            const p = Math.min(Math.max(scroll / distance, 0), 1);
            // Dos decimales alcanzan para que se vea continuo y evitan escribir
            // en el estilo cuando el cambio es imperceptible.
            const rounded = Math.round(p * 100) / 100;
            if (rounded === last) return;
            last = rounded;
            el.style.setProperty("--reveal", String(rounded));
        };

        const schedule = (scroll: number) => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                apply(scroll);
            });
        };

        if (lenis) {
            const onScroll = ({ scroll }: { scroll: number }) => schedule(scroll);
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
    }, [lenis, span]);

    return ref;
}

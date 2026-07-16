"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Devuelve el progreso (0..1) de scroll a través de un elemento "pineable":
 * 0 cuando su top toca el top del viewport, 1 cuando su bottom lo alcanza.
 * `reduced` es true si el usuario prefiere menos movimiento.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
    const ref = useRef<T>(null);
    const [progress, setProgress] = useState(0);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) {
            setReduced(true);
            setProgress(1);
            return;
        }

        let raf = 0;
        const update = () => {
            raf = 0;
            const rect = el.getBoundingClientRect();
            const range = el.offsetHeight - window.innerHeight;
            const p = range > 0 ? -rect.top / range : 0;
            setProgress(Math.min(1, Math.max(0, p)));
        };
        const onScroll = () => {
            if (!raf) raf = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return { ref, progress, reduced };
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progreso (0..1) del scroll a través de un elemento "pineable":
 * 0 cuando su borde superior toca el viewport, 1 cuando termina de recorrerlo.
 *
 * Con `prefers-reduced-motion` se sigue midiendo — el progreso es la posición
 * real del scroll, no una animación añadida — pero sin suavizado. `reduced`
 * queda expuesto para que cada sección decida si aplica el efecto continuo.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
    const ref = useRef<T>(null);
    const [progress, setProgress] = useState(0);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setReduced(isReduced);

        const lerp = isReduced ? 1 : 0.22;
        let raf = 0;
        let smooth = 0;
        let target = 0;

        const measure = () => {
            const rect = el.getBoundingClientRect();
            const range = el.offsetHeight - window.innerHeight;
            target = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
        };

        const tick = () => {
            smooth += (target - smooth) * lerp;
            if (Math.abs(target - smooth) < 0.0005) {
                smooth = target;
                setProgress(smooth);
                raf = 0;
                return;
            }
            setProgress(smooth);
            raf = window.requestAnimationFrame(tick);
        };

        const kick = () => {
            measure();
            if (!raf) raf = window.requestAnimationFrame(tick);
        };

        kick();
        window.addEventListener("scroll", kick, { passive: true });
        window.addEventListener("resize", kick, { passive: true });
        return () => {
            window.removeEventListener("scroll", kick);
            window.removeEventListener("resize", kick);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return { ref, progress, reduced };
}

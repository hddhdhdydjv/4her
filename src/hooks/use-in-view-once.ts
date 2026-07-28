"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dispara una sola vez, la primera vez que el nodo entra en el viewport.
 * Con `prefers-reduced-motion` devuelve `true` de entrada, sin esperar scroll.
 */
export function useInViewOnce<T extends HTMLElement>(
    threshold = 0.3,
    rootMargin = "0px 0px -10% 0px",
) {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setInView(true);
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setInView(true);
                        io.unobserve(el);
                    }
                }
            },
            { threshold, rootMargin },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold, rootMargin]);

    return { ref, inView };
}

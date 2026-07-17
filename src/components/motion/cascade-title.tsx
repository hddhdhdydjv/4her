"use client";

import { useEffect, useRef } from "react";

/**
 * Titular que entra en cascada por caracteres (anime.js text.split).
 * SSR renderiza el texto completo; el split y la animación corren en cliente.
 * Si algo falla, el texto queda visible (fallback seguro).
 */
export function CascadeTitle({
    children,
    className,
    delay = 150,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let cancelled = false;
        import("animejs")
            .then(({ animate, stagger, text }) => {
                if (cancelled) return;
                try {
                    const splitter = text.split(el, { lines: true, chars: true });
                    for (const line of splitter.lines as HTMLElement[]) {
                        line.style.overflow = "clip";
                    }
                    animate(splitter.chars as HTMLElement[], {
                        translateY: ["115%", "0%"],
                        duration: 800,
                        delay: stagger(14, { start: delay }),
                        ease: "out(4)",
                    });
                } catch {
                    /* fallback: texto visible sin animar */
                }
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, [delay]);

    return (
        <h1 ref={ref} className={className}>
            {children}
        </h1>
    );
}

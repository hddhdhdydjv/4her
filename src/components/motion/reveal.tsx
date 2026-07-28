"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    className?: string;
    /** Delay en ms antes de animar. */
    delay?: number;
    /** Desplazamiento vertical inicial en px. */
    y?: number;
    /** Etiqueta a renderizar (div por defecto). */
    as?: ElementType;
};

/**
 * Revela su contenido con un fade + subida suave al entrar en viewport.
 * Motion cálido (ease-out), una sola vez, con fallback prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0, y = 32, as: Tag = "div" }: RevealProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.filter = "none";
            return;
        }

        let done = false;
        const show = () => {
            if (done) return;
            done = true;
            import("animejs")
                .then(({ animate }) => {
                    animate(el, {
                        opacity: [0, 1],
                        translateY: [y, 0],
                        filter: ["blur(8px)", "blur(0px)"],
                        duration: 900,
                        delay,
                        ease: "out(3)",
                    });
                })
                .catch(() => {
                    // Fallback si anime.js no carga: mostrar sin animar.
                    el.style.opacity = "1";
                    el.style.transform = "none";
                    el.style.filter = "none";
                });
        };

        // Fallback duro: si IntersectionObserver no existe, mostrar ya.
        if (typeof IntersectionObserver === "undefined") {
            el.style.opacity = "1";
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        io.unobserve(el);
                        show();
                    }
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [delay, y]);

    return (
        <Tag ref={ref} className={className} style={{ opacity: 0, filter: "blur(8px)" }}>
            {children}
        </Tag>
    );
}

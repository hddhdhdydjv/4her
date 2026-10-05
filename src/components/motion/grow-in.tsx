"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { cx } from "@/utils/cx";

/**
 * La caja ya está ahí y, la primera vez que entra en cámara, crece apenas
 * hasta su tamaño: no es un "pop" desde invisible. anime.js para que la curva
 * sea la misma que el resto de las entradas del sitio.
 *
 * Umbral alto (0.6): con una caja casi del ancho de la pantalla, al 30%
 * disparaba con la mitad de arriba todavía fuera de cámara y para cuando se
 * veía entera ya había terminado de crecer.
 */
export function GrowIn({ children, className }: { children: ReactNode; className?: string }) {
    const { ref, inView } = useInViewOnce<HTMLDivElement>(0.6);
    const boxRef = useRef<HTMLDivElement>(null);
    const setRefs = useCallback(
        (el: HTMLDivElement | null) => {
            ref.current = el;
            boxRef.current = el;
        },
        [ref],
    );

    useEffect(() => {
        if (!inView) return;
        const el = boxRef.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.style.transform = "none";
            return;
        }

        import("animejs").then(({ animate }) => {
            animate(el, { scale: [0.9, 1], duration: 1200, ease: "outExpo" });
        });
    }, [inView]);

    return (
        <div ref={setRefs} style={{ transform: "scale(0.9)" }} className={cx(className)}>
            {children}
        </div>
    );
}

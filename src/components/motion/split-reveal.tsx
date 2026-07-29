"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";

type SplitRevealProps = {
    children: ReactNode;
    className?: string;
    /** Delay en ms antes de que arranque la primera palabra. */
    delay?: number;
    /** Milisegundos entre la entrada de una palabra y la siguiente. */
    stagger?: number;
    /** Unidad de split: por palabra (default, matiza mejor con dos líneas) o por línea entera. */
    by?: "words" | "lines";
    /** Etiqueta a renderizar (h2 por defecto, para titulares). */
    as?: ElementType;
};

/**
 * Revela un titular palabra por palabra (o línea por línea) a medida que
 * entra en viewport, con `TextSplitter` de anime.js v4. Cuando termina, hace
 * `.revert()`: deshace el split y devuelve el nodo a texto plano — el estado
 * final coincide en píxeles con el texto sin animar, así que revertir no se
 * nota, y el texto vuelve a ser seleccionable/legible por lectores de
 * pantalla en vez de quedar fragmentado en spans para siempre.
 *
 * Con prefers-reduced-motion no se divide nada: el texto queda como vino.
 */
export function SplitReveal({
    children,
    className,
    delay = 0,
    stagger: staggerMs = 60,
    by = "words",
    as: Tag = "h2",
}: SplitRevealProps) {
    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (typeof IntersectionObserver === "undefined") return;

        let cancelled = false;
        let splitter: { words: HTMLElement[]; lines: HTMLElement[]; revert: () => void } | null = null;
        let io: IntersectionObserver | null = null;

        import("animejs").then(({ splitText, animate, stagger, set }) => {
            if (cancelled || !el) return;

            splitter = splitText(el, by === "lines" ? { lines: true, words: false } : { words: true });
            const targets = by === "lines" ? splitter.lines : splitter.words;
            if (!targets.length) return;

            set(targets, { opacity: 0, translateY: 18, filter: "blur(5px)" });

            io = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting && !cancelled) {
                            io?.disconnect();
                            animate(targets, {
                                opacity: [0, 1],
                                translateY: [18, 0],
                                filter: ["blur(5px)", "blur(0px)"],
                                duration: 850,
                                delay: stagger(staggerMs, { start: delay }),
                                ease: "outExpo",
                                onComplete: () => {
                                    if (!cancelled) splitter?.revert();
                                },
                            });
                        }
                    }
                },
                { threshold: 0.4, rootMargin: "0px 0px -10% 0px" },
            );
            io.observe(el);
        });

        return () => {
            cancelled = true;
            io?.disconnect();
            splitter?.revert();
        };
    }, [delay, staggerMs, by]);

    return (
        <Tag ref={ref} className={className}>
            {children}
        </Tag>
    );
}

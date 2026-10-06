"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { useRevealTrigger } from "@/hooks/use-reveal-trigger";
import { cx } from "@/utils/cx";

type SplitRevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
    as?: ElementType;
};

type Controls = { play: () => void; reset: () => void };

const FROM = "0.55em";

/**
 * Titular que entra palabra por palabra.
 *
 * - Se parte una sola vez al montar y las palabras quedan partidas: nada de
 *   `revert()` al terminar, que reacomodaba el párrafo.
 * - El titular arranca oculto por CSS (`.t-split`) y recién se muestra cuando
 *   las palabras ya están escondidas, para que no se vea entero un instante.
 * - Entra y vuelve a entrar con `useRevealTrigger`: se resetea sólo cuando
 *   salió del viewport por completo.
 * - Sin blur: en tipografía grande es lo más caro y lo que más "ensucia".
 */
export function SplitReveal({
    children,
    className,
    delay = 0,
    stagger: staggerMs = 60,
    as: Tag = "h2",
}: SplitRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const controls = useRef<Controls | null>(null);
    const wanted = useRef(false);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.classList.add("is-ready");
            return;
        }

        let cancelled = false;
        let cleanup = () => {};

        import("animejs").then(({ splitText, animate, stagger, set, cubicBezier }) => {
            if (cancelled) return;

            const splitter = splitText(el, { words: true });
            const words = splitter.words;
            let anim: ReturnType<typeof animate> | null = null;

            const reset = () => {
                anim?.pause();
                set(words, { opacity: 0, translateY: FROM });
            };
            const play = () => {
                anim?.pause();
                set(words, { opacity: 0, translateY: FROM });
                anim = animate(words, {
                    opacity: [0, 1],
                    translateY: [FROM, 0],
                    duration: 800,
                    delay: stagger(staggerMs, { start: delay }),
                    ease: cubicBezier(0.22, 1, 0.36, 1),
                });
            };

            reset();
            el.classList.add("is-ready");
            controls.current = { play, reset };
            if (wanted.current) play();

            cleanup = () => {
                anim?.pause();
                splitter.revert();
            };
        });

        return () => {
            cancelled = true;
            controls.current = null;
            cleanup();
        };
    }, [delay, staggerMs]);

    useRevealTrigger(
        ref,
        {
            onShow: () => {
                wanted.current = true;
                controls.current?.play();
            },
            onHide: () => {
                wanted.current = false;
                controls.current?.reset();
            },
        },
        { threshold: 0.4, bottomMargin: "-10%" },
    );

    return (
        <Tag ref={ref} className={cx("t-split", className)}>
            {children}
        </Tag>
    );
}

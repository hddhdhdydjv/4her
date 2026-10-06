"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useRevealTrigger } from "@/hooks/use-reveal-trigger";
import { cx } from "@/utils/cx";

type RevealVariant = "up" | "scale" | "side";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    x?: number;
    variant?: RevealVariant;
    /** Fracción visible a partir de la cual entra. */
    threshold?: number;
    as?: ElementType;
};

/**
 * Entrada al scroll. El estado oculto y la transición viven en CSS
 * (`.t-reveal` en transitions.css), así el HTML del servidor ya sale en su
 * estado inicial y la animación corre en el compositor. JS sólo prende y
 * apaga `.is-shown`. Se repite cada vez que la sección vuelve a entrar.
 *
 * Al ocultar se agrega `.is-reset` (invisible pero en su lugar): si volviera a
 * su desplazamiento de partida, el rect del elemento se movería de nuevo hacia
 * la pantalla y el observer lo mostraría otra vez, en un parpadeo en el borde.
 */
export function Reveal({
    children,
    className,
    delay = 0,
    y = 24,
    x = 28,
    variant = "up",
    threshold,
    as: Tag = "div",
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);

    useRevealTrigger(
        ref,
        {
            onShow: () => {
                const el = ref.current;
                if (!el) return;
                el.classList.remove("is-reset");
                // Reflow: fija el estado de partida (corrido) antes de animar.
                void el.offsetWidth;
                el.classList.add("is-shown");
            },
            onHide: () => {
                const el = ref.current;
                if (!el) return;
                el.classList.remove("is-shown");
                el.classList.add("is-reset");
            },
        },
        { threshold },
    );

    return (
        <Tag
            ref={ref}
            className={cx("t-reveal", `t-reveal--${variant}`, className)}
            style={
                {
                    "--reveal-delay": `${delay}ms`,
                    "--reveal-y": `${y}px`,
                    "--reveal-x": `${x}px`,
                } as CSSProperties
            }
        >
            {children}
        </Tag>
    );
}

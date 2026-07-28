"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealVariant = "up" | "scale" | "side";

type RevealProps = {
    children: ReactNode;
    className?: string;
    /** Delay en ms antes de animar. */
    delay?: number;
    /** Desplazamiento vertical inicial en px (solo variant "up"). */
    y?: number;
    /**
     * Tipo de entrada según lo que se revela:
     *  - "up": fade + subida + desenfoque (texto, default).
     *  - "scale": fade + zoom suave, sin desenfoque (imágenes, visuales).
     *  - "side": fade + deslizamiento lateral (columnas enfrentadas).
     */
    variant?: RevealVariant;
    /** Dirección del deslizamiento lateral en px (negativo = desde la izquierda). */
    x?: number;
    /** Etiqueta a renderizar (div por defecto). */
    as?: ElementType;
};

const VARIANT_DEFAULTS: Record<RevealVariant, { duration: number; ease: string }> = {
    up: { duration: 950, ease: "outExpo" },
    scale: { duration: 900, ease: "outExpo" },
    side: { duration: 900, ease: "outExpo" },
};

/**
 * Revela su contenido al entrar en viewport, con una de tres entradas
 * (ver `variant`). Motion cálido, una sola vez, con fallback
 * prefers-reduced-motion.
 */
export function Reveal({
    children,
    className,
    delay = 0,
    y = 32,
    x = 28,
    variant = "up",
    as: Tag = "div",
}: RevealProps) {
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
            const { duration, ease } = VARIANT_DEFAULTS[variant];
            import("animejs")
                .then(({ animate }) => {
                    if (variant === "scale") {
                        animate(el, { opacity: [0, 1], scale: [0.94, 1], duration, delay, ease });
                    } else if (variant === "side") {
                        animate(el, { opacity: [0, 1], translateX: [x, 0], duration, delay, ease });
                    } else {
                        animate(el, {
                            opacity: [0, 1],
                            translateY: [y, 0],
                            filter: ["blur(6px)", "blur(0px)"],
                            duration,
                            delay,
                            ease,
                        });
                    }
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
    }, [delay, y, x, variant]);

    const initialTransform =
        variant === "scale" ? "scale(0.94)" : variant === "side" ? `translateX(${x}px)` : `translateY(${y}px)`;

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                opacity: 0,
                transform: initialTransform,
                filter: variant === "up" ? "blur(6px)" : "none",
            }}
        >
            {children}
        </Tag>
    );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const COLS = 12;
const ROWS = 7;

/**
 * Cortina de píxeles a pantalla completa que tapa el corte entre dos
 * secciones y se disuelve en mosaico a medida que avanza el scroll real
 * por ese límite — sin pinnear nada ni sumar alto a la página.
 *
 * Es `position: fixed` y no forma parte del flujo del documento: se monta
 * como hermano entre dos secciones y mide la posición real de `targetId`
 * (la sección que "aparece" detrás) para saber cuándo empezar y terminar
 * de disolverse. El color de los tiles es el fondo de la sección que se
 * deja atrás, para que la cortina se sienta como una continuación de esa
 * sección y no como un velo neutro.
 */
export function PixelTransition({
    targetId,
    color = "var(--neutral-200)",
}: {
    targetId: string;
    color?: string;
}) {
    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState(false);
    const reducedRef = useRef(false);
    const seeds = useMemo(() => Array.from({ length: COLS * ROWS }, () => Math.random()), []);

    useEffect(() => {
        reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedRef.current) return;

        const target = document.getElementById(targetId);
        if (!target) return;

        let raf = 0;
        const measure = () => {
            const top = target.getBoundingClientRect().top + window.scrollY;
            const vh = window.innerHeight;
            // Arranca cuando el destino asoma por abajo del viewport,
            // termina cuando ya quedó bien arriba: una transición corta,
            // atada al scroll real, no a un tramo extra de la página.
            const start = top - vh;
            const end = top - vh * 0.35;
            const p = end > start ? (window.scrollY - start) / (end - start) : 1;
            setProgress(Math.min(1, Math.max(0, p)));
        };

        const kick = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                measure();
                raf = 0;
            });
        };

        measure();
        setReady(true);
        window.addEventListener("scroll", kick, { passive: true });
        window.addEventListener("resize", kick);
        return () => {
            window.removeEventListener("scroll", kick);
            window.removeEventListener("resize", kick);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [targetId]);

    if (reducedRef.current || !ready || progress >= 1) return null;

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-30 grid"
            style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}
        >
            {seeds.map((seed, i) => {
                // Cada tile arranca su propio tramo de disolución en un punto
                // distinto del progreso global: eso arma el efecto de mosaico
                // en vez de un fundido parejo.
                const start = seed * 0.65;
                const local = Math.min(1, Math.max(0, (progress - start) / 0.35));
                const eased = local * local * (3 - 2 * local);
                return (
                    <div
                        key={i}
                        style={{
                            background: color,
                            opacity: 1 - eased,
                            transform: `scale(${1 - eased * 0.85})`,
                        }}
                    />
                );
            })}
        </div>
    );
}

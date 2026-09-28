"use client";

import { useCallback, useEffect, useRef } from "react";
import { DotGrid } from "@/components/ui/dot-grid";
import { DotRing } from "@/components/ui/dot-ring";
import { type } from "@/components/ui/section";
import { cx } from "@/utils/cx";

/**
 * Rueda de servicios: los nombres orbitan alrededor del aro y el que queda al
 * frente es el que manda en la sección.
 *
 * Cada etiqueta vive en un ángulo φ = 2π·(avance + i/n). De ahí salen las dos
 * cosas que la describen: la altura (`sin φ`) y la profundidad (`cos φ`), que
 * es lo que decide nitidez, escala y opacidad. Al ser una vuelta continua no
 * hay salto de vuelta al empezar — el problema que sí tiene una lista que se
 * reordena por índice.
 *
 * El avance corre solo, lentísimo, salvo que el puntero esté encima: ahí la
 * rueda se clava en un servicio y lo sostiene hasta que el puntero se va.
 *
 * Las posiciones se escriben directo sobre el nodo en cada frame, no por
 * estado de React: son 60 actualizaciones por segundo de tres elementos, y
 * rerenderizar la sección entera en cada una es tirar trabajo a la basura.
 * Lo único que sube a React es el cambio de servicio al frente.
 */

/** Vueltas por segundo del giro libre. */
const SPEED = 0.035;

/** Qué tan rápido la rueda persigue el servicio fijado (0-1 por frame). */
const EASE = 0.12;

/** Alto del recorrido vertical, en proporción al alto de la caja. */
const REACH = 0.34;

export function ServicesOrbit({
    items,
    onFocus,
}: {
    items: string[];
    onFocus: (index: number) => void;
}) {
    const boxRef = useRef<HTMLDivElement>(null);
    const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const advance = useRef(0);
    /** Servicio fijado por el puntero, o null si la rueda gira libre. */
    const pinned = useRef<number | null>(null);
    const front = useRef(-1);
    /** Caja de la rueda, leída al entrar: evita medir en cada pointermove. */
    const boxRect = useRef<{ center: number; height: number } | null>(null);

    // El callback vive en un ref: si entrara como dependencia del efecto, un
    // padre que lo recrea en cada render reiniciaría el bucle de animación.
    const onFocusRef = useRef(onFocus);
    useEffect(() => {
        onFocusRef.current = onFocus;
    }, [onFocus]);

    /** Avance que deja al servicio `i` al frente, por el camino más corto. */
    const pin = useCallback(
        (i: number) => {
            const turn = i / items.length;
            pinned.current = Math.round(advance.current + turn) - turn;
        },
        [items.length],
    );

    /**
     * Servicio más cercano a la altura del puntero.
     *
     * Sale de la misma cuenta que dibuja el frame, no de medir los nodos: son
     * tres posiciones que ya conocemos, y leer sus rects en cada pointermove
     * forzaría un reflow por evento.
     */
    const nearestTo = useCallback(
        (clientY: number) => {
            const box = boxRect.current;
            if (!box) return Math.max(front.current, 0);

            let best = 0;
            let bestDistance = Infinity;
            for (let i = 0; i < items.length; i++) {
                const phi = 2 * Math.PI * (advance.current + i / items.length);
                const y = box.center - Math.sin(phi) * REACH * box.height;
                const distance = Math.abs(clientY - y);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    best = i;
                }
            }
            return best;
        },
        [items.length],
    );

    useEffect(() => {
        const n = items.length;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let raf = 0;
        let last = performance.now();
        let height = boxRef.current?.offsetHeight ?? 0;

        const ro = new ResizeObserver(() => {
            height = boxRef.current?.offsetHeight ?? 0;
        });
        if (boxRef.current) ro.observe(boxRef.current);

        function frame(now: number) {
            // Tope al delta: si la pestaña estuvo en segundo plano, el primer
            // frame al volver trae segundos enteros y la rueda pegaría un
            // salto en vez de retomar.
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            if (pinned.current !== null) {
                advance.current += (pinned.current - advance.current) * EASE;
            } else if (!reduced) {
                advance.current += dt * SPEED;
            }

            let bestIndex = 0;
            let bestDepth = -2;

            for (let i = 0; i < n; i++) {
                const phi = 2 * Math.PI * (advance.current + i / n);
                const depth = Math.cos(phi);
                const lift = -Math.sin(phi);
                // 0 = al fondo, 1 = al frente.
                const t = (depth + 1) / 2;

                const el = labelRefs.current[i];
                if (el) {
                    el.style.transform = `translate(-50%, -50%) translateY(${lift * REACH * height}px) scale(${0.82 + t * 0.18})`;
                    el.style.opacity = `${0.1 + t * 0.9}`;
                    el.style.filter = `blur(${(1 - t) * 7}px)`;
                    el.style.zIndex = `${Math.round(t * 10)}`;
                }

                if (depth > bestDepth) {
                    bestDepth = depth;
                    bestIndex = i;
                }
            }

            if (bestIndex !== front.current) {
                front.current = bestIndex;
                onFocusRef.current(bestIndex);
            }

            raf = requestAnimationFrame(frame);
        }

        raf = requestAnimationFrame(frame);
        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [items.length]);

    return (
        <div
            ref={boxRef}
            className="relative aspect-square w-full max-w-[520px]"
            // La selección se reevalúa sólo cuando el puntero se mueve de
            // verdad. Si dependiera del hover de cada etiqueta, con el cursor
            // quieto las etiquetas seguirían pasando por debajo y cada una
            // volvería a fijar la rueda: nunca se asentaría en ninguna.
            onPointerEnter={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                boxRect.current = { center: rect.top + rect.height / 2, height: rect.height };
                pin(nearestTo(event.clientY));
            }}
            onPointerMove={(event) => pin(nearestTo(event.clientY))}
            onPointerLeave={() => {
                pinned.current = null;
            }}
        >
            <DotGrid color="rgba(20,20,20,0.07)" />

            {/* Círculos fantasma: la profundidad de campo del diseño, sin foto. */}
            <div
                aria-hidden="true"
                className="absolute top-[6%] left-[4%] size-[62%] rounded-full border border-[var(--border-default)]/70"
            />
            <div
                aria-hidden="true"
                className="absolute right-[2%] bottom-[4%] size-[56%] rounded-full border border-[var(--border-default)]/70"
            />

            <DotRing className="absolute top-1/2 left-1/2 h-[66%] w-auto -translate-x-1/2 -translate-y-1/2" />

            {items.map((label, i) => (
                <button
                    key={label}
                    type="button"
                    ref={(el) => {
                        labelRefs.current[i] = el;
                    }}
                    onFocus={() => pin(i)}
                    onClick={() => pin(i)}
                    style={{ transform: "translate(-50%, -50%)" }}
                    className={cx(
                        type.serif,
                        // Angosta a propósito: los nombres son largos y tienen
                        // que quebrar dentro del aro, no pasarlo de lado a lado.
                        "absolute top-1/2 left-1/2 w-[52%] cursor-pointer text-center",
                        "text-[clamp(1.0625rem,1.9vw,1.5rem)] leading-[1.2] text-[var(--text-primary)]",
                        "transition-[color] duration-300 outline-none",
                    )}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

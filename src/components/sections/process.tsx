"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Section, type, tone } from "@/components/ui/section";
import { cx } from "@/utils/cx";

/**
 * Figma `Text list 1` (40:3826) — flex gap-48, Header a la izquierda y
 * la lista a la derecha (filas bg/secondary, rounded-16, p-24, gap-16).
 *
 * Los marcadores de paso NO son números: en el diseño son iconos de 24px
 * hechos con puntos (1, 2, 3 y 4 puntos sobre una grilla de 2×2).
 */
const steps = [
    {
        dots: 1,
        title: "Nos conocemos",
        body: "Escuchamos qué querés lograr y a quién querés llegar.",
    },
    {
        dots: 2,
        title: "Definimos el rumbo",
        body: "Acordamos qué decir y por qué antes de producir nada.",
    },
    {
        dots: 3,
        title: "Creamos juntos",
        body: "Mostramos, ajustamos con tu feedback, iteramos rápido.",
    },
    {
        dots: 4,
        title: "Acompañamos",
        body: "Seguimos midiendo y afinando. No entregamos y desaparecemos.",
    },
];

/** Posiciones sobre la grilla de 24×24: los puntos se suman de a uno. */
const GRID: Array<[number, number]> = [
    [8, 15], // 1 · abajo izquierda
    [15, 8], // 2 · arriba derecha
    [8, 8], // 3 · arriba izquierda
    [15, 15], // 4 · abajo derecha
];

function DotIcon({ count, className }: { count: number; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            {GRID.slice(0, count).map(([cx_, cy], i) => (
                <circle key={i} cx={cx_} cy={cy} r={2.6} fill="currentColor" />
            ))}
        </svg>
    );
}

export function Process() {
    // Los pasos se encienden a medida que la sección entra en pantalla.
    const { ref, progress, reduced } = useScrollProgress<HTMLDivElement>();

    return (
        <div ref={ref}>
            <Section id="proceso">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
                    {/* Header (40:3827) */}
                    <div className="lg:flex-1">
                        <h2 className={cx(type.h1, tone.primary, "text-balance")}>
                            Un proceso simple, sin cajas negras
                        </h2>
                    </div>

                    {/* List (40:3829) */}
                    <ol className="flex flex-col gap-4 lg:flex-1">
                        {steps.map((s, i) => {
                            const on = reduced || progress * steps.length >= i + 0.15;
                            return (
                                <li
                                    key={s.title}
                                    className={cx(
                                        "flex min-w-0 flex-col gap-4 rounded-2xl bg-[var(--bg-secondary)] p-6",
                                        "transition-all duration-500 ease-out",
                                        on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-45",
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <DotIcon
                                            count={s.dots}
                                            className={cx(
                                                "size-6 shrink-0 transition-colors duration-500",
                                                on ? "text-[var(--text-primary)]" : "text-[var(--neutral-400)]",
                                            )}
                                        />
                                        <h3 className={cx(type.h3, tone.primary)}>{s.title}</h3>
                                    </div>
                                    <p className={cx(type.bodyLg, tone.primary)}>{s.body}</p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </Section>
        </div>
    );
}

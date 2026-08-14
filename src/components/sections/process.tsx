"use client";

import type { CSSProperties } from "react";
import { type } from "@/components/ui/section";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { cx } from "@/utils/cx";

/**
 * Proceso — v2 bento.
 * Columna izquierda sticky oscura con titular + columna derecha clara con
 * 4 cards de pasos (entran una a una con el scroll).
 *
 * Mobile: apilado (header oscuro → 4 cards en columna).
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

const GRID: Array<[number, number]> = [
    [8, 15], // 1 punto
    [15, 8], // 2 puntos
    [8, 8],  // 3 puntos
    [15, 15],// 4 puntos
];

function DotIcon({ count, className, style }: { count: number; className?: string; style?: CSSProperties }) {
    return (
        <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
            {GRID.slice(0, count).map(([px, py], i) => (
                <circle key={i} cx={px} cy={py} r={2.6} fill="currentColor" />
            ))}
        </svg>
    );
}

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
    const { ref, inView } = useInViewOnce<HTMLLIElement>();

    return (
        <li
            ref={ref}
            style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
            className={cx(
                "flex flex-col gap-4 p-8 sm:p-10 lg:p-10",
                "border-b border-[var(--neutral-200)] last:border-0",
                "transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
        >
            <div className="flex items-center gap-3">
                <DotIcon
                    count={step.dots}
                    style={{ transitionDelay: inView ? `${index * 100 + 200}ms` : "0ms" }}
                    className={cx(
                        "size-6 shrink-0 text-[var(--neutral-400)]",
                        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                        inView ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                />
                <h3
                    className="font-display font-semibold leading-[1.18] tracking-[-0.005em] text-[var(--neutral-900)]"
                    style={{ fontSize: "clamp(1.125rem, 1.9vw, 1.5rem)" }}
                >
                    {step.title}
                </h3>
            </div>
            <p className={cx(type.bodyLg, "text-[var(--neutral-500)] max-w-[50ch]")}>{step.body}</p>
        </li>
    );
}

export function Process() {
    return (
        <section
            id="proceso"
            className={cx(
                "flex flex-col",
                "lg:flex-row lg:min-h-[160vh]",
            )}
        >
            {/* ── Left: sticky dark ── */}
            <div
                className={cx(
                    "flex flex-col justify-end gap-6 p-10 sm:p-12 lg:p-16",
                    "bg-[var(--neutral-900)]",
                    "min-h-[55vw] sm:min-h-0 py-16",
                    "lg:sticky lg:top-0 lg:h-screen lg:w-[40%] lg:shrink-0 lg:min-h-0",
                )}
            >
                <p className={cx(type.label, "uppercase tracking-[0.12em] text-[var(--neutral-500)]")}>
                    Nuestro proceso
                </p>
                <h2
                    className="font-display font-medium leading-[1.0] tracking-[-0.035em] text-[var(--neutral-50)]"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                >
                    Un proceso simple,
                    <br />sin cajas negras
                </h2>
                <p className={cx(type.bodyLg, "text-[var(--neutral-500)]")}>
                    Y siempre a tu lado.
                </p>
            </div>

            {/* ── Right: light — 4 step cards ── */}
            <div className="flex flex-1 flex-col bg-[var(--neutral-50)]">
                <ol className="flex flex-col divide-y-0">
                    {steps.map((s, i) => (
                        <StepCard key={s.title} step={s} index={i} />
                    ))}
                </ol>
            </div>
        </section>
    );
}

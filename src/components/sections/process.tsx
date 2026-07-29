"use client";

import type { CSSProperties } from "react";
import { Screen, gutter, type, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { cx } from "@/utils/cx";

/**
 * Figma `Process` (2020:6199) — 1440×900. El frame interno va de y=146 a
 * y=754 y son dos columnas de 616 con 48 de gap: intro a la izquierda y la
 * lista de 4 filas de 616×124 a la derecha.
 *
 * Los marcadores de paso NO son números: son los iconos de puntos del
 * diseño (1, 2, 3 y 4 puntos sobre una grilla de 2×2).
 *
 * Cada card entra por separado la primera vez que pisa el viewport —así
 * "van apareciendo una a una" con el scroll— y el dot hace un pequeño pop
 * unos milisegundos después de que la card ya asentó.
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

function DotIcon({
    count,
    className,
    style,
}: {
    count: number;
    className?: string;
    style?: CSSProperties;
}) {
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
    const cardDelay = `${index * 130}ms`;
    const dotDelay = `${index * 130 + 220}ms`;

    return (
        <li
            ref={ref}
            style={{ transitionDelay: inView ? cardDelay : "0ms" }}
            className={cx(
                // Row (2020:6207): 124 de alto, padding 24, título a 24 del tope
                // y descripción en y=71.
                "flex min-w-0 flex-col gap-4 rounded-2xl bg-[var(--bg-secondary)] p-4 sm:p-6",
                "transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
        >
            <div className="flex items-center gap-3">
                <DotIcon
                    count={step.dots}
                    style={{ transitionDelay: inView ? dotDelay : "0ms" }}
                    className={cx(
                        "size-6 shrink-0 text-[var(--text-primary)]",
                        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                        inView ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                />
                <h3 className={cx(type.h3, tone.primary)}>{step.title}</h3>
            </div>
            <p className={cx(type.bodyLg, tone.secondary)}>{step.body}</p>
        </li>
    );
}

export function Process() {
    return (
        <Screen
            id="proceso"
            inset={cx(gutter, "pt-[clamp(88px,16.22vh,179px)] pb-[clamp(88px,16.22vh,179px)]")}
        >
            {/* Proceso (2020:6200): dos columnas de 616 con 48 de gap, sobre 1280. */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[3.75%]">
                {/* Headline (gap 16) + 32 + Subtitle = los 205 del intro. */}
                <div className="flex flex-col gap-8 lg:w-[48.125%] lg:shrink-0">
                    <div className="flex flex-col gap-4">
                        <Reveal delay={260} variant="side" x={-28}>
                            <p className={cx(type.title, tone.secondary)}>Nuestro proceso</p>
                        </Reveal>
                        <Reveal delay={0} variant="side" x={-28}>
                            <h2 className={cx(type.h1, tone.primary, "text-balance")}>
                                Un proceso simple, sin cajas negras
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={420} variant="side" x={-28}>
                        <p className={cx(type.h2, tone.tertiary)}>Y siempre a tu lado.</p>
                    </Reveal>
                </div>

                {/* List (2020:6206): filas de 616×124 con 16 de gap, la primera
                    a 32 del tope. Entran en orden con el scroll. */}
                <ol className="flex flex-col gap-4 lg:w-[48.125%] lg:shrink-0 lg:pt-8">
                    {steps.map((s, i) => (
                        <StepCard key={s.title} step={s} index={i} />
                    ))}
                </ol>
            </div>
        </Screen>
    );
}

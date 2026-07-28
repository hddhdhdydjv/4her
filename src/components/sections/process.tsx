"use client";

import type { CSSProperties } from "react";
import { Screen, screenType, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { cx } from "@/utils/cx";

/**
 * Figma `Text list 1` (40:3826) — Header a la izquierda, lista a la derecha,
 * en una sola pantalla: filas más compactas (p-4 en vez de p-6) para que las
 * 4 entren junto al header sin scroll interno.
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
                "flex min-w-0 flex-col gap-1.5 rounded-2xl bg-[var(--bg-secondary)] p-3 sm:gap-2 sm:p-4",
                "transition-all duration-700 ease-out",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
        >
            <div className="flex items-center gap-3">
                <DotIcon
                    count={step.dots}
                    style={{ transitionDelay: inView ? dotDelay : "0ms" }}
                    className={cx(
                        "size-5 shrink-0 text-[var(--text-primary)]",
                        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                        inView ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                />
                <h3 className={cx(screenType.h3, tone.primary)}>{step.title}</h3>
            </div>
            <p className={cx(screenType.body, tone.primary)}>{step.body}</p>
        </li>
    );
}

export function Process() {
    return (
        <Screen id="proceso" className="justify-center">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                {/* Header (40:3827): la frase entra primero; eyebrow y bajada la
                    acompañan después, aunque el eyebrow quede arriba en el layout. */}
                <div className="flex flex-col gap-4 lg:flex-1">
                    <Reveal delay={260}>
                        <p className={cx(screenType.title, tone.secondary)}>Nuestro proceso</p>
                    </Reveal>
                    <Reveal delay={0}>
                        <h2 className={cx(screenType.h1, tone.primary, "text-balance")}>
                            Un proceso simple, sin cajas negras
                        </h2>
                    </Reveal>
                    <Reveal delay={420}>
                        <p className={cx(screenType.body, tone.secondary)}>
                            Nada de plantillas: cada paso se adapta a cómo trabaja tu marca.
                        </p>
                    </Reveal>
                </div>

                {/* List (40:3829): 2×2 en mobile para que entre junto al header;
                    vuelve a ser una lista vertical desde lg. */}
                <ol className="grid grid-cols-2 gap-2 sm:gap-3 lg:flex-1 lg:grid-cols-1">
                    {steps.map((s, i) => (
                        <StepCard key={s.title} step={s} index={i} />
                    ))}
                </ol>
            </div>
        </Screen>
    );
}

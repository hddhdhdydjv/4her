"use client";

import { Screen, gutter, type, tone } from "@/components/ui/section";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Proceso: tres tarjetas en fila. El número de cada paso va enorme y casi del
 * color de la tarjeta, de fondo; el título arriba y la descripción abajo.
 *
 * Cada tarjeta entra por separado cada vez que pisa el viewport, así
 * "van apareciendo una a una" con el scroll.
 */
const steps = [
    {
        title: "Diagnóstico",
        body: "Una reunión inicial para entender tu negocio, tu marca actual y dónde está el problema real: ¿es de mensaje, de canal o de proceso comercial?",
    },
    {
        title: "Propuesta",
        body: "Te devolvemos un plan concreto: qué servicios, en qué orden, y qué vas a poder medir en los primeros 90 días.",
    },
    {
        title: "Ejecución y ajuste",
        body: "Trabajamos en sprints cortos con reportes mensuales, para poder corregir el rumbo antes de que el presupuesto se vaya en algo que no funciona.",
    },
];

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
    return (
        <Reveal
            as="li"
            delay={index * 110}
            y={32}
            className={cx(
                "relative isolate flex min-h-[clamp(280px,30vw,430px)] flex-col justify-between gap-10 overflow-hidden",
                "rounded-2xl bg-[var(--bg-secondary)] p-6 lg:p-8",
            )}
        >
            {/* Numeral de fondo: apenas más claro que la tarjeta. */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-[4%] -bottom-[14%] -z-10 font-display text-[clamp(12rem,22vw,20rem)] leading-none font-medium text-white/55 select-none"
            >
                {index + 1}
            </span>
            <h3 className={cx(type.title, tone.primary)}>{step.title}</h3>
            <p className={cx(type.bodySm, tone.secondary, "max-w-[34ch]")}>{step.body}</p>
        </Reveal>
    );
}

export function Process() {
    return (
        <Screen id="proceso" inset={cx(gutter, "pt-[clamp(88px,16vh,176px)] pb-[clamp(88px,16vh,176px)]")}>
            <div className="flex flex-col gap-10 lg:gap-12">
                <SplitReveal delay={0} className={cx(type.h1, tone.primary, "text-balance")}>
                    Así arrancamos con un cliente nuevo
                </SplitReveal>

                <ol className="grid gap-4 md:grid-cols-3">
                    {steps.map((s, i) => (
                        <StepCard key={s.title} step={s} index={i} />
                    ))}
                </ol>
            </div>
        </Screen>
    );
}

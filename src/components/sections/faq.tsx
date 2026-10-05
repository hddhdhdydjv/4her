"use client";

import { useId, useState } from "react";
import { Screen, gutter, type, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

/**
 * Preguntas frecuentes con el acordeón de transitions.dev (estilos en
 * `styles/transitions.css`): la altura anima por `grid-template-rows`, sin
 * medir nada en JS. La primera arranca abierta, como en el diseño.
 */
const faqs = [
    {
        q: "¿Trabajan con empresas chicas o solo con corporativos?",
        a: "Con ambos. El plan cambia según el tamaño y el presupuesto, pero la lógica es la misma: mensaje claro, canales correctos y objetivos medibles.",
    },
    {
        q: "¿Cuánto tarda en verse resultado?",
        a: "Depende del servicio. Las campañas de pauta muestran datos desde las primeras semanas; el posicionamiento de marca y la estrategia comercial son procesos de mediano plazo, con hitos revisables cada trimestre.",
    },
    {
        q: "¿Necesito tener ya definida mi marca antes de hacer campañas?",
        a: "No es obligatorio, pero lo recomendamos. Sin un posicionamiento claro, la pauta paga suele traer tráfico que no convierte porque el mensaje no es consistente.",
    },
    {
        q: "¿Cómo miden el éxito de un proyecto?",
        a: "Con los KPIs que definimos juntos en la etapa de diagnóstico: leads, ventas, tráfico calificado o los hitos del plan comercial, según el servicio contratado.",
    },
];

/** El "+" del diseño: violeta apagado, el único color fuera de la escala neutral. */
const ICON = "#8E6BA8";

function Item({ q, a, defaultOpen }: { q: string; a: string; defaultOpen: boolean }) {
    const [open, setOpen] = useState(defaultOpen);
    const id = useId();

    return (
        <li className="t-acc border-t border-[var(--border-default)] last:border-b" data-open={open}>
            <button
                type="button"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpen((v) => !v)}
                className={cx(
                    "t-acc-head flex w-full cursor-pointer items-center justify-between gap-6 py-[clamp(24px,3.2vw,46px)] text-left lg:px-6",
                    type.body,
                    tone.primary,
                )}
            >
                {q}
                <span className="t-acc-icon shrink-0" style={{ color: ICON }} aria-hidden="true">
                    <svg viewBox="0 0 16 16" className="size-4" fill="none">
                        <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </span>
            </button>
            <div id={id} className="t-acc-panel">
                {/* El padding va en el hijo, nunca en el panel: en el track de
                    0fr dejaría una franja y el panel no cerraría del todo. */}
                <div className="t-acc-panel-inner">
                    <p className={cx(type.bodySm, tone.secondary, "max-w-[760px] pb-6 lg:px-6")}>{a}</p>
                </div>
            </div>
        </li>
    );
}

export function FAQ() {
    return (
        <Screen id="faq" inset={cx(gutter, "pt-[clamp(72px,13.33vh,147px)] pb-[clamp(88px,16vh,176px)]")}>
            <div className="flex flex-col gap-10 lg:gap-12">
                <div className="flex flex-col gap-3">
                    <SplitReveal delay={0} className={cx(type.h1, tone.primary, "text-balance")}>
                        Preguntas frecuentes
                    </SplitReveal>
                    <Reveal delay={140}>
                        <p className={cx(type.lead, tone.tertiary)}>Lo que suelen preguntarnos antes de arrancar.</p>
                    </Reveal>
                </div>

                <ul>
                    {faqs.map((f, i) => (
                        <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
                    ))}
                </ul>
            </div>
        </Screen>
    );
}

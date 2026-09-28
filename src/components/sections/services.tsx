"use client";

import { useCallback, useState } from "react";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Screen, gutter, type, tone } from "@/components/ui/section";
import { ServicesOrbit } from "@/components/ui/services-orbit";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { cx } from "@/utils/cx";

/**
 * Servicios: la rueda a la izquierda manda, el detalle a la derecha responde.
 *
 * El servicio al frente de la rueda es el que se despliega. Los tres bloques
 * de texto viven apilados en la misma celda de una grilla, así que la caja
 * mide lo que el más largo y nada se corre al cambiar de servicio.
 */
const services = [
    {
        tag: "identidad",
        title: "Posicionamiento de",
        em: "marca",
        short: "Posicionamiento de marca",
        body: "Definimos el territorio de marca, el tono de comunicación y la propuesta de valor que te diferencia de tu competencia. Lo bajamos a un manual aplicable a cada pieza que produzcas.",
        items: [
            "Auditoría de marca y análisis competitivo",
            "Definición de propuesta de valor",
            "Manual de identidad verbal y visual",
            "Tono y lineamientos de comunicación",
        ],
    },
    {
        tag: "ejecución",
        title: "Marketing digital y",
        em: "campañas",
        short: "Marketing digital y campañas",
        body: "Diseñamos, ejecutamos y optimizamos campañas en los canales donde está tu cliente, orientadas a un objetivo concreto: leads, tráfico calificado o ventas directas.",
        items: [
            "Google Ads, Meta e Instagram Ads",
            "Contenido y calendario para redes",
            "Email marketing y automatización",
            "Reporte mensual de resultados",
        ],
    },
    {
        tag: "negocio",
        title: "Estrategia",
        em: "comercial",
        short: "Estrategia comercial",
        body: "Miramos tu embudo de ventas de punta a punta, identificamos dónde se pierden oportunidades y armamos un plan comercial con objetivos trimestrales medibles.",
        items: [
            "Diagnóstico del proceso comercial",
            "Definición de objetivos y KPIs",
            "Plan trimestral de acción",
            "Acompañamiento en la implementación",
        ],
    },
];

const labels = services.map((s) => s.short);

/**
 * Fundido de un servicio al siguiente: el que sale se va primero y el que
 * entra espera. Cruzados, en la mitad los dos están al 50% y se ve el bajón.
 */
const FADE_MS = 280;

function fade(isActive: boolean) {
    return {
        transitionProperty: "opacity",
        transitionDuration: `${FADE_MS}ms`,
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: isActive ? `${FADE_MS}ms` : "0ms",
        opacity: isActive ? 1 : 0,
    } as const;
}

export function Services() {
    const [active, setActive] = useState(0);
    const scrollTo = useAnchorScroll();

    // Memoizado: la rueda lo guarda en un ref, pero si cambiara de identidad
    // en cada render el efecto que lo sincroniza correría de más.
    const onFocus = useCallback((i: number) => setActive(i), []);

    return (
        <Screen
            id="servicios"
            inset={cx(gutter, "pt-[clamp(72px,13.33vh,147px)] pb-[clamp(72px,13.33vh,147px)]")}
        >
            <div className="flex flex-col gap-14 lg:gap-20">
                {/* Encabezado: rótulo, titular y remate en itálica a la derecha. */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                    <div className="flex max-w-[640px] flex-col gap-4">
                        <Reveal delay={0}>
                            <p className={cx(type.label, tone.tertiary, "uppercase")}>
                                Qué podemos hacer juntos / 02
                            </p>
                        </Reveal>
                        <SplitReveal delay={120} className={cx(type.h1, tone.primary, "text-balance")}>
                            Servicios que hacen avanzar tu marca.
                        </SplitReveal>
                    </div>
                    <Reveal delay={260}>
                        <p className={cx(type.serif, type.bodyLg, tone.secondary, "max-w-[28ch] lg:text-right")}>
                            Del primer mensaje a la próxima venta, con una dirección compartida.
                        </p>
                    </Reveal>
                </div>

                <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-[8%]">
                    <div className="flex w-full justify-center lg:w-[46%] lg:shrink-0">
                        <ServicesOrbit items={labels} onFocus={onFocus} />
                    </div>

                    {/* Pila en grilla: los tres comparten celda, así que la caja
                        mide lo que el más largo y el botón no se mueve. */}
                    <div className="grid w-full lg:w-[46%]">
                        {services.map((s, i) => (
                            <div
                                key={s.tag}
                                aria-hidden={i !== active}
                                className={cx(
                                    "col-start-1 row-start-1 flex flex-col items-start gap-5",
                                    i !== active && "pointer-events-none",
                                )}
                                style={fade(i === active)}
                            >
                                <span
                                    className={cx(
                                        type.label,
                                        "flex items-center gap-2 rounded-full bg-[var(--bg-secondary)] px-3 py-1.5",
                                        tone.secondary,
                                    )}
                                >
                                    <span className="size-1.5 rounded-full bg-[var(--text-primary)]" />
                                    {s.tag}
                                </span>

                                <h3 className={cx(type.h2, tone.primary, "text-balance")}>
                                    {s.title} <span className={type.serif}>{s.em}</span>
                                </h3>

                                <p className={cx(type.bodyLg, tone.secondary, "max-w-[46ch]")}>{s.body}</p>

                                <ul className="flex flex-col gap-3 pt-1">
                                    {s.items.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className={cx(type.body, tone.tertiary)}>+</span>
                                            <span className={cx(type.body, tone.secondary)}>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#contacto"
                                    onClick={scrollTo}
                                    className={cx(
                                        type.body,
                                        "group mt-3 flex items-center gap-2.5 rounded-full bg-[var(--bg-inverse)] py-2.5 pr-2.5 pl-6",
                                        "text-[var(--text-inverse)] transition-opacity hover:opacity-85",
                                    )}
                                >
                                    Hacé tu consulta
                                    <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                                        <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Screen>
    );
}

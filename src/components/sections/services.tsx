"use client";

import { useCallback } from "react";
import { SectionIntro, type, tone, gutter } from "@/components/ui/section";
import { ServiceCanvas } from "@/components/sections/service-canvas";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { cx } from "@/utils/cx";

/**
 * Figma `Intro — Servicios` (74:6992) + `Feature 2` (40:3787).
 *
 * Los servicios NO se apilan: la sección queda fija en pantalla y van
 * pasando con el scroll, mientras el indicador de barras verticales
 * (74:7016 — activa 16px #646464, inactivas 8px #b4b8b4) marca la posición.
 */
const services = [
    {
        letter: "b",
        title: "Branding & Rebranding",
        body: [
            "Creamos o renovamos la identidad de tu marca: naming, sistema visual y guías de uso.",
            "Para que cada pieza que produzcas, la hagas vos o un tercero, se vea y se sienta igual.",
        ],
    },
    {
        letter: "e",
        title: "Estrategia & Posicionamiento",
        body: [
            "Definimos qué decir, a quién y por qué, antes de producir cualquier pieza.",
            "Mensajes clave y propuesta de valor que sostienen todo lo que comunicás después.",
        ],
    },
    {
        letter: "m",
        title: "Marketing digital & Contenido",
        body: [
            "Contenido y campañas pensadas para comunicar, no solo para llenar el feed.",
            "Estrategia de canales y calendario editorial adaptados a tu marca y tu audiencia.",
        ],
    },
    {
        letter: "g",
        title: "Growth & Prensa",
        body: [
            "Hacemos crecer la presencia de tu marca con growth y relaciones con prensa.",
            "Comunicación institucional y sostenibilidad cuando tu marca lo necesita.",
        ],
    },
];

/** Container 74:7016 — cuatro barras de 1px alineadas abajo. */
function BarIndicator({
    count,
    active,
    onSelect,
}: {
    count: number;
    active: number;
    onSelect: (i: number) => void;
}) {
    return (
        <div className="flex items-end gap-2" role="tablist" aria-label="Servicios">
            {Array.from({ length: count }, (_, i) => (
                <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={services[i].title}
                    onClick={() => onSelect(i)}
                    className={cx(
                        "relative w-px cursor-pointer transition-all duration-500 ease-out",
                        "before:absolute before:-inset-x-2 before:-inset-y-3 before:content-['']",
                        i === active ? "h-4 bg-[#646464]" : "h-2 bg-[#b4b8b4]",
                    )}
                />
            ))}
        </div>
    );
}

export function Services() {
    const { ref, progress } = useScrollProgress<HTMLDivElement>();
    // El contenido pinneado hace un fade-in la primera vez que se engancha:
    // evita el "corte brusco" de aparecer ya armado apenas entra la sección.
    const { ref: stageRef, inView: staged } = useInViewOnce<HTMLDivElement>(0.35, "0px");
    const n = services.length;
    const active = Math.min(n - 1, Math.max(0, Math.floor(progress * n)));

    // Click en una barra: salta al tramo de scroll de ese servicio.
    const goTo = useCallback(
        (i: number) => {
            const el = ref.current;
            if (!el) return;
            const range = el.offsetHeight - window.innerHeight;
            const top = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top + range * ((i + 0.5) / n), behavior: "smooth" });
        },
        [ref, n],
    );

    return (
        <>
            <SectionIntro
                id="servicios"
                eyebrow="Nuestros servicios"
                size="displaySm"
                title={
                    <>
                        Servicios que se combinan
                        <br className="hidden sm:block" /> según lo que tu marca necesita
                    </>
                }
                subtitle="Vos elegís por dónde empezar"
                subtitleTone="tertiary"
                pad="pt-20 pb-8 lg:pt-30 lg:pb-16"
            />

            {/* Pista de scroll: un tramo de viewport por servicio. */}
            <div ref={ref} style={{ height: `${n * 100}vh` }} className="relative">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    <div
                        ref={stageRef}
                        className={cx(
                            gutter,
                            "w-full transition-all duration-1000 ease-out",
                            staged ? "translate-y-0 opacity-100 blur-none" : "translate-y-6 opacity-0 blur-sm",
                        )}
                    >
                        <div className="mx-auto flex w-full max-w-[1152px] flex-col items-center gap-8 lg:flex-row lg:gap-16">
                            {/* Content (40:3788) */}
                            <div className="flex w-full flex-col gap-8 lg:flex-1 lg:gap-12">
                                <BarIndicator count={n} active={active} onSelect={goTo} />

                                {/* Text (40:3789) — los paneles se cruzan en el mismo lugar */}
                                <div className="relative min-h-[220px] sm:min-h-[190px] lg:min-h-[215px]">
                                    {services.map((s, i) => (
                                        <div
                                            key={s.title}
                                            aria-hidden={i !== active}
                                            className={cx(
                                                "absolute inset-x-0 top-0 flex flex-col gap-6 transition-all duration-700 ease-out",
                                                i === active
                                                    ? "translate-y-0 opacity-100 blur-none"
                                                    : "pointer-events-none translate-y-4 opacity-0 blur-sm",
                                            )}
                                        >
                                            <h3 className={cx(type.h2, tone.primary, "text-balance")}>{s.title}</h3>
                                            <div className={cx(type.bodyLg, tone.secondary, "flex flex-col gap-1")}>
                                                {s.body.map((line) => (
                                                    <p key={line}>{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Button (40:3792) */}
                                <a
                                    href="#contacto"
                                    className={cx(
                                        type.bodyLg,
                                        "w-fit rounded-[45px] bg-[var(--bg-inverse)] px-4 py-3 text-center text-[var(--text-inverse)] transition-opacity hover:opacity-85",
                                    )}
                                >
                                    Hacé tu consulta
                                </a>
                            </div>

                            {/* Image (74:7023) */}
                            <div className="relative w-full max-w-[544px] lg:flex-1">
                                {services.map((s, i) => (
                                    <div
                                        key={s.title}
                                        aria-hidden="true"
                                        className={cx(
                                            i === 0 ? "relative" : "absolute inset-0",
                                            "transition-all duration-700 ease-out",
                                            i === active
                                                ? "scale-100 opacity-100 blur-none"
                                                : "scale-[0.98] opacity-0 blur-sm",
                                        )}
                                    >
                                        <ServiceCanvas letter={s.letter} offset={i} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

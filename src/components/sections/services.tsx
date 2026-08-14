"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { type } from "@/components/ui/section";
import { ServiceCanvas } from "@/components/sections/service-canvas";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Servicios — v2 bento.
 * Cabecera full-width oscura + bento de dos columnas: texto izquierda,
 * canvas derecha. El scroll avanza por los 4 servicios igual que en v1;
 * solo cambia el lenguaje visual (palette oscura + fondo mauve en el canvas).
 */
const services = [
    {
        letter: "b",
        title: "Branding & Rebranding",
        body1: "Creamos o renovamos la identidad de tu marca: naming, sistema visual y guías de uso.",
        body2: "Para que cada pieza que produzcas, la hagas vos o un tercero, se vea y se sienta igual.",
    },
    {
        letter: "e",
        title: "Estrategia & Posicionamiento",
        body1: "Definimos qué decir, a quién y por qué, antes de producir cualquier pieza.",
        body2: "Mensajes clave que sostienen todo lo que comunicás después.",
    },
    {
        letter: "m",
        title: "Marketing digital & Contenido",
        body1: "Contenido y campañas pensadas para comunicar, no solo para llenar el feed.",
        body2: "Estrategia de canales y calendario editorial a medida.",
    },
    {
        letter: "g",
        title: "Growth & Prensa",
        body1: "Hacemos crecer la presencia de tu marca con growth y relaciones con prensa.",
        body2: "Comunicación institucional cuando tu marca lo necesita.",
    },
];

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
                        "relative w-px cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "before:absolute before:-inset-x-2 before:-inset-y-3 before:content-['']",
                        i === active ? "h-4 bg-[var(--neutral-300)]" : "h-2 bg-[var(--neutral-600)]",
                    )}
                />
            ))}
        </div>
    );
}

export function Services() {
    const [active, setActive] = useState(0);
    const n = services.length;
    const trackRef = useRef<HTMLElement>(null);
    const mobileTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let frame = 0;

        function read() {
            frame = 0;
            const isDesktop = window.innerWidth >= 1024;
            const el = isDesktop ? trackRef.current : mobileTrackRef.current;
            if (!el) return;

            const distance = el.offsetHeight - window.innerHeight;
            if (distance <= 0) return;

            const progress = -el.getBoundingClientRect().top / distance;
            const clamped = Math.min(Math.max(progress, 0), 1);

            if (isDesktop) {
                setActive(Math.round(clamped * (n - 1)));
            } else {
                setActive(Math.min(n - 1, Math.floor(clamped * n)));
            }
        }

        function onScroll() {
            if (frame) return;
            frame = requestAnimationFrame(read);
        }

        read();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [n]);

    function goTo(i: number) {
        const isDesktop = window.innerWidth >= 1024;
        const el = isDesktop ? trackRef.current : mobileTrackRef.current;
        if (!el) return;
        const distance = el.offsetHeight - window.innerHeight;
        if (distance <= 0) { setActive(i); return; }
        const fraction = isDesktop ? i / (n - 1) : i / n;
        const absoluteTop = window.scrollY + el.getBoundingClientRect().top;
        window.scrollTo({ top: absoluteTop + fraction * distance, behavior: "smooth" });
    }

    return (
        <section
            id="servicios"
            ref={trackRef}
            style={{ "--track": `${n * 100}vh` } as CSSProperties}
            className="relative bg-[var(--neutral-950)] lg:h-[var(--track)]"
        >
            {/* ═══ MOBILE ═══ */}
            <div className="lg:hidden">
                {/* Intro */}
                <div className="flex flex-col gap-6 p-10 sm:p-12 pt-16 sm:pt-20">
                    <Reveal delay={0}>
                        <p className={cx(type.label, "uppercase tracking-[0.12em] text-[var(--neutral-500)]")}>
                            Nuestros servicios
                        </p>
                    </Reveal>
                    <h2
                        className="font-display font-medium leading-[1.0] tracking-[-0.03em] text-[var(--neutral-50)] text-balance"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                    >
                        Servicios que se combinan según lo que tu marca necesita
                    </h2>
                    <p className={cx(type.bodyLg, "text-[var(--neutral-500)]")}>
                        Vos elegís por dónde empezar
                    </p>
                </div>

                {/* Panel sticky */}
                <div
                    ref={mobileTrackRef}
                    style={{ height: `${n * 100}vh` }}
                    className="relative"
                >
                    <div className="sticky top-0 flex h-screen min-h-0 flex-col p-10 sm:p-12 pt-8 pb-10">
                        {/* Canvas */}
                        <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-[var(--accent-default)]">
                            {services.map((s, i) => (
                                <div
                                    key={s.title}
                                    aria-hidden="true"
                                    className={cx(
                                        "absolute inset-0 flex items-center",
                                        "transition-opacity duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                        i === active ? "opacity-100" : "opacity-0",
                                    )}
                                >
                                    <ServiceCanvas letter={s.letter} offset={i} />
                                </div>
                            ))}
                        </div>

                        {/* Texto del servicio activo */}
                        <div className="flex shrink-0 flex-col gap-3 pt-4">
                            <BarIndicator count={n} active={active} onSelect={goTo} />
                            <div className="relative min-h-[108px]">
                                {services.map((s, i) => (
                                    <div
                                        key={s.title}
                                        aria-hidden={i !== active}
                                        className={cx(
                                            "absolute inset-x-0 top-0 flex flex-col gap-1.5",
                                            "transition-opacity duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                            i === active ? "opacity-100" : "pointer-events-none opacity-0",
                                        )}
                                    >
                                        <h3 className={cx(type.h2, "text-[var(--neutral-50)]")}>{s.title}</h3>
                                        <p className={cx(type.body, "text-[var(--neutral-400)]")}>{s.body1}</p>
                                    </div>
                                ))}
                            </div>
                            <a
                                href="#contacto"
                                className={cx(
                                    type.body,
                                    "w-fit mt-1 rounded-full bg-[var(--neutral-50)] px-4 py-2.5 text-center text-[var(--neutral-950)] transition-opacity hover:opacity-85",
                                )}
                            >
                                Hacé tu consulta
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ DESKTOP ═══ */}
            <div className="hidden sticky top-0 h-screen min-h-0 flex-col lg:flex">
                {/* Header row */}
                <div className="flex items-end justify-between gap-10 p-10 lg:px-16 lg:pt-20 lg:pb-10 border-b border-[var(--neutral-800)]">
                    <div className="flex flex-col gap-3">
                        <p className={cx(type.label, "uppercase tracking-[0.12em] text-[var(--neutral-500)]")}>
                            Nuestros servicios
                        </p>
                        <h2
                            className="font-display font-medium leading-[1.0] tracking-[-0.03em] text-[var(--neutral-50)] max-w-[700px] text-balance"
                            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
                        >
                            Servicios que se combinan según lo que tu marca necesita
                        </h2>
                    </div>
                    <p className={cx(type.body, "text-[var(--neutral-500)] shrink-0 pb-1")}>
                        Vos elegís por dónde empezar
                    </p>
                </div>

                {/* Bento row: texto izquierda + canvas derecha */}
                <div className="flex flex-1 min-h-0">
                    {/* Left: indicador + texto del servicio */}
                    <div className="flex w-[44%] shrink-0 flex-col justify-between gap-6 p-10 lg:px-16 lg:py-10 border-r border-[var(--neutral-800)]">
                        <div className="flex flex-col gap-6">
                            <BarIndicator count={n} active={active} onSelect={goTo} />
                            <div className="relative min-h-[220px]">
                                {services.map((s, i) => (
                                    <div
                                        key={s.title}
                                        aria-hidden={i !== active}
                                        className={cx(
                                            "absolute inset-x-0 top-0 flex flex-col gap-4",
                                            "transition-opacity duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                            i === active ? "opacity-100" : "pointer-events-none opacity-0",
                                        )}
                                    >
                                        <h3
                                            className="font-display font-semibold leading-[1.1] tracking-[-0.01em] text-[var(--neutral-50)] text-balance"
                                            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                                        >
                                            {s.title}
                                        </h3>
                                        <p className={cx(type.bodyLg, "text-[var(--neutral-400)]")}>{s.body1}</p>
                                        <p className={cx(type.body, "text-[var(--neutral-600)]")}>{s.body2}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <a
                            href="#contacto"
                            className={cx(
                                type.body,
                                "self-start rounded-full bg-[var(--neutral-50)] px-4 py-2.5 text-center text-[var(--neutral-950)] transition-opacity hover:opacity-85",
                            )}
                        >
                            Hacé tu consulta
                        </a>
                    </div>

                    {/* Right: canvas sobre fondo mauve */}
                    <div className="relative flex-1 overflow-hidden bg-[var(--accent-default)]">
                        {services.map((s, i) => (
                            <div
                                key={s.title}
                                aria-hidden="true"
                                className={cx(
                                    "absolute inset-0 flex items-center",
                                    "transition-opacity duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                    i === active ? "opacity-100" : "opacity-0",
                                )}
                            >
                                <ServiceCanvas letter={s.letter} offset={i} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

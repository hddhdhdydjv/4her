"use client";

import { useEffect, useRef, useState } from "react";
import { Screen, screenType, tone } from "@/components/ui/section";
import { ServiceCanvas } from "@/components/sections/service-canvas";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Intro — Servicios` (74:6992) + `Feature 2` (40:3787), en una sola
 * pantalla: se ve un servicio a la vez, y se cambia clickeando el indicador
 * de barras verticales (74:7016 — activa 16px #646464, inactivas 8px
 * #b4b8b4) o con la rueda del mouse: mientras queden servicios por recorrer,
 * el scroll cambia de servicio en vez de avanzar de sección; al llegar al
 * primero/último, un scroll más ya navega a la sección vecina.
 */
const services = [
    {
        letter: "b",
        title: "Branding & Rebranding",
        body: "Creamos o renovamos la identidad de tu marca: naming, sistema visual y guías de uso. Para que cada pieza que produzcas se vea y se sienta igual.",
    },
    {
        letter: "e",
        title: "Estrategia & Posicionamiento",
        body: "Definimos qué decir, a quién y por qué, antes de producir cualquier pieza. Mensajes clave que sostienen todo lo que comunicás después.",
    },
    {
        letter: "m",
        title: "Marketing digital & Contenido",
        body: "Contenido y campañas pensadas para comunicar, no solo para llenar el feed. Estrategia de canales y calendario editorial a medida.",
    },
    {
        letter: "g",
        title: "Growth & Prensa",
        body: "Hacemos crecer la presencia de tu marca con growth y relaciones con prensa. Comunicación institucional cuando tu marca lo necesita.",
    },
];

/** Container 74:7016 — cuatro barras de 1px alineadas abajo, clickeables. */
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
                        i === active ? "h-4 bg-[#646464]" : "h-2 bg-[#b4b8b4]",
                    )}
                />
            ))}
        </div>
    );
}

export function Services() {
    const [active, setActive] = useState(0);
    const n = services.length;
    const rootRef = useRef<HTMLDivElement>(null);
    const lockRef = useRef(false);

    // El wheel cicla los servicios mientras queden por mostrar; recién
    // cuando estás en el primero/último deja pasar el scroll nativo para
    // que la sección snapee a la vecina.
    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        function onWheel(e: WheelEvent) {
            if (Math.abs(e.deltaY) < 4) return;
            const dir = e.deltaY > 0 ? 1 : -1;

            setActive((prev) => {
                const next = prev + dir;
                if (next < 0 || next > n - 1) return prev;

                e.preventDefault();
                if (lockRef.current) return prev;
                lockRef.current = true;
                window.setTimeout(() => {
                    lockRef.current = false;
                }, 650);
                return next;
            });
        }

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [n]);

    return (
        <Screen id="servicios" className="justify-center">
            <div ref={rootRef} className="flex flex-col gap-5 lg:gap-8">
                <Reveal delay={0} className="flex flex-col gap-2 lg:gap-3">
                    <p className={cx(screenType.title, tone.secondary)}>Nuestros servicios</p>
                    <h2 className={cx(screenType.h1, tone.primary, "text-balance")}>
                        Servicios que se combinan según lo que tu marca necesita
                    </h2>
                    <p className={cx(screenType.body, tone.tertiary)}>Vos elegís por dónde empezar</p>
                </Reveal>

                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
                    <div className="flex flex-col gap-4 lg:gap-6">
                        <BarIndicator count={n} active={active} onSelect={setActive} />

                        <div className="relative min-h-[130px] sm:min-h-[110px]">
                            {services.map((s, i) => (
                                <div
                                    key={s.title}
                                    aria-hidden={i !== active}
                                    className={cx(
                                        "absolute inset-x-0 top-0 flex flex-col gap-3 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                        i === active
                                            ? "translate-y-0 opacity-100 blur-none"
                                            : "pointer-events-none translate-y-3 opacity-0 blur-sm",
                                    )}
                                >
                                    <h3 className={cx(screenType.h2, tone.primary, "text-balance")}>{s.title}</h3>
                                    <p className={cx(screenType.body, tone.secondary)}>{s.body}</p>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#contacto"
                            className={cx(
                                screenType.body,
                                "w-fit rounded-[45px] bg-[var(--bg-inverse)] px-4 py-2.5 text-center text-[var(--text-inverse)] transition-opacity hover:opacity-85",
                            )}
                        >
                            Hacé tu consulta
                        </a>
                    </div>

                    <div className="relative w-full max-w-[240px] justify-self-center sm:max-w-[320px] lg:max-w-none">
                        {services.map((s, i) => (
                            <div
                                key={s.title}
                                aria-hidden="true"
                                className={cx(
                                    i === 0 ? "relative" : "absolute inset-0",
                                    "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                    i === active ? "scale-100 opacity-100 blur-none" : "scale-[0.96] opacity-0 blur-sm",
                                )}
                            >
                                <ServiceCanvas letter={s.letter} offset={i} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Screen>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Screen, gutter, type, tone } from "@/components/ui/section";
import { ServiceCanvas } from "@/components/sections/service-canvas";
import { Reveal } from "@/components/motion/reveal";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import { cx } from "@/utils/cx";

/**
 * Figma `Intro — Servicios` (2020:5899) + `Feature 01` (2020:5904), dentro de
 * una sección de 900: intro de y=123.5 a y=320.5 (titular a 800 de ancho) y
 * feature de y=400.5 a y=832.5 (Content 672 + gap 64 + Image 544).
 *
 * Se ve un servicio a la vez y se cambia con el indicador de barras
 * verticales (2020:5907 — activa 16px, inactivas 8px).
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
    const activeRef = useRef(active);
    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    const lenis = useLenisInstance();
    const lenisRef = useRef(lenis);
    useEffect(() => {
        lenisRef.current = lenis;
    }, [lenis]);

    // El wheel avanza de servicio en servicio mientras queden por mostrar.
    // Al llegar al primero/último, en vez de dejar pasar el scroll nativo
    // (brusco, sin la inercia del resto del sitio) se le pide a Lenis que
    // termine el gesto llevando suave a la sección vecina — mismo motor,
    // mismo feel en todos lados.
    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        let locked = false;

        function onWheel(e: WheelEvent) {
            if (Math.abs(e.deltaY) < 4) return;
            const dir = e.deltaY > 0 ? 1 : -1;
            const next = activeRef.current + dir;

            e.preventDefault();
            if (locked) return;

            if (next >= 0 && next <= n - 1) {
                locked = true;
                setActive(next);
                window.setTimeout(() => {
                    locked = false;
                }, 700);
                return;
            }

            const targetId = dir > 0 ? "caso-wepiper" : "quienes-somos";
            const target = document.getElementById(targetId);
            if (!target || !lenisRef.current) return;
            locked = true;
            lenisRef.current.scrollTo(target, { offset: -24, duration: 1.1 });
            window.setTimeout(() => {
                locked = false;
            }, 1100);
        }

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [n]);

    return (
        <Screen
            id="servicios"
            inset={cx(gutter, "pt-[clamp(72px,13.72vh,151px)] pb-[clamp(40px,7.5vh,83px)]")}
        >
            {/* `Intro — Servicios` (2020:5899) arriba y `Feature 01` (2020:5904)
                abajo, separados por 80px (y=320.5 → y=400.5). */}
            {/* data-lenis-prevent: Lenis procesa la rueda en paralelo a nuestro
                listener, así que preventDefault() por sí solo no alcanza para
                frenar el scroll de la página — solo bloquea el scroll nativo,
                no el que calcula Lenis. Este atributo le pide a Lenis que
                ignore la rueda sobre esta zona y nos deje manejarla. */}
            <div ref={rootRef} data-lenis-prevent className="flex flex-1 flex-col gap-10 lg:gap-20">
                {/* Headline (gap 16) + 24 + Subheadline = los 197 del intro. */}
                <Reveal delay={0} className="flex max-w-[800px] flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <p className={cx(type.title, tone.secondary)}>Nuestros servicios</p>
                        <h2 className={cx(type.h1, tone.primary, "text-balance")}>
                            Servicios que se combinan según lo que tu marca necesita
                        </h2>
                    </div>
                    <p className={cx(type.h2, tone.tertiary)}>Vos elegís por dónde empezar</p>
                </Reveal>

                {/* Content 672 + gap 64 + Image 544 sobre los 1280. */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-[5%]">
                    <div className="flex flex-col gap-4 lg:w-[52.5%] lg:shrink-0 lg:gap-6">
                        <BarIndicator count={n} active={active} onSelect={setActive} />

                        {/* Text (2020:5906) mide 217: barras 16 + 24 + título 37 + 24 + desc 116 */}
                        <div className="relative min-h-[190px] sm:min-h-[180px] lg:min-h-[201px]">
                            {services.map((s, i) => (
                                <div
                                    key={s.title}
                                    aria-hidden={i !== active}
                                    className={cx(
                                        // Sin blur: con overflow-hidden + rounded-2xl en la tarjeta
                                        // de al lado, el filter creaba una fuga visual de píxeles
                                        // fuera del borde redondeado durante la transición (bug de
                                        // compositing de Chromium con filter+clip).
                                        "absolute inset-x-0 top-0 flex flex-col gap-3 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                        i === active
                                            ? "translate-y-0 opacity-100"
                                            : "pointer-events-none translate-y-3 opacity-0",
                                    )}
                                >
                                    {/* Title (2020:5912): H2 34, angosto (376 de los 672 de la
                                        columna) para que envuelva en dos líneas cortas en vez de
                                        estirarse a lo ancho. Description (2020:5913): Body/Large 18. */}
                                    <h3 className={cx(type.h2, tone.primary, "max-w-[376px] text-balance")}>
                                        {s.title}
                                    </h3>
                                    <p className={cx(type.bodyLg, tone.secondary)}>{s.body}</p>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#contacto"
                            className={cx(
                                type.body,
                                "w-fit rounded-[45px] bg-[var(--bg-inverse)] px-4 py-2.5 text-center text-[var(--text-inverse)] transition-opacity hover:opacity-85",
                            )}
                        >
                            Hacé tu consulta
                        </a>
                    </div>

                    {/* Image (2020:5916): 544×432 sobre los 1280 = 42.5%, ratio 544/432 */}
                    <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-[var(--bg-secondary)] sm:min-h-[320px] lg:aspect-[544/432] lg:min-h-0 lg:w-[42.5%] lg:shrink-0">
                        {services.map((s, i) => (
                            <div
                                key={s.title}
                                aria-hidden="true"
                                className={cx(
                                    // Mismo motivo que el panel de texto: sin blur para no
                                    // filtrar píxeles fuera de la tarjeta redondeada.
                                    "absolute inset-0 flex items-center",
                                    "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                    i === active ? "scale-100 opacity-100" : "scale-[0.96] opacity-0",
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

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { contentWidth, gutter, type, tone } from "@/components/ui/section";
import { ServiceCanvas } from "@/components/sections/service-canvas";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Intro — Servicios` (2020:5899) + `Feature 01` (2020:5904).
 *
 * La sección se fija (sticky) mientras se recorren los 4 servicios: el
 * encabezado queda quieto en el mismo lugar de la pantalla y solo cambia el
 * bloque de abajo. Al terminar el último, el pin se suelta y la página sigue
 * de largo — sin saltos ni rebotes.
 *
 * El track mide un viewport por servicio y el contenido va `sticky` adentro,
 * así el avance lo maneja el scroll nativo (Lenis incluido) en vez de un
 * listener de `wheel`. La versión anterior secuestraba la rueda con
 * `preventDefault` + `data-lenis-prevent` y remataba con `lenis.scrollTo`:
 * eso peleaba contra el scroll del navegador y producía el rebote.
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
    const trackRef = useRef<HTMLElement>(null);

    // El servicio activo sale del progreso del scroll dentro del track. Sin
    // preventDefault ni scrollTo: la página se mueve normal y esto solo lee
    // dónde está parada.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let frame = 0;
        function read() {
            frame = 0;
            const el = trackRef.current;
            if (!el) return;

            // En mobile el track no es más alto que el viewport (no hay pin):
            // ahí el recorrido lo maneja el indicador de barras.
            const distance = el.offsetHeight - window.innerHeight;
            if (distance <= 0) return;

            const progress = -el.getBoundingClientRect().top / distance;
            const clamped = Math.min(Math.max(progress, 0), 1);
            setActive(Math.round(clamped * (n - 1)));
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

    // Click en una barra: lleva el scroll al tramo del track de ese servicio.
    function goTo(i: number) {
        const el = trackRef.current;
        if (!el) return;
        const distance = el.offsetHeight - window.innerHeight;
        if (distance <= 0) {
            setActive(i);
            return;
        }
        const top = el.offsetTop + (i / (n - 1)) * distance;
        window.scrollTo({ top, behavior: "smooth" });
    }

    return (
        <section
            id="servicios"
            ref={trackRef}
            // Un viewport de scroll por servicio; el pin dura todo el track.
            style={{ "--track": `${n * 100}vh` } as CSSProperties}
            className="relative lg:h-[var(--track)]"
        >
            <div
                className={cx(
                    "flex min-h-screen flex-col lg:sticky lg:top-0 lg:h-screen lg:min-h-0",
                    gutter,
                    "pt-[clamp(72px,13.72vh,151px)] pb-[clamp(40px,7.5vh,83px)]",
                )}
            >
                <div className={cx("mx-auto flex w-full flex-1 flex-col gap-10 lg:gap-20", contentWidth)}>
                    {/* Encabezado: queda quieto en pantalla todo el recorrido.
                        Headline (gap 16) + 24 + Subheadline = los 197 del intro. */}
                    <div className="flex max-w-[800px] flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <Reveal delay={0}>
                                <p className={cx(type.title, tone.secondary)}>Nuestros servicios</p>
                            </Reveal>
                            <SplitReveal delay={120} className={cx(type.h1, tone.primary, "text-balance")}>
                                Servicios que se combinan según lo que tu marca necesita
                            </SplitReveal>
                        </div>
                        <Reveal delay={260}>
                            <p className={cx(type.h2, tone.tertiary)}>Vos elegís por dónde empezar</p>
                        </Reveal>
                    </div>

                    {/* Content 672 + gap 64 + Image 544 sobre los 1280. */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-[5%]">
                        <div className="flex flex-col gap-4 lg:w-[52.5%] lg:shrink-0 lg:gap-6">
                            <BarIndicator count={n} active={active} onSelect={goTo} />

                            {/* Text (2020:5906) mide 217: barras 16 + 24 + título 37 + 24 + desc 116 */}
                            <div className="relative min-h-[190px] sm:min-h-[180px] lg:min-h-[201px]">
                                {services.map((s, i) => (
                                    <div
                                        key={s.title}
                                        aria-hidden={i !== active}
                                        className={cx(
                                            // Sin blur: con overflow-hidden + rounded en la tarjeta
                                            // de al lado, el filter dejaba escapar píxeles fuera del
                                            // borde redondeado (compositing de Chromium filter+clip).
                                            "absolute inset-x-0 top-0 flex flex-col gap-3 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                            i === active
                                                ? "translate-y-0 opacity-100"
                                                : "pointer-events-none translate-y-3 opacity-0",
                                        )}
                                    >
                                        {/* Title (2020:5912): H2 34, angosto (376 de los 672 de la
                                            columna) para que envuelva en dos líneas cortas en vez de
                                            estirarse. Description (2020:5913): Body/Large 18. */}
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
            </div>
        </section>
    );
}

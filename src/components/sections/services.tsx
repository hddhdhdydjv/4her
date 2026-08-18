"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { DotGrid } from "@/components/ui/dot-grid";
import { contentWidth, gutter, type, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

const services = [
    {
        letter: "b",
        art: "/images/services/servicio-1.svg",
        title: "Branding & Rebranding",
        body1: "Creamos o renovamos la identidad de tu marca: naming, sistema visual y guías de uso.",
        body2: "Para que cada pieza que produzcas, la hagas vos o un tercero, se vea y se sienta igual.",
    },
    {
        letter: "e",
        art: "/images/services/servicio-2.svg",
        title: "Estrategia & Posicionamiento",
        body1: "Definimos qué decir, a quién y por qué, antes de producir cualquier pieza.",
        body2: "Mensajes clave que sostienen todo lo que comunicás después.",
    },
    {
        letter: "m",
        art: "/images/services/servicio-3.svg",
        title: "Marketing digital & Contenido",
        body1: "Contenido y campañas pensadas para comunicar, no solo para llenar el feed.",
        body2: "Estrategia de canales y calendario editorial a medida.",
    },
    {
        letter: "g",
        art: "/images/services/servicio-4.svg",
        title: "Growth & Prensa",
        body1: "Hacemos crecer la presencia de tu marca con growth y relaciones con prensa.",
        body2: "Comunicación institucional cuando tu marca lo necesita.",
    },
];

/**
 * Ilustración de un servicio.
 *
 * Los cuatro SVG vienen con relaciones distintas (472×432, 414×414, 544×432,
 * 484×432), así que el hueco fija la del diseño y el dibujo entra con
 * `object-contain`: cada uno se acomoda adentro sin deformarse y todos ocupan
 * el mismo lugar en la grilla.
 *
 * `unoptimized` porque son SVG: pasarlos por el optimizador los volvería
 * bitmap, con más peso y menos nitidez.
 */
function ServiceArt({ src, title }: { src: string; title: string }) {
    return (
        <div className="relative aspect-[544/432] w-full">
            <Image
                src={src}
                alt={`Ilustración de ${title}`}
                fill
                unoptimized
                className="object-contain"
            />
        </div>
    );
}

/**
 * Fundido de un servicio al siguiente.
 *
 * El que sale se va primero y el que entra espera a que termine, en vez de
 * cruzarse. Cruzados, en la mitad de la transición los dos están al 50% y se
 * ve el bajón —y en las ilustraciones, que son línea sobre transparente, se
 * llegan a ver los dos dibujos superpuestos. Eso era el salto.
 *
 * El retardo va sobre el que entra: CSS aplica el `transition-delay` del
 * estado al que se va, así que el activo espera y el que se apaga arranca ya.
 */
const FADE_MS = 300;

function fade(isActive: boolean) {
    return {
        transitionProperty: "opacity",
        transitionDuration: `${FADE_MS}ms`,
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: isActive ? `${FADE_MS}ms` : "0ms",
        opacity: isActive ? 1 : 0,
    } as const;
}

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
    // Desktop: tracks the full section (n*100vh).
    // Mobile: tracks only the sticky services container (n*100vh), after the normal-flow intro.
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
            className="relative lg:h-[var(--track)]"
        >
            {/* ═══ MOBILE LAYOUT (< lg) ═══
                Two separate parts:
                - Part 1: Intro text — normal flow, fills one viewport, scrolls away naturally.
                - Part 2: Sticky services panel — image top + indicator + service text bottom.
                          Sticks while the user scrolls through n viewports.
                No blank gap: intro exits like any normal content; sticky takes over immediately. */}
            <div className="lg:hidden">

                {/* Part 1 — intro, normal scroll */}
                <div className={cx(
                    "flex flex-col gap-6",
                    gutter,
                    "pt-[clamp(72px,13.72vh,151px)] pb-16",
                )}>
                    <div className={cx("mx-auto w-full", contentWidth)}>
                        <div className="flex flex-col gap-6">
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
                    </div>
                </div>

                {/* Part 2 — sticky services panel */}
                <div
                    ref={mobileTrackRef}
                    style={{ height: `${n * 100}vh` }}
                    className="relative"
                >
                    <div className={cx(
                        "sticky top-0 flex h-screen min-h-0 flex-col",
                        gutter,
                        "pt-[clamp(72px,13.72vh,151px)] pb-[clamp(40px,7.5vh,83px)]",
                    )}>
                        <div className={cx("mx-auto flex w-full flex-1 flex-col", contentWidth)}>
                            {/* Image — fills remaining vertical space */}
                            <div className="relative min-h-0 flex-1">
                                <DotGrid />
                                {services.map((s, i) => (
                                    <div
                                        key={s.title}
                                        aria-hidden="true"
                                        className={cx(
                                            "absolute inset-0 flex items-center",
                                        )}
                                        style={fade(i === active)}
                                    >
                                        <ServiceArt src={s.art} title={s.title} />
                                    </div>
                                ))}
                            </div>

                            {/* Service text — below image */}
                            <div className="flex shrink-0 flex-col gap-3 pt-3">
                                <BarIndicator count={n} active={active} onSelect={goTo} />
                                <div className="grid">
                                    {services.map((s, i) => (
                                        <div
                                            key={s.title}
                                            aria-hidden={i !== active}
                                            className={cx(
                                                "col-start-1 row-start-1 flex flex-col gap-1.5",
                                                i !== active && "pointer-events-none",
                                            )}
                                            style={fade(i === active)}
                                        >
                                            <h3 className={cx(type.h2, tone.primary)}>{s.title}</h3>
                                            <p className={cx(type.body, tone.secondary)}>{s.body1}</p>
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
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ DESKTOP LAYOUT (≥ lg) ═══
                Header above, services in two-column row. Entire section is n*100vh sticky. */}
            <div className={cx(
                "hidden sticky top-0 h-screen min-h-0 flex-col lg:flex",
                gutter,
                "pt-[clamp(72px,13.72vh,151px)] pb-[clamp(40px,7.5vh,83px)]",
            )}>
                <div className={cx("mx-auto flex w-full flex-1 flex-col gap-10 lg:gap-20", contentWidth)}>
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

                    <div className="flex items-start gap-[5%]">
                        {/* Text column — left */}
                        <div className="flex w-[52.5%] shrink-0 flex-col gap-6">
                            <BarIndicator count={n} active={active} onSelect={goTo} />
                            {/* Pila en grid: todos los servicios comparten la
                                misma celda, así que la caja mide lo que el más
                                largo y ni el botón ni el stepper se corren al
                                cambiar de servicio. */}
                            <div className="grid">
                                {services.map((s, i) => (
                                    <div
                                        key={s.title}
                                        aria-hidden={i !== active}
                                        className={cx(
                                            "col-start-1 row-start-1 flex flex-col gap-3",
                                            i !== active && "pointer-events-none",
                                        )}
                                        style={fade(i === active)}
                                    >
                                        <h3 className={cx(type.h2, tone.primary, "max-w-[376px] text-balance")}>
                                            {s.title}
                                        </h3>
                                        <p className={cx(type.bodyLg, tone.secondary)}>{s.body1}</p>
                                        <p className={cx(type.bodyLg, tone.secondary)}>{s.body2}</p>
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

                        {/* Image column — right */}
                        <div className="relative aspect-[544/432] w-[42.5%] shrink-0">
                            {/* Trama de fondo, detrás de las cuatro ilustraciones. */}
                            <DotGrid />
                            {services.map((s, i) => (
                                <div
                                    key={s.title}
                                    aria-hidden="true"
                                    className={cx(
                                        "absolute inset-0 flex items-center",
                                    )}
                                    style={fade(i === active)}
                                >
                                    <ServiceArt src={s.art} title={s.title} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

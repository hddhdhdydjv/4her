"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Tilt } from "@/components/motion/tilt";
import { type, tone } from "@/components/ui/section";
import { cx } from "@/utils/cx";

/**
 * Carrusel de servicios que avanza con el scroll.
 *
 * La pista mide n pantallas y adentro un panel queda fijo (`sticky`): a medida
 * que se scrollea, el servicio activo pasa al siguiente. Cada pantalla de
 * scroll es un servicio. Las imágenes llegan ya resueltas desde el servidor
 * (imagen subida o placeholder) y acá sólo se apilan y se funden.
 */

export type ServiceSlide = {
    title: string;
    body: string;
    items: string[];
};

/**
 * El que sale se va primero y el que entra espera a que termine, en vez de
 * cruzarse: cruzados, a mitad de camino los dos están al 50% y se ve el bajón.
 * El retardo va sobre el que entra porque CSS aplica el `transition-delay`
 * del estado al que se va.
 */
const FADE_MS = 300;

function fade(isActive: boolean): CSSProperties {
    return {
        transitionProperty: "opacity",
        transitionDuration: `${FADE_MS}ms`,
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: isActive ? `${FADE_MS}ms` : "0ms",
        opacity: isActive ? 1 : 0,
    };
}

function BarIndicator({
    labels,
    active,
    onSelect,
}: {
    labels: string[];
    active: number;
    onSelect: (i: number) => void;
}) {
    return (
        <div className="flex items-end gap-3" role="tablist" aria-label="Servicios">
            {labels.map((label, i) => (
                <button
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={label}
                    onClick={() => onSelect(i)}
                    className={cx(
                        "relative w-px cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        // Área de click más grande que la barra de 1px: 6px por lado
                        // con 12px de separación, así las áreas vecinas se tocan
                        // sin pisarse (con 8px y gap-2 la de al lado se comía el click).
                        "before:absolute before:-inset-x-[6px] before:-inset-y-3 before:content-['']",
                        i === active ? "h-4 bg-[#646464]" : "h-2 bg-[#b4b8b4]",
                    )}
                />
            ))}
        </div>
    );
}

function SlideText({ slide, index }: { slide: ServiceSlide; index: number }) {
    return (
        <>
            <div className="flex flex-col gap-2 lg:gap-4">
                <span className={cx(type.label, tone.tertiary)}>[ {String(index + 1).padStart(2, "0")} ]</span>
                <h3 className={cx(type.h2, tone.primary, "text-balance")}>{slide.title}</h3>
                <p className={cx(type.bodySm, tone.secondary, "max-w-[52ch]")}>{slide.body}</p>
            </div>
            <ul className="flex flex-col">
                {slide.items.map((item) => (
                    <li
                        key={item}
                        className="flex items-baseline gap-3 border-t border-[var(--border-default)] py-1.5 lg:py-3"
                    >
                        <span
                            aria-hidden="true"
                            className="size-1 shrink-0 translate-y-[-3px] rounded-full bg-[var(--text-tertiary)]"
                        />
                        {/* Un punto más chica en mobile: el panel fijo tiene que entrar
                            entero en la pantalla junto con la imagen. */}
                        <span className={cx(type.bodySm, "max-lg:text-[0.875rem] max-lg:leading-[1.5]", tone.secondary)}>
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export function ServicesCarousel({ slides, images }: { slides: ServiceSlide[]; images: ReactNode[] }) {
    const [active, setActive] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const n = slides.length;

    useEffect(() => {
        let frame = 0;

        function read() {
            frame = 0;
            const el = trackRef.current;
            if (!el) return;
            const distance = el.offsetHeight - window.innerHeight;
            if (distance <= 0) return;
            const progress = Math.min(Math.max(-el.getBoundingClientRect().top / distance, 0), 1);
            // Cada servicio ocupa la misma porción del recorrido.
            setActive(Math.min(n - 1, Math.floor(progress * n)));
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

    /** Lleva el scroll al tramo del servicio `i` (a su mitad, lejos de los bordes). */
    function goTo(i: number) {
        const el = trackRef.current;
        if (!el) return;
        const distance = el.offsetHeight - window.innerHeight;
        if (distance <= 0) {
            setActive(i);
            return;
        }
        const top = window.scrollY + el.getBoundingClientRect().top + ((i + 0.5) / n) * distance;
        window.scrollTo({ top, behavior: "smooth" });
    }

    const labels = slides.map((s) => s.title);

    return (
        <div ref={trackRef} className="relative" style={{ height: `${n * 100}vh` }}>
            <div
                className={cx(
                    "sticky top-0 flex h-[100svh] flex-col px-6 pt-20 pb-5 sm:px-10",
                    "lg:h-screen lg:justify-center lg:px-20 lg:pt-24 lg:pb-12",
                )}
            >
                <div className="mx-auto flex min-h-0 w-full max-w-[1280px] flex-1 flex-col gap-3 lg:flex-none lg:flex-row lg:items-stretch lg:gap-[5%]">
                    {/* Imágenes apiladas: se funden de una a la siguiente. En
                        mobile la caja toma el alto que dejan libre los textos. */}
                    <Tilt className="relative min-h-[96px] w-full flex-1 lg:aspect-[11/8] lg:w-[47.5%] lg:flex-none lg:shrink-0">
                        {images.map((image, i) => (
                            <div key={i} aria-hidden={i !== active} className="absolute inset-0" style={fade(i === active)}>
                                {image}
                            </div>
                        ))}
                    </Tilt>

                    <div className="flex shrink-0 flex-col gap-3 lg:w-[47.5%] lg:gap-6">
                        <BarIndicator labels={labels} active={active} onSelect={goTo} />
                        {/* Pila en grilla: los cuatro comparten celda, así la caja
                            mide lo que el más largo y nada se corre al cambiar. */}
                        <div className="grid flex-1">
                            {slides.map((s, i) => (
                                <div
                                    key={s.title}
                                    aria-hidden={i !== active}
                                    className={cx(
                                        "col-start-1 row-start-1 flex flex-col justify-between gap-3 lg:gap-8",
                                        i !== active && "pointer-events-none",
                                    )}
                                    style={fade(i === active)}
                                >
                                    <SlideText slide={s} index={i} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

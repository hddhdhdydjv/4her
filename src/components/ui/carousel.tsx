"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Carrusel horizontal simple y limpio:
 * - scroll-snap + drag con mouse + swipe táctil nativo
 * - flechas prev/next y dots
 * - autoplay suave opcional, se pausa al hover / al interactuar
 * Cada hijo se envuelve como slide; el ancho lo define `slideClassName`.
 */
export function Carousel({
    children,
    slideClassName = "w-[85%] sm:w-[60%] lg:w-[38%]",
    autoplay = false,
    interval = 4800,
    ariaLabel,
    className,
    tone = "light",
}: {
    children: ReactNode;
    slideClassName?: string;
    autoplay?: boolean;
    interval?: number;
    ariaLabel?: string;
    className?: string;
    /** "light" = controles oscuros (fondo claro); "dark" = controles claros (fondo oscuro). */
    tone?: "light" | "dark";
}) {
    const dark = tone === "dark";
    const trackRef = useRef<HTMLDivElement>(null);
    const slides = Children.toArray(children);
    const count = slides.length;
    const [index, setIndex] = useState(0);
    const pausedRef = useRef(false);
    const reducedRef = useRef(false);

    // Paso de scroll = ancho de un slide + gap.
    const step = useCallback(() => {
        const track = trackRef.current;
        if (!track || track.children.length < 1) return 0;
        const a = track.children[0] as HTMLElement;
        const b = track.children[1] as HTMLElement | undefined;
        const gap = b ? b.offsetLeft - (a.offsetLeft + a.offsetWidth) : 0;
        return a.offsetWidth + gap;
    }, []);

    const go = useCallback(
        (dir: 1 | -1) => {
            const track = trackRef.current;
            if (!track) return;
            const s = step();
            const atEnd = Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 2;
            if (dir === 1 && atEnd) {
                track.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                track.scrollBy({ left: dir * s, behavior: "smooth" });
            }
        },
        [step],
    );

    // Índice activo según la posición de scroll.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const s = step();
                if (s > 0) setIndex(Math.round(track.scrollLeft / s));
            });
        };
        track.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            track.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf);
        };
    }, [step]);

    // Autoplay suave (pausado al interactuar / hover / reduced-motion).
    useEffect(() => {
        if (!autoplay || reducedRef.current || count <= 1) return;
        const id = window.setInterval(() => {
            if (!pausedRef.current) go(1);
        }, interval);
        return () => window.clearInterval(id);
    }, [autoplay, interval, count, go]);

    // Drag con mouse (el táctil ya funciona nativo).
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let down = false;
        let startX = 0;
        let startLeft = 0;
        const onDown = (e: PointerEvent) => {
            if (e.pointerType === "mouse") {
                down = true;
                startX = e.clientX;
                startLeft = track.scrollLeft;
                track.setPointerCapture(e.pointerId);
                track.style.cursor = "grabbing";
            }
            pausedRef.current = true;
        };
        const onMove = (e: PointerEvent) => {
            if (!down) return;
            track.scrollLeft = startLeft - (e.clientX - startX);
        };
        const onUp = () => {
            down = false;
            track.style.cursor = "";
        };
        track.addEventListener("pointerdown", onDown);
        track.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            track.removeEventListener("pointerdown", onDown);
            track.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, []);

    return (
        <div
            className={cx("relative", className)}
            role="group"
            aria-roledescription="carrusel"
            aria-label={ariaLabel}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
        >
            <div
                ref={trackRef}
                className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [touch-action:pan-y] sm:gap-6"
            >
                {slides.map((slide, i) => (
                    <div key={i} className={cx("shrink-0 snap-start", slideClassName)}>
                        {slide}
                    </div>
                ))}
            </div>

            {count > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    {/* Dots */}
                    <div className="flex gap-2">
                        {slides.map((_, i) => (
                            <span
                                key={i}
                                className={cx(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    dark
                                        ? i === index
                                            ? "w-6 bg-[var(--brand-cream)]"
                                            : "w-1.5 bg-white/30"
                                        : i === index
                                          ? "w-6 bg-[var(--brand-ink)]"
                                          : "w-1.5 bg-[var(--brand-ink)]/25",
                                )}
                            />
                        ))}
                    </div>

                    {/* Flechas */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            aria-label="Anterior"
                            onClick={() => go(-1)}
                            className={cx(
                                "flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset transition-colors",
                                dark
                                    ? "text-[var(--brand-cream)] ring-white/25 hover:bg-[var(--brand-cream)] hover:text-[var(--brand-ink)]"
                                    : "text-primary ring-[var(--brand-ink)]/20 hover:bg-[var(--brand-ink)] hover:text-[var(--brand-cream)]",
                            )}
                        >
                            <Arrow dir="left" />
                        </button>
                        <button
                            type="button"
                            aria-label="Siguiente"
                            onClick={() => go(1)}
                            className={cx(
                                "flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset transition-colors",
                                dark
                                    ? "text-[var(--brand-cream)] ring-white/25 hover:bg-[var(--brand-cream)] hover:text-[var(--brand-ink)]"
                                    : "text-primary ring-[var(--brand-ink)]/20 hover:bg-[var(--brand-ink)] hover:text-[var(--brand-cream)]",
                            )}
                        >
                            <Arrow dir="right" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

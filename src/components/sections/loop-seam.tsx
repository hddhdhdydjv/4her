"use client";

import { useEffect, useRef } from "react";
import { Globe } from "@/components/graphics/illustrations";

/**
 * Empalme del scroll infinito: última pantalla en crema (igual que el hero)
 * con el wordmark gigante. Al tocar el fondo absoluto, salta al inicio
 * de forma instantánea: como ambos extremos son crema, el loop es invisible.
 */
export function LoopSeam() {
    const armed = useRef(true);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onScroll = () => {
            const bottom = window.innerHeight + window.scrollY;
            const max = document.documentElement.scrollHeight;
            if (bottom >= max - 2 && armed.current) {
                armed.current = false;
                window.scrollTo({ top: 0, left: 0, behavior: mq.matches ? "auto" : "instant" as ScrollBehavior });
                window.setTimeout(() => (armed.current = true), 250);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section aria-hidden="true" className="relative flex h-[70vh] items-end overflow-hidden bg-[var(--brand-cream)]">
            <div className="pointer-events-none absolute top-[8vh] right-[-18vw] w-[42vw] text-[var(--brand-ink)] opacity-30">
                <Globe className="h-auto w-full" spin />
            </div>
            <div className="mx-auto w-full max-w-container px-6 pb-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-quaternary uppercase">
                    Seguí scrolleando, esto vuelve a empezar
                </p>
                <p className="font-display text-[clamp(5rem,18vw,17rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-primary">
                    4HER
                </p>
            </div>
        </section>
    );
}

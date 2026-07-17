"use client";

import { useEffect } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cx } from "@/utils/cx";

const pairs = [
    { us: "Estrategia antes que estética: qué decir y por qué", them: "Entregables lindos sin estrategia detrás" },
    { us: "Un equipo con varias cabezas, no una sola", them: "Una sola persona para todo" },
    { us: "Medimos si comunica, no solo si gusta", them: 'Se mide el "me gusta", no el impacto' },
    { us: "Te acompañamos, no entregamos y desaparecemos", them: "Proyecto cerrado y chau" },
];

// Panel 0 = enunciado; luego un panel por par.
const PANELS = pairs.length + 1;

export function WhyUsScroll() {
    const { ref, progress, reduced } = useScrollProgress<HTMLDivElement>();

    // Snap magnetico: al soltar el scroll, engancha al panel mas cercano
    // para que nunca quede contenido cortado a mitad de camino.
    useEffect(() => {
        const el = ref.current;
        if (!el || reduced) return;

        let timer = 0;
        const onScroll = () => {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                const range = el.offsetHeight - window.innerHeight;
                const p = (window.scrollY - el.offsetTop) / range;
                if (p <= 0.01 || p >= 0.99) return;
                const target = Math.round(p * (PANELS - 1)) / (PANELS - 1);
                const top = el.offsetTop + target * range;
                if (Math.abs(top - window.scrollY) > 6) {
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }, 180);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.clearTimeout(timer);
        };
    }, [ref, reduced]);

    if (reduced) {
        return (
            <section id="por-que-nosotros" className="bg-[var(--brand-black)]">
                <div className="mx-auto max-w-container px-6 py-24">
                    <h2 className="font-display text-4xl font-medium text-primary_on-brand">
                        Los valores no se anuncian, se demuestran
                    </h2>
                    <ul className="mt-12 flex flex-col gap-8">
                        {pairs.map((p) => (
                            <li key={p.us}>
                                <p className="font-display text-2xl font-medium text-[var(--brand-sage)]">{p.us}</p>
                                <p className="mt-1 text-base text-white/35 line-through">{p.them}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }

    const shift = progress * (PANELS - 1) * 100; // en vw

    return (
        <section id="por-que-nosotros" ref={ref} className="relative h-[420vh] bg-[var(--brand-black)]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div
                    className="flex h-full will-change-transform"
                    style={{ transform: `translateX(-${shift}vw)` }}
                >
                    {/* Panel enunciado */}
                    <div className="flex h-full w-screen shrink-0 items-center px-6">
                        <div className="mx-auto w-full max-w-container">
                            <p className="font-mono text-xs tracking-widest text-tertiary_on-brand uppercase">
                                Nosotros / lo habitual
                            </p>
                            <h2 className="mt-6 max-w-5xl font-display text-[clamp(3rem,7.5vw,7rem)] leading-[0.96] font-medium tracking-[-0.03em] text-balance text-primary_on-brand">
                                Los valores no se <em className="font-light italic">anuncian</em>, se{" "}
                                <em className="font-light text-[var(--brand-sage)] italic">demuestran</em>
                            </h2>
                            <p className="mt-8 font-mono text-sm text-tertiary_on-brand">Seguí scrolleando →</p>
                        </div>
                    </div>

                    {/* Paneles de valores */}
                    {pairs.map((p, i) => (
                        <div key={p.us} className="flex h-full w-screen shrink-0 items-center px-6">
                            <div className="mx-auto grid w-full max-w-container gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
                                <span className="font-display text-[7rem] leading-none font-medium text-white/10 tabular-nums sm:text-[10rem]">
                                    0{i + 1}
                                </span>
                                <div>
                                    <p className="font-display text-3xl leading-tight font-medium text-balance text-[var(--brand-sage)] sm:text-5xl">
                                        {p.us}
                                    </p>
                                    <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-3">
                                        <span className="font-mono text-[11px] tracking-widest text-white/40 uppercase">
                                            Lo habitual
                                        </span>
                                        <span className="text-base text-white/35 line-through">{p.them}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progreso horizontal */}
                <div className="absolute inset-x-6 bottom-8 mx-auto flex max-w-container gap-2">
                    {Array.from({ length: PANELS }).map((_, i) => (
                        <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                            <div
                                className={cx("h-full rounded-full bg-[var(--brand-sage)]")}
                                style={{ width: `${Math.min(1, Math.max(0, progress * (PANELS - 1) - i + 1)) * 100}%` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

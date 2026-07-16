"use client";

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

    if (reduced) {
        return (
            <section id="por-que-nosotros" className="bg-[var(--brand-black)]">
                <div className="mx-auto max-w-container px-6 py-24">
                    <h2 className="font-display text-4xl font-semibold text-primary_on-brand">
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
                            <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[1.0] font-semibold text-balance text-primary_on-brand sm:text-7xl">
                                Los valores no se anuncian, se demuestran
                            </h2>
                            <p className="mt-8 font-mono text-sm text-tertiary_on-brand">Seguí scrolleando →</p>
                        </div>
                    </div>

                    {/* Paneles de valores */}
                    {pairs.map((p, i) => (
                        <div key={p.us} className="flex h-full w-screen shrink-0 items-center px-6">
                            <div className="mx-auto grid w-full max-w-container gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
                                <span className="font-display text-[7rem] leading-none font-semibold text-white/10 tabular-nums sm:text-[10rem]">
                                    0{i + 1}
                                </span>
                                <div>
                                    <p className="font-display text-3xl leading-tight font-semibold text-balance text-[var(--brand-sage)] sm:text-5xl">
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

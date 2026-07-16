"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Network } from "@/components/graphics/illustrations";
import { cx } from "@/utils/cx";

const services = [
    {
        number: "01",
        title: "Branding & Rebranding",
        items: ["Identidad", "Rebranding", "Naming", "Sistema de marca"],
    },
    {
        number: "02",
        title: "Estrategia & Posicionamiento",
        items: ["Estrategia de comunicación", "Posicionamiento", "Mensajes clave", "Propuesta de valor"],
    },
    {
        number: "03",
        title: "Marketing digital & Contenido",
        items: ["Marketing digital", "Contenido", "Redes", "Campañas"],
    },
    {
        number: "04",
        title: "Growth & Prensa",
        items: ["Growth", "Prensa y relaciones", "Comunicación institucional", "Sostenibilidad (vía partner)"],
    },
];

const N = services.length;

export function ServicesSticky() {
    const { ref, progress, reduced } = useScrollProgress<HTMLDivElement>();
    const raw = progress * N;
    const index = Math.min(N - 1, Math.floor(raw));

    // Fallback estático accesible.
    if (reduced) {
        return (
            <section id="servicios" className="bg-[var(--brand-sage)]">
                <div className="mx-auto max-w-container px-6 py-24">
                    <h2 className="font-display text-4xl font-semibold text-primary">Qué hacemos</h2>
                    <div className="mt-12 grid gap-8 sm:grid-cols-2">
                        {services.map((s) => (
                            <div key={s.number}>
                                <span className="font-display text-4xl font-semibold text-[var(--brand-ink)]/25">{s.number}</span>
                                <h3 className="mt-3 font-display text-2xl font-semibold text-primary">{s.title}</h3>
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {s.items.map((i) => (
                                        <li key={i} className="rounded-full border border-[var(--brand-ink)]/15 px-3 py-1.5 font-mono text-xs text-secondary">
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="servicios" ref={ref} className="relative h-[380vh] bg-[var(--brand-sage)]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="mx-auto grid w-full max-w-container gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    {/* Columna izquierda: contador odómetro + título */}
                    <div>
                        <h2 className="font-display text-2xl font-medium text-secondary">Qué hacemos</h2>
                        <div className="mt-4 flex items-start gap-4">
                            <div className="h-[4.2rem] overflow-hidden sm:h-[6rem]">
                                <div
                                    className="flex flex-col leading-none will-change-transform"
                                    style={{ transform: `translateY(${-(progress * (N - 1)) * (100 / N)}%)` }}
                                >
                                    {services.map((s) => (
                                        <span
                                            key={s.number}
                                            className="font-display text-[4.2rem] leading-none font-semibold text-[var(--brand-ink)] tabular-nums sm:text-[6rem]"
                                        >
                                            {s.number}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <span className="mt-2 font-mono text-sm text-[var(--brand-ink)]/50">/ 0{N}</span>
                        </div>

                        {/* Barra de progreso con ticks */}
                        <div className="mt-8 flex gap-2">
                            {services.map((s, i) => (
                                <div key={s.number} className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--brand-ink)]/15">
                                    <div
                                        className="h-full rounded-full bg-[var(--brand-ink)] transition-[width] duration-200"
                                        style={{ width: `${Math.min(1, Math.max(0, raw - i)) * 100}%` }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 hidden h-40 w-40 text-[var(--brand-ink)]/30 lg:block">
                            <Network className="h-full w-full" spin />
                        </div>
                    </div>

                    {/* Columna derecha: servicio activo */}
                    <div className="relative min-h-[16rem]">
                        {services.map((s, i) => {
                            const active = i === index;
                            return (
                                <div
                                    key={s.number}
                                    className={cx(
                                        "transition-all duration-500 ease-out",
                                        active
                                            ? "relative opacity-100 blur-0"
                                            : "pointer-events-none absolute inset-0 translate-y-4 opacity-0 blur-[2px]",
                                    )}
                                    aria-hidden={!active}
                                >
                                    <h3 className="font-display text-4xl leading-[1.02] font-semibold text-balance text-primary sm:text-6xl">
                                        {s.title}
                                    </h3>
                                    <ul className="mt-8 flex flex-wrap gap-2.5">
                                        {s.items.map((it) => (
                                            <li
                                                key={it}
                                                className="rounded-full border border-[var(--brand-ink)]/20 bg-[var(--brand-cream)]/40 px-4 py-2 font-mono text-sm text-secondary"
                                            >
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

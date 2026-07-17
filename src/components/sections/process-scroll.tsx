"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cx } from "@/utils/cx";

const steps = [
    { number: "01", title: "Nos conocemos", text: "Escuchamos qué querés lograr y a quién querés llegar." },
    { number: "02", title: "Definimos el rumbo", text: "Acordamos qué decir y por qué antes de producir nada." },
    { number: "03", title: "Creamos juntos", text: "Mostramos, ajustamos con tu feedback, iteramos rápido." },
    { number: "04", title: "Acompañamos", text: "Seguimos midiendo y afinando. No entregamos y desaparecemos." },
];

const N = steps.length;

export function ProcessScroll() {
    const { ref, progress, reduced } = useScrollProgress<HTMLDivElement>();

    const StepRow = ({ i, active }: { i: number; active: boolean }) => {
        const s = steps[i];
        return (
            <div className="flex gap-6">
                <div
                    className={cx(
                        "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs transition-all duration-300",
                        active
                            ? "bg-[var(--brand-ink)] text-[var(--brand-cream)]"
                            : "bg-transparent text-[var(--brand-ink)]/35 ring-1 ring-[var(--brand-ink)]/15 ring-inset",
                    )}
                >
                    {s.number}
                </div>
                <div
                    className={cx(
                        "transition-all duration-300",
                        active ? "translate-x-0 opacity-100" : "translate-x-1 opacity-35",
                    )}
                >
                    <h3 className="font-display text-2xl font-medium text-primary sm:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-tertiary">{s.text}</p>
                </div>
            </div>
        );
    };

    if (reduced) {
        return (
            <section id="proceso" className="mx-auto max-w-container px-6 py-24">
                <h2 className="font-display text-4xl font-medium text-primary">Cómo trabajamos</h2>
                <div className="mt-12 flex flex-col gap-10">
                    {steps.map((_, i) => (
                        <StepRow key={i} i={i} active />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section id="proceso" ref={ref} className="relative h-[300vh] bg-[var(--brand-cream)]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="mx-auto grid w-full max-w-container gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                    <div>
                        <h2 className="font-display text-[clamp(2.6rem,4.8vw,4.6rem)] leading-[0.98] font-medium tracking-[-0.02em] text-balance text-primary">
                            Un proceso <em className="font-light text-brand-secondary italic">simple</em>, sin cajas negras
                        </h2>
                        <p className="mt-6 max-w-sm text-lg text-tertiary">
                            Cuatro pasos. Te acompañamos en cada uno, sin desaparecer al entregar.
                        </p>
                    </div>

                    <div className="relative flex flex-col gap-10 pl-2">
                        {/* Linea fina que se dibuja con el scroll */}
                        <svg
                            className="absolute top-6 bottom-6 left-[27px] w-px"
                            viewBox="0 0 1 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="var(--brand-ink)" strokeOpacity="0.1" strokeWidth="1" />
                            <line
                                x1="0.5"
                                y1="0"
                                x2="0.5"
                                y2="100"
                                stroke="var(--brand-ink)"
                                strokeOpacity="0.55"
                                strokeWidth="1"
                                pathLength={1}
                                strokeDasharray="1"
                                strokeDashoffset={1 - progress}
                            />
                        </svg>
                        {steps.map((_, i) => (
                            <StepRow key={i} i={i} active={progress * N >= i + 0.18} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

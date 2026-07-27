"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Section, type } from "@/components/ui/section";
import { cx } from "@/utils/cx";

const steps = [
    { n: "01", title: "Nos conocemos", body: "Escuchamos qué querés lograr y a quién querés llegar." },
    { n: "02", title: "Definimos el rumbo", body: "Acordamos qué decir y por qué antes de producir nada." },
    { n: "03", title: "Creamos juntos", body: "Mostramos, ajustamos con tu feedback, iteramos rápido." },
    { n: "04", title: "Acompañamos", body: "Seguimos midiendo y afinando. No entregamos y desaparecemos." },
];

export function Process() {
    // Los pasos se van encendiendo a medida que la sección entra en pantalla.
    const { ref, progress, reduced } = useScrollProgress<HTMLDivElement>();

    return (
        <div ref={ref}>
            <Section id="proceso">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
                    <div className="lg:flex-1">
                        <h2 className={cx(type.h1, "text-balance text-primary")}>
                            Un proceso simple, sin cajas negras
                        </h2>
                    </div>

                    <ol className="flex flex-col gap-4 lg:flex-1">
                        {steps.map((s, i) => {
                            const active = reduced || progress * steps.length >= i + 0.15;
                            return (
                                <li
                                    key={s.n}
                                    className={cx(
                                        "flex flex-col gap-4 rounded-2xl bg-secondary p-6 transition-all duration-500",
                                        active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-45",
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={cx(
                                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium tabular-nums transition-colors duration-500",
                                                active
                                                    ? "bg-[var(--text-primary)] text-[var(--text-inverse)]"
                                                    : "bg-transparent text-tertiary ring-1 ring-[var(--border-strong)] ring-inset",
                                            )}
                                        >
                                            {s.n}
                                        </span>
                                        <h3 className={cx(type.h3, "text-primary")}>{s.title}</h3>
                                    </div>
                                    <p className={cx(type.bodyLg, "text-primary")}>{s.body}</p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </Section>
        </div>
    );
}

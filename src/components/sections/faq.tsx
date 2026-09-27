import { Screen, gutter, type, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

const faqs = [
    {
        q: "¿Trabajan con empresas chicas o solo con corporativos?",
        a: "Con ambos. El plan cambia según el tamaño y el presupuesto, pero la lógica es la misma: mensaje claro, canales correctos y objetivos medibles.",
    },
    {
        q: "¿Cuánto tarda en verse resultado?",
        a: "Depende del servicio. Las campañas de pauta muestran datos desde las primeras semanas; el posicionamiento de marca y la estrategia comercial son procesos de mediano plazo, con hitos revisables cada trimestre.",
    },
    {
        q: "¿Necesito tener ya definida mi marca antes de hacer campañas?",
        a: "No es obligatorio, pero lo recomendamos. Sin un posicionamiento claro, la pauta paga suele traer tráfico que no convierte porque el mensaje no es consistente.",
    },
    {
        q: "¿Cómo miden el éxito de un proyecto?",
        a: "Con los KPIs que definimos juntos en la etapa de diagnóstico: leads, ventas, tráfico calificado o los hitos del plan comercial, según el servicio contratado.",
    },
];

export function FAQ() {
    return (
        <Screen id="faq" inset={cx(gutter, "pt-[clamp(72px,13.33vh,147px)] pb-[clamp(72px,13.33vh,147px)]")}>
            <div className="flex flex-col gap-10">
                <div className="flex max-w-[800px] flex-col gap-4">
                    <Reveal delay={0}>
                        <p className={cx(type.title, tone.secondary)}>Preguntas frecuentes</p>
                    </Reveal>
                    <SplitReveal delay={120} className={cx(type.h1, tone.primary, "text-balance")}>
                        Lo que suelen preguntarnos antes de arrancar
                    </SplitReveal>
                </div>

                <ul className="flex flex-col">
                    {faqs.map((f, i) => (
                        <Reveal key={f.q} delay={120 + i * 90} y={16} as="li">
                            <details className="group border-t border-[var(--border-default)] py-6 last:border-b">
                                <summary
                                    className={cx(
                                        type.h3,
                                        tone.primary,
                                        "flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden",
                                    )}
                                >
                                    {f.q}
                                    <span
                                        aria-hidden="true"
                                        className={cx(
                                            type.h2,
                                            tone.tertiary,
                                            "shrink-0 transition-transform duration-300 group-open:rotate-45",
                                        )}
                                    >
                                        +
                                    </span>
                                </summary>
                                <p className={cx(type.bodyLg, tone.secondary, "max-w-[64ch] pt-4")}>{f.a}</p>
                            </details>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </Screen>
    );
}

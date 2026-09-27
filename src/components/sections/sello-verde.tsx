import { Screen, gutter, type, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

/**
 * Servicio adicional: gestión del Sello Verde. Mismo ritmo de dos columnas
 * que Process (intro a la izquierda, lista a la derecha), pero como bloque
 * más chico dentro de un `bg-secondary` para leerse como un "extra" y no
 * como un servicio principal más.
 */
const beneficios = [
    "Mejora la imagen institucional y la percepción de marca frente a clientes",
    "Suma un requisito cada vez más pedido en licitaciones y por grandes cuentas",
    "Incluye asesoría en gestión de residuos y economía circular",
    "Diferencia a la empresa frente a competidores sin certificación",
];

export function SelloVerde() {
    return (
        <Screen
            id="sello-verde"
            inset={cx(gutter, "pt-[clamp(40px,7.11vh,78px)] pb-[clamp(72px,13.33vh,147px)]")}
        >
            <div
                className={cx(
                    "flex flex-col gap-10 rounded-2xl bg-[var(--bg-secondary)] p-8 sm:p-10 lg:flex-row lg:items-start lg:gap-[3.75%] lg:p-14",
                )}
            >
                <div className="flex flex-col gap-4 lg:w-[42.5%] lg:shrink-0">
                    <Reveal delay={0} variant="side" x={-28}>
                        <p className={cx(type.title, tone.secondary)}>Un servicio adicional</p>
                    </Reveal>
                    <SplitReveal delay={0} className={cx(type.h2, tone.primary, "text-balance")}>
                        Gestión del Sello Verde
                    </SplitReveal>
                    <Reveal delay={260} variant="side" x={-28}>
                        <p className={cx(type.bodyLg, tone.secondary, "max-w-[440px]")}>
                            Acompañamos a la empresa en todo el trámite: diagnóstico de las prácticas
                            actuales, armado de la documentación, implementación de las mejoras que
                            falten y seguimiento hasta obtener la certificación.
                        </p>
                    </Reveal>
                </div>

                <ul className="flex flex-1 flex-col gap-4">
                    {beneficios.map((b, i) => (
                        <Reveal key={b} delay={120 + i * 90} y={16} as="li">
                            <div className="flex gap-3 border-t border-[var(--border-default)] pt-4 first:border-t-0 first:pt-0">
                                <span className={cx(type.bodyLg, tone.tertiary)}>—</span>
                                <p className={cx(type.bodyLg, tone.secondary)}>{b}</p>
                            </div>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </Screen>
    );
}

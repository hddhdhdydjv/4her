import { Badge } from "@/components/ui/badge";

/**
 * PLACEHOLDER — Quiénes somos.
 * Pendiente de datos reales de la empresa. No redactar copy inventado.
 * Reemplazar el bloque de texto y el bloque visual cuando lleguen los datos.
 */
export function About() {
    return (
        <section id="quienes-somos" className="border-t border-[var(--color-border-secondary)]">
            <div className="mx-auto grid max-w-container items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
                <div>
                    <Badge tone="neutral">Quiénes somos</Badge>
                    <div className="mt-6 rounded-2xl border border-dashed border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-8">
                        <p className="text-xs font-semibold tracking-widest text-tertiary uppercase">
                            Placeholder
                        </p>
                        <p className="mt-3 font-display text-2xl leading-snug font-medium text-primary">
                            Texto pendiente de definir
                        </p>
                        <p className="mt-3 text-base leading-relaxed text-secondary">
                            Se completa con datos reales de la empresa.
                        </p>
                    </div>
                </div>

                {/* Espacio para imagen / bloque visual */}
                <div
                    className="flex min-h-72 items-center justify-center rounded-2xl border border-dashed border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]"
                    aria-hidden="true"
                >
                    <span className="text-sm font-medium tracking-wide text-tertiary uppercase">
                        Imagen / bloque visual
                    </span>
                </div>
            </div>
        </section>
    );
}

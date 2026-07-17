"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Network } from "@/components/graphics/illustrations";

/**
 * PLACEHOLDER de media: un cuadrado centrado que crece con el scroll
 * hasta comerse la pantalla (efecto "expanding media").
 * Cuando exista un reel/video/foto de 4HER, reemplazar el contenido
 * interno del cuadrado por ese asset y el efecto queda completo.
 */
export function ExpandBlock() {
    const { ref, progress, reduced } = useScrollProgress<HTMLDivElement>();

    if (reduced) {
        return (
            <section className="bg-[var(--brand-cream)] px-6 py-24">
                <div className="mx-auto flex aspect-video max-w-container items-center justify-center rounded-3xl bg-[var(--brand-black)] text-[var(--brand-sage)]">
                    <Network className="h-1/2 w-1/2" />
                </div>
            </section>
        );
    }

    // Easing suave del progreso para que el crecimiento no sea lineal.
    const p = 1 - Math.pow(1 - progress, 2.2);
    const w = 34 + p * 66; // 34vw -> 100vw
    const h = 38 + p * 62; // 38vh -> 100vh
    const r = 28 * (1 - p); // 28px -> 0

    return (
        <section ref={ref} className="relative h-[260vh] bg-[var(--brand-cream)]">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                <div
                    className="relative flex items-center justify-center overflow-hidden bg-[var(--brand-black)] will-change-[width,height]"
                    style={{
                        width: `max(${w}vw, 300px)`,
                        height: `${h}vh`,
                        borderRadius: `${r}px`,
                    }}
                >
                    <Network className="h-2/3 w-2/3 text-[var(--brand-sage)]" spin />

                    {/* Caption: aparece cuando el bloque llegó a full-bleed */}
                    <div
                        className="absolute bottom-10 left-10 transition-opacity duration-500"
                        style={{ opacity: p > 0.85 ? 1 : 0 }}
                    >
                        <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--brand-sage)]/70 uppercase">
                            Placeholder / acá va tu reel o caso
                        </p>
                        <p className="mt-2 max-w-sm font-display text-2xl font-medium text-primary_on-brand">
                            Texto pendiente de definir
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

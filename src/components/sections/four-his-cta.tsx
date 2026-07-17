import { Globe } from "@/components/graphics/illustrations";

/**
 * CTA fijo a 4HIS (marca hermana de tecnología). Abajo a la derecha.
 * Incluye un asset gráfico animado y deja claro que lleva a OTRO sitio.
 * TODO: reemplazar HREF por la URL real de 4HIS cuando exista.
 */
const HIS_URL = "#"; // placeholder - poner https://... de 4HIS

export function FourHisCta() {
    return (
        <div className="pointer-events-none fixed right-4 bottom-4 z-40 flex justify-end">
            <a
                href={HIS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="¿Necesitás soluciones tecnológicas? Visitá 4HIS (abre en otro sitio)"
                className="group pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-[var(--brand-black)] p-2 pr-4 shadow-[0_10px_40px_rgba(20,21,18,0.25)] transition-transform hover:-translate-y-0.5"
            >
                {/* Asset gráfico animado */}
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--brand-black-soft)] text-[var(--brand-sage)]">
                    <Globe className="h-9 w-9" spin />
                </span>

                <span className="flex flex-col">
                    <span className="font-mono text-[10px] tracking-widest text-tertiary_on-brand uppercase">
                        ¿Soluciones tecnológicas?
                    </span>
                    <span className="flex items-center gap-1.5 font-display text-sm font-medium text-primary_on-brand">
                        Visitá 4HIS
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </span>
            </a>
        </div>
    );
}

/**
 * Dock de redes fijo en pantalla (reemplaza al footer).
 * Siempre visible abajo a la izquierda: marca + redes + contacto.
 */
const socials = [
    { label: "IG", full: "Instagram", href: "#" },
    { label: "IN", full: "LinkedIn", href: "#" },
];

export function SocialDock() {
    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex items-end justify-between px-4">
            {/* Marca / seña de identidad */}
            <div className="pointer-events-auto hidden items-center gap-2 rounded-full border border-[var(--color-border-primary)] bg-[var(--brand-cream)]/85 px-4 py-2 backdrop-blur-md sm:flex">
                <span className="font-mono text-[11px] tracking-wide text-tertiary uppercase">
                    4HER · parte de 4HIS
                </span>
            </div>

            {/* Redes + contacto */}
            <div className="pointer-events-auto ml-auto flex items-center gap-1.5 rounded-full border border-[var(--color-border-primary)] bg-[var(--brand-cream)]/85 p-1.5 backdrop-blur-md">
                {socials.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.full}
                        className="flex h-9 w-9 items-center justify-center rounded-full font-mono text-[11px] font-medium text-secondary uppercase transition-colors hover:bg-[var(--brand-surface)] hover:text-primary"
                    >
                        {s.label}
                    </a>
                ))}
                <a
                    href="#contacto"
                    className="ml-1 flex h-9 items-center rounded-full bg-[var(--brand-ink)] px-4 font-mono text-[11px] tracking-wide text-primary_on-brand uppercase transition-opacity hover:opacity-90"
                >
                    Contacto
                </a>
            </div>
        </div>
    );
}

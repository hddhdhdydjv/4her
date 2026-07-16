/**
 * Dock de redes fijo abajo a la izquierda (sin footer).
 * La CTA a 4HIS vive aparte, abajo a la derecha (FourHisCta).
 */
const socials = [
    { label: "IG", full: "Instagram", href: "#" },
    { label: "IN", full: "LinkedIn", href: "#" },
];

export function SocialDock() {
    return (
        <div className="pointer-events-none fixed bottom-4 left-4 z-40">
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--color-border-primary)] bg-[var(--brand-cream)]/85 p-1.5 backdrop-blur-md">
                <span className="px-3 font-mono text-[10px] tracking-widest text-tertiary uppercase">
                    4HER
                </span>
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
            </div>
        </div>
    );
}

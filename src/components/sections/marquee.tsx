const words = [
    "Branding",
    "Comunicación",
    "Posicionamiento",
    "Contenido",
    "Growth",
    "Prensa",
    "Marketing",
    "Estrategia",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
    return (
        <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
            {words.map((w) => (
                <span key={w} className="flex items-center">
                    <span className="px-6 font-display text-3xl font-medium tracking-tight text-primary_on-brand sm:text-4xl">
                        {w}
                    </span>
                    <span className="text-brand-secondary" aria-hidden="true">
                        ·
                    </span>
                </span>
            ))}
        </div>
    );
}

export function Marquee() {
    return (
        <section aria-label="Qué hacemos" className="overflow-hidden bg-[var(--brand-black)] py-6">
            <div className="marquee-track flex w-max">
                <Track />
                <Track ariaHidden />
            </div>
        </section>
    );
}

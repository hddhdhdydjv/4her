import { Badge } from "@/components/ui/badge";

const us = [
    "Estrategia antes que estética: qué decir y por qué",
    "Un equipo con varias cabezas, no una sola",
    "Medimos si comunica, no solo si gusta",
    "Te acompañamos, no entregamos y desaparecemos",
];

const usual = [
    "Entregables lindos sin estrategia detrás",
    "Una sola persona para todo",
    'Se mide el "me gusta", no el impacto',
    "Proyecto cerrado y chau",
];

function CheckIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function DashIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    );
}

export function WhyUs() {
    return (
        <section id="por-que-nosotros" className="border-t border-[var(--color-border-secondary)]">
            <div className="mx-auto max-w-container px-6 py-20 lg:py-28">
                <div className="max-w-2xl">
                    <Badge>Por qué nosotros</Badge>
                    <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl">
                        Los valores no se anuncian, se demuestran
                    </h2>
                </div>

                <div className="mt-14 grid gap-5 lg:grid-cols-2">
                    {/* Nosotros */}
                    <div className="rounded-2xl border border-[var(--color-border-brand)] bg-[var(--color-bg-brand-primary)] p-8">
                        <p className="text-xs font-semibold tracking-widest text-brand-secondary uppercase">
                            Nosotros
                        </p>
                        <ul className="mt-6 flex flex-col gap-4">
                            {us.map((item) => (
                                <li key={item} className="flex gap-3 text-brand-secondary">
                                    <CheckIcon />
                                    <span className="text-base leading-relaxed text-primary">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Lo habitual — visualmente atenuado */}
                    <div className="rounded-2xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-8">
                        <p className="text-xs font-semibold tracking-widest text-quaternary uppercase">
                            Lo habitual
                        </p>
                        <ul className="mt-6 flex flex-col gap-4">
                            {usual.map((item) => (
                                <li key={item} className="flex gap-3 text-quaternary">
                                    <DashIcon />
                                    <span className="text-base leading-relaxed text-tertiary">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

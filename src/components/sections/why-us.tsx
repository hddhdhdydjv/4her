import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

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

function Mark({ on }: { on: boolean }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-1 shrink-0">
            {on ? (
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            )}
        </svg>
    );
}

/** Bloque negro a lo Aptos (cards contrastadas). */
export function WhyUs() {
    return (
        <section id="por-que-nosotros" className="bg-[var(--brand-black)]">
            <div className="mx-auto max-w-container px-6 py-24 lg:py-32">
                <Reveal>
                    <div className="max-w-2xl">
                        <Badge tone="onDark">Por qué nosotros</Badge>
                        <h2 className="mt-6 font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance text-primary_on-brand sm:text-5xl">
                            Los valores no se anuncian,
                            <br /> se demuestran
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-4 lg:grid-cols-2">
                    <Reveal>
                        <div className="h-full rounded-3xl bg-[var(--brand-sage)] p-8">
                            <p className="font-mono text-[11px] tracking-widest text-[var(--brand-ink)]/60 uppercase">
                                Nosotros
                            </p>
                            <ul className="mt-6 flex flex-col gap-4">
                                {us.map((item) => (
                                    <li key={item} className="flex gap-3 text-[var(--brand-ink)]">
                                        <Mark on />
                                        <span className="text-base leading-relaxed text-primary">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal delay={90}>
                        <div className="h-full rounded-3xl border border-white/10 p-8">
                            <p className="font-mono text-[11px] tracking-widest text-tertiary_on-brand uppercase">
                                Lo habitual
                            </p>
                            <ul className="mt-6 flex flex-col gap-4">
                                {usual.map((item) => (
                                    <li key={item} className="flex gap-3 text-white/35">
                                        <Mark on={false} />
                                        <span className="text-base leading-relaxed text-secondary_on-brand">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

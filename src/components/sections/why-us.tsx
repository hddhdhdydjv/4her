import { Carousel } from "@/components/ui/carousel";

const pairs = [
    { us: "Estrategia antes que estética: qué decir y por qué", them: "Entregables lindos sin estrategia detrás" },
    { us: "Un equipo con varias cabezas, no una sola", them: "Una sola persona para todo" },
    { us: "Medimos si comunica, no solo si gusta", them: 'Se mide el "me gusta", no el impacto' },
    { us: "Te acompañamos, no entregamos y desaparecemos", them: "Proyecto cerrado y chau" },
];

export function WhyUs() {
    return (
        <section id="por-que-nosotros" className="bg-[var(--brand-black)] py-24 lg:py-32">
            <div className="mx-auto max-w-container px-6">
                <p className="font-mono text-[11px] tracking-[0.2em] text-tertiary_on-brand uppercase">
                    Nosotros / lo habitual
                </p>
                <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,4.8vw,4.4rem)] leading-[1.0] font-medium tracking-[-0.02em] text-balance text-primary_on-brand">
                    Los valores no se <em className="font-light italic">anuncian</em>, se{" "}
                    <em className="font-light text-[var(--brand-sage)] italic">demuestran</em>
                </h2>

                <Carousel
                    className="mt-12"
                    ariaLabel="Por qué nosotros"
                    tone="dark"
                    slideClassName="w-[85%] sm:w-[55%] lg:w-[40%]"
                >
                    {pairs.map((p, i) => (
                        <article
                            key={p.us}
                            className="flex h-full flex-col justify-between gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8"
                        >
                            <span className="font-display text-5xl font-medium text-white/10 tabular-nums">
                                0{i + 1}
                            </span>
                            <div>
                                <p className="font-display text-2xl leading-tight font-medium text-balance text-[var(--brand-sage)] sm:text-3xl">
                                    {p.us}
                                </p>
                                <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-2.5">
                                    <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                                        Lo habitual
                                    </span>
                                    <span className="text-sm text-white/35 line-through">{p.them}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}

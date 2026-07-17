import { Button } from "@/components/ui/button";
import { Globe } from "@/components/graphics/illustrations";
import { Reveal } from "@/components/motion/reveal";
import { Scramble } from "@/components/motion/scramble";
import { CascadeTitle } from "@/components/motion/cascade-title";

const contrastCards = [
    { vs: "vs. Agencia tradicional", title: "Estrategia, no solo ejecución" },
    { vs: "vs. Freelance", title: "Un equipo con varias cabezas" },
    { vs: "vs. Hacerlo in-house", title: "Mirada externa y experiencia" },
];

/**
 * `isStatic`: renderiza la misma composicion sin animaciones de entrada.
 * Lo usa el clon del scroll perpetuo para que ambos extremos sean identicos.
 */
export function Hero({ isStatic = false }: { isStatic?: boolean }) {
    const title = (
        <>
            Más estratégico que una{" "}
            <em className="font-light text-brand-secondary italic">agencia</em>, más cercano que un{" "}
            <em className="font-light text-brand-secondary italic">freelance</em>
        </>
    );
    const titleClass =
        "mt-8 max-w-5xl font-display text-[clamp(3rem,9.5vw,8.75rem)] leading-[0.94] font-medium tracking-[-0.03em] text-primary";

    return (
        <section id={isStatic ? undefined : "inicio"} className="relative overflow-hidden">
            {/* Globo gigante cortado por el borde derecho */}
            <div className="pointer-events-none absolute top-[6vh] right-[-24vw] hidden w-[52vw] text-[var(--brand-ink)] opacity-[0.55] lg:block">
                <Globe className="h-auto w-full" draw={!isStatic} spin />
            </div>

            <div className="relative mx-auto max-w-container px-6 pt-44 pb-28 sm:pt-52 lg:pt-64 lg:pb-40">
                <p className="font-mono text-xs tracking-[0.18em] text-brand-secondary uppercase">
                    {isStatic ? "Comunicación & Marketing" : <Scramble text="Comunicación & Marketing" />}
                </p>

                {isStatic ? (
                    <h1 className={titleClass}>{title}</h1>
                ) : (
                    <CascadeTitle className={titleClass}>{title}</CascadeTitle>
                )}
            </div>

            {/* Bloque olivo: bajada + CTAs + cards de contraste */}
            <div className="bg-[var(--brand-olive)]">
                <div className="mx-auto grid max-w-container gap-12 px-6 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
                    <div className="lg:col-span-7">
                        <p className="max-w-xl font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.15] font-medium text-primary_on-brand">
                            Marca y comunicación con criterio, no solo entregables lindos.
                        </p>
                        <p className="mt-5 max-w-md text-lg leading-relaxed text-secondary_on-brand">
                            Pensamos qué decir y por qué, no únicamente cómo se ve.
                        </p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Button href="#contacto" size="lg">
                                Hablemos
                            </Button>
                            <Button
                                href="#servicios"
                                size="lg"
                                variant="secondary"
                                className="text-primary_on-brand ring-white/30 hover:bg-white/10"
                            >
                                Ver servicios
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2.5 lg:col-span-5">
                        {contrastCards.map((card, i) => {
                            const inner = (
                                <div className="rounded-2xl bg-[var(--brand-black)] p-5">
                                    <span className="font-mono text-[10px] tracking-[0.14em] text-brand-tertiary uppercase">
                                        {card.vs}
                                    </span>
                                    <p className="mt-1.5 font-display text-lg font-medium text-primary_on-brand">
                                        {card.title}
                                    </p>
                                </div>
                            );
                            return isStatic ? (
                                <div key={card.vs}>{inner}</div>
                            ) : (
                                <Reveal key={card.vs} delay={i * 90} y={16}>
                                    {inner}
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

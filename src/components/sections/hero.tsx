import { Button } from "@/components/ui/button";
import { Globe } from "@/components/graphics/illustrations";
import { Reveal } from "@/components/motion/reveal";

const contrastCards = [
    { vs: "vs. Agencia tradicional", title: "Estrategia, no solo ejecución" },
    { vs: "vs. Freelance", title: "Un equipo con varias cabezas" },
    { vs: "vs. Hacerlo in-house", title: "Mirada externa y experiencia" },
];

export function Hero() {
    return (
        <section id="inicio" className="relative">
            <div className="mx-auto max-w-container px-6 pt-36 pb-16 sm:pt-44 lg:pt-52">
                <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="max-w-4xl">
                        <p className="font-mono text-xs tracking-[0.14em] text-brand-secondary uppercase">
                            Comunicación &amp; Marketing
                        </p>
                        <h1 className="mt-6 font-display text-[2.6rem] leading-[0.98] font-semibold tracking-tight text-balance text-primary sm:text-6xl lg:text-7xl">
                            Más estratégico que una <span className="text-brand-secondary">agencia</span>,
                            <br className="hidden sm:block" /> más cercano que un{" "}
                            <span className="text-brand-secondary">freelance</span>
                        </h1>
                    </div>

                    <div className="hidden h-44 w-44 shrink-0 text-[var(--brand-ink)] lg:block">
                        <Globe className="h-full w-full" spin />
                    </div>
                </div>
            </div>

            <div className="bg-[var(--brand-olive)]">
                <div className="mx-auto grid max-w-container gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-20">
                    <div className="max-w-2xl">
                        <p className="font-display text-2xl leading-snug font-medium text-primary_on-brand sm:text-3xl">
                            Marca y comunicación con criterio, no solo entregables lindos.
                        </p>
                        <p className="mt-4 max-w-xl text-lg leading-relaxed text-secondary_on-brand">
                            Pensamos qué decir y por qué, no únicamente cómo se ve.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

                    <div className="flex flex-col gap-2.5">
                        {contrastCards.map((card, i) => (
                            <Reveal key={card.vs} delay={i * 90} y={16}>
                                <div className="rounded-2xl bg-[var(--brand-black)] p-5">
                                    <span className="font-mono text-[11px] tracking-wide text-brand-tertiary uppercase">
                                        {card.vs}
                                    </span>
                                    <p className="mt-1.5 font-display text-lg font-medium text-primary_on-brand">
                                        {card.title}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

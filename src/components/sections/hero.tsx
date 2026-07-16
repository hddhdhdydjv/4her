import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const contrastCards = [
    {
        vs: "vs. Agencia tradicional",
        title: "Estrategia, no solo ejecución",
    },
    {
        vs: "vs. Freelance",
        title: "Un equipo con varias cabezas",
    },
    {
        vs: "vs. Hacerlo in-house",
        title: "Mirada externa y experiencia",
    },
];

export function Hero() {
    return (
        <section id="inicio" className="relative overflow-hidden">
            <div className="mx-auto grid max-w-container items-center gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
                {/* Columna izquierda: contenido */}
                <div className="max-w-2xl">
                    <Badge>Comunicación &amp; Marketing</Badge>

                    <h1 className="mt-6 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-primary sm:text-5xl lg:text-6xl">
                        Más estratégico que una agencia tradicional, más cercano que un freelance
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
                        Marca y comunicación con criterio, no solo entregables lindos. Pensamos qué
                        decir y por qué, no únicamente cómo se ve.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Button href="#contacto" size="lg">
                            Hablemos
                        </Button>
                        <Button href="#servicios" size="lg" variant="secondary">
                            Ver servicios
                        </Button>
                    </div>
                </div>

                {/* Columna derecha: 3 mini-cards de contraste */}
                <div className="flex flex-col gap-4">
                    {contrastCards.map((card) => (
                        <div
                            key={card.vs}
                            className="group rounded-2xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-6 transition-colors hover:border-[var(--color-border-brand)]"
                        >
                            <span className="text-xs font-semibold tracking-widest text-brand-secondary uppercase">
                                {card.vs}
                            </span>
                            <p className="mt-2 font-display text-xl font-medium text-primary">
                                {card.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

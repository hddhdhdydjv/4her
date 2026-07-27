import { Button } from "@/components/ui/button";
import { Globe } from "@/components/graphics/illustrations";
import { Scramble } from "@/components/motion/scramble";
import { CascadeTitle } from "@/components/motion/cascade-title";

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

                <p className="mt-8 max-w-xl text-lg leading-relaxed text-secondary">
                    Pensamos qué decir y por qué, no únicamente cómo se ve.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Button href="#contacto" size="lg">
                        Hablemos
                    </Button>
                    <Button href="#servicios" size="lg" variant="secondary">
                        Ver servicios
                    </Button>
                </div>
            </div>
        </section>
    );
}

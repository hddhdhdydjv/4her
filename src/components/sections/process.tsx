import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const steps = [
    { number: "01", title: "Nos conocemos", text: "Escuchamos qué querés lograr y a quién querés llegar." },
    { number: "02", title: "Definimos el rumbo", text: "Acordamos qué decir y por qué antes de producir nada." },
    { number: "03", title: "Creamos juntos", text: "Mostramos, ajustamos con tu feedback, iteramos rápido." },
    { number: "04", title: "Acompañamos", text: "Seguimos midiendo y afinando. No entregamos y desaparecemos." },
];

/** Bloque crema, numerales gigantes editoriales. */
export function Process() {
    return (
        <section id="proceso" className="mx-auto max-w-container px-6 py-24 lg:py-32">
            <Reveal>
                <div className="max-w-2xl">
                    <Badge>Cómo trabajamos</Badge>
                    <h2 className="mt-6 font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance text-primary sm:text-5xl">
                        Un proceso simple,
                        <br /> sin cajas negras
                    </h2>
                </div>
            </Reveal>

            <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, i) => (
                    <Reveal as="li" key={step.number} delay={i * 80}>
                        <div className="border-t border-[var(--brand-ink)]/15 pt-5">
                            <span className="font-display text-6xl font-semibold text-brand-secondary">
                                {step.number}
                            </span>
                            <h3 className="mt-4 font-display text-xl font-semibold text-primary">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-base leading-relaxed text-tertiary">{step.text}</p>
                        </div>
                    </Reveal>
                ))}
            </ol>
        </section>
    );
}

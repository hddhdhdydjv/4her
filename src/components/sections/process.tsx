import { Badge } from "@/components/ui/badge";

const steps = [
    {
        number: "01",
        title: "Nos conocemos",
        text: "Escuchamos qué querés lograr y a quién querés llegar.",
    },
    {
        number: "02",
        title: "Definimos el rumbo",
        text: "Acordamos qué decir y por qué antes de producir nada.",
    },
    {
        number: "03",
        title: "Creamos juntos",
        text: "Mostramos, ajustamos con tu feedback, iteramos rápido.",
    },
    {
        number: "04",
        title: "Acompañamos",
        text: "Seguimos midiendo y afinando. No entregamos y desaparecemos.",
    },
];

export function Process() {
    return (
        <section id="proceso" className="border-t border-[var(--color-border-secondary)]">
            <div className="mx-auto max-w-container px-6 py-20 lg:py-28">
                <div className="max-w-2xl">
                    <Badge>Cómo trabajamos</Badge>
                    <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl">
                        Un proceso simple, sin cajas negras
                    </h2>
                </div>

                <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => (
                        <li key={step.number} className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg-brand-secondary)] font-display text-lg font-semibold text-brand-secondary">
                                {step.number}
                            </div>
                            <h3 className="mt-5 font-display text-xl font-semibold text-primary">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-base leading-relaxed text-secondary">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

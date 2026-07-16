import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

/**
 * Sección OPCIONAL — Desafíos.
 * Para quitarla, borrá <Challenges /> de src/app/page.tsx.
 */
const challenges = [
    { problem: "Nuestra marca quedó desactualizada", answer: "Rebranding" },
    { problem: "Hacemos cosas buenas pero nadie las ve", answer: "Visibilidad" },
    { problem: "No nos diferenciamos", answer: "Posicionamiento" },
    { problem: "Queremos crecer", answer: "Growth" },
];

/** Bloque olivo. */
export function Challenges() {
    return (
        <section id="desafios" className="bg-[var(--brand-olive)]">
            <div className="mx-auto max-w-container px-6 py-24 lg:py-32">
                <Reveal>
                    <div className="max-w-2xl">
                        <Badge tone="onDark">Desafíos</Badge>
                        <h2 className="mt-6 font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance text-primary_on-brand sm:text-5xl">
                            Quizás te suene
                            <br /> alguno de estos
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-3 sm:grid-cols-2">
                    {challenges.map((c, i) => (
                        <Reveal key={c.answer} delay={i * 70}>
                            <div className="flex items-center justify-between gap-5 rounded-2xl bg-[var(--brand-cream)] p-6">
                                <p className="font-display text-lg font-medium text-primary">
                                    &ldquo;{c.problem}&rdquo;
                                </p>
                                <span className="shrink-0 rounded-full bg-[var(--brand-ink)] px-4 py-1.5 font-mono text-[11px] tracking-wide text-primary_on-brand uppercase">
                                    {c.answer}
                                </span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

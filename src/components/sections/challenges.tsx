import { Badge } from "@/components/ui/badge";

/**
 * Sección OPCIONAL — Desafíos.
 * Para quitarla, borrá <Challenges /> de src/app/page.tsx (o este archivo).
 */
const challenges = [
    { problem: "Nuestra marca quedó desactualizada", answer: "Rebranding" },
    { problem: "Hacemos cosas buenas pero nadie las ve", answer: "Visibilidad" },
    { problem: "No nos diferenciamos", answer: "Posicionamiento" },
    { problem: "Queremos crecer", answer: "Growth" },
];

export function Challenges() {
    return (
        <section id="desafios" className="border-t border-[var(--color-border-secondary)]">
            <div className="mx-auto max-w-container px-6 py-20 lg:py-28">
                <div className="max-w-2xl">
                    <Badge>Desafíos</Badge>
                    <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl">
                        Quizás te suene alguno de estos
                    </h2>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2">
                    {challenges.map((c) => (
                        <div
                            key={c.answer}
                            className="flex items-center justify-between gap-6 rounded-2xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-7"
                        >
                            <p className="font-display text-lg font-medium text-primary">
                                &ldquo;{c.problem}&rdquo;
                            </p>
                            <span className="shrink-0 rounded-full bg-[var(--color-bg-brand-secondary)] px-4 py-1.5 text-sm font-medium text-brand-secondary">
                                {c.answer}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const services = [
    {
        number: "01",
        title: "Branding & Rebranding",
        items: ["Identidad", "Rebranding", "Naming", "Sistema de marca"],
    },
    {
        number: "02",
        title: "Estrategia & Posicionamiento",
        items: ["Estrategia de comunicación", "Posicionamiento", "Mensajes clave", "Propuesta de valor"],
    },
    {
        number: "03",
        title: "Marketing digital & Contenido",
        items: ["Marketing digital", "Contenido", "Redes", "Campañas"],
    },
    {
        number: "04",
        title: "Growth & Prensa",
        items: [
            "Growth",
            "Prensa y relaciones",
            "Comunicación institucional",
            "Sostenibilidad (vía partner)",
        ],
    },
];

/** Bloque verde sage a lo Aptos. */
export function Services() {
    return (
        <section id="servicios" className="bg-[var(--brand-sage)]">
            <div className="mx-auto max-w-container px-6 py-24 lg:py-32">
                <Reveal>
                    <div className="max-w-2xl">
                        <Badge tone="neutral">Qué hacemos</Badge>
                        <h2 className="mt-6 font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance text-primary sm:text-5xl">
                            Cuatro frentes,
                            <br /> un mismo criterio
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-[var(--brand-ink)]/10 bg-[var(--brand-ink)]/10 sm:grid-cols-2">
                    {services.map((service, i) => (
                        <Reveal key={service.number} delay={i * 70}>
                            <article className="flex h-full flex-col bg-[var(--brand-sage)] p-8 transition-colors hover:bg-[var(--brand-sage-deep)]">
                                <span className="font-display text-5xl font-semibold text-[var(--brand-ink)]/25">
                                    {service.number}
                                </span>
                                <h3 className="mt-5 font-display text-2xl font-semibold text-primary">
                                    {service.title}
                                </h3>
                                <ul className="mt-6 flex flex-wrap gap-2">
                                    {service.items.map((item) => (
                                        <li
                                            key={item}
                                            className="rounded-full border border-[var(--brand-ink)]/15 px-3 py-1.5 font-mono text-xs text-secondary"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

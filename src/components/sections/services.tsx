import { Badge } from "@/components/ui/badge";

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

export function Services() {
    return (
        <section id="servicios" className="border-t border-[var(--color-border-secondary)]">
            <div className="mx-auto max-w-container px-6 py-20 lg:py-28">
                <div className="max-w-2xl">
                    <Badge>Qué hacemos</Badge>
                    <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl">
                        Cuatro frentes, un mismo criterio
                    </h2>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2">
                    {services.map((service) => (
                        <article
                            key={service.number}
                            className="flex flex-col rounded-2xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-8 transition-colors hover:border-[var(--color-border-brand)]"
                        >
                            <span className="font-display text-3xl font-semibold text-brand-secondary">
                                {service.number}
                            </span>
                            <h3 className="mt-4 font-display text-xl font-semibold text-primary">
                                {service.title}
                            </h3>
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {service.items.map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-full bg-[var(--color-bg-primary)] px-3 py-1.5 text-sm text-secondary ring-1 ring-inset ring-[var(--color-border-secondary)]"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

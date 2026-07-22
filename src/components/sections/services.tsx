import { Carousel } from "@/components/ui/carousel";
import { Media } from "@/components/ui/media";

const services = [
    {
        number: "01",
        title: "Branding & Rebranding",
        items: ["Identidad", "Rebranding", "Naming", "Sistema de marca"],
        description: "Creamos o renovamos la identidad de tu marca y las pautas para sostenerla con coherencia.",
        image: undefined as string | undefined, // "/images/servicio-branding.jpg"
    },
    {
        number: "02",
        title: "Estrategia & Posicionamiento",
        items: ["Estrategia", "Posicionamiento", "Mensajes clave", "Propuesta de valor"],
        description: "Definimos qué decir y por qué antes de producir: posicionamiento y mensajes claros.",
        image: undefined,
    },
    {
        number: "03",
        title: "Marketing digital & Contenido",
        items: ["Marketing digital", "Contenido", "Redes", "Campañas"],
        description: "Llevamos la marca a lo cotidiano con contenido y campañas que comunican, no solo llenan el feed.",
        image: undefined,
    },
    {
        number: "04",
        title: "Growth & Prensa",
        items: ["Growth", "Prensa", "Comunicación institucional", "Sostenibilidad (partner)"],
        description: "Hacemos crecer la presencia de la marca con growth, prensa y comunicación institucional.",
        image: undefined,
    },
];

export function Services() {
    return (
        <section id="servicios" className="bg-[var(--brand-sage)] py-24 lg:py-32">
            <div className="mx-auto max-w-container px-6">
                <p className="font-mono text-[11px] tracking-[0.2em] text-secondary uppercase">Qué hacemos</p>
                <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.02] font-medium tracking-[-0.02em] text-balance text-primary">
                    Servicios que combinamos según tu objetivo
                </h2>

                <Carousel
                    className="mt-12"
                    ariaLabel="Servicios"
                    autoplay
                    slideClassName="w-[85%] sm:w-[55%] lg:w-[36%]"
                >
                    {services.map((s) => (
                        <article
                            key={s.number}
                            className="flex h-full flex-col rounded-3xl bg-[var(--brand-cream)] p-6"
                        >
                            <Media
                                className="aspect-[4/3] w-full"
                                rounded="rounded-2xl"
                                src={s.image}
                                alt={s.title}
                                label={`Servicio ${s.number}`}
                            />
                            <div className="mt-6 flex items-baseline gap-3">
                                <span className="font-display text-2xl font-medium text-[var(--brand-ink)]/30 tabular-nums">
                                    {s.number}
                                </span>
                                <h3 className="font-display text-xl font-medium text-primary sm:text-2xl">{s.title}</h3>
                            </div>
                            <p className="mt-3 text-base leading-relaxed text-tertiary">{s.description}</p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {s.items.map((it) => (
                                    <li
                                        key={it}
                                        className="rounded-full border border-[var(--brand-ink)]/15 px-3 py-1.5 font-mono text-xs text-secondary"
                                    >
                                        {it}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}

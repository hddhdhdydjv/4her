import { Tilt } from "@/components/motion/tilt";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Screen, gutter, type, tone } from "@/components/ui/section";
import { Visual } from "@/components/ui/visual";
import { cx } from "@/utils/cx";

/**
 * Servicios apilados: imagen a la izquierda, texto a la derecha, uno debajo
 * del otro. La columna de texto se estira al alto de la imagen, así la lista
 * de entregables cierra a la misma línea que la foto.
 */
const services = [
    {
        image: "/images/services/posicionamiento",
        title: "Posicionamiento de marca",
        body: "Definimos el territorio de marca, el tono de comunicación y la propuesta de valor que te diferencia de tu competencia. Lo bajamos a un manual aplicable a cada pieza que produzcas.",
        items: [
            "Auditoría de marca y análisis competitivo",
            "Definición de propuesta de valor",
            "Manual de identidad verbal y visual",
            "Tono y lineamientos de comunicación",
        ],
    },
    {
        image: "/images/services/marketing",
        title: "Marketing digital y campañas",
        body: "Diseñamos, ejecutamos y optimizamos campañas en los canales donde está tu cliente, orientadas a un objetivo concreto: leads, tráfico calificado o ventas directas.",
        items: [
            "Google Ads, Meta e Instagram Ads",
            "Contenido y calendario para redes",
            "Email marketing y automatización",
            "Reporte mensual de resultados",
        ],
    },
    {
        image: "/images/services/estrategia",
        title: "Estrategia comercial",
        body: "Miramos tu embudo de ventas de punta a punta, identificamos dónde se pierden oportunidades y armamos un plan comercial con objetivos trimestrales medibles.",
        items: [
            "Diagnóstico del proceso comercial",
            "Definición de objetivos y KPIs",
            "Plan trimestral de acción",
            "Acompañamiento en la implementación",
        ],
    },
    {
        image: "/images/services/sello-verde",
        title: "Gestión del Sello Verde",
        body: "Acompañamos a la empresa en todo el trámite: diagnóstico de las prácticas actuales, armado de la documentación, implementación de las mejoras que falten y seguimiento hasta obtener la certificación.",
        items: [
            "Mejora la imagen institucional y la percepción de marca frente a clientes",
            "Suma un requisito cada vez más pedido en licitaciones y por grandes cuentas",
            "Incluye asesoría en gestión de residuos y economía circular",
            "Diferencia a la empresa frente a competidores sin certificación",
        ],
    },
];

export function Services() {
    return (
        <Screen id="servicios" inset={cx(gutter, "pt-[clamp(88px,16vh,176px)] pb-[clamp(88px,16vh,176px)]")}>
            <div className="flex flex-col gap-16 lg:gap-24">
                <div className="flex max-w-[800px] flex-col gap-3">
                    <div className="flex flex-col gap-4">
                        <Reveal delay={0}>
                            <p className={cx(type.body, tone.secondary)}>Nuestros servicios</p>
                        </Reveal>
                        <SplitReveal delay={120} className={cx(type.h1, tone.primary, "text-balance")}>
                            Servicios que se combinan según lo que tu marca necesita
                        </SplitReveal>
                    </div>
                    <Reveal delay={260}>
                        <p className={cx(type.lead, tone.tertiary)}>Vos elegís por dónde empezar</p>
                    </Reveal>
                </div>

                <ol className="flex flex-col gap-[clamp(72px,11vw,176px)]">
                    {services.map((s, i) => (
                        <li key={s.title} className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-[5%]">
                            <Reveal delay={0} variant="scale" className="w-full lg:w-[47.5%] lg:shrink-0">
                                <Tilt className="aspect-[11/8] w-full">
                                    <Visual
                                        name={s.image}
                                        alt={s.title}
                                        sizes="(min-width: 1024px) 608px, 100vw"
                                        spec="1216 × 884 · WebP o JPG"
                                        placeholderClassName="bg-[#E7E7E5]"
                                    />
                                </Tilt>
                            </Reveal>

                            <Reveal
                                delay={140}
                                className="flex flex-col justify-between gap-8 lg:w-[47.5%] lg:shrink-0"
                            >
                                <div className="flex flex-col gap-4">
                                    <span className={cx(type.label, tone.tertiary)}>
                                        [ {String(i + 1).padStart(2, "0")} ]
                                    </span>
                                    <h3 className={cx(type.h2, tone.primary, "text-balance")}>{s.title}</h3>
                                    <p className={cx(type.bodySm, tone.secondary, "max-w-[52ch]")}>{s.body}</p>
                                </div>

                                <ul className="flex flex-col">
                                    {s.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-baseline gap-3 border-t border-[var(--border-default)] py-3"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="size-1 shrink-0 translate-y-[-3px] rounded-full bg-[var(--text-tertiary)]"
                                            />
                                            <span className={cx(type.bodySm, tone.secondary)}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </div>
        </Screen>
    );
}

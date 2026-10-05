import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { gutter, type, tone } from "@/components/ui/section";
import { Visual } from "@/components/ui/visual";
import { ServicesCarousel } from "@/components/sections/services-carousel";
import { cx } from "@/utils/cx";

/**
 * Servicios: el encabezado en flujo normal y, debajo, el carrusel que avanza
 * con el scroll (ver `ServicesCarousel`).
 *
 * Este archivo es del servidor a propósito: así resuelve qué imágenes ya
 * están subidas y le pasa al carrusel cada una lista (imagen o placeholder).
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
    const images = services.map((s) => (
        <Visual
            key={s.image}
            name={s.image}
            alt={s.title}
            sizes="(min-width: 1024px) 608px, 100vw"
            spec="1216 × 884 · WebP o JPG"
            placeholderClassName="bg-[#E7E7E5]"
        />
    ));

    return (
        <section id="servicios" className="relative">
            <div className={cx(gutter, "pt-[clamp(88px,16vh,176px)]")}>
                <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-3">
                    <Reveal delay={0}>
                        <p className={cx(type.body, tone.secondary)}>Nuestros servicios</p>
                    </Reveal>
                    <SplitReveal delay={120} className={cx(type.h1, tone.primary, "max-w-[800px] text-balance")}>
                        Servicios que se combinan según lo que tu marca necesita
                    </SplitReveal>
                    <Reveal delay={260}>
                        <p className={cx(type.lead, tone.tertiary)}>Vos elegís por dónde empezar</p>
                    </Reveal>
                </div>
            </div>

            <ServicesCarousel
                slides={services.map(({ title, body, items }) => ({ title, body, items }))}
                images={images}
            />
        </section>
    );
}

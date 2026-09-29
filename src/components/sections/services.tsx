import { Servicio1, Servicio2, Servicio3, Servicio4 } from "@/components/graphics/illustrations";
import { DitherArt } from "@/components/ui/dither-art";

const services = [
    {
        letter: "p",
        art: Servicio1,
        title: "Posicionamiento de marca",
        body1: "Definimos el territorio de marca, el tono de comunicación y la propuesta de valor que te diferencia de tu competencia.",
        body2: "Lo bajamos a un manual aplicable a cada pieza que produzcas.",
    },
    {
        letter: "m",
        art: Servicio2,
        title: "Marketing digital y campañas",
        body1: "Diseñamos, ejecutamos y optimizamos campañas en los canales donde está tu cliente.",
        body2: "Orientadas a un objetivo concreto: leads, tráfico calificado o ventas directas.",
    },
    {
        letter: "e",
        art: Servicio3,
        title: "Estrategia comercial",
        body1: "Miramos tu embudo de ventas de punta a punta e identificamos dónde se pierden oportunidades.",
        body2: "Armamos un plan comercial con objetivos trimestrales medibles.",
    },
    {
        letter: "s",
        art: Servicio4,
        title: "Gestión del Sello Verde",
        body1: "Acompañamos todo el trámite: diagnóstico de las prácticas actuales, documentación, implementación de las mejoras que falten y seguimiento hasta la certificación.",
        body2: "Un requisito cada vez más pedido en licitaciones y por grandes cuentas.",
    },
];


export function Services() {
    return <section id="servicios" className="editorial-section">
        <div className="editorial-intro">
            <p className="editorial-eyebrow">Nuestros servicios</p>
            <div><h2>Servicios que se combinan según lo que tu marca necesita</h2>
            <p className="editorial-subtitle">Vos elegís por dónde empezar</p></div>
        </div>
        <div className="service-grid">
            {services.map((service, i) => <article key={service.title} className="service-article">
                <div className="service-art"><span className="editorial-number">0{i + 1}</span>
                    <DitherArt><service.art className="h-full w-full" /></DitherArt>
                </div>
                <h3>{service.title}</h3>
                <p>{service.body1}</p><p>{service.body2}</p>
            </article>)}
        </div>
        <a href="#contacto" className="editorial-cta">Hacé tu consulta</a>
    </section>;
}

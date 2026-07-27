import { SectionIntro } from "@/components/ui/section";
import { FeatureSplit } from "@/components/sections/feature-split";
import { Button } from "@/components/ui/button";

const services = [
    {
        title: "Branding & Rebranding",
        body: "Creamos o renovamos la identidad de tu marca: naming, sistema visual y guías de uso. Para que cada pieza que produzcas, la hagas vos o un tercero, se vea y se sienta igual.",
        image: undefined as string | undefined, // "/images/servicio-branding.jpg"
    },
    {
        title: "Estrategia & Posicionamiento",
        body: "Definimos qué decir, a quién y por qué, antes de producir cualquier pieza. Mensajes clave y propuesta de valor que sostienen todo lo que comunicás después.",
        image: undefined,
    },
    {
        title: "Marketing digital & Contenido",
        body: "Contenido y campañas para tus redes, pensadas para comunicar, no solo para llenar el feed. Estrategia de canales y calendario editorial adaptados a tu marca y tu audiencia.",
        image: undefined,
    },
    {
        title: "Growth & Prensa",
        body: "Hacemos crecer la presencia de tu marca con growth y relaciones con prensa. Comunicación institucional y sostenibilidad (vía partner) cuando tu marca lo necesita.",
        image: undefined,
    },
];

export function Services() {
    return (
        <>
            <SectionIntro
                id="servicios"
                eyebrow="Nuestros servicios"
                title={
                    <>
                        Servicios que se combinan
                        <br className="hidden sm:block" /> según lo que tu marca necesita
                    </>
                }
                subtitle="Vos elegís por dónde empezar"
            />

            {services.map((s, i) => (
                <FeatureSplit
                    key={s.title}
                    title={s.title}
                    body={s.body}
                    image={s.image}
                    imageLabel={`Servicio 0${i + 1}`}
                    reverse={i % 2 === 0}
                    tight={i === 0}
                >
                    <Button href="#contacto" size="lg">
                        Haz tu consulta
                    </Button>
                </FeatureSplit>
            ))}
        </>
    );
}

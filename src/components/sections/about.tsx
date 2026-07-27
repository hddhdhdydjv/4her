import { SectionIntro } from "@/components/ui/section";
import { FeatureSplit } from "@/components/sections/feature-split";

export function About() {
    return (
        <>
            <SectionIntro
                id="quienes-somos"
                eyebrow="Quiénes somos"
                title={
                    <>
                        Más estratégicos que una agencia,
                        <br className="hidden sm:block" /> más cerca que un freelance
                    </>
                }
                lead="No entregamos piezas lindas y desaparecemos. Pensamos qué decir y por qué, trabajamos con vos en cada paso y medimos si de verdad comunica. Somos la cara de comunicación de 4HIS, [fundada/liderada por + nombre / breve historia de quién está detrás], aplicando la misma forma de trabajar a tu marca."
            />

            <FeatureSplit
                tight
                title={
                    <>
                        De la estrategia a la ejecución,
                        <br className="hidden sm:block" /> sin intermediarios
                    </>
                }
                body="No tercerizamos ni fragmentamos tu marca entre proveedores sueltos. Un mismo equipo piensa, produce y mide."
                imageLabel="Ilustración isométrica"
            />
        </>
    );
}

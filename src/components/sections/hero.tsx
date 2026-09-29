import { Logotipo } from "@/components/graphics/brand";
import { DitherArt } from "@/components/ui/dither-art";

export function Hero() {
    return (
        <section id="inicio" className="editorial-hero">
            <div className="hero-copy">
                <h1>Ayudamos a decidir qué decir, a quién, y cómo convertirlo en ventas.</h1>
                <div className="hero-aside">
                    <p>Definimos el mensaje, ejecutamos la pauta y ponemos objetivos comerciales sobre la mesa.</p>
                    <p className="hero-disciplines">Posicionamiento de marca · Marketing digital y campañas · Estrategia comercial</p>
                </div>
            </div>
            <div className="hero-wordmark">
                <DitherArt logo><Logotipo tight className="w-full" /></DitherArt>
            </div>
        </section>
    );
}

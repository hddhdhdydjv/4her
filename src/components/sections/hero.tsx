import { TextsReveal } from "@/components/motion/texts-reveal";
import { type, tone } from "@/components/ui/section";
import { Visual } from "@/components/ui/visual";
import { cx } from "@/utils/cx";

/**
 * Hero: copy a la izquierda sobre verde agua y el objeto a la derecha.
 *
 * Mide como mínimo una pantalla (`100svh`, que en mobile descuenta la barra
 * del navegador). En desktop la imagen va absoluta y a sangre por la derecha;
 * en mobile pasa al flujo debajo del texto con su proporción completa (9:8,
 * la del archivo), así se ve entera aunque el hero pase de una pantalla.
 */

/** Fondo del hero, tomado del diseño. */
const HERO_BG = "#EBF2F2";

export function Hero() {
    return (
        <section
            id="inicio"
            className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
            style={{ background: HERO_BG }}
        >
            <div className="relative z-10 flex flex-1 px-6 pt-28 sm:px-10 lg:px-20 lg:pt-32 lg:pb-28">
                <div className="mx-auto flex w-full max-w-[1280px] flex-col justify-center">
                    <TextsReveal className="flex max-w-[470px] flex-col gap-5">
                        <p className={cx("t-stagger-line t-stagger-line--1", type.body, tone.secondary)}>
                            Comunicación y marketing
                        </p>
                        <h1 className={cx("t-stagger-line t-stagger-line--2", type.h1, tone.primary)}>
                            Ayudamos a decidir qué decir, a quién, y cómo convertirlo en ventas
                        </h1>
                        <p className={cx("t-stagger-line t-stagger-line--3", type.bodySm, tone.secondary, "max-w-[48ch]")}>
                            Trabajamos con marcas que están empezando y con empresas que ya venden pero no
                            logran ordenar su comunicación. Definimos el mensaje, ejecutamos la pauta y
                            ponemos objetivos comerciales sobre la mesa.
                        </p>
                    </TextsReveal>
                </div>
            </div>

            {/* El objeto: a sangre por la derecha en desktop, en el flujo en mobile. */}
            <div className="relative mt-10 aspect-[9/8] w-full shrink-0 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[58%]">
                <Visual
                    name="/images/hero/hero"
                    alt="Composición de marca 4her"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    spec="1800 × 1600 · PNG o WebP, fondo transparente o #EBF2F2"
                    priority
                    placeholderClassName="bg-[#E1ECEB]"
                />
            </div>
        </section>
    );
}

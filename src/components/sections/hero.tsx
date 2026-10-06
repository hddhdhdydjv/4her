import { HeroVideo } from "@/components/motion/hero-video";
import { TextsReveal } from "@/components/motion/texts-reveal";
import { type, tone } from "@/components/ui/section";
import { Visual, resolvePublic } from "@/components/ui/visual";
import { cx } from "@/utils/cx";

/**
 * Hero: copy a la izquierda sobre verde agua.
 *
 * Mide como mínimo una pantalla (`100svh`, que en mobile descuenta la barra
 * del navegador). El visual depende de qué haya subido:
 *
 *  - Imagen (`hero.png`), la base: composición 16:9 con el objeto a la
 *    derecha. En desktop va a sangre detrás de la tipografía; en mobile,
 *    debajo del texto, recortada por la izquierda (que está vacía) para que
 *    el objeto se vea entero. Cuando haya una versión vertical, la usa.
 *  - Video (`hero-video.mp4|webm`), opcional: si existe, en desktop reemplaza
 *    a la imagen. Es vertical (9:16): va en un panel a la derecha que se
 *    funde con el fondo hacia el texto. El video no existe en el DOM en
 *    mobile (ver `HeroVideo`), que sigue con la imagen.
 *
 * Este archivo es del servidor a propósito: resuelve qué archivos ya están
 * subidos y le pasa a cada pieza lo que existe.
 */

/** Fondo del hero, tomado del diseño. */
const HERO_BG = "#EBF2F2";

/**
 * Fondo de desktop cuando hay video: el degradé del borde izquierdo del
 * video, medido cuadro a cuadro (es fijo, no cambia en todo el loop). Las
 * paradas están reubicadas al recorte que hace `object-cover` en el panel
 * (se ve del ~18% al ~82% del alto del video), así el video se funde con el
 * fondo sin costura.
 */
const VIDEO_BG = "linear-gradient(180deg, #8BAFE2 0%, #9CC2F8 19%, #B9DFFE 50%, #BDE0FE 81%, #BADCFE 100%)";

const VIDEO = "/images/hero/hero-video";
const POSTER = "/images/hero/hero-poster";

export function Hero() {
    const mp4 = resolvePublic(VIDEO, ["mp4"]);
    const webm = resolvePublic(VIDEO, ["webm"]);
    const poster = resolvePublic(POSTER);
    const hasVideo = Boolean(mp4 || webm);

    return (
        <section
            id="inicio"
            className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
            style={{ background: HERO_BG }}
        >
            {/* Desktop con video: panel a la derecha, detrás de todo. El video es
                vertical (9:16), así que no va a sangre: ocupa un poco más de la
                mitad derecha y se recorta arriba y abajo, donde sólo hay degradé.
                El borde izquierdo se funde con el fondo del hero con una máscara,
                así el texto queda siempre sobre el verde agua. */}
            {hasVideo && (
                <div aria-hidden="true" className="absolute inset-0 -z-20 hidden lg:block" style={{ background: VIDEO_BG }} />
            )}
            {hasVideo && (
                <div
                    aria-hidden="true"
                    className="absolute inset-y-0 right-0 -z-10 hidden w-[55vw] lg:block"
                    style={{
                        maskImage: "linear-gradient(90deg, transparent 0%, #000 40%)",
                        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 40%)",
                    }}
                >
                    <HeroVideo mp4={mp4} webm={webm} poster={poster} />
                </div>
            )}

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

            {/* La imagen: debajo del texto en mobile; en desktop a sangre detrás de
                la tipografía, salvo que haya video, que ocupa su lugar. Es una
                composición 16:9 con el objeto a la derecha y el lado izquierdo
                despejado: `object-right` recorta por la izquierda, que está
                vacía, y no por donde está el objeto. */}
            <div
                className={cx(
                    "relative mt-10 aspect-[9/8] w-full shrink-0",
                    hasVideo ? "lg:hidden" : "lg:absolute lg:inset-0 lg:-z-10 lg:mt-0 lg:aspect-auto",
                )}
            >
                <Visual
                    name="/images/hero/hero"
                    alt="Composición de marca 4her"
                    sizes="100vw"
                    spec="3840 × 2160 · PNG o WebP · 16:9, objeto a la derecha"
                    priority
                    className="object-right"
                    placeholderClassName="bg-[#E1ECEB]"
                />
            </div>
        </section>
    );
}

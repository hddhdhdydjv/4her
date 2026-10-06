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
 *    a la imagen en todas las pantallas. Es vertical (9:16): en desktop va
 *    en un panel a la derecha que se funde con el fondo hacia el texto; en
 *    mobile, debajo del texto, fundido hacia arriba. En ambos casos el fondo
 *    del hero toma los colores del borde del video.
 *
 * Este archivo es del servidor a propósito: resuelve qué archivos ya están
 * subidos y le pasa a cada pieza lo que existe.
 */

/** Fondo del hero, tomado del diseño. */
const HERO_BG = "#EBF2F2";

/**
 * El video tiene el fondo reemplazado por este celeste sólido (se calculó el
 * degradé original, que es fijo en todo el loop, y se corrió cada cuadro a
 * este color). Es la base del hero: donde está el video el fondo es este
 * mismo color, así no hay costura, y desde ahí aclara hacia el texto.
 */
const VIDEO_SOLID = "#C4E0FB";
const LIGHT = "#E4F0FD";

/** Desktop: claro detrás del texto, el sólido del video desde la mitad. */
const VIDEO_BG = `linear-gradient(90deg, ${LIGHT} 0%, ${LIGHT} 22%, ${VIDEO_SOLID} 55%)`;

/** Mobile: claro arriba (texto), el sólido del video desde donde arranca. */
const VIDEO_BG_MOBILE = `linear-gradient(180deg, ${LIGHT} 0%, ${LIGHT} 25%, ${VIDEO_SOLID} 58%)`;

/**
 * Bordes del video en mobile: como su fondo ya es el color del hero, sólo se
 * suavizan los bordes de la caja (arriba un poco más, porque ahí el fondo del
 * hero todavía está aclarando).
 */
const MOBILE_MASK =
    "linear-gradient(180deg, transparent 0%, #000 22%, #000 94%, transparent 100%), linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)";

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
                así el texto queda siempre sobre fondo liso. */}
            {hasVideo && (
                <>
                    <div aria-hidden="true" className="absolute inset-0 -z-20 hidden lg:block" style={{ background: VIDEO_BG }} />
                    <div aria-hidden="true" className="absolute inset-0 -z-20 lg:hidden" style={{ background: VIDEO_BG_MOBILE }} />
                </>
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
                    <HeroVideo on="desktop" mp4={mp4} webm={webm} poster={poster} />
                </div>
            )}

            {/* Con video, en mobile el texto no se estira ni se centra: queda
                arriba y el video pega contra él; si sobra alto, sobra al final. */}
            <div
                className={cx(
                    "relative z-10 flex px-6 pt-28 sm:px-10 lg:flex-1 lg:px-20 lg:pt-32 lg:pb-28",
                    !hasVideo && "flex-1",
                )}
            >
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
            {hasVideo ? (
                /* Mobile con video: sube hasta quedar apenas por debajo del final
                   del texto (el texto va encima, z-10). La parte de arriba de la
                   caja es fondo ya fundido, así que el anillo arranca justo
                   después del párrafo. Puede pasarse del alto de la pantalla.
                   En tablet no ocupa todo el ancho: en 4:5 sería altísimo. */
                <div
                    aria-hidden="true"
                    className="pointer-events-none relative mx-auto -mt-[22vw] aspect-[4/5] w-full max-w-[560px] shrink-0 sm:-mt-16 lg:hidden"
                    style={{
                        maskImage: MOBILE_MASK,
                        WebkitMaskImage: MOBILE_MASK,
                        maskComposite: "intersect",
                        WebkitMaskComposite: "source-in",
                    }}
                >
                    <HeroVideo on="mobile" mp4={mp4} webm={webm} poster={poster} />
                </div>
            ) : (
                <div
                    className={cx(
                        "relative mt-10 aspect-[9/8] w-full shrink-0",
                        "lg:absolute lg:inset-0 lg:-z-10 lg:mt-0 lg:aspect-auto",
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
            )}
        </section>
    );
}

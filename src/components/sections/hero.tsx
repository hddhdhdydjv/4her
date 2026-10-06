import { HeroVideo } from "@/components/motion/hero-video";
import { TextsReveal } from "@/components/motion/texts-reveal";
import { type, tone } from "@/components/ui/section";
import { Visual, resolvePublic } from "@/components/ui/visual";
import { cx } from "@/utils/cx";

/**
 * Hero: copy a la izquierda sobre verde agua.
 *
 * Mide como mínimo una pantalla (`100svh`, que en mobile descuenta la barra
 * del navegador). Tiene dos versiones del visual:
 *
 *  - Desktop: un video a sangre, detrás de la tipografía, con un velo del
 *    color del hero desde la izquierda para que el texto se lea sobre
 *    cualquier cuadro. El video no existe en el DOM en mobile (ver
 *    `HeroVideo`).
 *  - Mobile: la imagen debajo del texto, con su proporción completa (9:8, la
 *    del archivo), así se ve entera aunque el hero pase de una pantalla.
 *
 * Este archivo es del servidor a propósito: resuelve qué archivos ya están
 * subidos y le pasa a cada pieza lo que existe.
 */

/** Fondo del hero, tomado del diseño. */
const HERO_BG = "#EBF2F2";

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
            {/* Desktop: el video detrás de todo. */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
                {hasVideo ? (
                    <HeroVideo mp4={mp4} webm={webm} poster={poster} />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#E1ECEB] p-6">
                        <div className="flex flex-col items-center gap-1.5 text-center">
                            <span className="font-body text-[0.8125rem] font-medium tracking-[0.06em] text-[var(--text-tertiary)] uppercase">
                                Video pendiente
                            </span>
                            <span className="font-mono text-[0.75rem] text-[var(--text-secondary)]">
                                public{VIDEO}.(mp4|webm)
                            </span>
                            <span className="font-body text-[0.75rem] text-[var(--text-tertiary)]">
                                1920 × 1080 · sin audio · loop de 10 a 20 s
                            </span>
                        </div>
                    </div>
                )}
                {/* Velo: el color del hero, fuerte atrás del texto y transparente hacia la derecha. */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(90deg, ${HERO_BG}E6 0%, ${HERO_BG}B3 34%, ${HERO_BG}00 66%)`,
                    }}
                />
            </div>

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

            {/* Mobile: la imagen, en el flujo debajo del texto. */}
            <div className="relative mt-10 aspect-[9/8] w-full shrink-0 lg:hidden">
                <Visual
                    name="/images/hero/hero"
                    alt="Composición de marca 4her"
                    sizes="100vw"
                    spec="1800 × 1600 · PNG o WebP, fondo transparente o #EBF2F2"
                    priority
                    placeholderClassName="bg-[#E1ECEB]"
                />
            </div>
        </section>
    );
}

/* eslint-disable @next/next/no-img-element -- los logos son SVG chicos de
   tamaño natural: next/image no aporta nada y exige ancho y alto fijos. */
import { TextsReveal } from "@/components/motion/texts-reveal";
import { type, tone } from "@/components/ui/section";
import { Visual, resolvePublic } from "@/components/ui/visual";
import { cx } from "@/utils/cx";

/**
 * Hero: copy a la izquierda sobre verde agua, el objeto a la derecha y la
 * tarjeta negra de marca apoyada abajo, encima de la imagen.
 *
 * En desktop la imagen va absoluta y a sangre por la derecha; en mobile pasa
 * al flujo, debajo del texto, y la tarjeta se monta sobre su borde inferior.
 */

/** Fondo del hero, tomado del diseño. */
const HERO_BG = "#EBF2F2";

/** Logos de clientes: si el SVG no está, queda una barra neutra en su lugar. */
const LOGOS = ["/images/hero/logos/logo-1", "/images/hero/logos/logo-2", "/images/hero/logos/logo-3"];

export function Hero() {
    return (
        <section
            id="inicio"
            className="relative isolate flex flex-col overflow-hidden lg:min-h-[clamp(640px,88vh,820px)]"
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
                        <div className="t-stagger-line t-stagger-line--4 pt-8 lg:pt-12">
                            <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-10" aria-label="Clientes">
                                {LOGOS.map((name) => {
                                    const src = resolvePublic(name);
                                    return (
                                        <li key={name}>
                                            {src ? (
                                                <img src={src} alt="" className="h-6 w-auto opacity-50 grayscale" />
                                            ) : (
                                                <span
                                                    aria-hidden="true"
                                                    className="block h-4 w-24 rounded-full bg-black/[0.07]"
                                                />
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </TextsReveal>
                </div>
            </div>

            {/* El objeto: a sangre por la derecha en desktop, en el flujo en mobile. */}
            <div className="relative mt-12 aspect-[5/4] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[58%]">
                <Visual
                    name="/images/hero/hero"
                    alt="Composición de marca 4her"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    spec="1800 × 1600 · PNG o WebP, fondo transparente o #EBF2F2"
                    priority
                    placeholderClassName="bg-[#E1ECEB]"
                />
            </div>

            {/* Tarjeta de marca: negra, con el cuadradito que asoma arriba a la derecha. */}
            <div className="relative z-20 mr-6 -mt-14 mb-10 ml-auto w-[min(300px,calc(100%-3rem))] sm:mr-10 lg:absolute lg:right-[6%] lg:bottom-[9%] lg:m-0 lg:w-[300px]">
                <div aria-hidden="true" className="absolute top-0 right-0 size-5 bg-[var(--accent-default)]" />
                <div className="mt-4 mr-4 bg-[var(--accent-default)] p-6">
                    <p className={cx(type.body, "text-[var(--neutral-300)]")}>
                        Más estratégico que una agencia, más cercano que un freelance.
                    </p>
                </div>
            </div>
        </section>
    );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { type } from "@/components/ui/section";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { cx } from "@/utils/cx";

/**
 * Hero del archivo de diseño (153:17154): el paisaje dentro de una tarjeta de
 * esquinas redondeadas, con el titular centrado encima.
 *
 * La foto no va a sangre: la tarjeta deja margen por los cuatro lados y el
 * fondo de página respira alrededor. El titular mezcla la grotesca de marca
 * con Fraunces itálica en el tramo del medio.
 */

/** Capa del paisaje — la misma que reusa la sección de contacto. */
const BACKDROP = "/images/hero/hero-back.png";

/** Mientras el PNG no esté, el degradado sostiene la composición. */
const SCENE_FALLBACK =
    "linear-gradient(180deg, #E9CBD4 0%, #DCC2D2 26%, #B9AECB 48%, #8E93A8 62%, #6E7B6A 78%, #4A5A3E 100%)";

/** Trama de puntos: el diseño tiene un grano fino sobre la foto. */
const DITHER = {
    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 0.5px, transparent 0.5px)",
    backgroundSize: "3px 3px",
} as const;

export function Hero() {
    const scrollTo = useAnchorScroll();
    const [failed, setFailed] = useState(false);

    return (
        <section id="inicio" className="px-4 pt-20 pb-4 sm:px-6 sm:pb-6 lg:px-12 lg:pt-24 lg:pb-12">
            <div
                className={cx(
                    "relative isolate flex flex-col items-center justify-center overflow-hidden",
                    "rounded-[20px] px-6 py-20 text-center sm:rounded-[28px] sm:py-24 lg:py-28",
                    "min-h-[clamp(460px,72vh,680px)]",
                )}
                style={{ background: SCENE_FALLBACK }}
            >
                {/* `priority`: es el LCP de la página, no puede cargar diferido. */}
                {!failed && (
                    <Image
                        src={BACKDROP}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="-z-20 object-cover object-center"
                        onError={() => setFailed(true)}
                    />
                )}

                {/* Velo: la foto sola no da contraste parejo para el texto en
                    claro. Lo justo para que se lea, sin apagar el atardecer. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(14,16,10,0.20) 0%, rgba(14,16,10,0.10) 45%, rgba(14,16,10,0.26) 100%)",
                    }}
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10" style={DITHER} />

                <h1
                    className={cx(
                        "font-display font-medium tracking-[-0.015em]",
                        "text-[clamp(1.875rem,3.9vw,3.5rem)] leading-[1.1]",
                        "max-w-[16ch] text-balance text-[var(--neutral-50)]",
                    )}
                >
                    Ayudamos a decidir{" "}
                    <span className={type.serif}>qué decir, a quién, y cómo</span> convertirlo en
                    ventas.
                </h1>

                <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-[1.6] text-white/80">
                    Trabajamos con marcas que están empezando y con empresas que ya venden pero no
                    logran ordenar su comunicación. Definimos el mensaje, ejecutamos la pauta y
                    ponemos objetivos comerciales sobre la mesa.
                </p>

                <a
                    href="#contacto"
                    onClick={scrollTo}
                    className={cx(
                        type.body,
                        "group mt-10 flex items-center gap-2.5 rounded-full bg-[var(--bg-inverse)] py-2.5 pr-2.5 pl-6",
                        "text-[var(--text-inverse)] transition-opacity hover:opacity-85",
                    )}
                >
                    Hablemos
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                        <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                </a>
            </div>
        </section>
    );
}

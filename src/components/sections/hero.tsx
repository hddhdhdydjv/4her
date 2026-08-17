"use client";

import Image from "next/image";
import { useState } from "react";
import { type } from "@/components/ui/section";
import { useParallax } from "@/hooks/use-parallax";
import { cx } from "@/utils/cx";

/**
 * Figma `Hero` (2205:2951) — paisaje en capas + logotipo en vidrio.
 *
 * El diseño viene separado en tres planos dentro de `Background shapes`
 * (1280×1600, top −266):
 *
 *   Shape 3 (2205:2953)  cielo + montañas lejanas   -> plano de fondo
 *   Logo    (2205:2954)  "4her" translúcido          -> plano medio
 *   Shape 1 (2205:2955)  lomas verdes del frente     -> primer plano
 *
 * El logo va DETRÁS del primer plano: ese solapamiento es lo que da la
 * sensación de profundidad cuando las tres capas se mueven a distinta
 * velocidad al hacer scroll.
 *
 * Los dos PNG viven en `public/images/hero/`. Si todavía no están, el
 * degradado de `SCENE_FALLBACK` sostiene la composición sin romper nada.
 *
 * Las capas pasan por `next/image`: el visitante nunca recibe el PNG crudo,
 * sino un AVIF/WebP recortado al ancho de SU pantalla (ver `sizes`). El peso
 * del archivo fuente sólo afecta al repo, no a la carga de la página.
 */

/* Rutas de las capas exportadas desde Figma. */
const LAYER_BACK = "/images/hero/hero-back.png"; // Shape 3
const LAYER_FRONT = "/images/hero/hero-front.png"; // Shape 1

/* Degradado que imita el atardecer del diseño mientras faltan los PNG. */
const SCENE_FALLBACK =
    "linear-gradient(180deg, #E9CBD4 0%, #DCC2D2 26%, #B9AECB 48%, #8E93A8 62%, #6E7B6A 78%, #4A5A3E 100%)";

/**
 * Velocidad de rezago de cada plano (ver `useParallax`).
 * Cuanto más lejos está el plano, más se queda atrás.
 */
const SPEED = {
    back: 0.42,
    logo: 0.24,
    front: -0.06,
} as const;

/**
 * Geometría compartida por los tres planos.
 *
 * Las dos fotos salen del MISMO lienzo (5120×3520), así que mientras compartan
 * caja y `object-cover` recortan idéntico y quedan registradas en cualquier
 * viewport. El alto extra es el margen que necesita el parallax para moverse
 * sin descubrir los bordes.
 */
const SCENE_BOX = "absolute inset-x-0 -top-[14%] h-[128%] will-change-transform";

/** Altura del logotipo dentro de la escena: apoyado sobre la línea de montañas. */
const RIDGE = "44%";

/** Textura de trama de puntos: el diseño tiene un dithering fino sobre la foto. */
const DITHER = {
    backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.10) 0.5px, transparent 0.5px)",
    backgroundSize: "3px 3px",
} as const;

export function Hero() {
    const backRef = useParallax<HTMLDivElement>(SPEED.back);
    const logoRef = useParallax<HTMLDivElement>(SPEED.logo);
    const frontRef = useParallax<HTMLDivElement>(SPEED.front);

    // Mientras las capas no existan en public/, se muestra sólo el degradado.
    const [backFailed, setBackFailed] = useState(false);
    const [frontFailed, setFrontFailed] = useState(false);

    return (
        <section id="inicio" className="relative isolate min-h-screen overflow-hidden">
            {/* ---------- Plano de fondo: cielo y montañas (Shape 3) ---------- */}
            <div
                ref={backRef}
                aria-hidden="true"
                className={cx(SCENE_BOX, "-z-30")}
                style={{ background: SCENE_FALLBACK }}
            >
                {/* `priority`: es el LCP de la página, no puede cargar diferido. */}
                {!backFailed && (
                    <Image
                        src={LAYER_BACK}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                        // Si el PNG todavía no está, se cae al degradado.
                        onError={() => setBackFailed(true)}
                    />
                )}
            </div>

            {/* ---------- Plano medio: logotipo en vidrio (Logo) ----------
                Va en una caja de la misma geometría que las fotos, así el
                logotipo acompaña al encuadre en vez de flotar por su cuenta.
                `RIDGE` lo apoya sobre la línea de las montañas: las lomas del
                frente arrancan al ~62% de la foto y le tapan la base. */}
            <div
                ref={logoRef}
                className={cx(SCENE_BOX, "-z-20 flex items-start justify-center")}
            >
                <span className="relative" style={{ top: RIDGE }}>
                    <GlassWordmark />
                </span>
            </div>

            {/* ---------- Primer plano: lomas verdes (Shape 1) ----------
                Misma caja y mismo `object-cover` que el fondo: las dos capas
                salen del mismo lienzo (5120×3520), así que compartiendo
                geometría quedan calzadas en cualquier viewport. La capa trae
                el canal alfa: transparente hasta el ~60%, lomas abajo. */}
            <div ref={frontRef} aria-hidden="true" className={cx(SCENE_BOX, "-z-10")}>
                {!frontFailed && (
                    <Image
                        src={LAYER_FRONT}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                        onError={() => setFrontFailed(true)}
                    />
                )}
            </div>

            {/* Trama de puntos sobre toda la escena. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={DITHER} />

            {/* Velo inferior: asienta el texto y empalma con la sección siguiente. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[42%]"
                style={{
                    background:
                        "linear-gradient(180deg, transparent 0%, rgba(12,8,6,0.28) 55%, rgba(12,8,6,0.72) 100%)",
                }}
            />

            {/* ---------- Copy ---------- */}
            <div className="relative flex min-h-screen flex-col justify-end px-6 pt-40 pb-16 sm:px-10 lg:px-20 lg:pb-24">
                <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-[420px]">
                        <h1 className={cx(type.h3, "text-[var(--neutral-50)]")}>
                            Comunicación &amp; Marketing
                        </h1>
                        <p className={cx(type.body, "mt-3 text-[var(--neutral-200)]")}>
                            Más estratégico que una agencia, más cercano que un freelance
                        </p>
                    </div>

                    <p
                        className={cx(type.label, "max-w-[279px] text-[var(--neutral-200)] lg:text-right")}
                    >
                        Marca, contenido y estrategia en un mismo equipo.
                    </p>
                </div>
            </div>
        </section>
    );
}

/**
 * "4her" en vidrio, como en el diseño: blanco translúcido sobre el paisaje.
 *
 * Acá había un `backdrop-filter` para desenfocar la foto de atrás, pero el
 * desenfoque se aplica a la CAJA del elemento, no a la forma de las letras:
 * dibujaba un rectángulo de bordes duros alrededor de la palabra. No hay forma
 * de recortarlo a los glifos con una tipografía web (`background-clip: text` no
 * alcanza al backdrop, y una máscara SVG no puede usar la fuente cargada).
 *
 * El vidrio se resuelve entonces con relleno translúcido más un realce de
 * canto arriba y sombra difusa abajo, que es exactamente lo que muestra el
 * frame de Figma.
 */
function GlassWordmark() {
    return (
        <span
            className="font-display leading-[0.82] font-medium tracking-[-0.03em] select-none"
            style={{
                fontSize: "clamp(4rem, 30vw, 19rem)",
                color: "rgba(255,255,255,0.46)",
                textShadow:
                    "0 1.5px 0 rgba(255,255,255,0.34), 0 -1px 1px rgba(0,0,0,0.05), 0 28px 70px rgba(20,14,30,0.22)",
            }}
        >
            4her
        </span>
    );
}

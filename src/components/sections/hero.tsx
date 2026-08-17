"use client";

import Image from "next/image";
import { useState } from "react";
import { Logotipo } from "@/components/graphics/brand";
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

/**
 * El primer plano va corrido hacia arriba respecto del fondo, igual que en el
 * diseño (ahí `Shape 1` está colocado aparte, no calzado con `Shape 3`). Es lo
 * que hace que las lomas suban a tapar la base del logotipo: sin ese corrimiento
 * la parte opaca de la capa recién aparece al ~88% del alto y el solapamiento
 * no se lee. Al ser transparente por encima de las lomas, mover la capa sólo
 * mueve el horizonte verde.
 */
const FRONT_BOX = "absolute inset-x-0 -top-[22%] h-[128%] will-change-transform";

/** Fondo de la tarjeta de copy: el negro de la marca, no un velo sobre la foto. */
const CARD_BG = "#141414";

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
            <div ref={logoRef} aria-hidden="true" className={cx(SCENE_BOX, "-z-20")}>
                <GlassWordmark />
            </div>

            {/* ---------- Primer plano: lomas verdes (Shape 1) ----------
                Misma caja y mismo `object-cover` que el fondo: las dos capas
                salen del mismo lienzo (5120×3520), así que compartiendo
                geometría quedan calzadas en cualquier viewport. La capa trae
                el canal alfa: transparente hasta el ~60%, lomas abajo. */}
            <div ref={frontRef} aria-hidden="true" className={cx(FRONT_BOX, "-z-10")}>
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

            {/* ---------- Copy: tarjeta oscura arriba a la izquierda ----------
                El paisaje llega limpio hasta el borde inferior; el contraste
                del texto lo da la tarjeta, no un velo sobre la foto. */}
            <div className="relative flex min-h-screen flex-col px-6 pt-28 sm:px-10 lg:px-20 lg:pt-[19%]">
                <div className="mx-auto w-full max-w-[1280px]">
                    <div className="relative w-full max-w-[300px]">
                        {/* Cuadradito que asoma arriba a la derecha (61:6741). */}
                        <div
                            aria-hidden="true"
                            className="absolute top-0 right-0 size-5"
                            style={{ background: CARD_BG }}
                        />
                        <div
                            className="mt-4 mr-4 flex flex-col gap-3 p-6"
                            style={{ background: CARD_BG }}
                        >
                            <h1 className={cx(type.h3, "text-[var(--neutral-50)]")}>
                                Comunicación &amp; Marketing
                            </h1>
                            <p className={cx(type.body, "text-[var(--neutral-300)]")}>
                                Más estratégico que una agencia, más cercano que un freelance
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * El logotipo de marca en vidrio, apoyado sobre la línea de montañas.
 *
 * Es el SVG real (`Logotipo`, recortado al contorno de las letras), no la
 * tipografía: los glifos del logo están dibujados a mano y no coinciden con
 * Funnel Display. Se tiñe con `currentColor`, así el vidrio es un blanco
 * translúcido y no hace falta una segunda exportación.
 *
 * Medidas del diseño (frame 1280): ancho 723.7 = 56.5%, borde izquierdo en
 * 430.1 = 33.6%. En mobile se agranda y se centra, que si no queda perdido.
 *
 * Sin sombra proyectada a propósito: la que había se despegaba de las letras
 * al hacer scroll y se leía como una mancha suelta debajo del logo.
 */
function GlassWordmark() {
    return (
        <Logotipo
            tight
            className="absolute top-[58%] left-1/2 w-[74%] -translate-x-1/2 sm:top-[54%] sm:left-[33.6%] sm:w-[56.5%] sm:translate-x-0"
            style={{ color: "rgba(255,255,255,0.46)" }}
        />
    );
}

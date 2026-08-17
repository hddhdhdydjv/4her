"use client";

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

    return (
        <section id="inicio" className="relative isolate min-h-screen overflow-hidden">
            {/* ---------- Plano de fondo: cielo y montañas (Shape 3) ---------- */}
            <div
                ref={backRef}
                aria-hidden="true"
                className="absolute inset-x-0 -top-[12%] -z-30 h-[124%] will-change-transform"
                style={{ background: SCENE_FALLBACK }}
            >
                <img
                    src={LAYER_BACK}
                    alt=""
                    className="size-full object-cover"
                    // El fallback tiene que seguir viéndose si el PNG no está.
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            </div>

            {/* ---------- Plano medio: logotipo en vidrio (Logo) ----------
                Centro en 61.8% del ancho y 44.8% del alto del frame original.
                El ancho tipográfico (~56% del viewport) sale de los 723px que
                mide el logo sobre los 1280 del diseño. */}
            <div
                ref={logoRef}
                className="absolute inset-x-0 top-[42%] -z-20 flex justify-center will-change-transform"
            >
                <GlassWordmark />
            </div>

            {/* ---------- Primer plano: lomas verdes (Shape 1) ----------
                Arranca al 51.41% del frame y se ancla abajo, que es donde el
                recorte tiene sentido cuando cambia el alto de la ventana. */}
            <div
                ref={frontRef}
                aria-hidden="true"
                className="absolute inset-x-0 top-[46%] -bottom-[10%] -z-10 will-change-transform"
            >
                <img
                    src={LAYER_FRONT}
                    alt=""
                    className="size-full object-cover object-top"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
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
 * "4her" en vidrio esmerilado.
 *
 * Dos capas apiladas sobre el mismo glifo:
 *   1. `backdrop-filter` — difumina y aclara el paisaje que queda detrás.
 *   2. el texto en blanco translúcido — el cuerpo lechoso del vidrio.
 *
 * El `background-clip: text` recorta el desenfoque a la forma de las letras en
 * los motores que lo soportan; donde no, queda igual el blanco translúcido y
 * la pieza sigue leyéndose como en el diseño.
 */
function GlassWordmark() {
    return (
        <span
            className="font-display leading-[0.82] font-medium tracking-[-0.03em] select-none"
            style={{
                fontSize: "clamp(4rem, 26vw, 19rem)",
                color: "rgba(255,255,255,0.44)",
                WebkitBackdropFilter: "blur(10px) saturate(1.25) brightness(1.08)",
                backdropFilter: "blur(10px) saturate(1.25) brightness(1.08)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow:
                    "0 1px 1px rgba(255,255,255,0.30), 0 -1px 1px rgba(0,0,0,0.06), 0 24px 60px rgba(20,14,30,0.18)",
            }}
        >
            4her
        </span>
    );
}

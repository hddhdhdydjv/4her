import { Valor1, Valor2, Valor3, Valor4 } from "@/components/graphics/illustrations";
import { Screen, gutter, type, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Values` (2020:6172) — 1440×1269, la sección más alta del frame: pasa
 * el viewport y se scrollea.
 *
 *   Intro — Valores (2020:6173)  x=80  y=120  1280×205, titular a 800
 *   Valores         (2020:6178)  x=80  y=405  1280×800
 *
 * La grilla es 2×2 de cards de 624×384 con 32 de gap. Cada card lleva el
 * texto arriba (título H3 26 + descripción Body/Large 18, con 32 de padding)
 * y la imagen de 240×234 centrada, arrancando en y=198 — o sea 38.46% de
 * ancho y 60.94% de alto, al 51.56% desde el borde superior.
 */
const values = [
    {
        title: "Estrategia antes que estética",
        body: "Pensamos qué decir y por qué, no solo cómo se ve.",
        gradient: "linear-gradient(160deg, #fde3b0 8%, #f9a94f 52%, #f7c98a 110%)",
        // valor-4: elementos sueltos que se filtran a formas ordenadas.
        image: Valor4,
    },
    {
        title: "Un equipo con varias cabezas",
        body: "Varias miradas trabajando tu marca, no una sola persona para todo.",
        gradient: "linear-gradient(160deg, #fdf189 8%, #75fcec 55%, #89a0fd 110%)",
        // valor-3: cuatro ojos mirando hacia un mismo centro.
        image: Valor3,
    },
    {
        title: "Medimos si comunica",
        body: "Nos importa el impacto real, no solo los likes.",
        gradient: "linear-gradient(160deg, #bfdcfc 8%, #75fcc0 55%, #a7f39a 110%)",
        // valor-2: señal -> engranajes -> barras de medición.
        image: Valor2,
    },
    {
        title: "Te acompañamos",
        body: "Seguimos después de entregar. No desaparecemos.",
        gradient: "linear-gradient(160deg, #75fcec 8%, #7de3a8 55%, #cdf5a0 110%)",
        // valor-1: vías, andén y señal — el recorrido sigue.
        image: Valor1,
    },
];

/** Grano sutil, para acercarse a la textura de las imágenes del diseño. */
const GRAIN =
    "radial-gradient(rgba(255,255,255,0.55) 0.7px, transparent 0.7px), radial-gradient(rgba(0,0,0,0.06) 0.7px, transparent 0.7px)";

export function Values() {
    return (
        <Screen
            id="valores"
            inset={cx(gutter, "pt-[clamp(72px,13.33vh,147px)] pb-[clamp(40px,7.11vh,78px)]")}
        >
            {/* Intro cierra en y=325 y la grilla abre en y=405: 80 de separación. */}
            <div className="flex flex-1 flex-col gap-12 lg:gap-20">
                {/* Headline (gap 16) + 32 + Subheadline = los 205 del intro. */}
                <div className="flex max-w-[800px] flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <Reveal delay={0}>
                            <p className={cx(type.title, tone.secondary)}>Nuestros valores</p>
                        </Reveal>
                        <SplitReveal delay={120} className={cx(type.h1, tone.primary, "text-balance")}>
                            Los valores no se anuncian, se demuestran
                        </SplitReveal>
                    </div>
                    <Reveal delay={260}>
                        <p className={cx(type.h2, tone.tertiary)}>Y se ven en cómo trabajamos.</p>
                    </Reveal>
                </div>

                <ul className="grid gap-8 sm:grid-cols-2">
                    {values.map((v, i) => (
                        <li key={v.title} className="flex">
                            <Reveal delay={120 + i * 110} y={22} className="flex w-full">
                                {/* `h-full` + el `items-stretch` que trae la grilla
                                    por defecto: las cuatro cards miden lo mismo
                                    aunque los títulos ocupen distinta cantidad
                                    de líneas. */}
                                <article
                                    className={cx(
                                        "flex h-full w-full flex-col items-center gap-8 rounded-2xl",
                                        "bg-[var(--bg-secondary)] p-8 text-center",
                                    )}
                                >
                                    {/* La ilustración va arriba y manda el alto;
                                        el texto se apoya abajo con `mt-auto`. */}
                                    <div className="relative aspect-square w-[58%] max-w-[240px] overflow-hidden rounded-xl">
                                        {v.image ? (
                                            // Inlineada en el DOM, no <img src>: trae un
                                            // filtro de trazo (feTurbulence) que como
                                            // imagen externa rasteriza al tamaño nativo
                                            // del archivo y sale pixelado al escalar.
                                            <v.image className="absolute inset-0 h-full w-full object-contain" />
                                        ) : (
                                            <>
                                                <div className="absolute inset-0" style={{ background: v.gradient }} />
                                                <div
                                                    aria-hidden="true"
                                                    className="absolute inset-0 opacity-70"
                                                    style={{
                                                        backgroundImage: GRAIN,
                                                        backgroundSize: "3px 3px, 4px 4px",
                                                        backgroundPosition: "0 0, 1px 2px",
                                                    }}
                                                />
                                            </>
                                        )}
                                    </div>

                                    <div className="mt-auto flex flex-col gap-2">
                                        <h3 className={cx(type.h3, tone.primary, "text-balance")}>{v.title}</h3>
                                        <p className={cx(type.bodyLg, tone.secondary, "text-balance")}>{v.body}</p>
                                    </div>
                                </article>
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </div>
        </Screen>
    );
}

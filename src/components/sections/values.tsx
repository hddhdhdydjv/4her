import { Screen, gutter, type, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
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
        image: undefined as string | undefined,
    },
    {
        title: "Un equipo con varias cabezas",
        body: "Varias miradas trabajando tu marca, no una sola persona para todo.",
        gradient: "linear-gradient(160deg, #fdf189 8%, #75fcec 55%, #89a0fd 110%)",
        image: undefined,
    },
    {
        title: "Medimos si comunica",
        body: "Nos importa el impacto real, no solo los likes.",
        gradient: "linear-gradient(160deg, #bfdcfc 8%, #75fcc0 55%, #a7f39a 110%)",
        image: undefined,
    },
    {
        title: "Te acompañamos",
        body: "Seguimos después de entregar. No desaparecemos.",
        gradient: "linear-gradient(160deg, #75fcec 8%, #7de3a8 55%, #cdf5a0 110%)",
        image: undefined,
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
                <Reveal delay={0} className="flex max-w-[800px] flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <p className={cx(type.title, tone.secondary)}>Nuestros valores</p>
                        <h2 className={cx(type.h1, tone.primary, "text-balance")}>
                            Los valores no se anuncian, se demuestran
                        </h2>
                    </div>
                    <p className={cx(type.h2, tone.tertiary)}>Y se ven en cómo trabajamos.</p>
                </Reveal>

                <ul className="grid gap-8 sm:grid-cols-2">
                    {values.map((v, i) => (
                        <li key={v.title}>
                            <Reveal delay={120 + i * 110} y={22}>
                                <article className="relative overflow-hidden rounded-2xl bg-[var(--bg-secondary)] pb-[60%] sm:aspect-[624/384] sm:pb-0">
                                    <div className="flex flex-col gap-2 p-8">
                                        <h3 className={cx(type.h3, tone.primary)}>{v.title}</h3>
                                        <p className={cx(type.bodyLg, tone.secondary)}>{v.body}</p>
                                    </div>

                                    <div className="absolute top-[51.56%] left-1/2 h-[60.94%] w-[38.46%] -translate-x-1/2 overflow-hidden rounded-xl">
                                        {v.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={v.image}
                                                alt=""
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />
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
                                </article>
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </div>
        </Screen>
    );
}

import { Screen, screenType, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Intro — Valores` (78:8288) + `Feature cards 1` (40:3805), en una sola
 * pantalla: la card ya no puede llevar la foto de 384px asomando por el
 * borde (no entra en un viewport junto a las otras tres) — pasa a una franja
 * de imagen dentro de la card, en una fila de 4.
 *
 * Las texturas del diseño son imágenes; hasta tenerlas exportadas van los
 * mismos degradados en CSS. Para reemplazarlas alcanza con pasar `image`.
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
        <Screen id="valores" className="justify-center">
            {/* `my-auto` centra el bloque en la pantalla; `items-start` mantiene
                texto y cards alineados entre sí por el top. */}
            <div className="flex flex-col gap-8 lg:my-auto lg:flex-row lg:items-start lg:gap-14">
                <Reveal delay={0} variant="side" x={-28} className="flex flex-col gap-3 lg:flex-1">
                    <p className={cx(screenType.title, tone.secondary)}>Nuestros valores</p>
                    <h2 className={cx(screenType.h1, tone.primary, "text-balance")}>
                        Los valores no se anuncian, se demuestran
                    </h2>
                </Reveal>

                {/* `auto-rows-fr` + `h-full` en toda la cadena: las 4 cards miden
                    exactamente lo mismo, aunque el texto de cada una varíe. */}
                <ul className="grid auto-rows-fr grid-cols-2 gap-3 sm:gap-5 lg:flex-1 lg:gap-5">
                    {values.map((v, i) => (
                        <li key={v.title} className="h-full">
                            <Reveal delay={160 + i * 110} y={22} className="h-full">
                                <article className="flex h-full flex-col gap-3 rounded-2xl bg-[var(--bg-secondary)] p-4 sm:gap-4 sm:p-5">
                                    <div className="relative h-[80px] w-full overflow-hidden rounded-xl sm:h-[110px]">
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
                                    <div className="flex flex-col gap-1.5">
                                        <h3 className={cx(screenType.h3, tone.primary)}>{v.title}</h3>
                                        <p className={cx(screenType.body, tone.secondary)}>{v.body}</p>
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

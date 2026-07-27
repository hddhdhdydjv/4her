import { Section, SectionIntro, type, tone } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Figma `Intro — Valores` (78:8288) + `Feature cards 1` (40:3805).
 * Card: 384px de alto, rounded-16, bg/secondary; la imagen (240×234,
 * rounded-32, borde de 8px) asoma por el borde inferior (-48px).
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
        <>
            <SectionIntro
                id="valores"
                eyebrow="Nuestros valores"
                size="displaySm"
                title="Los valores no se anuncian, se demuestran"
                subtitle="Y se ven en cómo trabajamos."
                subtitleTone="secondary"
                pad="pt-20 pb-8 lg:pt-30 lg:pb-16"
            />

            <Section pad="pb-20 lg:pb-30">
                <ul className="grid gap-8 sm:grid-cols-2">
                    {values.map((v, i) => (
                        <li key={v.title}>
                            <Reveal delay={i * 80}>
                                {/* La imagen asoma por abajo: la card recorta el sobrante. */}
                                <article className="relative h-[384px] overflow-hidden rounded-2xl bg-[var(--bg-secondary)]">
                                    <div className="flex flex-col gap-2 p-8">
                                        <h3 className={cx(type.h3, tone.primary)}>{v.title}</h3>
                                        <p className={cx(type.bodyLg, tone.primary)}>{v.body}</p>
                                    </div>

                                    <div className="absolute bottom-[-48px] left-1/2 h-[234px] w-[240px] -translate-x-1/2 overflow-hidden rounded-[32px] border-8 border-[var(--border-default)] shadow-[0_0_4.4px_rgba(0,0,0,0.06),0_5px_19px_rgba(0,0,0,0.08)]">
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
            </Section>
        </>
    );
}

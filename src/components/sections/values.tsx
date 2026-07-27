import { Section, SectionIntro, type } from "@/components/ui/section";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

const values = [
    {
        title: "Estrategia antes que estética",
        body: "Pensamos qué decir y por qué, no solo cómo se ve.",
        image: undefined as string | undefined, // "/images/valor-estrategia.jpg"
    },
    {
        title: "Un equipo con varias cabezas",
        body: "Varias miradas trabajando tu marca, no una sola persona para todo.",
        image: undefined,
    },
    {
        title: "Medimos si comunica",
        body: "Nos importa el impacto real, no solo los likes.",
        image: undefined,
    },
    {
        title: "Te acompañamos",
        body: "Seguimos después de entregar. No desaparecemos.",
        image: undefined,
    },
];

export function Values() {
    return (
        <>
            <SectionIntro
                id="valores"
                eyebrow="Nuestros valores"
                title="Los valores no se anuncian, se demuestran"
                subtitle="Y se ven en cómo trabajamos."
            />

            <Section tight>
                <ul className="grid gap-8 sm:grid-cols-2">
                    {values.map((v, i) => (
                        <li key={v.title}>
                            <Reveal delay={i * 80}>
                                {/* La media asoma por el borde inferior: la card recorta el sobrante. */}
                                <article className="relative h-[384px] overflow-hidden rounded-2xl bg-secondary">
                                    <div className="flex flex-col gap-2 p-8">
                                        <h3 className={cx(type.h3, "text-primary")}>{v.title}</h3>
                                        <p className={cx(type.bodyLg, "text-primary")}>{v.body}</p>
                                    </div>

                                    <div className="absolute bottom-[-48px] left-1/2 h-[234px] w-[240px] -translate-x-1/2 rounded-[32px] border-8 border-[var(--border-default)] shadow-[0_0_4.4px_rgba(0,0,0,0.06),0_5px_19px_rgba(0,0,0,0.08)]">
                                        <Media
                                            className="h-full w-full"
                                            rounded="rounded-[24px]"
                                            label=""
                                            src={v.image}
                                            alt={v.title}
                                        />
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

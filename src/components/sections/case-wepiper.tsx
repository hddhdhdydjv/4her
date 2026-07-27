import { Section, type } from "@/components/ui/section";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Caso destacado: WePiper.
 * La pieza visual es una composición propia (logo + mockup + cards de perfil).
 * Mientras no esté exportada, el slot mantiene su geometría (1152×648).
 */
export function CaseWePiper() {
    return (
        <Section id="caso-wepiper">
            <Reveal>
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                        <h3 className={cx(type.h2, "text-balance text-primary")}>
                            De la idea a una marca que se entiende
                        </h3>
                        <p className={cx(type.bodyLg, "text-secondary")}>Así construimos WePiper.</p>
                    </div>

                    <Media
                        className="aspect-[1152/648] w-full"
                        rounded="rounded-2xl"
                        label="Caso WePiper"
                    />
                </div>
            </Reveal>
        </Section>
    );
}

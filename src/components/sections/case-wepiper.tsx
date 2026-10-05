import { GrowIn } from "@/components/motion/grow-in";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Screen, gutter, type, tone } from "@/components/ui/section";
import { Visual } from "@/components/ui/visual";
import { cx } from "@/utils/cx";

/**
 * Caso WePiper: titular y, debajo, la composición del caso en una tarjeta
 * clara a todo el ancho del contenido. La tarjeta crece apenas al entrar.
 */
export function CaseWePiper() {
    return (
        <Screen
            id="caso-wepiper"
            inset={cx(gutter, "pt-[clamp(72px,13.33vh,147px)] pb-[clamp(40px,7.11vh,78px)]")}
        >
            <div className="flex max-w-[800px] flex-col gap-3 pb-10 lg:pb-12">
                <SplitReveal delay={0} className={cx(type.h1, tone.primary, "text-balance")}>
                    De la idea a una marca que se entiende
                </SplitReveal>
                <Reveal delay={140} variant="side" x={-28}>
                    <p className={cx(type.lead, tone.tertiary)}>Así construimos WePiper</p>
                </Reveal>
            </div>

            {/* Misma proporción en todos los anchos: es una composición armada,
                recortarla en mobile se comería el teléfono o los perfiles. */}
            <GrowIn className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#E7E7E5]">
                <Visual
                    name="/images/wepiper/wepiper"
                    alt="Caso WePiper: app y perfiles"
                    sizes="(min-width: 1360px) 1280px, 100vw"
                    spec="2560 × 1440 · WebP o JPG"
                    placeholderClassName="bg-[#E7E7E5]"
                />
            </GrowIn>
        </Screen>
    );
}

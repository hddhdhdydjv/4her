import { GrowIn } from "@/components/motion/grow-in";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Screen, gutter, type, tone } from "@/components/ui/section";
import { Visual, resolvePublic } from "@/components/ui/visual";
import { cx } from "@/utils/cx";

const DESKTOP = "/images/wepiper/wepiper";
const MOBILE = "/images/wepiper/wepiper-mobile";

/**
 * Caso WePiper: titular y, debajo, la composición del caso en una tarjeta
 * clara a todo el ancho del contenido. La tarjeta crece apenas al entrar.
 *
 * La composición se arma dos veces: horizontal (16:9) desde `sm` y vertical
 * (4:5) en celular. Una sola horizontal en un celular mide ~340×190 y el
 * teléfono y los perfiles quedan diminutos; recortarla se comería justo
 * eso. Si la vertical no está subida, el celular usa la horizontal entera.
 *
 * Este archivo es del servidor a propósito: resuelve qué versiones existen.
 */
export function CaseWePiper() {
    const hasDesktop = Boolean(resolvePublic(DESKTOP));
    const hasMobile = Boolean(resolvePublic(MOBILE));
    // Sin ninguna subida, el celular muestra el placeholder de la vertical,
    // que es lo que hay que subir.
    const mobileName = hasMobile || !hasDesktop ? MOBILE : DESKTOP;
    const mobilePortrait = mobileName === MOBILE;

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

            <GrowIn
                className={cx(
                    "relative w-full overflow-hidden rounded-2xl bg-[#E7E7E5] sm:aspect-[16/9]",
                    mobilePortrait ? "aspect-[4/5]" : "aspect-[16/9]",
                )}
            >
                <div className="absolute inset-0 sm:hidden">
                    <Visual
                        name={mobileName}
                        alt="Caso WePiper: app y perfiles"
                        sizes="100vw"
                        spec={mobilePortrait ? "1200 × 1500 · WebP o JPG" : "2560 × 1440 · WebP o JPG"}
                        placeholderClassName="bg-[#E7E7E5]"
                    />
                </div>
                <div className="absolute inset-0 hidden sm:block">
                    <Visual
                        name={DESKTOP}
                        alt="Caso WePiper: app y perfiles"
                        sizes="(min-width: 1360px) 1280px, 100vw"
                        spec="2560 × 1440 · WebP o JPG"
                        placeholderClassName="bg-[#E7E7E5]"
                    />
                </div>
            </GrowIn>
        </Screen>
    );
}

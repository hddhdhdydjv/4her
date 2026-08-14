"use client";

import { useCallback, useEffect, useRef } from "react";
import { type } from "@/components/ui/section";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

/**
 * Caso WePiper — v2 bento.
 * Columna izquierda sticky oscura con titular + columna derecha marrón oscuro
 * (#251817) con el mockup de WePiper (o el placeholder animado).
 *
 * En mobile: apilado vertical.
 */
const WEPIPER_BG = "#251817";
const IMAGE_SRC: string | undefined = undefined; // "/images/wepiper.jpg"

export function CaseWePiper() {
    const { ref, inView } = useInViewOnce<HTMLDivElement>(0.4);
    const boxRef = useRef<HTMLDivElement>(null);

    const setRefs = useCallback(
        (el: HTMLDivElement | null) => {
            ref.current = el;
            boxRef.current = el;
        },
        [ref],
    );

    useEffect(() => {
        if (!inView) return;
        const el = boxRef.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        import("animejs").then(({ animate }) => {
            animate(el, { scale: [0.93, 1], duration: 1100, ease: "outExpo" });
        });
    }, [inView]);

    return (
        <section
            id="caso-wepiper"
            className={cx(
                "flex flex-col",
                "lg:flex-row lg:h-screen lg:min-h-[700px]",
            )}
        >
            {/* ── Left: sticky dark — titular ── */}
            <div
                className={cx(
                    "flex flex-col justify-end gap-6 p-10 sm:p-12 lg:p-16",
                    "bg-[var(--neutral-950)]",
                    "min-h-[55vw] sm:min-h-0 py-16",
                    "lg:sticky lg:top-0 lg:h-screen lg:w-[44%] lg:shrink-0 lg:min-h-0",
                )}
            >
                <Reveal delay={0}>
                    <p className={cx(type.label, "uppercase tracking-[0.12em] text-[var(--neutral-500)]")}>
                        Caso de estudio
                    </p>
                </Reveal>
                <SplitReveal
                    delay={100}
                    className="font-display font-medium leading-[1.0] tracking-[-0.035em] text-[var(--neutral-50)]"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                    De la idea a una marca que se entiende
                </SplitReveal>
                <Reveal delay={280} variant="side" x={-20}>
                    <p className={cx(type.bodyLg, "text-[var(--neutral-500)]")}>
                        Así construimos WePiper.
                    </p>
                </Reveal>
            </div>

            {/* ── Right: dark brown — mockup / placeholder ── */}
            <div
                className="flex flex-1 items-center justify-center p-10 sm:p-12 lg:p-16 min-h-[70vw] lg:min-h-0"
                style={{ background: WEPIPER_BG }}
            >
                <div
                    ref={setRefs}
                    style={{ transform: "scale(0.93)" }}
                    className="w-full max-w-[640px] aspect-[4/3] overflow-hidden rounded-2xl relative"
                >
                    {IMAGE_SRC ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={IMAGE_SRC}
                            alt="Caso WePiper — identidad, sistema visual y producto"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <div
                            className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
                            style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                            <span className="block overflow-hidden pb-2">
                                <span
                                    className={cx(
                                        "block font-display text-[clamp(2rem,5vw,4rem)] leading-none font-medium tracking-[-0.03em]",
                                        "text-[#c8a899]",
                                        "transition-transform delay-[480ms] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                        inView ? "translate-y-0" : "translate-y-full",
                                    )}
                                >
                                    WePiper
                                </span>
                            </span>
                            <span className="block overflow-hidden">
                                <span
                                    className={cx(
                                        type.body,
                                        "block text-[#7a5f56]",
                                        "transition-transform delay-[620ms] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                                        inView ? "translate-y-0" : "translate-y-full",
                                    )}
                                >
                                    Identidad, sistema visual y producto
                                </span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

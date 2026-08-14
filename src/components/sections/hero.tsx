"use client";

import { Logo } from "@/components/ui/logo";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { type } from "@/components/ui/section";
import { cx } from "@/utils/cx";

/**
 * Hero v2 — Figma frame 2190:1882.
 * Bento 2×2 que ocupa exactamente el viewport.
 *
 *  ┌──────────────┬──────────────┐
 *  │  TL  cream   │  TR  dark    │
 *  │  Logo + label│  Tagline     │
 *  ├──────────────┼──────────────┤
 *  │  BL  dark    │  BR  purple  │
 *  │  Headline h1 │  Mauve│Cream │
 *  └──────────────┴──────────────┘
 *
 * Mobile: apilado en una sola columna (TL → BL → BR; TR oculto).
 */
export function Hero() {
    const scrollTo = useAnchorScroll();

    return (
        <section
            id="inicio"
            className={cx(
                // Mobile: columna única
                "flex flex-col min-h-screen",
                // Tablet +: bento 2 × 2
                "sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:h-screen sm:min-h-0",
            )}
        >
            {/* ── TL — cream: logo + label ── */}
            <div className="flex flex-col justify-between gap-8 p-8 sm:p-10 lg:p-14 bg-[var(--neutral-50)]">
                <Logo />
                <p className={cx(type.label, "uppercase tracking-[0.12em] text-[var(--neutral-400)]")}>
                    Comunicación &amp; Marketing
                </p>
            </div>

            {/* ── TR — dark: tagline decorativa (oculta en mobile) ── */}
            <div className="hidden sm:flex flex-col justify-end p-10 lg:p-14 bg-[var(--neutral-950)]">
                <p
                    aria-hidden="true"
                    className="font-display font-medium leading-[1.05] tracking-[-0.03em] text-[var(--neutral-400)]"
                    style={{ fontSize: "clamp(1.125rem, 2.5vw, 2rem)" }}
                >
                    Estrategia antes<br />que estética
                </p>
            </div>

            {/* ── BL — dark: titular principal ── */}
            <div className="flex flex-1 flex-col justify-end gap-2 p-8 sm:p-10 lg:p-14 bg-[var(--neutral-900)] sm:flex-none">
                <h1
                    className="font-display font-medium leading-[0.95] tracking-[-0.04em] text-[var(--neutral-50)]"
                    style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.75rem)" }}
                >
                    Comuni&shy;cación
                    <br />&amp; Marketing
                </h1>

                {/* Subtexto y CTA solo visibles en mobile (en desktop van en BR) */}
                <p className={cx(type.body, "sm:hidden mt-4 text-[var(--neutral-400)] max-w-[34ch]")}>
                    Más estratégico que una agencia,
                    <br />más cercano que un freelance.
                </p>
                <a
                    href="#contacto"
                    onClick={scrollTo}
                    className={cx(
                        type.body,
                        "sm:hidden self-start mt-5 rounded-full bg-[var(--neutral-50)] px-5 py-2.5",
                        "text-[var(--neutral-900)] transition-opacity hover:opacity-80",
                    )}
                >
                    Hablemos
                </a>
            </div>

            {/* ── BR — purple outer: dos sub-paneles (oculto en mobile) ── */}
            <div className="hidden sm:flex bg-[var(--accent-purple)]">
                {/* Sub-panel izquierdo: mauve con CTA */}
                <div
                    className="flex flex-1 flex-col justify-end gap-5 p-10 lg:p-14"
                    style={{ background: "var(--accent-default)" }}
                >
                    <p className={cx(type.bodyLg, "text-[var(--neutral-800)] max-w-[22ch]")}>
                        Más estratégico que una agencia,
                        <br />más cercano que un freelance.
                    </p>
                    <a
                        href="#contacto"
                        onClick={scrollTo}
                        className={cx(
                            type.body,
                            "self-start rounded-full bg-[var(--neutral-950)] px-4 py-2",
                            "text-[var(--neutral-50)] transition-opacity hover:opacity-80",
                        )}
                    >
                        Hablemos
                    </a>
                </div>

                {/* Sub-panel derecho: cream, visible solo en desktop */}
                <div className="hidden lg:flex flex-1 flex-col justify-end p-14 bg-[var(--neutral-100)]">
                    <p className={cx(type.body, "text-[var(--neutral-500)] max-w-[18ch]")}>
                        Marca, contenido
                        <br />y estrategia
                        <br />en un mismo equipo.
                    </p>
                </div>
            </div>
        </section>
    );
}

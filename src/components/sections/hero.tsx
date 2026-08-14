"use client";

import { Logo } from "@/components/ui/logo";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { type } from "@/components/ui/section";
import { cx } from "@/utils/cx";

/**
 * Hero v2 — editorial bento.
 *
 * Mobile (flex-col):
 *   1. Panel oscuro: Logo tiny + "4her" ENORME + service label
 *   2. Franja CTA: mauve izq (botón) | cream der (descriptor)
 *
 * Desktop (sm+, grid 2×2 con placement explícito):
 *   ┌──[col1,row1] TL cream──┬──[col2,row1] TR dark ·dots·──┐
 *   │  Logo + label          │  tagline decorativa           │
 *   ├──[col1,row2] BL dark───┼──[col2,row2] BR purple────────┤
 *   │  "4her" grande         │  mauve CTA  │  cream desc     │
 *   │  + service copy        │             │                 │
 *   └────────────────────────┴─────────────┴─────────────────┘
 */

const DOT_GRID = {
    backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.09) 1.5px, transparent 1.5px)",
    backgroundSize: "28px 28px",
    backgroundPosition: "14px 14px",
} as const;

export function Hero() {
    const scrollTo = useAnchorScroll();

    return (
        <section
            id="inicio"
            className={cx(
                "flex flex-col min-h-screen",
                "sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:h-screen sm:min-h-0",
            )}
        >
            {/* ── TL — cream (desktop only, col 1 row 1) ── */}
            <div
                className="hidden sm:flex flex-col justify-between p-10 lg:p-14 bg-[var(--neutral-50)] sm:col-start-1 sm:row-start-1"
            >
                <Logo />
                <p className={cx(type.label, "uppercase tracking-[0.14em] text-[var(--neutral-400)]")}>
                    Comunicación &amp; Marketing
                </p>
            </div>

            {/* ── TR — dark · dots (desktop only, col 2 row 1) ── */}
            <div
                className="hidden sm:flex flex-col justify-end p-10 lg:p-14 bg-[var(--neutral-950)] sm:col-start-2 sm:row-start-1"
                style={DOT_GRID}
            >
                <p
                    aria-hidden="true"
                    className="font-display font-medium leading-[1.05] tracking-[-0.03em] text-[var(--neutral-400)]"
                    style={{ fontSize: "clamp(1.125rem, 2.5vw, 2rem)" }}
                >
                    Estrategia antes<br />que estética
                </p>
            </div>

            {/* ── BL / MAIN — dark · dots (mobile: panel 1; desktop: col 1 row 2) ── */}
            <div
                className={cx(
                    "relative flex flex-col justify-between overflow-hidden bg-[var(--neutral-950)]",
                    // Mobile: crece para cubrir la mayor parte de la pantalla
                    "flex-1 p-7 pb-10",
                    // Desktop: quadrante inferior izquierdo
                    "sm:flex-none sm:p-10 lg:p-14 sm:col-start-1 sm:row-start-2",
                )}
                style={DOT_GRID}
            >
                {/* Logo solo en mobile */}
                <div className="mb-auto sm:hidden">
                    <Logo dark />
                </div>

                {/* Marca editorial: llena ~85 % del ancho en mobile */}
                <h1
                    className="font-display font-medium leading-[0.88] tracking-[-0.055em] text-[var(--neutral-50)]"
                    style={{ fontSize: "clamp(5rem, 37vw, 22rem)" }}
                >
                    4her
                </h1>

                {/* Service label */}
                <p
                    className="mt-3 font-display font-medium leading-[1.1] tracking-[-0.02em] text-[var(--neutral-500)]"
                    style={{ fontSize: "clamp(1rem, 2.8vw, 1.75rem)" }}
                >
                    Comunicación<br />&amp; Marketing
                </p>

                {/* Velo inferior para separar el texto del fondo con puntos */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:hidden"
                    style={{
                        background: "linear-gradient(to top, var(--neutral-950) 0%, transparent 100%)",
                    }}
                />
            </div>

            {/* ── Mobile CTA — franja mauve + cream (mobile only) ── */}
            <div className="flex sm:hidden bg-[var(--accent-purple)]">
                {/* Mauve: botón */}
                <div
                    className="flex flex-1 flex-col justify-center gap-4 p-7"
                    style={{ background: "var(--accent-default)" }}
                >
                    <a
                        href="#contacto"
                        onClick={scrollTo}
                        className={cx(
                            type.body,
                            "self-start rounded-full bg-[var(--neutral-950)] px-4 py-2.5",
                            "text-[var(--neutral-50)] transition-opacity hover:opacity-80",
                        )}
                    >
                        Hablemos
                    </a>
                    <p className={cx(type.label, "text-[var(--neutral-700)] leading-[1.5]")}>
                        Más estratégico que una agencia,
                        más cercano que un freelance.
                    </p>
                </div>

                {/* Cream: descriptor */}
                <div className="flex flex-1 flex-col justify-center p-7 bg-[var(--neutral-100)]">
                    <p className={cx(type.label, "text-[var(--neutral-500)] leading-[1.7]")}>
                        Marca,
                        <br />contenido
                        <br />y estrategia
                        <br />en un equipo.
                    </p>
                </div>
            </div>

            {/* ── BR — purple outer · mauve + cream (desktop only, col 2 row 2) ── */}
            <div className="hidden sm:flex bg-[var(--accent-purple)] sm:col-start-2 sm:row-start-2">
                {/* Mauve: CTA */}
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

                {/* Cream: descriptor (solo en pantallas grandes) */}
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

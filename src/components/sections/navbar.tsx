"use client";

import { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/ui/logo";
import { type } from "@/components/ui/section";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import { cx } from "@/utils/cx";

/**
 * Navbar v2 — píldora dark siempre visible.
 * Sobre el bento hero la píldora flota en dark desde el primer momento;
 * el blur + borde la separa visualmente de cualquier panel (claro u oscuro).
 */
const links = [
    { label: "Quiénes somos", href: "#quienes-somos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Valores", href: "#valores" },
    { label: "Proceso", href: "#proceso" },
];

const allMobileLinks = [
    ...links,
    { label: "Hablemos", href: "#contacto" },
];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const lenis = useLenisInstance();
    const scrollTo = useAnchorScroll();
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Congela / reanuda Lenis con el overlay mobile abierto.
    useEffect(() => {
        if (!lenis) return;
        if (open) lenis.stop();
        else lenis.start();
    }, [open, lenis]);

    // Animación de cortina en los links mobile.
    useEffect(() => {
        const els = linkRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
        if (!els.length) return;

        if (open) {
            import("animejs").then(({ animate, stagger, set }) => {
                set(els, { clipPath: "inset(0 0% 0 100%)", filter: "blur(10px)", opacity: 0 });
                animate(els, {
                    clipPath: "inset(0 0% 0 0%)",
                    filter: "blur(0px)",
                    opacity: 1,
                    duration: 600,
                    delay: stagger(70, { start: 100 }),
                    ease: "outExpo",
                });
            });
        } else {
            import("animejs").then(({ animate, stagger }) => {
                animate([...els].reverse(), {
                    clipPath: "inset(0 0% 0 100%)",
                    filter: "blur(10px)",
                    opacity: 0,
                    duration: 320,
                    delay: stagger(40),
                    ease: "inExpo",
                });
            });
        }
    }, [open]);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:py-6">
                <div className="mx-auto w-full max-w-[640px]">
                    {/* Píldora dark con blur permanente */}
                    <div
                        className={cx(
                            "flex items-center justify-between rounded-[48px]",
                            "border border-[var(--neutral-700)]",
                            "py-2 pr-2 pl-4 backdrop-blur-[35px]",
                            "bg-[var(--neutral-950)]/90",
                        )}
                    >
                        <Logo dark />

                        {/* Desktop nav */}
                        <nav className="hidden items-center gap-6 lg:flex">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={scrollTo}
                                    className={cx(
                                        type.body,
                                        "text-center text-[var(--neutral-300)] transition-colors hover:text-[var(--neutral-50)]",
                                    )}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contacto"
                                onClick={scrollTo}
                                className={cx(
                                    type.body,
                                    "rounded-[31px] bg-[var(--neutral-50)] px-3 py-2 text-center text-[var(--neutral-950)] transition-opacity hover:opacity-85",
                                )}
                            >
                                Hablemos
                            </a>
                        </nav>

                        {/* Mobile: CTA + hamburger */}
                        <nav className="flex items-center lg:hidden">
                            <a
                                href="#contacto"
                                onClick={scrollTo}
                                className={cx(
                                    type.body,
                                    "rounded-[31px] bg-[var(--neutral-50)] px-3 py-2 text-center text-[var(--neutral-950)] transition-opacity hover:opacity-85",
                                )}
                            >
                                Hablemos
                            </a>
                            <button
                                type="button"
                                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                                aria-expanded={open}
                                onClick={() => setOpen((v) => !v)}
                                className="flex size-10 shrink-0 items-center justify-center rounded-full text-[var(--neutral-50)]"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path
                                        d={open ? "M6 6l12 12M6 18L18 6" : "M4 8h16M4 16h16"}
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        className="transition-all duration-300 ease-out"
                                    />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Overlay mobile — dark, z-40 para que la píldora (z-50) quede encima */}
            <div
                aria-hidden={!open}
                className={cx(
                    "fixed inset-0 z-40 flex flex-col px-6 pb-10 pt-6 lg:hidden",
                    "bg-[var(--neutral-950)]",
                    "transition-opacity duration-300 ease-out",
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                )}
            >
                <nav className="mt-20 flex flex-col gap-1">
                    {allMobileLinks.map((link, i) => {
                        const isCTA = i === allMobileLinks.length - 1;
                        return (
                            <a
                                key={link.href}
                                ref={(el) => { linkRefs.current[i] = el; }}
                                href={link.href}
                                onClick={(e) => {
                                    setOpen(false);
                                    scrollTo(e);
                                }}
                                style={{ clipPath: "inset(0 0% 0 100%)", opacity: 0, filter: "blur(10px)" }}
                                className={cx(
                                    isCTA
                                        ? cx(
                                              type.body,
                                              "mt-4 self-start rounded-[31px] bg-[var(--neutral-50)] px-5 py-3 text-[var(--neutral-950)]",
                                          )
                                        : cx(
                                              "font-display text-[clamp(1.75rem,5vw,2.5rem)] font-medium leading-snug tracking-[-0.02em]",
                                              "rounded-[18px] px-2 py-3 text-[var(--neutral-50)]",
                                          ),
                                )}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}

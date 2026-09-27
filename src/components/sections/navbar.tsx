"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Logo } from "@/components/ui/logo";
import { type } from "@/components/ui/section";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import { cx } from "@/utils/cx";

/**
 * Barra clara a todo el ancho, con hairline abajo: lockup a la izquierda,
 * navegación al centro y el CTA a la derecha.
 *
 * Los links son los del sitio, no los del archivo de diseño — ahí todavía
 * están los del template en inglés (Our Approach, Care Team, Pricing).
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
    const [scrolled, setScrolled] = useState(false);
    const lenis = useLenisInstance();
    const scrollTo = useAnchorScroll();
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Point 1: track scroll offset via Lenis so the state stays in sync with
    // the smooth-scroll interpolation (not window.scroll which fires ahead).
    useEffect(() => {
        if (!lenis) return;
        const onScroll = ({ scroll }: { scroll: number }) => {
            setScrolled(scroll > 10);
        };
        lenis.on("scroll", onScroll);
        return () => { lenis.off("scroll", onScroll); };
    }, [lenis]);

    // Point 2: freeze Lenis while the mobile overlay is visible so the page
    // doesn't scroll behind it; resume the moment the overlay closes.
    useEffect(() => {
        if (!lenis) return;
        if (open) lenis.stop();
        else lenis.start();
    }, [open, lenis]);

    // Point 2: animate mobile links with clip-path curtain + blur + opacity.
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
            <header
                className={cx(
                    "fixed inset-x-0 top-0 z-50 border-b",
                    "bg-[var(--bg-primary)]/90 backdrop-blur-[20px]",
                    "transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                    scrolled ? "border-[var(--border-default)]" : "border-transparent",
                )}
            >
                {/* Tres columnas en vez de space-between: así la navegación
                    queda centrada en la página y no entre los dos extremos,
                    que miden distinto. */}
                <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-3 sm:px-10 lg:px-20">
                    <Logo />

                    <nav className="hidden items-center justify-self-center gap-8 lg:flex">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={scrollTo}
                                className={cx(
                                    type.body,
                                    "text-center text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]",
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center justify-self-end gap-1 lg:gap-0">
                        <a
                            href="#contacto"
                            onClick={scrollTo}
                            className={cx(
                                type.body,
                                "group flex items-center gap-2.5 rounded-full bg-[var(--bg-inverse)] py-2 pr-2 pl-5",
                                "text-[var(--text-inverse)] transition-opacity hover:opacity-85",
                            )}
                        >
                            Hablemos
                            <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
                                <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </span>
                        </a>

                        <button
                            type="button"
                            aria-label={open ? "Cerrar menú" : "Abrir menú"}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="flex size-10 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] lg:hidden"
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
                    </div>
                </div>
            </header>

            {/* Mobile full-screen overlay — z-40 so the pill (z-50) stays on top */}
            <div
                aria-hidden={!open}
                className={cx(
                    "fixed inset-0 z-40 flex flex-col px-6 pb-10 pt-6 lg:hidden",
                    "bg-[var(--bg-primary)]",
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
                                        ? cx(type.body, "mt-4 self-start rounded-[31px] bg-[var(--bg-inverse)] px-5 py-3 text-[var(--text-inverse)]")
                                        : cx(
                                              "font-display text-[clamp(1.75rem,5vw,2.5rem)] font-medium leading-snug tracking-[-0.02em]",
                                              "rounded-[18px] px-2 py-3 text-[var(--text-primary)]",
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

"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { type } from "@/components/ui/section";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { cx } from "@/utils/cx";

/** Figma `Header 1` (40:3870) — pill centrada de 640px, py-24. */
const links = [
    { label: "Quiénes somos", href: "#quienes-somos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Valores", href: "#valores" },
    { label: "Proceso", href: "#proceso" },
];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const scrollTo = useAnchorScroll();

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:py-6">
            <div className="mx-auto w-full max-w-[640px]">
                {/* Menu (40:3871) */}
                <div className="flex items-center justify-between rounded-[48px] border border-[var(--border-strong)] bg-[var(--bg-primary)]/80 py-2 pr-2 pl-4 backdrop-blur-[35px]">
                    <Logo />

                    {/* Buttons (40:3875) */}
                    <nav className="hidden items-center gap-6 lg:flex">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={scrollTo}
                                className={cx(
                                    type.body,
                                    "text-center text-[var(--text-primary)] transition-opacity hover:opacity-60",
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
                                "rounded-[31px] bg-[var(--bg-inverse)] px-3 py-2 text-center text-[var(--text-inverse)] transition-opacity hover:opacity-85",
                            )}
                        >
                            Hablemos
                        </a>
                    </nav>

                    {/* Mobile/tablet: "Hablemos" queda visible en la pill cerrada (Header 2, 82:11761) */}
                    <nav className="flex items-center lg:hidden">
                        <a
                            href="#contacto"
                            onClick={scrollTo}
                            className={cx(
                                type.body,
                                "rounded-[31px] bg-[var(--bg-inverse)] px-3 py-2 text-center text-[var(--text-inverse)] transition-opacity hover:opacity-85",
                            )}
                        >
                            Hablemos
                        </a>
                        <button
                            type="button"
                            aria-label={open ? "Cerrar menú" : "Abrir menú"}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="flex size-10 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)]"
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

                {/* Menú desplegable (solo mobile/tablet): easing suave, sin corte de max-height */}
                <div
                    className={cx(
                        "overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
                        "grid",
                        open ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]",
                    )}
                >
                    <div
                        className={cx(
                            "min-h-0 transition-[opacity,transform] duration-[400ms] ease-out",
                            open ? "translate-y-0 opacity-100 delay-100" : "-translate-y-1 opacity-0",
                        )}
                    >
                    <div className="flex flex-col gap-1 rounded-[24px] border border-[var(--border-strong)] bg-[var(--bg-primary)]/95 p-2 backdrop-blur-[35px]">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => {
                                    setOpen(false);
                                    scrollTo(e);
                                }}
                                className={cx(type.body, "rounded-[18px] px-4 py-3 text-[var(--text-primary)]")}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contacto"
                            onClick={(e) => {
                                setOpen(false);
                                scrollTo(e);
                            }}
                            className={cx(
                                type.body,
                                "rounded-[31px] bg-[var(--bg-inverse)] px-4 py-3 text-center text-[var(--text-inverse)]",
                            )}
                        >
                            Hablemos
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

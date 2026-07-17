"use client";

import { useState } from "react";
import Link from "next/link";
import { cx } from "@/utils/cx";

const links = [
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "4HIS", href: "#marca-hermana" },
];

/** Nav pill compacta (ancho al contenido), con círculo para el logo. */
export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
            <nav className="pointer-events-auto">
                <div className="flex items-center gap-5 rounded-full border border-[var(--color-border-primary)] bg-[var(--brand-cream)]/90 py-1.5 pr-1.5 pl-2 shadow-[0_8px_30px_rgba(20,21,18,0.10)] backdrop-blur-md">
                    <Link href="#inicio" className="flex items-center gap-2.5">
                        {/* Círculo del logo (placeholder hasta tener el isotipo real) */}
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-ink)] font-display text-[13px] font-bold text-[var(--brand-sage)]">
                            4
                        </span>
                        <span className="font-display text-base font-medium tracking-tight text-primary">
                            4HER
                        </span>
                    </Link>

                    <div className="hidden items-center gap-5 md:flex">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="font-mono text-[11px] tracking-wide text-secondary uppercase transition-colors hover:text-primary"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <a
                        href="#contacto"
                        className="hidden h-9 items-center rounded-full bg-[var(--brand-ink)] px-4 text-sm font-medium text-[var(--brand-cream)] transition-colors hover:bg-[#33322c] sm:flex"
                    >
                        Hablemos
                    </a>

                    <button
                        type="button"
                        aria-label="Abrir menú"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-primary md:hidden"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Menú mobile */}
                <div className={cx("overflow-hidden transition-all md:hidden", open ? "mt-2 max-h-96" : "max-h-0")}>
                    <div className="flex flex-col gap-1 rounded-3xl border border-[var(--color-border-primary)] bg-[var(--brand-cream)]/95 p-3 backdrop-blur-md">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="rounded-2xl px-4 py-3 font-mono text-xs tracking-wide text-secondary uppercase hover:bg-[var(--brand-surface)]"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contacto"
                            onClick={() => setOpen(false)}
                            className="flex h-11 items-center justify-center rounded-full bg-[var(--brand-ink)] text-sm font-medium text-[var(--brand-cream)]"
                        >
                            Hablemos
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cx } from "@/utils/cx";

const links = [
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "4HIS", href: "#marca-hermana" },
];

/** Nav flotante tipo pill, fija en pantalla (siempre visible). */
export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
            <nav className="pointer-events-auto w-full max-w-3xl">
                <div className="flex items-center justify-between gap-2 rounded-full border border-[var(--color-border-primary)] bg-[var(--brand-cream)]/90 px-2 py-2 pl-5 shadow-[0_8px_30px_rgba(20,21,18,0.08)] backdrop-blur-md">
                    <Link
                        href="#inicio"
                        className="font-display text-lg font-semibold tracking-tight text-primary"
                    >
                        4HER
                    </Link>

                    <div className="hidden items-center gap-6 md:flex">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="font-mono text-xs tracking-wide text-secondary uppercase transition-colors hover:text-primary"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-1">
                        <Button href="#contacto" size="sm" className="hidden sm:inline-flex">
                            Hablemos
                        </Button>
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
                </div>

                {/* Menú mobile */}
                <div
                    className={cx(
                        "overflow-hidden transition-all md:hidden",
                        open ? "mt-2 max-h-96" : "max-h-0",
                    )}
                >
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
                        <Button href="#contacto" size="md" className="mt-1 w-full" >
                            Hablemos
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

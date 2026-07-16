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

export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]/85 backdrop-blur-md">
            <nav className="mx-auto flex h-18 max-w-container items-center justify-between px-6 py-4">
                <Link href="#inicio" className="font-display text-2xl font-semibold tracking-tight text-primary">
                    4HER
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-secondary transition-colors hover:text-primary"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Button href="#contacto" size="md">
                        Hablemos
                    </Button>
                </div>

                <button
                    type="button"
                    aria-label="Abrir menú"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-primary md:hidden"
                >
                    <span className="sr-only">Menú</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                            d={open ? "M6 6l12 12M6 18L18 6" : "M3 6h18M3 12h18M3 18h18"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </nav>

            <div
                className={cx(
                    "overflow-hidden border-t border-[var(--color-border-secondary)] md:hidden",
                    open ? "max-h-80" : "max-h-0 border-t-0",
                )}
            >
                <div className="mx-auto flex max-w-container flex-col gap-1 px-6 py-4">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-2 py-3 text-base font-medium text-secondary hover:bg-[var(--color-bg-secondary)]"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Button href="#contacto" size="lg" className="mt-2 w-full">
                        Hablemos
                    </Button>
                </div>
            </div>
        </header>
    );
}

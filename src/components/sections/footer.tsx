"use client";

import { Logo } from "@/components/ui/logo";
import { type } from "@/components/ui/section";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { cx } from "@/utils/cx";

/**
 * Figma `Footer 1` (40:3854) — logo + nav | redes, sin línea divisoria arriba.
 *
 * No trae fondo propio: va apoyado dentro de la sección de contacto, sobre la
 * foto. Por eso todo el color es blanco con opacidad en vez de los tokens de
 * texto, que están calibrados para la crema de la página.
 */
const links = [
    { label: "Quiénes somos", href: "#quienes-somos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Valores", href: "#valores" },
    { label: "Proceso", href: "#proceso" },
    { label: "Contacto", href: "#contacto" },
];

const socials = [
    {
        label: "Instagram",
        href: "#",
        icon: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
            </>
        ),
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <>
                <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
                <path
                    fill="var(--accent-default)"
                    d="M6.9 9.4h2.4v8.1H6.9zM8.1 5.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zM11.2 9.4h2.3v1.1h.03c.32-.6 1.1-1.24 2.27-1.24 2.43 0 2.88 1.6 2.88 3.68v4.56h-2.4v-4.04c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.05-1.55 2.13v4.11h-2.4z"
                />
            </>
        ),
    },
    {
        label: "X",
        href: "#",
        icon: (
            <path
                fill="currentColor"
                d="M17.2 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L3.9 21H.7l7.5-8.6L.4 3h6.6l4.5 5.6zM16 19.1h1.8L7.9 4.8H6z"
            />
        ),
    },
];

export function Footer() {
    const scrollTo = useAnchorScroll();

    return (
        <footer className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* Text (40:3855) */}
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
                    <Logo dark />
                    <nav className="flex flex-wrap gap-x-8 gap-y-2">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={scrollTo}
                                className={cx(
                                    type.body,
                                    "text-white/70 transition-colors hover:text-white",
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Social links (40:3863) */}
                <nav className="flex items-center gap-6">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            aria-label={s.label}
                            className="text-white/80 transition-opacity hover:opacity-100"
                        >
                            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                                {s.icon}
                            </svg>
                        </a>
                    ))}
                </nav>
        </footer>
    );
}

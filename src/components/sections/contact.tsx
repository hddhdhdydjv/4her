"use client";

import { Logo } from "@/components/ui/logo";
import { Input, Label, Textarea } from "@/components/ui/field";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { type } from "@/components/ui/section";
import { cx } from "@/utils/cx";

/**
 * Contacto — v2 (con footer integrado).
 * Layout de dos columnas sobre fondo oscuro:
 *  - Derecha: formulario de contacto
 *  - Izquierda: logo + nav + redes + copyright
 *
 * El Footer separado queda vacío en v2.
 */
const navLinks = [
    { label: "Quiénes somos", href: "#quienes-somos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Valores", href: "#valores" },
    { label: "Proceso", href: "#proceso" },
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
                    fill="#0e0e0e"
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

export function Contact() {
    const scrollTo = useAnchorScroll();

    return (
        <section
            id="contacto"
            className="flex flex-col bg-[var(--neutral-950)]"
        >
            {/* ── Cabecera de contacto ── */}
            <div
                className={cx(
                    "flex flex-col lg:flex-row",
                    "border-b border-[var(--neutral-800)]",
                )}
            >
                {/* Left: copy */}
                <div className="flex flex-col justify-end gap-5 p-10 sm:p-12 lg:p-16 lg:pt-24 lg:w-[46%] lg:shrink-0">
                    <Reveal delay={0}>
                        <p className={cx(type.label, "uppercase tracking-[0.12em] text-[var(--neutral-500)]")}>
                            Contacto
                        </p>
                    </Reveal>
                    <SplitReveal
                        delay={100}
                        className="font-display font-medium leading-[1.0] tracking-[-0.035em] text-[var(--neutral-50)]"
                        style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
                    >
                        Contanos qué querés lograr
                    </SplitReveal>
                    <Reveal delay={280}>
                        <p className={cx(type.bodyLg, "text-[var(--neutral-500)] max-w-[44ch]")}>
                            Escribinos y arrancamos por una conversación, sin compromiso.
                        </p>
                    </Reveal>
                </div>

                {/* Right: formulario */}
                <Reveal
                    delay={200}
                    variant="scale"
                    as="form"
                    className={cx(
                        "flex flex-col gap-5 p-10 sm:p-12 lg:p-16 lg:pt-24 flex-1",
                        "border-t border-[var(--neutral-800)] lg:border-t-0 lg:border-l",
                    )}
                >
                    <div>
                        <Label htmlFor="name" className="text-[var(--neutral-400)]">Nombre</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Tu nombre"
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-[var(--neutral-400)]">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="tu@email.com"
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <Label htmlFor="message" className="text-[var(--neutral-400)]">Mensaje</Label>
                        <Textarea
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="Contanos qué tenés en mente"
                        />
                    </div>
                    <button
                        type="submit"
                        className={cx(
                            type.bodyLg,
                            "mt-1 w-full rounded-full bg-[var(--neutral-50)] px-4 py-3",
                            "text-center text-[var(--neutral-950)] transition-opacity hover:opacity-85",
                        )}
                    >
                        Enviar
                    </button>
                </Reveal>
            </div>

            {/* ── Footer integrado ── */}
            <div className="flex flex-col gap-8 p-10 sm:p-12 lg:px-16 lg:py-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
                    <Logo dark />
                    <nav className="flex flex-wrap gap-x-6 gap-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={scrollTo}
                                className={cx(
                                    type.body,
                                    "text-[var(--neutral-500)] transition-colors hover:text-[var(--neutral-200)]",
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <nav className="flex items-center gap-5">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            aria-label={s.label}
                            className="text-[var(--neutral-500)] transition-colors hover:text-[var(--neutral-200)]"
                        >
                            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                                {s.icon}
                            </svg>
                        </a>
                    ))}
                </nav>
            </div>
        </section>
    );
}

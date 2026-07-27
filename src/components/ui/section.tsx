import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Escala tipográfica — espejo de los text styles de Figma.
 * Los clamp() interpolan entre el valor mobile y el desktop del diseño
 * (ej. H1: 32px en mobile -> 44px en desktop).
 */
export const type = {
    h1: "font-display text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.06] font-medium tracking-[-0.015em]",
    h2: "font-display text-[clamp(1.5rem,2.8vw,2.125rem)] leading-[1.1] font-medium tracking-[-0.01em]",
    h3: "font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.18] font-semibold tracking-[-0.005em]",
    title: "font-display text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.3] font-semibold",
    bodyLg: "text-[1.125rem] leading-[1.6]",
    body: "text-base leading-[1.6]",
};

/** Sección con el padding del diseño (64px lateral / 120px vertical en desktop). */
export function Section({
    children,
    className,
    id,
    tight = false,
}: {
    children: ReactNode;
    className?: string;
    id?: string;
    /** Reduce el padding superior: para cuando sigue a un intro. */
    tight?: boolean;
}) {
    return (
        <section
            id={id}
            className={cx(
                "px-6 sm:px-10 lg:px-16",
                tight ? "pt-8 pb-20 lg:pt-16 lg:pb-30" : "py-20 lg:py-30",
                className,
            )}
        >
            <div className="mx-auto w-full max-w-[1152px]">{children}</div>
        </section>
    );
}

/** Encabezado de sección: eyebrow + titular + bajada corta. */
export function SectionIntro({
    eyebrow,
    title,
    subtitle,
    lead,
    id,
}: {
    eyebrow: string;
    title: ReactNode;
    /** Remate grande bajo el titular (estilo H2). */
    subtitle?: ReactNode;
    /** Párrafo de cuerpo bajo el titular (estilo Body/Large). */
    lead?: ReactNode;
    id?: string;
}) {
    return (
        <Section id={id} className="pb-0 lg:pb-0">
            <div className="flex flex-col gap-4">
                <p className={cx(type.title, "text-secondary")}>{eyebrow}</p>
                <h2 className={cx(type.h1, "text-balance text-primary")}>{title}</h2>
            </div>
            {subtitle && <p className={cx(type.h2, "mt-8 text-balance text-primary")}>{subtitle}</p>}
            {lead && <p className={cx(type.bodyLg, "mt-8 max-w-3xl text-secondary")}>{lead}</p>}
        </Section>
    );
}

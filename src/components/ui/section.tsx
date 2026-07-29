import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Rampa tipográfica — espejo 1:1 de los text styles de Figma.
 * El letterSpacing de Figma está en % del tamaño, por eso acá va en `em`.
 *
 *   Display/Large  Funnel Display Medium   72 / 1.00 / -2%
 *   Display/Small  Funnel Display Medium   56 / 1.04 / -2%
 *   Heading/H1     Funnel Display Medium   44 / 1.06 / -1.5%
 *   Heading/H2     Funnel Display Medium   34 / 1.10 / -1%
 *   Heading/H3     Funnel Display SemiBold 26 / 1.18 / -0.5%
 *   Title          Funnel Display SemiBold 20 / 1.30 /  0
 *   Body/Large     Funnel Sans Regular     18 / 1.60 /  0
 *   Body/Base      Funnel Sans Regular     16 / 1.60 /  0
 *   Label          Funnel Sans Medium      13 / 1.20 / +6%
 *
 * Los clamp() interpolan entre el valor mobile (frame de 375) y el desktop.
 */
export const type = {
    displayLg:
        "font-display font-medium text-[clamp(2.5rem,6.25vw,4.5rem)] leading-[1] tracking-[-0.02em]",
    displaySm:
        "font-display font-medium text-[clamp(2rem,4.86vw,3.5rem)] leading-[1.04] tracking-[-0.02em]",
    h1: "font-display font-medium text-[clamp(1.75rem,3.82vw,2.75rem)] leading-[1.06] tracking-[-0.015em]",
    h2: "font-display font-medium text-[clamp(1.5rem,2.95vw,2.125rem)] leading-[1.1] tracking-[-0.01em]",
    h3: "font-display font-semibold text-[clamp(1.25rem,2.26vw,1.625rem)] leading-[1.18] tracking-[-0.005em]",
    title: "font-display font-semibold text-[clamp(1.0625rem,1.74vw,1.25rem)] leading-[1.3]",
    bodyLg: "font-body text-[clamp(1rem,1.56vw,1.125rem)] leading-[1.6]",
    body: "font-body text-[1rem] leading-[1.6]",
    label: "font-body font-medium text-[0.8125rem] leading-[1.2] tracking-[0.06em]",
} as const;

/** Colores semánticos de Figma, como clases listas para usar. */
export const tone = {
    primary: "text-[var(--text-primary)]",
    secondary: "text-[var(--text-secondary)]",
    tertiary: "text-[var(--text-tertiary)]",
    inverse: "text-[var(--text-inverse)]",
} as const;

/**
 * Padding lateral del diseño: el frame Desktop (1440) abre el contenido en
 * x=80 con 1280 de ancho, así que son 80px por lado en desktop.
 */
export const gutter = "px-6 sm:px-10 lg:px-20";

/** Ancho de contenido del diseño: 1280px dentro del frame de 1440. */
export const contentWidth = "max-w-[1280px]";

/**
 * Ritmo vertical de una pantalla, medido sobre el frame `Hero` (1440×900):
 * el contenido arranca en y=144 y cierra en y=762, o sea 144 arriba / 138
 * abajo y una banda útil de 618px.
 *
 * Va en `vh` para que la proporción se mantenga en viewports que no midan
 * 900px (144/900 = 16vh, 138/900 = 15.33vh), con clamp para que no se
 * desarme ni en notebooks bajas ni en monitores altos.
 */
export const screenPadTop = "pt-[clamp(88px,16vh,176px)]";
export const screenPadBottom = "pb-[clamp(64px,15.33vh,168px)]";
export const screenPadY = cx(screenPadTop, screenPadBottom);

/**
 * Antes acá vivía `screenType`, una rampa encogida (~80% de `type`) que había
 * armado para pelear que el contenido entrara en un viewport. El frame
 * `Desktop` de Figma demuestra que no hacía falta: a 1440×900 la rampa real
 * entra, porque la disciplina está en el ritmo (banda de 618px + 1280 de
 * ancho), no en achicar la tipografía. Las secciones usan `type` directo.
 */

/**
 * Sección que engancha por scroll-snap y apunta a ocupar un viewport.
 * En desktop (`lg:`) es exacto: `h-screen` + `overflow-hidden`, tal cual
 * marca el ruler de "1 viewport" de Figma (solo anota el frame Desktop).
 * En mobile se acerca a lo mismo con `min-h-screen` (sin recortar): el
 * contenido en una sola columna suele pesar más, así que si no entra
 * entero se deja crecer un poco en vez de tapar texto.
 *
 * Para las 6 pantallas del flujo principal (Hero, Quiénes somos, Servicios,
 * WePiper, Valores, Proceso) — cada una debe entrar entera en desktop, sin
 * scroll interno. `pb` da un respiro abajo; el resto del alto lo reparte el
 * contenido según cómo lo organice cada sección (con `justify-center` si
 * quiere centrarse, o `flex-1` en un hijo si quiere ocupar el resto).
 */
export function Screen({
    children,
    id,
    className,
    inset = cx(gutter, screenPadY),
    content = cx("mx-auto flex w-full flex-1 flex-col", contentWidth),
}: {
    children: ReactNode;
    id?: string;
    className?: string;
    /**
     * Padding lateral e inferior. Se reemplaza entero (no se mergea) para las
     * secciones que van casi a sangre, como el caso WePiper.
     */
    inset?: string;
    /** Contenedor interno. Se reemplaza entero para soltar el tope de 1152px. */
    content?: string;
}) {
    return (
        <section
            id={id}
            className={cx(
                "relative flex min-h-screen snap-start snap-always flex-col lg:h-screen lg:overflow-hidden",
                inset,
                className,
            )}
        >
            <div className={content}>{children}</div>
        </section>
    );
}

/**
 * Sección con el ancho de contenido del diseño (1152px).
 * `pad` permite reproducir los paddings verticales exactos de cada frame
 * (120px arriba/abajo por defecto; 64px cuando encadena con un intro).
 */
export function Section({
    children,
    className,
    id,
    pad = "py-20 lg:py-30",
    as: Tag = "section",
}: {
    children: ReactNode;
    className?: string;
    id?: string;
    pad?: string;
    as?: "section" | "div" | "footer";
}) {
    return (
        <Tag id={id} className={cx(gutter, pad, className)}>
            <div className={cx("mx-auto w-full", contentWidth)}>{children}</div>
        </Tag>
    );
}

/**
 * Encabezado de sección tal cual Figma:
 *   Headline (gap 16): eyebrow `Title` en text/secondary + titular
 *   gap 32
 *   remate: un `Heading/H1` (Servicios, Valores) o un `Body/Large` (Quiénes somos)
 */
export function SectionIntro({
    id,
    eyebrow,
    title,
    size = "h1",
    subtitle,
    subtitleTone = "tertiary",
    lead,
    pad = "py-20 lg:py-30",
}: {
    id?: string;
    eyebrow: string;
    title: ReactNode;
    /** H1 (44) para Quiénes somos, Display/Small (56) para Servicios y Valores. */
    size?: "h1" | "displaySm";
    /** Remate grande bajo el titular. */
    subtitle?: ReactNode;
    subtitleTone?: "secondary" | "tertiary";
    /** Párrafo de cuerpo bajo el titular. */
    lead?: ReactNode;
    pad?: string;
}) {
    return (
        <Section id={id} pad={pad}>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <Reveal delay={0}>
                        <p className={cx(type.title, tone.secondary)}>{eyebrow}</p>
                    </Reveal>
                    <Reveal delay={120}>
                        <h2 className={cx(type[size], tone.primary, "text-balance")}>{title}</h2>
                    </Reveal>
                </div>

                {subtitle && (
                    <Reveal delay={260}>
                        <p className={cx(type.h1, tone[subtitleTone], "text-balance")}>{subtitle}</p>
                    </Reveal>
                )}
                {lead && (
                    <Reveal delay={subtitle ? 380 : 260}>
                        <p className={cx(type.bodyLg, tone.secondary)}>{lead}</p>
                    </Reveal>
                )}
            </div>
        </Section>
    );
}

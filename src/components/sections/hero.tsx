"use client";

import { DotRing } from "@/components/ui/dot-ring";
import { contentWidth, gutter, type, tone } from "@/components/ui/section";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { cx } from "@/utils/cx";

/**
 * Hero editorial: un aro gigante de puntos detrás del titular.
 *
 * La marca ya es un círculo dentro de un cuadrado, así que la página abre con
 * esa misma geometría a escala de pantalla: el aro sangra fuera del encuadre
 * y las hairlines del índice de abajo sostienen la retícula.
 *
 * El titular mezcla la grotesca de marca con Fraunces itálica en las dos
 * palabras que lo definen — el contraste es el que hace de "editorial".
 */
const services = [
    { n: "01", label: "Posicionamiento de marca" },
    { n: "02", label: "Marketing digital y campañas" },
    { n: "03", label: "Estrategia comercial" },
];

export function Hero() {
    const scrollTo = useAnchorScroll();

    return (
        <section id="inicio" className="relative flex min-h-screen flex-col overflow-hidden">
            {/* El aro se apoya a la derecha y se sale del encuadre por arriba y
                por el costado: lo que se ve es un recorte, no la figura entera. */}
            <DotRing
                className={cx(
                    "absolute -top-[22%] -right-[38%] h-[125vh] w-auto",
                    "sm:-right-[22%] lg:-top-[20%] lg:-right-[22%] lg:h-[150vh]",
                )}
            />

            <div
                className={cx(
                    "relative flex flex-1 flex-col justify-end",
                    gutter,
                    "pt-28 pb-5 lg:pt-32 lg:pb-6",
                )}
            >
                <div className={cx("mx-auto flex w-full flex-1 flex-col justify-center", contentWidth)}>
                    <h1
                        className={cx(
                            "font-display font-medium tracking-[-0.02em]",
                            "text-[clamp(2.25rem,5vw,4rem)] leading-[1.04]",
                            tone.primary,
                            "max-w-[17ch] text-balance",
                        )}
                    >
                        Ayudamos a decidir <span className={type.serif}>qué decir</span>,{" "}
                        <span className={type.serif}>a quién</span>, y cómo convertirlo en ventas.
                    </h1>

                    {/* Bloque de remate: etiqueta con hairline a la izquierda,
                        párrafo a la derecha — la estructura de un pie editorial. */}
                    <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:gap-16 lg:mt-12">
                        <div className="flex max-w-[18ch] flex-col gap-4 sm:w-[26%] sm:shrink-0">
                            <p className={cx(type.title, tone.primary, "text-balance")}>
                                Comunicación &amp; Marketing
                            </p>
                            <span className="h-px w-full bg-[var(--border-strong)]" />
                        </div>

                        <div className="flex flex-col items-start gap-8">
                            <p className={cx(type.bodyLg, tone.secondary, "max-w-[42ch]")}>
                                Definimos el mensaje, ejecutamos la pauta y ponemos objetivos
                                comerciales sobre la mesa. Más estratégico que una agencia, más
                                cercano que un freelance.
                            </p>

                            {/* Pill + círculo con la flecha, pegados. */}
                            <a
                                href="#contacto"
                                onClick={scrollTo}
                                className="group flex items-center gap-1.5 transition-opacity hover:opacity-85"
                            >
                                <span
                                    className={cx(
                                        type.body,
                                        "rounded-[45px] bg-[var(--bg-inverse)] px-6 py-3.5 text-[var(--text-inverse)]",
                                    )}
                                >
                                    Agendar llamada
                                </span>
                                <span className="flex size-[50px] items-center justify-center rounded-full bg-[var(--bg-inverse)] text-[var(--text-inverse)]">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M7 17 17 7M9 7h8v8"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Índice de servicios: la retícula del sitio, a pie de pantalla. */}
                <ul
                    className={cx(
                        // Fondo propio: el aro pasa por detrás y sin esto los
                        // números pierden contraste contra el desenfoque.
                        "mx-auto grid w-full shrink-0 grid-cols-1 bg-[var(--bg-primary)]",
                        "border-t border-[var(--border-default)] sm:grid-cols-3",
                        contentWidth,
                    )}
                >
                    {services.map((s, i) => (
                        <li
                            key={s.n}
                            className={cx(
                                "flex items-baseline gap-3 py-4 lg:py-5",
                                i > 0 && "border-t border-[var(--border-default)] sm:border-t-0 sm:border-l sm:pl-6",
                            )}
                        >
                            <span className={cx(type.label, tone.tertiary)}>{s.n}</span>
                            <p className={cx(type.body, tone.primary)}>{s.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

import { IsoCluster } from "@/components/graphics/iso";
import { type } from "@/components/ui/section";
import { cx } from "@/utils/cx";

/**
 * Figma `Hero` (61:6590) — 1280×880, bg neutral/200.
 *
 * La composición del titular está posicionada en absoluto tal cual el diseño:
 * los `left` son % del ancho de contenido (1152) y los `top` van en `em`,
 * de modo que todo escala junto con el tamaño de fuente.
 *
 * Las ilustraciones isométricas del diseño no se pueden exportar desde este
 * entorno; se reconstruyen en SVG (`IsoCluster`) con el mismo lenguaje.
 */

/** Icono 35×18 del bloque de label (61:6744). */
function SparkIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 35 18" className={className} fill="none" aria-hidden="true">
            <path
                d="M11 17h13M13.5 17a4 4 0 1 1 8 0M17.5 5V1M11.2 7.2 8.4 4.4M23.8 7.2l2.8-2.8M8 13H4M27 13h4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
        </svg>
    );
}

const HEADLINE = "font-display font-medium leading-none tracking-[-0.02em] text-[var(--text-primary)]";

export function Hero() {
    return (
        // Sin overflow-hidden: los cubos del borde inferior (más abajo) están
        // pensados para asomar más allá del hero, sobre la sección siguiente.
        <section id="inicio" className="relative min-h-screen bg-[var(--neutral-200)] lg:h-screen">
            {/* Mobile: la textura pasa del costado a una franja abajo (estilo Aptos, a pedido). */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[22%] bg-[var(--neutral-300)] sm:hidden" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[7%] bg-[var(--neutral-400)] sm:hidden" />
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 top-[calc(70%-70px)] opacity-[0.26] sm:hidden"
            >
                <IsoCluster className="h-full w-full" />
            </div>

            {/* Desktop/tablet: franjas que cortan el borde derecho (61:6591-2) */}
            <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[26.17%] bg-[var(--neutral-300)] sm:block" />
            <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[7.27%] bg-[var(--neutral-400)] sm:block" />

            {/* Imagen (61:6593): campo isométrico al 26% */}
            <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 left-[calc(25%+70px)] hidden opacity-[0.26] sm:block"
            >
                <IsoCluster className="h-full w-full" />
            </div>

            {/* Mismo ritmo que el resto: el titular arranca en y=144 y la tarjeta
                oscura cierra en y=762, o sea 138 desde abajo (frame 2020:5677).
                El padding va acá y el tope de 1280 en el div de adentro — si van
                juntos, border-box se come los 160px de gutter. */}
            <div className="relative flex min-h-screen flex-col px-6 pt-40 pb-24 sm:px-10 lg:h-full lg:min-h-0 lg:px-20 lg:pt-[clamp(88px,16vh,176px)] lg:pb-0">
              <div className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col">
                {/* ---------- Heading 1 (2020:5697) — composición exacta en desktop.
                    Los `left` son el centro de cada palabra sobre los 1280 del
                    frame; los `top` van en em del Display/Large de 72px. ---------- */}
                <div
                    className="relative hidden h-[4.0278em] w-full lg:block"
                    style={{ fontSize: "clamp(2.5rem, 5.625vw, 4.5rem)" }}
                >
                    <h1 className="contents">
                        <span className={cx(HEADLINE, "absolute top-0 left-[16.25%] -translate-x-1/2 whitespace-pre")}>
                            {"(  4her )"}
                        </span>
                        <span
                            className={cx(HEADLINE, "absolute top-[1.3333em] left-[36.563%] -translate-x-1/2 whitespace-nowrap")}
                        >
                            Comunicación
                        </span>
                        <span
                            className={cx(HEADLINE, "absolute top-[1.4583em] left-[60.469%] -translate-x-1/2 whitespace-nowrap")}
                        >
                            &
                        </span>
                        <span
                            className={cx(HEADLINE, "absolute top-[2.6667em] left-[25.859%] -translate-x-1/2 whitespace-nowrap")}
                        >
                            Marketing
                        </span>
                    </h1>
                </div>

                {/* ---------- Titular apilado (mobile / tablet) ---------- */}
                <h1
                    className={cx(HEADLINE, "flex flex-col lg:hidden")}
                    style={{ fontSize: "clamp(2.25rem, 9vw, 3.25rem)" }}
                >
                    <span className="whitespace-pre">{"(  4her )"}</span>
                    <span className="pl-[8%]">Comunicación &</span>
                    <span className="pl-[3%]">Marketing</span>
                </h1>

                {/* ---------- Cubos que asoman por el borde inferior ----------
                    z-10 para que se sigan viendo por encima del fondo opaco de
                    la sección siguiente (Quiénes somos), tal cual el frame de
                    Figma: los tres clusters miden más que los 900px del Hero. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden lg:block"
                >
                    <IsoCluster className="absolute right-[calc(8.33%+93px)] bottom-[-88px] h-[321px] w-[362px]" />
                    <IsoCluster className="absolute bottom-[-42px] left-[37.8%] h-[180px] w-[203px]" />
                    <IsoCluster className="absolute bottom-[-50px] left-[13.44%] h-[180px] w-[203px]" />
                </div>

                {/* ---------- Container (61:6736): tarjeta oscura ---------- */}
                {/* Articles (2020:5823): x=98 sobre los 1280, cierra en y=762. */}
                <div className="relative mt-12 w-full max-w-[390px] lg:absolute lg:bottom-[clamp(64px,15.33vh,168px)] lg:left-[7.656%] lg:mt-0 lg:h-[208px]">
                    {/* Cuadradito que asoma arriba a la derecha (61:6741) */}
                    <div aria-hidden="true" className="absolute top-0 right-0 size-6 bg-[var(--bg-inverse)]" />
                    <div className="mt-6 mr-6 flex flex-col gap-4 bg-[var(--bg-inverse)] p-6">
                        <p className={cx(type.h3, "text-[var(--text-inverse)]")}>Comunicación &amp; Marketing</p>
                        <p className={cx(type.body, "text-[var(--text-inverse)]")}>
                            Más estratégico que una agencia, más cercano que un freelance
                        </p>
                    </div>
                </div>

                {/* ---------- Container (61:6742): label con icono ---------- */}
                {/* Container (2020:5830): x=903 sobre los 1280, alto 94, arranca
                    en y=554 → cierra a 252 del piso de la sección. */}
                <div className="mt-8 flex w-full max-w-[279px] flex-col items-end gap-3 p-4 lg:absolute lg:bottom-[calc(clamp(64px,15.33vh,168px)+114px)] lg:left-[70.547%] lg:mt-0">
                    <SparkIcon className="h-[18px] w-[35px] text-[var(--accent-default)]" />
                    <p className={cx(type.label, "text-right text-[var(--accent-default)]")}>
                        Marca, contenido y estrategia en un mismo equipo.
                    </p>
                </div>
              </div>
            </div>
        </section>
    );
}

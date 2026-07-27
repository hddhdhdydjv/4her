import { cx } from "@/utils/cx";

/**
 * Figma `Image` de Feature 2 (74:7023) — 544×432.
 * Lienzo de diseño: grilla de puntos, letra vectorizada con handles de
 * selección + cursor, y la tira de tiles con degradado a la derecha
 * (x=343, 131×131, paso 147px).
 *
 * Las medidas van en `cqw` (container query) para que toda la composición
 * escale con el ancho del lienzo, igual que en el diseño.
 */

const TILES = [
    "linear-gradient(160deg, #bfdcfc 12.46%, #75fcfc 55.56%, #fdf189 120.58%)",
    "linear-gradient(160deg, #bfc8fc 12.46%, #9775fc 55.56%, #89a0fd 120.58%)",
    "linear-gradient(160deg, #fdf189 12.46%, #fcb26a 55.56%, #fcbff5 120.58%)",
    "linear-gradient(160deg, #fcbff5 27.92%, #75fcec 120.58%)",
];

const STROKE = "#6aa5f3";

/** Handle de selección: cuadradito blanco con borde azul. */
function Handle({ className }: { className: string }) {
    return (
        <span
            aria-hidden="true"
            className={cx("absolute block size-[9px] bg-white", className)}
            style={{ border: `1.27px solid ${STROKE}` }}
        />
    );
}

export function ServiceCanvas({ letter, offset = 0 }: { letter: string; offset?: number }) {
    return (
        <div
            className="relative aspect-[544/432] w-full overflow-hidden [container-type:inline-size]"
            style={{
                backgroundImage: "radial-gradient(var(--neutral-300) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                backgroundPosition: "12px 12px",
            }}
        >
            {/* Tira de tiles con degradado (74:7024-7): x 343/544, ancho 131/544 */}
            <div className="absolute inset-y-0 left-[63.05%] w-[24.08%]">
                {TILES.map((_, i) => (
                    <div
                        key={i}
                        className="absolute aspect-square w-full transition-[background] duration-700 ease-out"
                        style={{
                            background: TILES[(i + offset) % TILES.length],
                            top: `${((-23 + i * 147) / 432) * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Letra vectorizada + caja de selección (74:7028) */}
            <div className="absolute top-[23.61%] right-[56.53%] bottom-[27.26%] left-[12.87%]">
                <span aria-hidden="true" className="absolute inset-0 block" style={{ border: `1.27px solid ${STROKE}` }} />

                <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center font-display leading-none font-normal"
                    style={{ fontSize: "42cqw", color: "transparent", WebkitTextStroke: `1.6px ${STROKE}` }}
                >
                    {letter}
                </span>

                <Handle className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
                <Handle className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                <Handle className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
                <Handle className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />

                {/* Cursor (74:7038) */}
                <svg
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="absolute right-[-20px] bottom-[-24px] h-5 w-4"
                    fill="var(--text-primary)"
                >
                    <path d="M0 0 0 17.5 4.4 13.4 7.3 20 10.4 18.6 7.6 12.2 13.6 11.6Z" />
                </svg>
            </div>
        </div>
    );
}

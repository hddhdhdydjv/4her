/**
 * Gráficos op-art geométricos (estilo Aptos) — SVG puro, sin imágenes externas.
 * Cumplen el rol de las "imágenes" sin necesitar fotos ni logos inventados.
 */

type GraphicProps = {
    className?: string;
    /** Color de las franjas (default: negro de marca). */
    stripe?: string;
    /** Color de fondo. */
    bg?: string;
};

/** Franjas verticales tipo persiana. */
export function Stripes({ className, stripe = "#0e0e0c", bg = "transparent" }: GraphicProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
            aria-hidden="true"
            role="presentation"
        >
            <rect width="200" height="200" fill={bg} />
            {Array.from({ length: 10 }).map((_, i) => (
                <rect key={i} x={i * 20} y="0" width="10" height="200" fill={stripe} />
            ))}
        </svg>
    );
}

/** Chevrones / zigzag — franjas quebradas en V. */
export function Chevrons({ className, stripe = "#0e0e0c", bg = "#f2f0e8" }: GraphicProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            role="presentation"
        >
            <rect width="200" height="120" fill={bg} />
            {Array.from({ length: 14 }).map((_, i) => {
                const x = i * 16 - 40;
                return (
                    <path
                        key={i}
                        d={`M${x} 0 L${x + 8} 0 L${x + 8 + 60} 60 L${x + 8} 120 L${x} 120 L${x + 60} 60 Z`}
                        fill={i % 2 === 0 ? stripe : bg}
                    />
                );
            })}
        </svg>
    );
}

/** Círculos concéntricos finos (line-art, tipo esfera/target). */
export function Concentric({ className, stripe = "#0e0e0c" }: GraphicProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 200 200"
            aria-hidden="true"
            role="presentation"
            fill="none"
        >
            {Array.from({ length: 9 }).map((_, i) => (
                <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={10 + i * 11}
                    stroke={stripe}
                    strokeWidth="1"
                    opacity={0.5}
                />
            ))}
        </svg>
    );
}

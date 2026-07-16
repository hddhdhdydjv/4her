import { cx } from "@/utils/cx";

type Props = {
    className?: string;
    stroke?: string;
    /** Rotación lenta continua (CSS). */
    spin?: boolean;
};

/** Globo wireframe geodésico (líneas de latitud/longitud), estilo Aptos. */
export function Globe({ className, stroke = "currentColor", spin = false }: Props) {
    const R = 90;
    const cx0 = 100;
    const cy0 = 100;
    // Longitudes: elipses con rx variable.
    const longs = [0.28, 0.6, 0.85, 1].map((f) => f * R);
    // Latitudes: líneas horizontales (elipses achatadas) a distintas alturas.
    const lats = [-0.62, -0.32, 0, 0.32, 0.62];

    return (
        <svg
            viewBox="0 0 200 200"
            className={cx(spin && "[animation:spin_48s_linear_infinite]", className)}
            fill="none"
            aria-hidden="true"
            role="presentation"
        >
            <circle cx={cx0} cy={cy0} r={R} stroke={stroke} strokeWidth="1" opacity="0.9" />
            {longs.map((rx, i) => (
                <ellipse key={`lo${i}`} cx={cx0} cy={cy0} rx={rx} ry={R} stroke={stroke} strokeWidth="1" opacity="0.55" />
            ))}
            {lats.map((f, i) => {
                const y = cy0 + f * R;
                const rx = Math.sqrt(Math.max(0, 1 - f * f)) * R;
                return (
                    <ellipse key={`la${i}`} cx={cx0} cy={y} rx={rx} ry={rx * 0.12} stroke={stroke} strokeWidth="1" opacity="0.55" />
                );
            })}
        </svg>
    );
}

/** Red de nodos conectados. */
export function Network({ className, stroke = "currentColor", spin = false }: Props) {
    const nodes = [
        [100, 30],
        [40, 62],
        [160, 60],
        [70, 118],
        [132, 120],
        [100, 100],
        [30, 150],
        [170, 150],
        [100, 172],
    ] as const;
    const links: [number, number][] = [
        [0, 1],
        [0, 2],
        [0, 5],
        [1, 3],
        [1, 5],
        [2, 4],
        [2, 5],
        [3, 5],
        [3, 6],
        [4, 5],
        [4, 7],
        [5, 8],
        [6, 8],
        [7, 8],
    ];

    return (
        <svg
            viewBox="0 0 200 200"
            className={cx(spin && "[animation:spin_60s_linear_infinite]", className)}
            fill="none"
            aria-hidden="true"
            role="presentation"
        >
            {links.map(([a, b], i) => (
                <line
                    key={i}
                    x1={nodes[a][0]}
                    y1={nodes[a][1]}
                    x2={nodes[b][0]}
                    y2={nodes[b][1]}
                    stroke={stroke}
                    strokeWidth="1"
                    opacity="0.4"
                />
            ))}
            {nodes.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i === 5 ? 5 : 3.2} fill={stroke} opacity={i === 5 ? 1 : 0.85} />
            ))}
        </svg>
    );
}

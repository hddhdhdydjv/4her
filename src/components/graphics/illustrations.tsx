import { cx } from "@/utils/cx";

type Props = {
    className?: string;
    stroke?: string;
    /** Rotación lenta continua (CSS). */
    spin?: boolean;
    /** Se dibuja al aparecer (CSS stroke draw). */
    draw?: boolean;
};

/** Globo wireframe geodésico, trazo fino editorial. */
export function Globe({ className, stroke = "currentColor", spin = false, draw = false }: Props) {
    const R = 96;
    const c = 100;
    const longs = [0.22, 0.5, 0.78, 1].map((f) => f * R);
    const lats = [-0.72, -0.45, -0.18, 0.1, 0.38, 0.66];
    const line = draw ? "draw-line" : undefined;

    return (
        <svg
            viewBox="0 0 200 200"
            className={cx(spin && "[animation:spin_70s_linear_infinite]", className)}
            fill="none"
            aria-hidden="true"
            role="presentation"
        >
            <circle cx={c} cy={c} r={R} stroke={stroke} strokeWidth="0.7" pathLength={1} className={line} />
            {longs.map((rx, i) => (
                <ellipse
                    key={`lo${i}`}
                    cx={c}
                    cy={c}
                    rx={rx}
                    ry={R}
                    stroke={stroke}
                    strokeWidth="0.5"
                    opacity="0.6"
                    pathLength={1}
                    className={line}
                    style={draw ? { animationDelay: `${0.12 * i}s` } : undefined}
                />
            ))}
            {lats.map((f, i) => {
                const y = c + f * R;
                const rx = Math.sqrt(Math.max(0, 1 - f * f)) * R;
                return (
                    <ellipse
                        key={`la${i}`}
                        cx={c}
                        cy={y}
                        rx={rx}
                        ry={rx * 0.1}
                        stroke={stroke}
                        strokeWidth="0.5"
                        opacity="0.6"
                        pathLength={1}
                        className={line}
                        style={draw ? { animationDelay: `${0.4 + 0.09 * i}s` } : undefined}
                    />
                );
            })}
        </svg>
    );
}

/** Red de nodos con pulso escalonado. */
export function Network({ className, stroke = "currentColor", spin = false }: Props) {
    const nodes = [
        [100, 28],
        [38, 60],
        [162, 58],
        [68, 118],
        [134, 120],
        [100, 98],
        [28, 152],
        [172, 150],
        [100, 174],
    ] as const;
    const links: [number, number][] = [
        [0, 1], [0, 2], [0, 5], [1, 3], [1, 5], [2, 4], [2, 5],
        [3, 5], [3, 6], [4, 5], [4, 7], [5, 8], [6, 8], [7, 8],
    ];

    return (
        <svg
            viewBox="0 0 200 200"
            className={cx(spin && "[animation:spin_80s_linear_infinite]", className)}
            fill="none"
            aria-hidden="true"
            role="presentation"
        >
            {links.map(([a, b], i) => (
                <line
                    key={i}
                    x1={nodes[a][0]} y1={nodes[a][1]}
                    x2={nodes[b][0]} y2={nodes[b][1]}
                    stroke={stroke} strokeWidth="0.6" opacity="0.45"
                />
            ))}
            {nodes.map(([x, y], i) => (
                <circle
                    key={i}
                    cx={x} cy={y}
                    r={i === 5 ? 4.5 : 2.8}
                    fill={stroke}
                    className="node-pulse"
                    style={{ animationDelay: `${(i * 0.35) % 2.8}s` }}
                />
            ))}
        </svg>
    );
}

/** Esfera halftone: puntos que crecen hacia el centro (estilo LumaCore). */
export function DotSphere({ className, stroke = "currentColor", spin = false }: Props) {
    const R = 88;
    const c = 100;
    const rows = 13;
    const dots: Array<{ x: number; y: number; r: number }> = [];
    for (let i = 0; i < rows; i++) {
        const phi = (i / (rows - 1) - 0.5) * Math.PI; // -90..90
        const y = Math.round((c + Math.sin(phi) * R) * 100) / 100;
        const rowR = Math.cos(phi) * R;
        const cols = Math.max(1, Math.round((rowR / R) * 15));
        for (let j = 0; j < cols; j++) {
            const theta = (j / cols) * Math.PI * 2;
            const x = c + Math.cos(theta) * rowR;
            // Tamaño: más grande hacia el centro visual de la esfera.
            const depth = (Math.sin(theta) + 1) / 2;
            const centrality = 1 - Math.abs(Math.sin(phi));
            // Redondeo: evita mismatches de hidratacion por precision de floats.
            const round = (v: number) => Math.round(v * 100) / 100;
            dots.push({ x: round(x), y: round(y), r: round(0.7 + depth * centrality * 2.6) });
        }
    }
    return (
        <svg
            viewBox="0 0 200 200"
            className={cx(spin && "[animation:spin_90s_linear_infinite]", className)}
            fill="none"
            aria-hidden="true"
            role="presentation"
        >
            {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={stroke} />
            ))}
        </svg>
    );
}

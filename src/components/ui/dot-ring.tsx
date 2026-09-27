import { cx } from "@/utils/cx";

/**
 * Aro de puntos difuminados: el gesto que abre la página.
 *
 * Es el isotipo llevado a escala de pantalla — la marca ya es un círculo, así
 * que el hero abre con esa misma forma, recortada por los bordes. Medio aro va
 * sólido y el otro medio se descompone en puntos, que laten en onda mientras
 * el conjunto gira.
 *
 * El desenfoque va en dos capas: una copia muy borrosa hace de halo y la otra,
 * apenas velada, sostiene la forma. Una sola capa muy borrosa se lee como una
 * mancha; una sola nítida pierde el brillo.
 *
 * Todo el movimiento es CSS (ver `globals.css`): no hay bucle de JS detrás de
 * una pieza puramente decorativa, y `prefers-reduced-motion` lo apaga entero.
 */

const CENTER = 500;
const RADIUS = 380;

/** El arco sólido abarca 150° centrados abajo; los puntos, los 210° restantes. */
const ARC_DEG = 150;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_LENGTH = (ARC_DEG / 360) * CIRCUMFERENCE;

const DOTS = 24;
const DOT_FROM = ARC_DEG / 2; // 75° — donde termina el arco sólido.
const DOT_SPAN = 360 - ARC_DEG;

/** El punto late con un desfase proporcional a su lugar en el arco. */
const WAVE_S = 4.5;

function dotAt(i: number) {
    const deg = DOT_FROM + (DOT_SPAN * i) / (DOTS - 1);
    // En SVG el 0° cae a las 3 y crece en sentido horario: el arco sólido
    // arranca abajo y los puntos suben por la izquierda hasta cerrar.
    const rad = ((deg + 90) * Math.PI) / 180;
    // Redondeado a dos decimales a propósito: Node y el browser difieren en el
    // último dígito de cos/sin y React lo marca como error de hidratación.
    const round = (n: number) => Math.round(n * 100) / 100;
    return {
        cx: round(CENTER + RADIUS * Math.cos(rad)),
        cy: round(CENTER + RADIUS * Math.sin(rad)),
        delay: `${round(-(i / DOTS) * WAVE_S)}s`,
    };
}

const dots = Array.from({ length: DOTS }, (_, i) => dotAt(i));

function Ring({ opacity }: { opacity: number }) {
    return (
        <g className="ring-spin" opacity={opacity}>
            <circle
                className="ring-arc"
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth={44}
                strokeLinecap="round"
                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE - ARC_LENGTH}`}
                style={{ "--ring-arc": ARC_LENGTH } as React.CSSProperties}
                transform={`rotate(15 ${CENTER} ${CENTER})`}
            />
            {dots.map((d, i) => (
                <circle
                    key={i}
                    className="ring-dot"
                    cx={d.cx}
                    cy={d.cy}
                    r={22}
                    fill="currentColor"
                    style={{ animationDelay: d.delay }}
                />
            ))}
        </g>
    );
}

export function DotRing({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 1000 1000"
            aria-hidden="true"
            className={cx("ring-in pointer-events-none text-[var(--accent-default)]", className)}
        >
            {/* Halo: la misma figura, muy desenfocada y tenue. */}
            <g style={{ filter: "blur(30px)" }}>
                <Ring opacity={0.12} />
            </g>
            {/* Figura: apenas velada, es la que se lee. */}
            <g style={{ filter: "blur(3px)" }}>
                <Ring opacity={0.44} />
            </g>
        </svg>
    );
}

/**
 * Bloques isométricos — sustituto en código de las ilustraciones de Figma.
 *
 * Los SVG originales viven en Figma y no se pueden exportar desde este
 * entorno (el proxy bloquea figma.com). Estas piezas reproducen el mismo
 * lenguaje visual: cubos isométricos planos en la escala neutral.
 * Cuando existan los assets reales, se reemplazan por <img src="/images/...">.
 */

const COS30 = 0.8660254;

type CubeProps = {
    /** Vértice superior del cubo. */
    x: number;
    y: number;
    /** Lado del rombo superior. */
    s: number;
    /** Altura del cuerpo (por defecto = s, cubo). */
    d?: number;
};

function Cube({ x, y, s, d = s }: CubeProps) {
    const w = s * COS30;
    const h = s / 2;

    // Rombo superior: arriba, derecha, abajo, izquierda.
    const top = `${x},${y} ${x + w},${y + h} ${x},${y + s} ${x - w},${y + h}`;
    // Cara izquierda y derecha, extruidas hacia abajo.
    const left = `${x - w},${y + h} ${x},${y + s} ${x},${y + s + d} ${x - w},${y + h + d}`;
    const right = `${x},${y + s} ${x + w},${y + h} ${x + w},${y + h + d} ${x},${y + s + d}`;

    return (
        <g>
            <polygon points={top} fill="var(--neutral-200)" />
            <polygon points={left} fill="var(--neutral-300)" />
            <polygon points={right} fill="var(--neutral-100)" />
        </g>
    );
}

/**
 * Racimo de cubos: la composición que acompaña a "De la estrategia a la
 * ejecución" y que se repite, ampliada, de fondo en el hero.
 */
export function IsoCluster({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 544 432" className={className} aria-hidden="true" role="presentation">
            <Cube x={172} y={64} s={62} d={62} />
            <Cube x={108} y={128} s={104} d={104} />
            <Cube x={286} y={168} s={78} d={78} />
            <Cube x={210} y={214} s={96} d={96} />
            <Cube x={352} y={252} s={54} d={54} />
            <Cube x={62} y={332} s={30} d={30} />
        </svg>
    );
}

/** Cubo suelto — se usa dentro del círculo del logo. */
export function IsoMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 30" className={className} aria-hidden="true" role="presentation">
            <Cube x={12} y={3} s={12} d={12} />
        </svg>
    );
}

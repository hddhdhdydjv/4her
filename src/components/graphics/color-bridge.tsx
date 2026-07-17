/**
 * Puente de color entre bloques (estilo Atrium): una cuña diagonal grande
 * del color del bloque siguiente que entra antes del corte, para que el ojo
 * viaje de un color al otro en vez de chocar con una linea recta.
 */
export function ColorBridge({
    from,
    to,
    flip = false,
}: {
    /** Color del bloque saliente (fondo de la franja). */
    from: string;
    /** Color del bloque entrante (la cuña). */
    to: string;
    /** Invierte la direccion de la diagonal. */
    flip?: boolean;
}) {
    return (
        <div aria-hidden="true" className="relative h-[16vh] min-h-24" style={{ background: from }}>
            <div
                className="absolute inset-0"
                style={{
                    background: to,
                    clipPath: flip
                        ? "polygon(0 0, 100% 100%, 0 100%)"
                        : "polygon(100% 0, 100% 100%, 0 100%)",
                }}
            />
        </div>
    );
}

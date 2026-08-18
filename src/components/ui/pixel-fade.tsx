"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cx } from "@/utils/cx";

/**
 * Remate en píxeles entre dos secciones.
 *
 * No es un degradado: son píxeles sueltos, todos del mismo tamaño, que
 * aparecen salteados y se van juntando hasta tapar del todo. El degradé lo
 * hace la CANTIDAD de píxeles encendidos, no su tamaño — es como se disuelve
 * una textura contra el fondo en pixel art.
 *
 * La franja es corta a propósito: es el remate del borde entre dos secciones,
 * no una capa que se come una parte de lo que hay arriba.
 */

/** Lado del píxel. */
const CELL = 5;

/** Filas salteadas. El alto de la franja es SCATTER×CELL. */
const SCATTER = 16;

/**
 * Celdas por baldosa.
 *
 * El patrón se repite cada TILE celdas; con pocas, el ojo engancha la
 * repetición y el salpicado se lee como una secuencia. Con 48 el ciclo mide
 * 240px y cada fila arranca de una semilla distinta, así que no hay dos
 * iguales alineadas en vertical.
 */
const TILE = 48;

/**
 * Generador pseudoaleatorio con semilla (mulberry32).
 *
 * Con semilla y no con `Math.random` porque esto corre en el servidor y otra
 * vez en el cliente: si cada uno saca un salpicado distinto, React encuentra
 * un HTML que no coincide con el que iba a pintar y tira el error de
 * hidratación.
 */
function seeded(seed: number) {
    let t = seed + 0x6d2b79f5;
    return () => {
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Una fila de píxeles encendidos con probabilidad `p`. */
function scatterRow(p: number, seed: number, color: string) {
    const rnd = seeded(seed);
    let rects = "";
    for (let i = 0; i < TILE; i++) {
        if (rnd() < p) rects += `%3Crect x='${i * CELL}' width='${CELL}' height='${CELL}'/%3E`;
    }
    const svg =
        `%3Csvg xmlns='http://www.w3.org/2000/svg' width='${TILE * CELL}' height='${CELL}' ` +
        `fill='%23${color.replace("#", "")}'%3E${rects}%3C/svg%3E`;
    return `url("data:image/svg+xml,${svg}")`;
}

export function PixelFade({
    color,
    edge,
    reveal = false,
    className,
}: {
    /** Color del que se disuelve: el de la sección del otro lado del borde. */
    color: string;
    /** Contra qué borde se apoya. `bottom` cierra hacia abajo; `top`, hacia arriba. */
    edge: "top" | "bottom";
    /**
     * Si la franja se arma con el scroll en vez de estar puesta desde el
     * arranque. Sirve arriba de todo, donde una franja quieta se lee como una
     * capa apoyada encima; en un borde al que se llega scrolleando, no hace
     * falta.
     */
    reveal?: boolean;
    className?: string;
}) {
    const ref = useScrollReveal<HTMLDivElement>(0.4);

    const rows = Array.from({ length: SCATTER }, (_, i) => {
        // Exponente > 1: arranca muy salteado y cierra rápido, que es como se
        // ve el disolvido en pixel art. Lineal deja demasiado píxel suelto en
        // la punta y el borde se ensucia en vez de desaparecer.
        const p = Math.pow((i + 1) / SCATTER, 1.9);
        return (
            <div
                key={i}
                style={{
                    height: CELL,
                    flex: "0 0 auto",
                    backgroundImage: scatterRow(p, i * 7919 + 13, color),
                    backgroundRepeat: "repeat-x",
                }}
            />
        );
    });

    // La zona transparente arranca en el borde macizo y avanza a medida que
    // crece `--reveal`; los 28px extra son el degradado con el que entra.
    const from = edge === "bottom" ? "to bottom" : "to top";
    const start = reveal ? "calc(100% - var(--reveal, 0) * 100%)" : "0%";
    const mask = `linear-gradient(${from}, transparent ${start}, #000 calc(${start} + 28px))`;

    // Cola maciza contra el borde: evita una línea de subpíxel entre la última
    // fila y la sección de al lado.
    const tail = <div style={{ height: CELL * 2, background: color }} />;

    return (
        <div
            ref={reveal ? ref : undefined}
            aria-hidden="true"
            className={cx(
                "pointer-events-none absolute inset-x-0 z-10 flex",
                edge === "bottom" ? "bottom-0 flex-col" : "top-0 flex-col-reverse",
                className,
            )}
            style={{ WebkitMaskImage: mask, maskImage: mask }}
        >
            {rows}
            {tail}
        </div>
    );
}

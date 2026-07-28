"use client";

import { useEffect, useState } from "react";
import { IsoMark } from "@/components/graphics/iso";
import { cx } from "@/utils/cx";

const COLUMNS = 9;

const HOLD_MS = 1000;
const COL_STAGGER = 55;
const COL_DURATION = 750;
const TOTAL_MS = HOLD_MS + COLUMNS * COL_STAGGER + COL_DURATION + 150;

type Phase = "hold" | "leaving" | "done";

/**
 * Pantalla de carga básica: un velo oscuro con la marca y un contador de
 * 0 a 100 en la esquina inferior derecha; al llegar a 100 se disuelve en
 * columnas — cada barra colapsa verticalmente desde arriba o desde abajo,
 * alternado, con un pequeño desfasaje entre una y la siguiente — para dar
 * paso al sitio. Es puramente temporal (un timer, no está atada al scroll),
 * así que no hereda los problemas de la cortina de píxeles anterior.
 *
 * El velo es oscuro (bg/inverse) a propósito: si compartiera el fondo claro
 * del Hero, el barrido de columnas casi no se notaría (mismo color a los
 * dos lados del corte). El contraste oscuro→claro es lo que hace legible
 * la disolución.
 */
export function Preloader() {
    const [phase, setPhase] = useState<Phase>("hold");
    const [pct, setPct] = useState(0);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setPhase("done");
            return;
        }

        document.documentElement.style.overflow = "hidden";

        let raf = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / HOLD_MS);
            setPct(Math.round(t * 100));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        const t1 = window.setTimeout(() => setPhase("leaving"), HOLD_MS);
        const t2 = window.setTimeout(() => {
            setPhase("done");
            document.documentElement.style.overflow = "";
        }, TOTAL_MS);

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            document.documentElement.style.overflow = "";
        };
    }, []);

    if (phase === "done") return null;

    const leaving = phase === "leaving";

    return (
        <div aria-hidden="true" className="fixed inset-0 z-[100]">
            <div
                className={cx(
                    "absolute inset-0 z-10 flex items-center justify-center gap-2.5 transition-opacity duration-500 ease-out",
                    leaving ? "opacity-0" : "opacity-100",
                )}
            >
                <span className="flex size-9 items-center justify-center rounded-full bg-[var(--neutral-700)]">
                    <IsoMark className="h-[12.3px] w-[8.3px]" />
                </span>
                <span className="font-display text-2xl font-normal text-[var(--text-inverse)]">4her</span>
            </div>

            {/* Contador — esquina inferior derecha, tipografía grande. */}
            <div
                className={cx(
                    "absolute right-6 bottom-6 z-10 transition-opacity duration-500 ease-out sm:right-10 sm:bottom-10",
                    leaving ? "opacity-0" : "opacity-100",
                )}
            >
                <span
                    className="font-display tabular-nums leading-none font-medium text-[var(--text-inverse)]"
                    style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
                >
                    {pct}
                    <span className="text-[0.4em] align-top">%</span>
                </span>
            </div>

            {/* Disolución por columnas: cada barra colapsa desde arriba o desde
                abajo, alternando, con un desfasaje que arma un barrido lateral. */}
            <div className="absolute inset-0 z-0 flex">
                {Array.from({ length: COLUMNS }, (_, i) => (
                    <div
                        key={i}
                        className="h-full flex-1"
                        style={{
                            background: "var(--bg-inverse)",
                            transformOrigin: i % 2 === 0 ? "top" : "bottom",
                            transform: leaving ? "scaleY(0)" : "scaleY(1)",
                            transition: `transform ${COL_DURATION}ms cubic-bezier(0.65,0,0.35,1) ${i * COL_STAGGER}ms`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

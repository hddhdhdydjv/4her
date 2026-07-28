"use client";

import { useEffect, useMemo, useState } from "react";
import { IsoMark } from "@/components/graphics/iso";
import { cx } from "@/utils/cx";

const COLS = 10;
const ROWS = 6;

const HOLD_MS = 550;
const TILE_MAX_DELAY = 420;
const TILE_DURATION = 620;
const TOTAL_MS = HOLD_MS + TILE_MAX_DELAY + TILE_DURATION + 120;

type Phase = "hold" | "leaving" | "done";

/**
 * Pantalla de carga básica: un velo con la marca centrada que, después de
 * un instante, se desarma en un mosaico calmo (cada tile se disuelve con
 * su propio delay) para dar paso al sitio. Puramente temporal — no depende
 * del scroll — así que no hereda los problemas de la cortina de píxeles
 * anterior (esa sí estaba atada al scroll y se sentía brusca/rota).
 */
export function Preloader() {
    const [phase, setPhase] = useState<Phase>("hold");
    const seeds = useMemo(() => Array.from({ length: COLS * ROWS }, () => Math.random()), []);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setPhase("done");
            return;
        }

        document.documentElement.style.overflow = "hidden";
        const t1 = window.setTimeout(() => setPhase("leaving"), HOLD_MS);
        const t2 = window.setTimeout(() => {
            setPhase("done");
            document.documentElement.style.overflow = "";
        }, TOTAL_MS);

        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            document.documentElement.style.overflow = "";
        };
    }, []);

    if (phase === "done") return null;

    const leaving = phase === "leaving";

    return (
        <div aria-hidden="true" className="fixed inset-0 z-[100] bg-[var(--neutral-200)]">
            <div
                className={cx(
                    "absolute inset-0 z-10 flex items-center justify-center gap-2.5 transition-opacity duration-400 ease-out",
                    leaving ? "opacity-0" : "opacity-100",
                )}
            >
                <span className="flex size-9 items-center justify-center rounded-full bg-[var(--bg-tertiary)]">
                    <IsoMark className="h-[12.3px] w-[8.3px]" />
                </span>
                <span className="font-display text-2xl font-normal text-[var(--text-primary)]">4her</span>
            </div>

            <div
                className="absolute inset-0 z-0 grid"
                style={{
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                }}
            >
                {seeds.map((seed, i) => {
                    const delay = Math.round(seed * TILE_MAX_DELAY);
                    return (
                        <div
                            key={i}
                            style={{
                                background: "var(--neutral-200)",
                                transition: `opacity ${TILE_DURATION}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform ${TILE_DURATION}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
                                opacity: leaving ? 0 : 1,
                                transform: leaving ? "scale(0.82)" : "scale(1)",
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

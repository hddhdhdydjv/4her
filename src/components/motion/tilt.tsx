"use client";

import { useRef, type ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Card hover tilt (transitions.dev): la tarjeta se inclina hacia el mouse con
 * un reflejo que lo sigue. Los estilos viven en `styles/transitions.css`.
 *
 * El puntero se lee sobre el envoltorio plano, nunca sobre la tarjeta que
 * gira: si no, los bordes rotados se escapan de abajo del cursor y el hover
 * parpadea.
 *
 * A diferencia de la receta original, sólo responde al mouse: con touch la
 * receta bloquea el scroll para poder inclinar arrastrando, y acá las
 * tarjetas llenan casi toda la pantalla del celular.
 */

/** Inclinación máxima en los bordes, en grados. Sutil a propósito. */
const MAX = 8;

export function Tilt({
    children,
    className,
    radius = "20px",
}: {
    children: ReactNode;
    className?: string;
    radius?: string;
}) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    function reset() {
        const wrap = wrapRef.current;
        const card = cardRef.current;
        if (!wrap || !card) return;
        wrap.classList.remove("is-hover");
        card.classList.remove("is-tilting");
        card.style.setProperty("--tilt-rx", "0deg");
        card.style.setProperty("--tilt-ry", "0deg");
    }

    function track(e: React.PointerEvent<HTMLDivElement>) {
        if (e.pointerType !== "mouse") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const wrap = wrapRef.current;
        const card = cardRef.current;
        if (!wrap || !card) return;

        const r = wrap.getBoundingClientRect();
        const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        wrap.classList.add("is-hover");
        card.classList.add("is-tilting");
        card.style.setProperty("--tilt-ry", `${((px - 0.5) * MAX).toFixed(2)}deg`);
        card.style.setProperty("--tilt-rx", `${((0.5 - py) * MAX).toFixed(2)}deg`);
        card.style.setProperty("--tilt-gx", `${(px * 100).toFixed(1)}%`);
        card.style.setProperty("--tilt-gy", `${(py * 100).toFixed(1)}%`);
    }

    return (
        <div ref={wrapRef} className={cx("t-tilt", className)} onPointerMove={track} onPointerLeave={reset}>
            <div
                ref={cardRef}
                className="t-tilt-card h-full w-full"
                style={{ "--tilt-radius": radius } as React.CSSProperties}
            >
                {children}
                <div className="t-tilt-glare" />
            </div>
        </div>
    );
}

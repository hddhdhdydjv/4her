"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Texts reveal (transitions.dev): las líneas suben con desenfoque en cascada.
 * Los estilos viven en `styles/transitions.css`; acá sólo se prende
 * `.is-shown` una vez montado, para que la entrada arranque desde el estado
 * inicial y no aparezca ya resuelta.
 *
 * Cada hijo directo tiene que llevar `t-stagger-line t-stagger-line--N`.
 */
export function TextsReveal({ children, className }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Un frame de espera: sin él el navegador puede pintar directo el
        // estado final y la transición no corre.
        const frame = requestAnimationFrame(() => el.classList.add("is-shown"));
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div ref={ref} className={cx("t-stagger", className)}>
            {children}
        </div>
    );
}

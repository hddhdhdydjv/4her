"use client";

import { useRef, type ReactNode } from "react";
import { useRevealTrigger } from "@/hooks/use-reveal-trigger";
import { cx } from "@/utils/cx";

/**
 * Texts reveal (transitions.dev): las líneas suben con desenfoque en cascada.
 * Los estilos viven en `styles/transitions.css`; acá sólo se prende
 * `.is-shown` cuando el bloque entra y se apaga cuando salió por completo,
 * así vuelve a animarse si el usuario regresa al inicio.
 *
 * Cada hijo directo tiene que llevar `t-stagger-line t-stagger-line--N`.
 */
export function TextsReveal({ children, className }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useRevealTrigger(
        ref,
        {
            onShow: () => ref.current?.classList.add("is-shown"),
            onHide: () => ref.current?.classList.remove("is-shown"),
        },
        { bottomMargin: "0px" },
    );

    return (
        <div ref={ref} className={cx("t-stagger", className)}>
            {children}
        </div>
    );
}

"use client";

import { useCallback } from "react";
import { useLenisInstance } from "@/components/providers/lenis-provider";

/**
 * Handler de click para links `#ancla`: si Lenis ya está listo, hace el
 * scroll suave por su motor (con el mismo easing que el resto de la página);
 * si todavía no montó, cae al scroll nativo del navegador.
 */
export function useAnchorScroll() {
    const lenis = useLenisInstance();

    return useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            const href = e.currentTarget.getAttribute("href");
            if (!href?.startsWith("#")) return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            if (lenis) {
                lenis.scrollTo(target as HTMLElement, { offset: -24 });
            } else {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            history.pushState(null, "", href);
        },
        [lenis],
    );
}

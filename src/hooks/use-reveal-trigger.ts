import { useEffect, useRef, type RefObject } from "react";

type Handlers = {
    onShow: () => void;
    onHide: () => void;
};

type Options = {
    /** Fracción visible (dentro de la zona de entrada) a partir de la cual se muestra. */
    threshold?: number;
    /** Margen inferior de la zona de entrada: el elemento aparece un poco antes del borde. */
    bottomMargin?: string;
};

// Pasos intermedios para que los elementos muy altos también avisen.
const STEPS = [0, 0.05, 0.1, 0.15, 0.25, 0.4, 0.6, 0.8, 1];

/**
 * Dispara `onShow` cuando el elemento entra y `onHide` recién cuando salió
 * del viewport por completo, así la animación se repite al volver a la
 * sección sin cortarse a mitad de camino.
 *
 * Son dos observers a propósito. Con uno solo, cada cruce de un umbral manda
 * un evento con `isIntersecting: true` aunque el elemento esté saliendo, y la
 * animación de entrada se reiniciaba con el elemento a la vista. Acá "mostrar"
 * mira una zona de entrada algo más chica que el viewport y "ocultar" mira el
 * viewport real, de modo que nunca se apaga algo que todavía se ve.
 */
export function useRevealTrigger(
    ref: RefObject<HTMLElement | null>,
    handlers: Handlers,
    { threshold = 0.15, bottomMargin = "-8%" }: Options = {},
) {
    const latest = useRef(handlers);
    useEffect(() => {
        latest.current = handlers;
    });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce || typeof IntersectionObserver === "undefined") {
            latest.current.onShow();
            return;
        }

        let shown = false;
        const show = () => {
            if (shown) return;
            // Mismo caso inverso: una entrada atrasada puede decir "entró"
            // cuando el elemento ya se fue por arriba.
            const r = el.getBoundingClientRect();
            if (r.bottom <= 0 || r.top >= window.innerHeight) return;
            shown = true;
            latest.current.onShow();
        };
        const hide = () => {
            if (!shown) return;
            // Las entradas de un observer pueden llegar un frame tarde: si por
            // geometría todavía se ve, no se apaga; el observer avisa de nuevo.
            const r = el.getBoundingClientRect();
            if (r.bottom > 0 && r.top < window.innerHeight) return;
            shown = false;
            latest.current.onHide();
        };

        const enter = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (!e.isIntersecting) continue;
                    const rootH = e.rootBounds?.height ?? window.innerHeight;
                    if (e.intersectionRatio >= threshold || e.intersectionRect.height >= rootH * 0.4) show();
                }
            },
            { threshold: STEPS, rootMargin: `0px 0px ${bottomMargin} 0px` },
        );
        const leave = new IntersectionObserver(
            (entries) => {
                for (const e of entries) if (!e.isIntersecting) hide();
            },
            { threshold: 0 },
        );

        enter.observe(el);
        leave.observe(el);
        return () => {
            enter.disconnect();
            leave.disconnect();
        };
    }, [ref, threshold, bottomMargin]);
}

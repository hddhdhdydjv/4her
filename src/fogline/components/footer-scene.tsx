"use client";
/* eslint-disable @next/next/no-img-element -- capas de la ilustración con posiciones de Figma */

import { useEffect, useRef } from "react";

/**
 * Escena del footer en capas (como en Figma, 1440 × 692): fondo, logo grande y colina con dither.
 * Al mover el mouse cada capa se corre un poco distinto, para dar profundidad.
 * En mobile se usa la imagen vertical plana.
 */
export function FooterScene() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, on = false;
        const onMove = (e: PointerEvent) => {
            tx = (e.clientX / window.innerWidth) * 2 - 1;
            ty = (e.clientY / window.innerHeight) * 2 - 1;
        };
        const tick = () => {
            cx += (tx - cx) * 0.06;
            cy += (ty - cy) * 0.06;
            el.style.setProperty("--mx", cx.toFixed(3));
            el.style.setProperty("--my", cy.toFixed(3));
            raf = requestAnimationFrame(tick);
        };
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !on) { on = true; raf = requestAnimationFrame(tick); }
            if (!e.isIntersecting && on) { on = false; cancelAnimationFrame(raf); }
        });
        io.observe(el);
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
        };
    }, []);

    return (
        <div ref={ref} className="fl-footer__scene" aria-hidden="true">
            <div className="fl-fscene">
                <img className="fl-fscene__back" src="/fogline/footer/back.webp" alt="" />
                <div className="fl-fscene__logo">
                    <img src="/fogline/brand/isotipo.svg" alt="" />
                    <span>Fogline</span>
                </div>
                <img className="fl-fscene__hill" src="/fogline/scene/colina-dither.webp" alt="" />
            </div>
            <img className="fl-fscene__mobile" src="/fogline/footer/escena-mobile.webp" alt="" />
        </div>
    );
}

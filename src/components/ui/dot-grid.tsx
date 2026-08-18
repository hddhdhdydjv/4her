"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/utils/cx";

/**
 * Grilla de puntos que se aparta del cursor.
 *
 * Va en canvas y no en CSS porque cada punto se mueve por su cuenta: con un
 * `background-image` la trama es una sola imagen y no hay forma de empujar un
 * punto sin empujarlos a todos. Con 500 puntos el dibujo es barato; lo caro
 * sería un nodo del DOM por punto.
 *
 * El bucle de animación no queda prendido: arranca cuando el puntero entra y
 * se apaga solo cuando todos los puntos volvieron a su lugar. Una sección que
 * no se está mirando no gasta frames.
 */

/** Separación entre puntos. */
const GAP = 22;

/** Radio del punto en reposo. */
const DOT = 1.3;

/** Hasta dónde llega la influencia del cursor. */
const REACH = 130;

/** Cuánto se aparta el punto más cercano al cursor. */
const PUSH = 26;

/** Cuánto crece el punto más cercano al cursor, sobre su radio de reposo. */
const GROW = 1.1;

/** Qué tan rápido persigue cada punto su posición objetivo (0-1 por frame). */
const EASE = 0.12;

type Dot = { x: number; y: number; ox: number; oy: number; r: number };

export function DotGrid({ className, color = "rgba(20,20,20,0.16)" }: { className?: string; color?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        if (!canvas || !parent) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let dots: Dot[] = [];
        let width = 0;
        let height = 0;
        let frame = 0;
        // Fuera de todo alcance mientras el puntero no esté encima.
        let mx = -9999;
        let my = -9999;

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = color;
            for (const d of dots) {
                ctx.beginPath();
                ctx.arc(d.x + d.ox, d.y + d.oy, d.r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function step() {
            let moving = false;

            for (const d of dots) {
                const dx = d.x - mx;
                const dy = d.y - my;
                const dist = Math.hypot(dx, dy);

                let tx = 0;
                let ty = 0;
                let tr = DOT;
                if (dist < REACH && dist > 0.01) {
                    // Cuanto más cerca del cursor, más se aparta y más crece.
                    const near = 1 - dist / REACH;
                    const force = near * PUSH;
                    tx = (dx / dist) * force;
                    ty = (dy / dist) * force;
                    tr = DOT + near * GROW;
                }

                d.ox += (tx - d.ox) * EASE;
                d.oy += (ty - d.oy) * EASE;
                d.r += (tr - d.r) * EASE;

                if (Math.abs(d.ox) > 0.05 || Math.abs(d.oy) > 0.05 || Math.abs(d.r - DOT) > 0.02) {
                    moving = true;
                }
            }

            draw();

            // Se sigue dibujando mientras haya algo en movimiento o el puntero
            // siga encima; si no, el bucle se apaga hasta la próxima entrada.
            if (moving || mx > -9999) {
                frame = requestAnimationFrame(step);
            } else {
                frame = 0;
            }
        }

        function wake() {
            if (!frame && !reduced) frame = requestAnimationFrame(step);
        }

        function build() {
            if (!canvas || !parent || !ctx) return;
            const rect = parent.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            if (width === 0 || height === 0) return;

            // El canvas se dibuja a la resolución real de la pantalla para que
            // los puntos no salgan borrosos en displays densos.
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Grilla centrada: sobra el mismo margen de los dos lados.
            const cols = Math.floor(width / GAP);
            const rows = Math.floor(height / GAP);
            const offX = (width - (cols - 1) * GAP) / 2;
            const offY = (height - (rows - 1) * GAP) / 2;

            dots = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    dots.push({ x: offX + c * GAP, y: offY + r * GAP, ox: 0, oy: 0, r: DOT });
                }
            }
            draw();
        }

        function onMove(e: PointerEvent) {
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            mx = e.clientX - rect.left;
            my = e.clientY - rect.top;
            wake();
        }

        function onLeave() {
            mx = -9999;
            my = -9999;
            wake();
        }

        build();

        const ro = new ResizeObserver(build);
        ro.observe(parent);

        if (!reduced) {
            parent.addEventListener("pointermove", onMove);
            parent.addEventListener("pointerleave", onLeave);
        }

        return () => {
            ro.disconnect();
            parent.removeEventListener("pointermove", onMove);
            parent.removeEventListener("pointerleave", onLeave);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [color]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={cx("pointer-events-none absolute inset-0 h-full w-full", className)}
        />
    );
}

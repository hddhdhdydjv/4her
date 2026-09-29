"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { cx } from "@/utils/cx";

const BAYER_8 = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
] as const;

export function DitherField({ children, className }: { children: ReactNode; className?: string }) {
    const rootRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        const canvas = canvasRef.current;
        if (!root || !canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const pointer = { x: -1000, y: -1000, tx: -1000, ty: -1000 };
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let width = 0;
        let height = 0;
        let frame = 0;
        let visible = true;
        let lastPaint = 0;

        const resize = () => {
            const rect = root.getBoundingClientRect();
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, Math.round(rect.width));
            height = Math.max(1, Math.round(rect.height));
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        const paint = (time: number) => {
            if (!visible) return;
            const cell = width < 720 ? 5 : 6;
            const drift = reducedMotion ? 0 : time * 0.00016;

            context.clearRect(0, 0, width, height);

            pointer.x += (pointer.tx - pointer.x) * 0.12;
            pointer.y += (pointer.ty - pointer.y) * 0.12;

            if (pointer.x < -200 || pointer.y < -200) return;

            const radius = 155;
            const startX = Math.max(0, Math.floor((pointer.x - radius) / cell) * cell);
            const endX = Math.min(width, Math.ceil((pointer.x + radius) / cell) * cell);
            const startY = Math.max(0, Math.floor((pointer.y - radius) / cell) * cell);
            const endY = Math.min(height, Math.ceil((pointer.y + radius) / cell) * cell);

            for (let y = startY; y < endY; y += cell) {
                const row = Math.floor(y / cell);
                for (let x = startX; x < endX; x += cell) {
                    const column = Math.floor(x / cell);
                    const nx = x / width;
                    const ny = y / height;
                    const dx = x - pointer.x;
                    const dy = y - pointer.y;
                    const distance = Math.hypot(dx, dy);
                    const influence = Math.max(0, 1 - distance / 155);

                    const waves =
                        Math.sin(nx * 8.4 + drift * 3.1) * 0.23 +
                        Math.cos(ny * 7.1 - drift * 2.2) * 0.2 +
                        Math.sin((nx + ny) * 11.5 + drift) * 0.12;
                    const ordered = (BAYER_8[row % 8][column % 8] + 0.5) / 64 - 0.5;
                    const cursorShift = influence * (Math.sin(distance * 0.08 - drift * 8) * 0.28 + ordered * 0.45);
                    const value = Math.min(1, Math.max(0, 0.54 + waves + ordered * 0.25 + cursorShift));
                    const level = Math.round(value * 5) / 5;
                    const gray = Math.round(14 + level * 225);

                    context.fillStyle = `rgba(${gray},${gray},${gray},${influence * 0.94})`;
                    const inset = influence > 0.08 && (row + column) % 3 === 0 ? 1.45 : 0.7;
                    context.fillRect(x + inset, y + inset, Math.max(1, cell - inset * 2), Math.max(1, cell - inset * 2));
                }
            }
        };

        const tick = (time: number) => {
            if (time - lastPaint > 32) {
                paint(time);
                lastPaint = time;
            }
            frame = requestAnimationFrame(tick);
        };

        const onPointerMove = (event: PointerEvent) => {
            const rect = root.getBoundingClientRect();
            pointer.tx = event.clientX - rect.left;
            pointer.ty = event.clientY - rect.top;
            root.style.setProperty("--logo-x", `${((pointer.tx / rect.width) - 0.5) * 8}px`);
            root.style.setProperty("--logo-y", `${((pointer.ty / rect.height) - 0.5) * 6}px`);
        };

        const onPointerLeave = () => {
            pointer.tx = -1000;
            pointer.ty = -1000;
            root.style.setProperty("--logo-x", "0px");
            root.style.setProperty("--logo-y", "0px");
        };

        const resizeObserver = new ResizeObserver(resize);
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) paint(performance.now());
        }, { rootMargin: "150px" });

        resizeObserver.observe(root);
        intersectionObserver.observe(root);
        root.addEventListener("pointermove", onPointerMove);
        root.addEventListener("pointerleave", onPointerLeave);
        resize();
        paint(0);
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            root.removeEventListener("pointermove", onPointerMove);
            root.removeEventListener("pointerleave", onPointerLeave);
        };
    }, []);

    return (
        <div ref={rootRef} className={cx("relative overflow-hidden", className)}>
            <Image
                src="/images/hero/hero-dither.png"
                alt=""
                fill
                priority
                unoptimized
                className="object-cover"
                draggable={false}
            />
            <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
            {children}
        </div>
    );
}

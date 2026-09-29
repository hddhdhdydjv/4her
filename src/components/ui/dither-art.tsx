"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Ordered Bayer dithering: actual quantization, not a dot overlay.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export function DitherArt({ children, className = "", logo = false }: {
    children: ReactNode; className?: string; logo?: boolean;
}) {
    const source = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const original = source.current?.querySelector("svg");
        const output = canvas.current;
        if (!original || !output) return;
        let disposed = false;
        const svg = original.cloneNode(true) as SVGSVGElement;
        const box = original.viewBox.baseVal;
        const width = logo ? 720 : 400;
        const height = Math.round(width * box.height / box.width);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", String(width));
        svg.setAttribute("height", String(height));
        svg.setAttribute("color", "#161616");
        svg.style.color = "#161616";
        const image = new window.Image();
        image.onload = () => {
            if (disposed) return;
            try {
                output.width = width;
                output.height = height;
                const ctx = output.getContext("2d", { willReadFrequently: true });
                if (!ctx) return;
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(image, 0, 0, width, height);
                const pixels = ctx.getImageData(0, 0, width, height);
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const i = (y * width + x) * 4;
                        const alpha = pixels.data[i + 3] / 255;
                        const luminance = (pixels.data[i] + pixels.data[i+1] + pixels.data[i+2]) / 765;
                        const shade = logo ? (0.95 - 0.68 * (y / height) ** 1.8) : 0.84;
                        const ink = alpha * (1 - luminance) * shade;
                        const on = ink > (BAYER[(y % 4) * 4 + x % 4] + 0.5) / 16;
                        pixels.data[i] = 57;
                        pixels.data[i+1] = 32;
                        pixels.data[i+2] = 65;
                        pixels.data[i+3] = on ? 255 : 0;
                    }
                }
                ctx.putImageData(pixels, 0, 0);
                setReady(true);
            } catch { /* The original SVG remains visible if rasterization fails. */ }
        };
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`;
        return () => { disposed = true; image.onload = null; };
    }, [logo]);

    return <div className={`dither-art ${className}`} aria-hidden="true">
        <div ref={source} className={ready ? "dither-source is-ready" : "dither-source"}>{children}</div>
        <canvas ref={canvas} className={ready ? "dither-canvas is-ready" : "dither-canvas"} />
    </div>;
}

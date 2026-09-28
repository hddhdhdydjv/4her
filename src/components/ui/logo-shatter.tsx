"use client";

import { useEffect, useRef, useState } from "react";
import type * as ThreeNS from "three";
import { Logotipo } from "@/components/graphics/brand";
import { cx } from "@/utils/cx";

/**
 * El logotipo se rompe al scrollear.
 *
 * La textura sale del mismo SVG que dibuja el logotipo en cualquier otra
 * parte del sitio: se serializa el nodo, se rasteriza a un canvas y ese canvas
 * es el mapa. Nada de paths duplicados — si el logo cambia, esto cambia con él.
 *
 * La malla es un plano partido en celdas sueltas, y cada celda lleva su centro
 * y unos números al azar como atributos. Con eso el vertex shader la aparta,
 * la gira sobre un eje propio y la desvanece, todo desde un único uniform de
 * progreso: una sola draw call y cero trabajo por fragmento en el CPU.
 *
 * three.js entra por import dinámico y sólo si hace falta. Con
 * `prefers-reduced-motion`, sin WebGL o si la carga falla, nunca se descarga y
 * queda el SVG plano, que es lo que se ve hasta que el canvas está listo.
 */

const COLS = 14;
const ROWS = 6;

/** Relación del logotipo recortado (61.34 / 20.55). */
const ASPECT = 2.985;

/** Opacidad del logo en la escena: el vidrio del diseño. */
const OPACITY = 0.46;

/** Fracción de pantalla en la que se resuelve la rotura. */
const SCROLL_SPAN = 0.5;

const VERTEX = /* glsl */ `
uniform float uProgress;

attribute vec3 aCenter;
attribute vec3 aRandom;

varying vec2 vUv;
varying float vFade;

vec3 rotateAround(vec3 v, vec3 axis, float angle) {
    return v * cos(angle)
        + cross(axis, v) * sin(angle)
        + axis * dot(axis, v) * (1.0 - cos(angle));
}

void main() {
    vUv = uv;

    // Cada esquirla arranca un poco después que la anterior: la rotura entra
    // en cascada en vez de saltar entera de una.
    float delay = aRandom.x * 0.35;
    float t = clamp((uProgress - delay) / max(1.0 - delay, 0.001), 0.0, 1.0);
    t *= t;

    vec3 local = position - aCenter;
    vec3 axis = normalize(aRandom - 0.5 + 0.001);
    local = rotateAround(local, axis, t * (aRandom.y - 0.5) * 6.0);

    // Se abre desde el centro del logo, y algo de z para que la perspectiva
    // se note: unas esquirlas vienen hacia la cámara y otras se van al fondo.
    vec2 outward = aCenter.xy / max(length(aCenter.xy), 0.001);
    vec3 displaced = aCenter
        + local
        + vec3(outward * t * 0.55, (aRandom.z - 0.5) * t * 1.6);

    vFade = 1.0 - t;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform sampler2D uMap;
uniform float uOpacity;

varying vec2 vUv;
varying float vFade;

void main() {
    vec4 texel = texture2D(uMap, vUv);
    gl_FragColor = vec4(texel.rgb, texel.a * vFade * uOpacity);
    if (gl_FragColor.a < 0.002) discard;
}
`;

/** Rasteriza un <svg> del DOM a un canvas, en blanco y a alta resolución. */
function rasterize(svg: SVGSVGElement, width: number): Promise<HTMLCanvasElement> {
    // El logo pinta con `currentColor`: sobre una copia se fija el color en
    // blanco, así el tinte de la escena lo pone el shader y no la textura.
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("color", "#ffffff");
    clone.setAttribute("width", `${width}`);
    clone.setAttribute("height", `${Math.round(width / ASPECT)}`);

    const source = new XMLSerializer().serializeToString(clone);
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;

    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = Math.round(width / ASPECT);
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("sin contexto 2d"));
                return;
            }
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(canvas);
        };
        image.onerror = () => reject(new Error("no se pudo rasterizar el logotipo"));
        image.src = url;
    });
}

/** Plano partido en celdas sueltas, cada una con su centro y su azar. */
function buildGeometry(THREE: typeof ThreeNS) {
    const width = ASPECT;
    const height = 1;
    const cellW = width / COLS;
    const cellH = height / ROWS;

    const positions: number[] = [];
    const uvs: number[] = [];
    const centers: number[] = [];
    const randoms: number[] = [];

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const x0 = -width / 2 + col * cellW;
            const y0 = -height / 2 + row * cellH;
            const x1 = x0 + cellW;
            const y1 = y0 + cellH;

            const cx = (x0 + x1) / 2;
            const cy = (y0 + y1) / 2;

            const u0 = col / COLS;
            const v0 = row / ROWS;
            const u1 = (col + 1) / COLS;
            const v1 = (row + 1) / ROWS;

            // Dos triángulos por celda, sin índices: cada esquirla tiene sus
            // propios vértices y se puede mover sin arrastrar a las vecinas.
            const quad = [
                [x0, y0, u0, v0],
                [x1, y0, u1, v0],
                [x1, y1, u1, v1],
                [x0, y0, u0, v0],
                [x1, y1, u1, v1],
                [x0, y1, u0, v1],
            ];

            const seed = [Math.random(), Math.random(), Math.random()];

            for (const [x, y, u, v] of quad) {
                positions.push(x, y, 0);
                uvs.push(u, v);
                centers.push(cx, cy, 0);
                randoms.push(seed[0], seed[1], seed[2]);
            }
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setAttribute("aCenter", new THREE.Float32BufferAttribute(centers, 3));
    geometry.setAttribute("aRandom", new THREE.Float32BufferAttribute(randoms, 3));
    return geometry;
}

export function LogoShatter({ className }: { className?: string }) {
    const hostRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const host = hostRef.current;
        const svg = svgRef.current?.querySelector("svg");
        if (!host || !svg) return;

        let disposed = false;
        let cleanup: (() => void) | undefined;

        (async () => {
            const THREE = await import("three");
            if (disposed) return;

            const canvas = document.createElement("canvas");
            canvas.className = "absolute inset-0 h-full w-full";

            let renderer: ThreeNS.WebGLRenderer;
            try {
                renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            } catch {
                // Sin WebGL nos quedamos con el SVG, que ya está en pantalla.
                return;
            }
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

            const texture = new THREE.CanvasTexture(await rasterize(svg, 2048));
            if (disposed) {
                texture.dispose();
                renderer.dispose();
                return;
            }
            texture.colorSpace = THREE.SRGBColorSpace;

            const geometry = buildGeometry(THREE);
            const material = new THREE.ShaderMaterial({
                vertexShader: VERTEX,
                fragmentShader: FRAGMENT,
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide,
                uniforms: {
                    uProgress: { value: 0 },
                    uMap: { value: texture },
                    uOpacity: { value: OPACITY },
                },
            });

            const scene = new THREE.Scene();
            scene.add(new THREE.Mesh(geometry, material));

            // La cámara se aleja lo justo para que el plano (alto 1) llene el
            // encuadre; el ancho entra solo porque el canvas tiene la misma
            // relación que el logotipo.
            const camera = new THREE.PerspectiveCamera(45, ASPECT, 0.1, 10);
            camera.position.z = 0.5 / Math.tan((45 * Math.PI) / 360);

            function resize() {
                const rect = host!.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) return;
                renderer.setSize(rect.width, rect.height, false);
                camera.aspect = rect.width / rect.height;
                camera.updateProjectionMatrix();
            }

            const observer = new ResizeObserver(resize);
            observer.observe(host!);
            resize();

            host!.appendChild(canvas);
            setReady(true);

            let frame = 0;
            let visible = true;
            let lastProgress = -1;

            function tick() {
                const span = window.innerHeight * SCROLL_SPAN;
                const progress = Math.min(Math.max(window.scrollY / span, 0), 1);

                // Sólo se redibuja cuando el progreso cambió: quieto, el hero
                // no gasta un frame.
                if (progress !== lastProgress) {
                    lastProgress = progress;
                    material.uniforms.uProgress.value = progress;
                    renderer.render(scene, camera);
                }

                frame = visible ? requestAnimationFrame(tick) : 0;
            }

            // Fuera de cámara el bucle se apaga entero.
            const io = new IntersectionObserver(([entry]) => {
                visible = entry.isIntersecting;
                if (visible && !frame) frame = requestAnimationFrame(tick);
            });
            io.observe(host!);

            frame = requestAnimationFrame(tick);

            cleanup = () => {
                if (frame) cancelAnimationFrame(frame);
                io.disconnect();
                observer.disconnect();
                canvas.remove();
                geometry.dispose();
                material.dispose();
                texture.dispose();
                renderer.dispose();
            };
        })().catch(() => {
            // Cualquier fallo deja el SVG en pantalla: el hero nunca queda vacío.
        });

        return () => {
            disposed = true;
            cleanup?.();
        };
    }, []);

    return (
        <div ref={hostRef} className={cx("relative", className)}>
            {/* Lo que se ve hasta que el canvas toma el relevo, y lo que queda
                si WebGL no está disponible. Es además el original del que sale
                la textura. */}
            <div
                ref={svgRef}
                className={cx("transition-opacity duration-300", ready && "opacity-0")}
            >
                <Logotipo tight className="h-full w-full" style={{ color: `rgba(255,255,255,${OPACITY})` }} />
            </div>
        </div>
    );
}

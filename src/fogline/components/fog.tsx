"use client";

import { useEffect, useRef } from "react";

/**
 * Niebla interactiva con dither (WebGL, sin dependencias).
 * - Ruido fbm animado = la niebla. Más densa abajo, como en el paisaje.
 * - Dither Bayer 4×4 en celdas de `px` píxeles = la textura de puntitos.
 * - El puntero despeja un círculo suave alrededor.
 * - `density` (0–1) la maneja el scroll desde afuera, vía ref.
 * Se pausa fuera de pantalla y queda quieta con "reducir movimiento".
 */

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseOn;
uniform float uDensity;
uniform float uPx;
uniform vec3 uColor;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
float bayer4(vec2 p){
  vec2 q = mod(p, 4.0);
  int i = int(q.x) + int(q.y) * 4;
  float m[16];
  m[0]=0.0; m[1]=8.0; m[2]=2.0; m[3]=10.0;
  m[4]=12.0; m[5]=4.0; m[6]=14.0; m[7]=6.0;
  m[8]=3.0; m[9]=11.0; m[10]=1.0; m[11]=9.0;
  m[12]=15.0; m[13]=7.0; m[14]=13.0; m[15]=5.0;
  float r = 0.0;
  for (int k = 0; k < 16; k++){ if (k == i) r = m[k]; }
  return (r + 0.5) / 16.0;
}
void main(){
  vec2 cell = floor(gl_FragCoord.xy / uPx);
  vec2 frag = cell * uPx;
  vec2 uv = frag / uRes.y;
  float t = uTime * 0.035;

  vec2 q = vec2(fbm(uv * 1.4 + vec2(t, 0.0)), fbm(uv * 1.4 + vec2(5.2, 1.3) - t));
  float f = fbm(uv * 1.1 + q * 1.6 + vec2(t * 1.6, 0.0));

  float low = 1.0 - frag.y / uRes.y;           // 0 arriba, 1 abajo
  float band = mix(0.55, 1.0, smoothstep(0.1, 0.85, low));
  float dens = smoothstep(0.28, 0.85, f) * band * uDensity;

  float d = distance(gl_FragCoord.xy, uMouse);
  float clearR = uRes.y * 0.22;
  dens -= smoothstep(clearR, 0.0, d) * 0.85 * uMouseOn;
  dens = clamp(dens, 0.0, 1.0);

  float dots = step(bayer4(cell), dens);
  float a = dens * 0.55 + dots * 0.35;
  gl_FragColor = vec4(uColor * a, a);
}
`;

export type FogHandle = { density: number };

const CREAM: [number, number, number] = [1, 0.992, 0.976];

export function Fog({ handle, color = CREAM }: { handle: React.RefObject<FogHandle>; color?: [number, number, number] }) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
        if (!gl) return;

        const compile = (type: number, src: string) => {
            const s = gl.createShader(type)!;
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };
        const prog = gl.createProgram()!;
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "p");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        const u = (n: string) => gl.getUniformLocation(prog, n);
        const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse"), uMouseOn = u("uMouseOn"),
            uDensity = u("uDensity"), uPx = u("uPx"), uColor = u("uColor");
        gl.uniform3f(uColor, color[0], color[1], color[2]);

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let w = 0, h = 0;
        const resize = () => {
            w = Math.round(canvas.clientWidth * dpr);
            h = Math.round(canvas.clientHeight * dpr);
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
            gl.uniform2f(uRes, w, h);
            gl.uniform1f(uPx, Math.round(3 * dpr));
        };
        resize();
        window.addEventListener("resize", resize);

        // Puntero suavizado: el despeje sigue al mouse/dedo con inercia.
        const target = { x: -9999, y: -9999, on: 0 };
        const cur = { x: -9999, y: -9999, on: 0 };
        const onMove = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            target.x = (e.clientX - r.left) * dpr;
            target.y = (r.bottom - e.clientY) * dpr;
            target.on = 1;
            if (cur.x < -999) { cur.x = target.x; cur.y = target.y; }
        };
        const onLeave = () => { target.on = 0; };
        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);

        let visible = true;
        const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
        io.observe(canvas);

        let raf = 0;
        const start = performance.now();
        const frame = (now: number) => {
            raf = requestAnimationFrame(frame);
            if (!visible) return;
            cur.x += (target.x - cur.x) * 0.08;
            cur.y += (target.y - cur.y) * 0.08;
            cur.on += (target.on - cur.on) * 0.05;
            gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000);
            gl.uniform2f(uMouse, cur.x, cur.y);
            gl.uniform1f(uMouseOn, cur.on);
            gl.uniform1f(uDensity, handle.current?.density ?? 1);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
        };
    }, [handle, color]);

    return <canvas ref={ref} className="fl-fog" aria-hidden="true" />;
}

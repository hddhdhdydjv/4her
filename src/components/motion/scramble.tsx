"use client";

import { useEffect, useRef } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/";

/**
 * Texto que se "descifra" al entrar en viewport (efecto scramble).
 * El texto real queda en el DOM para SSR/SEO; solo se scramblea visualmente.
 */
export function Scramble({ text, className }: { text: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let raf = 0;
        let done = false;

        const run = () => {
            const start = performance.now();
            const dur = 900;
            const tick = (now: number) => {
                const p = Math.min(1, (now - start) / dur);
                const settled = Math.floor(p * text.length);
                let out = text.slice(0, settled);
                for (let i = settled; i < text.length; i++) {
                    const c = text[i];
                    out += c === " " ? " " : CHARSET[Math.floor(Math.random() * CHARSET.length)];
                }
                el.textContent = out;
                if (p < 1) raf = window.requestAnimationFrame(tick);
                else el.textContent = text;
            };
            raf = window.requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting) && !done) {
                    done = true;
                    io.disconnect();
                    run();
                }
            },
            { threshold: 0.4 },
        );
        io.observe(el);
        return () => {
            io.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [text]);

    return (
        <span ref={ref} className={className} aria-label={text}>
            {text}
        </span>
    );
}

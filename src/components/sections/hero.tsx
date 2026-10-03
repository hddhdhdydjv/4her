"use client";

import { useEffect, useRef } from "react";
import styles from "./hero.module.css";

export function Hero() {
    const section = useRef<HTMLElement>(null);
    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const root = section.current;
        const media = video.current;
        if (!root || !media) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        function update() {
            frame = 0;
            if (!root || !media) return;
            const progress = reduced.matches ? 0 : Math.max(0, Math.min(1,
                -root.getBoundingClientRect().top / Math.max(1, root.offsetHeight - window.innerHeight)));
            root.style.setProperty("--progress", String(progress));
            root.style.setProperty("--copy-opacity", String(Math.max(0, 1 - progress * 2.3)));
            if (Number.isFinite(media.duration) && !media.seeking) {
                const target = progress * Math.max(0, media.duration - 0.06);
                if (Math.abs(media.currentTime - target) > 0.025) media.currentTime = target;
            }
        }
        function schedule() { if (!frame) frame = requestAnimationFrame(update); }
        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        media.addEventListener("loadedmetadata", schedule);
        media.addEventListener("seeked", schedule);
        reduced.addEventListener("change", schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            media.removeEventListener("loadedmetadata", schedule);
            media.removeEventListener("seeked", schedule);
            reduced.removeEventListener("change", schedule);
        };
    }, []);

    return (
        <section ref={section} id="inicio" className={styles.hero}>
            <div className={styles.inner}>
                <div className={styles.copy}>
                    <h1>Ayudamos a decidir qué decir, a quién, y cómo convertirlo en ventas.</h1>
                    <p>Definimos el mensaje, ejecutamos la pauta y ponemos objetivos comerciales sobre la mesa.</p>
                </div>
                <div className={styles.artwork} aria-hidden="true">
                    <video ref={video} muted playsInline preload="auto" poster="/video/hero-poster.jpg">
                        <source src="/video/hero-sculpture.mp4" type="video/mp4" />
                    </video>
                </div>
                <span className={styles.cue}>Deslizá para explorar ↓</span>
            </div>
        </section>
    );
}

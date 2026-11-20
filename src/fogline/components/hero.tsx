"use client";
/* eslint-disable @next/next/no-img-element -- capas decorativas de la escena con tamaño fijo en coordenadas de Figma */

import { useEffect, useRef, useState } from "react";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import { hero, heroSteps, nav } from "../content";
import { Icon, Logo } from "./icons";

/**
 * Hero con scroll en 6 pasos (igual que el prototipo de Figma).
 * La sección mide 100svh + 6 tramos; adentro, la escena queda sticky.
 * El progreso del scroll define el paso (0–5) y cuánto avanzó dentro del paso,
 * que llena el anillo del indicador activo. Los cambios de paso se animan con
 * transiciones CSS (600 ms, ease in-out), como el Smart Animate del prototipo.
 */

const STAGE_W = 1440;
const STAGE_H = 900;
/** Pantalla del mockup por paso. */
const SCREEN = [1, 1, 2, 3, 4, 4];

export function Hero({ onStep }: { onStep: (step: number) => void }) {
    const ref = useRef<HTMLElement>(null);
    const [step, setStep] = useState(0);
    const lenis = useLenisInstance();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let last = -1;

        const layout = () => {
            const scale = Math.max(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
            el.style.setProperty("--fl-scale", String(scale));
        };
        const update = () => {
            const rect = el.getBoundingClientRect();
            const total = el.offsetHeight - window.innerHeight;
            const p = Math.min(1, Math.max(0, -rect.top / total));
            const s = Math.min(5, Math.floor(p * 6));
            el.style.setProperty("--fl-local", String(Math.min(1, p * 6 - s)));
            if (s !== last) {
                last = s;
                setStep(s);
                onStep(s);
            }
        };

        layout();
        update();
        window.addEventListener("resize", layout);
        if (lenis) {
            lenis.on("scroll", update);
        } else {
            window.addEventListener("scroll", update, { passive: true });
        }
        return () => {
            window.removeEventListener("resize", layout);
            if (lenis) lenis.off("scroll", update);
            else window.removeEventListener("scroll", update);
        };
    }, [lenis, onStep]);

    const card = step >= 1 && step <= 4 ? heroSteps[step - 1] : null;

    return (
        <section ref={ref} className="fl-hero" data-step={step} aria-label="Fogline">
            <div className="fl-hero__sticky">
                {/* Escena: escala desde el centro para cubrir cualquier pantalla */}
                <div className="fl-stage" aria-hidden="true">
                    <img className="fl-layer fl-back" src="/fogline/scene/back.webp" alt="" />
                    <div className="fl-mockup">
                        <div className="fl-mockup__screen">
                            {[1, 2, 3, 4].map((n) => (
                                <img
                                    key={n}
                                    src={`/fogline/ui/pantalla-${n}.webp`}
                                    alt=""
                                    className={SCREEN[step] === n ? "is-on" : ""}
                                />
                            ))}
                        </div>
                    </div>
                    <img className="fl-layer fl-colina" src="/fogline/scene/colina.webp" alt="" />
                    <img className="fl-layer fl-niebla fl-niebla--fondo" src="/fogline/scene/niebla.webp" alt="" />
                    <img className="fl-layer fl-niebla fl-niebla--frente" src="/fogline/scene/niebla.webp" alt="" />
                </div>

                <div className="fl-hero__logo">
                    <Logo />
                </div>

                {/* Texto del hero: sube y se desvanece al empezar el scroll */}
                <div className="fl-hero__copy">
                    <h1>{hero.title}</h1>
                    <p>{hero.lead}</p>
                    <a className="fl-btn fl-btn--primary fl-hero__mobile-cta" href="#">
                        <span className="fl-dot" /> {nav.cta}
                    </a>
                </div>

                {/* Card de vidrio del paso */}
                <div className={`fl-glass ${card ? "is-on" : ""}`} aria-live="polite">
                    {heroSteps.map((s, i) => (
                        <div key={s.title} className={`fl-glass__step ${step - 1 === i ? "is-on" : ""}`}>
                            <h2>{s.title}</h2>
                            <p>{s.body}</p>
                            <ul>
                                {s.chips.map((c) => (
                                    <li key={c}>{c}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Indicadores: el anillo del activo se llena con el scroll del paso */}
                <ol className={`fl-indicators ${card ? "is-on" : ""}`} aria-label="Pasos">
                    {heroSteps.map((s, i) => {
                        const state = step - 1 === i ? "active" : step - 1 > i ? "done" : "idle";
                        return (
                            <li key={s.icon} className={`fl-ind fl-ind--${state}`} aria-current={state === "active"}>
                                <svg className="fl-ind__ring" viewBox="0 0 44 44" aria-hidden="true">
                                    <circle cx="22" cy="22" r="20.5" pathLength={1} />
                                </svg>
                                <Icon name={s.icon} size={18} />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

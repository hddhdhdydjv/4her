"use client";
/* eslint-disable @next/next/no-img-element -- capas de la escena con tamaño fijo en coordenadas de Figma */

import { useEffect, useRef, useState } from "react";
import { hero, heroSteps, nav } from "../content";
import { gsap, useLenisScrollTrigger } from "../motion";
import { Fog, type FogHandle } from "./fog";
import { Icon, Logo } from "./icons";

/**
 * Hero scroll-driven. Todo sigue al scroll (scrub), nada salta:
 *  0 → 1  el texto sube, la píldora crece hasta ser navegación, el mockup sube y se enfoca.
 *  1 → 4  la card se mueve hasta la parte del producto que explica (pin) y su título
 *         se va pintando palabra por palabra; la niebla baja paso a paso.
 *  4 → 5  salida: se va la card; la escena completa sigue de largo con el scroll y se funde abajo en el crema.
 * Escena en coordenadas de Figma (1440 × 900), escalada por orientación.
 */

const W = 1440;
const H = 900;
const UNITS = 5;

/** Posición de la card y del pin (coordenadas de la escena) por paso. */
const SPOTS = [
    { card: { x: 548, y: 300 }, pin: { x: 972, y: 349 } },
    { card: { x: 380, y: 560 }, pin: { x: 311, y: 522 } },
    { card: { x: 560, y: 360 }, pin: { x: 453, y: 412 } },
    { card: { x: 560, y: 470 }, pin: { x: 1004, y: 475 } },
];

function Words({ text }: { text: string }) {
    return (
        <>
            {text.split(" ").map((w, i) => (
                <span key={i} className="fl-word">
                    {w}{" "}
                </span>
            ))}
        </>
    );
}

function CardBody() {
    return (
        <>
            {heroSteps.map((s, i) => (
                <div key={s.title} className="fl-card__step" data-i={i}>
                    <p className="fl-card__kicker">
                        <Icon name={s.icon} size={14} /> {i + 1} of 4
                    </p>
                    <h2>
                        <Words text={s.title} />
                    </h2>
                    <p className="fl-card__body">{s.body}</p>
                    <ul>
                        {s.chips.map((c) => (
                            <li key={c}>{c}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}

export function Hero() {
    const ref = useRef<HTMLElement>(null);
    const fog = useRef<FogHandle>({ density: 0.55 });
    const [active, setActive] = useState(-1);
    const lenis = useLenisScrollTrigger();

    // Encuadre de la escena según la orientación de la pantalla.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const stages = el.querySelectorAll<HTMLElement>(".fl-stage");
        const layout = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const portrait = vw / vh < 0.95;
            let s: number, tx: number, ty: number;
            if (!portrait) {
                s = Math.max(vw / W, vh / H);
                tx = (vw - W * s) / 2;
                ty = (vh - H * s) / 2;
            } else if (vw >= 600) {
                s = Math.max(vw / 1100, (vh * 0.62) / H);
                tx = (vw - W * s) / 2;
                ty = vh - H * s;
            } else {
                s = Math.max(vw / 760, (vh * 0.56) / H);
                tx = 16 - 205 * s;
                ty = vh - H * s;
            }
            stages.forEach((st) => (st.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`));
            el.dataset.layout = portrait ? "port" : "land";
        };
        layout();
        window.addEventListener("resize", layout);
        return () => window.removeEventListener("resize", layout);
    }, []);

    // Línea de tiempo atada al scroll.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const q = gsap.utils.selector(el);
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                scrollTrigger: {
                    trigger: el,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    onUpdate: (self) => {
                        const u = self.progress * UNITS;
                        const a = u < 0.75 || u > 4.6 ? -1 : Math.min(3, Math.floor(u - 0.7));
                        setActive((p) => (p === a ? p : a));
                    },
                },
            });

            // 0 → 1: llegada
            tl.fromTo(q(".fl-mockup"), { y: 0 }, { y: -360, duration: 1 }, 0)
                .fromTo(q(".fl-mockup"), { filter: "blur(3px)" }, { filter: "blur(1px)", duration: 1, ease: "none" }, 0)
                .to(q(".fl-mockup"), { filter: "blur(0px)", duration: 0.6, ease: "none" }, 1)
                .fromTo(q(".fl-indicators"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.6)
                .fromTo(q(".fl-card"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.7);

            // Niebla: baja con cada paso (la lee el shader en cada frame)
            tl.to(fog.current, { density: 0.42, duration: 1, ease: "none" }, 0)
                .to(fog.current, { density: 0.3, duration: 1, ease: "none" }, 1)
                .to(fog.current, { density: 0.2, duration: 1, ease: "none" }, 2)
                .to(fog.current, { density: 0.12, duration: 1, ease: "none" }, 3)
                .to(fog.current, { density: 0.04, duration: 0.6, ease: "none" }, 4.4);

            // Pasos 1–4
            heroSteps.forEach((_, i) => {
                const t = 1 + i; // inicio del paso
                const step = q(`.fl-card__step[data-i="${i}"]`);
                const words = q(`.fl-card__step[data-i="${i}"] .fl-word`);
                // la card viaja hasta su lugar (solo en horizontal)
                if (i > 0) tl.to(q(".fl-card--stage"), { x: SPOTS[i].card.x - SPOTS[0].card.x, y: SPOTS[i].card.y - SPOTS[0].card.y, duration: 0.6 }, t - 0.3);
                // cambio de contenido
                if (i > 0) tl.to(q(`.fl-card__step[data-i="${i - 1}"]`), { autoAlpha: 0, duration: 0.25 }, t - 0.3);
                tl.fromTo(step, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, i === 0 ? 0.75 : t - 0.3);
                // el título se pinta palabra por palabra
                tl.fromTo(words, { opacity: 0.18 }, { opacity: 1, stagger: 0.04, duration: 0.2, ease: "none" }, i === 0 ? 0.8 : t - 0.15);
                tl.fromTo(q(`.fl-card__step[data-i="${i}"] .fl-card__body, .fl-card__step[data-i="${i}"] li`), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.2 }, (i === 0 ? 0.8 : t - 0.15) + 0.2);
                // pin sobre la parte del producto
                tl.fromTo(q(`.fl-pin[data-i="${i}"]`), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.3 }, i === 0 ? 0.8 : t);
                if (i < 3) tl.to(q(`.fl-pin[data-i="${i}"]`), { autoAlpha: 0, duration: 0.2 }, t + 0.7);
                // anillo del indicador
                tl.fromTo(q(`.fl-ind[data-i="${i}"] circle`), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: "none" }, i === 0 ? 0.9 : t);
                // pantalla del mockup
                if (i > 0) tl.to(q(`.fl-screen[data-i="${i}"]`), { autoAlpha: 1, duration: 0.4 }, t - 0.2);
            });

            // 4.5 → 5: salida. El paisaje se queda y la escena entera sigue de largo
            // con el scroll; abajo se funde en el crema de la sección siguiente.
            tl.to(q(".fl-card, .fl-indicators, .fl-pin"), { autoAlpha: 0, duration: 0.35 }, 4.55);
        }, el);
        return () => ctx.revert();
    }, []);

    // Como en Assemble: el botón sube 1:1 con la página, al llegar arriba se queda
    // pegado y recién ahí se estira hasta ser la navegación. El texto y el header
    // del hero también se van 1:1 con el scroll.
    useEffect(() => {
        const el = ref.current;
        const pill = document.querySelector<HTMLElement>(".fl-pill");
        if (!el || !pill) return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const start = () => Math.min(400, window.innerHeight * 0.46);
            const travel = () => start() - 20;
            // 1. sube con la página
            gsap.fromTo(pill, { top: start }, {
                top: 20,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top top", end: () => `+=${travel()}`, scrub: true, invalidateOnRefresh: true },
            });
            // 2. pegada arriba, se estira hasta ser la navegación
            gsap.timeline({
                scrollTrigger: { trigger: el, start: () => `top top-=${travel()}`, end: () => `+=${Math.max(200, window.innerHeight * 0.25)}`, scrub: 0.4, invalidateOnRefresh: true },
            })
                .fromTo(pill, { width: 156 }, { width: 448, ease: "power2.inOut", duration: 1 }, 0)
                .fromTo(pill.querySelector(".fl-pill__links"), { autoAlpha: 0, maxWidth: 0 }, { autoAlpha: 1, maxWidth: 300, duration: 0.7 }, 0.25)
                .fromTo(pill.querySelector(".fl-pill__cta"), { color: "#ffffff" }, { color: "#f1fd82", duration: 0.5 }, 0.4)
                .fromTo(pill.querySelector(".fl-pill__cta svg"), { width: 0 }, { width: 14, duration: 0.5 }, 0.4);
        });
        // Texto y header del hero: suben 1:1 y se apagan al final del recorrido
        const dist = () => window.innerHeight * 0.6;
        gsap.fromTo(el.querySelectorAll(".fl-hero__copy, .fl-hero__header"), { y: 0 }, {
            y: () => -dist(),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true },
        });
        gsap.fromTo(el.querySelectorAll(".fl-hero__copy, .fl-hero__header"), { autoAlpha: 1 }, {
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: () => `top top-=${dist() * 0.45}`, end: () => `+=${dist() * 0.55}`, scrub: true, invalidateOnRefresh: true },
        });
        return () => mm.revert();
    }, []);

    const goTo = (i: number) => {
        const el = ref.current;
        if (!el || !lenis) return;
        const total = el.offsetHeight - window.innerHeight;
        const top = el.getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(top + ((1.4 + i) / UNITS) * total, { duration: 1.2 });
    };

    return (
        <section ref={ref} className="fl-hero" aria-label="Fogline">
            <div className="fl-hero__sticky">
                <div className="fl-stage" aria-hidden="true">
                    <img className="fl-back" src="/fogline/scene/back.webp" alt="" />
                    <div className="fl-mockup">
                        <div className="fl-mockup__screen">
                            {[1, 2, 3, 4].map((n, i) => (
                                <img key={n} src={`/fogline/ui/pantalla-${n}.webp`} alt="" className="fl-screen" data-i={i} />
                            ))}
                        </div>
                    </div>
                    <img className="fl-colina" src="/fogline/scene/colina.webp" alt="" />
                </div>

                <Fog handle={fog} />

                {/* Capa delantera: misma escala que la escena, por encima de la niebla */}
                <div className="fl-stage fl-stage--front">
                    {SPOTS.map((s, i) => (
                        <span key={i} className="fl-pin" data-i={i} style={{ left: s.pin.x, top: s.pin.y }} />
                    ))}
                    <div className="fl-card fl-card--stage" style={{ left: SPOTS[0].card.x, top: SPOTS[0].card.y }}>
                        <CardBody />
                    </div>
                </div>

                <div className="fl-card fl-card--panel">
                    <CardBody />
                </div>

                <header className="fl-hero__header">
                    <Logo />
                    <nav aria-label="Account">
                        <a href="#">Pricing</a>
                        <a href="#">Log in</a>
                        <a href="#" className="fl-btn fl-btn--primary fl-btn--sm">
                            Book a demo <Icon name="arrow" size={14} />
                        </a>
                    </nav>
                </header>

                <div className="fl-hero__copy">
                    <h1>{hero.title}</h1>
                    <p>{hero.lead}</p>
                    <a className="fl-btn fl-btn--primary fl-hero__mobile-cta" href="#">
                        <span className="fl-dot" /> {nav.cta}
                    </a>
                </div>

                <ol className="fl-indicators" aria-label="Steps">
                    {heroSteps.map((s, i) => (
                        <li key={s.icon} className={`fl-ind ${active === i ? "is-active" : active > i ? "is-done" : ""}`} data-i={i}>
                            <button type="button" onClick={() => goTo(i)} aria-label={s.title} aria-current={active === i}>
                                <svg className="fl-ind__ring" viewBox="0 0 44 44" aria-hidden="true">
                                    <circle cx="22" cy="22" r="20.5" pathLength={1} />
                                </svg>
                                <Icon name={s.icon} size={18} />
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

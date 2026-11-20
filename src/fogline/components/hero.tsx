"use client";
/* eslint-disable @next/next/no-img-element -- capas de la escena con tamaño fijo en coordenadas de Figma */

import { useEffect, useRef, useState } from "react";
import { hero, heroSteps, nav } from "../content";
import { gsap, ScrollTrigger, useLenisScrollTrigger } from "../motion";
import { Fog, type FogHandle } from "./fog";
import { Icon } from "./icons";

/**
 * Hero scroll-driven (como la sección de notas de interacción de Figma, 399:13891):
 *  0 → 1  el texto sube, la píldora se estira hasta ser navegación, el mockup sube,
 *         se le va el desenfoque progresivo de abajo y la niebla se disipa.
 *  1 → 4  en cada paso el elemento que importa "se levanta" del mockup con sombra,
 *         el resto se apaga y se desenfoca un poco, y el cursor lima guía la vista
 *         y hace clic. La card de vidrio queda fija en la esquina con el texto que
 *         se pinta palabra por palabra.
 *  4 → 5  salida: la escena completa sigue de largo con el scroll.
 * Coordenadas de la escena = las del frame de Figma (1440 × 900).
 */

const W = 1440;
const H = 900;
const UNITS = 5;
/** El mockup arranca en y 480 (debajo del botón Start free) y sube hasta 140. */
const MOCKUP = { x: 205, y: 140, rise: 340, w: 1031 };
/** Escala de la pantalla dentro del mockup: 1005 px de ancho útil para una UI de 1280. */
const K = (MOCKUP.w - 2 - 24) / 1280;
const INSET = 13; // borde + padding del mockup

type Pop = { pantalla: number; src: [number, number, number, number]; grow: number; live?: boolean };
/** Lo que se levanta en cada paso: recorte de la pantalla (coords de la UI 1280×840) que crece en su lugar. */
const POPS: Pop[][] = [
    [{ pantalla: 1, src: [916, 225, 340, 254], grow: 1.12, live: true }],
    [
        { pantalla: 2, src: [81, 475, 694, 280], grow: 1.06 },
        { pantalla: 2, src: [916, 225, 340, 198], grow: 1.1 },
    ],
    [
        { pantalla: 3, src: [81, 531, 694, 128], grow: 1.06 },
        { pantalla: 3, src: [916, 225, 340, 166], grow: 1.1 },
    ],
    [{ pantalla: 4, src: [916, 225, 340, 256], grow: 1.12 }],
];

/** Rectángulo del recorte en su lugar (n) y ya agrandado (t), en coords del mockup. */
function popRect(p: Pop) {
    const [ux, uy, uw, uh] = p.src;
    const n = { x: INSET + ux * K, y: INSET + uy * K, w: uw * K, h: uh * K };
    const w = n.w * p.grow;
    const h = n.h * p.grow;
    const x = Math.min(Math.max(n.x - (w - n.w) / 2, 4), MOCKUP.w - 4 - w);
    const y = n.y - (h - n.h) / 2;
    return { n, t: { x, y, w, h }, k: w / uw };
}

/** Dónde hace clic el cursor en cada paso, en coords de la UI (como en Figma): logo del panel de review, Apply fix, Resolved y Merge. */
const CLICKS: { pop: number; ui: [number, number] }[] = [
    { pop: 0, ui: [956, 268] },
    { pop: 0, ui: [150, 716] },
    { pop: 0, ui: [208, 560] },
    { pop: 0, ui: [1086, 438] },
];
const CURSOR = CLICKS.map(({ pop, ui }, i) => {
    const p = POPS[i][pop];
    const { t, k } = popRect(p);
    return [MOCKUP.x + t.x + (ui[0] - p.src[0]) * k, MOCKUP.y + t.y + (ui[1] - p.src[1]) * k];
});

/** Paso 1: la barra de review se completa y los checks se marcan con el scroll (coords de la UI). */
const REVIEW = { bar: [936, 307, 300, 8], checks: [333, 369, 405, 441].map((y) => [936, y]) };

function LiveReview({ p, k }: { p: Pop; k: number }) {
    const at = (x: number, y: number) => ({ left: (x - p.src[0]) * k, top: (y - p.src[1]) * k });
    const [bx, by, bw, bh] = REVIEW.bar;
    return (
        <>
            <span className="fl-live-bar" style={{ ...at(bx, by), width: bw * k, height: bh * k }}>
                <span />
            </span>
            {REVIEW.checks.map(([x, y], i) => (
                <span key={i} className="fl-live-check" style={{ ...at(x, y), width: 16 * k, height: 16 * k }}>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M5 8.2 7 10.2 11 6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            ))}
        </>
    );
}

function PopCrop({ p }: { p: Pop }) {
    const { t, k } = popRect(p);
    return (
        <div
            className="fl-pop"
            style={{
                left: t.x,
                top: t.y,
                width: t.w,
                height: t.h,
                backgroundImage: `url(/fogline/ui/pantalla-${p.pantalla}.webp)`,
                backgroundSize: `${1280 * k}px auto`,
                backgroundPosition: `${-p.src[0] * k}px ${-p.src[1] * k}px`,
            }}
        >
            {p.live && <LiveReview p={p} k={k} />}
        </div>
    );
}

/** Cursor de Figma (la punta queda en 0,0 del contenedor). */
function Cursor() {
    return (
        <svg className="fl-cursor" width="26" height="30" viewBox="0 0 26 30" fill="none" aria-hidden="true">
            <path
                d="M19.6084 9.96946C20.813 10.4587 20.7211 12.194 19.4716 12.5532L13.1662 14.3657L10.2864 20.2605C9.71567 21.4287 7.9907 21.2179 7.71811 19.9466L4.78249 6.25634C4.5521 5.18192 5.61782 4.28768 6.6359 4.70114L19.6084 9.96946Z"
                fill="#F1FD82"
                stroke="#000"
                strokeWidth="1.5"
            />
        </svg>
    );
}

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
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const jumping = useRef(false);

    // Encuadre de la escena según la orientación de la pantalla.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const stages = el.querySelectorAll<HTMLElement>(".fl-stage");
        let lastW = 0;
        let lastH = 0;
        const layout = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // En el celu la barra del navegador cambia el alto al scrollear: eso no reencuadra la escena (si no, salta).
            if (vw === lastW && Math.abs(vh - lastH) < 160) return;
            lastW = vw;
            lastH = vh;
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
            tl.fromTo(q(".fl-mockup"), { y: 0 }, { y: -MOCKUP.rise, duration: 1 }, 0)
                .fromTo(q(".fl-mockup__veil"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.8, ease: "none" }, 0)
                .fromTo(q(".fl-indicators"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.6)
                .fromTo(q(".fl-card"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.7)
                .fromTo(q(".fl-dim"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.75)
                .fromTo(q(".fl-screen"), { filter: "blur(0px)" }, { filter: "blur(1.2px)", duration: 0.4 }, 0.75)
                .fromTo(q(".fl-cursor-wrap"), { autoAlpha: 0, x: CURSOR[0][0] + 80, y: CURSOR[0][1] + 120 }, { autoAlpha: 1, x: CURSOR[0][0], y: CURSOR[0][1], duration: 0.4 }, 0.75);

            tlRef.current = tl;

            // Paso 1: la barra de review se completa y se marcan los checks
            tl.fromTo(q(".fl-live-bar > span"), { scaleX: 0.06 }, { scaleX: 1, duration: 0.6, ease: "none" }, 1.0);
            q(".fl-live-check svg").forEach((c, j) => {
                tl.fromTo(c.parentElement, { backgroundColor: "#f5f3ec" }, { backgroundColor: "#16b364", duration: 0.08, ease: "none" }, 1.05 + j * 0.15).fromTo(c, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.1, ease: "back.out(2)" }, 1.05 + j * 0.15);
            });

            // La niebla se disipa al empezar el scroll
            tl.to(fog.current, { density: 0.12, duration: 0.8, ease: "none" }, 0).to(fog.current, { density: 0, duration: 0.6, ease: "none" }, 0.8);

            // Pasos 1–4
            heroSteps.forEach((_, i) => {
                const t = 1 + i; // inicio del paso
                const start = i === 0 ? 0.8 : t - 0.3;
                const words = q(`.fl-card__step[data-i="${i}"] .fl-word`);
                // texto de la card: cambia y se pinta palabra por palabra
                if (i > 0) tl.to(q(`.fl-card__step[data-i="${i - 1}"]`), { autoAlpha: 0, duration: 0.25 }, start);
                tl.fromTo(q(`.fl-card__step[data-i="${i}"]`), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, start);
                tl.fromTo(words, { opacity: 0.18 }, { opacity: 1, stagger: 0.04, duration: 0.2, ease: "none", immediateRender: false }, start + 0.1);
                tl.fromTo(q(`.fl-card__step[data-i="${i}"] .fl-card__body, .fl-card__step[data-i="${i}"] li`), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.2, immediateRender: false }, start + 0.3);
                // pantalla del mockup
                if (i > 0) tl.to(q(`.fl-screen[data-i="${i}"]`), { autoAlpha: 1, duration: 0.3 }, start);
                // lo que importa crece en su lugar, como si se levantara de la UI
                POPS[i].forEach((p, j) => {
                    const { n, t: r } = popRect(p);
                    const sel = q(`.fl-pops[data-i="${i}"] .fl-pop`)[j];
                    const from = { scale: 1 / p.grow, x: n.x + n.w / 2 - (r.x + r.w / 2), y: n.y + n.h / 2 - (r.y + r.h / 2) };
                    tl.fromTo(sel, { autoAlpha: 0, ...from }, { autoAlpha: 1, duration: 0.04, ease: "none", immediateRender: false }, start + 0.1 + j * 0.06)
                        .fromTo(sel, from, { scale: 1, x: 0, y: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, start + 0.1 + j * 0.06);
                    if (i < POPS.length - 1) tl.to(sel, { ...from, autoAlpha: 0, duration: 0.25, ease: "power2.in" }, start + 1 - 0.3);
                });
                // el cursor viaja hasta lo que importa y hace clic
                if (i > 0) tl.to(q(".fl-cursor-wrap"), { x: CURSOR[i][0], y: CURSOR[i][1], duration: 0.4 }, start + 0.05);
                tl.fromTo(q(".fl-cursor"), { scale: 1 }, { scale: 0.78, duration: 0.07, yoyo: true, repeat: 1, ease: "power1.inOut", immediateRender: false }, start + 0.5);
                tl.fromTo(q(".fl-cursor-ring"), { scale: 0.2, autoAlpha: 1 }, { scale: 1.5, autoAlpha: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, start + 0.52);
                tl.fromTo(q(`.fl-pops[data-i="${i}"] .fl-pop`)[CLICKS[i].pop], { filter: "brightness(1)" }, { filter: "brightness(0.96)", duration: 0.07, yoyo: true, repeat: 1, immediateRender: false }, start + 0.5);
                // el anillo del indicador se completa mientras dura el paso
                tl.fromTo(q(`.fl-ind[data-i="${i}"] .fl-ind__fill`), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: i === 0 ? 0.9 : 1, ease: "none", immediateRender: i === 0 }, start);
            });

            // 4.5 → 5: salida. La escena entera sigue de largo con el scroll.
            tl.to(q(".fl-card, .fl-indicators, .fl-cursor-wrap, .fl-pops, .fl-dim"), { autoAlpha: 0, duration: 0.35 }, 4.55)
                .to(q(".fl-screen"), { filter: "blur(0px)", duration: 0.35 }, 4.55);
        }, el);
        return () => {
            tlRef.current = null;
            ctx.revert();
        };
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
            // el botón arranca justo debajo del texto del hero
            const start = () => {
                const copy = el.querySelector<HTMLElement>(".fl-hero__copy p");
                return copy ? Math.round(copy.getBoundingClientRect().bottom + window.scrollY - el.offsetTop + 28) : 360;
            };
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
                .fromTo(pill, { width: 132 }, { width: 448, ease: "power2.inOut", duration: 1 }, 0)
                .fromTo(pill.querySelector(".fl-pill__links"), { autoAlpha: 0, maxWidth: 0, paddingRight: 0 }, { autoAlpha: 1, maxWidth: 300, paddingRight: 22, duration: 0.7 }, 0.25)
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

    // Al mover el mouse, las capas de la ilustración se corren un poquito (profundidad)
    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
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
        window.addEventListener("pointermove", onMove, { passive: true });
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
        };
    }, []);

    /** Ir a un paso desde los indicadores: se disuelve, salta y vuelve a aparecer (sin rebobinar todo el recorrido). */
    const goTo = (i: number) => {
        const el = ref.current;
        if (!el || !lenis || jumping.current) return;
        const total = el.offsetHeight - window.innerHeight;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const target = top + ((1.4 + i) / UNITS) * total;
        const veil = el.querySelector(".fl-hero__fade");
        jumping.current = true;
        gsap.timeline({ onComplete: () => void (jumping.current = false) })
            .to(veil, { autoAlpha: 1, duration: 0.35, ease: "power2.out" })
            .add(() => {
                lenis.scrollTo(target, { immediate: true, force: true });
                ScrollTrigger.update();
                tlRef.current?.scrollTrigger?.getTween()?.progress(1);
            })
            .to(veil, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.08");
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
                            {/* El resto de la interfaz se apaga y se desenfoca un poco */}
                            <div className="fl-dim" />
                        </div>
                        {POPS.map((group, i) => (
                            <div key={i} className="fl-pops" data-i={i}>
                                {group.map((p, j) => (
                                    <PopCrop key={j} p={p} />
                                ))}
                            </div>
                        ))}
                        {/* Desenfoque progresivo de abajo hacia arriba en la llegada (capas apiladas) */}
                        <div className="fl-mockup__veil">
                            {[0, 1, 2, 3, 4].map((n) => (
                                <span key={n} />
                            ))}
                        </div>
                    </div>
                    <img className="fl-colina" src="/fogline/scene/colina-dither.webp" alt="" />
                </div>

                <Fog handle={fog} />

                {/* Capa delantera: el cursor que guía la vista */}
                <div className="fl-stage fl-stage--front">
                    <div className="fl-cursor-wrap">
                        <span className="fl-cursor-ring" />
                        <Cursor />
                    </div>
                </div>

                <div className="fl-card">
                    <CardBody />
                </div>

                <header className="fl-hero__header">
                    <nav aria-label="Account">
                        <a href="#">Pricing</a>
                        <a href="#">Log in</a>
                        <a href="#" className="fl-btn fl-btn--primary fl-btn--sm">
                            Book a demo <Icon name="arrow" size={14} />
                        </a>
                    </nav>
                </header>

                <div className="fl-hero__copy">
                    <h1>
                        {hero.titleLines[0]}
                        <br />
                        {hero.titleLines[1]}
                    </h1>
                    <p>{hero.lead}</p>
                    <a className="fl-btn fl-btn--primary fl-hero__mobile-cta" href="#">
                        <span className="fl-dot" /> {nav.cta}
                    </a>
                </div>

                {/* Fundido al saltar de paso con los indicadores */}
                <div className="fl-hero__fade" aria-hidden="true" />

                <ol className="fl-indicators" aria-label="Steps">
                    {heroSteps.map((s, i) => (
                        <li key={s.icon} className={`fl-ind ${active === i ? "is-active" : active > i ? "is-done" : ""}`} data-i={i}>
                            <button type="button" onClick={() => goTo(i)} aria-label={s.title} aria-current={active === i}>
                                <svg className="fl-ind__ring" viewBox="0 0 44 44" aria-hidden="true">
                                    <circle className="fl-ind__track" cx="22" cy="22" r="20.5" />
                                    <circle className="fl-ind__fill" cx="22" cy="22" r="20.5" pathLength={1} />
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

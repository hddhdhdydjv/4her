"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import styles from "./services.module.css";

const services = [
  { title: "Posicionamiento de marca", short: <>Posicionamiento<br />de marca</>, body: "Definimos el territorio de marca, el tono de comunicación y la propuesta de valor que te diferencia de tu competencia.", detail: "Lo bajamos a un manual aplicable a cada pieza que produzcas.", icon: ["M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"], x: 40, y: 30, path: "M300 260 C240 260 260 120 150 120" },
  { title: "Marketing digital y campañas", short: <>Marketing digital<br />y campañas</>, body: "Diseñamos, ejecutamos y optimizamos campañas en los canales donde está tu cliente.", detail: "Orientadas a un objetivo concreto: leads, tráfico calificado o ventas directas.", icon: ["M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z", "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14", "M8 6v8"], x: 30, y: 395, path: "M320 340 C210 340 270 485 140 485" },
  { title: "Estrategia comercial", short: <>Estrategia<br />comercial</>, body: "Miramos tu embudo de ventas de punta a punta e identificamos dónde se pierden oportunidades.", detail: "Armamos un plan comercial con objetivos trimestrales medibles.", icon: ["M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"], x: 545, y: 405, path: "M460 345 C550 345 510 495 655 495" },
  { title: "Gestión del Sello Verde", short: <>Gestión del<br />Sello Verde</>, body: "Acompañamos todo el trámite: diagnóstico de las prácticas actuales, documentación, implementación de las mejoras que falten y seguimiento hasta la certificación.", detail: "Un requisito cada vez más pedido en licitaciones y por grandes cuentas.", icon: ["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z", "m9 12 2 2 4-4"], x: 535, y: 35, path: "M465 255 C535 255 495 125 645 125" },
];

// Icon paths: Lucide (ISC), vendored to keep the site's dependencies unchanged.
export function Services() {
  const track = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const lenis = useLenisInstance();

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const box = element.getBoundingClientRect();
      const distance = element.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -box.top / Math.max(1, distance)));
      if (!reduced) setActive(Math.min(3, Math.floor(progress * 4)));
      if (scene.current) {
        scene.current.style.setProperty("--turn", `${-12 + progress * 5}deg`);
        scene.current.style.setProperty("--tilt", `${28 + Math.sin(progress * Math.PI) * 4}deg`);
      }
    };
    const update = () => { if (!raf) raf = requestAnimationFrame(read); };
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(element);
    read();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [reduced]);

  function select(index: number) {
    if (reduced) { setActive(index); return; }
    const el = track.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const target = top + (index + 0.15) / 4 * (el.offsetHeight - window.innerHeight);
    if (lenis) lenis.scrollTo(target, { duration: 0.9 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  return <section id="servicios" ref={track} className={styles.track} aria-labelledby="services-heading" data-active={active} data-visible={visible}>
    <div className={styles.sticky}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Nuestros servicios</p>
        <h2 id="services-heading">Todo conectado.<br /><span>Todo con intención.</span></h2>
        <p>Servicios que se combinan según lo que tu marca necesita.</p>
      </header>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <div className={styles.steps} aria-label="Elegir servicio">
            {services.map((s, i) => <button key={s.title} type="button" aria-label={s.title} aria-pressed={i === active} onClick={() => select(i)} className={i === active ? styles.currentStep : ""}><span>0{i + 1}</span><i /></button>)}
          </div>
          <div className={styles.panels}>
            {services.map((s, i) => <article key={s.title} aria-hidden={i !== active} className={`${styles.panel} ${i === active ? styles.activePanel : ""}`}>
              <h3>{s.title}</h3><p>{s.body}</p><p className={styles.detail}>{s.detail}</p>
            </article>)}
          </div>
          <a className={styles.cta} href="#contacto">Hacé tu consulta <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.graph}>
          <div className={styles.scene} ref={scene}>
            <svg className={styles.connections} viewBox="0 0 800 640" fill="none" aria-hidden="true">
              {services.map((s, i) => <g key={s.title} className={i === active ? styles.activeConnection : ""}>
                <path className={styles.wireShadow} d={s.path} /><path className={styles.wire} d={s.path} />
                <path className={styles.signal} pathLength="100" d={s.path} />
              </g>)}
            </svg>
            <div className={`${styles.tilePosition} ${styles.hubPosition}`}>
              <div className={`${styles.tile} ${styles.hub}`}><div className={styles.glassBase} /><div className={styles.surface}>
                {/* Original supplied SVG: no generated substitute. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Isotipo.svg" alt="4her" width="100" height="100" />
              </div></div>
            </div>
            {services.map((s, i) => <div key={s.title} className={`${styles.tilePosition} ${i === active ? styles.activePosition : ""}`} style={{ left: `${s.x / 8}%`, top: `${s.y / 6.4}%`, "--delay": `${-i * 1.3}s` } as CSSProperties}>
              <button type="button" onClick={() => select(i)} aria-label={s.title} aria-pressed={i === active} className={styles.tile}>
                <span className={styles.glassBase} />
                <span className={styles.surface}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{s.icon.map(d => <path d={d} key={d} />)}</svg>
                  <span className={styles.tileLabel}>{s.short}</span>
                  <span className={styles.tileNumber}>0{i + 1}</span>
                </span>
              </button>
            </div>)}
          </div>
          <p className={styles.graphCaption}><span className={styles.scrollMark} aria-hidden="true" />Vos elegís por dónde empezar</p>
        </div>
      </div>
    </div>
  </section>;
}

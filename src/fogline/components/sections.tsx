import { Reveal } from "@/components/motion/reveal";
import { clients, featureArt, features, footer, metrics, nav, testimonials } from "../content";
import { Icon, Logo } from "./icons";
import { ScrubText } from "./scrub-text";
import { FooterScene } from "./footer-scene";

/* eslint-disable @next/next/no-img-element */

/** Píldora fija: arranca como botón y el scroll del hero la estira hasta ser la navegación. */
export function NavPill() {
    return (
        <nav className="fl-pill" aria-label="Main">
            <span className="fl-pill__logo">
                <Logo dark size={18} />
            </span>
            <span className="fl-dot" aria-hidden="true" />
            <ul className="fl-pill__links">
                {nav.links.map((l, i) => (
                    <li key={l} className={i === 0 ? "is-active" : ""}>
                        <a href="#">{l}</a>
                    </li>
                ))}
            </ul>
            <a href="#" className="fl-pill__cta">
                {nav.cta} <Icon name="arrow" size={14} />
            </a>
            <button type="button" className="fl-pill__menu" aria-label="Menú">
                <Icon name="menu" size={18} />
            </button>
        </nav>
    );
}

export function Clients() {
    return (
        <section className="fl-section fl-clients" aria-labelledby="fl-clients">
            <div className="fl-container">
                <ScrubText id="fl-clients" lead={clients.lead} rest={clients.rest} className="fl-h-lg fl-measure-xl" />
            </div>
            <div className="fl-marquee" role="list">
                {clients.rows.map((row, r) => (
                    <div key={r} className={`fl-marquee__row ${r % 2 ? "fl-marquee__row--rev" : ""}`}>
                        {/* La fila se repite para que el loop no tenga corte; la copia es solo visual */}
                        {[0, 1, 2, 3].map((copy) => (
                            <div key={copy} className="fl-marquee__track" aria-hidden={copy > 0}>
                                {row.map((l) => (
                                    <a
                                        key={l}
                                        role="listitem"
                                        href={clients.url(l)}
                                        className="fl-logo-cell"
                                        tabIndex={copy > 0 ? -1 : 0}
                                        aria-label={l}
                                    >
                                        <img src={`/fogline/brand/${l}.svg`} alt="" height={26} />
                                        <span className="fl-logo-cell__arrow" aria-hidden="true">
                                            <Icon name="arrow-up-right" size={14} />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

/** Fragmento de UI de cada card de features, con las medidas del frame de Figma (card de 596 × 440 o 389 × 360). */
function FeatureArt({ art }: { art: (typeof features.cards)[number]["art"] }) {
    if (art === "rules" || art === "summary") {
        // Mockup grande: entra desde el borde y se desenfoca hacia los costados (bokeh)
        return (
            <div className={`fl-art fl-art--shot fl-art--${art}`} aria-hidden="true">
                <div className="fl-art__frame" />
                <img className="fl-art__screen" src={`/fogline/features/${art}.webp`} alt="" loading="lazy" />
                <div className="fl-art__bokeh" />
            </div>
        );
    }
    return (
        <div className="fl-art fl-art--panel" aria-hidden="true">
            {art === "severity" &&
                featureArt.severity.map((f) => (
                    <div key={f.title} className="fl-art__row">
                        <span>{f.title}</span>
                        <span className={`fl-sev fl-sev--${f.level}`}>{f.level[0].toUpperCase() + f.level.slice(1)}</span>
                    </div>
                ))}
            {art === "roles" &&
                featureArt.roles.map((r) => (
                    <div key={r.name} className="fl-art__row fl-art__row--plain">
                        <span className="fl-art__who">
                            {r.photo ? <img src={r.photo} alt="" width={28} height={28} /> : <img src="/fogline/brand/isotipo.svg" alt="" width={28} height={28} className="is-logo" />}
                            <span>
                                <b>{r.name}</b>
                                <small>{r.role}</small>
                            </span>
                        </span>
                        <span className="fl-art__status">{r.status}</span>
                    </div>
                ))}
            {art === "privacy" &&
                featureArt.privacy.map((t) => (
                    <div key={t.label} className={`fl-art__row ${t.on ? "" : "is-off"}`}>
                        <span>{t.label}</span>
                        <span className={`fl-toggle ${t.on ? "is-on" : ""}`} />
                    </div>
                ))}
        </div>
    );
}

export function Features() {
    return (
        <section className="fl-section" aria-labelledby="fl-features">
            <div className="fl-container fl-stack-72">
                <ScrubText lead={features.lead} rest={features.rest} className="fl-h-lg fl-measure-lg" />
                <div className="fl-features">
                    {features.cards.map((c, i) => (
                        <Reveal key={c.lead} delay={(i % 3) * 80} className={`fl-feature fl-feature--${c.size}`}>
                            <h3>
                                {c.lead} <span className="fl-muted">{c.rest}</span>
                            </h3>
                            <FeatureArt art={c.art} />
                            <span className="fl-chip-arrow" aria-hidden="true">
                                <Icon name="arrow" size={16} />
                            </span>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/** Resultados (Figma 422:18496): encabezado a lo ancho, isotipo grande a la izquierda y las métricas en la columna derecha. */
export function Metrics() {
    return (
        <section className="fl-section fl-metrics" aria-labelledby="fl-metrics">
            <div className="fl-container">
                <div className="fl-metrics__head">
                    <ScrubText id="fl-metrics" lead={metrics.lead} rest={metrics.rest} breakBetween className="fl-h-lg" />
                    <Reveal as="p" className="fl-metrics__intro">
                        {metrics.intro}
                    </Reveal>
                </div>
                <div className="fl-metrics__body">
                    <div className="fl-metrics__art" aria-hidden="true">
                        <img src="/fogline/brand/isotipo.svg" alt="" />
                    </div>
                    <ul className="fl-metrics__rows">
                        {metrics.rows.map((m, i) => (
                            <Reveal as="li" key={m.title} delay={i * 80} className="fl-metric">
                                <div className="fl-metric__text">
                                    <img src="/fogline/brand/isotipo.svg" alt="" width={22} height={22} />
                                    <div>
                                        <h3>{m.title}</h3>
                                        <p>{m.body}</p>
                                    </div>
                                </div>
                                <p className="fl-metric__value">
                                    {m.value}
                                    <span>{m.unit}</span>
                                </p>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export function Testimonials() {
    return (
        <section className="fl-section" aria-labelledby="fl-testimonials">
            <div className="fl-container fl-stack-80">
                <ScrubText id="fl-testimonials" lead={testimonials.lead} rest={testimonials.rest} breakBetween className="fl-h-lg" />
                <ul className="fl-testimonials">
                    {testimonials.items.map((t, i) => (
                        <Reveal as="li" key={t.name} delay={(i % 2) * 80} className="fl-testimonial">
                            <blockquote>{t.quote}</blockquote>
                            <div className="fl-testimonial__foot">
                                <div className="fl-person">
                                    <img src={t.photo} alt="" width={40} height={40} />
                                    <div>
                                        <p className="fl-person__name">{t.name}</p>
                                        <p className="fl-person__role">{t.role}</p>
                                    </div>
                                </div>
                                <img className="fl-testimonial__logo" src={`/fogline/brand/${t.company}.svg`} alt={t.company} height={32} />
                            </div>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="fl-footer">
            <FooterScene />
            <div className="fl-footer__panel">
                <div className="fl-container">
                    <div className="fl-footer__brand">
                        <div>
                            <Logo size={32} />
                            <p className="fl-lead">{footer.tagline}</p>
                        </div>
                        <a className="fl-btn fl-btn--primary" href="#">
                            <span className="fl-dot" /> {nav.cta}
                        </a>
                    </div>
                    <div className="fl-footer__links">
                        {footer.columns.map((c) => (
                            <div key={c.title} className="fl-footer__col">
                                <p className="fl-footer__head">{c.title}</p>
                                <ul>
                                    {c.links.map((l) => (
                                        <li key={l}>
                                            <a href="#">
                                                {l} <Icon name="arrow-up-right" size={14} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="fl-footer__legal">
                        <p>{footer.legal}</p>
                        <ul>
                            {footer.social.map((s) => (
                                <li key={s}>
                                    <a href="#">{s}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

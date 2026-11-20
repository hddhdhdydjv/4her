import { Reveal } from "@/components/motion/reveal";
import { clients, features, footer, metrics, nav, testimonials } from "../content";
import { Icon, Logo } from "./icons";

/* eslint-disable @next/next/no-img-element */

function TwoTone({ lead, rest, as: Tag = "h2", className }: { lead: string; rest: string; as?: "h2" | "h3"; className?: string }) {
    return (
        <Tag className={className}>
            {lead} <span className="fl-muted">{rest}</span>
        </Tag>
    );
}

/** Píldora fija: botón en la llegada, navegación desde el paso 2. */
export function NavPill({ mode }: { mode: "button" | "nav" }) {
    return (
        <nav className={`fl-pill fl-pill--${mode}`} aria-label="Principal">
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
        <section className="fl-section" aria-labelledby="fl-clients">
            <div className="fl-container fl-stack-56">
                <Reveal>
                    <h2 id="fl-clients" className="fl-h-lg fl-measure-lg">
                        {clients.lead} <span className="fl-muted">{clients.rest}</span>
                    </h2>
                    <a className="fl-link" href="#">
                        {clients.link} <Icon name="arrow" size={14} />
                    </a>
                </Reveal>
                <Reveal delay={80}>
                    <ul className="fl-logo-wall">
                        {clients.logos.map((l, i) => (
                            <li key={i} className="fl-logo-cell">
                                <img src={`/fogline/brand/${l}.svg`} alt={l} height={32} />
                                <span className="fl-logo-cell__arrow" aria-hidden="true">
                                    <Icon name="arrow" size={14} />
                                </span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}

export function Features() {
    return (
        <section className="fl-section" aria-labelledby="fl-features">
            <div className="fl-container fl-stack-72">
                <Reveal>
                    <TwoTone lead={features.lead} rest={features.rest} className="fl-h-lg fl-measure-lg" />
                </Reveal>
                <div className="fl-features">
                    {features.cards.map((c, i) => (
                        <Reveal key={c.lead} delay={(i % 3) * 80} className={`fl-feature fl-feature--${c.size}`}>
                            <img className="fl-feature__img" src={c.img} alt="" loading="lazy" />
                            <h3>
                                {c.lead} <span className="fl-muted">{c.rest}</span>
                            </h3>
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

export function Metrics() {
    return (
        <section className="fl-section fl-metrics" aria-labelledby="fl-metrics">
            <img className="fl-metrics__iso" src="/fogline/brand/isotipo.svg" alt="" aria-hidden="true" />
            <div className="fl-container">
                <Reveal className="fl-metrics__head">
                    <TwoTone lead={metrics.lead} rest={metrics.rest} className="fl-h-lg" />
                    <p className="fl-lead">{metrics.intro}</p>
                </Reveal>
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
        </section>
    );
}

export function Testimonials() {
    return (
        <section className="fl-section" aria-labelledby="fl-testimonials">
            <div className="fl-container fl-stack-80">
                <Reveal>
                    <h2 id="fl-testimonials" className="fl-h-lg fl-center">
                        {testimonials.lead}
                        <br />
                        <span className="fl-muted">{testimonials.rest}</span>
                    </h2>
                </Reveal>
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
            <picture className="fl-footer__scene">
                <source media="(max-width: 767px)" srcSet="/fogline/footer/escena-mobile.webp" />
                <img src="/fogline/footer/escena-desktop.webp" alt="" />
            </picture>
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

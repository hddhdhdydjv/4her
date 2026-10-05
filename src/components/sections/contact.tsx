import { Logotipo } from "@/components/graphics/brand";
import { Footer } from "@/components/sections/footer";
import { Input, Label, Textarea } from "@/components/ui/field";
import { type } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

/**
 * Cierre de la página: contacto y pie sobre negro, con el logotipo gigante y
 * apenas visible de fondo, recortado por el borde de abajo.
 *
 * El logotipo es el SVG de marca, no una imagen: queda nítido a cualquier
 * ancho y no suma descarga.
 */

/** Fondo de la sección, tomado del diseño. */
const BG = "#101010";

export function Contact() {
    return (
        <section id="contacto" className="relative isolate overflow-hidden" style={{ background: BG }}>
            <Logotipo
                tight
                className="pointer-events-none absolute -bottom-[6%] left-1/2 -z-10 w-[108%] -translate-x-1/2 select-none"
                style={{ color: "rgba(255,255,255,0.022)" }}
            />

            <div className="mx-auto w-full max-w-[1280px] px-6 pt-[clamp(88px,16vh,176px)] pb-10 sm:px-10 lg:px-20 lg:pb-14">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
                    <div className="flex flex-col gap-4 lg:flex-1">
                        <Reveal delay={0}>
                            <p className={cx(type.body, "text-white/50")}>Contacto</p>
                        </Reveal>
                        <SplitReveal
                            delay={120}
                            className={cx(type.h1, "text-[var(--neutral-50)]")}
                        >
                            Contanos
                            <br />
                            qué querés lograr
                        </SplitReveal>
                        <Reveal delay={260}>
                            <p className={cx(type.body, "text-white/45")}>
                                Escribinos y arrancamos por una conversación, sin compromiso.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={200} variant="scale" as="form" className="flex w-full flex-col gap-5 lg:flex-1">
                        <div>
                            <Label htmlFor="name" dark>
                                Nombre
                            </Label>
                            <Input dark id="name" name="name" type="text" placeholder="Tu nombre" autoComplete="name" />
                        </div>
                        <div>
                            <Label htmlFor="email" dark>
                                Email
                            </Label>
                            <Input
                                dark
                                id="email"
                                name="email"
                                type="email"
                                placeholder="tu@email.com"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <Label htmlFor="message" dark>
                                Mensaje
                            </Label>
                            <Textarea
                                dark
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Contanos qué tenés en mente"
                            />
                        </div>
                        <button
                            type="submit"
                            className={cx(
                                type.body,
                                "mt-1 w-full rounded-[45px] bg-[var(--neutral-50)] px-4 py-3",
                                "text-center text-[var(--accent-default)] transition-opacity hover:opacity-85",
                            )}
                        >
                            Enviar
                        </button>
                    </Reveal>
                </div>

                {/* Aire para que el logotipo de fondo asome entero sobre el pie. */}
                <div className="mt-[clamp(160px,26vw,360px)]">
                    <Footer />
                </div>
            </div>
        </section>
    );
}

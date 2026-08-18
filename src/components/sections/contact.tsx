import Image from "next/image";
import { Logotipo } from "@/components/graphics/brand";
import { Footer } from "@/components/sections/footer";
import { Input, Label, Textarea } from "@/components/ui/field";
import { type } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

/**
 * Cierre de la página: contacto y pie sobre la misma foto del hero.
 *
 * Reusa `hero-back.png` ampliada y anclada abajo, donde la imagen es la ladera
 * oscura. Cierra el recorrido con el mismo paisaje con el que abre y no agrega
 * una descarga: es el archivo que el visitante ya tiene en caché de la primera
 * pantalla.
 *
 * El pie va adentro de esta sección, no como bloque aparte, para que las dos
 * cosas se lean como una sola franja.
 */

/** Misma capa que el hero: ya está en caché cuando el visitante llega acá. */
const BACKDROP = "/images/hero/hero-back.png";

export function Contact() {
    return (
        <section id="contacto" className="relative isolate overflow-hidden">
            {/* ---------- Foto de fondo ----------
                Ampliada con origen abajo: así queda a la vista la ladera del
                pie de la foto, que es la zona oscura donde el formulario en
                claro tiene contraste. */}
            <div aria-hidden="true" className="absolute inset-0 -z-20 origin-bottom scale-125">
                <Image
                    src={BACKDROP}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-bottom"
                />
            </div>

            {/* Velo: la foto sola no da contraste parejo para el texto en claro.
                Justo lo necesario para que se lea el formulario: más oscuro que
                esto y la ladera se convierte en una mancha negra. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(14,16,10,0.62) 0%, rgba(14,16,10,0.44) 45%, rgba(14,16,10,0.70) 100%)",
                }}
            />

            {/* ---------- Logotipo gigante, cortado por el borde de abajo ----------
                Sale del encuadre a propósito: el corte es lo que lo vuelve una
                textura de cierre y no un logo suelto apoyado al final. */}
            <Logotipo
                tight
                className={cx(
                    "pointer-events-none absolute -z-10 left-1/2 -translate-x-1/2 select-none",
                    // Sigue anclado abajo: el corte contra el borde inferior es
                    // lo que lo vuelve textura y no un logo apoyado al final.
                    "-bottom-[3%] w-[112%] sm:-bottom-[5%] sm:w-[116%]",
                )}
                style={{ color: "rgba(255,255,255,0.05)" }}
            />

            <div className="mx-auto w-full max-w-[1280px] px-6 pt-[clamp(88px,16vh,176px)] pb-10 sm:px-10 lg:px-20 lg:pb-14">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
                    {/* ---------- Título ---------- */}
                    <div className="flex flex-col gap-4 lg:flex-1">
                        <Reveal delay={0}>
                            <p className={cx(type.title, "text-white/60")}>Contacto</p>
                        </Reveal>
                        <SplitReveal
                            delay={120}
                            className={cx(type.h1, "text-balance text-[var(--neutral-50)]")}
                        >
                            Contanos qué querés lograr
                        </SplitReveal>
                        <Reveal delay={260}>
                            <p className={cx(type.bodyLg, "text-white/70")}>
                                Escribinos y arrancamos por una conversación, sin compromiso.
                            </p>
                        </Reveal>
                    </div>

                    {/* ---------- Formulario ---------- */}
                    <Reveal
                        delay={200}
                        variant="scale"
                        as="form"
                        className="flex w-full flex-col gap-5 lg:flex-1"
                    >
                        <div>
                            <Label htmlFor="name" dark>
                                Nombre
                            </Label>
                            <Input
                                dark
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Tu nombre"
                                autoComplete="name"
                            />
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
                                type.bodyLg,
                                "mt-1 w-full rounded-[45px] bg-[var(--neutral-50)] px-4 py-3",
                                "text-center text-[#141414] transition-opacity hover:opacity-85",
                            )}
                        >
                            Enviar
                        </button>
                    </Reveal>
                </div>

                {/* Aire para que el logotipo del fondo respire antes del pie. */}
                <div className="mt-[clamp(96px,18vh,220px)]">
                    <Footer />
                </div>
            </div>
        </section>
    );
}

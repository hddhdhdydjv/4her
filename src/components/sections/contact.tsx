import { Section, type, tone } from "@/components/ui/section";
import { Input, Label, Textarea } from "@/components/ui/field";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Cierre y destino de todos los CTA ("Hablemos", "Hacé tu consulta").
 * No está en el wireframe de Figma: se construye con la misma rampa
 * tipográfica y los mismos tokens que el resto de la página.
 */
export function Contact() {
    return (
        <Section id="contacto" className="bg-[var(--bg-secondary)]" pad="py-16 lg:py-30">
            <Reveal>
                {/* Mobile: un único panel que ocupa el viewport completo, sin la tarjeta
                    del form (inputs sueltos sobre el fondo). Desktop: layout de dos columnas. */}
                <div className="flex min-h-[calc(100svh-8rem)] flex-col justify-center gap-10 lg:min-h-0 lg:flex-row lg:gap-16">
                    <div className="flex flex-col gap-4 lg:flex-1">
                        <p className={cx(type.title, tone.secondary)}>Contacto</p>
                        <h2 className={cx(type.h1, tone.primary, "text-balance")}>
                            Contanos qué querés lograr
                        </h2>
                        <p className={cx(type.bodyLg, tone.secondary)}>
                            Escribinos y arrancamos por una conversación, sin compromiso.
                        </p>
                    </div>

                    <form className="flex w-full flex-col gap-5 lg:flex-1 lg:rounded-2xl lg:bg-[var(--bg-primary)] lg:p-8">
                        <div>
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" name="name" type="text" placeholder="Tu nombre" autoComplete="name" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" />
                        </div>
                        <div>
                            <Label htmlFor="message">Mensaje</Label>
                            <Textarea id="message" name="message" rows={4} placeholder="Contanos qué tenés en mente" />
                        </div>
                        <button
                            type="submit"
                            className={cx(
                                type.bodyLg,
                                "mt-1 w-full rounded-[45px] bg-[var(--bg-inverse)] px-4 py-3 text-center text-[var(--text-inverse)] transition-opacity hover:opacity-85",
                            )}
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </Reveal>
        </Section>
    );
}

import { Footer } from "@/components/sections/footer";
import { Input, Label, Textarea } from "@/components/ui/field";
import { type } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cx } from "@/utils/cx";

export function Contact() {
    return (
        <section id="contacto" className="relative isolate overflow-hidden">
            <div className="mx-auto w-full max-w-[1280px] px-6 pt-[clamp(88px,16vh,176px)] pb-10 sm:px-10 lg:px-20 lg:pb-14">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
                    {/* ---------- Título ---------- */}
                    <div className="flex flex-col gap-4 lg:flex-1">
                        <Reveal delay={0}>
                            <p className={cx(type.title, "text-[var(--text-secondary)]")}>Contacto</p>
                        </Reveal>
                        <SplitReveal
                            delay={120}
                            className={cx(type.h1, "text-balance text-[var(--text-primary)]")}
                        >
                            Empecemos con un diagnóstico de 20 minutos
                        </SplitReveal>
                        <Reveal delay={260}>
                            <p className={cx(type.bodyLg, "text-[var(--text-secondary)]")}>
                                Sin costo. Salís con un panorama claro de por dónde arrancar.
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
                            <Label htmlFor="name">
                                Nombre
                            </Label>
                            <Input

                                id="name"
                                name="name"
                                type="text"
                                placeholder="Tu nombre"
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input

                                id="email"
                                name="email"
                                type="email"
                                placeholder="tu@email.com"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <Label htmlFor="message">
                                Mensaje
                            </Label>
                            <Textarea

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
                                "mt-1 w-full rounded-[45px] bg-[var(--accent-default)] px-4 py-3",
                                "text-center text-white transition-opacity hover:opacity-85",
                            )}
                        >
                            Enviar
                        </button>
                    </Reveal>
                </div>

                {/* Aire entre el formulario y el pie. */}
                <div className="mt-[clamp(96px,18vh,220px)]">
                    <Footer />
                </div>
            </div>
        </section>
    );
}

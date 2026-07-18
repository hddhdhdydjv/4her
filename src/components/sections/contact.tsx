import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";
import { Reveal } from "@/components/motion/reveal";

/** Cierre full-height, sin eyebrow, sin footer. Última pantalla. */
export function Contact() {
    return (
        <section id="contacto" className="flex min-h-screen items-center bg-[var(--brand-sage)]">
            <div className="mx-auto w-full max-w-container px-6 pt-36 pb-44 lg:pt-32 lg:pb-40">
                <Reveal>
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
                        <div className="max-w-xl">
                            <p className="font-mono text-xs tracking-[0.18em] text-brand-secondary uppercase">
                                Empecemos por una conversación
                            </p>
                            <h2 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1.0] font-medium tracking-[-0.02em] text-balance text-primary">
                                Transformemos ideas en{" "}
                                <em className="font-light text-brand-secondary italic">impacto</em>
                            </h2>
                        </div>

                        <form className="rounded-3xl bg-[var(--brand-cream)] p-8">
                            <div className="flex flex-col gap-5">
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
                                <Button size="lg" type="submit" className="mt-1 w-full">
                                    Contactanos
                                </Button>
                            </div>
                        </form>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

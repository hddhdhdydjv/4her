import type { ReactNode } from "react";
import { Section, type } from "@/components/ui/section";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/motion/reveal";
import { cx } from "@/utils/cx";

/**
 * Bloque "Feature": texto a un lado, media al otro.
 * `reverse` invierte el orden (media a la derecha), como alterna el diseño.
 */
export function FeatureSplit({
    title,
    body,
    reverse = false,
    tight = false,
    id,
    image,
    imageLabel = "Imagen",
    children,
}: {
    title: ReactNode;
    body: ReactNode;
    reverse?: boolean;
    tight?: boolean;
    id?: string;
    image?: string;
    imageLabel?: string;
    /** Contenido extra bajo el texto (ej. un botón). */
    children?: ReactNode;
}) {
    return (
        <Section id={id} tight={tight}>
            <Reveal>
                <div
                    className={cx(
                        "flex flex-col items-center gap-10 lg:gap-16",
                        reverse ? "lg:flex-row-reverse" : "lg:flex-row",
                    )}
                >
                    <Media
                        className="aspect-[544/432] w-full lg:flex-1"
                        rounded="rounded-2xl"
                        label={imageLabel}
                        src={image}
                    />

                    <div className="flex w-full flex-col justify-center lg:flex-1">
                        <div className="flex flex-col gap-6">
                            <h3 className={cx(type.h2, "text-balance text-primary")}>{title}</h3>
                            <p className={cx(type.bodyLg, "text-secondary")}>{body}</p>
                        </div>
                        {children && <div className="mt-8">{children}</div>}
                    </div>
                </div>
            </Reveal>
        </Section>
    );
}

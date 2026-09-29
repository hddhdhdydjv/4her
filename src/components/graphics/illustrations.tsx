import Image from "next/image";

/** Monochrome ordered-dither exports. Each asset has a transparent background,
 * so the drawing itself carries the texture instead of sitting on a white tile. */
function Illustration({ tile, className }: { tile: number; className?: string }) {
    return (
        <Image
            src={`/images/dither-illustrations/illustration-${tile + 1}.png`}
            className={className}
            alt=""
            width={418}
            height={418}
            unoptimized
            draggable={false}
        />
    );
}
type Props = { className?: string };
export function Equipo(props: Props) { return <Illustration tile={4} {...props} />; }
export function Servicio1(props: Props) { return <Illustration tile={0} {...props} />; }
export function Servicio2(props: Props) { return <Illustration tile={1} {...props} />; }
export function Servicio3(props: Props) { return <Illustration tile={2} {...props} />; }
export function Servicio4(props: Props) { return <Illustration tile={3} {...props} />; }
export function Valor1(props: Props) { return <Illustration tile={6} {...props} />; }
export function Valor2(props: Props) { return <Illustration tile={7} {...props} />; }
export function Valor3(props: Props) { return <Illustration tile={4} {...props} />; }
export function Valor4(props: Props) { return <Illustration tile={8} {...props} />; }

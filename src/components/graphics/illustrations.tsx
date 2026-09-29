/** Shared editorial artwork. SVG viewports isolate each tile without changing
 * the dimensions or behavior of the original section components. */
function Illustration({ tile, className }: { tile: number; className?: string }) {
    const x = (tile % 3) * 100;
    const y = Math.floor(tile / 3) * 100;
    return <svg viewBox={`${x} ${y} 100 100`} className={className} aria-hidden="true" style={{ mixBlendMode: "multiply" }}>
        <image href="/images/editorial-illustrations.webp" x="0" y="0" width="300" height="300" />
    </svg>;
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

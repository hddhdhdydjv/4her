import { Valor3, Valor4, Valor2 } from "@/components/graphics/illustrations";
import { DitherArt } from "@/components/ui/dither-art";

const steps = [
    {
        dots: 1,
        title: "Diagnóstico",
        body: "Una reunión inicial para entender tu negocio, tu marca actual y dónde está el problema real: ¿es de mensaje, de canal o de proceso comercial?",
    },
    {
        dots: 2,
        title: "Propuesta",
        body: "Te devolvemos un plan concreto: qué servicios, en qué orden, y qué vas a poder medir en los primeros 90 días.",
    },
    {
        dots: 3,
        title: "Ejecución y ajuste",
        body: "Trabajamos en sprints cortos con reportes mensuales, para poder corregir el rumbo antes de que el presupuesto se vaya en algo que no funciona.",
    },
];


const artwork = [Valor3, Valor4, Valor2];
export function Process() {
    return <section id="proceso" className="editorial-section">
        <div className="editorial-intro">
            <p className="editorial-eyebrow">Nuestro proceso</p>
            <div><h2>Un proceso simple, sin cajas negras</h2>
            <p className="editorial-subtitle">Y siempre a tu lado.</p></div>
        </div>
        <ol className="process-grid">
            {steps.map((step, i) => {
                const Art = artwork[i];
                return <li key={step.title}>
                    <span className="editorial-number">0{i + 1}</span>
                    <DitherArt><Art className="h-full w-full" /></DitherArt>
                    <h3>{step.title}</h3><p>{step.body}</p>
                </li>;
            })}
        </ol>
    </section>;
}

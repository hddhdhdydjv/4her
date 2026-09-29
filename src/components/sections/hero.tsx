import { Logotipo } from "@/components/graphics/brand";
import styles from "./hero.module.css";

export function Hero() {
    return (
        <section id="inicio" className={styles.hero}>
            <div className={styles.inner}>
                <div className={styles.copy}>
                    <h1>Ayudamos a decidir qué decir, a quién, y cómo <span>convertirlo en ventas.</span></h1>
                    <p>Definimos el mensaje, ejecutamos la pauta y ponemos objetivos comerciales sobre la mesa.</p>
                    <a href="#contacto">Hablemos <span aria-hidden="true">↗</span></a>
                    <p className={styles.disciplines}>Posicionamiento de marca · Marketing digital y campañas · Estrategia comercial</p>
                </div>
                <div className={styles.wordmark} aria-hidden="true">
                    <Logotipo tight className={styles.solid} />
                    <Logotipo tight className={styles.dots} />
                </div>
            </div>
        </section>
    );
}

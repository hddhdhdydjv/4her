import { Logotipo } from "@/components/graphics/brand";
import { DitherField } from "@/components/graphics/dither-field";
import styles from "./hero.module.css";

export function Hero() {
    return (
        <section id="inicio" className={styles.hero}>
            <div className={styles.inner}>
                <div className={styles.copy}>
                    <h1>Ayudamos a decidir qué decir, a quién, y cómo convertirlo en ventas.</h1>
                    <p>Definimos el mensaje, ejecutamos la pauta y ponemos objetivos comerciales sobre la mesa.</p>
                </div>
                <DitherField className={styles.artwork}>
                    <div className={styles.wordmark} aria-hidden="true">
                        <Logotipo tight />
                    </div>
                </DitherField>
            </div>
        </section>
    );
}

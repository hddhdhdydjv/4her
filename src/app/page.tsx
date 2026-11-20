import { redirect } from "next/navigation";

/** En la rama fogline la raíz abre directo la landing de Fogline. */
export default function Home() {
    redirect("/fogline");
}

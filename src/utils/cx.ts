/**
 * Utilidad mínima para componer clases condicionalmente.
 * (Untitled UI usa una `cx` basada en tailwind-merge; acá mantenemos una
 * versión sin dependencias, suficiente para clases estáticas de este proyecto.)
 */
type ClassValue = string | number | null | false | undefined;

export function cx(...classes: ClassValue[]): string {
    return classes.filter(Boolean).join(" ");
}

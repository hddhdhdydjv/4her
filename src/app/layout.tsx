import type { Metadata } from "next";
import { Outfit, Lato, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Tipografía centralizada - cambiar acá afecta todo el sitio.
// Outfit para títulos:
const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    display: "swap",
});

// Lato para cuerpo:
const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    display: "swap",
});

// Mono para labels / eyebrows:
const mono = JetBrains_Mono({
    variable: "--font-mono-label",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "4HER - Comunicación & Marketing",
    description:
        "Marca y comunicación con criterio. Más estratégico que una agencia tradicional, más cercano que un freelance.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="es"
            className={`${outfit.variable} ${lato.variable} ${mono.variable} h-full antialiased`}
        >
            <body className="min-h-full bg-primary font-body text-primary">{children}</body>
        </html>
    );
}

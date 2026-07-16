import type { Metadata } from "next";
import { Schibsted_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Tipografía centralizada — cambiar acá afecta todo el sitio.
// Grotesque neutro para títulos (estilo Aptos):
const grotesk = Schibsted_Grotesk({
    variable: "--font-grotesk",
    subsets: ["latin"],
    display: "swap",
});

// Sans legible para cuerpo:
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

// Mono para labels / eyebrows:
const mono = JetBrains_Mono({
    variable: "--font-mono-label",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "4HER — Comunicación & Marketing",
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
            className={`${grotesk.variable} ${inter.variable} ${mono.variable} h-full antialiased`}
        >
            <body className="min-h-full bg-primary font-body text-primary">{children}</body>
        </html>
    );
}

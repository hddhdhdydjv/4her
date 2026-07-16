import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// Tipografía centralizada — cambiar acá afecta todo el sitio.
// Serif elegante para títulos:
const fraunces = Fraunces({
    variable: "--font-fraunces",
    subsets: ["latin"],
    display: "swap",
    axes: ["opsz"],
});

// Sans legible para cuerpo:
const inter = Inter({
    variable: "--font-inter",
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
        <html lang="es" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
            <body className="min-h-full bg-primary font-body text-primary">{children}</body>
        </html>
    );
}

import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const mono = JetBrains_Mono({
    variable: "--font-mono-label",
    subsets: ["latin"],
    weight: ["400", "500"],
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
            className={`${outfit.variable} ${mono.variable} h-full antialiased`}
        >
            <body className="min-h-full bg-primary font-body text-primary">{children}</body>
        </html>
    );
}

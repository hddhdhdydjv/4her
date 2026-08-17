import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        /* AVIF primero: en fotos pesa ~30-50% menos que WebP, y WebP queda de
           respaldo donde AVIF no esté soportado. Los PNG que entran a public/
           nunca se sirven tal cual al visitante. */
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;

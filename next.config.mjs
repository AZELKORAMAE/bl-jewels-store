/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Loader maison : Unsplash redimensionne via ses paramètres d'URL, Supabase Storage sert l'original.
    // Évite de consommer le quota d'optimisation d'images de Vercel.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;

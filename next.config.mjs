/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["rwyhnhfpyxiodufwjfyr.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rwyhnhfpyxiodufwjfyr.supabase.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

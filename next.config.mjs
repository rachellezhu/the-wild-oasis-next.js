const imageUrl = process.env.SUPABASE_URL.split("://").at(1);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: imageUrl,
        port: "",
        pathname: "/storage/v1/object/public/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      }
    ],
  },
};

export default nextConfig;

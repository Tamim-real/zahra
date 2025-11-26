/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "nogor.com.bd",
      "randomuser.me",
      "lh3.googleusercontent.com",
      "i.pravatar.cc"
    ],
  },
};

export default nextConfig;

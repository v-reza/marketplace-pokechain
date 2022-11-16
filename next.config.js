/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    CI: false,
    GENERATE_SOURCEMAP: false,
    currency: "USD",
    formatCurrency: "$ ",
  },
  images: {
    domains: ["raw.githubusercontent.com", "api.pokechain.games"],
  },
};

module.exports = nextConfig;

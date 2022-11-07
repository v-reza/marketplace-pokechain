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
    apiBaseUrl: "https://api.pokechain.games/api/",
    versionApi: "v1"
  },
  images: {
    domains: ["raw.githubusercontent.com"]
  }
}

module.exports = nextConfig

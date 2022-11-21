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
    MIDTRANS_CLIENT_KEY: "SB-Mid-client-wkRq0wPRcvhL4waI",
    MIDTRANS_SERVER_KEY: "SB-Mid-server-d6roLynf_XGAfT_TGtTa8uBM",
    apiBaseUrl: "https://api.pokechain.games/api/",
    versionApi: "v1"
  },
  images: {
    domains: ["raw.githubusercontent.com", "api.pokechain.games"],
  },
};

module.exports = nextConfig;

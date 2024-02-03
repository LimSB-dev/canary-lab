/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  images: {
    domains: ["*", "mazassumnida.wtf"],
  },
  env: {},
  reactStrictMode: true,
  "fontawesome-svg-core": {
    license: "free",
  },
};

module.exports = withPWA(nextConfig);

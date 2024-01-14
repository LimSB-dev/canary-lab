/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextPWA = {
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
  },
};

const nextConfig = {
  images: {
    domains: ["*"],
  },
  env: {},
};

module.exports = withPWA({
  ...nextPWA,
});

module.exports = nextConfig;

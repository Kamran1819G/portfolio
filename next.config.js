/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "api.microlink.io"],
  },
  sassOptions: {
    includePaths: [`${__dirname}/styles`],
  },
};

module.exports = nextConfig;

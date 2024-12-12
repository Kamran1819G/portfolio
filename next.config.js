/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  sassOptions: {
    includePaths: [`${__dirname}/styles`],
  },
};

module.exports = nextConfig;

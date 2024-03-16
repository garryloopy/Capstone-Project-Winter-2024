/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_ID: process.env.APP_ID,
    LOCATION_ID: process.env.LOCATION_ID,
    SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
    MAP_ACCESS_TOKEN: process.env.MAP_ACCESS_TOKEN,
  },
  images: {
    domains: ["localhost", "res.cloudinary.com", "*.googleusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` and `net module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;

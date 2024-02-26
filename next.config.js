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
};

module.exports = nextConfig;

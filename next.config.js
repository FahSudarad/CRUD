/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'], // เพิ่มโดเมน i.ibb.co ลงในรายการ domains
  },
  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
  },
}

module.exports = nextConfig

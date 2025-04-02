/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gallery-app',
  images: {
    unoptimized: true
  },
  assetPrefix: '/gallery-app'
}

module.exports = nextConfig 
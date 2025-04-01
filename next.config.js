/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gallery-app',
  images: {
    unoptimized: true
  },
  assetPrefix: '/gallery-app/',
  trailingSlash: true,
  distDir: 'out'
}

module.exports = nextConfig 
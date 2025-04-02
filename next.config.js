/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gallery-app',
  images: {
    unoptimized: true
  },
  assetPrefix: '/gallery-app/',
  trailingSlash: true,
  distDir: 'out',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.publicPath = '/gallery-app/';
      config.output.chunkFilename = 'static/chunks/[name].[chunkhash].js';
      config.output.filename = 'static/chunks/[name].[chunkhash].js';
    }
    return config;
  }
}

module.exports = nextConfig 
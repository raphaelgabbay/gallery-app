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
      delete config.output.chunkFilename;
      delete config.output.filename;
    }
    return config;
  }
}

module.exports = nextConfig 
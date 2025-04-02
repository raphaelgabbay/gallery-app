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
      
      // Configure CSS handling
      config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false
            }
          },
          'postcss-loader'
        ]
      });

      // Configure chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };

      // Ensure proper chunk naming
      config.output.chunkFilename = 'static/chunks/[name]-[contenthash].js';
      config.output.filename = 'static/chunks/[name]-[contenthash].js';
    }
    return config;
  }
}

module.exports = nextConfig 
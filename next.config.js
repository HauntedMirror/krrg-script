/** @type {import('next').NextConfig} */
const repo = 'krrg-script';
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;
const nextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  reactStrictMode: true,
  trailingSlash: true,
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  }
}

module.exports = nextConfig

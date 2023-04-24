/** @type {import('next').NextConfig} */
const repo = 'krrg-script';
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;
const nextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = nextConfig

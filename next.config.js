/** @type {import('next').NextConfig} */
const repo = 'change-me-to-your-repo';
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;
const nextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = nextConfig

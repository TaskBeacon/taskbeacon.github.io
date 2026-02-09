/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages deployment: static HTML export
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimization is not supported in static export on Pages.
    unoptimized: true
  }
};

module.exports = nextConfig;


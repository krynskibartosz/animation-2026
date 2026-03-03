import type { NextConfig } from "next";
import path from "path";

const masonMintSrc = path.join(
  process.cwd(),
  "src/components/projects/mason-mint/src"
);

const nextConfig: NextConfig = {
  sassOptions: {
    // Inject Mason Mint's breakpoint variables globally so all .module.scss files can use them
    // without needing to @import them individually (which Turbopack can't resolve via includePaths)
    additionalData: `
      $breakpoint-mob: 566px;
      $breakpoint-tablet: 991px;
      $breakpoint-desktop: 1199px;
    `,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets-global.website-files.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mason-mint-products-dev.nyc3.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mm-products-awwwards.nyc3.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader"],
    });
    return config;
  }
};

export default nextConfig;

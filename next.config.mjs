/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cryptologos.cc',
        pathname: '/logos/**',
      },
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vectorstock.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pngimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vrbkcxugyiecbgmxkftg.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './',
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      '@': './',
    },
  },
}

export default nextConfig

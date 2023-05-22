/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: { domains: ['lh3.googleusercontent.com', 'lh5.ggpht.com'], },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**'

      },
      {
        protocol: 'https',
        hostname: 'lh*.ggpht.com',
        port: '',
        pathname: '/**'

      }
    ]
  }
};

module.exports = nextConfig

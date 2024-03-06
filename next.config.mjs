/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.experiments = {
  //     asyncWebAssembly: true,
  //     layers: true,
  //   }
  //   return config
  // },
}

export default nextConfig

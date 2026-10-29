/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'fuegoverde.com.co' },
      { protocol: 'https', hostname: 'peopleplays.vtexassets.com' },
      { protocol: 'https', hostname: 'velocitysavage.com' },
      { protocol: 'https', hostname: 'lacanchatiendadeportiva.com.co' },
      { protocol: 'https', hostname: 'mktaddi.vteximg.com.br' },
      { protocol: 'https', hostname: 'http2.mlstatic.com' },
      { protocol: 'https', hostname: '**.gstatic.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
    ],
  },
};

export default nextConfig;

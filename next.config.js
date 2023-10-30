/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: async function () {
    return {
      '/': { page: '/login' },
    }
  },
  async headers() {
    return [
      {
        source: '/logo.ico',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/x-icon',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
